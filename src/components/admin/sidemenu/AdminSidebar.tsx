"use client";

import { Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Dashboard", path: "/portal" },
  { name: "Mi Perfil", path: "/portal/perfil" },
  { name: "Mis Pedidos", path: "/portal/pedidos" },
  { name: "Mis Favoritos", path: "/portal/favoritos" },
  { name: "Devoluciones", path: "/portal/devoluciones" },
  { name: "Direcciones de envío", path: "/portal/direcciones" },
  { name: "Datos de Facturación", path: "/portal/facturacion" },
];

const AdminSidebar = () => {
  const pathname = usePathname(); // ✅ Obtiene la ruta actual

  return (
    <aside className="w-64 text-primary p-4 min-h-screen border-grey-300 rounded-lg flex flex-col items-center">
      {/* Contenedor de la imagen */}
      <div className="relative w-36 h-36 flex items-center justify-center">
        {/* Contenedor de la imagen */}
        <div className="w-32 h-32 overflow-hidden rounded-full border border-grey-300 flex items-center justify-center">
          <Image
            src={"/image/avatar.jpg"}
            height={200}
            width={200}
            alt="Autofrio"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Icono de Editar sobre la imagen */}
        <div className="absolute bottom-2 right-2 bg-gray-600 p-2 rounded-full cursor-pointer shadow-lg border-2 border-white">
          <Edit className="text-white w-5 h-5" />
        </div>
      </div>




      {/* Contenido del menú */}
      <div className="pt-5 w-full">
        <ul className="text-gray-400 text-[14px] w-full">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.path; // ✅ Verifica si está activo
            return (
              <li key={index} className="cursor-pointer hover:text-primary">
                <Link href={item.path} className="flex flex-col py-2 px-4 w-full">
                  <div className="flex justify-between">
                    <p className={isActive ? "text-primary font-semibold" : ""}>{item.name}</p>
                    <span className={`text-[10px] transition-all ${isActive ? "text-primary font-bold scale-125" : "text-gray-400"}`}>
                      {">"}</span>
                  </div>
                  {/* Línea inferior si el item está activo */}
                  {isActive && <div className="w-full h-[1px] bg-primary mt-1"></div>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Cerrar Sesión */}
      <p className=" pt-10 text-center cursor-pointer text-red-500">Cerrar Sesión</p>
    </aside>
  );
};

export default AdminSidebar;
