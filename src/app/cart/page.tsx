"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setCart,  updateQuantity } from "@/store/slices/cartSlice";
import { selectAuth } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import CartSummary from "./components/CartSummary";
import SuccessOrder from "./components/steps/SuccessOrder";
import SelectDirection from "./components/steps/SelectDirection";
import FacturationData from "./components/steps/FacturationData";
import CartList from "./components/steps/CartList";
export const dynamic = "force-dynamic"; // Forza que el middleware se ejecute

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalCupo = 1000000;
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const { isAuthenticated } = useSelector(selectAuth);

  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [addresses, setAddresses] = useState<any[]>([
    { id: "1", address: "Carrera 10 No 22 16", city: "Bogotá", isDefault: true },
    { id: "2", address: "Calle 85 No 45-18", city: "Medellín", isDefault: false },
  ]); 
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [facturation, setFacturation] = useState<any[]>([
    { id: "1", name: "Factura Electrónica", email: "correo@ejemplo.com", isDefault: true },
    { id: "2", name: "Factura Física", address: "Carrera 10 No 22 16", isDefault: false },
  ]); 
  const [selectedBillingInfo, setSelectedBillingInfo] = useState<string | null>(null);
  
// const [selectedTransportista, setSelectedTransportista] = useState<string | null>(null);

  useEffect(() => {
    console.log(cartItems);
    
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

//   useEffect(()=>{
// getDirections()
// getFacturationInfo()
//   },[])

  // const getFacturationInfo = async () => {
  //   try {
  //     const { data } = await api.facturation.getAll(); la obtenemos asi o probablemente del un selector del redux
  //     setFacturation(data.facturation);
  //   } catch (error) {
  //     console.error("Error fetching facturation info:", error);
  //   }
  // };

  // const getDirections = async () => {
  //   try {
  //     const { data } = await api.directions.getAll();
  //      setAddresses(data.directions);
  //   } catch (error) {
  //     console.error("Error fetching directions:", error);
  //   }
  // };

  const handleQuantityChange = (id: number, newQuantity: number) => {
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

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Renderiza el contenido según el paso actual
  const renderStepContent = () => {
    switch (currentStep) {
      case 1: 
        return (
          <CartList  calculateTotalLine={calculateTotalLine} cartItems={cartItems} handleQuantityChange={handleQuantityChange} quantities={quantities}/>
        );

      case 2: 
        return (
          <SelectDirection addresses={addresses} selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />
        );

      case 3: 
        return (
          <FacturationData billingInfoOptions={facturation} selectedBillingInfo={selectedBillingInfo} setSelectedBillingInfo={setSelectedBillingInfo}/>
        );

      case 4: 
        return (
         <SuccessOrder totalPrice={totalPrice}/>
        );

      default:
        return null;
    }
  };

  // Botones de navegación según el paso
  const renderNavigationButtons = () => {
    if (currentStep === 4) return null; // No mostrar botones en el paso final
    
    return (
      <div className="flex justify-between mt-6">
        {currentStep > 1 && (
          <button 
            onClick={prevStep}
            className="border border-primary text-primary py-2 px-6 rounded-full hover:bg-gray-100"
          >
            Atrás
          </button>
        )}
  
      </div>
    );
  };

  return (
    <div className="container flex flex-col gap-4 m-8">
      <div className="flex gap-4">
        <div className="w-2/3 p-4 border border-grey-300 rounded-md shadow-md gap-2">
          {renderStepContent()}
          {renderNavigationButtons()}
        </div>
        <CartSummary
         cartItems={cartItems}
          nextStep={nextStep}
          calculateTotalLine={calculateTotalLine}
          totalCupo={totalCupo}
          totalPrice={totalPrice} />
      </div>
    </div>
  );
}