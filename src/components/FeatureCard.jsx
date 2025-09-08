// src/components/FeatureCards.jsx
import React from "react";

const FeatureCard = ({ title, desc, color }) => {
  return (
    <div
      className={`relative group rounded-xl p-6 shadow-md transition-all duration-500 cursor-pointer
        bg-gray-900/80 dark:bg-gray-800/80 border border-gray-700/40
        hover:-translate-y-2 hover:shadow-2xl`}
    >
      {/* Glow Behind on Hover */}
      <div
        className={`absolute inset-0 rounded-xl blur-2xl opacity-0 group-hover:opacity-70 transition duration-500 -z-10
          ${color === "green"
            ? "bg-emerald-400/20"
            : "bg-blue-400/20"}`}
      ></div>

      {/* Inner Edge Glow */}
      <div
        className={`absolute inset-0 rounded-xl ring-1 ring-transparent group-hover:ring-current opacity-0 group-hover:opacity-20 transition duration-500 pointer-events-none
          ${color === "green" ? "text-emerald-400" : "text-blue-400"}`}
      ></div>

      <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
      <p className="text-gray-300 text-sm">{desc}</p>
    </div>
  );
};

const FeatureCards = () => {
  const studentFeatures = [
    { title: "Real-Time Alerts", desc: "Stay updated on attendance, timetable changes, and important academic events." },
    { title: "CGPA Calculator", desc: "Track your grades and instantly calculate your semester and cumulative GPA." },
    { title: "Timetable Manager", desc: "Organize your daily classes and study schedule in one easy view." },
    { title: "Attendance Planner", desc: "Know exactly how many classes you need to attend to meet attendance goals." },
    { title: "Study Resources", desc: "Access curated notes, assignments, and reference material in one place." },
    { title: "AI Help Desk", desc: "Get instant answers to course-related questions with Acadence AI." },
  ];

  const teacherFeatures = [
    { title: "QR Attendance", desc: "Mark attendance instantly with secure, scannable QR codes." },
    { title: "Student Progress Reports", desc: "Get detailed insights into individual and class performance." },
    { title: "Proxy Prevention", desc: "Stop fake attendance with Wi-Fi based authentication." },
    { title: "Performance Analytics", desc: "Track academic trends and identify students who need help." },
    { title: "Resource Sharing", desc: "Easily share assignments, notes, and announcements." },
    { title: "Smart Scheduling", desc: "Plan lessons and assessments efficiently with AI suggestions." },
  ];

  return (
    <section className="relative z-10 m-0 p-0 bg-black text-white w-full">
      <div className="w-full flex flex-col justify-center items-center py-16">
        <div className="w-full px-4 md:px-8 max-w-6xl">
          {/* Main Heading */}
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Welcome to Acadence
            </h2>
            <p className="text-lg md:text-xl text-gray-400 font-medium max-w-3xl mx-auto">
              Your intelligent academic companion designed to make learning and
              teaching smarter, easier, and more efficient.
            </p>
          </div>

          {/* Students Section */}
          <div className="mb-20" id="for-students">
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1 text-sm font-semibold text-emerald-400 bg-emerald-400/10 rounded-full mb-3">
                FOR STUDENTS
              </span>
              <h3 className="text-2xl md:text-3xl font-bold">
                Smarter Learning <span className="text-emerald-400">Made Simple</span>
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {studentFeatures.map((f, i) => (
                <FeatureCard key={i} title={f.title} desc={f.desc} color="green" />
              ))}
            </div>
          </div>

          {/* Teachers Section */}
          <div id="for-teachers">
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1 text-sm font-semibold text-blue-400 bg-blue-400/10 rounded-full mb-3">
                FOR TEACHERS
              </span>
              <h3 className="text-2xl md:text-3xl font-bold">
                Teaching <span className="text-blue-400">Reimagined</span>
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teacherFeatures.map((f, i) => (
                <FeatureCard key={i} title={f.title} desc={f.desc} color="blue" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
