
import styles from '../../components/catalogo/catalogoPage.module.css';
import Banner from '@/components/catalogo/bannerCatalogo';
import CardCatalogo from '@/components/catalogo/cardCatalogo';
import Breadcrumb from '@/components/ui/Breadcrums/Breadcrums';
import { getCatalogo } from '@/api/api';
import Filters from '@/components/catalogo/filterSearch/filterSearch';

const CatalogoPage = () => {
  const catalogo = getCatalogo();
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
      {/* 📌 Banner Principal */}
      {/* <Banner  imageSrc="/banners/catalogo.png" altText="Banner de catálogo" mt="-10" /> */}
      {/* <Filters filters={filtersData} onFilterChange={handleFilterChange} onSearch={() => { }} /> */}

      {/* 📌 Contenedor Principal */}
      <div className={styles.catalogContainer}>

        {/* 📌 Contenedor de Breadcrumb alineado con las tarjetas */}
        <div className={styles.breadcrumbWrapper}>
          <Breadcrumb />
        </div>

        {/* 📌 Contenedor de Tarjetas */}
        <div className={styles.gridContainer}>
          {catalogo.map((catalogo: { id: string; imageSrc: string; text: string }) => (
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

      </div>
    </div>
  );
};

export default CatalogoPage;
