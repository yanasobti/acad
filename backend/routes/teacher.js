const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const supabase = require("../db");

// Middleware to verify JWT token and check if teacher
const verifyTeacher = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can perform this action" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Submit/Finalize attendance for a class on a date
// This marks all students as either present/absent/late and finalizes
router.post("/submit-attendance", verifyTeacher, async (req, res) => {
  try {
    const teacherId = req.user.id;
    const { classId, date, attendanceRecords } = req.body;

    if (!classId || !date) {
      return res.status(400).json({ message: "classId and date are required" });
    }

    // Verify this teacher owns this class
    const { data: classData, error: classError } = await supabase
      .from("classes")
      .select("id, teacher_id")
      .eq("id", classId)
      .single();

    if (classError || !classData || classData.teacher_id !== teacherId) {
      return res.status(403).json({ message: "You don't have permission to submit attendance for this class" });
    }

    // Get all enrolled students
    const { data: enrollments, error: enrollError } = await supabase
      .from("enrollments")
      .select("student_id")
      .eq("class_id", classId);

    if (enrollError) throw enrollError;

    const attendanceDate = new Date(date).toISOString().split('T')[0];
    const studentIds = enrollments.map(e => e.student_id);
    
    // Prepare attendance records: submitted + auto-absent for non-submitted
    const recordsToInsertOrUpdate = [];
    const attendanceMap = {};

    // First, build map of submitted records
    if (attendanceRecords && Array.isArray(attendanceRecords)) {
      for (const record of attendanceRecords) {
        attendanceMap[record.student_id] = {
          status: record.status,
          date: `${attendanceDate}T${new Date().toISOString().split('T')[1]}`
        };
      }
    }

    // Add all enrolled students to final list
    for (const studentId of studentIds) {
      const status = attendanceMap[studentId]?.status || 'absent';
      recordsToInsertOrUpdate.push({
        student_id: studentId,
        class_id: classId,
        status: status,
        date: `${attendanceDate}T${new Date().toISOString().split('T')[1]}`
      });
    }

    // Check for existing records for this date/class
    const { data: existingRecords, error: existingError } = await supabase
      .from("attendance")
      .select("id, student_id")
      .eq("class_id", classId)
      .gte("date", `${attendanceDate}T00:00:00`)
      .lte("date", `${attendanceDate}T23:59:59`);

    if (existingError) throw existingError;

    // Split into insert and update operations
    const existingStudentIds = new Set(existingRecords?.map(r => r.student_id) || []);
    const toInsert = recordsToInsertOrUpdate.filter(r => !existingStudentIds.has(r.student_id));
    const toUpdate = recordsToInsertOrUpdate.filter(r => existingStudentIds.has(r.student_id));

    // Insert new records
    if (toInsert.length > 0) {
      const { error: insertError } = await supabase
        .from("attendance")
        .insert(toInsert);

      if (insertError) throw insertError;
    }

    // Update existing records
    for (const record of toUpdate) {
      const { error: updateError } = await supabase
        .from("attendance")
        .update({ status: record.status })
        .eq("class_id", classId)
        .eq("student_id", record.student_id)
        .gte("date", `${attendanceDate}T00:00:00`)
        .lte("date", `${attendanceDate}T23:59:59`);

      if (updateError) throw updateError;
    }

    res.json({
      message: "Attendance submitted successfully",
      submitted: recordsToInsertOrUpdate.length,
      inserted: toInsert.length,
      updated: toUpdate.length
    });
  } catch (err) {
    console.error("Error submitting attendance:", err);
    res.status(500).json({
      message: "Error submitting attendance",
      error: err.message
    });
  }
});

// Get attendance report for a class on a date
router.get("/attendance-report/:classId/:date", verifyTeacher, async (req, res) => {
  try {
    const teacherId = req.user.id;
    const { classId, date } = req.params;

    // Verify this teacher owns this class
    const { data: classData, error: classError } = await supabase
      .from("classes")
      .select("id, teacher_id, name")
      .eq("id", classId)
      .single();

    if (classError || !classData || classData.teacher_id !== teacherId) {
      return res.status(403).json({ message: "You don't have permission to view this class" });
    }

    const attendanceDate = new Date(date).toISOString().split('T')[0];

    // Get all students in class
    const { data: enrollments, error: enrollError } = await supabase
      .from("enrollments")
      .select("student_id, users!enrollments_student_id_fkey(id, name, email)")
      .eq("class_id", classId);

    if (enrollError) throw enrollError;

    // Get attendance for this date
    const { data: attendance, error: attendanceError } = await supabase
      .from("attendance")
      .select("*")
      .eq("class_id", classId)
      .gte("date", `${attendanceDate}T00:00:00`)
      .lte("date", `${attendanceDate}T23:59:59`);

    if (attendanceError) throw attendanceError;

    // Combine data
    const report = enrollments.map(enrollment => {
      const studentId = enrollment.users?.id || enrollment.student_id;
      const attendanceRecord = attendance?.find(a => a.student_id === studentId);
      
      return {
        student_id: studentId,
        student_name: enrollment.users?.name || 'Unknown',
        student_email: enrollment.users?.email || '',
        status: attendanceRecord?.status || 'absent',
        marked_at: attendanceRecord?.created_at || null
      };
    });

    res.json({
      class_name: classData.name,
      date: attendanceDate,
      report: report,
      summary: {
        present: report.filter(r => r.status === 'present').length,
        absent: report.filter(r => r.status === 'absent').length,
        late: report.filter(r => r.status === 'late').length,
        total: report.length
      }
    });
  } catch (err) {
    console.error("Error fetching attendance report:", err);
    res.status(500).json({
      message: "Error fetching attendance report",
      error: err.message
    });
  }
});

module.exports = router;
