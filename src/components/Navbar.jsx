import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // pastikan sudah install: `npm install lucide-react`

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-transparent shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-700">TrashLens</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
          <li>
            <a href="#" className="hover:text-green-600 transition">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-600 transition">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-green-600 transition">
              Contact
            </a>
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
              <a href="#" className="hover:text-green-600 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600 transition">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
