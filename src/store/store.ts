import { configureStore, combineReducers } from "@reduxjs/toolkit";
import navigationReducer from "./slices/navigationSlice"; // Verifica la ruta correcta
import productReducer from './slices/productSlice'; // Asegúrate de que la ruta sea correcta
import authReducer from "./slices/authSlice"; // Verifica la ruta correcta
import cartReducer from "./slices/cartSlice"; // Verifica la ruta correcta

// 🔹 Combina reducers (incluso si solo tienes uno, evita el error)
const rootReducer = combineReducers({
  navigation: navigationReducer, // 🔥 Asegúrate de que la clave sea "navigation"
  products: productReducer,
  auth: authReducer,
  cart: cartReducer
});

// 📌 Cargar estado desde localStorage
const loadFromLocalStorage = () => {
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
  reducer: rootReducer, // 🔥 Ahora usa `rootReducer` en vez de un objeto literal
  preloadedState,
});

// 📌 Suscribirse a Redux para guardar cambios en `localStorage`
store.subscribe(() => {
  try {
    localStorage.setItem("reduxState", JSON.stringify(store.getState()));
  } catch (error) {
    console.error("Error guardando en localStorage", error);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
