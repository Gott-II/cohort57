import { useEffect, useState, type JSX } from "react";

export default function Playground(): JSX.Element {
  const [numberOfDogs, setNumberOfDogs] = useState<number>(0);
  const [numberOfBirds, setNumberOfBirds] = useState<number>(10);

  function handleAddDog(): void {
    setNumberOfDogs(numberOfDogs + 1);
  }

  function handleAddBird(): void {
    setNumberOfBirds(numberOfBirds + 10);
  }

  // Runs once when the component mounts
  useEffect(() => {
    console.log("Компонент смонтирован 1 === mount");
  }, []);

  // Runs when numberOfDogs changes
  useEffect(() => {
    console.log("numberOfDogs изменился: 2 bei mount und update");
  }, [numberOfDogs]);

  // Runs when numberOfBirds changes
  useEffect(() => {
    console.log("numberOfBirds изменился: 3", numberOfBirds);
  }, [numberOfBirds]);

  return (
    <div>
      <h1>Playground</h1>
      <p>Number of dogs: {numberOfDogs}</p>
      <p>Number of birds: {numberOfBirds}</p>
      <button type="button" onClick={handleAddDog}>Let the dog in</button>
      <button type="button" onClick={handleAddBird}>New bird</button>
    </div>
  );
}
