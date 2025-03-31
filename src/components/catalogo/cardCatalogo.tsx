'use client';

import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoria, setLinea, setMarca, setProducto } from '@/store/slices/navigationSlice';
import './cardCatalogo.css';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const CardCatalogo: React.FC<CardProps> = ({ imageSrc, text, id, level }) => {
  console.log(imageSrc, "esto es la url de la imagen");
  
  const router = useRouter();
  const dispatch = useDispatch();
  const currentCategory = useSelector((state: RootState) => state.navigation.categoria.name);
  const currentBrand = useSelector((state: RootState) => state.navigation.marca.name);
  const currentLine = useSelector((state: RootState) => state.navigation.linea.name);
  const [pendingNavigation, setPendingNavigation] = useState(false);

  const handleCardClick = () => {
    console.log("Antes de dispatch:", { currentCategory, currentBrand, currentLine });
    
    // Normalizar `text` quitando espacios o reemplazándolos por `-` y reemplazando `/` por `-`
    console.log("esto es esto", text);
    
    const cleanText = text.trim().replace(/\s+/g, '-').replace(/\//g, '-');
    // Identificar en qué nivel estamos y despachar la acción correcta
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

  // `useEffect` para esperar la actualización de Redux antes de hacer `router.push`
  useEffect(() => {
    if (pendingNavigation) {
      // Normalizar todos los textos de forma consistente
      const normalizeText = (text) => {
        return text ? text.trim().replace(/\s+/g, '-').replace(/\//g, '-') : '';
      };
      
      const normalizedText = normalizeText(text);
      
      let newPath = '';
      
      if (level === "categoria") {
        newPath = `/${normalizedText}`;
      } else if (level === "marca") {
        const normalizedCategory = normalizeText(currentCategory);
        newPath = `/${normalizedCategory}/${normalizedText}`;
      } else if (level === "linea") {
        const normalizedCategory = normalizeText(currentCategory);
        const normalizedBrand = normalizeText(currentBrand);
        newPath = `/${normalizedCategory}/${normalizedBrand}/${normalizedText}`;
      } else if (level === "producto") {
        const normalizedCategory = normalizeText(currentCategory);
        const normalizedBrand = normalizeText(currentBrand);
        const normalizedLine = normalizeText(currentLine);
        newPath = `/${normalizedCategory}/${normalizedBrand}/${normalizedLine}/${normalizedText}`;
      }

      console.log("Redirigiendo a:", newPath);
      router.push(newPath);
      setPendingNavigation(false); // Reinicia el estado de navegación
    }
  }, [currentCategory, currentBrand, currentLine, pendingNavigation, text, router, level]);

  return (
    <div className="card-container">
      <div className="card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
        <Image
          src={imageSrc || "/placeholder.jpg"} // Default image if not provided
          height={150}
          width={150}
          alt={text}
          className='card-image p-8 mt-3'
        />
        <div className="card-text">
          <p className="animated-text">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default CardCatalogo;