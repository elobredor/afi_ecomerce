"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User, LogOut } from "lucide-react";
import { logout, selectAuth } from "@/store/slices/authSlice";
import LoginModal from "../auth/loginModal";

const ProfileButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.auth.user);
    const { isAuthenticated } = useSelector(selectAuth);
    const [isLoginOpen, setIsLoginOpen] = useState(false);



    const handleProfileClick = () => {
        if (isAuthenticated) {
            setIsOpen(true)
        } else {
            setIsLoginOpen(true); // Abre el modal si no está autenticado
        }
    };


    return (
        <div className="relative z-[999] ml-[-20px]"
        onMouseLeave={() => setIsOpen(false)} // Cierra el menú al salir
        >
            <button
                onClick={() => handleProfileClick()}
                className=" relative bg-white flex z-10 items-center gap-2 border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-100 transition"
            >
                {user ? (
                    <>
                        <span className="text-blue-900 font-semibold">{user.name}</span>
                        <Image
                            src={user.avatar || "/image/avatar.jpg"}
                            width={30}
                            height={30}
                            alt={user.name}
                            className="rounded-full object-cover"
                        />
                    </>
                ) : (
                    <>
                        <User className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-600 font-medium">Iniciar sesión</span>
                    </>
                )}
            </button>

            {/* Menú desplegable */}
            {isOpen && user && (
                <div className="absolute pt-5 mt-[-20px] z-0  right-1 mt-2 w-[8rem] bg-white shadow-md rounded-lg py-2 border">
                    <button
                        onClick={() => router.push("/portal")}
                        className="w-full text-left text-xs px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    >
                        <User className="w-4 h-4 text-gray-600" /> Perfil
                    </button>
                    <button
                        onClick={() => dispatch(logout())}
                        className="w-full text-xs text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-600"
                    >
                        <LogOut  // 🔹 Cerrar sesión
                            className="w-4 h-4 " /> Cerrar sesión
                    </button>
                </div>
            )}
            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

        </div>

    );
};

export default ProfileButton;
