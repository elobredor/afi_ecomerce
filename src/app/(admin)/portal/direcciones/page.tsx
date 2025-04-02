"use client";

import { PlusCircle, X } from "lucide-react";
import { useState } from "react";

// Define the AddressData interface
interface AddressData {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
}

const initialAddressData: AddressData[] = [
  {
    id: "1",
    name: "Empresa Principal S.A.",
    address: "Carrera 50 # 123 - 45",
    city: "Barranquilla",
    phone: "+57 300 123 4567",
    email: "contacto@empresaprincipal.com",
  },
  {
    id: "2",
    name: "Comercial Secundaria Ltda.",
    address: "Calle 72 # 45 - 67",
    city: "Barranquilla",
    phone: "+57 300 765 4321",
    email: "info@comercialsecundaria.com",
  },
];

function AddressPage() {
  const [addressData, setAddressData] = useState<AddressData[]>(initialAddressData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<AddressData | undefined>();

  const handleAdd = (data: Partial<AddressData>) => {
    const newAddress: AddressData = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
    } as AddressData;

    setAddressData(prev => [...prev, newAddress]);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Direcciones</h1>
        <button
          onClick={() => {
            setSelectedAddress(undefined);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-white"
        >
          <PlusCircle className="h-4 w-4" />
          Agregar nueva dirección
        </button>
      </div>

      <div className="space-y-4">
        {addressData.map(address => (
          <div key={address.id} className="relative rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <div className="space-y-1">
              <h3 className="font-semibold">{address.name}</h3>
              <p className="text-sm text-muted-foreground">{address.address}, {address.city}</p>
              <p className="text-sm text-muted-foreground">{address.phone} | {address.email}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-semibold mb-4">Agregar nueva dirección</h2>
            {/* Aquí puedes agregar un formulario para ingresar nuevas direcciones */}
          </div>
        </div>
      )}
    </div>
  );
}

export default AddressPage;
