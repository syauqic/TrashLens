import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const labelTranslations = {
    cardboard: "Sampah Kardus",
    shoes: "Sampah Sepatu",
    biological: "Sampah Organik",
    glass: "Sampah Kaca",
    metal: "Sampah Logam",
    trash: "Sampah Umum",
    clothes: "Sampah Pakaian",
    paper: "Sampah Kertas",
    plastic: "Sampah Plastik",
    battery: "Sampah Baterai",
};

const extractYouTubeId = (url) => {
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    return match ? match[1] : null;
};

const isTikTokLink = (url) => url.includes("tiktok.com");

const HasilDeteksi = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state || !state.predictions || state.predictions.length === 0) {
        return (
            <div className="p-10 text-center">
                <p className="text-lg">Tidak ada hasil deteksi ditemukan.</p>
                <button
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={() => navigate("/")}
                >
                    Kembali
                </button>
            </div>
        );
    }

    return (
        <div className="px-4 py-10 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Hasil Deteksi</h2>
            {state.predictions.map((item, index) => (
                <section key={index} className="bg-[#f5f7ff] py-5 px-6 rounded-xl shadow mb-8">
                    <h3 className="text-2xl font-bold text-blue-800 mb-2">
                        {labelTranslations[item.label] || item.label} ({item.confidence}%)
                    </h3>

                    {item.message && (
                        <div className="bg-white border border-blue-200 rounded-lg p-6 mb-6 shadow-sm">
                            <p className="text-gray-800 text-justify whitespace-pre-line leading-relaxed">
                                {item.message}
                            </p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {item.recycle_links.map((link, i) => (
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={i}
                                className="relative bg-gray-800 rounded-xl overflow-hidden group shadow-lg hover:shadow-2xl transition-shadow duration-300"
                            >
                                <div className="w-full h-48 bg-gray-300 group-hover:scale-105 transition-transform duration-300">
                                    {isTikTokLink(link) ? (
                                        <img
                                            src="/TikTok-Logo.wine.png"
                                            alt="TikTok Logo"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <img
                                            src={`https://img.youtube.com/vi/${extractYouTubeId(link)}/0.jpg`}
                                            alt="YouTube Thumbnail"
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                    <h4 className="text-white font-semibold text-sm truncate">Video Edukasi</h4>
                                    <p className="text-gray-300 text-xs mt-1 truncate">
                                        Pelajari cara mengelola sampah dengan benar
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default HasilDeteksi;