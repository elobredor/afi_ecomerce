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
import TitlesBiColor from "@/components/ui/Titles/TitlesBiColor";
import CardCatalogo from "@/components/catalogo/cardCatalogo";
import styles from "../components/catalogo/catalogoPage.module.css";
import { useRouter } from "next/navigation";
import BrandsCars from "@/components/home/banners/brandsCars/brandsCars";
import Filters from "@/components/catalogo/filterSearch/filterSearch";
import { api } from "@/services/api";

export default function Home() {
  const router = useRouter();

  const [categories, setCategories] = useState<{ label: string; value: string }[]>([]);
 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const resultCategories = await api.categories.getList();
        setCategories(resultCategories.data.map((category: any) => ({
          label: category.mga_name,
          value: category.mga_id,
        })));
      } catch (error) {
        console.error("Error cargando categorías", error);
      }
    };
    fetchCategories();
  }, []);

 

  const bannerImages = [
    { src: "/banners/bannerhome.png", alt: "Imagen 1" },
    { src: "/banners/bannerhome.png", alt: "Imagen 2" },
    { src: "/banners/bannerhome.png", alt: "Imagen 3" },
  ];

  const filtersData = [
    { name: "Categoría", options: categories },
 
  ];

  const handleFilterChange = (selectedFilters: Record<string, { label: string; value: string } | null>) => {
    console.log("Filtros seleccionados:", selectedFilters);
  };

  return (
    <div>
      <BannerHome images={bannerImages} />
      <BrandBanner />
      <div className="mt-[4rem] mb-[1rem]">
        <TitlesBiColor title={"CATEGORÍAS"} subtitle={"DESTACADAS"} text="center" />
        <div className="mt-[1rem] mb-[1rem]">
          <Filters filters={filtersData} onFilterChange={handleFilterChange} />
        </div>
        <div className={styles.gridContainer}>
          {categories.length > 0 ? (
            categories.map((catalogo) => (
              <CardCatalogo
                key={catalogo.value}
                imageSrc={catalogo.imageSrc || "/placeholder.jpg"}
                text={catalogo.label}
                id={catalogo.value}
                level="categoria"
              />
            ))
          ) : (
            <p>Cargando categorías...</p>
          )}
        </div>
        <div className="flex justify-center mt-5">
          <button
            style={{ backgroundColor: '#002C6A' }}
            className="rounded-full text-white text-[12px] px-8 py-3 hover:bg-blue-200 transition"
            onClick={() => router.push("/catalogo")}
          >
            Ver Todas
          </button>
        </div>
      </div>
      <Banner imageSrc="/banners/Catalogo.png" altText="" mt="50" />
      <BrandsCars />
    </div>
  );
}
