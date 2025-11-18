type Props = {
  name: string;
  setName: (name: string) => void;
  onStart: () => void;
};

export function StartScreen({ name, setName, onStart }: Props) {
  return (
    <>
      <h1 className="mb-4">🎴 Kartenspiel</h1>
      <input
        className="form-control mb-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Spielername"
      />
      <button className="btn btn-primary w-100" onClick={onStart}>
        Spiel starten
      </button>
    </>
  );
}

