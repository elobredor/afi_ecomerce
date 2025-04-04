'use client';
import React, { useState } from "react";
import Image from "next/image";
import { RefreshCwOff, Undo2 } from "lucide-react";

interface Product {
  id: number;
  type: string;
  name: string;
  description: string;
  brand: string;
  quantity: number;
  price: string;
  image: string;
}

interface Order {
  orderId: string;
  status: string;
  date: string;
  total: string;
  products: Product[];
  numproducts: string;
}

interface DynamicTableProps {
  orders: Order[];
}
const statusColors: { [key: string]: string } = {
  "Pendiente": "bg-yellow-100 text-yellow-600",
  "Enviado": "bg-blue-100 text-blue-600",
  "Entregado": "bg-green-100 text-green-600",
  "Cancelado": "bg-red-100 text-red-600",
  "Devuelto": "bg-gray-100 text-gray-600"
};


const DynamicTable: React.FC<DynamicTableProps> = ({ orders }) => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const toggleDetails = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };
  const [search, setSearch] = useState("");

  // Filtra pedidos por ID, estado o fecha
  // const filteredOrders = orders.filter((order) =>
  //   order.orderId.toLowerCase().includes(search.toLowerCase()) ||
  //   order.status.toLowerCase().includes(search.toLowerCase()) ||
  //   order.date.toLowerCase().includes(search.toLowerCase())
  // );

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Input de Búsqueda */}
      <input
        type="text"
        placeholder="Buscar pedido..."
        className="p-2 border rounded w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {orders?.length === 0 && (
        <div className="text-center text-gray-500">
          No hay datos para mostrar.
        </div>
      )}
      {orders?.map((order) => (
        <div key={order.orderId} className="border border-gray-200 p-5 border-b rounded-lg pb-4 mb-4">
          {/* Encabezado del pedido */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">ID Pedido</p>
              <p className="text-blue-600 font-semibold">{order.orderId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Estado</p>
              <span className={`text-[10px] font-semibold px-3 py-1 rounded-full ${statusColors[order.status] || "bg-gray-200 text-gray-700"}`}>
                {order.status}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Fecha</p>
              <p className="text-gray-700">{order.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600"># Productos</p>
              <p className="text-sm">{order.numproducts}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-blue-600 font-semibold">{order.total.toLocaleString("es-CO")}</p>
            </div>
            <button
              className="border border-blue-600 text-[12px] text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100"
              onClick={() => toggleDetails(order.orderId)}
            >
              {expandedOrder === order.orderId ? "Ocultar Detalles" : "Mostrar Detalles"}
            </button>
          </div>

          {/* Tabla de productos (se muestra solo si está expandida) */}
          {expandedOrder === order.orderId && (
            <div className="mt-4">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-2">Tipo</th>
                    <th className="px-4 py-2">Nombre</th>
                    <th className="px-4 py-2">Marca</th>
                    <th className="px-4 py-2">Cantidad</th>
                    <th className="px-4 py-2">Valor</th>
                    <th className="px-4 py-2">Devolver/Garantía</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="px-4 py-1 flex items-center gap-2">
                        <Image     src={product?.image ? `${process.env.PUBLIC_NEXT_IMG_URL}/${product?.image}` : "/placeholder.jpg"}  alt={product.name} width={50} height={50} className="rounded" />
                        <span className="text-blue-600 font-medium">{product.type}</span>
                      </td>
                      <td className="px-4 py-1">{product.name}</td>
                      <td className="px-4 py-1">{product.brand}</td>
                      <td className="px-4 py-1 text-center">x{product.quantity}</td>
                      <td className="px-4 py-1 font-semibold">{product.price.toLocaleString("es-CO")}</td>
                      <td className="px-1 py-1 font-semibold text-center">
                        <div className="flex justify-center cursor-pointer">
                          <Undo2 color="red" size={20} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Botones de acción */}
              <div className="flex justify-end gap-3 mt-4">
                <button className="bg-gray-200 text-[12px] text-gray-500 px-4 py-1 rounded-full cursor-not-allowed">
                  Cancelar
                </button>
                <button className="border text-[12px] border-blue-600 text-blue-600 px-4 py-1 rounded-full hover:bg-blue-100">
                  Volver a pedir
                </button>
                <button className="bg-blue-600 text-[12px] text-white px-4 py-1 rounded-full hover:bg-blue-700">
                  Rastrear pedido
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DynamicTable;
