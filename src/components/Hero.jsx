import React from "react";

export default function Hero() {
  return (
    <section className="text-center space-y-6 px-4 py-10">
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
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold text-purple-700 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
