"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from '../../../components/catalogo/catalogoPage.module.css';
import CardCatalogo from '@/components/catalogo/cardCatalogo';
import Breadcrumb from '@/components/ui/Breadcrums/Breadcrums';
import { api } from '@/services/api';

const MarcasPage = () => {
  // Estado para guardar las líneas/modelos
  const [marcas, setMarcas] = useState<{ id: string; imageSrc: string; text: string }[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Obtener la ruta actual
  const pathname = usePathname();
  
  // Extraer categoría y marca de la URL
  const pathParts = pathname.split('/').filter(part => part);
  const categoriaId = pathParts[0] || '';
  const marcaId = pathParts[1] || '';

  // Función para obtener las líneas desde la API
  const fetchMarcas = async (idmarca: string, idcategoria: string) => {
    try {
      console.log('Fetching líneas with:', { idcategoria, idmarca });
      const { data } = await api.line.getAll(idcategoria, idmarca);

      setMarcas(data.map((marca: any) => ({
        id: marca.msg_id,
        imageSrc: marca.msg_asdfadf || "/placeholder.jpg", // Default image if not provided
        text: marca.msg_pref || marca.mfa_pref, // Default text if not provided
      })));
    } catch (error) {
      console.error("Error obteniendo líneas:", error);
      setMarcas([]);
    } finally {
      setLoading(false);
    }
  };

  // Llamar API cuando la ruta cambie
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
          <p className="text-center text-gray-500">Cargando líneas...</p>
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
                  marca={marcaId}
                  modelo={marca.id}
                  level="linea"
                />
              ))
            ) : (
              <p className="text-center text-gray-500">No hay líneas disponibles</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarcasPage;