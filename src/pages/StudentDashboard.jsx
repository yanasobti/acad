import React, { useState, useEffect } from 'react';

const StudentDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentFeature, setCurrentFeature] = useState('home');

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };

  const handleFeatureClick = (feature) => {
    setCurrentFeature(feature);
    setSidebarOpen(true);
  };

  const handleHomeClick = () => {
    setCurrentFeature('home');
    setSidebarOpen(false);
  };

  // Feature content components
  const renderFeatureContent = () => {
    switch(currentFeature) {
      case 'courses':
        return (
          <div className="mb-8">
            <p className="text-gray-600 dark:text-gray-300 mb-6">Manage all your courses and class schedules. View upcoming classes, track progress, and access course materials.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Current Courses</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-300">Mathematics 101</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-900 dark:text-blue-200">Ongoing</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-300">Computer Science</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-900 dark:text-blue-200">Ongoing</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-300">English Literature</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full dark:bg-green-900 dark:text-green-200">Completed</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Upcoming Classes</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center py-2">
                    <span className="text-gray-700 dark:text-gray-300">Today, 10:00 AM</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Mathematics</span>
                  </li>
                  <li className="flex justify-between items-center py-2">
                    <span className="text-gray-700 dark:text-gray-300">Tomorrow, 2:00 PM</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Computer Science</span>
                  </li>
                  <li className="flex justify-between items-center py-2">
                    <span className="text-gray-700 dark:text-gray-300">Wed, 9:00 AM</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Physics Lab</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-700 dark:text-blue-300">Enroll in New Course</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400">Browse available courses</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-800 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-700 dark:text-purple-300">Course Materials</h4>
                    <p className="text-sm text-purple-600 dark:text-purple-400">Access study resources</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'attendance':
        return (
          <div className="mb-8">
            <p className="text-gray-600 dark:text-gray-300 mb-6">Track your class attendance records, view history, and check your attendance percentage for each course.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Attendance Summary</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mathematics</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '92%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Computer Science</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Physics</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div className="bg-orange-500 h-2 rounded-full" style={{width: '78%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Recent Records</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-300">Mathematics</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full dark:bg-green-900 dark:text-green-200">Present</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-300">Computer Science</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full dark:bg-green-900 dark:text-green-200">Present</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-300">Physics</span>
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full dark:bg-red-900 dark:text-red-200">Absent</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-700 dark:text-blue-300">View Full History</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400">Detailed attendance records</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-800 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-700 dark:text-purple-300">Download Report</h4>
                    <p className="text-sm text-purple-600 dark:text-purple-400">Export your attendance data</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'assignments':
        return (
          <div className="mb-8">
            <p className="text-gray-600 dark:text-gray-300 mb-6">Manage your assignments, track deadlines, and submit your work. Stay on top of all your academic tasks.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Pending Assignments</h3>
                <ul className="space-y-3">
                  <li className="py-2 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300">Math Problem Set #5</span>
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full dark:bg-red-900 dark:text-red-200">Due Tomorrow</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Mathematics 101</p>
                  </li>
                  <li className="py-2 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300">Programming Project</span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full dark:bg-yellow-900 dark:text-yellow-200">Due in 3 days</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Computer Science</p>
                  </li>
                  <li className="py-2 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300">Research Paper</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-900 dark:text-blue-200">Due next week</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">English Literature</p>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Recently Submitted</h3>
                <ul className="space-y-3">
                  <li className="py-2 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300">Physics Lab Report</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full dark:bg-green-900 dark:text-green-200">Submitted</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">2 days ago</p>
                  </li>
                  <li className="py-2 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300">Math Problem Set #4</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full dark:bg-green-900 dark:text-green-200">Graded: 95%</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Last week</p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-700 dark:text-blue-300">Submit Assignment</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400">Upload your work</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-800 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-700 dark:text-purple-300">View All Assignments</h4>
                    <p className="text-sm text-purple-600 dark:text-purple-400">Complete list with deadlines</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'grades':
        return (
          <div className="mb-8">
            <p className="text-gray-600 dark:text-gray-300 mb-6">View your academic performance, grades for all courses, and track your progress throughout the semester.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Current Grades</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-300">Mathematics 101</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">A-</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-300">Computer Science</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">B+</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-300">Physics</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">B</span>
                  </li>
                  <li className="flex justify-between items-center py-2">
                    <span className="text-gray-700 dark:text-gray-300">English Literature</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">A</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Overall GPA</h3>
                <div className="flex items-center justify-center mb-4">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#eee"
                        strokeWidth="3" />
                      <path d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#4caf50"
                        strokeWidth="3"
                        strokeDasharray="80, 100" />
                      <text x="18" y="20.5" textAnchor="middle" fill="#333" fontSize="8" className="dark:fill-gray-200">3.45</text>
                    </svg>
                  </div>
                </div>
                <p className="text-center text-gray-600 dark:text-gray-300">Current Semester</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-700 dark:text-blue-300">Detailed Report</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400">View grade breakdown</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-800 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-700 dark:text-purple-300">Download Transcript</h4>
                    <p className="text-sm text-purple-600 dark:text-purple-400">Export your grades</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div id="welcome-page" className="w-full max-w-6xl">
            {/* Hero */}
            <div className="text-center mb-12">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl mx-auto mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Student</span></h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">Your personal learning dashboard. Track attendance, view assignments, check grades, and stay on top of all your courses in one place.</p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-200/50 dark:border-white-700/50 feature-btn group" onClick={() => handleFeatureClick('courses')}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477 4.5 1.253"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">My Courses</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">View and manage all your enrolled courses</p>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-200/50 dark:border-white-700/50 feature-btn group" onClick={() => handleFeatureClick('attendance')}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Attendance</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Check your attendance records for all courses</p>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-200/50 dark:border-white-700/50 feature-btn group" onClick={() => handleFeatureClick('assignments')}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Assignments</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">View and submit all pending assignments</p>
              </div>

              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-200/50 dark:border-white-700/50 feature-btn group" onClick={() => handleFeatureClick('grades')}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Grades</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Check your academic performance and grades</p>
              </div>
            </div>
          </div>
        );
    }
  };

  const getFeatureTitle = () => {
    switch(currentFeature) {
      case 'courses': return 'My Courses';
      case 'attendance': return 'Attendance';
      case 'assignments': return 'Assignments';
      case 'grades': return 'Grades';
      default: return '';
    }
  };

  const getFeatureDescription = () => {
    switch(currentFeature) {
      case 'courses': return 'View and manage all your enrolled courses';
      case 'attendance': return 'Check your attendance records for all courses';
      case 'assignments': return 'View and submit all pending assignments';
      case 'grades': return 'Check your academic performance and grades';
      default: return '';
    }
  };

  const getFeatureIconPath = () => {
    switch(currentFeature) {
      case 'courses': return 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477 4.5 1.253';
      case 'attendance': return 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2';
      case 'assignments': return 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z';
      case 'grades': return 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z';
      default: return '';
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-500 min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 fixed top-0 left-0 right-0 z-50 shadow-lg">
        <div className="flex items-center gap-4">
          <button 
            id="navbar-home" 
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 ${currentFeature === 'home' ? 'hidden' : ''}`}
            onClick={handleHomeClick}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            <span className="text-sm font-medium">Back</span>
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.840c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"/>
              </svg>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Student Dashboard</h1>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <button 
            id="theme-toggle" 
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium text-sm shadow-lg"
            onClick={toggleTheme}
          >
            <span id="theme-icon">{darkMode ? '☀️' : '🌙'}</span>
            <span id="theme-text">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-0.5 shadow-lg">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" className="w-full h-full rounded-full bg-white dark:bg-gray-800 object-cover" alt="profile" />
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside 
        id="sidebar" 
        className={`fixed left-0 top-16 h-full w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-r border-gray-200/50 dark:border-gray-700/50 p-6 transform transition-transform duration-300 z-40 shadow-2xl ${sidebarOpen ? '' : '-translate-x-full'}`}
      >
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Navigation</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
        </div>
        <ul className="space-y-3">
          <li>
            <button 
              className="w-full text-left flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 feature-btn group" 
              onClick={() => handleFeatureClick('courses')}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-200">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477 4.5 1.253"/>
                </svg>
              </div>
              <span className="font-medium">My Courses</span>
            </button>
          </li>
          <li>
            <button 
              className="w-full text-left flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 feature-btn group" 
              onClick={() => handleFeatureClick('attendance')}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-200">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
              </div>
              <span className="font-medium">Attendance</span>
            </button>
          </li>
          <li>
            <button 
              className="w-full text-left flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 feature-btn group" 
              onClick={() => handleFeatureClick('assignments')}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-200">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <span className="font-medium">Assignments</span>
            </button>
          </li>
          <li>
            <button 
              className="w-full text-left flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 feature-btn group" 
              onClick={() => handleFeatureClick('grades')}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-200">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <span className="font-medium">Grades</span>
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main id="main-content" className="flex items-center justify-center min-h-screen pt-24 px-6">
        {currentFeature === 'home' ? (
          renderFeatureContent()
        ) : (
          <div className="w-full max-w-6xl mx-auto pt-8">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={getFeatureIconPath()} />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{getFeatureTitle()}</h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">{getFeatureDescription()}</p>
              </div>
              {renderFeatureContent()}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentDashboard;