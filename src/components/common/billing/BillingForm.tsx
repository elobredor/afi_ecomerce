import React, { useState } from "react";

interface BillingData {
  name: string;
  nit: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  quota: number;
  isPrimary: boolean;
}

interface BillingFormProps {
  initialData?: Partial<BillingData>;
  onSubmit: (data: Partial<BillingData>) => void;
  onCancel: () => void;
}

export function BillingForm({ initialData, onSubmit, onCancel }: BillingFormProps) {
  const [formData, setFormData] = useState<Partial<BillingData>>({
    name: "",
    nit: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    quota: 0,
    isPrimary: false,
    ...initialData,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block font-medium">Nombre de la persona o empresa</label>
          <input id="name" type="text" value={formData.name} onChange={handleChange} className="border  text-black rounded p-2 w-full" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="nit" className="block font-medium">NIT</label>
          <input id="nit" type="text" value={formData.nit} onChange={handleChange} className="border rounded p-2 w-full" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="address" className="block font-medium">Dirección</label>
          <input id="address" type="text" value={formData.address} onChange={handleChange} className="border rounded p-2 w-full" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="city" className="block font-medium">Ciudad</label>
          <input id="city" type="text" value={formData.city} onChange={handleChange} className="border rounded p-2 w-full" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="block font-medium">Teléfono</label>
          <input id="phone" type="text" value={formData.phone} onChange={handleChange} className="border rounded p-2 w-full" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block font-medium">Correo electrónico</label>
          <input id="email" type="email" value={formData.email} onChange={handleChange} className="border rounded p-2 w-full" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="quota" className="block font-medium">Cupo</label>
          <input id="quota" type="number" value={formData.quota} onChange={handleChange} className="border rounded p-2 w-full" min={0} required />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <input id="isPrimary" type="checkbox" checked={formData.isPrimary} onChange={handleChange} />
        <label htmlFor="isPrimary" className="font-medium">Principal</label>
      </div>

      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="border px-4 py-2 rounded">Cancelar</button>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded">
          {initialData ? "Actualizar" : "Agregar"}
        </button>
      </div>
    </form>
  );
}
