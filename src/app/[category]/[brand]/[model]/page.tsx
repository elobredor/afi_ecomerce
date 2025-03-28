"use client"
import styles from '@/components/catalogo/catalogoPage.module.css';
import Breadcrumb from '@/components/ui/Breadcrums/Breadcrums';
import { modelos } from '@/data/modelos';
import ProductEquivalent from '@/components/catalogo/equivalentes/cardEquivalente';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '@/store/store';
import { setCategoria, setLinea, setMarca, setProducto } from '@/store/slices/navigationSlice';
import { useRouter } from 'next/navigation';


const ModelPage = () => {

  // const {productos} = useFetchData(api.models.getOne, {model: corsa})


      const router = useRouter();
      const dispatch = useDispatch();
      const currentCategory = useSelector((state: RootState) => state.navigation.categoria.name);
      const currentBrand = useSelector((state: RootState) => state.navigation.marca.name);
      const currentLine = useSelector((state: RootState) => state.navigation.linea.name);
      const currentProduct = useSelector((state: RootState) => state.navigation.producto.name);
      const [pendingNavigation, setPendingNavigation] = useState(false);
      type LevelType = 'categoria' | 'marca' | 'linea' | 'producto';
      const [level, setLevel] = useState<LevelType>('producto');
      const id= '1'
      const text = 'producto'

  
      const handleViewMore = (text:string) => {
          // debugger
          console.log("Antes de dispatch:", { currentCategory, currentBrand, currentLine, currentProduct ,level });
          // 🔥 Normalizar `text` quitando espacios o reemplazándolos por `-`
        const cleanText = text.trim().replace(/\s+/g, '-');
        // 🔥 Identificar en qué nivel estamos y despachar la acción correcta
        if (level === "categoria") {
          dispatch(setCategoria({ id, name: cleanText }));
        } else if (level === "marca") {
          dispatch(setMarca({ id, name: cleanText }));
        } else if (level === "linea") {
          dispatch(setLinea({ id, name: cleanText }));
        } else if (level === "producto") {
          dispatch(setProducto({ id, name: cleanText }));
        }
    
        setPendingNavigation(true); // Marca que debe hacer la navegación
      };
  
  
    
      useEffect(() => {
        console.log("Antes de dispatch:", { currentCategory, currentBrand, currentLine, currentProduct ,level });
  
          if (pendingNavigation) {
            let newPath = `/${text.trim().replace(/\s+/g, '-')}`; // Normaliza `text`
      
            if (currentCategory && level === "marca") {
              newPath = `/${currentCategory}/${text.trim().replace(/\s+/g, '-')}`;
            }
            if (currentCategory && currentBrand && level === "linea") {
              newPath = `/${currentCategory}/${currentBrand}/${text.trim().replace(/\s+/g, '-')}`;
            }
            if (currentCategory && currentBrand && level === "producto") {
              newPath = `/${currentCategory}/${currentBrand}/${currentProduct}/${text.trim().replace(/\s+/g, '-')}`;
            }
            console.log("Redirigiendo a:", newPath);
            router.push(newPath);
            setPendingNavigation(false); // Reinicia el estado de navegación
          }
        }, [currentCategory, currentBrand, currentLine, pendingNavigation, text, router, level]);
      
  
        
  

  return (
    <div>
      <div className={styles.catalogContainer}>
        <div className={styles.breadcrumbWrapper}>
          <Breadcrumb />
        </div>
        <div>
        <ProductEquivalent
          productos={modelos} // esto debe venir de un servicio
     
          handleViewMore={handleViewMore}
        />
        </div>
      </div>
    </div>
  );
};

export default ModelPage;
