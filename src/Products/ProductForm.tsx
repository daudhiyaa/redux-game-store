import { useState } from "react";

import { Product, addProduct } from "./products.slice";
import { useAppDispatch } from "../store.hooks";

const ProductForm = () => {
  const dispatch = useAppDispatch();

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
    dispatch(addProduct(product));
  };

  return (
    <>
      <h2>Add Game to The Store</h2>
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
        <button type="submit">Add Price</button>
      </form>
    </>
  );
};

export default ProductForm;
