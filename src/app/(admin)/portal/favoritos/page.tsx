'use client';
import CardRelProduct from "@/components/catalogo/cardRel/CardRelProduct";
import { CardRelProductProps } from "@/types/interfaces";
import { useEffect, useState } from "react";

export default function PortalPage() {
  const [productos, setProductos]  = useState<CardRelProductProps[]>([]);

  const fetchProductos = async () => {
    try {
      const response = await fetch("../api/productos"); // 🔥 Llamada a la API
      const data = await response.json();
      setProductos(data); // Guardamos los productos en el estado
      console.log('favoritos', data);
      
    } catch (error) {
      console.error("Error cargando los productos:", error);
    }
  };
  useEffect(() => {

    fetchProductos();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold">Bienvenido al Favorito</h2>
      {/* Cards de productos mas comprados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {productos.map((producto) => (
        <CardRelProduct key={producto.id} {...producto} />
      ))}
    </div>
    </div>
  );
}
