import { useState } from "react";

import {
  Product,
  addProduct,
  addProductAsync,
  getErrorMessage,
} from "./products.slice";

import { useAppDispatch, useAppSelector } from "../store.hooks";

const ProductForm = () => {
  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector(getErrorMessage);

  const [product, setProduct] = useState<Product>({
    id: 0,
    title: "",
    price: 0,
  });
  const { id, title, price } = product;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setProduct((prevValue) => {
      (prevValue as any)[e.target.name] = e.target.value;
      return { ...prevValue };
    });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // * DISPATCH ADD PRODUCT HERE
    // dispatch(addProduct(product));
    dispatch(addProductAsync(product));

    // reset the form
    setProduct({
      id: 0,
      title: "",
      price: 0,
    });
  };

  return (
    <>
      <h2>Add Game to The Store</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ID"
          name="id"
          value={id}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Game Title"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          value={price}
          onChange={handleChange}
        />
        <button type="submit">Add Product</button>
      </form>
    </>
  );
};

export default ProductForm;
