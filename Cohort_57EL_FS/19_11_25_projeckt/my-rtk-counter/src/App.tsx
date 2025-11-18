
import type { JSX } from 'react';
import './App.css';
import { Counter } from './features/counter/Counter';
import { Sandwich } from './features/sandwich/Sandwich';

function App(): JSX.Element {
  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Meine Demo-App</h1>
      
      {/* Counter anzeigen */}
      <Counter />

      {/* Sandwich anzeigen */}
      <Sandwich />
    </div>
  );
}

export default App;

