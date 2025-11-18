import { useEffect, useState, type JSX } from "react";

export default function Dog(): JSX.Element {
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(res => res.json())
      .then(data => setImage(data.message));
  }, []);

  return (
    <div>
      <h1>Random Dog 🐶</h1>
      {image && <img src={image} alt="A random dog" />}
    </div>
  );
}
