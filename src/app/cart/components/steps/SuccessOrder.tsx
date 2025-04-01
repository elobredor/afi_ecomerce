"use client"

import Image from "next/image";


interface SuccessOrderProps {
  totalPrice: number;
}

const SuccessOrder: React.FC<SuccessOrderProps> = () => {


  return (
    <div className="flex flex-col items-center justify-center py-12">
    
    <Image
      src="/logos/boxsuccess.png"
        alt="Success Icon"
        width={150}
        height={150}


        className="w-16 h-16"
      />
     
      <h1 className="text-primary text-2xl font-bold mb-4">¡Pedido Completado!</h1>
      <p className="text-gray-700 text-center mb-2">
        Tu pedido ha sido procesado correctamente. Recibirás una confirmación por correo electrónico.
      </p>
      <div className="bg-gray-50 w-full p-4 rounded-md mb-6 text-center">
        <h2 className="font-medium mb-2">Detalles del pedido:</h2>
        <p className="text-sm text-gray-600">
          Número de pedido: <span className="font-medium">PED-20250401-001</span>
        </p>
        <p className="text-sm text-gray-600">
          Fecha: <span className="font-medium">01 de Abril, 2025</span>
        </p>
        <p className="text-sm text-gray-600">
          Total: <span className="font-medium">${99999999}</span>
        </p>
      </div>
      <button
      
        className="bg-primary text-white py-2 px-6 rounded-full"
      >
        Volver a la tienda
      </button>
    </div>
  );
};

export default SuccessOrder;
