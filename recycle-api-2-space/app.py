import os
import shutil
import io
import logging
import sys
import time

# Hapus gdown dan huggingface_hub karena model sudah ada di Space
# import gdown
# from huggingface_hub import snapshot_download 

import tensorflow as tf
import numpy as np
from PIL import Image

# Hapus import nest_asyncio dan pyngrok karena tidak diperlukan di Hugging Face Spaces
# import nest_asyncio
# from pyngrok import ngrok
# from pyngrok.exception import PyngrokNgrokError

from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

# Konfigurasi logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# --- KONFIGURASI TENSORFLOW: PAKSA GUNAKAN CPU (Lebih Robust) ---
try:
    # Pertama, sembunyikan semua GPU yang terlihat (jika ada)
    gpus = tf.config.list_physical_devices('GPU')
    if gpus:
        tf.config.set_visible_devices([], 'GPU')
        logging.info("GPU telah dinonaktifkan secara eksplisit untuk TensorFlow (tf.config.set_visible_devices).")
    else:
        logging.info("Tidak ada perangkat GPU yang terdeteksi secara fisik.")

    # Kemudian, atur lingkungan agar TensorFlow hanya melihat CPU
    os.environ['CUDA_VISIBLE_DEVICES'] = '-1'
    os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2' # Menyembunyikan beberapa pesan TF yang tidak perlu
    logging.info("Variabel lingkungan CUDA_VISIBLE_DEVICES disetel ke '-1' untuk memastikan hanya CPU yang digunakan.")

except RuntimeError as e:
    logging.warning(f"Tidak dapat mengatur visible devices GPU atau variabel lingkungan: {e}. Melanjutkan.")
# --- AKHIR KONFIGURASI TENSORFLOW ---


# Middleware agar bisa diakses dari frontend (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # bisa disesuaikan untuk keamanan
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- KONFIGURASI MODEL UNTUK saved_model.pb ---
# Jika saved_model.pb dan folder variables ada di root Space,
# maka SAVED_MODEL_DIR bisa disetel ke direktori saat ini ('.')
SAVED_MODEL_DIR = "." # <--- Set direktori model ke direktori saat ini (root Space)

tf_model = None
predict_fn = None

# Memuat model TensorFlow SavedModel
# Logika pengunduhan/ekstraksi telah dihapus karena model sudah ada di Space.
try:
    # Periksa apakah saved_model.pb benar-benar ada di direktori yang ditentukan
    if not os.path.exists(os.path.join(SAVED_MODEL_DIR, "saved_model.pb")):
        raise FileNotFoundError(f"File saved_model.pb tidak ditemukan di {SAVED_MODEL_DIR}. Pastikan model berada di root direktori Hugging Face Space.")

    logging.info(f"Mencoba memuat model TensorFlow dari {SAVED_MODEL_DIR}...")
    tf_model = tf.saved_model.load(SAVED_MODEL_DIR)

    if 'serving_default' in tf_model.signatures:
        predict_fn = tf_model.signatures['serving_default']
        logging.info("Menggunakan signature 'serving_default' untuk prediksi.")
        if hasattr(predict_fn, 'inputs'):
            logging.info(f"Model Input Signature (serving_default): {predict_fn.inputs}")
    else:
        # Coba panggil langsung objek model (untuk model Keras)
        predict_fn = tf_model.__call__
        logging.info("Menggunakan __call__ method untuk prediksi (tidak ada signature 'serving_default').")

    logging.info("Model TensorFlow saved_model.pb berhasil dimuat.")

except Exception as e:
    logging.error(f"ERROR FATAL: Error memuat model saved_model.pb dari {SAVED_MODEL_DIR}: {e}", exc_info=True)
    logging.error("Pastikan struktur direktori SavedModel benar (berisi 'saved_model.pb' dan folder 'variables').")
    sys.exit("Model tidak dapat dimuat. Skrip dihentikan.") # Keluar dari skrip jika error fatal


# PENTING: Sesuaikan `CLASS_NAMES` dengan urutan label yang digunakan saat melatih `saved_model.pb` Anda.
# Urutan ini KRITIS agar hasil prediksi sesuai dengan pesan dan link daur ulang.
CLASS_NAMES = [
    "shoes", "biological", "glass", "metal", "trash", "clothes", "paper", "plastic", "battery", "cardboard"
]

