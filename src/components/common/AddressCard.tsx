import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";


interface AddressData {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  isDefault?: boolean;
}

interface AddressCardProps {
  data: AddressData;
  onEdit: (data: AddressData) => void;
  onDelete: (id: string) => void;
}

export function AddressCard({ data, onEdit, onDelete }: AddressCardProps) {
  return (
    <Card className="relative">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{data.recipient}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{data.address}, {data.city}</p>
            <p className="text-sm text-muted-foreground">{data.state}, {data.country}</p>
            <p className="text-sm text-muted-foreground">Tel: {data.phone}</p>
          </div>
          <div className="flex gap-2">
            <button
              className="border border-gray-300 rounded px-2 py-1 text-sm hover:bg-gray-100"
              onClick={() => onEdit(data)}
            >
              Editar
            </button>
            <button
              className="border border-red-500 text-red-500 rounded px-2 py-1 text-sm hover:bg-red-100"
              onClick={() => onDelete(data.id)}
            >
              Eliminar
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 rounded-lg p-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">Dirección</p>
            <div className="flex items-center gap-1">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="font-semibold">{data.address}</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Ciudad</p>
            <span className="font-semibold">{data.city}</span>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">País</p>
            <span className="font-semibold">{data.country}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
