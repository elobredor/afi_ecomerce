import React from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import {  removeFromCart } from "@/store/slices/cartSlice";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartListProps {
  cartItems: CartItem[];
  quantities: { [key: number]: number };
  handleQuantityChange: (id: number, quantity: number) => void;
  calculateTotalLine: (price: number, quantity: number) => number;
}

const CartList: React.FC<CartListProps> = ({ cartItems, quantities, handleQuantityChange, calculateTotalLine }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <h1 className="text-primary font-semibold gap-2">Mi Carrito</h1>
      <div className="border border-grey-500 mt-2"></div>
      {cartItems.length === 0 ? (
        <p className="font-semibold">Tu carrito está vacío.</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id} className="flex justify-between p-2 m-2 rounded-md border border-grey-500 gap-2">
            <Image
              src="/articulos/compresor.png"
              alt="Producto"
              width={100}
              height={100}
              className="w-[100px] h-[100px] rounded-lg object-cover"
            />
            <div className="flex flex-col flex-1 ml-4">
              <span>{item.name}</span>
              <div className="flex gap-4 text-[12px]">
                <p
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 cursor-pointer"
                >
                  Eliminar | <span className="text-gray-500">Guardar para después</span>
                </p>
              </div>
              {/* Control de Cantidad */}
              <div className="mt-4 flex items-center gap-2">
                <label className="font-semibold text-sm">Cantidad:</label>
                <button
                  className="border border-primary px-3 py-1 rounded bg-primary text-white hover:bg-gray-100 hover:text-primary transition"
                  onClick={() => handleQuantityChange(item.id, (quantities[item.id] || item.quantity) - 1)}
                  disabled={(quantities[item.id] || item.quantity) <= 1}
                >
                  −
                </button>
                <input
                  type="number"
                  className="border border-gray-300 text-center w-16 h-9 rounded text-sm appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  value={quantities[item.id] || item.quantity}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 1) handleQuantityChange(item.id, value);
                  }}
                />
                <button
                  className="border border-primary px-3 py-1 rounded bg-primary text-white hover:bg-gray-100 hover:text-primary transition"
                  onClick={() => handleQuantityChange(item.id, (quantities[item.id] || item.quantity) + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex items-center">
              <h1 className="font-bold">${calculateTotalLine(item.price, item.quantity).toLocaleString("es-CO")}</h1>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartList;