# Mapping label ke daftar link (banyak link per label) - ini tetap sama dari kode Anda
recycle_messages = {
    "shoes": """Wah, kamu baru saja mengunggah gambar sepatu! 👟👠
Tahukah kamu? Sepatu bekas yang masih layak pakai sebaiknya tidak langsung dibuang. Ini beberapa hal yang bisa kamu lakukan:
✅ Gunakan kembali (reuse): Kalau masih bagus, berikan kepada adik atau teman yang membutuhkan.
♻ Daur ulang (recycle): Beberapa tempat menerima sepatu bekas untuk dijadikan bahan lapangan olahraga atau konstruksi.
🎨 Kreatif: Jadikan pot tanaman unik atau tempat alat berkebun mini yang lucu!
🌱 Dengan mengelola sepatu bekas dengan baik, kamu sudah membantu mengurangi sampah dan melindungi lingkungan. Keren!""",
    "biological": """Wah, kamu baru saja mengunggah gambar sampah organik! 🍌🍎
Tahukah kamu? Sampah organik seperti kulit buah dan sisa makanan bisa menjadi harta karun untuk tanaman! Ini yang bisa kamu lakukan:
✅ Gunakan kembali (reuse): Kulit pisang bisa jadi pupuk langsung untuk tanaman di rumah.
♻ Daur ulang (recycle): Ajak keluarga membuat kompos sederhana di halaman rumah.
🎨 Kreatif: Buat "bank sampah organik" dari botol bekas dan amati prosesnya!
🌱 Dengan mengolah sampah organik jadi kompos, kamu sudah membantu tanaman tumbuh subur. Hebat sekali!""",
    "glass": """Wah, kamu baru saja mengunggah gambar kaca! 🍶✨
Tahukah kamu? Kaca bisa didaur ulang berkali-kali tanpa kehilangan kualitasnya! Ini yang bisa kamu lakukan:
✅ Gunakan kembali (reuse): Botol kaca bisa jadi tempat pensil atau vas bunga cantik.
♻ Daur ulang (recycle): Kumpulkan dan bawa ke tempat pengumpulan kaca khusus.
🎨 Kreatif: Hias dengan tali warna-warni atau jadikan lampu tidur sederhana!
🌱 Satu botol kaca yang didaur ulang menghemat energi untuk menyalakan lampu 4 jam! Kamu sangat membantu bumi!""",
    "metal":"""Wah, kamu baru saja mengunggah gambar logam! 🥤⚙️
Tahukah kamu? Mendaur ulang logam menghemat energi hingga 95%! Ini yang bisa kamu lakukan:
✅ Gunakan kembali (reuse): Kaleng bekas bisa jadi tempat pensil atau pot tanaman kecil.
♻ Daur ulang (recycle): Logam sangat berharga untuk didaur ulang jadi barang baru.
🎨 Kreatif: Buat robot lucu atau hiasan mozaik dari tutup logam!
🌱 Dengan mendaur ulang satu kaleng, kamu menghemat energi untuk menonton TV 3 jam. Luar biasa!""",
    "trash":"""Wah, kamu baru saja mengunggah gambar sampah sulit daur ulang! 🗑️⚠️
Tahukah kamu? Sampah seperti bungkus permen dan sedotan plastik sulit sekali didaur ulang. Yang paling penting adalah menguranginya:
✅ Kurangi (reduce): Hindari barang sekali pakai seperti sedotan plastik dan sendok plastik.
♻ Ganti alternatif: Bawa tempat makan dan botol minum sendiri dari rumah.
🎨 Pilih bijak: Pilih snack dengan kemasan ramah lingkungan atau buat sendiri di rumah!
🌱 Dengan mengurangi sampah sulit daur ulang, kamu jadi pahlawan lingkungan sejati. Kamu luar biasa!""",
    "clothes":"""Wah, kamu baru saja mengunggah gambar pakaian! 👕👖
Tahukah kamu?
Pakaian yang sudah tidak dipakai sebaiknya tidak langsung dibuang ke tempat sampah biasa. Ini beberapa hal yang bisa kamu lakukan:
✅ Gunakan kembali (reuse): Kalau masih bagus, kamu bisa memakainya lagi atau memberikannya kepada orang yang membutuhkan.
 ♻️ Daur ulang (recycle): Ada tempat khusus yang menerima pakaian bekas untuk diubah menjadi bahan baru, seperti kain pel atau isian bantal.
 🎨 Kreatif: Kamu bisa memotong kainnya untuk dijadikan tas kecil, dompet, atau hiasan dinding!
🌱 Dengan tidak membuang pakaian sembarangan, kamu sudah membantu bumi tetap bersih dan sehat. Hebat!""",
    "paper":"""Kamu baru saja mengunggah gambar kertas! 📄✂️
Tahukah kamu?
Kertas bisa dengan mudah didaur ulang dan digunakan kembali. Tapi kita juga harus hati-hati agar tidak membuang kertas sembarangan.
Ini yang bisa kamu lakukan:
✅ Pisahkan kertas dari sampah basah, supaya tidak rusak dan bisa didaur ulang.
 🎨 Gunakan sisi kosongnya untuk menggambar atau mencatat.
 📦 Kumpulkan kertas bekas dan kirim ke tempat daur ulang, atau berikan ke bank sampah.
🌍 Kertas berasal dari pohon. Semakin banyak kita mendaur ulang, semakin banyak pohon yang bisa diselamatkan!""",
    "plastic":"""Kamu baru saja mengunggah gambar plastik! 🛍️🥤
Tahukah kamu?
Plastik sulit terurai dan bisa mencemari lingkungan selama ratusan tahun! Tapi jangan khawatir, kamu bisa membantu bumi dengan cara yang mudah:
✅ Gunakan ulang plastik seperti botol atau kantong belanja.
 🚮 Pisahkan sampah plastik dari yang lain, supaya mudah didaur ulang.
 🏫 Bawa tempat minum sendiri ke sekolah, supaya tidak beli botol plastik terus.
🌊 Banyak hewan laut yang sakit karena makan plastik. Yuk, kita bantu mereka dengan membuang plastik di tempat yang benar!""",
    "battery":"""Wah, kamu mengunggah gambar baterai!
Tahukah kamu?
Baterai bekas itu berbahaya, lho! Kalau dibuang sembarangan, bisa mencemari tanah dan air karena mengandung zat kimia beracun.
🛑 Jangan buang baterai ke tempat sampah biasa!
🟢 Apa yang harus kamu lakukan?
 ✅ Kumpulkan baterai bekas di wadah khusus.
 ✅ Minta bantuan orang tua atau guru untuk membawanya ke tempat penampungan baterai.
 ✅ Ingatkan teman-teman juga agar tidak membuang baterai sembarangan.
⚠️ Satu baterai kecil bisa mencemari ratusan liter air. Yuk, jadi pahlawan lingkungan dengan membuangnya di tempat yang benar!""",
    "cardboard":"""Keren! Kamu mengunggah gambar kardus.
Tahukah kamu?
Kardus itu bisa didaur ulang, lho! Daripada dibuang, lebih baik digunakan kembali atau dijual ke tempat daur ulang.
🟢 Apa yang bisa kamu lakukan dengan kardus?
 ✅ Gunakan lagi untuk menyimpan barang.
 ✅ Jadikan bahan kerajinan tangan, seperti rumah-rumahan atau tempat pensil!
 ✅ Lipat rapi dan kumpulkan untuk didaur ulang.
🎨 Dengan sedikit kreativitas, kardus bisa jadi mainan atau alat belajar yang seru!
🌱 Yuk, kurangi sampah dengan mendaur ulang kardus dan menjaga bumi tetap bersih!"""
}

