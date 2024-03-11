import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Product {
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
      return [action.payload, ...state];
    },
  },
});

export const { addProduct } = productsSlice.actions;

export const getProductsSelector = (state: RootState) => state.products;

export default productsSlice.reducer;
