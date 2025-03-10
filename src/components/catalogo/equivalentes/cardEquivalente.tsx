"use client";

import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "@/store/slices/productSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa"; // Importa el ícono del carrito desde React Icons
import { selectAuth } from "@/store/slices/authSlice";
import { Eye } from "lucide-react";
import { RootState } from "@/store/store";
import { setCategoria, setLinea, setMarca, setProducto } from '@/store/slices/navigationSlice';


interface ProductEquivalentTestProps {
    level: string;
    text:string;
    id: string;
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
    modelo: "Audi A1 2010-2015",
    marca: string;
    nombre: string;
    repuestos: Repuesto[];
    logoImage: string;
}


export default function ProductEquivalentTest({ level, text, id }: ProductEquivalentTestProps) {

    const router = useRouter();
    const dispatch = useDispatch();
    // Obtener el estado actual desde Redux
    const currentCategory = useSelector((state: RootState) => state.navigation.categoria.name);
    const currentBrand = useSelector((state: RootState) => state.navigation.marca.name);
    const currentLine = useSelector((state: RootState) => state.navigation.linea.name);
    const currentProduct = useSelector((state: RootState) => state.navigation.producto.name);
    const [pendingNavigation, setPendingNavigation] = useState(false);
    const [productos, setProductos1] = useState<Producto[]>([]);
    const { isAuthenticated } = useSelector(selectAuth);

    useEffect(() => {
        setProductos1([
            {
                id: "1",
                imageSrc: "/articulos/compresor3.png",
                modelo: "Audi A1 2010-2015",
                marca: "Audi",
                nombre: "Compresor",
                logoImage: "/logos/Autofrio.png",
                repuestos: [
                    { logo: "/logos/Autofrio.png", nombre: "SANDEN", price: "$3.000.000", codigo: "CP5001" },
                    { logo: "/logos/sanden.png", nombre: "ACTECmax", price: "40.000.000", codigo: "CP5001" },
                    { logo: "/logos/denso.png", nombre: "DENSO", price: "$50.000", codigo: "CP5001" },
                    { logo: "/logos/Autofrio.png", nombre: "DENSO", price: "$60.000", codigo: "CP5001" },
                    { logo: "/logos/denso.png", nombre: "DENSO", price: "$30.000", codigo: "CP5001" },
                    { logo: "/logos/Autofrio.png", nombre: "DENSO", price: "$30.000", codigo: "CP5001" },
                    { logo: "/logos/denso.png", nombre: "DENSO", price: "$30.000", codigo: "CP5001" },
                ],
            },
            {
                id: "2",
                imageSrc: "/articulos/compresor3.png",
                modelo: "Audi A1 2010-2015",
                marca: "Toyota",
                nombre: "Evaporador",
                logoImage: "/logos/sanden.png",
                repuestos: [
                    { logo: "/logos/sanden.png", nombre: "DENSO", price: "$354.000", codigo: "CP5001" },
                    { logo: "/logos/Autofrio.png", nombre: "DENSO", price: "$470.000", codigo: "CP5001" },
                    { logo: "/logos/denso.png", nombre: "SANDEN", price: "$950.000", codigo: "CP5001" },
                ],
            },
            {
                id: "3",
                imageSrc: "/articulos/compresor3.png",
                modelo: "Audi A1 2010-2015",
                marca: "Honda",
                nombre: "Condensador",
                logoImage: "/logos/Autofrio.png",
                repuestos: [
                    { logo: "/logos/Autofrio.png", nombre: "SANDEN", price: "$356.000", codigo: "CP5001" },
                    { logo: "/logos/sanden.png", nombre: "ACTECmax", price: "440.000", codigo: "CP5001" },
                    { logo: "/logos/denso.png", nombre: "DENSO", price: "$650.000", codigo: "CP5001" },
                    { logo: "/logos/Autofrio.png", nombre: "DENSO", price: "$795.000", codigo: "CP5001" },
                    { logo: "/logos/denso.png", nombre: "DENSO", price: "$30.000", codigo: "CP5001" },
                    { logo: "/logos/Autofrio.png", nombre: "DENSO", price: "$30.000", codigo: "CP5001" },
                    { logo: "/logos/denso.png", nombre: "DENSO", price: "$30.000", codigo: "CP5001" },
                ],
            },
            {
                id: "4",
                imageSrc: "/articulos/compresor3.png",
                modelo: "Audi A1 2010-2015",
                marca: "Honda",
                nombre: "Condensador",
                logoImage: "/logos/Autofrio.png",
                repuestos: [
                    { logo: "/logos/Autofrio.png", nombre: "SANDEN", price: "$3.000.000", codigo: "CP5001" },
                    { logo: "/logos/sanden.png", nombre: "ACTECmax", price: "40.000.000", codigo: "CP5001" },
                    { logo: "/logos/denso.png", nombre: "DENSO", price: "$50.000", codigo: "CP5001" },
                    { logo: "/logos/Autofrio.png", nombre: "DENSO", price: "$60.000", codigo: "CP5001" },
                    { logo: "/logos/denso.png", nombre: "DENSO", price: "$30.000", codigo: "CP5001" },
                    { logo: "/logos/Autofrio.png", nombre: "DENSO", price: "$30.000", codigo: "CP5001" },
                    { logo: "/logos/denso.png", nombre: "DENSO", price: "$30.000", codigo: "CP5001" },
                ],
            },
        ]);
    }, []);

    const handleViewMore = (text:string) => {
        debugger
        console.log("Antes de dispatch:", { currentCategory, currentBrand, currentLine, currentProduct ,level });
        // 🔥 Normalizar `text` quitando espacios o reemplazándolos por `-`
      const cleanText = text.trim().replace(/\s+/g, '-');
      // 🔥 Identificar en qué nivel estamos y despachar la acción correcta
      if (level === "categoria") {
        dispatch(setCategoria({ id, name: cleanText }));
      } else if (level === "marca") {
        dispatch(setMarca({ id, name: cleanText }));
      } else if (level === "linea") {
        dispatch(setLinea({ id, name: cleanText }));
      } else if (level === "producto") {
        dispatch(setProducto({ id, name: cleanText }));
      }
  
      setPendingNavigation(true); // Marca que debe hacer la navegación
    };


    const handleViewMore2 = (id: string) => {
        console.log("Ver más", id);
        dispatch(selectProduct(id)); // Guardar producto en Redux
        router.push("/list"); // Navegar a la página del producto
    };
    
    useEffect(() => {
      console.log("Antes de dispatch:", { currentCategory, currentBrand, currentLine, currentProduct ,level });

        if (pendingNavigation) {
          let newPath = `/${text.trim().replace(/\s+/g, '-')}`; // Normaliza `text`
    
          if (currentCategory && level === "marca") {
            newPath = `/${currentCategory}/${text.trim().replace(/\s+/g, '-')}`;
          }
          if (currentCategory && currentBrand && level === "linea") {
            newPath = `/${currentCategory}/${currentBrand}/${text.trim().replace(/\s+/g, '-')}`;
          }
          if (currentCategory && currentBrand && level === "producto") {
            newPath = `/${currentCategory}/${currentBrand}/${currentProduct}/${text.trim().replace(/\s+/g, '-')}`;
          }
          console.log("Redirigiendo a:", newPath);
          router.push(newPath);
          setPendingNavigation(false); // Reinicia el estado de navegación
        }
      }, [currentCategory, currentBrand, currentLine, pendingNavigation, text, router, level]);
    

      

 


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {productos.map((producto) => (
                <div key={producto.id} className="  border border-grey-100  bg-white rounded-lg shadow-lg overflow-hidden p-4 flex flex-col">

                    <p className="text-sm mt-[0] pt-[0] mt-4 text-center hover:cursor-pointer">
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
