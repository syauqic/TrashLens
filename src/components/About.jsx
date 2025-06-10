import React from "react";
import Videocard from "./Video-card";
import InputGambar from "./input-gambar";

export default function About() {
  return (
    <section className="text-center space-y-14 px-4 py-12">
      {/* Berita Section */}
      <div className="space-y-4">
        {/* <h2 className="text-2xl md:text-3xl font-bold text-blue-800">Berita</h2> */}
        <h2 className="text-sm md:text-base font-bold text-gray-600 max-w-xl mx-auto">
        Jenis Jenis sampah
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-6">
          {[
            {
              title: "Sampah Organik",
              desc: "Merupakan sampah yang berasal dari bahan alami dan dapat terurai secara alami, seperti sisa makanan, daun kering, dan sayur-sayuran. Sampah ini bisa diolah menjadi kompos yang bermanfaat bagi tanaman.",
            },
            {
              title: "Sampah Anorganik",
              desc: "Berasal dari bahan-bahan yang sulit terurai seperti plastik, kaca, logam, dan kaleng. Sampah ini dapat didaur ulang, namun membutuhkan waktu dan proses khusus.",
            },
            {
              title: "Sampah B3 (Bahan Berbahaya dan Beracun)",
              desc: "Jenis sampah ini mengandung zat berbahaya seperti baterai, pestisida, atau limbah rumah sakit. Penanganannya harus dilakukan secara khusus agar tidak membahayakan manusia dan lingkungan.",
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
          Our platform is dedicated for learning purpose.
        </p>
      </div>
    </section>
  );
}