import { useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface SearchableSelectProps {
  options: Option[];
  onSelect: (option: Option) => void;
  placeholder?: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({ options, onSelect, placeholder = "Selecciona una opción" }) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (option: Option) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <div className="relative w-full max-w-xs">
      <div
        className="border border-gray-300 p-2 rounded-md bg-white cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-gray-700">{selected ? selected.label : placeholder}</span>
        <span className="text-gray-500">{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <input
            type="text"
            className="w-full p-2 border-b border-gray-200 outline-none text-gray-700"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="max-h-40 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <p className="p-2 text-gray-500 text-sm">No hay resultados</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