# Mapping label ke daftar link (banyak link per label)
recycle_links = {
    "cardboard": [
        "https://youtu.be/A5vDaQSpkSM?si=L2AET_5yspaZFrZc",
        "https://youtu.be/GIjS7Rv7lyg?si=Vq3dsDqUyR9J5Ia0",
        "https://youtu.be/rIAwV8ucvaY?si=FW037oACMD9O-Oq8",
        "https://youtu.be/-WPRaZ_SO9E?si=6owXGM-EjYcICoiP",
        "https://youtu.be/o4oQ1I7RYeg?si=iJGl4Tve2vEoBBHN",
        "https://youtu.be/T7I5arklM3o?si=Y8Tvz2XSbFXBxXhA",
        "https://youtu.be/t9qQRbz7ZIs?si=VK7c1ELIKBZFVZFA",
        "https://youtu.be/c-m-EpgpssM?si=-vIXTHjqTmPa8Ioq",
        "https://vt.tiktok.com/ZShwtUbU2/"
    ],
    "shoes": [
        "https://youtu.be/9Nv03-tKM5w?si=OSx5D5RA9LtMGOQt",
        "https://youtu.be/R85b3lxOKvY?si=jEDjEClsFPIA_E0p",
        "https://youtu.be/n86OX7b994U?si=uLG7qGsnwPmL5hxy",
        "https://youtu.be/8syHrV83sH4?si=CsoeKmWDHuBosUs-",
        "https://youtu.be/-ZDqXqeiKdA?si=1jhsAywORrUOVDVh",
        "https://youtu.be/ZuEQzhfdjUw?si=zby4laSYYh5dpJE-",
        "https://youtu.be/LtIeleKkLnM?si=KagopuDfBKc250Q6",
        "https://youtu.be/zw-Unekn1I8?si=HPgnHE9OoUmzseKn",
        "https://vt.tiktok.com/ZShwWkULG/"
    ],
    "biological": [
        "https://youtu.be/_hAv9wrPAvc?si=Ktg5z_a4aWMr9wj5",
        "https://youtu.be/Yu2rQlGTWfA?si=WRXQkXUxewEu4YNb",
        "https://youtu.be/wus8-Fkk_s8?si=QB7aKhq9fZfvNN2q",
        "https://youtu.be/YU9AzKf2ZFA?si=p42PzTTCp_QxVphW",
        "https://youtu.be/ftaxJ2C7LKA?si=tVcgE2OrYb63QQfD",
        "https://youtu.be/sZoa4ZrSkZ4?si=sRdnIL5s1Td2kEc5",
        "https://youtu.be/ol8CF1n29oA?si=7UpUW7yXVRS-kawk",
        "https://youtu.be/h1w4D6zbeKE?si=R86ygsiijbmI77Jv",
        "https://vt.tiktok.com/ZShEfgd8s/"
    ],
    "glass": [
        "https://youtu.be/Ny8Af_ADvtg?si=8fKN7ms8zrw541LV",
        "https://youtu.be/kZCpesLOuns?feature=shared",
        "https://youtu.be/Um2CBJXsGOo?si=ncY8YRnVeWJsg1fw",
        "https://youtu.be/L3LCG9ly0aM?si=MO_ntD2XFcjd_eeF",
        "https://youtu.be/O82eQHLG70k?si=eLkisKKxpBTeGnPK",
        "https://youtu.be/9FUG5ZZBCVk?si=70J14_llgywteeuz",
        "https://youtu.be/Ua3DuBXCU_A?si=ds-up2OpIdSINd6c",
        "https://vt.tiktok.com/ZShEPsBd9/"
    ],
    "metal": [
        "https://youtu.be/9do7RzfrXZ0?si=8QlAs623-oFaCnq_",
        "https://youtu.be/YUJf9dPKT-M?si=6nuf76T5vR8egSZQ",
        "https://youtu.be/WPvZEPnxUV4?si=mNTwdQzJyJAfO2XC",
        "https://youtu.be/V1SO4OSkGbk?si=6lDANB_3J5Xs3twi",
        "https://youtu.be/aHNeaA_BX1s?si=V-K7oJgXfgWmnNgm",
        "https://youtu.be/mkMZcqdyyXk?si=tpUynuz_lJA3HbU1",
        "https://youtu.be/SdCEEaeX2sk?si=B4RRIFeT6HW0l4zj",
        "https://youtu.be/HoYIos9pWMY?si=Bi4RtouMRbb0ha7H",
        "https://vt.tiktok.com/ZShE548Gp/"
    ],
    "trash": [
        "https://youtu.be/ogE3n_KdYfg?si=loCcrI0TtqxW5twh",
        "https://youtu.be/MJd3bo_XRaU?si=Y9lKJHhyIjvI2KcX",
        "https://youtu.be/WQCevNdGOUs?si=VKSOuDY9aebW7e_x",
        "https://youtu.be/Yv19QNLuMlc?si=Vj1nzXuCaTou4F_t",
        "https://youtu.be/ZyQ4ju-a9WM?si=UZ_sm2nEEhtlT76L",
        "https://youtu.be/T2Hu0fjuX5k?si=z6OMePdh8fvMkowY",
        "https://youtu.be/8YzK2gbuYnU?si=1Y2Xg0JUJc5LGfsn",
        "https://youtu.be/86VsLdF-cig?si=K0W2PBQCDj4_Djbq",
        "https://vt.tiktok.com/ZShEa4cTB/"
    ],
    "clothes": [
        "https://www.youtube.com/watch?v=H8KW1pfy95g",
        "https://www.youtube.com/watch?v=Vp12LHCB3vo",
        "https://www.youtube.com/watch?v=svUFkm0a9Ic",
        "https://www.youtube.com/watch?v=8JKpXxIpSys",
        "https://www.youtube.com/watch?v=rrO-xk4d0DA",
        "https://www.tiktok.com/@greenwelfare.id/video/7397408102569610502?q=DIY%20baju%20bekas&t=1748407898675"
    ],
    "paper": [
        "https://www.youtube.com/watch?v=Ydjg8pnJGqA",
        "https://www.youtube.com/watch?v=j1zXMpc-1As",
        "https://www.youtube.com/watch?v=rgh_hI712bI",
        "https://www.tiktok.com/@ricegrains_manual/video/7218887274853944618?q=DIY%20kertas&t=1748408475051",
        "https://www.tiktok.com/@katrinasartt/video/7486137444778249494?q=DIY%20kertas&t=1748408475051",
        "https://www.tiktok.com/@chellerodrigueez/video/7314762408684227846?q=DIY%20kertas&t=1748408475051"
    ],
    "plastic": [
        "https://www.youtube.com/watch?v=ogE3n_KdYfg&pp=ygUQRElZIGtlcnRhcyBiZWthaW5saWVydGFzIGxlcnRhYm9lZ2Vy",
        "https://www.youtube.com/watch?v=k1jVoQ1tKAI&pp=ygUQRElZIGtlcnRhcyBiZWthaW5saWVydGFzIGxlcnRhYm9lZ2Vyas",
        "https://www.youtube.com/watch?v=KDuX9siPT6U",
        "https://www.youtube.com/watch?v=VBvwdSC0POU",
        "https://www.youtube.com/watch?v=Xs2hAWuPmSg",
        "https://www.tiktok.com/@listatsurayya/video/7468523949735857413?q=DIY%20plastik&t=1748408984145",
        "https://www.tiktok.com/@derya.tavas/video/7336981410504363297?q=DIY%20plastik&t=1748408984145"
    ],
    "battery": [
        "https://www.youtube.com/watch?v=D7td95ySam8",
        "https://www.youtube.com/watch?v=EqD8iW97p9Q",
        "https://www.youtube.com/watch?v=tWfX2e-kKrU"
    ]
}

