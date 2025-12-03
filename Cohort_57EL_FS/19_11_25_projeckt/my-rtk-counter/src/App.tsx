// src/App.tsx
import type { JSX } from 'react';
import './App.css';
import { Counter } from './features/counter/Counter';
import { Sandwich } from './features/sandwich/Sandwich';
import UsersList from './features/users/usersList';
import ProductsList from './features/products/ProductsList';

function App(): JSX.Element {
  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Meine Demo-App</h1>
      
      {/* Counter anzeigen */}
      <Counter />

      {/* Sandwich anzeigen */}
      <Sandwich />

      {/* Users anzeigen */}
      <UsersList />

      {/* Products anzeigen */}
      <ProductsList />
    </div>
  );
}

export default App;



