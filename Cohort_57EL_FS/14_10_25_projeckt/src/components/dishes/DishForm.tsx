import { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { FormEvent } from 'react';
import type { JSX } from 'react';

export default function DishForm(): JSX.Element {
  const [category, setCategory] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  function validateInputs(): boolean {
    if (title.trim() === '') {
      setError('Der Name darf nicht leer sein');
      return false;
    }
    if (category.trim() === '') {
      setError('Bitte wähle eine Kategorie');
      return false;
    }
    if (image.trim() === '') {
      setError('Das Bildfeld darf nicht leer sein');
      return false;
    }
    if (price <= 0) {
      setError('Der Preis darf nicht negativ sein');
      return false;
    }
    return true;
  }

  function clearInputAndError(): void {
    setCategory('');
    setTitle('');
    setPrice(0);
    setImage('');
    setError(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (validateInputs()) {
      dispatch({
        type: 'dishes/create',
        payload: { title, category, price, image },
      });
      clearInputAndError();
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Menüeintrag erstellen 🍽️
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && <p className="text-red-600 font-semibold">{error}</p>}

        <input
          type="text"
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="Kategorie"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Kategorie wählen</option>
          <option value="Vorspeise">Vorspeise</option>
          <option value="Hauptgericht">Hauptgericht</option>
          <option value="Nachspeise">Nachspeise</option>
        </select>

        <input
          type="number"
          placeholder="Preis"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Bild-URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Gericht hinzufügen
        </button>
      </form>
    </div>
  );
}

