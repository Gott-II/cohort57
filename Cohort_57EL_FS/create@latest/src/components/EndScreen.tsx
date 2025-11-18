import {type GameScore, type TotalScores } from '../utils/types';

type Props = {
  name: string;
  score: GameScore;
  total: TotalScores;
  onRestart: () => void;
};

export function EndScreen({ name, score, total, onRestart }: Props) {
  return (
    <>
      <h2 className="mb-3">Spiel beendet</h2>
      <p>{name}: <strong>{score[0]}</strong> Punkte</p>
      <p>Computer: <strong>{score[1]}</strong> Punkte</p>
      <h4 className="my-3">Ergebnis: {score[2]}</h4>
      <hr />
      <p>Gesamtstand:</p>
      <p>{name}: {total[0]} | Computer: {total[1]}</p>
      <button className="btn btn-warning w-100 mt-3" onClick={onRestart}>
        Neu starten
      </button>
    </>
  );
}

