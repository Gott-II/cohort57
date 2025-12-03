// src/App.tsx
import { useState, type JSX } from "react";
import "./App.css";
import { Counter } from "./features/counter/Counter";
import  UsersList  from "./features/users/UsersList";  // benannter Import
import Products from "./features/products/Products";
import Cart from "./features/cart/Cart";
import CartIcon from "./features/CartIcon/CartIcon";
import Weather from "./features/weather/Weather";
import ApodRandom from "./features/apod/ApodRandom";

function App(): JSX.Element {
  const [showCart, setShowCart] = useState(false);

  return (
    <div>
      <Products />
      <CartIcon onClick={() => setShowCart((prev) => !prev)} />
      {showCart && <Cart />}
      <Counter />
      <UsersList />
      <Weather />
      <h1>NASA APOD — 3 random images</h1>
      <ApodRandom />
    </div>
  );
}

export default App;


