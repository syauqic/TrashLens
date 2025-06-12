import React from "react";

export default function Hero() {
  return (
    // <section className="w-full flex flex-col items-center text-center px-4 py-10">
    //   <h2 id="berita" className="text-2xl md:text-3xl font-bold text-green-800">Mengapa Trashlens</h2>

    //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl w-full mx-auto mt-6">
    //     {[
    //       {
    //         title: "",
    //         desc: "Teknologi AI untuk Deteksi Sampah Otomatis TrashLens menggunakan teknologi artificial intelligence TrashAI yang dapat mendeteksi jenis sampah secara otomatis. Ini memudahkan pengguna untuk mengidentifikasi kategori sampah dengan akurat tanpa perlu pengetahuan mendalam tentang klasifikasi sampah, sehingga proses edukasi menjadi lebih interaktif dan praktis.",
    //       },
    //       {
    //         title: "",
    //         desc: "Pendekatan Edukasi Komprehensif Multi-Media Platform ini menyediakan edukasi lengkap melalui berbagai format - teks informatif dan video edukatif. Kombinasi media pembelajaran ini memastikan informasi dapat diserap dengan baik oleh berbagai tipe learner, baik yang lebih suka membaca maupun visual learner yang lebih efektif belajar melalui video.",
    //       },
    //       {
    //         title: "",
    //         desc: "Gamifikasi Pembelajaran melalui s  istem Kuis dengan adanya fitur kuis interaktif, TrashLens mengubah pembelajaran pengelolaan sampah menjadi pengalaman yang engaging dan menyenangkan. Sistem ini membantu mengukur pemahaman pengguna sambil memotivasi mereka untuk terus belajar tentang pengelolaan sampah yang benar.",
    //       },
    //       // Tambahkan item lainnya di sini jika perlu
    //     ].map((item, index) => (
    //       <div
    //         key={index}
    //         className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-left"
    //       >
    //         <div className="p-6">
    //           <h3 className="text-lg font-semibold text-purple-700 mb-2">
    //             {item.title}
    //           </h3>
    //           <p className="text-sm text-gray-600 text-justify">{item.desc}</p>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </section>
    <section className="w-full flex flex-col items-center text-center px-4 py-10 bg-emerald-50">
      <h2 id="berita" className="text-2xl md:text-3xl font-bold text-green-800 ">Mengapa Trashlens</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl w-full mx-auto mt-6">
        {[
          {
            title: "🌐 Platform Edukasi Sampah",
            desc: "TrashLens menggunakan teknologi artificial intelligence TrashAI yang dapat mendeteksi jenis sampah secara otomatis. Ini memudahkan pengguna untuk mengidentifikasi kategori sampah dengan akurat tanpa perlu pengetahuan mendalam tentang klasifikasi sampah, sehingga proses edukasi menjadi lebih interaktif dan praktis.",
          },
          {
            title: "🚀 Teknologi AI dengan Dukungan Konten Terkini",
            desc: "Platform ini menyediakan edukasi lengkap melalui berbagai format - teks informatif dan video edukatif. Kombinasi media pembelajaran ini memastikan informasi dapat diserap dengan baik oleh berbagai tipe learner, baik yang lebih suka membaca maupun visual learner yang lebih efektif belajar melalui video.",
          },
          {
            title: "🎮 Pembelajaran Interaktif yang Terintegrasi",
            desc: "Dengan adanya fitur kuis interaktif, TrashLens mengubah pembelajaran pengelolaan sampah menjadi pengalaman yang engaging dan menyenangkan. Sistem ini membantu mengukur pemahaman pengguna sambil memotivasi mereka untuk terus belajar tentang pengelolaan sampah yang benar.",
          },
          // Tambahkan item lainnya di sini jika perlu
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-Center"
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold text-green-700 mb-2">
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