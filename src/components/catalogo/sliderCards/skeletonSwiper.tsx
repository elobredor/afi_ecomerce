import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import SkeletonCard from "@/components/skeleton/skeletonCard";
import TitlesBiColor from "@/components/ui/Titles/TitlesBiColor";
import { ChevronLeft, ChevronRight, ChevronsRight, ChevronsRightLeft } from "lucide-react";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";

export default function SkeletonSwiper() {
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <div className="relative left-1/2 -translate-x-1/2 py-10">
            <div className="max-w-7xl mx-auto px-4">
                {/* 🔹 Swiper con Skeletons fijos */}
                <div className="flex justify-between items-center">
                <div className="w-1/3 ml-10 h-5 bg-gray-300 rounded animate-pulse"></div>
                {/* 🔹 Flechas arriba, alineadas a la derecha */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="bg-white shadow-md border border-gray-100  hover:bg-gray-100 p-2 rounded-md transition">
                            <ChevronLeft className="w-4 h-4 text-primary" />
                        </button>
                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            className="bg-white shadow-md border border-gray-100  hover:bg-gray-100 p-2 rounded-md transition">
                            <ChevronRight className="w-4 h-4 text-primary" />
                        </button>
                    </div>
                </div>
                <div className="relative py-6">
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={10}
                        slidesPerView={3.5}
                        watchOverflow={true}
                        breakpoints={{
                            370: { slidesPerView: 1.1, spaceBetween: 5 },
                            430: { slidesPerView: 1.1, spaceBetween: 5 },
                            640: { slidesPerView: 1.5, spaceBetween: 7 },
                            768: { slidesPerView: 3.5, spaceBetween: 7 },
                            1024: { slidesPerView: 4.8, spaceBetween: 10 },
                        }}
                        className="!pb-2 !px-12"
                    >
                        {/* 🔹 Siempre muestra 5 Skeletons */}
                        {Array.from({ length: 6 }).map((_, index) => (
                            <SwiperSlide key={index}>
                                <SkeletonCard />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
