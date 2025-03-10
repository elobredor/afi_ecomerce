"use client";
import { Mail, Phone, MapPin, Target, Eye } from "lucide-react";
import { useEffect } from "react";


export default function ContactForm() {
    useEffect(() => {
        document.body.className = "bg-white"; // Cambia el fondo de la página
    }, []);
    
    return (
        <div >
            <div className="relative w-screen left-1/2 -translate-x-1/2 bg-gray-100 py-14 mt-[-2rem]">
                <div className="max-w-[60rem] mx-auto px-4 py-10">
                    <h1 className="text-4xl font-bold text-blue-900 mt-20">¿Quíenes sómos?</h1>
                    <p className="text-gray-700 mt-4 max-w-[70%] text-md">
                                La misión de nuestra empresa consiste en brindar la más amplia gama de partes, repuestos y equipos para cualquier clase de vehículo.
                                Buscando siempre la total satisfacción y beneficio de nuestros clientes, elaborando e implementando soluciones para sus necesidades.
                                Nos comprometemos a ser una empresa con un personal altamente calificado, motivado y capaz, poniendo siempre a su disposición,
                                muchos años de experiencia y de éxito en este mercado de partes de refrigeración.
                            </p>
                    <div className=" mt-10 w-48 h-1 bg-red-500 mt-2 rounded-full"></div>

                </div>
                
            </div>
            <div>
                <section className="bg-white py-16 px-6">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        {/* 🔹 Misión */}
                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                            <Target className="w-16 h-16 text-blue-900 mb-4" />
                            <h2 className="text-2xl font-bold text-blue-900">Nuestra Misión</h2>
                            <p className="text-gray-700 mt-4 max-w-lg text-md">
                                La misión de nuestra empresa consiste en brindar la más amplia gama de partes, repuestos y equipos para cualquier clase de vehículo.
                                Buscando siempre la total satisfacción y beneficio de nuestros clientes, elaborando e implementando soluciones para sus necesidades.
                                Nos comprometemos a ser una empresa con un personal altamente calificado, motivado y capaz, poniendo siempre a su disposición,
                                muchos años de experiencia y de éxito en este mercado de partes de refrigeración.
                            </p>
                        </div>

                        {/* 🔹 Visión */}
                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                            <Eye className="w-16 h-16 text-blue-900 mb-4" />
                            <h2 className="text-2xl font-bold text-blue-900">Nuestra Visión</h2>
                            <p className="text-gray-700 text-md mt-4 max-w-lg">
                                Se proyecta como una empresa líder en el mercado nacional de partes de refrigeración, en la venta de repuestos y equipos
                                que ofrezcan garantía y efectividad, gracias a la implementación de nuestras altas tecnologías.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
