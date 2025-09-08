import React from "react";
import {
  FaChartLine,
  FaUsers,
  FaCalendarCheck,
  FaBell,
  FaBook,
  FaUserFriends,
  FaClock,
} from "react-icons/fa";

export default function AdminDashboard() {
  // example function placeholders
  const changeMode = () => {
    alert("Toggle Dark Mode coming soon!");
  };
  const dashboard = () => alert("Dashboard clicked!");
  const manageUsers = () => alert("Manage Users clicked!");
  const calculateReports = () => alert("Calculate Reports clicked!");
  const attendanceTracker = () => alert("Attendance Tracker clicked!");
  const notifications = () => alert("Notifications clicked!");
  const manageSubjects = () => alert("Manage Subjects clicked!");
  const manageGroups = () => alert("Manage Groups clicked!");
  const manageTimetable = () => alert("Manage Timetable clicked!");

  return (
    <div className="h-screen">
      {/* Navbar */}
      <div className="p-4 flex justify-between border-b border-gray-300" id="navbar">
        <div className="flex gap-2">
          <img src="/assets/admin.png" alt="logo" className="w-8 h-8 rounded-full" />
          <p className="bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent text-2xl font-bold">
            Admin Dashboard
          </p>
        </div>
        <div className="flex gap-4">
          <button
            className="bg-gradient-to-r from-blue-700 to-purple-700 text-white rounded-lg p-1 px-2"
            onClick={changeMode}
          >
            <div id="mode-name" className="flex gap-2 font-bold">
              <img src="/assets/MoonImage.png" alt="dark mode" className="w-6 h-6" />
              <p>Dark Mode</p>
            </div>
          </button>
          <img
            src="/assets/adminLogo.png"
            alt="profile"
            className="w-10 h-10 rounded-full border border-black"
          />
        </div>
      </div>

      {/* Layout */}
      <div className="flex">
        {/* Sidebar */}
        <div
          className="w-1/5 border-r border-gray-300 h-screen flex flex-col items-start gap-8 p-4 text-black font-bold"
          id="sidebar"
        >
          <button className="flex gap-2" onClick={dashboard}>
            <FaChartLine /> Dashboard
          </button>
          <button className="flex gap-2" onClick={manageGroups}>
            <FaUserFriends /> Manage Groups
          </button>
          <button className="flex gap-2" onClick={calculateReports}>
            <FaChartLine /> Calculate Reports
          </button>
          <button className="flex gap-2" onClick={attendanceTracker}>
            <FaCalendarCheck /> Attendance Tracker
          </button>
          <button className="flex gap-2" onClick={notifications}>
            <FaBell /> Notifications
          </button>
          <button className="flex gap-2" onClick={manageSubjects}>
            <FaBook /> Manage Subjects
          </button>
          <button className="flex gap-2" onClick={manageGroups}>
            <FaUserFriends /> Manage Groups
          </button>
          <button className="flex gap-2" onClick={manageTimetable}>
            <FaClock /> Manage Timetable
          </button>
        </div>

        {/* Main Content */}
        <div
          className="w-4/5 h-screen flex flex-col items-center justify-center p-4 gap-8"
          id="main-content"
        >
          <div>
            <div className="flex gap-2 text-5xl font-bold">
              <p>Welcome back,</p>
              <p className="bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                Admin!
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p>
                Manage users, subjects, attendance, timetables, and reports all
                from one place.
              </p>
              <p>Stay in control and keep everything organized.</p>
            </div>
          </div>

          {/* Cards */}
          <div className="flex gap-4">
            <div className="shadow-2xl rounded-xl p-4 flex flex-col items-center border border-blue-700">
              <img src="/assets/ExamImage.png" alt="exam" className="h-10 w-10 rounded-lg" />
              <p className="text-lg font-bold">Upcoming Exams</p>
              <p>Stay updated with scheduled exams and important test dates</p>
            </div>
            <div className="shadow-2xl rounded-xl p-4 flex flex-col items-center border border-blue-700">
              <img src="/assets/EventImage.png" alt="event" className="h-10 w-10 rounded-lg" />
              <p className="text-lg font-bold">Upcoming Events</p>
              <p>
                Keep track of upcoming seminars, workshops, and campus events
              </p>
            </div>
            <div className="shadow-2xl rounded-xl p-4 flex flex-col items-center border border-blue-700">
              <img
                src="/assets/RecentActivityImage.png"
                alt="recent"
                className="h-10 w-10 rounded-lg"
              />
              <p className="text-lg font-bold">Recent Activity</p>
              <p>
                A quick glance at your latest actions and updates on the platform
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
