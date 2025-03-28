'use client';

import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoria, setLinea, setMarca, setProducto } from '@/store/slices/navigationSlice';
import './cardCatalogo.css';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const CardCatalogo: React.FC<CardProps> = ({ imageSrc, text, id, level }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentCategory = useSelector((state: RootState) => state.navigation.categoria.name);
  const currentBrand = useSelector((state: RootState) => state.navigation.marca.name);
  const currentLine = useSelector((state: RootState) => state.navigation.linea.name);
  const [pendingNavigation, setPendingNavigation] = useState(false);



  const handleCardClick = () => {
    console.log("Antes de dispatch:", { currentCategory, currentBrand, currentLine });
    // 🔥 Normalizar `text` quitando espacios o reemplazándolos por `-`
    const cleanText = text.trim().replace(/\s+/g, '-');
    // 🔥 Identificar en qué nivel estamos y despachar la acción correcta
    if (level === "categoria") {
      dispatch(setCategoria({ id, name: cleanText }));
    } else if (level === "marca") {
      dispatch(setMarca({ id, name: cleanText }));
    } else if (level === "linea") {
      dispatch(setLinea({ id, name: cleanText }));
    }
    else if (level === "producto") {
      dispatch(setProducto({ id, name: cleanText }));
    }

    setPendingNavigation(true); // Marca que debe hacer la navegación
  };

  // 🔥 `useEffect` para esperar la actualización de Redux antes de hacer `router.push`
  useEffect(() => {
    if (pendingNavigation) {
      let newPath = `/${text.trim().replace(/\s+/g, '-')}`; // Normaliza `text`

      if (currentCategory && level === "marca") {
        newPath = `/${currentCategory}/${text.trim().replace(/\s+/g, '-')}`;
      }
      if (currentCategory && currentBrand && level === "linea") {
        newPath = `/${currentCategory}/${currentBrand}/${text.trim().replace(/\s+/g, '-')}`;
      }

      console.log("Redirigiendo a:", newPath);
      router.push(newPath);
      setPendingNavigation(false); // Reinicia el estado de navegación
    }
  }, [currentCategory, currentBrand, currentLine, pendingNavigation, text, router, level]);


  return (
    <div className="card-container">
      <div className="card" onClick={(handleCardClick)} style={{ cursor: 'pointer' }}>
        {/* <img src={imageSrc} alt={text || categoria} className="card-image p-8 mt-3" /> */}
        <Image
          src={imageSrc}
          height={100}
          width={ 100}
          alt={text}
          className='card-image p-8 mt-3'
        />
        <div className="card-text">
          <p className="animated-text">{text}</p>
        </div>
      </div>
      {/* Puedes agregar más tarjetas aquí */}
    </div>

  );
};

export default CardCatalogo;
