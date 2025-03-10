export default function BrandsCars() {
    const marcas = [
      "/logos/chevrolet.webp",
      "/logos/chevrolet.webp",
      "/logos/chevrolet.webp",
      "/logos/chevrolet.webp",
      "/logos/chevrolet.webp",
      "/logos/chevrolet.webp",
      "/logos/chevrolet.webp",
      "/logos/chevrolet.webp",
      "/logos/chevrolet.webp",
      "/logos/chevrolet.webp",
      "/logos/chevrolet.webp",
      "/logos/chevrolet.webp",
    ];
  
    return (
      <section className="w-full bg-white py-16 px-6 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Columna Izquierda - Texto */}
          <div>
            <h2 className="text-5xl font-bold text-blue-900">
              <span className="text-6xl">+160</span> marcas de automóviles en{" "}
              <span className="text-red-500">Colombia</span>
            </h2>
            <p className="text-gray-600 mt-6 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
  
          {/* Columna Derecha - Logos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3">
            {marcas.map((marca, index) => (
              <img
                key={index}
                src={marca}
                alt={`Marca ${index + 1}`}
                className="w-20 h-20 object-contain mx-auto"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
  