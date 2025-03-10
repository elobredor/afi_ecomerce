"use client";
import { Mail, Phone, MapPin } from "lucide-react";
import { useEffect } from "react";



export default function ContactForm() {
  useEffect(() => {
    document.body.className = "bg-white"; // Cambia el fondo de la página
}, []);

  return (
    <div >
        <div className="relative w-screen left-1/2 -translate-x-1/2 bg-gray-100 py-14 mt-[-2rem]">
        <div className="max-w-[60rem] mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-blue-900">Contáctanos</h1>
          <p className="text-gray-600 text-lg mt-2">
            Estamos aquí para ayudarte con tus consultas.
          </p>
          <div className="w-24 h-1 bg-red-500 mt-2 rounded-full"></div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* 📝 Formulario de Contacto */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Déjanos un mensaje</h2>

          <form className="space-y-4">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Nombres <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Introduzca su nombre"
                className="w-full border rounded-md p-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Motivo de Consulta */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Motivo de consulta <span className="text-red-500">*</span>
              </label>
              <select className="w-full border rounded-md p-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500">
                <option>Consulta general</option>
                <option>Soporte técnico</option>
                <option>Información de productos</option>
              </select>
            </div>

            {/* Correo Electrónico */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Correo electrónico <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Introduzca su correo electrónico"
                className="w-full border rounded-md p-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Mensaje */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Mensaje <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Introduzca su mensaje..."
                rows={4}
                className="w-full border rounded-md p-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Botón Enviar */}
            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-2 rounded-lg font-bold hover:bg-blue-800 transition"
            >
              Enviar comentarios
            </button>
          </form>
        </div>

        {/* 📌 Sección de Información */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">Información</h2>

          {/* 📧 Correo Electrónico */}
          <div className="flex items-start gap-3 mb-4">
            <Mail className="w-5 h-5 text-blue-500" />
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Correo electrónico:</h3>
              <p className="text-sm text-gray-600">info@autofrioimportaciones.com</p>
            </div>
          </div>

          {/* 📞 Teléfono */}
          <div className="flex items-start gap-3 mb-4">
            <Phone className="w-5 h-5 text-blue-500" />
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Teléfono</h3>
              <p className="text-sm text-gray-600">
                (5) 356 0793 <br />
                320 1745 <br />
                309 3544 <br />
                301 388 5956 <br />
                300 444 6029
              </p>
            </div>
          </div>

          {/* 📍 Puntos de Venta */}
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-red-500" />
            <div>
              <h3 className="text-sm font-semibold text-gray-700">Puntos de venta</h3>
              <p className="text-sm text-gray-600">
                Conoce nuestros puntos de venta en:
                <br />
                <a href="#" className="text-blue-600 hover:underline">
                  Barranquilla
                </a>{" "}
                <br />
                <a href="#" className="text-blue-600 hover:underline">
                  Santa Marta
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
