import React from "react";
import { FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

export default function Footer() {
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
  };
  return (
    <footer id="footer" className="bg-green-800 text-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row justify-between gap-10 text-center md:text-left">
          <div className="flex-1 text-center">
            <h4 className="font-semibold mb-3" id="contact">
              Menu
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={scrollToTop} className="hover:underline">
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("berita")}
                  className="hover:underline"
                >
                  Berita
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("footer")}
                  className="hover:underline"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex-1 text-center">
            <h4 className="font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>trashlens.app@gmail.com</li>
              <li>+62 812-3456-7890</li>
            </ul>
          </div>

          {/* Branding */}
          <div className="flex-1 md:mt-8 lg:mt-0 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide drop-shadow-lg">
              TrashLens
            </h1>
            <p className="text-sm mt-2 text-white/80">
              waste processing education platform.
            </p>

            {/* Social Media Icons */}
            <div className="flex justify-center lg:justify-start gap-4 mt-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 text-xl"
              >
                <FaInstagram />
              </a>
              <a
                href="https://wa.me/62xxxxxxxxxx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 text-xl"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 text-xl"
              >
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs mt-10 border-t border-white/20 pt-4 opacity-80">
          © 2025 TrashLens. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