# Menambahkan endpoint root untuk memberikan pesan selamat datang
@app.get("/")
async def read_root():
    return {"message": "Selamat datang di API Klasifikasi Sampah! Gunakan endpoint /predict (POST) untuk mengunggah gambar."}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Periksa apakah model TensorFlow berhasil dimuat
    if predict_fn is None:
        logging.error("Permintaan diterima, tetapi model TensorFlow belum dimuat. Mengembalikan status 500.")
        return JSONResponse(content={"error": "Model TensorFlow belum dimuat. Periksa log server untuk detailnya."}, status_code=500)

    try:
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        logging.info("Gambar diterima dan dikonversi ke RGB.")

        # PENTING: Sesuaikan ukuran input dengan yang diharapkan oleh model saved_model.pb Anda
        # Contoh: Untuk model yang dilatih dengan input 224x224 piksel
        input_size = (224, 224) # Anda perlu mengonfirmasi ukuran ini dari model Anda
        image = image.resize(input_size)
        img_array = np.array(image).astype(np.float32)

        # PENTING: Sesuaikan normalisasi gambar sesuai dengan yang digunakan saat melatih model Anda
        # Contoh: Normalisasi piksel dari 0-255 menjadi 0-1
        img_array = img_array / 255.0 # Anda perlu mengonfirmasi metode normalisasi ini dari model Anda

        # Tambahkan dimensi batch (misal: (1, tinggi, lebar, channel))
        img_array = np.expand_dims(img_array, axis=0)
        logging.info(f"Gambar diproses: shape={img_array.shape}, dtype={img_array.dtype}")

    except Exception as e:
        logging.error(f"Error saat pra-pemrosesan gambar: {e}")
        return JSONResponse(content={"error": f"Gagal memproses gambar: {e}. Pastikan format gambar benar."}, status_code=400)


    try:
        # --- PERBAIKAN DI SINI: PAKSA INFERENSI KE CPU ---
        with tf.device('/CPU:0'):
            # Gunakan 'input_2' sebagai nama argumen input sesuai dengan error terakhir
            # tf_results = predict_fn(input_2=tf.constant(img_array))
            tf_results = predict_fn(images=tf.constant(img_array))
        # --- AKHIR PERBAIKAN ---

        logging.info(f"Inferensi model selesai. Tipe hasil: {type(tf_results)}")
        if isinstance(tf_results, dict):
            logging.info(f"Kunci yang tersedia di hasil model: {list(tf_results.keys())}")

        predictions_tensor = None
        # Asumsi: Output adalah dictionary dan berisi tensor prediksi.
        # Anda mungkin perlu menyesuaikan kunci ('output_0', 'logits', 'predictions', dll.)
        # berdasarkan model spesifik Anda.
        if isinstance(tf_results, dict):
            # Mencoba beberapa kunci umum untuk tensor output
            if 'output_0' in tf_results:
                predictions_tensor = tf_results['output_0']
            elif 'predictions' in tf_results: # Umum untuk model Keras yang diekspor
                predictions_tensor = tf_results['predictions']
            elif 'logits' in tf_results: # Kunci lain yang mungkin
                predictions_tensor = tf_results['logits']
            elif 'output' in tf_results: # Kunci lain yang mungkin
                predictions_tensor = tf_results['output']
            else:
                # Jika kunci tidak standar, coba ambil nilai pertama dari dictionary
                predictions_tensor = list(tf_results.values())[0]
                logging.warning(f"Kunci prediksi tidak standar, mengambil nilai pertama dari hasil: {list(tf_results.keys())[0]}")
        else:
            predictions_tensor = tf_results # Asumsi tf_results langsung tensor output

        if predictions_tensor is None:
            raise ValueError("Tidak dapat menemukan tensor prediksi yang sesuai di hasil model.")

        # Terapkan softmax jika output model adalah logits (nilai mentah).
        # Jika model Anda sudah mengeluarkan probabilitas (nilai antara 0 dan 1), lewati tf.nn.softmax.
        # Biasanya model klasifikasi outputnya logits, jadi softmax diperlukan.
        probs = tf.nn.softmax(predictions_tensor).numpy()[0]
        logging.info(f"Probabilitas prediksi: {probs}")

    except Exception as e:
        logging.error(f"Error saat inferensi model: {e}", exc_info=True) # exc_info=True untuk detail traceback
        return JSONResponse(content={"error": f"Gagal melakukan inferensi model: {e}. Periksa input model dan struktur output."}, status_code=500)

    # Dapatkan top 2 prediksi berdasarkan probabilitas tertinggi
    top_indices = np.argsort(probs)[::-1][:len(CLASS_NAMES)]
    top_values = probs[top_indices]

    top_confidence = float(top_values[0]) * 100
    logging.info(f"Prediksi teratas: {CLASS_NAMES[top_indices[0]]} dengan confidence {top_confidence:.2f}%")

    predictions = []
    indices_to_process = top_indices[:1] if top_confidence >= 85 else top_indices[:10]

    for idx in indices_to_process:
        if idx < len(CLASS_NAMES):
            label = CLASS_NAMES[idx]
            confidence = float(probs[idx]) * 100
            links = recycle_links.get(label, ["https://example.com/default"])
            predictions.append({
                "label": label,
                "confidence": round(confidence, 2),
                "recycle_links": links,
                "message": recycle_messages.get(label, "Belum ada informasi pengelolaan untuk sampah ini.")
            })
        else:
            logging.warning(f"Peringatan: Indeks prediksi {idx} di luar jangkauan CLASS_NAMES. Abaikan.")

    logging.info("Prediksi API berhasil.")
    return JSONResponse(content={"top_predictions": predictions})
