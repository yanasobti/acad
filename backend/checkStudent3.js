const supabase = require('./db');

async function checkStudent3() {
  try {
    // Get all attendance for student 3
    const { data: attendance, error } = await supabase
      .from('attendance')
      .select('*')
      .eq('student_id', 3)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error:', error);
      return;
    }

    console.log('Total attendance records for student 3:', attendance?.length || 0);
    console.log('\nAttendance records:');
    
    if (attendance && attendance.length > 0) {
      // Group by class
      const byClass = {};
      attendance.forEach(record => {
        if (!byClass[record.class_id]) {
          byClass[record.class_id] = [];
        }
        byClass[record.class_id].push(record);
      });

      for (const [classId, records] of Object.entries(byClass)) {
        console.log(`\n  Class ID ${classId}: ${records.length} records`);
        records.forEach((r, i) => {
          console.log(`    ${i + 1}. Status: ${r.status}, Date: ${r.date}`);
        });
      }
    }

    // Get student enrollments
    const { data: enrollments } = await supabase
      .from('enrollments')
      .select('class_id, classes(id, name)')
      .eq('student_id', 3);

    console.log('\n\nStudent 3 is enrolled in:');
    enrollments?.forEach(e => {
      const recordsForClass = attendance?.filter(a => a.class_id === e.class_id).length || 0;
      console.log(`  Class ${e.class_id} (${e.classes?.name}): ${recordsForClass} attendance records`);
    });

  } catch (err) {
    console.error('Error:', err);
  }
}

checkStudent3();
