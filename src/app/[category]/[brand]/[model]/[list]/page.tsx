"use client"; // 🔥 Agrega esto en la primera línea

import Image from "next/image";
import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { selectAuth } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { api } from "@/services/api";
import { usePathname } from "next/navigation";
import { CurrentProduct, Equivalent, Producto} from "@/data";
import { formatCurrency } from "@/utils/formatters";



const ProductDetail = () => {
      // Obtener la ruta actual
      const pathname = usePathname();
      // Extraer categoría, marca y línea de la URL
      const pathParts = pathname.split('/').filter(part => part);
      
      const productoId = pathParts[3] || '';

    const [quantity, setQuantity] = useState(1);

    const { isAuthenticated } = useSelector(selectAuth);
    const [showMoreApp, setShowMore] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [producto, setProducto] = useState<CurrentProduct>({})

    const [loading, setLoading] = useState(true);


    const dispatch = useDispatch()
 


    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const {data} = await api.products.getByCode(productoId); //aqui se se le manda el code, de la url el ultimo elemento
                setProducto(data);
               console.log(data, "esto es la respuesta de productos relacionados desde el back");
               
            } catch (error) {
                console.error("Error cargando productos:", error);
             
            } finally {
                setLoading(false);
            }
        };
        fetchProductos();
    }, []);

    
    const handleAddToCart = useCallback((product: Producto, brandSelected: Equivalent) => {
        dispatch(addToCart({ ...product, quantity, brand: brandSelected }));
        setQuantity(1); // Reiniciar la cantidad después de agregar al carrito
      }, [dispatch, quantity]);


    return (
        <div>
            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-md p-1 m-5 bg-blue">
                {/* Producto */}
                <div className="flex flex-col md:flex-row gap-6 rounded-lg p-6">
                    {/* Imagen principal */}
                    <div className="w-full md:w-2/5 relative ">
                        {/* 🔹 Disponibilidad en la esquina superior izquierda */}
                        <div className="absolute top-3 left-10 bg-success text-white  font-bold px-3 py-1 rounded-full z-10 border-success rounded-full border border-primary text-[10px] hover:bg-primary hover:text-white hover:scale-120 transition  ">
                            Disponible
                        </div>

                        <button
                            onClick={() => setShowModal(true)} // 🔥 Abre el modal al hacer clic

                            className="absolute top-3 right-10 bg-primary p-2 rounded-full shadow hover:bg-gray-300 transition z-10">
                            <Search className="w-3 h-3 text-white hover:text-primary " />
                        </button>
                        {/* 🔥 Modal para la imagen en grande */}
                        {showModal && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                <div className="relative bg-white p-4 rounded-lg shadow-lg">
                                    {/* ❌ Botón para cerrar */}
                                    <button
                                        className="absolute top-2 right-2 bg-gray-300 p-2 rounded-full hover:bg-gray-400 transition"
                                        onClick={() => setShowModal(false)}
                                    >
                                        ✖
                                    </button>

                                    {/* 📸 Imagen ampliada */}
                                    <Image
                          src={producto.item?.image ? `https://autofrioimportaciones.com/images/productos/${producto.item?.image}` : "/placeholder.jpg"} 
                                        alt="Imagen ampliada"
                                        width={500}
                                        height={500}
                                        className="rounded-lg"
                                    />
                                </div>
                            </div>
                        )}
                        <div className="flex justify-center items-center">
                            <Image
                           src={producto.item?.image ? `https://autofrioimportaciones.com/images/productos/${producto.item?.image}` : "/placeholder.jpg"} 
                                alt="Producto"
                                width={350}
                                height={400}
                                className="rounded-lg object-cover  border-solid rounded-md border border-gray-200"
                            />
                        </div>
                        <div className="flex justify-end mt-[-40px] mr-10">
                            {/* Logo de la marca en la esquina inferior derecha */}
                            {/* <Image
                            src={producto.item?.image ? `https://autofrioimportaciones.com/images/productos/${producto.item?.image}` : "/placeholder.jpg"} 
                                alt="Producto"
                                width={80}
                                height={100}
                                className="rounded-lg object-cover"
                            /> */}
                        </div>
                        {/* Galería de imágenes */}
                        <div className="flex items-center justify-center gap-2 mt-6">
                            <ChevronLeft className="cursor-pointer" />
                            {[...Array(5)].map((_, i) => (
                                <Image
                                    key={i}
                                    src="/articulos/compresor.png"
                                    alt="Producto"
                                    width={50}
                                    height={50}
                                    className="cursor-pointer border  hover:scale-105 hover:shadow-lg transition"
                                />
                            ))}
                            <ChevronRight className="cursor-pointer" />
                        </div>
                    </div>

                    {/* Información del Producto */}
                    <div className="w-full md:w-3/5">
                        <p className="text-primary font-regular text-sm">{producto.item?.category}</p>
                        <h2 className="text-foreground text-xl font-medium">
                     {   producto.item?.full_name}
                        {/* {producto.item?.full_name?.length > 50 ? `${producto.item?.full_name?.substring(0, 70)}...` : producto?.item?.full_name} */}
                        </h2>
                        {isAuthenticated ? <div>
                            <p className="mt-10 text-2xl font-semibold text-primary">{ formatCurrency(producto.item?.price) }</p>
                            {/* <p className="text-foreground line-through font-thin">$000.000</p> */}
                        </div> : null}
                        <div className="border-t-[1px] border-gray-150 my-4"></div>
                        {/* Referencias cruzadas */}
                        <p className=" mt-4 text-sm text-foreground">Productos Equivalentes:</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {producto.item?.equivalents.map((brand, i) => (
                                <div key={i} className=" cursor-pointer hover:scale-105 hover:shadow-lg transition  flex items-center text-md px-4 py-1 rounded-sm shadow-md min-h-10">
                                      <Image   src={brand.logo? `https://autofrioimportaciones.com/images/productos/${brand.logo}` : "/placeholder.jpg"}  alt={brand.codigo} width={82} height={32} className="w-24 h-8 rounded-md object-contain" />
                                    <span className="text-primary text-[10px] ml-[10px]">{isAuthenticated ? brand.price : brand.codigo}</span>
                                </div>
                            ))}
                        </div>


                        {/* Cantidad */}
                        {isAuthenticated ? <div className="mt-4 flex items-center gap-2">
                            <label className="font-semibold text-sm">Cantidad:</label>

                            <button
                                className="border border-primary px-3 py-1 rounded bg-primary text-white hover:bg-gray-100 hover:text-primary transition"
                                onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                            >
                                −
                            </button>

                            <input
                                type="number"
                                className="border border-gray-300 text-center w-16 h-9 rounded text-sm appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                value={quantity}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    if (value >= 1) setQuantity(value);
                                }}
                            />

                            <button
                                className="border border-primary px-3 py-1 rounded bg-primary text-white hover:bg-gray-100 hover:text-primary transition"
                                onClick={() => setQuantity((prev) => prev + 1)}
                            >
                                +
                            </button>
                        </div>
                            : null}
                        <div className="border-t-[1px] border-gray-150 my-4"></div>

                        {/* Botones de acción */}
                        <div className="mt-4 flex flex-col gap-2">
                            {/* 🔹 Botón de "Agregar al carrito" ocupa toda la fila */}
                            {isAuthenticated ? <button onClick={()=>handleAddToCart(producto?.item)
                            } className="bg-primary text-white py-2 rounded-full font-bold hover:bg-blue-700 transition w-full text-[12px] py-3">
                                Agregar al carrito
                            </button> : null
                            }
                            {/* 🔹 Contenedor para los dos botones en la misma fila */}
                            <div className="flex gap-2">
                                {isAuthenticated ? <button onClick={()=>handleAddToCart(producto?.item)} className="border border-primary text-primary py-2 rounded-full font-bold hover:bg-primary transition w-1/2 text-[12px] py-3  hover:text-white">
                                    Guardar en favoritos
                                </button> : null}
                                <button className="border border-primary text-primary py-2 rounded-full font-bold hover:bg-primary hover:text-white transition w-1/2 text-[12px] py-3">
                                    Escribir un comentario
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Descripción y Aplicaciones */}
                {/* <div className="mt-1 p-6">
                    <h3 className="font-normal text-md text-primary">Descripción:</h3>
                    <p className="text-gray-400 mt-2 text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
                    </p>
                </div> */}

                {/* OEM y Aplicaciones */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-1 p-6">
                    <div>
                        <h3 className="font-normal text-md text-primary">OEM:</h3>
                        <ul className="list-disc list-inside text-gray-400 mt-2 text-xs columns-2">
                            {producto?.oem?.slice(0, showMoreApp ? producto?.oem?.length : 30).map((oem: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined, i: Key | null | undefined) => (
                                <li key={i}>{oem}</li>
                            ))}
                        </ul>

                    </div>
                    <div>
                        <h3 className="font-normal text-md text-primary">Aplicación:</h3>
                        <ul className="list-disc list-inside text-gray-400 mt-2 text-xs columns-2">
                            {producto?.applications?.slice(0, showMoreApp ?producto?.oem?.length : 30).map((oem, i) => (
                                <li key={i}>{oem}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-4 cursor-pointer text-primary text-sm font-semibold text-center">
                    <p className="pb-2" onClick={() => setShowMore(!showMoreApp)}>
                        {showMoreApp ? "Ver menos" : "Ver más"}
                    </p>
                </div>
            </div>
            {/* <div className="max-w-5xl mx-auto bg-white shadow-md rounded-md p-1 m-5">
                {isClient && !loading && productos.length > 0 ?
                    <SlideCardsBlank productos={productos} title={"PRODUCTOS RELACIONADOS"} subtitle={""} />
                   : <SkeletonSwiper />
                }
            </div> */}
          {/* <div className="max-w-5xl mx-auto bg-white shadow-md rounded-md p-1 m-5">
                {isClient && !loading && productos.length > 0 ?
                    <SlideCardsBlank productos={productos} title={"TE PUEDE INTERESAR"} subtitle={""} />
                    : <SkeletonSwiper />
                }
            </div> */}
        </div>


    );
};

export default ProductDetail;
