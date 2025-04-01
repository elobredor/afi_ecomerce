import React, { useState } from 'react';

interface BillingInfo {
  id: string;
  name: string;
  email?: string;
  address?: string;
  isDefault?: boolean;
}

interface FacturationDataProps {
  billingInfoOptions: BillingInfo[];
    selectedBillingInfo: string | null;
    setSelectedBillingInfo: (billingInfoId: string | null) => void; 
}

const FacturationData: React.FC<FacturationDataProps> = ({ billingInfoOptions, selectedBillingInfo, setSelectedBillingInfo }) => {

  return (
    <div>
      <h1 className="text-primary font-semibold gap-2">Datos de Facturación</h1>
      <div className="border border-gray-500 mt-2 mb-4"></div>

      <div className="space-y-4">
        {billingInfoOptions.map((option) => (
          <div
            key={option.id}
            className={`p-4 border rounded-md cursor-pointer ${
              selectedBillingInfo === option.id ? 'border-primary bg-blue-50' : 'border-gray-300'
            }`}
            onClick={() => setSelectedBillingInfo(option.id)}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    selectedBillingInfo === option.id ? 'border-primary' : 'border-gray-400'
                  }`}
                >
                  {selectedBillingInfo === option.id && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                </div>
              </div>
              <div>
                <p className="font-medium">{option.name}</p>
                {option.email && <p className="text-gray-600 text-sm">Email: {option.email}</p>}
                {option.address && <p className="text-gray-600 text-sm">Dirección: {option.address}</p>}
                {option.isDefault && (
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full mt-1 inline-block">
                    Opción predeterminada
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
          Agregar nueva información de facturación
        </button>
      </div>
    </div>
  );
};

export default FacturationData;