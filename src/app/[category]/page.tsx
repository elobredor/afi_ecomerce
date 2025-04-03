"use client";

import { useState, useEffect } from 'react';
import styles from '../../components/catalogo/catalogoPage.module.css';
import CardCatalogo from '@/components/catalogo/cardCatalogo';
import Breadcrumb from '@/components/ui/Breadcrums/Breadcrums';
import { api } from '@/services/api';
import { usePathname } from 'next/navigation';

const ModelosPage = () => {
  const pathname = usePathname();
  
  // Extraer categoría y marca de la URL
  const pathParts = pathname.split('/').filter(part => part);
  const nameCategory = pathParts[0] || '';




  // 🔹 Estado para guardar los modelos
  const [modelos, setModelos] = useState<{ id: string; imageSrc: string; text: string }[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Función para obtener los modelos desde la API
  const fetchModelos = async (nameCategory: string) => {
    try {
 
      const response = await api.categories.getAll(nameCategory)
   

      
    setModelos(response.data.map((modelo: any) => ({
        id: modelo.mfa_id,
        imageSrc: modelo.imageSrc || "/placeholder.jpg", // Default image if not provided
        text: modelo.mfa_pref || modelo.mfa_pref, // Default text if not provided
      })
    ))

    } catch (error) {
      console.error("Error obteniendo modelos:", error);
      setModelos([]); // 🔥 Si hay error, deja el estado vacío
    } finally {
      setLoading(false); // 🔥 Detener la carga
    }
  };

  // 🔹 Llamar API cuando `nameCategory` o `marcaId` cambien
  useEffect(() => {
    if (nameCategory) {
      setLoading(true);
      fetchModelos(nameCategory);
    }
  }, [nameCategory]);

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
                  text={modelo.text}      // supongo que esto va a cambiar como el resto de propiedades pero ya desde esta perspectiva general será más facil 
                  id={modelo.id}
                  categoria={nameCategory}
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
