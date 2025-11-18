import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { decrement, increment, incrementByAmount, reset } from "./counterSlice";
import React from "react";

const tileStyle: React.CSSProperties = {
  padding: "20px 30px",
  fontSize: "1.2rem",
  backgroundColor: "#2196F3",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

export const Counter = () => {
  const value = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  // Hover-Effekt inline
  const hoverEffect = (e: React.MouseEvent<HTMLButtonElement>, up: boolean) => {
    e.currentTarget.style.transform = up ? "translateY(-5px)" : "translateY(0)";
    e.currentTarget.style.boxShadow = up
      ? "0 8px 12px rgba(0,0,0,0.3)"
      : "0 4px 6px rgba(0,0,0,0.2)";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1 style={{ fontSize: "2.5rem", color: "#333" }}>Counter: {value}</h1>

      {/* Erste Reihe: +1 / -1 */}
      <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "20px" }}>
        <button
          style={{ ...tileStyle, backgroundColor: "#4CAF50" }}
          onClick={() => dispatch(increment())}
          onMouseEnter={(e) => hoverEffect(e, true)}
          onMouseLeave={(e) => hoverEffect(e, false)}
        >
          +1
        </button>
        <button
          style={{ ...tileStyle, backgroundColor: "#f44336" }}
          onClick={() => dispatch(decrement())}
          onMouseEnter={(e) => hoverEffect(e, true)}
          onMouseLeave={(e) => hoverEffect(e, false)}
        >
          -1
        </button>
      </div>

      {/* Zweite Reihe: +100 / -100 */}
      <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "20px" }}>
        <button
          style={{ ...tileStyle, backgroundColor: "#2196F3" }}
          onClick={() => dispatch(incrementByAmount(100))}
          onMouseEnter={(e) => hoverEffect(e, true)}
          onMouseLeave={(e) => hoverEffect(e, false)}
        >
          +100
        </button>
        <button
          style={{ ...tileStyle, backgroundColor: "#FF9800" }}
          onClick={() => dispatch(incrementByAmount(-100))}
          onMouseEnter={(e) => hoverEffect(e, true)}
          onMouseLeave={(e) => hoverEffect(e, false)}
        >
          -100
        </button>
      </div>

      {/* Reset-Button */}
      <div style={{ marginTop: "30px" }}>
        <button
          style={{ ...tileStyle, backgroundColor: "#9C27B0" }}
          onClick={() => dispatch(reset())}
          onMouseEnter={(e) => hoverEffect(e, true)}
          onMouseLeave={(e) => hoverEffect(e, false)}
        >
          Reset auf 0
        </button>
      </div>
    </div>
  );
};


