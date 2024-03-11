import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import validateProduct from "../fake.api";

export interface Product {
  id: number;
  title: string;
  price: number;
}

export enum ValidationState {
  FULFILLED,
  PENDING,
  REJECTED,
}

interface ProductsSliceState {
  products: Product[];
  validationState?: ValidationState;
  errorMessage?: string;
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

const initialState: ProductsSliceState = {
  products: initialProducts,
  validationState: undefined,
  errorMessage: undefined,
};

export const addProductAsync = createAsyncThunk(
  "products/addNewProduct", // rather important to use the same name as the slice / action creator
  async (initialProduct: Product) => {
    const product = await validateProduct(initialProduct);
    return product;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      // ! not returning the new state
      // return [action.payload, ...state];

      // ! but mutating/updating the state
      state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<number>) => ({
      ...state,
      products: state.products.filter(
        (product) => product.id !== action.payload
      ),
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(addProductAsync.fulfilled, (state, action) => ({
      ...state,
      validationState: ValidationState.FULFILLED,
      products: [...state.products, action.payload],
      errorMessage: undefined,
    }));
    builder.addCase(addProductAsync.rejected, (state, action) => ({
      ...state,
      validationState: ValidationState.REJECTED,
      errorMessage: action.error.message,
    }));
    builder.addCase(addProductAsync.pending, (state, action) => ({
      ...state,
      validationState: ValidationState.PENDING,
      errorMessage: undefined,
    }));
  },
});

export const { addProduct, removeProduct } = productsSlice.actions;

export const getProductsSelector = (state: RootState) =>
  state.products.products;
export const getErrorMessage = (state: RootState) =>
  state.products.errorMessage;

export default productsSlice.reducer;
