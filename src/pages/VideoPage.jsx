import React from 'react';

export default function VideoPage() {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Video Edukasi</h1>
            <p className="mb-4">
                Tonton video berikut untuk memahami pentingnya pengelolaan sampah.
            </p>
            <div className="aspect-w-16 aspect-h-9">
                <iframe
                    className="w-full h-64"
                    src="https://www.youtube.com/embed/qo-DU3d_Na4"
                    title="Video Edukasi Sampah"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}
