import React from "react";
import { ExternalLink } from "lucide-react";
import BeritaData from "./BeritaList";

export default function BeritaPage() {
    return (
        <div className="bg-green-50 min-h-screen px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-green-800 mb-6">
                Berita Terkini Tentang Sampah
            </h1>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {BeritaData.map((item, index) => (
                    <a
                        key={index}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-md transition-all hover:-translate-y-1"
                    >
                        <h2 className="text-lg font-semibold text-green-900 flex items-center gap-2">
                            <ExternalLink className="w-4 h-4 text-green-500" />
                            {item.title}
                        </h2>
                    </a>
                ))}
            </div>
        </div>
    );
}
