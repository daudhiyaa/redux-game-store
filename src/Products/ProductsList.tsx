import { useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
}

const initialProducts = [
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

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  return (
    <div>
      <h2>Games List</h2>
      {products.map((product) => (
        <div key={product.id}>
          {product.title} : ${product.price}
        </div>
      ))}

      <button
        onClick={() =>
          setProducts((prevProducts) => [
            {
              id: 4,
              title: "New Game 1",
              price: 60,
            },
            ...prevProducts,
          ])
        }
      >
        Add Product
      </button>
    </div>
  );
};

export default ProductList;
