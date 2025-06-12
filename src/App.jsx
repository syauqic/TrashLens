import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Side from './components/Side';
import Hero from './components/Hero';
import About from './components/About';
import TrashAI from './components/TrashAI';
import Footer from './components/Footer';
import QuizPage from "./pages/QuizPage";
import LevelSelectionPage from "./pages/LevelSelectionPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ArticlePage from "./pages/ArticlePage";
import VideoPage from "./pages/VideoPage";
import InputGambar from "./components/InputGambar";
import HasilDeteksi from "./components/HasilDeteksi";
import TestimoniSection from "./components/TestimoniSection";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Side />

      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <TrashAI />
            <About />
          </>
        } />
        <Route path="/select-level" element={<LevelSelectionPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/artikel" element={<ArticlePage />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/trashai" element={<InputGambar />} />
        {/* <Route path="/hasil" element={<HasilDeteksi />} /> */}
        <Route path="*" element={<div className="p-4">Halaman tidak ditemukan</div>} />
      </Routes>
      <TestimoniSection />
      <Footer />
    </Router>
  );
}
