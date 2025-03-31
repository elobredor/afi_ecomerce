"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Search, ShoppingCart, User, MapPin, Menu, X, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setCategoria } from "@/store/slices/navigationSlice";
import SearchBar from "../ui/searchBar/searchBar";
import LoginModal from "../auth/loginModal";
import { logout, selectAuth } from "@/store/slices/authSlice";
import { RootState } from "@/store/store";
import ProfileButton from "./ProfileButton";
// Import ProfileButton only if you're using it
// import ProfileButton from "./ProfileButton";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  // Only access Redux state after component is mounted
  const { isAuthenticated } = useSelector(selectAuth);
  const user = useSelector((state: RootState) => state.auth.user);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  // Calculate cart items count only after mounting
  const cartItemsCount = mounted ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

  // Set mounted state after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
      <div className="border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4">
          <Link href="/" className="flex flex-col text-decoration-none min-w-[160px]">
            <Image src="/logos/Autofrio.png" alt="Autofrio Importaciones" width={220} height={100} />
          </Link>
          <div className="z-50 w-[60%]">
            <SearchBar />
          </div>
          {/* Only render cart and user-related elements after component is mounted */}
          {mounted && user && (
            <>
              <button className="relative text-gray-600 hover:text-blue-600" onClick={() => router.push('/cart')}>
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute top-0 right-[-20px] bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              <div className="w-px h-8 bg-gray-300"></div> {/* Divisor vertical */}
            </>
          )}
          {/* Uncomment and use ProfileButton if needed */}
          {mounted && <ProfileButton />}
        </div>
      </div>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 ">
          <nav className={`flex items-center gap-8 w-full justify-center p-3 ${isMenuOpen ? 'flex-col absolute top-full left-0 right-0 bg-white shadow-md p-4' : 'hidden md:flex'}`}>
            <Link href="/" className="text-blue-900 text-sm font-light hover:font-bold relative after:content-[''] after:absolute after:bottom-[-3px] after:left-1/2 after:w-0 after:h-[2px] after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0">
              INICIO
            </Link>
            <Link href="/catalogo" className="text-blue-900 text-sm font-light hover:font-bold relative after:content-[''] after:absolute after:bottom-[-3px] after:left-1/2 after:w-0 after:h-[2px] after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
              onClick={() => dispatch(setCategoria({ id: null, name: null }))}>
              CATÁLOGO
            </Link>
            <Link href="/nosotros" className="text-blue-900 text-sm font-light hover:font-bold relative after:content-[''] after:absolute after:bottom-[-3px] after:left-1/2 after:w-0 after:h-[2px] after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0">
              NOSOTROS
            </Link>
            <Link
              href="/puntos-venta"
              className="text-blue-900 text-sm font-light hover:font-bold relative after:content-[''] after:absolute after:bottom-[-3px] after:left-1/2 after:w-0 after:h-[2px] after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0 flex items-center gap-2"
            >
              <MapPin className="w-4 h-4 text-red-600" />
              PUNTOS DE VENTA
            </Link>
            {/* Only render conditional links after component is mounted */}
            {mounted && isAuthenticated && (
              <Link href="/garantias" className="text-blue-900 text-sm font-light hover:font-bold relative after:content-[''] after:absolute after:bottom-[-3px] after:left-1/2 after:w-0 after:h-[2px] after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0">
                GARANTÍAS
              </Link>
            )}
            <Link href="/contacto" className="text-blue-900 text-sm font-light hover:font-bold relative after:content-[''] after:absolute after:bottom-[-3px] after:left-1/2 after:w-0 after:h-[2px] after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0">
              CONTACTO
            </Link>
          </nav>
        </div>
      </div>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </header>
  );
}