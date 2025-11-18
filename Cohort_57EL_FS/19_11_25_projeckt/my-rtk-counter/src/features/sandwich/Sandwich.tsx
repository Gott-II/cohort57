import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addBread, addSausage, addCheese, addSalad,
  removeLast, resetSandwich
} from "./sandwichSlice";
import React from "react";

export const Sandwich = () => {
  const sandwichStack = useAppSelector((state) => state.sandwich.sandwichStack);
  const dispatch = useAppDispatch();

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1 style={{ fontSize: "2rem" }}>🥪 Sandwich-Baukasten</h1>

      {/* Stapelanzeige */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
        fontSize: "2rem",
      }}>
        {sandwichStack.length === 0 ? (
          <p style={{ fontSize: "1.2rem", color: "#777" }}>Noch keine Zutaten gewählt</p>
        ) : (
          sandwichStack.map((layer, index) => (
            <div key={index} style={{
              margin: "5px 0",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#fff",
              width: "80px",
              textAlign: "center",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
            }}>
              {layer}
            </div>
          ))
        )}
      </div>

      {/* Buttons */}
      <div style={{ marginTop: "30px", display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
        <button onClick={() => dispatch(addBread())}>+ 🍞</button>
        <button onClick={() => dispatch(addSausage())}>+ 🌭</button>
        <button onClick={() => dispatch(addCheese())}>+ 🧀</button>
        <button onClick={() => dispatch(addSalad())}>+ 🥬</button>
      </div>

      {/* Entfernen & Reset */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "center" }}>
        <button onClick={() => dispatch(removeLast())}>⬅️ Letzte entfernen</button>
        <button onClick={() => dispatch(resetSandwich())}>🔄 Essen</button>
      </div>
    </div>
  );
};



