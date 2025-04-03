"use client"

import { CircleDollarSign, Check } from "lucide-react";

// Define the BillingData interface if not already imported
interface BillingData {
  id: string;
  name: string;
  nit: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  isPrimary: boolean;
  quota: number;
  totalBilling: number;
  availableQuota: number;
}

interface BillingCardProps {
  billing: BillingData;
  onEdit: () => void;
  onDelete: () => void;
  isSelectable?: boolean;
  isSelected?: boolean;
  onSelect?: (billing: BillingData) => void;
}

export function BillingCard({
  billing,
  onEdit,
  onDelete,
  isSelectable = false,
  isSelected = false,
  onSelect
}: BillingCardProps) {
  const handleCardClick = () => {
    if (isSelectable && onSelect) {
      onSelect(billing);
    }
  };

  return (
    <div 
      className={`relative rounded-lg bg-card p-4 text-card-foreground border ${
        isSelected 
          ? 'border-primary' 
          : 'border-gray-300'
      } ${isSelectable ? 'cursor-pointer' : ''}`}
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {isSelectable && (
              <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                isSelected ? 'border-primary bg-primary/10' : 'border-gray-300'
              }`}>
                {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
              </div>
            )}
            <h3 className="font-semibold">{billing.name}</h3>
            {billing.isPrimary && !isSelectable && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                Principal
              </span>
            )}
          </div>
          <div className="flex gap-4">
            <p className="text-sm text-muted-foreground">NIT {billing.nit}</p>
            <p className="text-sm text-muted-foreground">{billing.address}, {billing.city}</p>
            <p className="text-sm text-muted-foreground">{billing.phone} | {billing.email}</p>
            
            {!isSelectable && (
              <>
                <button
                  className="text-sm font-medium text-blue-600 hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit();
                  }}
                >
                  Editar datos
                </button>
                <button
                  className="text-sm font-medium text-red-600 hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                >
                  Eliminar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      
      <BillingCardStats
        quota={billing.quota}
        totalBilling={billing.totalBilling}
        availableQuota={billing.availableQuota}
        isCompact={isSelectable}
      />
    </div>
  );
}

interface BillingCardStatsProps {
  quota: number;
  totalBilling: number;
  availableQuota: number;
  isCompact?: boolean;
}

function BillingCardStats({
  quota,
  totalBilling,
  availableQuota,
  isCompact = false
}: BillingCardStatsProps) {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(amount);

  if (isCompact) {
    return (
      <div className="mt-4 grid grid-cols-3 gap-4 rounded-lg bg-[#E8F0FF] p-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">Cupo</p>
          <div className="flex items-center gap-1">
            <CircleDollarSign className="h-5 w-5" />
            <span className="font-semibold">{formatCurrency(quota)}</span>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">Total cartera</p>
          <div className="flex items-center gap-1">
            <span className="font-semibold">{formatCurrency(totalBilling)}</span>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">Cupo disponible</p>
          <div className="flex items-center gap-1">
            <span className="font-semibold text-primary">{formatCurrency(availableQuota)}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-3 gap-4 rounded-lg bg-[#E8F0FF] p-4">
      <div className="space-y-1">
        <p className="text-sm font-medium">Cupo</p>
        <div className="flex items-center gap-1">
          <CircleDollarSign className="h-5 w-5" />
          <span className="font-semibold">{formatCurrency(quota)}</span>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium">Total cartera</p>
        <div className="flex items-center gap-1">
          <span className="font-semibold">{formatCurrency(totalBilling)}</span>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium">Cupo disponible</p>
        <div className="flex items-center gap-1">
          <span className="font-semibold">{formatCurrency(availableQuota)}</span>
        </div>
      </div>
    </div>
  );
}