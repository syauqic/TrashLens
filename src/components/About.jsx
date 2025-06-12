import React from "react";
import Videocard from "./Video-card";
import InputGambar from "./InputGambar";

export default function About() {
  return (
    // <section className="text-center space-y-14 px-4 py-12 bg-emerald-100">
    //   {/* Berita Section */}
    //   <div className="space-y-4">
    //     {/* <h2 className="text-2xl md:text-3xl font-bold text-blue-800">Berita</h2> */}
    //     <h2 id="berita" className="text-2xl md:text-3xl font-bold text-green-800">Fitur Kami</h2> 
    //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-6">
    //       {[
    //         {
    //           title: "🤖 TrashAI - Deteksi Sampah Pintar",
    //           desc: "Mendeteksi dan mengklasifikasi jenis sampah secara otomatis memberikan rekomendasi pengelolaan spesifik teknologi machine learning yang terus berkembang",
    //         },
    //         {
    //           title: "📰 Berita Terkini",
    //           desc: "Update berita terbaru tentang pengelolaan sampah informasi kebijakan lingkungan terkini tren dan inovasi dalam waste management berita lokal dan global tentang isu lingkungan",
    //         },
    //         {
    //           title: "📚 Artikel Edukatif",
    //           desc: "Panduan lengkap pengelolaan sampah tips praktis untuk kehidupan sehari-hari Pengetahuan mendalam tentang daur ulang Best practices pengelolaan sampah rumah tangga",
    //         },
    //         {
    //           title: "🎥 Video Edukasi",
    //           desc: "Tutorial visual step-by-step Demonstrasi praktik pengelolaan sampah Video inspiratif tentang gerakan lingkungan Konten edukatif yang mudah dipahami",
    //         },
    //         {
    //           title: "🎯 Sistem Kuis Interaktif",
    //           desc: "Kuis berdasarkan materi artikel dan video Evaluasi pemahaman real-time di isi dulu bang",
    //         },
    //       ].map((item, index, arr) => {
    //         // Untuk dua terakhir: bungkus dalam baris baru dan center
    //         if (index === 3) {
    //           return (
    //             <div key="last-two" className="col-span-full flex justify-center gap-6 flex-wrap">
    //               {arr.slice(3).map((subItem, subIndex) => (
    //                 <div
    //                   key={subIndex}
    //                   className="shadow-md hover:shadow-lg transition-all duration-300 p-6 rounded-lg bg-white w-full sm:w-72"
    //                 >
    //                   <h3 className="text-lg font-semibold text-purple-700 mb-2">
    //                     {subItem.title}
    //                   </h3>
    //                   <p className="text-sm text-gray-600 whitespace-pre-line">
    //                     {subItem.desc}
    //                   </p>
    //                 </div>
    //               ))}
    //             </div>
    //           );
    //         }

    //         // Tiga fitur pertama tampil normal
    //         if (index < 3) {
    //           return (
    //             <div
    //               key={index}
    //               className="shadow-md hover:shadow-lg transition-all duration-300 p-6 rounded-lg bg-white"
    //             >
    //               <h3 className="text-lg font-semibold text-purple-700 mb-2">
    //                 {item.title}
    //               </h3>
    //               <p className="text-sm text-gray-600 whitespace-pre-line">
    //                 {item.desc}
    //               </p>
    //             </div>
    //           );
    //         }

    //         return null;
    //       })}
    //     </div>
    //   </div>


    //   {/* Waste Detection Section */}
    //   <div className="bg-[#f8f9ff]">
    //     <InputGambar />
    //     {/* <Videocard /> */}
    //   </div>
    // </section>

    <section className="text-center space-y-14 px-4 py-12 bg-emerald-50">
      {/* Fitur Section */}
      <div className="space-y-4">
        {/* <h2 className="text-2xl md:text-3xl font-bold text-green-800">Fitur Kami</h2> */}
        <h2 id="berita" className="text-2xl md:text-3xl font-bold text-green-800">Fitur Kami</h2> 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-6">
          {[
            {
              title: "🤖 TrashAI - Deteksi Sampah Pintar",
              desc: "Mendeteksi dan mengklasifikasi jenis sampah secara otomatis memberikan rekomendasi pengelolaan spesifik teknologi machine learning yang terus berkembang",
            },
            {
              title: "📰 Berita Terkini",
              desc: "Update berita terbaru tentang pengelolaan sampah informasi kebijakan lingkungan terkini tren dan inovasi dalam waste management berita lokal dan global tentang isu lingkungan",
            },
            {
              title: "📚 Artikel Edukatif",
              desc: "Panduan lengkap pengelolaan sampah tips praktis untuk kehidupan sehari-hari Pengetahuan mendalam tentang daur ulang Best practices pengelolaan sampah rumah tangga",
            },
            {
              title: "🎥 Video Edukasi",
              desc: "Tutorial visual step-by-step Demonstrasi praktik pengelolaan sampah Video inspiratif tentang gerakan lingkungan Konten edukatif yang mudah dipahami",
            },
            {
              title: "🎯 Sistem Kuis Interaktif",
              desc: "Kuis berdasarkan materi artikel dan video Evaluasi pemahaman real-time di isi dulu bang",
            },
          ].map((item, index, arr) => {
            // Untuk dua terakhir: bungkus dalam baris baru dan center
            if (index === 3) {
              return (
                <div key="last-two" className="col-span-full flex justify-center gap-6 flex-wrap">
                  {arr.slice(3).map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className="shadow-md hover:shadow-lg transition-all duration-300 p-6 rounded-lg bg-white w-full sm:w-72"
                    >
                      <h3 className="text-lg font-semibold text-green-700 mb-2">
                        {subItem.title}
                      </h3>
                      <p className="text-sm text-gray-600 whitespace-pre-line">
                        {subItem.desc}
                      </p>
                    </div>
                  ))}
                </div>
              );
            }

            // Tiga fitur pertama tampil normal
            if (index < 3) {
              return (
                <div
                  key={index}
                  className="shadow-md hover:shadow-lg transition-all duration-300 p-6 rounded-lg bg-white"
                >
                  <h3 className="text-lg font-semibold text-green-700 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 whitespace-pre-line">
                    {item.desc}
                  </p>
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    </section>
  );
}