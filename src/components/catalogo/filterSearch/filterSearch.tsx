"use client";
import SearchableSelect from "@/components/common/select/select";
import { useEffect, useState } from "react";
import { api } from "@/services/api"; // Asegúrate de importar la API correcta
import { useRouter } from "next/router";

interface Option {
  label: string;
  value: string;
}

interface FiltersProps {
  onFilterChange: (selectedFilters: Record<string, Option | null>) => void;
  onSearch: (selectedFilters: Record<string, Option | null>) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange}) => {
  const [categories, setCategories] = useState<Option[]>([]);
  const [brands, setBrands] = useState<Option[]>([]);
  const [lines, setLines] = useState<Option[]>([]);
  const [models, setModels] = useState<Option[]>([]);
  

  const [selectedCategory, setSelectedCategory] = useState<Option | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<Option | null>(null);
  const [selectedLine, setSelectedLine] = useState<Option | null>(null);
  const [selectedModel, setSelectedModel] = useState<Option | null>(null);

  // 🔹 Cargar categorías al inicio
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const resultCategories = await api.categories.getList();
        setCategories(
          resultCategories.data.map((category: any) => ({
            label: category.mga_name.replace(/\s+/g, "_").replace(/\//g, "-"),
            value: category.mga_id,
          }))
        );
      } catch (error) {
        console.error("Error cargando categorías:", error);
      }
    };
    fetchCategories();
  }, []);

  // 🔹 Cuando cambia la categoría, cargar marcas
  useEffect(() => {
    if (!selectedCategory) {
      setBrands([]);
      setLines([]);
      setModels([]);
      return;
    }

    const fetchBrands = async () => {
      try {
        const {data} = await api.categories.getAll(selectedCategory.label);
        setBrands(
          data.map((brand: any) => ({
            label: brand.mfa_pref.replace(/\s+/g, "_").replace(/\//g, "-"),
            value: brand,
          }))
        );
      } catch (error) {
        console.error("Error cargando marcas:", error);
      }
    };

    fetchBrands();
  }, [selectedCategory]);

  // 🔹 Cuando cambia la marca, cargar líneas
  useEffect(() => {
    if (!selectedCategory || !selectedBrand) {
      setLines([]);
      setModels([]);
      return;
    }

    const fetchLines = async () => {
      try {
        const{ data }= await api.line.getAll(selectedCategory.label, selectedBrand.label);
   
        
        setLines(
          data.map((line: any) => ({
            label: line.msg_pref.replace(/\s+/g, "_").replace(/\//g, "-"),
            value: line.id,
          }))
        );
      } catch (error) {
        console.error("Error cargando líneas:", error);
      }
    };

    fetchLines();
  }, [selectedCategory, selectedBrand]);

  // 🔹 Cuando cambia la línea, cargar modelos
  useEffect(() => {
    if (!selectedLine) {
      setModels([]);
      return;
    }

    const fetchModels = async () => {
      try {
        const {data} = await api.line.getArticles(selectedCategory?.label, selectedBrand?.label,selectedLine?.label);
        setModels(
          data.map((model: any) => ({
            label: model.code,
            value: model.id,
          }))
        );
      } catch (error) {
        console.error("Error cargando modelos:", error);
      }
    };

    fetchModels();
  }, [selectedLine]);

  const onSearch = () => {
    if (!selectedCategory) {
      console.error("Debe seleccionar al menos una categoría para realizar la búsqueda");
      return;
    }

    const pathSegments = [
      selectedCategory.label,
      selectedBrand?.label,
      selectedLine?.label,
      selectedModel || null,
    ]
      .filter(Boolean) // Filtrar valores nulos o indefinidos
      .map((segment) => segment?.replace(/\s+/g, '-')); // Reemplazar espacios por guiones

    const newPath = `/${pathSegments.join('/')}`;

    // Navegar a la nueva ruta
    window.location.href = newPath;
  };

  return (
    <div className="border border-gray-100 grid grid-cols-2 md:grid-cols-5 gap-4 bg-white p-4 rounded-bl-lg rounded-tr-lg">
      {/* 🔹 Categoría */}
      <div className="w-full">
        <label htmlFor="categoria" className="text-sm font-semibold text-gray-700">
          Categoría
        </label>
        <SearchableSelect
          id="categoria"
          options={categories}
          value={selectedCategory}
          onSelect={(option) => {
            setSelectedCategory(option);
            setSelectedBrand(null);
            setSelectedLine(null);
            setModels([]);
            onFilterChange({ Categoria: option });
          }}
          placeholder="Selecciona una categoría"
        />
      </div>

      {/* 🔹 Marca */}
      <div className="w-full">
        <label htmlFor="marca" className="text-sm font-semibold text-gray-700">
          Marca
        </label>
        <SearchableSelect
          id="marca"
          options={brands}
          value={selectedBrand}
          onSelect={(option) => {
            setSelectedBrand(option);
            setSelectedLine(null);
            setModels([]);
            onFilterChange({ Categoria: selectedCategory, Marca: option });
          }}
          placeholder="Selecciona una marca"
          disabled={!selectedCategory}
        />
      </div>

      {/* 🔹 Línea */}
      <div className="w-full">
        <label htmlFor="linea" className="text-sm font-semibold text-gray-700">
          Línea
        </label>
        <SearchableSelect
          id="linea"
          options={lines}
          value={selectedLine}
          onSelect={(option) => {
            setSelectedLine(option);
            setModels([]);
            onFilterChange({ Categoria: selectedCategory, Marca: selectedBrand, Línea: option });
          }}
          placeholder="Selecciona una línea"
          disabled={!selectedBrand}
        />
      </div>

      {/* 🔹 Modelo */}
      <div className="w-full">
        <label htmlFor="modelo" className="text-sm font-semibold text-gray-700">
          Modelo
        </label>
        <SearchableSelect
          id="modelo"
          options={models}
          value={selectedModel}
          onSelect={(option) => {
        setSelectedModel(option.label);
        onFilterChange({ Categoria: selectedCategory, Marca: selectedBrand, Línea: selectedLine, Modelo: option });
          }}
          placeholder="Selecciona un modelo"
          disabled={!selectedLine}
        />
      </div>

      {/* 🔹 Botón de búsqueda */}
      <div className="w-full flex items-end">
        <button
          onClick={() => onSearch({ Categoria: selectedCategory, Marca: selectedBrand, Línea: selectedLine, Modelo: selectedLine })}
          className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition w-full"
          disabled={!selectedCategory}
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default Filters;
