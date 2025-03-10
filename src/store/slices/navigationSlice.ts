import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavigationState {
  categoria: { id: string | null; name: string | null };
  marca: { id: string | null; name: string | null };
  linea: { id: string | null; name: string | null };
  producto: { id: string | null; name: string | null };
}

const initialState: NavigationState = {
  categoria: { id: null, name: null },
  marca: { id: null, name: null },
  linea: { id: null, name: null },
  producto: { id: null, name: null },
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setCategoria: (state, action: PayloadAction<{ id: string  | null; name: string   | null}>) => {
      state.categoria = action.payload;
      state.marca = { id: null, name: null };
      state.linea = { id: null, name: null };
      state.producto = { id: null, name: null };
    },
    setMarca: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.marca = action.payload;
      state.linea = { id: null, name: null };
      state.producto = { id: null, name: null };
    },
    setLinea: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.linea = action.payload;
      state.producto = { id: null, name: null };
    },
    setProducto: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.producto = action.payload;
    },
  },
});

// Exportar las acciones y el reducer correctamente
export const { setCategoria, setMarca, setLinea, setProducto } = navigationSlice.actions;
export default navigationSlice.reducer;
