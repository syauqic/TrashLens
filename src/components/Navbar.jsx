import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - navbarHeight - 20;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
    setIsOpen(false);
  };

  const scrollToTop = () => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollToTop: true } });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-green-200 shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <button onClick={scrollToTop} className="text-xl font-bold text-green-700">
          TrashLens
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium text-gray-700 items-center">
          <li>
            <button onClick={scrollToTop} className="hover:text-green-600 transition">
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
            <button
              onClick={() => scrollToSection("footer")}
              className="hover:text-green-600 transition"
            >
              Contact
            </button>
          </li>
          <li>
            <Link
              to="/quiz"
              className="text-white bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Mulai Quiz
            </Link>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col space-y-2 text-sm font-medium text-gray-700">
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
            <li>
              <Link
                to="/quiz"
                onClick={() => setIsOpen(false)}
                className="text-white bg-green-600 px-4 py-2 rounded-lg text-center hover:bg-green-700 transition"
              >
                Mulai Quiz
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
