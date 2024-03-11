import "./App.css";

import { Provider } from "react-redux";

import ProductForm from "./Products/ProductForm";
import ProductList from "./Products/ProductsList";
import Cart from "./Cart/Cart";

import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ProductList />
        <ProductForm />
        <Cart />
      </div>
    </Provider>
  );
}

export default App;
