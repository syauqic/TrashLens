import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-semibold mb-3">Menu</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Follow Us</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-xs mt-10 border-t border-white/20 pt-4 opacity-80">
          © 2025 Youware. All rights reserved.
        </div>
      </div>
    </footer>
  );
}