import axios from "axios";
import { API_CONFIG } from "@/config/api.config";
import { storage } from "@/utils/storage";

const axiosInstance = axios.create(API_CONFIG);

// Request interceptor
axiosInstance.interceptors.request.use(
	(config) => {
		// Obtener el token del cache (storage)
		let token = storage.getToken();
		// Si no hay token en storage, usar el token por defecto del .env
		if (!token) {
			token = process.env.NEXT_PUBLIC_DEFAULT_TOKEN ?? "";
		}
		// Si hay token, lo agregamos al header Authorization
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		// Asegurar que Content-Type y Accept siempre estén presentes
		config.headers["Content-Type"] = "application/json";
		config.headers["Accept"] = "application/json";

		return config;
	},
	(error) => Promise.reject(error)
);

export default axiosInstance;
