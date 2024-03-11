import { useSelector } from "react-redux";
import { getProductsSelector, removeProduct } from "./products.slice";
import { useAppDispatch } from "../store.hooks";

const ProductList = () => {
  const products = useSelector(getProductsSelector);
  const dispatch = useAppDispatch();

  const removeFromStore = (id: number) => dispatch(removeProduct(id));

  return (
    <div>
      <h2>Games List</h2>
      {products.map((product) => (
        <div key={product.id}>
          <span>
            {product.title} : ${product.price}
          </span>
          <button onClick={() => removeFromStore(product.id)}>
            Remove from the store
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
