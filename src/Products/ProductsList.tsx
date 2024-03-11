import { Product, getProductsSelector, removeProduct } from "./products.slice";
import { useAppDispatch, useAppSelector } from "../store.hooks";
import { addToCart } from "../Cart/cart.slice";

const ProductList = () => {
  const products = useAppSelector(getProductsSelector);
  const dispatch = useAppDispatch();

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
