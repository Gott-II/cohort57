// src/App.tsx
import { useState, type JSX } from 'react';
import './App.css';
import { Counter } from './features/counter/Counter';
import UsersList from './features/users/UsersList'; // benannter Import
import Products from './features/products/Products';
import Cart from './features/cart/Cart';
import CartIcon from './features/CartIcon/CartIcon';
import Weather from './features/weather/Weather';
import ApodRandom from './features/apod/ApodRandom';
import ExchangeRates from "./features/exchangeRate/exchangeRate";
import BitcoinPrice from './features/crypto/BitcoinPrice';

function App(): JSX.Element {
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <main>
        <Products />
        <CartIcon onClick={() => setShowCart((prev) => !prev)} />
        {showCart && <Cart />}
      </main>

       <aside>
        <Counter />
        <UsersList />
        <Weather />
        <ExchangeRates />
        <BitcoinPrice />
      </aside>

      <section>
        <h1>NASA APOD — 3 random images</h1>
        <ApodRandom />
      </section>
    </>
  );
}

export default App;
