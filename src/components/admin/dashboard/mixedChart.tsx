"use client";

import Chart from "react-apexcharts";

const MixedChart = () => {
  const options = {
    chart: {
      id: "mixed-chart",
      toolbar: { show: false },
    },
    xaxis: {
      categories: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
      labels: { style: { fontSize: "14px", fontWeight: 500 } },
    },
    stroke: {
      width: [0, 3, 3], // 0 para barras, 3 para líneas
      curve: "smooth",
    },
    markers: {
      size: [0, 5, 5], // Solo para líneas
      strokeColors: ["#FF0000", "#008000"], // Rojo para devoluciones, verde para pagos
      strokeWidth: 2,
    },
    yaxis: {
      labels: {
        formatter: (val: number) => `$${val.toLocaleString()}M`, // Formato de millones COP
        style: { fontSize: "13px" },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (val: number) => `$${val.toLocaleString()}M COP`, // Tooltip claro
      },
    },
    colors: ["#008FFB", "#FF0000", "#008000"], // Azul (Ventas), Rojo (Devoluciones), Verde (Pagos)
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    plotOptions: {
      bar: {
        columnWidth: "40%",
      },
    },
  };

  const series = [
    {
      name: "Ventas",
      type: "column",
      data: [900, 1000, 1100, 1200, 1300, 1400], // En millones COP
    },
    {
      name: "Devoluciones",
      type: "line",
      data: [300, 400, 350, 500, 450, 550], // Línea roja
    },
    {
      name: "Pagos",
      type: "line",
      data: [200, 250, 300, 280, 320, 350], // Línea verde
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default MixedChart;
