// import ProductCard from "@/components/ProductCard";
"use client";

import BrandBanner from "@/components/home/banners/brands/BrandBanner";
import BannerHome from "@/components/home/banners/sliderhome/bigSlider";
import Banner from "@/components/catalogo/bannerCatalogo";
import { useEffect, useState } from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/swiper-custom.css';
import SliderCards from "@/components/catalogo/sliderCards/sliderCards";
import TitlesBiColor from "@/components/ui/Titles/TitlesBiColor";
import CardCatalogo from "@/components/catalogo/cardCatalogo";
import styles from "../components/catalogo/catalogoPage.module.css";
import { useRouter } from "next/navigation";
import BrandsCars from "@/components/home/banners/brandsCars/brandsCars";
import Filters from "@/components/catalogo/filterSearch/filterSearch";
import { CardRelProductProps } from "@/types/interfaces";


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    document.body.className = "bg-white"; // Cambia el fondo de la página
  }, []);


  const [productos, setProductos] = useState<CardRelProductProps[]>([]);
  const [catalogo, setCatalogo] = useState<CardRelProductProps[]>([]);

  useEffect(() => {

    fetchProductos();
    fetchCatalogo();
  }, []);

  const fetchProductos = async () => {
    try {
      const response = await fetch("../api/productos"); // 🔥 Llamada a la API
      const data = await response.json();
      setProductos(data); // Guardamos los productos en el estado
    } catch (error) {
      console.error("Error cargando los productos:", error);
    }
  };
  const fetchCatalogo = async () => {
    try {
      const response = await fetch("../api/catalogo"); // 🔥 Llamada a la API
      const data = await response.json();
      setCatalogo(data); // Guardamos los productos en el estado
    } catch (error) {
      console.error("Error cargando los productos:", error);
    }
  };

  const bannerImages = [
    { src: "/banners/bannerhome.png", alt: "Imagen 1" },
    { src: "/banners/bannerhome.png", alt: "Imagen 2" },
    { src: "/banners/bannerhome.png", alt: "Imagen 3" },
  ];

  const filtersData = [
    { name: "Categoría", options: [{ label: "Compresores", value: "Compresores" }, { label: "Evaporadores", value: "Evaporadores" }] },
    { name: "Marca", options: [{ label: "Toyota", value: "Toyota" }, { label: "Ford", value: "Ford" }] },
    { name: "Linea", options: [{ label: "TXL 3.1", value: "txl" }, { label: "Focus", value: "Focus" }] },
    { name: "Modelo", options: [{ label: "2010", value: "2020" }, { label: "2020", value: "2010" }] },
  ];
  const handleFilterChange = (selectedFilters: Record<string, { label: string; value: string } | null>) => {
    console.log("Filtros seleccionados:", selectedFilters);
  };
  return (
    <div>
      {/* <BannerHome imageSrc="/banners/bannerhome.png" altText="" /> */}

      <BannerHome images={bannerImages} />

      <BrandBanner />

      <div className="mt-[4rem] mb-[1rem]">

        {/* 🔹 Título */}
        <TitlesBiColor title={"CATEGORIAS"} subtitle={"DESTACADAS"} text="center" />


        <div className="mt-[1rem] mb-[1rem]">
        {/* FIltros Dinamicos */}
          <Filters filters={filtersData} onFilterChange={handleFilterChange} onSearch={() => {}} />
        </div>
        <div className={styles.gridContainer}>
          {catalogo.slice(0, 8).map((catalogo: { id: string; imageSrc: string; text: string }) => (
            <CardCatalogo
              key={catalogo.id}
              imageSrc={catalogo.imageSrc}
              text={catalogo.text}
              id={catalogo.id}
              categoria={catalogo.id}
              marca=""
              modelo=""
              level="categoria"
            />
          ))}
        </div>
        {/* 🔹 Botón "Ver Más" centrado */}
        <div className="flex justify-center mt-5">
          <button
            style={{ backgroundColor: '#002C6A' }} // 🔥 Usa variables CSS de Tailwind

            className=" rounded-full text-white text-[12px] px-8 py-3 hover:bg-blue-200 transition"
            onClick={() => router.push("/catalogo")} >
            Ver Todas
          </button>
        </div>
      </div>

      {/* 🔹 Banner de marcas */}
      <Banner imageSrc="/banners/Catalogo.png" altText="" mt="50" />
      {/* slide Productos relacionados */}
      <SliderCards productos={productos} title={"PRODUCTOS"} subtitle={"POPULARES"} />

      <BrandsCars />
    </div>
  );
}
