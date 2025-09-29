import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const [activeFeature, setActiveFeature] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teacherData, setTeacherData] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    classSchedule: { labels: [], data: [] },
    attendanceStats: { labels: ['Present', 'Absent', 'Late'], data: [0, 0, 0] },
    allClasses: [],
    allStudents: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeacherData();
  }, []);

  // Handle clicking outside profile dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileOpen && !e.target.closest('.profile-dropdown') && !e.target.closest('.profile-button')) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [profileOpen]);

  const fetchTeacherData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get teacher data from localStorage
      const teacherId = localStorage.getItem('userId');
      const teacherName = localStorage.getItem('userName') || 'teacher1';
      const teacherEmail = localStorage.getItem('userEmail') || 'teacher@example.com';
      
      if (!teacherId) {
        console.warn('No teacher ID found in localStorage, redirecting to login');
        navigate('/login');
        return;
      }

      console.log('Fetching data for teacher ID:', teacherId);

      // Set comprehensive teacher data
      setTeacherData({
        id: teacherId,
        name: teacherName,
        email: teacherEmail,
        teacherId: teacherId,
        department: localStorage.getItem('userDepartment') || 'Computer Science',
        designation: localStorage.getItem('userDesignation') || 'Associate Professor',
        specialization: localStorage.getItem('userSpecialization') || 'Machine Learning & Data Science',
        office: localStorage.getItem('userOffice') || 'Room 301, CS Building',
        officeHours: localStorage.getItem('userOfficeHours') || 'Mon-Fri: 2:00 PM - 4:00 PM',
        phone: localStorage.getItem('userPhone') || '+1 (555) 123-4567',
        joinDate: localStorage.getItem('userJoinDate') || 'September 2020'
      });

      // Initialize with empty arrays in case of missing tables
      let classes = [];
      let students = [];
      let attendance = [];

      try {
        // Try to fetch teacher's classes - handle if table doesn't exist
        const { data: classesData, error: classesError } = await supabase
          .from('classes')
          .select('*')
          .eq('teacher_id', teacherId);

        if (classesError) {
          console.warn('Classes table might not exist or have no data:', classesError.message);
          // Use mock data if table doesn't exist
          classes = [
            {
              id: 1,
              name: 'Math 101',
              day_of_week: 'monday',
              time: '09:00',
              teacher_id: teacherId
            },
            {
              id: 2,
              name: 'Physics 101',
              day_of_week: 'wednesday',
              time: '11:00',
              teacher_id: teacherId
            }
          ];
        } else {
          classes = classesData || [];
        }

        console.log('Teacher classes:', classes);

        // Try to fetch students for these classes
        if (classes && classes.length > 0) {
          const classIds = classes.map(cls => cls.id);
          
          try {
            const { data: enrollments, error: enrollmentsError } = await supabase
              .from('enrollments')
              .select(`
                student_id,
                class_id,
                users!enrollments_student_id_fkey (id, name, email)
              `)
              .in('class_id', classIds);

            if (enrollmentsError) {
              console.warn('Enrollments table might not exist:', enrollmentsError.message);
              // Use mock students data
              students = [
                { id: 'student1', name: 'John Doe', email: 'john@example.com', classId: classes[0]?.id },
                { id: 'student2', name: 'Jane Smith', email: 'jane@example.com', classId: classes[0]?.id },
                { id: 'student3', name: 'Bob Wilson', email: 'bob@example.com', classId: classes[1]?.id }
              ];
            } else {
              // Process students data
              students = enrollments?.map(enrollment => ({
                id: enrollment.users?.id || enrollment.student_id,
                name: enrollment.users?.name || 'Student Name',
                email: enrollment.users?.email || 'student@example.com',
                classId: enrollment.class_id
              })) || [];
            }
          } catch (err) {
            console.warn('Error fetching enrollments, using mock data:', err.message);
            students = [
              { id: 'student1', name: 'John Doe', email: 'john@example.com', classId: classes[0]?.id },
              { id: 'student2', name: 'Jane Smith', email: 'jane@example.com', classId: classes[0]?.id }
            ];
          }
        }

        console.log('Students:', students);

        // Try to fetch attendance data
        if (classes && classes.length > 0) {
          try {
            const { data: attendanceData, error: attendanceError } = await supabase
              .from('attendance')
              .select('*')
              .in('class_id', classes.map(c => c.id));

            if (attendanceError) {
              console.warn('Attendance table might not exist:', attendanceError.message);
              // Use mock attendance data
              attendance = [
                { id: 1, student_id: 'student1', class_id: classes[0]?.id, status: 'present', date: new Date().toISOString() },
                { id: 2, student_id: 'student2', class_id: classes[0]?.id, status: 'absent', date: new Date().toISOString() },
                { id: 3, student_id: 'student3', class_id: classes[1]?.id, status: 'present', date: new Date().toISOString() }
              ];
            } else {
              attendance = attendanceData || [];
            }
          } catch (err) {
            console.warn('Error fetching attendance, using mock data:', err.message);
            attendance = [];
          }
        }

      } catch (dbError) {
        console.warn('Database connection issue, using fallback data:', dbError.message);
        // Use complete mock data set if database is unavailable
        classes = [
          { id: 1, name: 'Math 101', day_of_week: 'monday', time: '09:00', teacher_id: teacherId },
          { id: 2, name: 'Physics 101', day_of_week: 'wednesday', time: '11:00', teacher_id: teacherId }
        ];
        students = [
          { id: 'student1', name: 'John Doe', email: 'john@example.com', classId: 1 },
          { id: 'student2', name: 'Jane Smith', email: 'jane@example.com', classId: 1 }
        ];
        attendance = [
          { id: 1, student_id: 'student1', class_id: 1, status: 'present', date: new Date().toISOString() }
        ];
      }

      console.log('Attendance data:', attendance);

      // Process dashboard data
      const processedData = processDashboardData(classes, students, attendance);
      setDashboardData(processedData);

    } catch (err) {
      console.error('Error fetching teacher data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const processDashboardData = (classes, students, attendance) => {
    // Process class schedule
    const classSchedule = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      data: [0, 0, 0, 0, 0]
    };

    const dayMap = {
      'monday': 0, 'tuesday': 1, 'wednesday': 2, 'thursday': 3, 'friday': 4
    };

    classes?.forEach(cls => {
      const dayIndex = dayMap[cls.day_of_week?.toLowerCase()];
      if (dayIndex !== undefined) {
        classSchedule.data[dayIndex]++;
      }
    });

    // Process attendance stats
    const presentCount = attendance?.filter(a => a.status === 'present').length || 0;
    const absentCount = attendance?.filter(a => a.status === 'absent').length || 0;
    const lateCount = attendance?.filter(a => a.status === 'late').length || 0;
    const totalAttendance = presentCount + absentCount + lateCount;

    const attendanceStats = {
      labels: ['Present', 'Absent', 'Late'],
      data: totalAttendance > 0 ? [
        Math.round((presentCount / totalAttendance) * 100),
        Math.round((absentCount / totalAttendance) * 100),
        Math.round((lateCount / totalAttendance) * 100)
      ] : [0, 0, 0]
    };

    // Get unique students
    const uniqueStudents = [];
    const studentMap = new Map();
    
    students?.forEach(student => {
      if (!studentMap.has(student.id)) {
        studentMap.set(student.id, student);
        uniqueStudents.push({
          ...student,
          score: Math.floor(Math.random() * 30) + 70, // Mock data
          attendance: Math.floor(Math.random() * 20) + 80 // Mock data
        });
      }
    });

    return {
      classSchedule,
      attendanceStats,
      allClasses: classes?.map(cls => ({
        ...cls,
        enrolled_count: students.filter(s => s.classId === cls.id).length
      })) || [],
      allStudents: uniqueStudents
    };
  };
  const handleFeatureClick = (feature) => {
    setActiveFeature(feature);
    setSidebarOpen(true);
    setProfileOpen(false);
  };

  const handleHomeClick = () => {
    setActiveFeature('home');
    setSidebarOpen(false);
    setProfileOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
    if (sidebarOpen) setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  // Render feature content
  const renderFeatureContent = () => {
    if (loading) {
      return (
        <div className="w-full max-w-6xl text-center py-20">
          <p className="text-xl font-medium text-blue-600">Loading Your Dashboard...</p>
          <div className="mt-4 animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="w-full max-w-6xl text-center py-20 bg-red-50 p-6 rounded-xl border border-red-300">
          <p className="text-xl font-bold text-red-600">Data Error! 🚨</p>
          <p className="text-gray-700 mt-2">{error}</p>
          <button 
            onClick={fetchTeacherData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      );
    }

    switch(activeFeature) {
      case 'classes':
        return <ClassesFeature allClasses={dashboardData.allClasses} teacherName={teacherData?.name} />;
      case 'attendance':
        return <AttendanceFeature 
                 attendanceStats={dashboardData.attendanceStats}
                 allClasses={dashboardData.allClasses}
               />;
      case 'students':
        return <StudentsFeature 
                 allStudents={dashboardData.allStudents}
                 allClasses={dashboardData.allClasses}
               />;
      case 'reports':
        return <ReportsFeature dashboardData={dashboardData} />;
      default:
        return <WelcomePage onFeatureClick={handleFeatureClick} teacherData={teacherData} />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-900 min-h-screen">
      <Navbar 
        onHomeClick={handleHomeClick}
        showHomeButton={activeFeature !== 'home'}
        teacherData={teacherData}
        onLogout={handleLogout}
        profileOpen={profileOpen}
        toggleProfile={toggleProfile}
      />
      
      <Sidebar 
        isOpen={sidebarOpen}
        activeFeature={activeFeature}
        onFeatureClick={handleFeatureClick}
        onClose={() => setSidebarOpen(false)}
      />
      
      <main className="flex items-center justify-center min-h-screen pt-24 px-6">
        {renderFeatureContent()}
      </main>
    </div>
  );
};

// Navbar Component
const Navbar = ({ onHomeClick, showHomeButton, teacherData, onLogout, profileOpen, toggleProfile }) => (
  <nav className="flex justify-between items-center px-6 py-4 bg-white/95 backdrop-blur-md border-b border-gray-200/50 fixed top-0 left-0 right-0 z-50 shadow-lg">
    <div className="flex items-center gap-4">
      <button 
        onClick={onHomeClick} 
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200 ${showHomeButton ? '' : 'hidden'}`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
        </svg>
        <span className="text-sm font-medium">Back</span>
      </button>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477 4.5 1.253"/>
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Teacher Dashboard
          </h1>
          {teacherData && (
            <p className="text-sm text-gray-600">
              Welcome, {teacherData.name} ({teacherData.email})
            </p>
          )}
        </div>
      </div>
    </div>
    
    <div className="flex gap-3 items-center relative">
      <button
        onClick={onLogout}
        className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
      >
        Logout
      </button>
      
      {/* Profile Button */}
      <div className="relative">
        <button 
          onClick={toggleProfile}
          className="profile-button w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-0.5 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-sm font-bold text-blue-600">
            {teacherData?.name?.charAt(0)?.toUpperCase() || 'T'}
          </div>
        </button>

        {/* Profile Dropdown */}
        {profileOpen && teacherData && (
          <div className="profile-dropdown absolute right-0 top-12 w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 z-50 overflow-hidden">
            <div className="p-6">
              {/* Profile Header */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 mx-auto mb-4">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
                    className="w-full h-full rounded-full bg-white object-cover" 
                    alt="profile" 
                  />
                </div>
                <h2 className="text-xl font-bold text-gray-800">{teacherData.name}</h2>
                <p className="text-gray-600">{teacherData.email}</p>
                <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mt-2">
                  {teacherData.teacherId}
                </div>
              </div>

              {/* Profile Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Department</label>
                    <p className="text-sm text-gray-800">{teacherData.department}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Designation</label>
                    <p className="text-sm text-gray-800">{teacherData.designation}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Specialization</label>
                  <p className="text-sm text-gray-800">{teacherData.specialization}</p>
                </div>
                
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Office</label>
                  <p className="text-sm text-gray-800">{teacherData.office}</p>
                </div>
                
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Office Hours</label>
                  <p className="text-sm text-gray-800">{teacherData.officeHours}</p>
                </div>
                
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Phone</label>
                  <p className="text-sm text-gray-800">{teacherData.phone}</p>
                </div>
                
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase">Joined</label>
                  <p className="text-sm text-gray-800">{teacherData.joinDate}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                  Edit Profile
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all text-sm font-medium">
                  Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </nav>
);

// Sidebar Component (same as before)
const Sidebar = ({ isOpen, activeFeature, onFeatureClick, onClose }) => {
  useEffect(() => {
    const handleClickOutside = (e) => {
      const sidebar = document.getElementById('sidebar');
      if (sidebar && !sidebar.contains(e.target) && !e.target.closest('.feature-btn')) {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [onClose]);

  return (
    <aside 
      id="sidebar"
      className={`fixed left-0 top-16 h-full w-80 bg-white/95 backdrop-blur-md border-r border-gray-200/50 p-6 transform transition-transform duration-300 z-40 shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Navigation</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
      </div>
      <ul className="space-y-3">
        {[
          { key: 'classes', label: 'Your Classes', icon: '📚', color: 'from-emerald-400 to-emerald-600' },
          { key: 'attendance', label: 'Take Attendance', icon: '📝', color: 'from-pink-400 to-rose-600' },
          { key: 'students', label: 'Students', icon: '👨‍🎓', color: 'from-orange-400 to-red-600' },
          { key: 'reports', label: 'Reports', icon: '📊', color: 'from-indigo-400 to-blue-600' }
        ].map((item) => (
          <li key={item.key}>
            <button 
              className={`w-full text-left flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 feature-btn group ${activeFeature === item.key ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
              onClick={() => onFeatureClick(item.key)}
            >
              <div className={`w-8 h-8 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-200`}>
                <span>{item.icon}</span>
              </div>
              <span className="font-medium">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

// WelcomePage Component
const WelcomePage = ({ onFeatureClick, teacherData }) => (
  <div className="w-full max-w-6xl">
    <div className="text-center mb-12">
      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl mx-auto mb-6">
        <span className="text-2xl text-white">👨‍🏫</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
        Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{teacherData?.name || 'Teacher'}</span>
      </h1>
      <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
        Your personalized teaching management platform. Manage your classes, track student progress, and streamline your workflow.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[
        { key: 'classes', label: 'Your Classes', description: 'Manage all your courses and class schedules', icon: '📚', color: 'from-emerald-400 to-emerald-600' },
        { key: 'attendance', label: 'Take Attendance', description: 'Generate QR for attendance tracking', icon: '📝', color: 'from-pink-400 to-rose-600' },
        { key: 'students', label: 'Students', description: 'Check the progress of your every student', icon: '👨‍🎓', color: 'from-orange-400 to-red-600' },
        { key: 'reports', label: 'Reports', description: 'Generate detailed analytics and insights', icon: '📊', color: 'from-indigo-400 to-blue-600' }
      ].map((item) => (
        <div 
          key={item.key}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-200/50 feature-btn group"
          onClick={() => onFeatureClick(item.key)}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
              <span className="text-xl">{item.icon}</span>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">{item.label}</h3>
          <p className="text-sm text-gray-600">{item.description}</p>
        </div>
      ))}
    </div>
  </div>
);

// Classes Feature Component
const ClassesFeature = ({ allClasses, teacherName }) => (
  <div className="w-full max-w-6xl mx-auto pt-8">
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <span className="text-2xl text-white">📚</span>
        </div>
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {teacherName}'s Classes
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Manage all your courses and class schedules. View upcoming classes and organize your teaching schedule.
        </p>
      </div>
      
      <div className="bg-gray-50/80 rounded-xl p-6 border border-gray-200/50">
        <h4 className="font-semibold mb-4 text-gray-800">Your Classes</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-200">
                <th className="pb-3">Class Name</th>
                <th className="pb-3">Time</th>
                <th className="pb-3">Day</th>
                <th className="pb-3">Enrolled Students</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {allClasses.length > 0 ? (
                allClasses.map((cls, index) => (
                  <tr key={cls.id || index}>
                    <td className="py-3 text-gray-800 font-medium">{cls.name}</td>
                    <td className="py-3 text-gray-600">{cls.schedule_time}</td>
                    <td className="py-3 text-gray-600 capitalize">{cls.day_of_week}</td>
                    <td className="py-3 text-gray-600">{cls.enrolled_count}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <span className="text-4xl mb-2">📚</span>
                      <p>No classes assigned to you yet.</p>
                      <p className="text-sm mt-1">Contact administrator to get classes assigned.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

// Attendance Feature Component
const AttendanceFeature = ({ attendanceStats, allClasses }) => (
  <div className="w-full max-w-6xl mx-auto pt-8">
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <span className="text-2xl text-white">📝</span>
        </div>
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Take Attendance
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Generate QR codes for quick attendance marking. Track student presence and manage attendance records efficiently.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50/80 rounded-xl p-6 border border-gray-200/50">
          <h4 className="font-semibold mb-4 text-gray-800">Generate QR Code</h4>
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 bg-white p-4 rounded-lg mb-4 flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center text-gray-500">
                <span className="text-4xl mb-2 block">📱</span>
                <p>QR Code will appear here</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
              Generate QR Code
            </button>
          </div>
        </div>
        
        <div className="bg-gray-50/80 rounded-xl p-6 border border-gray-200/50">
          <h4 className="font-semibold mb-4 text-gray-800">Attendance Statistics</h4>
          <div className="space-y-3">
            {attendanceStats.labels.map((label, index) => (
              <div key={label} className="flex justify-between items-center">
                <span className="text-gray-600">{label}:</span>
                <span className="font-semibold text-blue-600">{attendanceStats.data[index]}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Students Feature Component
const StudentsFeature = ({ allStudents, allClasses }) => (
  <div className="w-full max-w-6xl mx-auto pt-8">
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <span className="text-2xl text-white">👨‍🎓</span>
        </div>
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Students
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Check the progress of every student. View detailed performance metrics and track individual progress.
        </p>
      </div>
      
      <div className="bg-gray-50/80 rounded-xl p-6 border border-gray-200/50">
        <h4 className="font-semibold mb-4 text-gray-800">Your Students</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-200">
                <th className="pb-3">Name</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Score</th>
                <th className="pb-3">Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {allStudents.length > 0 ? (
                allStudents.map((student, index) => (
                  <tr key={student.id || index}>
                    <td className="py-3 text-gray-800 font-medium">{student.name}</td>
                    <td className="py-3 text-gray-600">{student.email}</td>
                    <td className="py-3 text-gray-600">{student.score}%</td>
                    <td className="py-3 text-gray-600">{student.attendance}%</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center">
                      <span className="text-4xl mb-2">👨‍🎓</span>
                      <p>No students enrolled in your classes yet.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

// Reports Feature Component
const ReportsFeature = ({ dashboardData }) => (
  <div className="w-full max-w-6xl mx-auto pt-8">
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <span className="text-2xl text-white">📊</span>
        </div>
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Reports
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Generate detailed analytics and insights. Create comprehensive reports on student performance and class progress.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50/80 rounded-xl p-6 border border-gray-200/50">
          <h4 className="font-semibold mb-4 text-gray-800">Class Distribution</h4>
          <div className="space-y-2">
            {dashboardData.classSchedule.labels.map((day, index) => (
              <div key={day} className="flex justify-between items-center">
                <span className="text-gray-600">{day}:</span>
                <span className="font-semibold text-blue-600">{dashboardData.classSchedule.data[index]} classes</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-50/80 rounded-xl p-6 border border-gray-200/50">
          <h4 className="font-semibold mb-4 text-gray-800">Quick Stats</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Total Classes:</span>
              <span className="font-semibold text-green-600">{dashboardData.allClasses.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Students:</span>
              <span className="font-semibold text-blue-600">{dashboardData.allStudents.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Average Attendance:</span>
              <span className="font-semibold text-purple-600">
                {dashboardData.attendanceStats.data[0]}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TeacherDashboard;