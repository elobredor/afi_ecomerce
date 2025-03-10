import React from "react";
import Image from "next/image";

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

interface OrderTableProps {
  orderId: string;
  status: string;
  date: string;
  total: string;
  products: Product[];
}

const OrderTable: React.FC<OrderTableProps> = ({ orderId, status, date, total, products }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Encabezado de la orden */}
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">ID Pedido</p>
          <p className="text-blue-600 font-semibold">{orderId}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Estado</p>
          <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded">
            {status}
          </span>
        </div>
        <div>
          <p className="text-sm text-gray-600">Fecha</p>
          <p className="text-gray-700">{date}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600"># Productos</p>
          <p className="text-gray-700">{products.length}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-blue-600 font-semibold">{total}</p>
        </div>
      </div>

      {/* Tabla de productos */}
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th className="px-4 py-2">Tipo</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Descripción</th>
            <th className="px-4 py-2">Marca</th>
            <th className="px-4 py-2">Cantidad</th>
            <th className="px-4 py-2">Valor</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="px-4 py-3 flex items-center gap-2">
                <Image src={product.image} alt={product.name} width={50} height={50} className="rounded" />
                <span className="text-blue-600 font-medium">{product.type}</span>
              </td>
              <td className="px-4 py-3">{product.name}</td>
              <td className="px-4 py-3">{product.description}</td>
              <td className="px-4 py-3">{product.brand}</td>
              <td className="px-4 py-3 text-center">x{product.quantity}</td>
              <td className="px-4 py-3 font-semibold">{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botones de acción */}
      <div className="flex justify-end gap-3 mt-6">
        <button className="bg-gray-200 text-gray-500 px-4 py-2 rounded cursor-not-allowed">
          Cancelar
        </button>
        <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-100">
          Volver a pedir
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Rastrear pedido
        </button>
      </div>
    </div>
  );
};

export default OrderTable;
