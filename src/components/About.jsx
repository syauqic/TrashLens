import React from "react";
import Videocard from "./Video-card";
import InputGambar from "./input-gambar";

export default function About() {
  return (
    <section className="text-center space-y-14 px-4 py-12">
      {/* News Section */}
      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800">NEWS</h2>
        <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto">
          Getting started with kamiudahmudah is simple
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-6">
          {[
            {
              title: "Create an Account",
              desc: "Sign up and get started with free access to academic tools.",
            },
            {
              title: "Browse or Upload",
              desc: "Search for academic materials or support the community with your uploads.",
            },
            {
              title: "Download & Study",
              desc: "Download notes and study guides to prepare with better preparation.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="shadow-md hover:shadow-lg transition-all duration-300 p-6 rounded-lg bg-white"
            >
              <h3 className="text-lg font-semibold text-purple-700 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Waste Detection Section */}
      <div className="bg-[#f8f9ff] py-12 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-8">
          Waste Detection
        </h2>
        <InputGambar />
        {/* <Videocard /> */}
      </div>

      {/* Capstone Section */}
      <div className="space-y-2 px-4">
        <h2 className="text-xl md:text-2xl font-bold text-blue-800">
          CAPSTONE PROJECT
        </h2>
        <p className="text-sm md:text-base text-gray-600 max-w-md mx-auto">
          Our platform is dedicated to the academic success of UMBD students.
        </p>
      </div>
    </section>
  );
}
