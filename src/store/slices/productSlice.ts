import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: string;
  name: string;
  price: number;
}

interface ProductState {
  items: Product[];
  selectedProductId: string | null; // Agregado para el producto seleccionado
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  selectedProductId: null, // Estado inicial para el producto seleccionado
  status: "idle",
  error: null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    selectProduct: (state, action: PayloadAction<string>) => {
      state.selectedProductId = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProductId = null;
    },
    // Otros reducers según necesites
  },
});

export const { setProducts, selectProduct, clearSelectedProduct } = productSlice.actions;

export default productSlice.reducer;
