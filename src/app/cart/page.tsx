"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setCart, updateQuantity } from "@/store/slices/cartSlice";
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
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalCupo = 1000000;
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const { isAuthenticated } = useSelector(selectAuth);
  const totalImpuestos = cartItems.reduce((acc, item) => {
    return acc + (item.price * item.quantity * Number(item.imp_sales)) / 100;
  }, 0);


  const router = useRouter();
  // Inicializamos el estado con una función para leer localStorage durante la inicialización
  const [currentStep, setCurrentStep] = useState(() => {
    if (typeof window !== "undefined") {
      const savedStep = localStorage.getItem("cartCurrentStep");
      return savedStep ? parseInt(savedStep) : 1;
    }
    return 1;
  });
  
  const [addresses, setAddresses] = useState<any[]>([
    {
      id: "1",
      name: "Empresa Principal S.A.",
      address: "Carrera 50 # 123 - 45",
      city: "Barranquilla",
      phone: "+57 300 123 4567",
      email: "contacto@empresaprincipal.com",
      isDefault: true,
    },
    {
      id: "2",
      name: "Comercial Secundaria Ltda.",
      address: "Calle 72 # 45 - 67",
      city: "Barranquilla",
      phone: "+57 300 765 4321",
      email: "info@comercialsecundaria.com",
      isDefault: false,
    },
  ]); 
  
  // Inicializamos también con funciones para obtener los valores de localStorage
  const [selectedAddress, setSelectedAddress] = useState<{ id: string; name: string; transportist: string; isDelivery:boolean, } | null>(() => {
    if (typeof window !== "undefined") {
      const savedAddress = localStorage.getItem("cartSelectedAddress");
      return savedAddress ? JSON.parse(savedAddress) : null;
    }
    return null;
  });
  
  const [facturation, setFacturation] = useState<any[]>([
    { id: "1", name: "Factura Electrónica", email: "correo@ejemplo.com", isDefault: true },
    { id: "2", name: "Factura Física", address: "Carrera 10 No 22 16", isDefault: false },
  ]); 
  
  const [selectedBillingInfo, setSelectedBillingInfo] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("cartSelectedBillingInfo");
    }
    return null;
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/"); // Redirige si no está autenticado
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Cargar el carrito desde localStorage
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
      
      // Ya no necesitamos cargar estos estados aquí porque lo hacemos en la inicialización
      // del estado con las funciones de arriba
    }
  }, [dispatch]);

  // Guardar el paso actual en localStorage cuando cambie
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cartCurrentStep", currentStep.toString());
    }
  }, [currentStep]);
  
  // Guardar la dirección seleccionada en localStorage cuando cambie
  useEffect(() => {
    if (typeof window !== "undefined" && selectedAddress) {
      localStorage.setItem("cartSelectedAddress", JSON.stringify(selectedAddress));
    }
  }, [selectedAddress]);
  
  // Guardar la información de facturación en localStorage cuando cambie
  useEffect(() => {
    if (typeof window !== "undefined" && selectedBillingInfo) {
      localStorage.setItem("cartSelectedBillingInfo", selectedBillingInfo);
    }
  }, [selectedBillingInfo]);

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
      if (currentStep === 3) {
        createOrder();
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const createOrder = () => {
    // Lógica para crear la orden



  const orderDetails = {
      createby: user?.user,
      total: totalPrice + totalImpuestos,
      base: totalPrice,
      taxtotal: totalImpuestos,
      detail: cartItems.map(item => ({
        code: item.code,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        vat: Number(item.imp_sales),
        taxcode: item.imp_sales_code,
      })),
      selectedAddress: { 
        id: selectedAddress?.id,
        isDelivery: selectedAddress?.isDelivery,
        transportist: selectedAddress?.transportist?.id,
      },
      selectedBillingInfo,
    };
    console.log("Creating order with the following details:", orderDetails);
};

   

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetCheckout = () => {
    // Función para reiniciar el proceso de checkout
    setCurrentStep(1);
    setSelectedAddress(null);
    setSelectedBillingInfo(null);
    
    // Limpiar los datos de localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cartCurrentStep");
      localStorage.removeItem("cartSelectedAddress");
      localStorage.removeItem("cartSelectedBillingInfo");
    }
  };

  // Renderiza el contenido según el paso actual
  const renderStepContent = () => {
    switch (currentStep) {
      case 1: 
        return (
          <CartList calculateTotalLine={calculateTotalLine} cartItems={cartItems} handleQuantityChange={handleQuantityChange} quantities={quantities}/>
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
    if (currentStep === 4) {
      return (
        <div className="flex justify-center mt-6">
          <button 
            onClick={resetCheckout}
            className="bg-primary text-white py-2 px-6 rounded-full hover:bg-primary-dark"
          >
            Iniciar nueva compra
          </button>
        </div>
      );
    }
    
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

  // Añadimos una verificación para ver si hay elementos en el carrito
  // Si no hay elementos y estamos en un paso más allá del paso 1, redirigimos al paso 1
  useEffect(() => {
    if (cartItems.length === 0 && currentStep > 1) {
      setCurrentStep(1);
    }
  }, [cartItems, currentStep]);

  return (
    <div className="container flex flex-col gap-4 m-8">
      {/* Indicador de progreso */}
      {/* <div className="w-full mb-4">
        <div className="flex justify-between mb-2">
          <span className={`font-medium ${currentStep >= 1 ? 'text-primary' : 'text-gray-400'}`}>Carrito</span>
          <span className={`font-medium ${currentStep >= 2 ? 'text-primary' : 'text-gray-400'}`}>Dirección</span>
          <span className={`font-medium ${currentStep >= 3 ? 'text-primary' : 'text-gray-400'}`}>Facturación</span>
          <span className={`font-medium ${currentStep >= 4 ? 'text-primary' : 'text-gray-400'}`}>Confirmación</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full" 
            style={{ width: `${(currentStep / 4) * 100}%` }}
          ></div>
        </div>
      </div> */}
      
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
          totalPrice={totalPrice} 
          totalImpuestos={totalImpuestos}
        />
      </div>
    </div>
  );
}