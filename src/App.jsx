import { useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Squares from "./components/Squares";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FeatureCards from "./components/FeatureCard";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TeacherDash from "./pages/TeacherDash";
import RequireAuth from "./RequireAuth";  
import Signup from "./pages/Signup.jsx";


function App() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true, offset: 50 });
  }, []);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/about" element={<AcadenceAbout />} /> {/* ✅ new route */}

  {/* Teacher dashboard (protected) */}
  <Route
    path="/teacher"
    element={
      <RequireAuth allowedRoles={["teacher"]}>
        <TeacherDash />
      </RequireAuth>
    }
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

            {/* Navbar */}
            <header className="absolute top-4 left-0 w-full z-50">
              <Navbar />
            </header>

        <section className="relative h-screen flex items-center px-10 ml-[10em]">
          <div className="max-w-lg z-10">
            <h1 className="text-6xl font-extrabold leading-tight mb-4">
              AI-Powered
              <div className="flex gap-4">
                <span className="text-indigo-500">Academic</span> Assistant
              </div>
            </h1>
            <p className="text-lg text-gray-200 mb-6 max-w-[500px]">
              Calculate your attendance requirement, track your timetable,
              and monitor your CGPA with smart academic tools.
            </p>

                <button
                  onClick={() => navigate("/login")}
                  className="bg-indigo-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg"
                >
                  Get Started
                </button>
              </div>

          <div className="absolute bottom-0 right-0 p-4">
            <img
              src="./assets/robot2.png"
              alt="Robot Assistant"
              className="h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]"
            />
          </div>
        </section>

            {/* Feature Cards & Footer */}
            <FeatureCards />
            <Footer />
          </div>
        }
      />
    </Routes>
  );
}

export default App;
