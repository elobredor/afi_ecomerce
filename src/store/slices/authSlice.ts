import { storage } from "@/utils/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Tipo para el usuario
interface User {
  id: string;
  name: string;
  email: string;
  token: string;
  user:string
}

// Estado inicial
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Función para cargar usuario desde localStorage
const loadUserFromStorage = () => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
};

const initialState: AuthState = {
  user: loadUserFromStorage(),
  isAuthenticated: !!loadUserFromStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Guardar en localStorage
      Cookies.set("token", action.payload.token, { expires: 7, secure: true, sameSite: "Strict" });
      // window.location.href = "/"; 

    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user"); // Eliminar del localStorage
      storage.clearAuth();
    },
  },
});

// Selectores
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
