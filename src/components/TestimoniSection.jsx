import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const testimonials = [
    {
        id: 1,
        image: "https://img.freepik.com/free-photo/man-collecting-scattered-plastic-bottles-from-ground_1268-20054.jpg?w=800"
    },
    {
        id: 2,
        image: "https://img.freepik.com/free-photo/woman-planting-tree-forest_1150-11005.jpg?w=800"
    },
    {
        id: 3,
        image: "https://img.freepik.com/free-photo/portrait-volunteer-with-gloves-bag_23-2148765282.jpg?w=800"
    },
    {
        id: 4,
        image: "https://img.freepik.com/free-photo/group-volunteers-cleaning-up-park_23-2148787637.jpg?w=800"
    },
    {
        id: 1,
        image: "https://img.freepik.com/free-photo/man-collecting-scattered-plastic-bottles-from-ground_1268-20054.jpg?w=800"
    },
    {
        id: 2,
        image: "https://img.freepik.com/free-photo/woman-planting-tree-forest_1150-11005.jpg?w=800"
    },
    {
        id: 3,
        image: "https://img.freepik.com/free-photo/portrait-volunteer-with-gloves-bag_23-2148765282.jpg?w=800"
    },
    {
        id: 4,
        image: "https://img.freepik.com/free-photo/group-volunteers-cleaning-up-park_23-2148787637.jpg?w=800"
    },
];

export default function TestimoniSection() {
    return (
        <div className=" items-center text-center px-4 py-10 bg-emerald-100">
            <h2 className="text-xl md:text-2xl font-bold text-blue-800 mb-6">Testimoni</h2>

            <Swiper
                spaceBetween={20}
                slidesPerView={1.5}
                breakpoints={{
                    640: { slidesPerView: 2.2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                loop={true}
                modules={[Autoplay]}
            >
                {testimonials.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="bg-white rounded-xl shadow-md p-4 w-[220px] h-[280px] flex flex-col items-center justify-center mx-auto">
                            <img
                                src={item.image}
                                alt={`Avatar ${item.id}`}
                                className="w-150 h-150 object-cover mb-4 border-4 border-green-300"
                            />
                            <h1>dsbdsbdns</h1>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
