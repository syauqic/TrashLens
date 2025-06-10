// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Side from './components/Side';
import Hero from './components/Hero';
import About from './components/About';
import Footer from './components/Footer';
import QuizPage from "./pages/QuizPage";
import LevelSelectionPage from "./pages/LevelSelectionPage";
import LeaderboardPage from "./pages/LeaderboardPage";


export default function App() {
  return (
    <Router>
      <Navbar />
      <Side />

      <Routes>
        {/* Halaman utama */}
        <Route path="/" element={
          <>
            <Hero />
            <About />
          </>
        } />

        {/* Halaman pemilih level */}
        <Route path="/select-level" element={<LevelSelectionPage />} />

        {/* Halaman kuis */}
        <Route path="/quiz" element={<QuizPage />} />

        {/* Halaman leaderboard */}
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>

      <Footer />
    </Router>
  );
}
