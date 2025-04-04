'use client';

import { useState, useEffect } from 'react';
import styles from '../../components/catalogo/catalogoPage.module.css';
import CardCatalogo from '@/components/catalogo/cardCatalogo';

import Breadcrumb from '@/components/ui/Breadcrums/Breadcrums';
import { api } from '@/services/api';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import SkeletonCard from '@/components/catalogo/skeletonCard';


const ModelosPage = () => {
  const pathname = usePathname();
  const pathParts = pathname.split('/').filter(part => part);
  const nameCategory = pathParts[0] || '';

  const [modelos, setModelos] = useState<{ id: string; imageSrc: string; text: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchModelos = async (nameCategory: string) => {
    try {
      const response = await api.categories.getAll(nameCategory);

      setModelos(
        response.data.map((modelo: any) => ({
          id: modelo.mfa_id,
          imageSrc: modelo.imageSrc || "/placeholder.jpg",
          text: modelo.mfa_pref || modelo.mfa_pref,
        }))
      );
    } catch (error) {
      console.error("Error obteniendo modelos:", error);
      setModelos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (nameCategory) {
      setLoading(true);
      fetchModelos(nameCategory);
    }
  }, [nameCategory]);

  return (
    <div>
      <div className={styles.catalogContainer}>
        <div className={styles.breadcrumbWrapper}>
          <Breadcrumb categoria={nameCategory} />
        </div>

        {loading ? (
          <div className={styles.gridContainer}>
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className={styles.gridContainer}>
            {modelos.length > 0 ? (
              modelos.map((modelo) => (
                <CardCatalogo
                  key={modelo.id}
                  imageSrc={modelo.imageSrc}
                  text={modelo.text}
                  id={modelo.id}
                  categoria={nameCategory}
                  marca=""
                  modelo=""
                  level="marca"
                />
              ))
            ) : (
              <div className={styles.emptyMessage}>
                <p>No se encontraron modelos disponibles.</p>
                <Link href="/" className={styles.backLink}>
                  Volver al inicio
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelosPage;
