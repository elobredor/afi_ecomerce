"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

interface BreadcrumbProps {
  categoria?: string;
  marca?: string;
  linea?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ categoria, marca, linea }) => {
  const router = useRouter();

  // Normaliza texto para URL
  const normalize = (text?: string) =>
    text ? text.trim().replace(/\s+/g, "_").replace(/\//g, "-") : "";

  const breadcrumbs: { name: string; path: string }[] = [];

  // "Catálogo" es visual, pero la ruta base es "/"
  breadcrumbs.push({ name: "Catálogo", path: "/" });

  // Si hay categoría real, la agregamos
  if (categoria && categoria.toLowerCase() !== "catalogo") {
    breadcrumbs.push({
      name: categoria,
      path: `/${normalize(categoria)}`,
    });
  }

  if (marca) {
    breadcrumbs.push({
      name: marca,
      path: `/${normalize(categoria)}/${normalize(marca)}`,
    });
  }

  if (linea) {
    breadcrumbs.push({
      name: linea,
      path: `/${normalize(categoria)}/${normalize(marca)}/${normalize(linea)}`,
    });
  }

  const handleBreadcrumbClick = (item: { path: string }) => {
    router.push(item.path);
  };

  return (
    <nav className="flex items-center text-sm">
      <ul className="flex list-none m-0 p-0">
        {breadcrumbs.map((item, index) => (
          <li key={item.path} className="flex items-center">
            <button
              onClick={() => handleBreadcrumbClick(item)}
              className="no-underline text-gray-500 font-medium mx-2 text-base hover:text-gray-700"
            >
              {item.name}
            </button>
            {index < breadcrumbs.length - 1 && (
              <ChevronRight className="mx-2 text-gray-400 w-3" />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
