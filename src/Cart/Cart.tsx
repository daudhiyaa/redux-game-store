import { useAppDispatch, useAppSelector } from "../store.hooks";
import {
  getCartSelector,
  getTotalPriceSelector,
  removeFromCart,
} from "./cart.slice";

const Cart = () => {
  const cartProducts = useAppSelector(getCartSelector);
  const totalPrice = useAppSelector(getTotalPriceSelector);

  const dispatch = useAppDispatch();

  // * DISPATCH REMOVE FROM CART HERE
  const removeFromCartHandler = (id: number) => dispatch(removeFromCart(id));

  return (
    <>
      <h2>Cart</h2>
      <h5>Total Price is {totalPrice}</h5>
      {cartProducts.map((product) => (
        <div key={product.id}>
          <span>
            {product.title} : ${product.price} x {product.amount}
          </span>
          <button onClick={() => removeFromCartHandler(product.id)}>
            Remove from Cart
          </button>
        </div>
      ))}
    </>
  );
};

export default Cart;
