"use client";
import SearchableSelect from "@/components/common/select/select";
import { useState } from "react";

interface Option {
    label: string;
    value: string;
}

interface FiltersProps {
    filters: {
        name: string;
        options: Option[];
    }[];
    onFilterChange: (selectedFilters: Record<string, Option | null>) => void;
    onSearch: () => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange, onSearch }) => {
    const [selectedFilters, setSelectedFilters] = useState<Record<string, Option | null>>({});

    const handleSelect = (filterName: string, option: Option) => {
        const newFilters = { ...selectedFilters, [filterName]: option };
        setSelectedFilters(newFilters);
        onFilterChange(newFilters);
    };

    return (
        <div className="border border-gray-100 grid grid-cols-2 md:grid-cols-5 gap-4 bg-white p-4 rounded-bl-lg rounded-tr-lg">
            {filters.map((filter) => (
                <div key={filter.name} className="w-full">
                    <label className="text-sm font-semibold text-gray-700">{filter.name}</label>
                    <SearchableSelect
                        options={filter.options}
                        onSelect={(option) => handleSelect(filter.name, option)}
                        placeholder={`Selecciona ${filter.name.toLowerCase()}`}
                    />
                </div>
            ))}

            {/* Botón de búsqueda al final */}
            <div className="w-full flex items-end">
                <button 
                    onClick={onSearch} 
                    className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition w-full"
                >
                    Buscar
                </button>
            </div>
        </div>
    );
};

export default Filters;
