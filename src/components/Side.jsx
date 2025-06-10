import React from 'react'

export default function Side() {
    return (
        <section className="relative h-[600px] bg-contain bg-center" style={{ backgroundImage: "url('/bgweb.png')" }}>
            <div className="absolute inset-0 bg bg-opacity-40 flex flex-col justify-center items-center text-white text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-3">edukasi komprehensif</h1>
                <h2 className="text-xl md:text-2xl font-bold mb-6">edukasi pengolahan sampah</h2>
                <div className="flex space-x-4 mt-6">
                </div>
            </div>
        </section>
    )
}
