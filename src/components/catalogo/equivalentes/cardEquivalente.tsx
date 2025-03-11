"use client";

import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa"; // Importa el ícono del carrito desde React Icons
import { Eye } from "lucide-react";
import { selectAuth } from "@/store/slices/authSlice";
import { useSelector } from "react-redux";

interface ProductEquivalentProps {
    productos: Producto[]
    handleViewMore: (text: string) => void;
  }
interface Repuesto {
    logo: string;
    nombre: string;
    codigo: string;
    price: string;
}

interface Producto {
    id: string;
    imageSrc: string;
    modelo: string;
    marca: string;
    nombre: string;
    logoImage: string;
    repuestos: Repuesto[];
}


export default function ProductEquivalent({  productos, handleViewMore }: ProductEquivalentProps) {
  
    const { isAuthenticated } = useSelector(selectAuth);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {productos.map((producto) => (
                <div key={producto.id} className="  border border-grey-100  bg-white rounded-lg shadow-lg overflow-hidden p-4 flex flex-col">

                    <p className="text-sm  pt-[0] mt-4 text-center hover:cursor-pointer">
                        {producto.nombre}
                    </p>
                    <p className="text-lg font-semibold mt-0 text-center hover:cursor-pointer">
                        {producto.modelo}
                    </p>
                    <div className="relative h-48 w-full hover:cursor-pointer"
                                onClick={() => handleViewMore(producto.nombre)}
                                
                                >
                        <Image
                            src={producto.imageSrc}
                            alt={producto.nombre}
                            layout="fill"
                            objectFit="cover"
                        />

                    </div>
                    <div className="relative h-[30px] flex items-center justify-end w-full ml-[-10] mt-[-20]">
                        <Image
                            src={producto.logoImage || "/placeholder.svg"}
                            alt={producto.nombre}
                            width={60}
                            height={30}
                            className="object-contain"
                        />
                    </div>




                    {/* 🔹 Lista de repuestos */}
                    <div className="mt-3 flex flex-col w-5/5 p-2">
                        {producto.repuestos.slice(0, 3).map((repuesto, idx) => (
                            <div
                                key={idx}
                                className="  border border-grey-100 relative flex items-center justify-center bg-white shadow-md hover:shadow-lg rounded-lg px-4 py-3 cursor-pointer transition w-7/8 py-1 my-1"
                                onClick={() => handleViewMore(repuesto.nombre)}
                            >
                                {/* Imagen del repuesto */}
                                <Image
                                    src={repuesto.logo}
                                    alt={repuesto.nombre}
                                    width={82}
                                    height={32}
                                    className="w-24 h-8 rounded-md object-contain"
                                />

                                {/* Código del repuesto */}
                                <span className="text-lg font-semibold text-gray-700 ml-3">
                                    {isAuthenticated ? repuesto.price : repuesto.codigo}
                                </span>

                                {/* Botón de agregar al carrito (Sobrepuesto) */}
                                {isAuthenticated ?
                                    <button
                                        onClick={() => (repuesto)}
                                        className="absolute h-7 w-7  right-[-15px] bg-primary text-white px-3 py-2 rounded-full hover:bg-blue-700 transition"
                                    >

                                        <FaShoppingCart className="text-xs ml-[-5px]" /> {/* Ícono de carrito */}
                                    </button>
                                    :
                                    <button
                                        onClick={() => (repuesto)}
                                        className="absolute h-7 w-7  right-[-15px] bg-gray-300 text-white px-3 py-2 rounded-full hover:bg-blue-700 transition"
                                    >
                                        <Eye className="ml-[-10px] mt-[-5] p-1" /> {/* Ícono de ver */}
                                    </button>
                                }
                            </div>
                        ))}
                    </div>

                    {/* 🔹 Botón de Ver Más */}
                </div>
            ))}
        </div>

    );
}
