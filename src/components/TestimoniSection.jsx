import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const testimonials = [
  {
    id: 1,
    image:
      "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?ga=GA1.1.2011681857.1743259396&semt=ais_hybrid&w=740",
    name: "Andi",
    quote:
      "TrashLens bikin saya sadar pentingnya memilah sampah. Praktis dan edukatif!",
  },
  {
    id: 2,
    image:
      "https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg?ga=GA1.1.2011681857.1743259396&semt=ais_hybrid&w=740",
    name: "Lestari",
    quote:
      "Sekarang saya dan anak-anak belajar daur ulang bareng. Seru banget!",
  },
  {
    id: 3,
    image:
      "https://img.freepik.com/free-photo/smiling-pleased-asian-male-student-with-braces-showing-thumbs-up-recommend-product-service-with-excellent-quality-like-approve-idea-man-nod-approval-agree-with-person-white-background_1258-55402.jpg?ga=GA1.1.2011681857.1743259396&semt=ais_hybrid&w=740",
    name: "Budi",
    quote:
      "Fitur deteksi sampahnya keren. Cocok buat edukasi lingkungan di sekolah.",
  },
  {
    id: 4,
    image:
      "https://img.freepik.com/free-photo/you-got-this-join-us-smiling-assertive-woman-pointing-front-inviting-work-company-event-praising-good-job-well-done-gesture-standing-white-wall_176420-37967.jpg?ga=GA1.1.2011681857.1743259396&semt=ais_hybrid&w=740",
    name: "Siska",
    quote:
      "Dari TrashLens saya mulai gerakan bersih-bersih RT. Inspiratif banget!",
  },
  {
    id: 5,
    image:
      "https://img.freepik.com/free-photo/satisfied-handsome-guy-posing-against-white-wall_176420-32923.jpg?ga=GA1.1.2011681857.1743259396&semt=ais_hybrid&w=740",
    name: "Reza",
    quote: "Teknologinya keren! Cocok untuk generasi muda peduli lingkungan.",
  },
  {
    id: 6,
    image:
      "https://img.freepik.com/free-photo/happy-brunette-woman-with-short-hair-standing-confident-relaxed-pose-hands-jeans-pockets-smiling-pleased-studio_176420-41414.jpg?ga=GA1.1.2011681857.1743259396&semt=ais_hybrid&w=740",
    name: "Nina",
    quote: "Makin peduli sama sampah setelah lihat video edukatif TrashLens.",
  },
];

export default function TestimoniSection() {
  return (
    <div className="text-center px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-8">
        Apa Kata Mereka?
      </h2>

      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        modules={[Autoplay]}
      >
        {testimonials.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden max-w-sm mx-auto">
              <img
                src={item.image}
                alt={`Foto ${item.name}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-left">
                <h3 className="text-green-700 font-semibold text-lg text-center mb-1">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm text-center italic">
                  "{item.quote}"
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
