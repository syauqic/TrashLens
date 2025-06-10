import React from "react";

const Videocard = () => {
  return (
    <>
      {/* Waste Detection Section */}
      <section className="bg-[#f8f9ff] py-12 px-4">
        <div className="flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto">
          {/* Video Placeholder */}
          <div className="w-full md:w-1/2">
            <div className="relative bg-gray-800 rounded-xl overflow-hidden group shadow-xl">
              <div className="w-full h-64 bg-gray-500 group-hover:scale-105 transition-transform duration-300"></div>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 hover:bg-white rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  ▶
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="w-full md:w-1/2 text-left">
            <div className="border-l-4 border-pink-400 pl-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                Komunitas Edukasi
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Share your notes, assignments and study materials with fellow
                students in just a few clicks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Videos Section */}
      <section className="bg-[#f5f7ff] py-12 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-800">
          Vidio Terkait
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className="relative bg-gray-800 rounded-xl overflow-hidden cursor-pointer group shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="w-full h-48 bg-gray-500 group-hover:scale-105 transition-transform duration-300"></div>
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-300">
                  ▶
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h4 className="text-white font-semibold text-sm">
                  Video Edukasi Sampah {index}
                </h4>
                <p className="text-gray-300 text-xs mt-1">
                  Pelajari cara mengelola sampah dengan benar
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Videocard;
