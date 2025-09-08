import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const TeacherDashboard = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [activeFeature, setActiveFeature] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Refs for charts
  const classScheduleChartRef = useRef(null);
  const attendanceChartRef = useRef(null);
  const performanceChartRef = useRef(null);
  const overallPerformanceChartRef = useRef(null);
  const gradeDistributionChartRef = useRef(null);
  
  // Chart instances
  const [charts, setCharts] = useState({});

  // Initialize charts when feature changes
  useEffect(() => {
    if (activeFeature !== 'home') {
      setTimeout(initializeCharts, 100);
    }
    
    // Cleanup charts on unmount
    return () => {
      Object.values(charts).forEach(chart => chart && chart.destroy());
    };
  }, [activeFeature]);

  const handleFeatureClick = (feature) => {
    setActiveFeature(feature);
    setSidebarOpen(true);
  };

  const handleHomeClick = () => {
    setActiveFeature('home');
    setSidebarOpen(false);
  };

  const initializeCharts = () => {
    // Class Schedule Chart
    if (classScheduleChartRef.current) {
      if (charts.classSchedule) charts.classSchedule.destroy();
      
      const classScheduleCtx = classScheduleChartRef.current.getContext('2d');
      const newChart = new Chart(classScheduleCtx, {
        type: 'bar',
        data: {
          labels: [], // Removed raw data
          datasets: [{
            label: 'Classes per day',
            data: [], // Removed raw data
            backgroundColor: 'rgba(79, 70, 229, 0.7)',
            borderColor: 'rgba(79, 70, 229, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }
      });
      setCharts(prev => ({...prev, classSchedule: newChart}));
    }

    // Attendance Chart
    if (attendanceChartRef.current) {
      if (charts.attendance) charts.attendance.destroy();
      
      const attendanceCtx = attendanceChartRef.current.getContext('2d');
      const newChart = new Chart(attendanceCtx, {
        type: 'doughnut',
        data: {
          labels: [], // Removed raw data
          datasets: [{
            data: [], // Removed raw data
            backgroundColor: [
              'rgba(34, 197, 94, 0.7)',
              'rgba(239, 68, 68, 0.7)',
              'rgba(245, 158, 11, 0.7)'
            ],
            borderColor: [
              'rgba(34, 197, 94, 1)',
              'rgba(239, 68, 68, 1)',
              'rgba(245, 158, 11, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
      setCharts(prev => ({...prev, attendance: newChart}));
    }

    // Performance Chart
    if (performanceChartRef.current) {
      if (charts.performance) charts.performance.destroy();
      
      const performanceCtx = performanceChartRef.current.getContext('2d');
      const newChart = new Chart(performanceCtx, {
        type: 'line',
        data: {
          labels: [], // Removed raw data
          datasets: [{
            label: 'Class Average',
            data: [], // Removed raw data
            borderColor: 'rgba(79, 70, 229, 1)',
            backgroundColor: 'rgba(79, 70, 229, 0.1)',
            tension: 0.3,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              min: 60,
              max: 100
            }
          }
        }
      });
      setCharts(prev => ({...prev, performance: newChart}));
    }

    // Overall Performance Chart
    if (overallPerformanceChartRef.current) {
      if (charts.overallPerformance) charts.overallPerformance.destroy();
      
      const overallPerformanceCtx = overallPerformanceChartRef.current.getContext('2d');
      const newChart = new Chart(overallPerformanceCtx, {
        type: 'radar',
        data: {
          labels: [], // Removed raw data
          datasets: [{
            label: 'Class Average',
            data: [], // Removed raw data
            backgroundColor: 'rgba(79, 70, 229, 0.2)',
            borderColor: 'rgba(79, 70, 229, 1)',
            pointBackgroundColor: 'rgba(79, 70, 229, 1)'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              min: 50,
              max: 100
            }
          }
        }
      });
      setCharts(prev => ({...prev, overallPerformance: newChart}));
    }

    // Grade Distribution Chart
    if (gradeDistributionChartRef.current) {
      if (charts.gradeDistribution) charts.gradeDistribution.destroy();
      
      const gradeDistributionCtx = gradeDistributionChartRef.current.getContext('2d');
      const newChart = new Chart(gradeDistributionCtx, {
        type: 'pie',
        data: {
          labels: [], // Removed raw data
          datasets: [{
            data: [], // Removed raw data
            backgroundColor: [
              'rgba(34, 197, 94, 0.7)',
              'rgba(79, 70, 229, 0.7)',
              'rgba(245, 158, 11, 0.7)',
              'rgba(249, 115, 22, 0.7)',
              'rgba(239, 68, 68, 0.7)'
            ],
            borderColor: [
              'rgba(34, 197, 94, 1)',
              'rgba(79, 70, 229, 1)',
              'rgba(245, 158, 11, 1)',
              'rgba(249, 115, 22, 1)',
              'rgba(239, 68, 68, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
      setCharts(prev => ({...prev, gradeDistribution: newChart}));
    }
  };

  // Render feature-specific content
  const renderFeatureContent = () => {
    switch(activeFeature) {
      case 'classes':
        return <ClassesFeature classScheduleChartRef={classScheduleChartRef} />;
      case 'attendance':
        return <AttendanceFeature attendanceChartRef={attendanceChartRef} />;
      case 'students':
        return <StudentsFeature performanceChartRef={performanceChartRef} />;
      case 'reports':
        return <ReportsFeature 
                 overallPerformanceChartRef={overallPerformanceChartRef}
                 gradeDistributionChartRef={gradeDistributionChartRef}
               />;
      default:
        return <WelcomePage onFeatureClick={handleFeatureClick} />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-500 min-h-screen">
      {/* Navbar */}
      <Navbar 
        onHomeClick={handleHomeClick}
        showHomeButton={activeFeature !== 'home'}
      />
      
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        activeFeature={activeFeature}
        onFeatureClick={handleFeatureClick}
        onClose={() => setSidebarOpen(false)}
      />
      
      {/* Main Content */}
      <main className="flex items-center justify-center min-h-screen pt-24 px-6">
        {renderFeatureContent()}
      </main>
    </div>
  );
};

// Navbar Component
const Navbar = ({ theme, onThemeToggle, onHomeClick, showHomeButton }) => (
  <nav className="flex justify-between items-center px-6 py-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 fixed top-0 left-0 right-0 z-50 shadow-lg">
    <div className="flex items-center gap-4">
      <button 
        onClick={onHomeClick} 
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 ${showHomeButton ? '' : 'hidden'}`}
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
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Teacher Dashboard</h1>
      </div>
    </div>
    <div className="flex gap-3 items-center">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-0.5 shadow-lg">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
          className="w-full h-full rounded-full bg-white dark:bg-gray-800 object-cover" 
          alt="profile" 
        />
      </div>
    </div>
  </nav>
);

// Sidebar Component
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
      className={`fixed left-0 top-16 h-full w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-r border-gray-200/50 dark:border-gray-700/50 p-6 transform transition-transform duration-300 z-40 shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Navigation</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
      </div>
      <ul className="space-y-3">
        <li>
          <button 
            className={`w-full text-left flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 feature-btn group ${activeFeature === 'classes' ? 'bg-gray-100 dark:bg-gray-700/50' : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'}`}
            onClick={() => onFeatureClick('classes')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-200">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477 4.5 1.253"/>
              </svg>
            </div>
            <span className="font-medium">Your Classes</span>
          </button>
        </li>
        <li>
          <button 
            className={`w-full text-left flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 feature-btn group ${activeFeature === 'attendance' ? 'bg-gray-100 dark:bg-gray-700/50' : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'}`}
            onClick={() => onFeatureClick('attendance')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-200">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m3 5.197H9m3 0v-1.5"/>
              </svg>
            </div>
            <span className="font-medium">Take Attendance</span>
          </button>
        </li>
        <li>
          <button 
            className={`w-full text-left flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 feature-btn group ${activeFeature === 'students' ? 'bg-gray-100 dark:bg-gray-700/50' : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'}`}
            onClick={() => onFeatureClick('students')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-200">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <span className="font-medium">Students</span>
          </button>
        </li>
        <li>
          <button 
            className={`w-full text-left flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 feature-btn group ${activeFeature === 'reports' ? 'bg-gray-100 dark:bg-gray-700/50' : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'}`}
            onClick={() => onFeatureClick('reports')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-200">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <span className="font-medium">Reports</span>
          </button>
        </li>
      </ul>
    </aside>
  );
};

// WelcomePage Component
const WelcomePage = ({ onFeatureClick }) => (
  <div id="welcome-page" className="w-full max-w-6xl">
    {/* Hero */}
    <div className="text-center mb-12">
      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl mx-auto mb-6">
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
        </svg>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Teacher</span></h1>
      <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">Your comprehensive teaching management platform. Streamline your workflow, engage with students, and track progress all in one place.</p>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div 
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-200/50 dark:border-gray-700/50 feature-btn group"
        onClick={() => onFeatureClick('classes')}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477 4.5 1.253"/>
            </svg>
          </div>
          <svg className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Your Classes</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Manage all your courses and class schedules</p>
      </div>

      <div 
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-200/50 dark:border-gray-700/50 feature-btn group"
        onClick={() => onFeatureClick('attendance')}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m3 5.197H9m3 0v-1.5"/>
            </svg>
          </div>
          <svg className="w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Take Attendance</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Generate QR for attendance</p>
      </div>

      <div 
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-200/50 dark:border-gray-700/50 feature-btn group"
        onClick={() => onFeatureClick('students')}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </div>
          <svg className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Students</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Check the progress of your every student</p>
      </div>

      <div 
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-200/50 dark:border-gray-700/50 feature-btn group"
        onClick={() => onFeatureClick('reports')}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
          <svg className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Reports</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Generate detailed analytics and insights</p>
      </div>
    </div>
  </div>
);

// Classes Feature Component
const ClassesFeature = ({ classScheduleChartRef }) => (
  <div className="w-full max-w-6xl mx-auto pt-8">
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477 4.5 1.253"/>
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Your Classes</h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">Manage all your courses and class schedules. 
          View upcoming classes, edit course details, and organize your teaching schedule.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50/80 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
          <h4 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">Class Schedule</h4>
          {/* <div className="h-64">
            <canvas ref={classScheduleChartRef}></canvas>
          </div> */}
        </div>
        <div className="bg-gray-50/80 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
          <h4 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">Upcoming Classes</h4>
          <div className="space-y-4">
            {/* Raw data removed. Populate this dynamically. */}
            <div className="text-center text-gray-500 dark:text-gray-400 pt-8">No upcoming classes.</div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50/80 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
        <h4 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">All Classes</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600">
                <th className="pb-3">Class Name</th>
                <th className="pb-3">Time</th>
                <th className="pb-3">Days</th>
                <th className="pb-3">Enrolled</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {/* Raw data removed. Populate this dynamically. */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

// Attendance Feature Component
const AttendanceFeature = ({ attendanceChartRef }) => (
  <div className="w-full max-w-6xl mx-auto pt-8">
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m3 5.197H9m3 0v-1.5"/>
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Take Attendance</h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">Generate QR codes for quick attendance marking. 
          Track student presence and manage attendance records efficiently.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50/80 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
          <h4 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">Generate QR Code</h4>
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 bg-white p-4 rounded-lg mb-4 flex items-center justify-center">
              <div className="w-full h-full  bg-gray-200 flex items-center justify-center text-gray-500">
                <div className="text-center">
                QR Code will appear here
                </div>
              </div>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
              Generate QR Code
            </button>
          </div>
        </div>
        <div className="bg-gray-50/80 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
          <h4 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">Attendance Stats</h4>
          {/* <div className="h-64">
            <canvas ref={attendanceChartRef}></canvas>
          </div> */}
        </div>
      </div>
      <div className="bg-gray-50/80 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
        <h4 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">Today's Attendance</h4>
        <div className="mb-4 flex items-center space-x-4">
          <select className="px-4 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg">
            <option>Select Class</option>
            {/* Raw data removed. Populate this dynamically. */}
          </select>
          <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow-md hover:from-green-600 hover:to-emerald-700 transition-all duration-200">
            Mark Attendance
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600">
                <th className="pb-3">Student Name</th>
                <th className="pb-3">ID</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {/* Raw data removed. Populate this dynamically. */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

// Students Feature Component
const StudentsFeature = ({ performanceChartRef }) => (
  <div className="w-full max-w-6xl mx-auto pt-8">
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Students</h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">Check the progress of every student. View detailed performance metrics, track individual progress, and identify areas for improvement.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50/80 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
          <h4 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">Student Performance</h4>
          {/* <div className="h-64">
            <canvas ref={performanceChartRef}></canvas>
          </div> */}
        </div>
        <div className="bg-gray-50/80 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
          <h4 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">Top Students</h4>
          <div className="space-y-4">
            {/* Raw data removed. Populate this dynamically. */}
            <div className="text-center text-gray-500 dark:text-gray-400 pt-8">No student data available.</div>
            </div>
        </div>
      </div>
      <div className="bg-gray-50/80 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
        <h4 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">All Students</h4>
        <div className="mb-4 flex items-center justify-between">
          <input type="text" placeholder="Search students..." className="px-4 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg w-64"/>
          <select className="px-4 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg">
            <option>All Classes</option>
            {/* Raw data removed. Populate this dynamically. */}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600">
                <th className="pb-3">Name</th>
                <th className="pb-3">ID</th>
                <th className="pb-3">Class</th>
                <th className="pb-3">Attendance</th>
                <th className="pb-3">Performance</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {/* Raw data removed. Populate this dynamically. */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

// Reports Feature Component
const ReportsFeature = ({ overallPerformanceChartRef, gradeDistributionChartRef }) => (
  <div className="w-full max-w-6xl mx-auto pt-8">
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Reports</h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">Generate detailed analytics and insights. Create comprehensive reports on student performance, attendance, and class progress.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50/80 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
          <h4 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">Overall Performance</h4>
          {/* <div className="h-64">
            <canvas ref={overallPerformanceChartRef}></canvas>
          </div> */}
        </div>
        <div className="bg-gray-50/80 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200/50 dark:border-gray-600/50">
          <h4 className="font-semibold mb-4 text-gray-800 dark:text-gray-200">Grade Distribution</h4>
          {/* <div className="h-64">
            <canvas ref={gradeDistributionChartRef}></canvas>
          </div> */}
        </div>
      </div>
    </div>
  </div>
);

export default TeacherDashboard;