"use client";

import { useState, useEffect, useRef } from "react";
import { Search, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Producto {
    id: string;
    imageSrc: string;
    brandLogo: string;
    categoria: string;
    text: string;
    descripcion: string;
}

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Producto[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null); // 🔹 Referencia al buscador

    // 🔹 Detecta clics fuera del buscador y lo cierra
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 🔹 Función para obtener los productos desde la API
    const fetchProductos = async (searchTerm: string) => {
        if (!searchTerm.trim()) {
          setResults([]);
          setIsOpen(false);
          return;
        }
    
        try {
          const response = await fetch(`/api/productos/buscar?search=${encodeURIComponent(searchTerm)}`);
    
          if (!response.ok) throw new Error("Error en la API");
    
          const data = await response.json();
          setResults(data);
          setIsOpen(true);
        } catch (error) {
          console.error("Error buscando productos:", error);
        }
      };

    // 🔹 Ejecuta la búsqueda cuando el usuario escribe (con debounce)
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchProductos(query);
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    return (
        <div ref={searchRef} className="relative w-full max-w-lg mx-auto">
            {/* 🔹 Barra de búsqueda */}
            <div className="relative z-10">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar productos..."
                    className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                    onFocus={() => setIsOpen(true)} // 🔹 Permite que se abra cuando se haga focus
                />
                <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
            </div>

            {/* 🔹 Resultados de búsqueda */}
            {isOpen && results.length > 0 && (
                <div className="absolute top-full left-0 w-full z-0 bg-white shadow-xl border pt-10 mt-[-30px] border-gray-300 rounded-lg mt-1 overflow-hidden max-h-80 overflow-y-auto">
                    {results.map((producto) => (
                        <div
                            key={producto.id}
                            className="flex items-center p-3 hover:bg-gray-100 cursor-pointer border-b"
                        >
                            <Image
                                src={producto.imageSrc}
                                alt={producto.text}
                                width={50}
                                height={50}
                                className="rounded"
                            />
                            <div className="ml-4 flex-1">
                                <p className="text-xs text-gray-500 font-semibold uppercase">{producto.categoria}</p>
                                <p className="text-sm text-blue-900 font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                                    {producto.text}
                                </p>
                            </div>
                            <ChevronRight className="text-gray-400 w-4 h-4" />
                        </div>
                    ))}

                    {/* 🔹 Botón para ver más resultados */}
                    <div className="text-center p-2 text-blue-600 cursor-pointer hover:underline">
                        Ver más resultados...
                    </div>
                </div>
            )}
        </div>
    );
}
