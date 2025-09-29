// redux/slices/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/interfaces";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      console.log("Adding to cart:", action.payload);

      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        console.log("Updated existing item quantity:", existingItem);
      } else {
        state.items.push({
          ...action.payload,
          _id: action.payload._id || action.payload.id, // ensure MongoDB _id is stored
          id: action.payload.id || action.payload._id || "", // keep compatibility for UI
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      console.log("🗑 Removing from cart:", action.payload);
      state.items = state.items.filter((item) => item._id !== action.payload);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((i) => i._id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        console.log("Updated quantity:", item);
      }
    },

    clearCart: (state) => {
      console.log("Clearing cart");
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;