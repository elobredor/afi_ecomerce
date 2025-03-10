'use client';
import AdminSidebar from "@/components/admin/sidemenu/AdminSidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated); // Ajusta según tu store
  useEffect(() => {
    document.body.className = "bg-red"; // Cambia el fondo de la página
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/"); // Redirige si no está autenticado
    }
  }, [isAuthenticated, router]);
  return (
    <div className="w-full min-h-screen flex m-2 border border-grey-300 rounded-lg">
      {/* Sidebar de Administración */}
      <AdminSidebar />


      {/* Contenido principal */}
      <main className="flex-1 p-6  min-h-screen">{children}</main>
    </div>
  );
}
