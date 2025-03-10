"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { RootState } from "@/store/store";
import { setCategoria, setMarca, setLinea } from "@/store/slices/navigationSlice";

const Breadcrumb = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Obtener el estado de Redux
  const { categoria, marca, linea } = useSelector(
    (state: RootState) => state.navigation
  );

  // Construir la ruta dinámica del catálogo
  const breadcrumbs = [
    { name: "Catálogo", path: "/catalogo" },
    categoria?.name
      ? { name: categoria.name, path: `/${categoria.name}`, id: categoria.id }
      : null,
    marca?.name
      ? { name: marca.name, path: `/${categoria.name}/${marca.name}`, id: marca.id }
      : null,
    linea?.name
      ? {
          name: linea.name,
          path: `/${categoria.name}/${marca.name}/${linea.name}`,
          id: linea.id,
        }
      : null,
  ].filter(Boolean); // Elimina valores nulos

  // Manejar el clic en las migas de pan
  const handleBreadcrumbClick = (path, id, level) => {
    // Actualizar el estado de Redux según la ruta y el nivel
    if (level === 1) {
      dispatch(setCategoria({ id: id, name: breadcrumbs[level].name }));
      dispatch(setMarca({ id: null, name: null }));
      dispatch(setLinea({ id: null, name: null }));
    } else if (level === 2) {
      dispatch(setMarca({ id: id, name: breadcrumbs[level].name }));
      dispatch(setLinea({ id: null, name: null }));
    } else if (level === 3) {
      dispatch(setLinea({ id: id, name: breadcrumbs[level].name }));
    } else {
      dispatch(setCategoria({ id: null, name: null }));
      dispatch(setMarca({ id: null, name: null }));
      dispatch(setLinea({ id: null, name: null }));
    }

    // Navegar a la ruta
    router.push(path);
  };

  return (
    <nav className="flex items-center text-sm">
      <ul className="flex list-none m-0 p-0">
        {breadcrumbs.map((item, index) => (
          <li key={index} className="flex items-center">
            {item && (
              <button
                onClick={() => handleBreadcrumbClick(item.path, item.id, index)}
                className="no-underline text-gray-500 font-medium mx-2 text-base hover:text-gray-700"
              >
                {item.name}
              </button>
            )}
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
