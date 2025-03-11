import styles from '@/components/catalogo/catalogoPage.module.css';
import Breadcrumb from '@/components/ui/Breadcrums/Breadcrums';
import { modelos } from '@/data/modelos';
import ProductEquivalent from '@/components/catalogo/equivalentes/cardEquivalente';

const ModelPage = () => {
  return (
    <div>
      <div className={styles.catalogContainer}>
        <div className={styles.breadcrumbWrapper}>
          <Breadcrumb />
        </div>
        <div>
        <ProductEquivalent
          productos={modelos} // esto debe venir de un servicio
          level="producto"
          text="Producto"
          id="1"
        />
        </div>
      </div>
    </div>
  );
};

export default ModelPage;
