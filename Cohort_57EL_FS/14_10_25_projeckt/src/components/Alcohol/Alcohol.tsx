import { useEffect, useState, type JSX } from "react";
import style from "./Alcohol.module.css";

export default function Alcohol(): JSX.Element {
  const [alcohol, setAlcohol] = useState<string>("Alcohol:");
  const [image, setImage] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  async function loadAlcohol(): Promise<void> {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
    const obj = await response.json();
    const { drinks } = obj;
    const { strDrink, strDrinkThumb, strInstructionsDE, strInstructions } = drinks[0];

    setAlcohol(`Alcohol: ${strDrink}`);
    setImage(strDrinkThumb);
    setInstructions(strInstructionsDE || strInstructions || "Keine Anleitung verfügbar.");
    setShowInstructions(false); // Reset beim Neuladen
  }
  useEffect(() => {
    loadAlcohol();
  }, []);

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>{alcohol}</h1>
      {image && <img src={image} alt={alcohol} className={style.image} />}
      <div className={style.buttonGroup}>
        <button onClick={loadAlcohol} className={style.btn}>
          Zufälligen Drink laden 🍹
        </button>
        <button onClick={() => setShowInstructions(!showInstructions)} className={style.btn}>
          Rezept anzeigen 📖
        </button>
      </div>
      {showInstructions && <p className={style.instructions}>{instructions}</p>}
    </div>
  );
}

