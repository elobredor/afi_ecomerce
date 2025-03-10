"use client";

import Image from "next/image";

const brands = [
  { name: "SANDEN", logo: "/logos/sanden.png" },
  { name: "ACTECmax", logo: "/logos/actec.png" },
  { name: "DENSO", logo: "/logos/denso.png" },
  { name: "Autofrio", logo: "/logos/Autofrio.png" },
];

const BrandBanner = () => {
  return (
    <div className="relative bg-white drop-shadow-sm w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[5rem] flex items-center justify-center overflow-hidden">
      <div className="flex gap-20 items-center">
        {brands.map((brand, index) => (
          <div key={index} className="grayscale hover:grayscale-0 transition-all duration-300">
            <Image src={brand.logo} alt={brand.name} width={130} height={80} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandBanner;
