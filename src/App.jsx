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
import ArticlePage from "./pages/ArticlePage";
import VideoPage from "./pages/VideoPage";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Side />

      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <About />
          </>
        } />
        <Route path="/select-level" element={<LevelSelectionPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/artikel" element={<ArticlePage />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="*" element={<div className="p-4">Halaman tidak ditemukan</div>} />
      </Routes>

      <Footer />
    </Router>
  );
}
