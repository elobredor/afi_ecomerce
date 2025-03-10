'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination, Navigation } from "swiper/modules"; // Importa los módulos correctamente
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import TitlesBiColor from "@/components/ui/Titles/TitlesBiColor";
import CardRelProduct from "../cardRel/CardRelProduct";
import { CardRelProductProps } from "@/types/interfaces";

export default function SlideCardsBlank({ productos, title, subtitle }: { productos: CardRelProductProps[], title: any, subtitle: any }) {
    const swiperRef = useRef<SwiperType | null>(null);

    return (
        <div className="">

            <div className="max-w-7xl mx-auto px-4">
                {/* 🔹 Contenedor del título y botones de navegación */}
                <div className="flex justify-between items-center">
                    <TitlesBiColor title={title} subtitle={subtitle} text="left" />
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
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                    >
                        {productos?.map((producto) => (
                            
                            <SwiperSlide key={producto.id}>
                                <CardRelProduct
                                    producto={producto}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
