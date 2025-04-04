"use client"

import styles from '@/components/catalogo/catalogoPage.module.css';
import Breadcrumb from '@/components/ui/Breadcrums/Breadcrums';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { addToCart } from '@/store/slices/cartSlice';
import { setCategoria, setLinea, setMarca, setProducto } from '@/store/slices/navigationSlice';
import ProductEquivalent from '@/components/catalogo/equivalentes/cardEquivalente';
import { usePathname, useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { Producto } from '@/data';

interface Equivalent {
  logo: string;
  codigo: string;
  price: number;
}



const ModelPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [pendingNavigation, setPendingNavigation] = useState(false);
  const [productos, setProductos] = useState<Producto[]>([]);
  type LevelType = 'categoria' | 'marca' | 'linea' | 'producto';
  const [level, setLevel] = useState<LevelType>('producto');
  const id = '1';
  
  // Obtener la ruta actual
  const pathname = usePathname();
  
  // Extraer categoría, marca y línea de la URL
  const pathParts = pathname.split('/').filter(part => part);
  const currentCategory = pathParts[0] || '';
  const currentBrand = pathParts[1] || '';
  const currentLine = pathParts[2] || '';
  const productoId = pathParts[3] || '';

  // Función para obtener los productos desde la API
  const fetchProductos = async (idcategoria: string, idmarca: string, linename: string) => {
    try {
      console.log('Fetching productos with:', { idcategoria, idmarca, linename });
      const { data } = await api.line.getArticles(idcategoria, idmarca, linename);
      setProductos(data);
    } catch (error) {
      console.error("Error obteniendo productos:", error);
      setProductos([]);
    }
  };

  // Llamar API cuando la ruta cambie
  useEffect(() => {
    if (currentCategory && currentBrand && currentLine) {
      fetchProductos(currentCategory, currentBrand, currentLine);
      
      
      if (productoId) {
        dispatch(setProducto({ id: '1', name: productoId }));
      }
    }
  }, [currentCategory, currentBrand, currentLine, productoId, dispatch]);

  const handleViewMore = (producto: Producto) => {
    const cleanText = producto.code;

    if (level === "producto") {
      dispatch(setProducto({ id, name: cleanText }));
      
      // Construir la nueva URL directamente
      const newPath = `/${currentCategory}/${currentBrand}/${currentLine}/${cleanText}`.replace(/\s+/g, '-');
      router.push(newPath);
    }
  };

  const handleAddToCart = useCallback((product: Producto, brandSelected: Equivalent) => {
    dispatch(addToCart({ ...product, quantity: 1, brand: brandSelected }));
  }, [dispatch]);

  return (
    <div>
      
      <div className={styles.catalogContainer}>
        <div className={styles.breadcrumbWrapper}>
          <Breadcrumb  categoria={currentCategory} marca={currentBrand} linea={currentLine} />
        </div>
        <div>
          <ProductEquivalent
            productos={productos}
            addToCart={handleAddToCart}
            handleViewMore={handleViewMore}
          />
        </div>
      </div>
    </div>
  );
};

export default ModelPage;