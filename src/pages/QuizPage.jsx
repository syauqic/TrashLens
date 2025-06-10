// src/pages/QuizPage.jsx
import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { quizDataByLevel } from "../data/quizData";
import QuestionCard from "../components/QuestionCard";

const QuizPage = () => {
    const [searchParams] = useSearchParams();
    const levelParam = parseInt(searchParams.get("level"), 10);
    const level = !isNaN(levelParam) && quizDataByLevel[levelParam] ? levelParam : 1;

    const questions = quizDataByLevel[level] || [];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);

    const handleOptionSelect = (option) => {
        setAnswers((prev) => ({ ...prev, [currentQuestion]: option }));
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            setShowResult(true);
        }
    };

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion((prev) => prev - 1);
        }
    };

    const calculateScore = () => {
        const correctCount = questions.filter(
            (q, idx) => q.correctAnswer === answers[idx]
        ).length;
        return Math.round((correctCount / questions.length) * 100);
    };

    if (!quizDataByLevel[level] || questions.length === 0) {
        return (
            <div className="text-center mt-20 text-red-600 font-semibold text-lg">
                Level {level} tidak ditemukan atau belum memiliki soal.
                <div className="mt-4">
                    <Link to="/" className="text-blue-500 underline">Kembali ke Beranda</Link>
                </div>
            </div>
        );
    }

    if (showResult) {
        const score = calculateScore();
        const correctCount = questions.filter(
            (q, idx) => q.correctAnswer === answers[idx]
        ).length;

        let statusMessage = "";
        let statusColor = "";

        if (score >= 90) {
            statusMessage = "🎉 Hebat! Kamu sangat paham tentang pengelolaan sampah.";
            statusColor = "text-green-700";
        } else if (score >= 70) {
            statusMessage = "👍 Bagus! Tapi masih bisa lebih baik.";
            statusColor = "text-blue-700";
        } else if (score >= 50) {
            statusMessage = "⚠️ Lumayan, tapi perlu ditingkatkan lagi.";
            statusColor = "text-yellow-700";
        } else {
            statusMessage = "❗ Yuk, belajar lagi supaya lebih paham.";
            statusColor = "text-red-700";
        }

        return (
            <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Hasil Quiz - Level {level}</h1>
                <p className="text-lg text-center mb-2">
                    Skor Anda: <span className="font-semibold">{score}</span>/100
                </p>
                <p className="text-center mb-4 text-gray-600">
                    ({correctCount} dari {questions.length} soal benar)
                </p>
                <p className={`text-center font-semibold mb-6 ${statusColor}`}>
                    {statusMessage}
                </p>

                {questions.map((q, idx) => {
                    const isCorrect = q.correctAnswer === answers[idx];
                    return (
                        <div key={idx} className={`mb-4 p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                            <p className="font-semibold">{idx + 1}. {q.question}</p>
                            <p>Jawaban Anda: {answers[idx] || 'Tidak dijawab'}</p>
                            <p>Jawaban Benar: {q.correctAnswer}</p>
                            <p className="italic text-sm mt-1">Penjelasan: {q.explanation}</p>
                        </div>
                    );
                })}

                <Link to="/select-level" className="text-blue-500 underline">
                    🔁 Kembali ke Pilih Level
                </Link>


            </div>
        );
    }

    return (
        <div className="max-w-xl mx-auto mt-10 p-4">
            <h2 className="text-center text-xl font-bold mb-6">Kuis Level {level}</h2>

            <QuestionCard
                question={questions[currentQuestion].question}
                options={questions[currentQuestion].options}
                selectedOption={answers[currentQuestion]}
                onSelect={handleOptionSelect}
            />

            <div className="flex justify-between mt-6">
                <button
                    onClick={handlePrev}
                    disabled={currentQuestion === 0}
                    className="bg-gray-300 px-4 py-2 rounded-lg disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                    {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
                </button>
            </div>
        </div>
    );
};

export default QuizPage;
