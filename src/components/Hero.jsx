import React from "react";

export default function Hero() {
  return (
    <section className="w-full flex flex-col items-center text-center px-4 py-10">
      <h2 id="berita" className="text-2xl md:text-3xl font-bold text-blue-800">Berita</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl w-full mx-auto mt-6">
        {[
          {
            title: "",
            desc: "Sampah merupakan sisa material hasil aktivitas manusia yang sudah tidak digunakan lagi dan dibuang. Keberadaan sampah menjadi bagian dari kehidupan sehari-hari, namun jika tidak dikelola dengan baik, dapat menimbulkan dampak negatif terhadap lingkungan dan kesehatan masyarakat.",
          },
          {
            title: "",
            desc: "Pendidikan lingkungan yang dimulai sejak usia dini hingga dewasa sangat penting untuk menumbuhkan kesadaran dan tanggung jawab terhadap sampah. Dengan memahami jenis dan dampak sampah, masyarakat dapat mengelola sampah dengan tepat.",
          },
          {
            title: "",
            desc: "Pengelolaan sampah bukan hanya tanggung jawab pemerintah, melainkan juga merupakan bagian dari peran aktif setiap individu. Dengan memahami pentingnya menjaga kebersihan lingkungan dan mengelola sampah secara bijak, kita semua—baik anak-anak maupun orang dewasa—dapat menjadi agen perubahan menuju masa depan yang lebih bersih, sehat, dan berkelanjutan.",
          },
          // Tambahkan item lainnya di sini jika perlu
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-left"
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