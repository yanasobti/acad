import { useState } from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 80; // Height of the navbar, adjust if needed
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setIsMenuOpen(false); // Close mobile menu on link click
  };

  return (
    <header
      id="navbar"
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-black/30 backdrop-blur-md"
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="text-3xl font-bold gradient-text">Acadence</div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-2">
          <a
            href="#for-students"
            onClick={(e) => handleLinkClick(e, '#for-students')}
            className="px-4 py-2 rounded-md hover:bg-white/10 transition-colors"
          >
            Students
          </a>
          <a
            href="#for-teachers"
            onClick={(e) => handleLinkClick(e, '#for-teachers')}
            className="px-4 py-2 rounded-md hover:bg-white/10 transition-colors"
          >
            Teachers
          </a>
          <a
            href="#about"
            onClick={(e) => handleLinkClick(e, '#about')}
            className="px-4 py-2 rounded-md hover:bg-white/10 transition-colors"
          >
            About
          </a>

          {/* ✅ Login button with Router Link */}
          <Link
            to="/login"
            className="ml-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-5 rounded-lg shadow-lg transition-all duration-300"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
