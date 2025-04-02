import React, { useState, useEffect, useRef } from "react";
// import { locationService } from "../../../../../services/api/location.service";
// import { api } from "../../../../../services/api";

interface SimpleDeliveryModalProps {
  visible: boolean;
  onClose: () => void;
  directionToEdit?: any;
  setDirectionSelected?: (direction: any) => void;
  refreshDirections?: () => void;
  isSeller?: boolean;
}

const initialFormState = {
  complemento: "",
  isPrincipal: false,
  estado: true,
  coordenadas: {},
  isNegocio: false,
  ciudad: "8001",
  departamento: "08",
  pais: "CO",
  codigoPostal: "080001"
  
};

export default function DeliveryModal({
  visible,
  onClose,
  directionToEdit,
  setDirectionSelected,
  refreshDirections,
  isSeller = false,
}: SimpleDeliveryModalProps) {
  const [formData, setFormData] = useState(initialFormState);
  const [cities, setCities] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);


  // Para obtener la API_KEY, descomentar el siguiente bloque de código
  // useEffect(() => {
  //   const fetchApiKey = async () => {
  //     try {
  //       const { data } = await api.info.getParams();
  //       const apiKeyParam = data.find((param: any) => param.nombre === "API_KEY");
  //       if (apiKeyParam) {
  //         setApiKey(apiKeyParam.value);
  //       } else {
  //         console.error("API key not found in parameters");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching API key:", error);
  //     }
  //   };

  //   fetchApiKey();
  // }, []);

  const [apiKey, setApiKey] = useState<string | null>(null);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      isNegocio: checked,
    }));
  };

  useEffect(() => {

    if (directionToEdit) {
      setFormData(directionToEdit);
    } else {
      setFormData(initialFormState);
    }
  }, [directionToEdit]);

 
// Para obtener la lista de ciudades por departamento, descomentar el siguiente bloque de código

  // useEffect(() => {
  //   const fetchCities = async () => {
  //     try {
  //       const data = await locationService.getListCitiesPerDeparment("08");
  //       setCities(data.data);
  //     } catch (err) {
  //       console.error("Error fetching cities:", err);
  //     }
  //   };
  //   fetchCities();
  // }, [formData.departamento]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "complemento") {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      searchTimeout.current = setTimeout(() => {
        fetchPlaces(value);
      }, 500); // Espera 500ms antes de buscar
    }
  };

  const fetchPlaces = async (inputText: string) => {
    if (!inputText) return;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      inputText
    )}&components=country:CO&location=10.9685,-74.7813&radius=50000&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "OK") {
        const filteredResults = data.predictions
          .filter((place) => place.description.includes("Atlántico"))
          .map((place) => {
            const parts = place.description.split(", ");
            const shortDescription = parts.length > 5 ? parts.slice(0, -3).join(", ") : parts.slice(0, -2).join(", ");
            return {
              ...place,
              shortDescription,
            };
          });

        setSuggestions(filteredResults);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const fetchPlaceDetails = async (placeId: string) => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === "OK") {
        const location = data.result.geometry.location;

        setFormData((prev) => ({
          ...prev,
          complemento: data.result.formatted_address,
          coordenadas: { latitud: location.lat, longitud: location.lng },
        }));
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  const handleSelectPlace = (place: any) => {
    const shortDesc = place.shortDescription || place.description.split(", ").slice(0, -2).join(", ");

    setFormData((prev) => ({
      ...prev,
      complemento: shortDesc, // Se almacena la versión más corta
    }));

    fetchPlaceDetails(place.place_id);
    setSuggestions([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (directionToEdit) {
        formData.departamento = "08";
        formData.estado = true;
        formData.codigoPostal = "080001"
        // await api.directions.update(formData);
      } else {
        // const { data } = await api.directions.createDirection(
        //   JSON.stringify(formData)
        // );
        // setDirectionSelected(data);
      }
      refreshDirections();
      onClose();
    } catch (err) {
      console.log("Error saving direction:", err);
      setError("Ocurrió un error al guardar la dirección.");
    } finally {
      setFormData(initialFormState);
      setIsLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-10 mt-20 bg-gray-800 bg-opacity-50 items-center flex justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          {directionToEdit ? "Editar dirección" : "Nueva dirección"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Dirección
            </label>
            <input
              type="text"
              name="complemento"
              value={formData.complemento}
              onChange={handleInputChange}
              placeholder="Escribe tu dirección..."
              className="w-full border px-3 py-2 rounded-md"
              required
            />

            {suggestions.length > 0 && (
              <ul className="border bg-white shadow-md mt-1 rounded-md overflow-hidden max-h-40 overflow-y-auto">
                {suggestions.map((place) => (
                  <li
                    key={place.place_id}
                    onClick={() => handleSelectPlace(place)}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {place.shortDescription}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Departamento
              </label>
              <select
                name="departamento"
                value={formData.departamento}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded-md"
                required
              >
                <option value="08">Atlántico</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ciudad
              </label>
              <select
                name="ciudad"
                value={formData.ciudad}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded-md"
                required
              >
                <option value="8001">BARRANQUILLA</option>
                {cities?.map((city) => (
                  <option key={city.codigoCiudad} value={city.codigoCiudad}>
                    {city.nombreCiudad}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {isSeller && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dirección de negocio
              </label>
              <input
                type="checkbox"
                name="isNegocio"
                checked={formData.isNegocio}
                onChange={handleCheckboxChange}
                className="w-4 h-4"
              />
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md">
              {isLoading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
