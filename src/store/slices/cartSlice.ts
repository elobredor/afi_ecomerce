import { CartItem } from "@/data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
	items: CartItem[];
}

// 🛒 Cargar el carrito desde localStorage si existe
const loadCartFromLocalStorage = (): CartItem[] => {
	if (typeof window !== "undefined") {
		const savedCart = localStorage.getItem("cart");
		return savedCart ? JSON.parse(savedCart) : [];
	}
	return [];
};

const initialState: CartState = { items: loadCartFromLocalStorage() };

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		setCart: (state, action: PayloadAction<CartItem[]>) => {
			state.items = action.payload;
			if (typeof window !== "undefined") {
				localStorage.setItem("cart", JSON.stringify(state.items));
			}
		},
		addToCart: (state, action: PayloadAction<CartItem>) => {
			const existingItem = state.items.find(
				(item) => item.id === action.payload.id
			);
			if (existingItem) {
				existingItem.quantity += action.payload.quantity;
			} else {
				state.items.push(action.payload);
			}

			if (typeof window !== "undefined") {
				localStorage.setItem("cart", JSON.stringify(state.items));
			}
		},
		removeFromCart: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter((item) => item.id !== action.payload);
			if (typeof window !== "undefined") {
				localStorage.setItem("cart", JSON.stringify(state.items));
			}
		},
		updateQuantity: (
			state,
			action: PayloadAction<{ id: number; quantity: number }>
		) => {
			const item = state.items.find((item) => item.id === action.payload.id);
			if (item) {
				item.quantity = action.payload.quantity;
			}
			if (typeof window !== "undefined") {
				localStorage.setItem("cart", JSON.stringify(state.items)); // ✅ Guardar en localStorage
			}
		},
		clearCart: (state) => {
			state.items = [];
			if (typeof window !== "undefined") {
				localStorage.removeItem("cart");
			}
		},
	},
});

export const { setCart, addToCart, removeFromCart, clearCart, updateQuantity } =
	cartSlice.actions;
export default cartSlice.reducer;
