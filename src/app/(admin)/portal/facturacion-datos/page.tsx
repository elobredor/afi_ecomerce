"use client"

// Define the BillingData interface
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
import { PlusCircle, X,CircleDollarSign } from "lucide-react";
import { BillingForm } from "@/components/common/billing/BillingForm";
import { useEffect, useState } from "react";

const initialBillingData: BillingData[] = [
  {
    id: "1",
    name: "Empresa Principal S.A.",
    nit: "900123456",
    address: "Carrera 50 # 123 - 45",                                                                   
    city: "Barranquilla",
    phone: "+57 300 123 4567",
    email: "contacto@empresaprincipal.com",
    isPrimary: true,
    quota: 100000000,
    totalBilling: 25000000,
    availableQuota: 75000000,
  },
  {
    id: "2",
    name: "Comercial Secundaria Ltda.",
    nit: "901234567",
    address: "Calle 72 # 45 - 67",
    city: "Barranquilla",
    phone: "+57 300 765 4321",
    email: "info@comercialsecundaria.com",
    isPrimary: false,
    quota: 50000000,
    totalBilling: 15000000,
    availableQuota: 35000000,
  },
];

function BillingData() {
  const [billingData, setBillingData] = useState<BillingData[]>(initialBillingData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBilling, setSelectedBilling] = useState<BillingData | undefined>();
  const [deleteId, setDeleteId] = useState<string>("");

// 1. servicio para obtener la info de cada tarjeta de los datos de facturacion
// 2. Servicio para actualizar 
// 3. Servicio para eliminar 

// const getFacturationInfo = async ()=>{
//   const {data} = await api.facturation.getAll()
// setBillingData(data)
// }


// const handleUpdateBillingData = async (id: string, updatedData: Partial<BillingData>) => {
//   try {
//     const updatedBilling = await api.updateBillingData(id, updatedData);
//     setBillingData((prev) =>
//       prev.map((item) => (item.id === id ? { ...item, ...updatedBilling } : item))
//     );
//   } catch (error) {
//     console.error("Error updating billing data:", error);
//   }
// };


// const handleDeleteBillingData = async (id: string) => {
//   try {
//     await deleteBillingData(id);
//     setBillingData((prev) => prev.filter((item) => item.id !== id));
//     console.log(`Billing data with id ${id} deleted successfully.`);
//   } catch (error) {
//     console.error("Error deleting billing data:", error);
//   }
// };


// useEffect(()=>{
//   getFacturationInfo()
// },[])


  const handleAdd = (data: Partial<BillingData>) => {
    const newBilling: BillingData = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      totalBilling: 0,
      availableQuota: data.quota || 0,
    } as BillingData;

    if (data.isPrimary) {
      setBillingData(prev =>
        prev.map(item => ({ ...item, isPrimary: false })).concat(newBilling)
      );
    } else {
      setBillingData(prev => [...prev, newBilling]);
    }
    setIsModalOpen(false);
  };

  const handleEdit = (data: Partial<BillingData>) => {
    if (!selectedBilling) return;

    setBillingData(prev =>
      prev.map(item => {
        if (item.id === selectedBilling.id) {
          return {
            ...item,
            ...data,
            availableQuota: (data.quota || item.quota) - item.totalBilling,
          };
        }
        if (data.isPrimary) {
          return { ...item, isPrimary: false };
        }
        return item;
      })
    );
    setIsModalOpen(false);
    setSelectedBilling(undefined);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setBillingData(prev => prev.filter(item => item.id !== deleteId));
    setIsDeleteModalOpen(false);
    setDeleteId("");
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(amount);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Datos de facturación</h1>
          <p className="text-muted-foreground">
            Selecciona tus datos de facturación principal, agrega o modifica.
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedBilling(undefined);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-primary  px-4 py-2 text-white "
        >
          <PlusCircle className="h-4 w-4" />
          Agregar nuevos datos
        </button>
      </div>

      <div className="space-y-4">
        {billingData.map(billing => (
          <div key={billing.id} className="relative rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{billing.name}</h3>
                  
                </div>
                <div className="flex gap-4">
                <p className="text-sm text-muted-foreground">NIT {billing.nit}</p>
                <p className="text-sm text-muted-foreground">{billing.address}, {billing.city}</p>
                <p className="text-sm text-muted-foreground">{billing.phone} | {billing.email}</p>

                <button
                  className=" text-sm font-medium text-blue-600  hover:underline"
                  onClick={() => {
                    setSelectedBilling(billing);
                    setIsModalOpen(true);
                  }}
                >
                  Editar datos
                </button>
                <button
                  className=" text-sm font-medium text-red-600  hover:underline"
                  onClick={() => handleDelete(billing.id)}
                >
             Eliminar
                </button>
                </div>
     
              </div>
             
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 rounded-lg bg-[#E8F0FF] p-4">
        
              <div className="space-y-1">
                <p className="text-sm font-medium">Cupo</p>
               
                <div className="flex items-center gap-1">
                <CircleDollarSign />
                  <span className="font-semibold">
                    {formatCurrency(billing.quota)}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Total cartera</p>
                <div className="flex items-center gap-1">
           
                  <span className="font-semibold">
                    {formatCurrency(billing.totalBilling)}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Cupo disponible</p>
                <div className="flex items-center gap-1">
             
                  <span className="font-semibold">
                    {formatCurrency(billing.availableQuota)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Native Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-semibold mb-4">
              {selectedBilling ? "Editar datos de facturación" : "Agregar datos de facturación"}
            </h2>
            <BillingForm
              initialData={selectedBilling}
              onSubmit={selectedBilling ? handleEdit : handleAdd}
              onCancel={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Native Modal for Delete Confirmation */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-2">¿Estás seguro?</h2>
            <p className="text-sm text-gray-500 mb-4">
              Esta acción no se puede deshacer. Se eliminarán permanentemente los datos de facturación seleccionados.
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded hover:bg-gray-100"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-red-600 rounded hover:bg-red-700"
                onClick={confirmDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BillingData;