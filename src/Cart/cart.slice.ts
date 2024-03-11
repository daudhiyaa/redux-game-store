import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../Products/products.slice";
import { RootState } from "../store";

interface CartProduct extends Product {
  amount: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: [] as CartProduct[],
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = state.find((p) => p.id === action.payload.id);
      if (product) {
        product.amount++;
      } else {
        state.push({ ...action.payload, amount: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const product = state.find((p) => p.id === action.payload);
      if (product) {
        if (product.amount === 1) {
          return state.filter((p) => p.id !== action.payload);
        }
        product.amount--;
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const getCartSelector = (state: RootState) => state.cart;
export const getTotalPriceSelector = (state: RootState) =>
  state.cart.reduce((total, next) => (total += next.price * next.amount), 0);

export default cartSlice.reducer;
