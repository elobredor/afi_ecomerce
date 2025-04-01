import React from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartSummaryProps {
  cartItems: CartItem[];
  totalCupo: number;
  totalPrice: number;
  calculateTotalLine: (price: number, quantity: number) => number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ cartItems, totalCupo, totalPrice, calculateTotalLine }) => {
  return (
    <div className="w-1/3 p-4 border border-grey-300 rounded-md shadow-md gap-2">
      {/* Contenedor de info del cliente */}
      <h1 className="text-primary font-semibold gap-2 mt-2">Información del Cliente</h1>
      <div className="border border-grey-500 mt-2 mb-2"></div>
      <div className="text-black">
        <div className="flex justify-between">
          <p className="font-semibold text-[16px]">Nombre de cliente:</p>
          <span className="font-normal text-[14px]">Pedro Perez</span>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold text-[16px]">Dirección:</p>
          <span className="font-normal text-[14px]">Carrera 10 No 22 16</span>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold text-[16px]">Cupo asignado:</p>
          <span className="font-normal text-[14px]">$25.000.000</span>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold text-[16px]">Cupo Disponible:</p>
          <span className="font-semibold text-[14px]">${totalCupo.toLocaleString("es-CO")}</span>
        </div>
      </div>
      <div className="border border-grey-500 mt-2"></div>
      
      {/* Resumen del Carrito */}
      <h1 className="text-primary font-semibold gap-2 mt-2">Resumen del Carrito</h1>
      <div className="border border-grey-500 mt-2"></div>
      {cartItems.length === 0 ? (
        <p className="text-center">Tu carrito está vacío.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="flex justify-between p-1 m-1 text-sm text-black">
            <div className="flex flex-col">
              <span>{item.name}</span>
            </div>
            <div className="flex items-center">
              <h1>${calculateTotalLine(item.price, item.quantity).toLocaleString("es-CO")}</h1>
            </div>
          </div>
        ))
      )}
      <div className="border border-grey-500 mt-1"></div>
      
      {/* Subtotal */}
      <div className="flex p-1 m-1 justify-between">
        <h1 className="text-black">Subtotal</h1>
        <h1 className="font-regular text-black">${totalPrice.toLocaleString("es-CO")}</h1>
      </div>
      <div className="border border-grey-500 mt-1"></div>
      
      {/* Total */}
      <div className="flex p-1 m-1 justify-between">
        <h1 className="font-bold text-2xl text-black">TOTAL</h1>
        <h1 className="font-bold text-2xl text-primary">${totalPrice.toLocaleString("es-CO")}</h1>
      </div>
      {totalPrice > totalCupo && (
        <p className="text-red-500 text-sm font-regular text-center">
          Su pedido es mayor al cupo disponible, por favor ajuste las cantidades.
        </p>
      )}
      
      {/* Botón */}
      <div className="flex items-center justify-center pt-3">
        <button className="bg-primary text-white w-[80%] py-2 px-10 rounded-full text-sm">
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
