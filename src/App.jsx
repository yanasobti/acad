import { useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom"; 
import AOS from "aos";
import "aos/dist/aos.css";
import Squares from "./components/Squares";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FeatureCards from "./components/FeatureCard";
import Login from "./pages/Login";
import TeacherDash from "./pages/TeacherDash";
import RequireAuth from "./RequireAuth";  
import Signup from "./pages/Signup.jsx";
import AdminDash from "./pages/AdminDash"; // Import at the top


function App() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 50 });
  }, []);

  return (
   <Routes>
  {/* Login page */}
  <Route path="/login" element={<Login />} />

  {/* Signup page */}
  <Route path="/signup" element={<Signup />} />

  {/* Teacher dashboard (protected) */}
  <Route
    path="/teacher"
    element={
      <RequireAuth allowedRoles={["teacher"]}>
        <TeacherDash />
      </RequireAuth>
    }
  />

  {/* Admin dashboard (protected) */}
  <Route
    path="/admin"
    element={<AdminDash />}
  />

  {/* Home page */}
  <Route
    path="/"
    element={
      <div className="text-white font-sans relative">
        <div className="fixed inset-0 -z-10">
          <Squares
            direction="right"
            speed={1.5}
            borderColor="#555"
            hoverFillColor="#4f46e5"
            squareSize={75}
          />
        </div>

        <header className="absolute top-4 left-0 w-full z-50">
          <Navbar />
        </header>

        {/* The section is now centered on mobile and aligned left on desktop */}
        <section className="relative h-screen flex items-center justify-center md:justify-start px-4 sm:px-10 md:ml-[10em]">
          <div className="max-w-lg z-10 text-center md:text-left">
            <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight mb-4">
              AI-Powered
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center md:justify-start">
                <span className="text-indigo-500">Academic</span> Assistant
              </div>
            </h1>
            <p className="text-lg text-gray-200 mb-6 max-w-[500px]">
              Calculate your attendance requirement, track your timetable,
              and monitor your CGPA with smart academic tools.
            </p>

            {/* ✅ Jab button click karein → /login pe navigate */}
            <button
              onClick={() => navigate("/login")}
              className="bg-indigo-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg"
            >
              Get Started
            </button>
          </div>

          {/* This div is now hidden on mobile (hidden) and visible on medium screens and up (md:block) */}
          <div className="hidden md:block absolute bottom-0 right-0 p-4">
            <img
              src="./assets/robot2.png"
              alt="Robot Assistant"
              className="h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
            />
          </div>
        </section>

        <FeatureCards />
        <Footer />
      </div>
    }
  />
</Routes>
  );
}

export default App;
