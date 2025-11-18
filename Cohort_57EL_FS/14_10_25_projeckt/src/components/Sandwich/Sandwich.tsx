import React, { useState } from "react";
import style from "./Sandwich.module.css";
import { useTheme } from "../themeContext/useTheme";

export default function Sandwich(): React.JSX.Element {
  const [sandwich, setSandwich] = useState<string>("Sandwich:");
  const { theme, toggleTheme } = useTheme();

  function addIngredient(ingredient: string): void {
    setSandwich(`${sandwich} ${ingredient}`);
  }

  function resetSandwich(): void {
    setSandwich("Sandwich:");
  }

  return (
    <div className={`${style.wrapper} ${theme === "dark" ? style.dark : style.light}`}>
      <h1 className={style.title}>Sandwich-Baukasten 🥪</h1>
      <p className={style.output}>{sandwich}</p>
      <div className={style.buttonGroup}>
        <button className={style.btn} onClick={() => addIngredient("Bread 🥖")}>Brot</button>
        <button className={style.btn} onClick={() => addIngredient("Cheese 🧀")}>Käse</button>
        <button className={style.btn} onClick={() => addIngredient("Salami 🔴")}>Salami</button>
        <button className={style.btn} onClick={() => addIngredient("Salat 🥬")}>Salat</button>
        <button className={style.btn} onClick={resetSandwich}>Aufessen</button>
      </div>
      <button className={style.themeBtn} onClick={toggleTheme}>
        Wechsel zu {theme === "light" ? "dunklem" : "hellem"} Modus
      </button>
    </div>
  );
}



