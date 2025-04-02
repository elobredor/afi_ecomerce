import { BillingCard } from '@/components/common/billing/BillingCard';
import { BillingData } from '@/types';
import React from 'react';

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
 const sampleBillingData: BillingData[] = [
    {
      id: "1",
      name: "Empresa ABC",
      nit: "123456789",
      address: "Calle 123 #45-67",
      city: "Bogotá",
      phone: "3001234567",
      email: "contacto@empresaabc.com",
      isPrimary: true,
      quota: 5000000,
      totalBilling: 2000000,
      availableQuota: 3000000,
    },
    {
      id: "2",
      name: "Compañía XYZ",
      nit: "987654321",
      address: "Carrera 10 #20-30",
      city: "Medellín",
      phone: "3109876543",
      email: "info@companixyz.com",
      isPrimary: false,
      quota: 10000000,
      totalBilling: 7000000,
      availableQuota: 3000000,
    },
    {
      id: "3",
      name: "Negocios LMN",
      nit: "456789123",
      address: "Avenida Siempre Viva #100",
      city: "Cali",
      phone: "3204567890",
      email: "ventas@negocioslmn.com",
      isPrimary: false,
      quota: 8000000,
      totalBilling: 4000000,
      availableQuota: 4000000,
    },
  ];


  return (
    <div >
      <h1 className="text-primary font-semibold gap-2">Datos de Facturación</h1>
      <div className="border border-gray-300 mt-2 mb-4"></div>

      <div className="space-y-4">
      {sampleBillingData.map((option) => (
        <BillingCard key={option.id} billing={option} onDelete={()=>console.log("borrrar")} onEdit={()=>console.log("editando")
        } />
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