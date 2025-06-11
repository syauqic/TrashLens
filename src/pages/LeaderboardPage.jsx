// src/pages/LeaderboardPage.jsx
import React from "react";

const dummyData = [
  { name: "", score: 95 },
  { name: "", score: 87 },
  { name: "", score: 83 },
  { name: "", score: 76 },
  { name: "", score: 72 },
];

const LeaderboardPage = () => {
  return (
    <div className="max-w-xl mx-auto mt-10 text-center">
      <h2 className="text-2xl font-bold mb-6">Leaderboard</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Peringkat</th>
            <th className="border-b p-2">Nama</th>
            <th className="border-b p-2">Skor</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((item, index) => (
            <tr key={index}>
              <td className="border-b p-2">{index + 1}</td>
              <td className="border-b p-2">{item.name}</td>
              <td className="border-b p-2">{item.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardPage;
