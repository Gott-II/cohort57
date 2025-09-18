import { useEffect, useState } from 'react';
import './App.css';

interface GenderResponse {
  name: string;
  gender: string | null;
  country: string;
  probability: number;
  remaining_credits: number;
}

function App() {
  const [name, setName] = useState<string>('');
  const [data, setData] = useState<GenderResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGenderData = async (name: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.genderize.io?name=${name}`);
      if (!response.ok) {
        throw new Error('Netzwerkantwort war nicht OK');
      }
      const result: GenderResponse = await response.json();
      setData(result);
    } catch (err) {
      console.error('Fehler beim Abrufen der Daten:', err);
      setError('Daten konnten nicht geladen werden.');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!name.trim()) {
      setData(null);
      setError(null);
      return;
    }

    const timeout = setTimeout(() => {
      fetchGenderData(name);
    }, 700);

    return () => clearTimeout(timeout);
  }, [name]);

  const handleClickCheck = async () => {
    if (name.trim() === '') {
      setData(null);
      return;
    }
    setError(null);
    await fetchGenderData(name);
  };

  return (
    <div className="container">
      <h2>🔍 Gender anhand des Namens bestimmen</h2>
      <input
        className="form-control"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Geben Sie einen Namen ein"
      />
      <button onClick={handleClickCheck} disabled={name.trim() === '' || loading}>
        {loading ? <div className="loader"></div> : 'Check'}
      </button>
      {error && <p className="error">{error}</p>}

      {data && (
        <div className="result">
          <h3>📊 Ergebnis</h3>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Gender:</strong> {data.gender ?? 'Unbekannt'}</p>
          <p><strong>Land:</strong> {data.country || 'Nicht angegeben'}</p>
          <p><strong>Wahrscheinlichkeit:</strong> {data.probability}</p>
          <p><strong>Verbleibende Credits:</strong> {data.remaining_credits}</p>
        </div>
      )}
    </div>
  );
}

export default App;

