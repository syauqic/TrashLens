import React from "react";
import { Leaf } from "lucide-react";

const articles = [
  {
    title: "Apa Itu Daur Ulang? Yuk, Kenali Cara Menjaga Bumi Sejak Dini!",
    content:
      "Hai, teman! 🌍\nTahukah kamu kalau Bumi kita bisa kelelahan karena terlalu banyak sampah?\nTapi tenang! Ada cara keren untuk membantu Bumi, namanya daur ulang.\n\nDaur ulang adalah proses mengubah sampah menjadi barang baru yang bisa dipakai lagi.\nMisalnya, botol plastik bisa jadi tas, atau kertas bekas bisa jadi buku catatan!\n\nDengan daur ulang, kita:\n- Mengurangi sampah yang menumpuk\n- Menjaga hewan dan tumbuhan tetap aman\n- Menghemat sumber daya alam\n\nYuk, mulai dari hal kecil, seperti memisahkan sampah di rumah! 💪🌱",
  },
  {
    title: "5 Jenis Sampah yang Harus Kamu Tahu: Dari Kardus Sampai Baterai",
    content:
      "Teman-teman, sampah itu ternyata beda-beda, lho! Yuk kenalan dengan 5 jenisnya:\n\n🟤 Organik – Sampah dari sisa makanan, daun, atau kulit buah. Bisa jadi kompos!\n🔵 Anorganik – Seperti plastik, botol, dan kaleng. Bisa didaur ulang.\n🟢 Kaca – Seperti botol sirup atau stoples bekas. Hati-hati, tajam!\n🔴 B3 (Bahan Berbahaya & Beracun) – Misalnya baterai dan lampu neon. Harus dibuang di tempat khusus.\n🟡 Kertas – Kardus, majalah, dan kertas bekas. Bisa jadi buku gambar baru!\n\nWah, seru ya kalau kita bisa bantu memilah semua ini! 🌟",
  },
  {
    title: "Main Seru Sambil Belajar: Ide Kerajinan dari Sampah Rumah Tangga",
    content:
      "Siapa bilang sampah nggak bisa jadi mainan? Yuk coba buat ini!\n\n🎨 Kumbang dari Tutup Botol\n🎨 Kotak Pensil dari Kardus Bekas\n🎨 Robot dari Sendok Plastik\n\nSeru, kan? Selain kreatif, kamu juga bantu kurangi sampah! 💡♻️",
  },
  {
    title:
      "Superhero Sampah: Siapa Bilang Anak-Anak Tidak Bisa Selamatkan Bumi?",
    content:
      "Halo, Superhero Muda! 🦸‍♀️🦸‍♂️\nTahukah kamu, kamu bisa jadi pahlawan untuk Bumi hanya dengan memisahkan sampah dan tidak membuang sembarangan?\n\nSetiap kali kamu:\n- Memungut sampah di taman\n- Membawa botol minum sendiri\n- Membuat kerajinan dari barang bekas\n\n...kamu sedang menyelamatkan lingkungan, loh!\n\nTidak perlu jubah, cukup aksi nyata dari hati yang peduli.\nYuk, terus jadi pahlawan ramah lingkungan! 🌏✨",
  },
  {
    title: "Sampahku Tanggung Jawabku: Cerita Anak yang Rajin Pilah Sampah",
    content:
      'Namanya Rara. Setiap hari, Rara punya tugas kecil di rumah: memilah sampah.\nDia punya tiga tempat sampah kecil:\n- satu untuk plastik\n- satu untuk kertas\n- satu untuk sisa makanan\n\nAwalnya, teman-temannya heran. Tapi sekarang, mereka ikut-ikutan!\n\n"Karena aku sayang Bumi," kata Rara sambil tersenyum. 🌼\n\nTernyata, hal kecil yang dilakukan Rara bisa menular jadi kebaikan besar.\nYuk, jadi seperti Rara. Sampah kita, tanggung jawab kita! 💚',
  },
  {
    title: "Kenapa Tempat Sampah Punya Warna-Warni? Yuk, Cari Tahu!",
    content:
      "Dita dan Tim Superhero Sampah 💥🦸‍♀️🌍\n\nDita melihat ada empat tempat sampah warna-warni di taman sekolah: biru, hijau, kuning, dan merah.\nPak Eko pun menjelaskan:\n\n🟩 Hijau = Sampah organik 🍌🍂\n🟨 Kuning = Sampah anorganik ♻️🥤\n🟦 Biru = Sampah kertas 📦📘\n🟥 Merah = Sampah B3 ⚡💡\n\nDita terpesona! ✨\n“Wah, tempat sampah juga bisa jadi pahlawan! Aku juga mau bantu jadi ‘Pahlawan Sampah’!” 🦸‍♀️🗑️",
  },
  {
    title: "Bikin Kompos di Rumah? Gampang Banget, Kok!",
    content:
      "Rafa dan Kompos Ajaib 🌱🍲✨\n\nAyah Rafa mengajak membuat kompos dari sisa makanan.\nMereka menyiapkan ember khusus, lalu mengaduk dan memberi air setiap hari.\n\nBeberapa minggu kemudian… TADAAA! 🎉\nIsi ember berubah jadi tanah yang gembur dan wangi! 🌿🌸\n\n“Wah, ini kayak sihir! Aku sukaaaa!” kata Rafa. 🪄🪴\n\nYuk, teman-teman! Buat kompos juga di rumah dan bantu Bumi jadi lebih bahagia! 🌻🍃💚",
  },
  {
    title: "Petualangan Si Botol Plastik: Dari Tong Sampah ke Kaos Keren",
    content:
      "Boty Si Botol yang Reborn 💧➡️🧵👕\n\nBoty merasa sedih karena dianggap sampah, tapi Lulu memasukkannya ke tempat sampah kuning 🟨.\nIa dibawa ke pabrik daur ulang dan diubah jadi kaos olahraga keren! 🟦👕\n\n“Aku bukan sampah lagi! Aku bermanfaat untuk manusia!” teriak Boty bangga. 💙🎽\n\nYuk, bantu teman seperti Boty dengan memilah plastik ke tempat yang tepat! 🔁🧢🎒",
  },
  {
    title: "Tantangan 7 Hari Bebas Plastik: Berani Coba?",
    content:
      "Tantangan Seru 7 Hari Bebas Plastik 🚫🛍️🎯\n\nTama dan Nia ikut tantangan dari Bu Rina: hidup 7 hari tanpa plastik sekali pakai!\n\nHari-hari mereka:\n📅 Hari 1: Bawa botol minum sendiri\n🍱 Hari 2: Pakai kotak makan\n🛍️ Hari 3: Tas belanja kain\n🥤 Hari 4: Tolak sedotan plastik\n🧼 Hari 5: Sabun batang\n🧹 Hari 6: Kumpulkan plastik\n🎨 Hari 7: Bikin kerajinan\n\nAkhirnya mereka diberi gelar: 🎖️ Pahlawan Bumi 2025!\n\nMau coba juga? Tantang temanmu, yuk! 💡🌍",
  },
  {
    title: "Puzzle Sampah: Tebak Sampah Ini Harus Masuk Tempat Mana?",
    content:
      "Detektif Sampah dan Misteri Sampahland 🕵️‍♂️🔎🗺️\n\nKamu jadi detektif lingkungan yang bantu sampah menemukan tempatnya:\n📦 Kardus = Biru 🟦\n🍉 Kulit semangka = Hijau 🟩\n🥤 Sedotan plastik = Kuning 🟨\n🔋 Baterai bekas = Merah 🟥\n\nSelamat! Kamu resmi jadi Penyelamat Sampahland! 🎖️🌟🌍",
  },
  {
    title: "Keluarga Zero Waste: Cerita Seru Hidup Minim Sampah",
    content:
      "Keluarga Zera dan Misi Minim Sampah 👨‍👩‍👧‍👦🧹✨\n\nMereka punya moto: “Buang Sampah Sekecil Mungkin!” 🚫🗑️\n\n👩‍🍳 Ibu: belanja pakai tas kain\n👨‍🔧 Ayah: buat komposter dari ember\n👧 Kakak: buat tas dari jeans lama\n👦 Adik: bikin robot dari kardus susu 🤖\n\nKamu juga bisa seperti mereka dengan:\n✅ Bawa tas belanja sendiri\n✅ Gunakan botol minum\n✅ Pilah sampah\n✅ Hindari plastik sekali pakai\n\nJadilah bagian dari perubahan. Bumi butuh pahlawan sepertimu! 💚🌎💫",
  },
];

export default function ArticlePage() {
  return (
    <div className="bg-green-50 min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-12 animate-fade-in-down">
        <h1 className="text-3xl sm:text-4xl font-bold text-green-800 mb-3 flex justify-center items-center gap-2">
          <Leaf className="text-green-600 w-6 h-6" />
          Artikel Edukatif Ramah Lingkungan
        </h1>
        <p className="text-gray-700 max-w-xl mx-auto text-base sm:text-lg">
          Yuk, belajar cara menjaga bumi dengan cara seru dan mudah dimengerti!
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <article
            key={index}
            className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 rounded-2xl p-6 flex flex-col animate-fade-in-up"
            style={{
              animationDelay: `${index * 0.1}s`,
              animationFillMode: "both",
            }}
          >
            <div className="flex items-start mb-3">
              <Leaf className="text-green-500 mt-1 mr-2" />
              <h2 className="text-lg sm:text-xl font-semibold text-green-900 leading-snug">
                {article.title}
              </h2>
            </div>
            <p className="text-gray-800 text-sm sm:text-base leading-relaxed whitespace-pre-line flex-grow">
              {article.content}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
