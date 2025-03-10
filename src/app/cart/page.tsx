"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setCart, removeFromCart, updateQuantity } from "@/store/slices/cartSlice";
import Image from "next/image";
import { selectAuth } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
export const dynamic = "force-dynamic"; // Forza que el middleware se ejecute

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalCupo = 1000000
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const { isAuthenticated } = useSelector(selectAuth);
  const router = useRouter();


  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/"); // Redirige si no está autenticado
    }
  }, [isAuthenticated, router]);


  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        dispatch(setCart(parsedCart));

        const initialQuantities = parsedCart.reduce(
          (acc: { [key: number]: number }, item: any) => {
            acc[item.id] = item.quantity;
            return acc;
          },
          {}
        );
        setQuantities(initialQuantities);
      }
    }
  }, [dispatch]);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    // debugger
    if (newQuantity < 1) return; // Evita cantidades menores a 1

    setQuantities((prev) => ({
      ...prev,
      [id]: newQuantity,
    }));

    dispatch(updateQuantity({ id, quantity: newQuantity })); // Actualiza Redux
  };

  const calculateTotalLine = (price: number, quantity: number) => {
    return price * quantity;
  };
  return (
    <div className="container flex gap-4 m-8 ">
      <div className="w-2/3 p-4 border border-grey-300 rounded-md shadow-md gap-2">
        <h1 className="text-primary text-700 font-semibold gap-2">Mi Carrito</h1>
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
                height={400}
                className="w-[100px] h-[100px] rounded-lg object-cover"
              />
              <div className="flex flex-col flex-1 ml-4">
                <span>{item.name}</span>
                <div className="flex gap-4 text-[12px] ">
                  <p onClick={() => dispatch(removeFromCart(item.id))
                  } className="text-[red] cursor-pointer">Eliminar | <span className="text-gray-500">Guardar para despues</span></p>
                </div>

                {/* Control de Cantidad */}
                <div className="mt-4 flex items-center gap-2">
                  <label className="font-semibold text-sm">Cantidad:</label>
                  <button
                    className="border border-primary px-3 py-1 rounded bg-primary text-white hover:bg-gray-100 hover:text-primary transition"
                    onClick={() => handleQuantityChange(item.id, (quantities[item.id] || item.quantity) - 1)}
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
                <h1 className="font-bold"> ${calculateTotalLine(item.price, item.quantity).toLocaleString("es-CO")}</h1>
              </div>
              {/* <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500"
              >
                Eliminar
              </button> */}
            </div>
          ))
        )}
      </div>
      <div className="w-1/3 p-4 border border-grey-300 rounded-md shadow-md gap-2">
        {/* COntenedor de info del cliente */}
        <h1 className="text-primary text-700 font-semibold gap-2 mt-2">Información del Cliente</h1>
        <div className="border border-grey-500 mt-2 mb-2"></div>
        <div className="text-black">
          <div className="flex justify-between"><p className="font-semibold text-[16px]">Nombre de cliente:</p>
            <span className="font-normal text-[14px]">Pedro Perez</span>
          </div>
          <div className="flex justify-between"><p className="font-semibold text-[16px]">Dirección:</p>
            <span className="font-normal text-[14px]">Carrera 10 No 22 16</span>
          </div>
          <div className="flex justify-between"><p className="font-semibold text-[16px]">Cupo asignado:</p>
            <span className="font-normal text-[14px]">$25.000.000</span>
          </div>
          <div className="flex justify-between"><p className="font-semibold text-[16px]">Cupo Disponible:</p>
            <span className="font-normal text-[14px] font-semibold">${totalCupo.toLocaleString("es-CO")}</span>
          </div>
        </div>
        <div className="border border-grey-500 mt-2 "></div>

        <h1 className="text-primary text-700 font-semibold gap-2 mt-2">Resumen del Carrito</h1>
        <div className="border border-grey-500 mt-2"></div>
        {cartItems.length === 0 ? (
          <p className="text-center">Tu carrito está vacío.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex justify-between p-1 m-1 text-sm text-black">
              <div className="flex flex-col ">
                <span>{item.name}</span>
              </div>
              <div className="flex items-center">
                <h1> ${calculateTotalLine(item.price, item.quantity).toLocaleString("es-CO")}</h1>
              </div>
              {/* <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500"
              >
                Eliminar
              </button> */}
            </div>
          ))
        )}
        <div className="border border-grey-500 mt-1 "></div>
        <div className=" flex p-1 m-1 justify-between" >
          <h1 className=" text-black">Subtotal</h1>
          <h1 className="font-regular text-black">${totalPrice.toLocaleString("es-CO")}</h1>
        </div>
        <div className="border border-grey-500 mt-1"></div>
        <div className=" flex p-1 m-1 justify-between" >
          <h1 className="font-bold text-2xl  text-black">TOTAL</h1>
          <h1 className="font-bold text-2xl  text-primary">${totalPrice.toLocaleString("es-CO")}</h1>
        </div>
        {totalPrice > totalCupo ?

          <p className="text-[red] text-sm  font-regular text-center">Su pedido es mayor al cupo disponible, por favor ajuste las cantidades.</p> : null
        }

        <div className="flex items-center justify-center pt-3">
          <button className="bg-primary text-white w-[80%] py-2 px-10 rounded-full text-sm">Siguiente</button>
        </div>
      </div>

    </div>
  );
}
