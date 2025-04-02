import { formatCurrency } from "@/utils/formatters";
import { CircleDollarSign } from "lucide-react";

export function BillingCardStats({ quota, totalBilling, availableQuota }: BillingCardStatsProps) {
    return (
      <div className="mt-6 grid grid-cols-3 gap-4 rounded-lg bg-[#E8F0FF] p-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">Cupo</p>
          <div className="flex items-center gap-1">
            <CircleDollarSign />
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