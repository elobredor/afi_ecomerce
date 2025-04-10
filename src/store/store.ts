import { configureStore, combineReducers } from "@reduxjs/toolkit";
import navigationReducer from "./slices/navigationSlice";
import productReducer from "./slices/productSlice";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";

// 🔹 Combina reducers
const rootReducer = combineReducers({
	navigation: navigationReducer,
	products: productReducer,
	auth: authReducer,
	cart: cartReducer,
});

// 📌 Cargar estado desde localStorage (solo si estamos en el cliente)
const loadFromLocalStorage = () => {
	if (typeof window === "undefined") return undefined; // 🚫 SSR protection
	try {
		const stateStr = localStorage.getItem("reduxState");
		return stateStr ? JSON.parse(stateStr) : undefined;
	} catch (error) {
		console.error("Error cargando desde localStorage", error);
		return undefined;
	}
};

const preloadedState = loadFromLocalStorage();

export const store = configureStore({
	reducer: rootReducer,
	preloadedState,
});

// 📌 Guardar en localStorage solo en cliente
if (typeof window !== "undefined") {
	store.subscribe(() => {
		try {
			localStorage.setItem("reduxState", JSON.stringify(store.getState()));
		} catch (error) {
			console.error("Error guardando en localStorage", error);
		}
	});
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
