import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AddressData {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email?: string;
  isDefault?: boolean;
}

interface AddressCardProps {
  data: AddressData;
  onEdit: (data: AddressData) => void;
  onDelete: (id: string) => void;
  isSelectable?: boolean;
  isSelected?: boolean;
  onSelect?: (data: AddressData) => void;
}

export function AddressCard({ 
  data, 
  onEdit, 
  onDelete, 
  isSelectable = false,
  isSelected = false,
  onSelect
}: AddressCardProps) {
  const handleCardClick = () => {
    if (isSelectable && onSelect) {
      onSelect(data);
    }
  };

  return (
    <Card className="relative">
      <CardContent>
        <div 
          className={`relative rounded-lg  p-6 text-card-foreground shadow-sm ${
            isSelected ? 'border border-primary bg-blue-50' : 'border border-gray-200 bg-card'
          } ${isSelectable ? 'cursor-pointer' : ''}`}
          onClick={handleCardClick}
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {isSelectable && (
                <div className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                  isSelected ? 'border-primary bg-primary/10' : 'border-gray-300'
                }`}>
                  {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                </div>
              )}
              <h3 className="font-semibold">{data.name}</h3>
              {data.isDefault && !isSelectable && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  Predeterminada
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {data.address} | {data.city} | {data.phone}
                {data.email && ` | ${data.email}`}
              </span>
            </p>
            {!isSelectable && (
              <div className="flex gap-2 pt-2">
                <button
                  className="text-blue-600 text-sm hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(data);
                  }}
                >
                  Editar
                </button>
                <button
                  className="text-red-500 text-sm hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(data.id);
                  }}
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}