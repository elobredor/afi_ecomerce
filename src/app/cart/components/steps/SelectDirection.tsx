import React, { useState } from 'react';

interface Address {
  id: string;
  address: string;
  city: string;
  isDefault?: boolean;
}

interface SelectDirectionProps {
  addresses: Address[];
  selectedAddress: string | null;
  setSelectedAddress: (addressId: string | null) => void;
}

const SelectDirection: React.FC<SelectDirectionProps> = ({ addresses, selectedAddress, setSelectedAddress}) => {


  return (
    <div>
      <h1 className="text-primary font-semibold gap-2">Dirección de Envío</h1>
      <div className="border border-gray-500 mt-2 mb-4"></div>

      <div className="space-y-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`p-4 border rounded-md cursor-pointer ${
              selectedAddress === addr.id ? 'border-primary bg-blue-50' : 'border-gray-300'
            }`}
            onClick={() => setSelectedAddress(addr.id)}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    selectedAddress === addr.id ? 'border-primary' : 'border-gray-400'
                  }`}
                >
                  {selectedAddress === addr.id && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                </div>
              </div>
              <div>
                <p className="font-medium">{addr.address}</p>
                <p className="text-gray-600 text-sm">{addr.city}</p>
                {addr.isDefault && (
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full mt-1 inline-block">
                    Dirección predeterminada
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        <button className="flex items-center text-primary font-medium gap-2 mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Agregar nueva dirección
        </button>
      </div>
    </div>
  );
};

export default SelectDirection;