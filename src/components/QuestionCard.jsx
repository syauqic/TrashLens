// src/components/QuestionCard.jsx
import React from "react";

const QuestionCard = ({ question, options, selectedOption, onSelect }) => {
    return (
        <div className="p-4 bg-white rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">{question}</h2>
            <div className="space-y-2">
                {options.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => onSelect(option)}
                        className={`w-full px-4 py-2 text-left rounded-lg border 
              ${selectedOption === option ? "bg-green-100 border-green-400" : "bg-gray-100 border-gray-300"}
              hover:bg-green-50 transition`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuestionCard;
