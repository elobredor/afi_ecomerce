"use client";

import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { Eye } from "lucide-react";
import { selectAuth } from "@/store/slices/authSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/utils/formatters";

interface CardProductProps {
    addToCart: (producto: Producto, equivalent: Equivalent) => void;
    productos: Producto[];
    handleViewMore: (producto: Producto) => void;
}

interface Equivalent {
    logo: string;
    codigo: string;
    price: number;
}

interface Producto {
    id: number;
    code: string;
    name: string;
    full_name: string;
    description: string;
    category: string;
    brand: string;
    line: string;
    price: string;
    discountedprice: string;
    image: string;
    isavailable: number;
    equivalents: Equivalent[];
  
}

export default function ProductEquivalent({ productos, handleViewMore, addToCart }: CardProductProps) {
    const { isAuthenticated } = useSelector(selectAuth);


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {productos.map((producto) => (
                <div key={producto.id} className="border border-grey-100 bg-white rounded-lg shadow-lg overflow-hidden p-4 flex flex-col">
                    <p className="text-sm mt-4 text-center hover:cursor-pointer">{producto.code}</p>
                <p 
                    className="text-lg font-semibold mt-0 text-center hover:cursor-pointer min-h-[56px]"
                    title={producto.full_name}
                >
                    {producto.full_name.length > 50 ? `${producto.full_name.substring(0, 70)}...` : producto.full_name}
                </p>
                    <div className="relative h-48 w-full hover:cursor-pointer" onClick={() => handleViewMore(producto)}>
                        <Image 
                            src={producto.image ? `https://autofrioimportaciones.com/images/productos/${producto.image}` : "/placeholder.jpg"} 
                            alt={producto.code} 
                            layout="fill" 
                            objectFit="contain" 
                        />
                    </div>
                    
                    {/* <div className="relative h-[30px] flex items-center justify-end w-full mt-[-20]">
                        <Image src={producto.brandLogo || "/placeholder.svg"} alt={producto.name} width={60} height={30} className="object-contain" />
                    </div> */}
                    {/* Lista de repuestos */}
                    <div className="mt-3 flex flex-col w-5/5 p-2">
                        {producto.equivalents.map((equivalent, idx) => (
                            <div key={idx} className="border border-grey-100 relative flex items-center justify-center bg-white shadow-md hover:shadow-lg rounded-lg px-4 cursor-pointer transition w-7/8 py-1 my-1">
                                <Image   src={producto.image ? `https://autofrioimportaciones.com/images/productos/${equivalent.logo}` : "/placeholder.jpg"}  alt={equivalent.codigo} width={82} height={32} className="w-24 h-8 rounded-md object-contain" />
                                <span className="text-lg font-semibold text-gray-700 ml-3">
                                    {isAuthenticated ? `${formatCurrency(equivalent.price) }` : equivalent.codigo}
                                </span>
                                {isAuthenticated ? (
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        addToCart(producto, equivalent);
                                    }} className="absolute h-7 w-7 right-[-15px] bg-primary text-white px-3 py-2 rounded-full hover:bg-blue-700 transition">
                                        <FaShoppingCart className="text-xs ml-[-5px]" />
                                    </button>
                                ) : (
                                    <button className="absolute h-7 w-7 right-[-15px] bg-gray-300 text-white px-3 py-2 rounded-full hover:bg-blue-700 transition">
                                        <Eye className="ml-[-10px] mt-[-5] p-1" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
