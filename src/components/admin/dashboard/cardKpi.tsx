"use client";

import { ArrowDown, ArrowUp, DollarSign } from "lucide-react";
import { JSX } from "react";

const KPICard = ({ data }: { data: { title: string; value: number; color: string; icon: JSX.Element }[] }) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-2">
      {data.map((item, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-md text-gray-700">{item.title}</h3>
            
            {/* Ícono dentro de un círculo con color suave */}
            <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-${item.color}-100`}>
              {item.icon}
            </div>
          </div>
          <p className={`text-2xl font-bold text-${item.color}-600 mt-2`}>
            ${item.value.toLocaleString()}M
          </p>
          <p className="text-xs text-gray-500">{getCurrentMonthYear()}</p>
        </div>
      ))}
    </div>
  );
};

// Uso del componente con datos dinámicos
const kpiData = [
  { title: "Compras", value: 1400, color: "blue", icon: <DollarSign className="text-blue-600 w-3 h-3" /> },
  { title: "Pagos", value: 350, color: "green", icon: <ArrowUp className="text-green-600 w-3 h-3" /> },
  { title: "Devoluciones", value: 550, color: "red", icon: <ArrowDown className="text-red-600 w-3 h-3" /> },
  { title: "Cartera", value: 120, color: "yellow", icon: <ArrowUp className="text-red-600 w-3 h-3" /> },
];

const getCurrentMonthYear = () => {
  const date = new Date(); // Obtiene la fecha actual
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const month = months[date.getMonth()]; // Obtiene el nombre del mes
  const year = date.getFullYear(); // Obtiene el año

  return `${month} ${year}`;
};
export default function KPIContainer() {
  return <KPICard data={kpiData} />;
}
