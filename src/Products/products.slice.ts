import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Product {
  id: number;
  title: string;
  price: number;
}

const initialProducts: Product[] = [
  {
    id: 1,
    title: "Super Mario Bros",
    price: 60,
  },
  {
    id: 2,
    title: "Legend of Zelda",
    price: 60,
  },
  {
    id: 3,
    title: "Metroid",
    price: 60,
  },
];

const productsSlice = createSlice({
  name: "products",
  initialState: initialProducts,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      // ! not returning the new state
      // return [action.payload, ...state];

      // ! but mutating/updating the state
      state.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      return state.filter((product) => product.id !== action.payload);
    },
  },
});

export const { addProduct, removeProduct } = productsSlice.actions;

export const getProductsSelector = (state: RootState) => state.products;

export default productsSlice.reducer;
