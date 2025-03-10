import { MapPin, Clock, Phone, ShoppingCart } from "lucide-react";

interface LocationCardProps {
  city: string;
  address: string;
  schedule: string;
  phone: string;
  mapUrl: string;
  productsForSale: string[];
}

export default function LocationCard({
  city,
  address,
  schedule,
  phone,
  mapUrl,
  productsForSale,
}: LocationCardProps) {
  return (
    <div className="max-w-2xl bg-white shadow-lg rounded-xl overflow-hidden border flex flex-col md:flex-row">
      {/* 🗺️ Mapa - Izquierda */}
      <div className="w-full md:w-1/2">
        <iframe
          title={`Mapa de ${city}`}
          className="w-full h-56 md:h-full"
          src={mapUrl}
          loading="lazy"
        ></iframe>
      </div>

      {/* 📍 Información - Derecha */}
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
        <h2 className="text-xl font-semibold text-blue-900">{city}</h2>

        {/* 📌 Dirección */}
        <div className="flex items-start gap-2 mt-3">
          <MapPin className="w-5 h-5 text-red-500" />
          <div>
            <h3 className="text-sm font-semibold text-gray-700">Dirección</h3>
            <p className="text-sm text-gray-600">{address}</p>
          </div>
        </div>

        {/* ⏰ Horario */}
        <div className="flex items-start gap-2 mt-4">
          <Clock className="w-5 h-5 text-blue-500" />
          <div>
            <h3 className="text-sm font-semibold text-gray-700">Horario</h3>
            <p className="text-sm text-gray-600">{schedule}</p>
          </div>
        </div>

        {/* 📞 Teléfono */}
        <div className="flex items-start gap-2 mt-4">
          <Phone className="w-5 h-5 text-green-500" />
          <div>
            <h3 className="text-sm font-semibold text-gray-700">Teléfono</h3>
            <p className="text-sm text-gray-600">{phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
