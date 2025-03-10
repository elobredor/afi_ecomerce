"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Info } from "lucide-react";
import styles from "./Footer.module.css";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/portal"); // 👈 Detecta si está en /admin

  return (
    <footer className={styles.footer}>
      {!isAdminRoute ? 
            <div className={styles.container}>
            {/* 🔹 Logo y Empresa */}
            <div className={styles.logoSection}>
              <Image src="/logos/afiblanco.png" alt="Autofrio Importaciones" width={220} height={50} />
            </div>
    
            {/* 🔹 Enlaces */}
            <div className={styles.linksSection}>
              <div>
                <h3>Menu de Navegación</h3>
                <ul>
                  <li><Link href="#">Inicio</Link></li>
                  <li><Link href="#">Catálogo</Link></li>
                  <li><Link href="#">Nosotros</Link></li>
                  <li><Link href="#">Puntos de Venta</Link></li>
                  <li><Link href="#">Garantías</Link></li>
                  <li><Link href="#">Contacto</Link></li>
                </ul>
              </div>
    
            </div>
    
            {/* 🔹 Redes Sociales */}
            <div className={styles.socialSection}>
              <h3>Síguenos</h3>
              <ul>
                <li><Link href="#"><Facebook size={20} /> Facebook</Link></li>
                <li><Link href="#"><Instagram size={20} /> Instagram</Link></li>
                <li><Link href="#"><Twitter size={20} /> X</Link></li>
                <li><Link href="#"><Linkedin size={20} /> LinkedIn</Link></li>
                <li><Link href="#"><Youtube size={20} /> YouTube</Link></li>
              </ul>
            </div>
          </div>
    : null }


      {/* 🔹 Línea divisoria y Derechos */}
      <div className={styles.bottomSection}>
        <p> © {new Date().getFullYear()} Autofrio Importaciones SAS. Todos los derechos reservados.</p>
        <div className={styles.policies}>
          <Link href="#">Política de Privacidad</Link>
          <Link href="#">Términos de Servicio</Link>
          <Link href="#">Configuración de Cookies</Link>
        </div>
      </div>

      {/* 🔹 Botón flotante de información
      <div className={styles.floatingButton}>
        <Info size={24} />
      </div> */}
    </footer>
  );
};

export default Footer;
