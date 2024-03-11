import {
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";

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

export const addProductAsync = createAsyncThunk(
  "products/addNewProduct", // rather important to use the same name as the slice / action creator
  async (initialProduct: Product) => {
    const product = await validateProduct(initialProduct);
    return product;
  }
);

const productAdapter = createEntityAdapter<Product>();
const initialState = productAdapter.getInitialState<ProductsSliceState>({
  validationState: undefined,
  errorMessage: undefined,
});

const filledInitialState = productAdapter.upsertMany(
  initialState,
  initialProducts
);

const productsSlice = createSlice({
  name: "products",
  initialState: filledInitialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      // ! not returning the new state
      // return [action.payload, ...state];

      // ! but mutating/updating the state
      // state.products.push(action.payload);

      // * use entity adapter to update the state
      productAdapter.upsertOne(state, action.payload);
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      productAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addProductAsync.fulfilled, (state, action) => {
      productAdapter.upsertOne(state, action.payload);
      state.validationState = ValidationState.FULFILLED;
      state.errorMessage = undefined;
    });
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
  state.products.entities;
export const getErrorMessage = (state: RootState) =>
  state.products.errorMessage;

export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectEntities: selectProductEntities,
  selectIds: selectProductIds,
  selectTotal: selectTotalProducts,
} = productAdapter.getSelectors<RootState>((state) => state.products);

export default productsSlice.reducer;
