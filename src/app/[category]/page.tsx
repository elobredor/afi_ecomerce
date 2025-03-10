"use client";

import { useState, useEffect } from 'react';
import styles from '../../components/catalogo/catalogoPage.module.css';
import Banner from '@/components/catalogo/bannerCatalogo';
import CardCatalogo from '@/components/catalogo/cardCatalogo';
import Breadcrumb from '@/components/ui/Breadcrums/Breadcrums';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const ModelosPage = () => {
  // 🔹 Obtener `categoriaId` y `marcaId` desde Redux
  const categoriaId = useSelector((state: RootState) => state.navigation.categoria.id) || undefined;
  const marcaId = useSelector((state: RootState) => state.navigation.marca.id) || '';

  // 🔹 Estado para guardar los modelos
  const [modelos, setModelos] = useState<{ id: string; imageSrc: string; text: string }[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Función para obtener los modelos desde la API
  const fetchModelos = async (idmarca: string, idcategoria: string) => {
    try {
      const response = await fetch(`../../../api/marcas?idcategoria=${idcategoria}`);
      if (!response.ok) throw new Error("Error en la API");
      console.log(
        marcaId, 
        categoriaId
      );
      
      const data = await response.json();
      console.log("Modelos obtenidos:", data);
      setModelos(data); // 🔥 Guarda los modelos en el estado
    } catch (error) {
      console.error("Error obteniendo modelos:", error);
      setModelos([]); // 🔥 Si hay error, deja el estado vacío
    } finally {
      setLoading(false); // 🔥 Detener la carga
    }
  };

  // 🔹 Llamar API cuando `categoriaId` o `marcaId` cambien
  useEffect(() => {
    if (categoriaId) {
      setLoading(true);
      fetchModelos(marcaId, categoriaId);
    }
  }, [categoriaId, marcaId]);

  return (
    <div>
      {/* 📌 Banner Principal */}
      {/* <Banner imageSrc="/banners/catalogo.png" altText="Banner de catálogo" mt="-10" /> */}

      {/* 📌 Contenedor Principal */}
      <div className={styles.catalogContainer}>
        {/* 📌 Contenedor de Breadcrumb alineado con las tarjetas */}
        <div className={styles.breadcrumbWrapper}>
          <Breadcrumb />
        </div>

        {/* 📌 Contenedor de Tarjetas */}
        {loading ? (
          <p className="text-center text-gray-500">Cargando modelos...</p>
        ) : (
          <div className={styles.gridContainer}>
            {modelos.length > 0 ? (
              modelos.map((modelo) => (
                <CardCatalogo
                  key={modelo.id}
                  imageSrc={modelo.imageSrc}
                  text={modelo.text}
                  id={modelo.id}
                  categoria={categoriaId}
                  marca=""
                  modelo=""
                  level="marca"
                />
              ))
            ) : (
              <p className="text-center text-gray-500">No hay modelos disponibles</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelosPage;
