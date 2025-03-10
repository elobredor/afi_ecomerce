import fs from 'fs';
import path from 'path';
import styles from '@/components/catalogo/catalogoPage.module.css';
import Banner from '@/components/catalogo/bannerCatalogo';
import CardCatalogo from '@/components/catalogo/cardCatalogo';
import Breadcrumb from '@/components/ui/Breadcrums/Breadcrums';
import ProductEquivalentTest from '@/components/catalogo/equivalentes/cardEquivalente';

const getProductos = (): CardProps[] => {
  const filePath = path.join(process.cwd(), 'src', 'data', 'modelo.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
};

const CatalogoPage = () => {
  const productos = getProductos();

  return (
    <div>

      {/* 📌 Contenedor Principal */}
      <div className={styles.catalogContainer}>
        
        {/* 📌 Contenedor de Breadcrumb alineado con las tarjetas */}
        <div className={styles.breadcrumbWrapper}>
          <Breadcrumb />
        </div>

        {/* 📌 Contenedor de Tarjetas */}
        <div>
        <ProductEquivalentTest
          level="producto"
          text="Producto"
          id="1"
        />

        </div>

      </div>
    </div>
  );
};

export default CatalogoPage;
