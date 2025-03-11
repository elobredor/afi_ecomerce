'use client'

import styles from '../../components/catalogo/catalogoPage.module.css';
import CardCatalogo from '@/components/catalogo/cardCatalogo';
import Breadcrumb from '@/components/ui/Breadcrums/Breadcrums';
import useFetchData from '@/hooks/useFetchData';
import { api } from '@/services/api';

const CatalogoPage = () => { 
  const { data} = useFetchData(api.catalog.getAll)
  const catalogo = data

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
      <div className={styles.catalogContainer}>
        <div className={styles.breadcrumbWrapper}>
          <Breadcrumb />
        </div>

        <div className={styles.gridContainer}>
          {catalogo.map((catalogo: { id: string; imageSrc: string; text: string }) => (
            <CardCatalogo
              key={catalogo.id}
              imageSrc={catalogo.imageSrc}
              text={catalogo.text} // esto debe cambiar segun la data que el catalogo original y tales. 
              id={catalogo.id}
              categoria={catalogo.id}
              marca=""
              modelo=""
              level="categoria"
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default CatalogoPage;
