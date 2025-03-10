"use client"
import { selectProduct, setProducts } from "@/store/slices/productSlice"
import Image from "next/image"
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from "react-redux"

interface CardRelProps {
  id: string
  imageSrc: string
  brandLogo: string
  category: string
  title: string
  description: string
  price: string
  oldPrice: string,
  aplications: any[]
}

export default function CardRel({ imageSrc, brandLogo, category, title, description, price, oldPrice, aplications, id }: CardRelProps) {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.items);
  const router = useRouter();

  const handleViewMore = () => {
    dispatch(selectProduct(id));
    router.push('/producto');
  };


  return (
    <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden h-[450px] flex flex-col">
      <div className="relative h-48 w-full">
        <Image src={imageSrc || "/placeholder.svg"} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className="flex flex-col flex-grow">
        <div className="relative h-[30px] flex justify-center items-center">
          <Image src={brandLogo || "/placeholder.svg"} alt={category} width={80} height={30} objectFit="contain" />
        </div>
        <p className="text-sm mt-3 text-gray-500 px-4 mb-1">{category}</p>
        <div className="px-4 flex flex-col flex-grow">
          <h3 className="text-lg font-medium mb-2 line-clamp-2">{title}</h3>
          <p className="text-sm text-gray-600 flex-grow line-clamp-3">Aplicaciones</p>
        </div>
        <div className="px-4 flex flex-col flex-grow">
          {aplications.slice(0, 3).map((aplication, index) => (
            <p key={index} className="text-sm text-gray-600">{aplication}</p>
          ))}

        </div>
        <button
          onClick={handleViewMore}
          className="text-blue-500 hover:underline pb-1 text-xs mt-auto px-4 text-left"
        >
          Ver más aplicaciones...
        </button>
      </div>
    </div>
  )
}

