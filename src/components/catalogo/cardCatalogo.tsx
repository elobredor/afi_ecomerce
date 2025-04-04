'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import './cardCatalogo.css';


const CardCatalogo: React.FC<CardProps> = ({
  imageSrc,
  text,
  level,
  categoria,
  marca,
  linea
}) => {
  const router = useRouter();
  const [pendingNavigation, setPendingNavigation] = useState(false);

  const normalizeText = (text: string | undefined) =>
    text ? text.trim().replace(/\s+/g, '_').replace(/\//g, '-') : '';

  const handleCardClick = () => {
    setPendingNavigation(true);
  };

  useEffect(() => {
    if (pendingNavigation) {
      const normalizedText = normalizeText(text);
      const category = normalizeText(categoria);
      const brand = normalizeText(marca);
      const line = normalizeText(linea);

      let newPath = '';

      switch (level) {
        case 'categoria':
          newPath = `/${normalizedText}`;
          break;
        case 'marca':
          newPath = `/${category}/${normalizedText}`;
          break;
        case 'linea':
          newPath = `/${category}/${brand}/${normalizedText}`;
          break;
        case 'producto':
          newPath = `/${category}/${brand}/${line}/${normalizedText}`;
          break;
      }

      console.log("Redirigiendo a:", newPath);
      router.push(newPath);
      setPendingNavigation(false);
    }
  }, [pendingNavigation, categoria, marca, text, level, router]);

  return (
    <div className="card-container">
      <div className="card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
        <Image
          src={imageSrc || '/placeholder.jpg'}
          height={150}
          width={150}
          alt={text}
          className="card-image p-8 mt-3"
        />
        <div className="card-text">
          <p className="animated-text">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default CardCatalogo;
