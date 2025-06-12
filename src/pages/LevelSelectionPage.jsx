// src/pages/LevelSelectionPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const LevelSelectionPage = () => {
    const levels = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <div className="max-w-md mx-auto mt-5 p-4 bg-white rounded-xl shadow-md shadow-green-900 mb-5 hover:shadow-lg transition-all duration-300">
            <h1 className="text-center text-2xl font-bold justify-center items-center text-green-800">Pilih Level Kuis</h1>
            <p className="text-gray-700 max-w-xl mx-auto text-base sm:text-lg mb-8 text-center justify-center items-center">
            Coba Kerjain Quiz, Yuk! Uji pemahaman kamu terhadap pengelolaan sampah!
        </p>
            <ul className="grid grid-cols-2 gap-6">
                {levels.map((level) => (
                    <li key={level}>
                        <Link
                            to={`/quiz?level=${level}`}
                            className="block text-center bg-emerald-700 text-white py-2 rounded-xl shadow-md hover:bg-emerald-400"
                        >
                            Level {level}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LevelSelectionPage;
