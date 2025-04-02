
import DynamicTable from "@/components/admin/table/DynamicTable";

export default function PortalPage() {

  const orders = [
    {
      orderId: "12345",
    
      status: "Enviado",
      date: "2024-02-12",
      total: "$150.00",
      numproducts: "10",
      products: [
        { id: 1, type: "Compresor", name: "Auriculares", description: "Sony WH-1000XM4", brand: "Sony", quantity: 1, price: "$150.00",   image: "/articulos/compresor.png"},
      ],
    },
    {
      orderId: "67890",
      image: "/articulos/compresor.png",
      status: "Pendiente",
      date: "2024-02-10",
      total: "$99.99",
      numproducts: "9",
      products: [
        { id: 2, type: "Compresor", name: "Teclado mecánico", description: "Redragon K552", brand: "Redragon", quantity: 1, price: "$99.99",  image: "/articulos/compresor.png" },
      ],
    },
    {
      orderId: "67891",
      image: "/articulos/compresor.png",
      status: "Cancelado",
      date: "2024-02-10",
      total: "$99.99",
      numproducts: "9",
      products: [
        { id: 2, type: "Compresor", name: "Teclado mecánico", description: "Redragon K552", brand: "Redragon", quantity: 1, price: "$99.99",  image: "/articulos/compresor.png" },
      ],
    },
    {
      orderId: "67892",
      image: "/articulos/compresor.png",
      status: "Entregado",
      date: "2024-02-10",
      total: "$99.99",
      numproducts: "9",
      products: [
        { id: 2, type: "Compresor", name: "Teclado mecánico", description: "Redragon K552", brand: "Redragon", quantity: 1, price: "$99.99",   image: "/articulos/compresor.png" },
      ],
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold">Devoluciones</h2>
      <DynamicTable orders={orders} />
    </div>
  );
}
