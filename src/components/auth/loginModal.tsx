"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch(); // ✅ Mover aquí dentro del componente
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  useEffect(() => {
    setError(""); // Limpiar error al abrir el modal
  }, [isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulación de datos (esto normalmente vendría de un backend)
    const fakeUser = {
      id: "123",
      name: "Juan Pérez",
      email,
      token: "fake-token-123",
    };

    dispatch(login(fakeUser)); // ✅ Guardar usuario en Redux
    onClose(); // ✅ Cerrar modal después de iniciar sesión
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
        {/* 🔹 Botón de cierre */}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-semibold text-center text-[#1C3C6C]">Iniciar sesión</h2>

        {/* 🔹 Mensaje de error */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form className="space-y-4 mt-4" onSubmit={handleLogin}>
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700">
              Nombre de usuario o correo electrónico <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="ejemplo@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:outline-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700">Contraseña</label>
            <input
              type="password"
              placeholder="*************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mt-1 focus:outline-blue-500"
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-red-500 text-sm hover:underline">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit" className="w-full bg-[#1C3C6C] text-white p-2 rounded-md hover:bg-[#142B50]">
            Ingresar
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          ¿No tienes cuenta? <a href="#" className="text-blue-600 font-semibold hover:underline">Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
