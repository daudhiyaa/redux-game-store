import { useSelector } from "react-redux";
import { getProductsSelector } from "./products.slice";

const ProductList = () => {
  const products = useSelector(getProductsSelector);

  return (
    <div>
      <h2>Games List</h2>
      {products.map((product) => (
        <div key={product.id}>
          {product.title} : ${product.price}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
