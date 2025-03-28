"use client";

import { useState, useEffect } from 'react';
import styles from '../../../components/catalogo/catalogoPage.module.css';
import CardCatalogo from '@/components/catalogo/cardCatalogo';
import Breadcrumb from '@/components/ui/Breadcrums/Breadcrums';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { api } from '@/services/api';

const MarcasPage = () => {
  // 🔹 Obtener `categoriaId` y `marcaId` desde Redux
  const categoriaId = useSelector((state: RootState) => state.navigation.categoria.id) || undefined;
  const marcaId = useSelector((state: RootState) => state.navigation.marca.id) || '';

  // 🔹 Estado para guardar los marcas
  const [marcas, setMarcas] = useState<{ id: string; imageSrc: string; text: string }[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Función para obtener los marcas desde la API
  const fetchMarcas = async (idmarca: string, idcategoria: string) => {
    try {
      const {data} = await api.line.getAll(idcategoria, idmarca ); // 🔥 Llamar a la API para obtener marcas
console.log(data, 'desde marcas');


 setMarcas(data.map((marca: any) => ({
        id: marca.msg_id,
        imageSrc: marca.msg_asdfadf || "/placeholder.png", // Default image if not provided
        text: marca.msg_pref || marca.mfa_pref, // Default text if not provided
      })));
    } catch (error) {
      console.error("Error obteniendo marcas:", error);
      setMarcas([]); // 🔥 Si hay error, deja el estado vacío
    } finally {
      setLoading(false); // 🔥 Detener la carga
    }
  };

  // 🔹 Llamar API cuando `categoriaId` o `marcaId` cambien
  useEffect(() => {
    if (categoriaId && marcaId) {
      setLoading(true);
      fetchMarcas(marcaId, categoriaId);
    }
  }, [categoriaId, marcaId]);

  return (
    <div>
    
      <div className={styles.catalogContainer}>
 
        <div className={styles.breadcrumbWrapper}>
          <Breadcrumb />
        </div>

 
        {loading ? (
          <p className="text-center text-gray-500">Cargando marcas...</p>
        ) : (
          <div className={styles.gridContainer}>
            {marcas.length > 0 ? (
              marcas.map((marca) => (
                <CardCatalogo
                  key={marca.id}
                  imageSrc={marca.imageSrc}
                  text={marca.text}
                  id={marca.id}
                  categoria={categoriaId}
                  marca={marcaId }
                  modelo={marca.id}
                  level="linea"
                />
              ))
            ) : (
              <p className="text-center text-gray-500">No hay marcas disponibles</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarcasPage;
