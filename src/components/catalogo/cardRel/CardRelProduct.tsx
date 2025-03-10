"use client"
import { selectProduct } from "@/store/slices/productSlice"
import Image from "next/image"
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux"
import { selectAuth } from "@/store/slices/authSlice";
import { FaEye, FaShoppingCart } from "react-icons/fa";
import { addToCart } from "@/store/slices/cartSlice";
import { ShoppingCart } from "lucide-react";
import { CardRelProductProps } from "@/types/interfaces";


export default function CardRelProduct(producto: any) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useSelector(selectAuth);

  const handleViewMore = () => {
    dispatch(selectProduct(producto.id));
    router.push('/list');
  };

  const handleAddToCart = (producto: any) => {
    console.log(producto)
    dispatch(addToCart({
      id: producto.id,
      name: producto.text, // Asignamos `title` a `name`
      price: parseFloat(producto.precio.replace("$", "")), // Convertimos a número
      quantity: 1
    }));
  }

  return (
    <div className="bg-white rounded-lg max-w-[15rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition cursor-pointer">
      <p className="text-md font-bold mt-2 text-primary text-center px-4 mb-1">{producto.codigo}</p>
      <div className="relative h-48 pb-3 w-full hover:scale-105 transition">
        <Image
          src={producto.imageSrc || "/placeholder.svg"}
          alt={producto.text}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute bottom-1 right-3 flex justify-center items-center min-h-[2rem]">
          <Image
            src={producto.brandLogo || "/placeholder.svg"}
            alt={producto.categoria}
            width={60}
            height={30}
            objectFit="cover"
          />
        </div>

      </div>
{/*  */}
      <div className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-md border border-gray-200 cursor-pointer">
        {isAuthenticated ? (
          <ShoppingCart size={14} className="text-primary" onClick={() => handleAddToCart(producto)} />
        ) : (
          <FaEye size={14} className="text-primary" />
        )}
      </div>
      <div className="flex flex-col flex-grow pb-3">
        <div className="px-4 flex flex-col flex-grow">
          <h3 className="text-xs mb-2 min-h-[2.5rem] line-clamp-2 pt-2 text-center">{producto.text}</h3>
          <p className="text-[10px] text-center  hover:underline  hover:text-blue-500">Ver más</p>

        </div>
        {isAuthenticated ?
          <div className="px-4">
            <p className="text-xl font-bold text-blue-900 mt-2">${(producto.precio ?? 0).toLocaleString("es-CO")}</p>
            {/* <p className="text-md text-gray-500 line-through">${producto.precio.toLocaleString("es-CO")}</p> */}
          </div> : null
        }
      </div>
    </div>
  )
}
