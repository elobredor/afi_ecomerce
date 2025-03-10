"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

interface BannerProps {
  images: { src: string; alt: string }[];
}

const BannerHome: React.FC<BannerProps> = ({ images }) => {
  return (
    <div className="relative left-1/2 w-screen h-[30rem] overflow-hidden -translate-x-1/2 mt-[-2rem]">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true, el: ".custom-pagination" }} // 🔹 Personaliza los dots
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            {/* 🔹 Imagen de fondo */}
            <Image
              src={image.src}
              alt={image.alt || "Imagen sin descripción"} // 🔹 Usa un valor por defecto si `text` es undefined o vacío
              fill
              className="w-full h-full object-cover"
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 🔹 Dots Personalizados */}
      <div className="custom-pagination absolute bottom-5 left-1/2 -translate-x-1/2 flex space-x-2"></div>
    </div>
  );
};

export default BannerHome;
