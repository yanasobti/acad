import React, { useState } from 'react';

const TeacherDashboard = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [activeFeature, setActiveFeature] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
  };

  const handleFeatureClick = (feature) => {
    setActiveFeature(feature);
    setSidebarOpen(true);
  };

  const handleHomeClick = () => {
    setActiveFeature('home');
    setSidebarOpen(false);
  };

  const renderFeatureContent = () => {
    switch(activeFeature) {
      case 'classes':
        return <div>Classes Feature Content</div>;
      case 'attendance':
        return <div>Attendance Feature Content</div>;
      case 'students':
        return <div>Students Feature Content</div>;
      case 'reports':
        return <div>Reports Feature Content</div>;
      default:
        return <div>Welcome to Teacher Dashboard! Click a feature.</div>;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <nav className="flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-gray-800 fixed top-0 left-0 right-0">
        <h1>Teacher Dashboard</h1>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <button onClick={handleHomeClick}>Home</button>
      </nav>

      <aside className={`fixed left-0 top-16 h-full w-64 bg-gray-200 dark:bg-gray-800 p-4 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <ul>
          <li onClick={() => handleFeatureClick('classes')}>Classes</li>
          <li onClick={() => handleFeatureClick('attendance')}>Attendance</li>
          <li onClick={() => handleFeatureClick('students')}>Students</li>
          <li onClick={() => handleFeatureClick('reports')}>Reports</li>
        </ul>
      </aside>

      <main className="pt-24 px-6">
        {renderFeatureContent()}
      </main>
    </div>
  );
};

export default TeacherDashboard;
