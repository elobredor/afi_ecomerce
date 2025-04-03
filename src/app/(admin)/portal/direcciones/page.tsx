"use client";

import { AddressCard } from "@/components/common/AddressCard";
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
  isDefault?: boolean;
}

const initialAddressData: AddressData[] = [
  {
    id: "1",
    name: "Empresa Principal S.A.",
    address: "Carrera 50 # 123 - 45",
    city: "Barranquilla",
    phone: "+57 300 123 4567",
    email: "contacto@empresaprincipal.com",
    isDefault: true,
  },
  {
    id: "2",
    name: "Comercial Secundaria Ltda.",
    address: "Calle 72 # 45 - 67",
    city: "Barranquilla",
    phone: "+57 300 765 4321",
    email: "info@comercialsecundaria.com",
    isDefault: false,
  },
];

function AddressPage() {
  const [addressData, setAddressData] = useState<AddressData[]>(initialAddressData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<AddressData | undefined>();
  const [editingAddress, setEditingAddress] = useState<AddressData | undefined>();
  const [selectedAddressForAction, setSelectedAddressForAction] = useState<AddressData | null>(null);
  const [selectionMode, setSelectionMode] = useState(false);

  const handleAdd = (data: Partial<AddressData>) => {
    const newAddress: AddressData = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
    } as AddressData;
    
    setAddressData(prev => [...prev, newAddress]);
    setIsModalOpen(false);
  };

  const handleEdit = (data: AddressData) => {
    setEditingAddress(data);
    setIsModalOpen(true);
  };

  const handleSaveEdit = (data: AddressData) => {
    setAddressData(prev => 
      prev.map(addr => addr.id === data.id ? data : addr)
    );
    setIsModalOpen(false);
    setEditingAddress(undefined);
  };

  const handleDelete = (id: string) => {
    setAddressData(prev => prev.filter(addr => addr.id !== id));
  };

  const handleSelect = (data: AddressData) => {
    setSelectedAddressForAction(data);
  };

  const toggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    if (!selectionMode) {
      setSelectedAddressForAction(null);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Direcciones</h1>
        <div className="flex gap-3">
          <button
            onClick={toggleSelectionMode}
            className={`flex items-center gap-2 rounded-xl ${
              selectionMode ? 'bg-gray-200 text-gray-800' : 'bg-blue-100 text-blue-800'
            } px-4 py-2`}
          >
            {selectionMode ? 'Cancelar selección' : 'Seleccionar dirección'}
          </button>
          <button
            onClick={() => {
              setEditingAddress(undefined);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-white"
          >
            <PlusCircle className="h-4 w-4" />
            Agregar nueva dirección
          </button>
        </div>
      </div>
      
      {selectionMode && selectedAddressForAction && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            Dirección seleccionada: <strong>{selectedAddressForAction.name}</strong>
          </p>
          <div className="mt-2">
            <button 
              className="bg-primary text-white px-4 py-1 rounded-lg text-sm"
              onClick={() => {
                // Handle confirmation of selection here
                console.log('Selected address:', selectedAddressForAction);
                setSelectionMode(false);
              }}
            >
              Confirmar selección
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {addressData.map(address => (
          <AddressCard
            key={address.id}
            data={address}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isSelectable={selectionMode}
            isSelected={selectedAddressForAction?.id === address.id}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {addressData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No hay direcciones registradas</p>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setEditingAddress(undefined);
              }}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-semibold mb-4">
              {editingAddress ? 'Editar dirección' : 'Agregar nueva dirección'}
            </h2>
            {/* Form placeholder - in a real implementation, you would have a complete form here */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input 
                  type="text" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  defaultValue={editingAddress?.name} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Dirección</label>
                <input 
                  type="text" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  defaultValue={editingAddress?.address} 
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Ciudad</label>
                  <input 
                    type="text" 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    defaultValue={editingAddress?.city} 
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                  <input 
                    type="text" 
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    defaultValue={editingAddress?.phone} 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input 
                  type="email" 
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  defaultValue={editingAddress?.email} 
                />
              </div>
              <div className="pt-4">
                <button 
                  className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors"
                  onClick={() => {
                    if (editingAddress) {
                      handleSaveEdit({
                        ...editingAddress,
                        // In a real implementation, you would get values from form inputs
                      });
                    } else {
                      handleAdd({
                        name: "Nueva Empresa",
                        address: "Nueva dirección",
                        city: "Barranquilla",
                        phone: "+57 300 000 0000",
                        email: "contacto@nuevaempresa.com",
                      });
                    }
                  }}
                >
                  {editingAddress ? 'Guardar cambios' : 'Agregar dirección'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddressPage;