import { useSelector } from "react-redux";

import {
  Product,
  removeProduct,
  selectAllProducts,
  selectProductById,
  selectProductEntities,
  selectProductIds,
  selectTotalProducts,
} from "./products.slice";

import { useAppDispatch } from "../store.hooks";
import { addToCart } from "../Cart/cart.slice";
import { RootState } from "../store";

const ProductList = () => {
  const products = useSelector(selectAllProducts);
  const dispatch = useAppDispatch();

  // * ========== Testing of Entity Adapter =============
  const product1 = useSelector<RootState>((state) =>
    selectProductById(state, 1)
  );
  const totalNumberOfProducts = useSelector(selectTotalProducts);
  const productIds = useSelector(selectProductIds);
  const entities = useSelector(selectProductEntities);
  console.log(
    product1,
    totalNumberOfProducts,
    productIds,
    entities,
    entities[1]
  );
  // * ==================================================

  // * DISPATCH ADD TO CART HERE
  const addToCartHandler = (product: Product) => dispatch(addToCart(product));
  // * DISPATCH REMOVE PRODUCT HERE
  const removeProductHandler = (id: number) => dispatch(removeProduct(id));

  return (
    <div>
      <h2>Games List</h2>
      {products.map((product) => (
        <div key={product.id}>
          <span>
            {product.title} : ${product.price}
          </span>
          <button onClick={() => addToCartHandler(product)}>Add to Cart</button>
          <button onClick={() => removeProductHandler(product.id)}>
            Remove Product
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
