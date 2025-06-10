// src/pages/LevelSelectionPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const LevelSelectionPage = () => {
    const levels = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <div className="max-w-md mx-auto mt-10 p-4">
            <h1 className="text-center text-2xl font-bold mb-6">Pilih Level Kuis</h1>
            <ul className="grid grid-cols-2 gap-4">
                {levels.map((level) => (
                    <li key={level}>
                        <Link
                            to={`/quiz?level=${level}`}
                            className="block text-center bg-blue-500 text-white py-2 rounded-xl shadow-md hover:bg-blue-600"
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
