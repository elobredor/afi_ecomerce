"use client"
import OrderTable from "@/components/admin/table/admTableProduct";
import DynamicTable from "@/components/admin/table/DynamicTable";
import { api } from "@/services/api";
import { log } from "console";
import { useEffect, useState } from "react";

export default function PortalPage() {

 
 
  const [orders, setOrders] = useState([])


  const fetchOrders = async () => {
   
    try {
      const data= await api.order.getAll();
      console.log(data);
      
      setOrders(data)
   
    }
    catch (error) {
      setOrders([]);
      console.error("Error fetching orders:", error);
    }
  };


  useEffect(() => {
    fetchOrders();
  }, []);

 

  return (
    <div>
      <h2 className="text-xl font-semibold">Mis Pedidos</h2>
      <DynamicTable orders={orders} />
    </div>
  );
}
