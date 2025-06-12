import React, { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbar = document.querySelector("nav");
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const offset = element.offsetTop - navbarHeight - 20;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  const scrollToTop = () => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollToTop: true } });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-green-800 shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <button
          onClick={scrollToTop}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <img
            src="/logotrashlens.png"
            alt="TrashLens Logo"
            className="h-8 w-auto"
          />
          <span className="text-xl font-bold text-white">TrashLens</span>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium text-white items-center">
          <li>
            <button
              onClick={scrollToTop}
              className="hover:text-green-600 transition"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("berita")}
              className="hover:text-green-600 transition"
            >
              Berita
            </button>
          </li>
          <li>
            <Link to="/trashai" className="hover:text-green-600 transition">
              <button
                onClick={() => scrollToSection("InputGambar")}
                className="hover:text-green-600 transition"
              >
                TrashAI
              </button>
            </Link>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("footer")}
              className="hover:text-green-600 transition"
            >
              Contact
            </button>
          </li>

          {/* Edukasi Dropdown */}
          <li className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-1 hover:text-green-600 transition"
            >
              <span>Edukasi</span>
              <ChevronDown size={16} />
            </button>
            {isDropdownOpen && (
              <ul className="absolute top-full mt-2 bg-green-800 text-white rounded-md py-2 w-40 z-50">
                <li>
                  <Link
                    to="/artikel"
                    className="block px-4 py-2 hover:bg-green-700"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Artikel
                  </Link>
                </li>
                <li>
                  <Link
                    to="/video"
                    className="block px-4 py-2 hover:bg-green-700"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Video
                  </Link>
                </li>
                <li>
                  <Link
                    to="/select-level"
                    className="block px-4 py-2 hover:bg-green-700"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Quiz
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col space-y-2 text-sm font-medium text-white">
            <li>
              <button
                onClick={scrollToTop}
                className="hover:text-green-600 transition text-left"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("berita")}
                className="hover:text-green-600 transition text-left"
              >
                Berita
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("footer")}
                className="hover:text-green-600 transition text-left"
              >
                Contact
              </button>
            </li>

            <li className="pt-2 font-semibold text-white">Edukasi</li>
            <li>
              <Link
                to="/artikel"
                onClick={() => setIsOpen(false)}
                className="hover:text-green-600 transition text-left"
              >
                Artikel
              </Link>
            </li>
            <li>
              <Link
                to="/video"
                onClick={() => setIsOpen(false)}
                className="hover:text-green-600 transition text-left"
              >
                Video
              </Link>
            </li>
            <li>
              <Link
                to="/select-level"
                onClick={() => setIsOpen(false)}
                className="hover:text-green-600 transition text-left"
              >
                Quiz
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
