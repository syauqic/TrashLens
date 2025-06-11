import React from 'react';

export default function ArticlePage() {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Artikel Edukatif</h1>
            <p className="mb-4">
                Berikut adalah beberapa informasi penting tentang pengelolaan sampah yang baik.
            </p>
            <article className="bg-white shadow-md p-4 rounded">
                <h2 className="text-xl font-semibold mb-2">Mengelola Sampah Organik</h2>
                <p>
                    Sampah organik seperti sisa makanan dan daun kering dapat diolah menjadi kompos.
                </p>
            </article>
        </div>
    );
}
