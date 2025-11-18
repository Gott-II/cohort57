import { useEffect, useState, type JSX } from "react";
import style from "./Dog.module.css";

export default function Dog(): JSX.Element {
  const [title, setTitle] = useState<string>("Random Dog 🐶");
  const [image, setImage] = useState<string>("");
  const [showBreed, setShowBreed] = useState<boolean>(false);
  const [breed, setBreed] = useState<string>("");

  async function loadDog(): Promise<void> {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const obj = await response.json();
    const { message } = obj;

    setImage(message);
    const extractedBreed = extractBreedFromUrl(message);
    setBreed(extractedBreed);
    setTitle(`Breed: ${capitalizeBreed(extractedBreed)}`);
    setShowBreed(false); // Reset beim Neuladen
  }

  function extractBreedFromUrl(url: string): string {
    const parts = url.split("/");
    const breedIndex = parts.findIndex(part => part === "breeds");
    return breedIndex !== -1 && parts[breedIndex + 1]
      ? parts[breedIndex + 1].replace("-", " ")
      : "Unknown";
  }

  function capitalizeBreed(breed: string): string {
    return breed
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  useEffect(() => {
    loadDog();
  }, []);

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>{title}</h1>
      {image && <img src={image} alt={breed} className={style.image} />}
      <div className={style.buttonGroup}>
        <button onClick={loadDog} className={style.btn}>
          Neuen Hund laden 🐾
        </button>
        <button onClick={() => setShowBreed(!showBreed)} className={style.btn}>
          Rasse anzeigen 📋
        </button>
      </div>
      {showBreed && <p className={style.instructions}>Rasse: {capitalizeBreed(breed)}</p>}
    </div>
  );
}

