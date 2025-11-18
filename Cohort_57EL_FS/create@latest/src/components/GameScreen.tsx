import { useState } from 'react';
import { createDeck, shuffleDeck } from '../utils/deck';
import { type Card } from '../utils/types';

type Props = {
  onEnd: (result: [number, number]) => void;
};

export function GameScreen({ onEnd }: Props) {
  const [deck, setDeck] = useState<Card[]>(shuffleDeck(createDeck()));
  const [playerCard, setPlayerCard] = useState<Card | null>(null);
  const [computerCard, setComputerCard] = useState<Card | null>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [rounds, setRounds] = useState(0);

  const drawCards = () => {
    const newDeck = [...deck];
    const player = newDeck.pop()!;
    const computer = newDeck.pop()!;
    setPlayerCard(player);
    setComputerCard(computer);
    setDeck(newDeck);
    setRounds(rounds + 1);

    if (player.index > computer.index) setPlayerScore(playerScore + 1);
    else if (player.index < computer.index) setComputerScore(computerScore + 1);

    if (rounds + 1 === 5) {
      setTimeout(() => onEnd([playerScore, computerScore]), 1000);
    }
  };

  return (
    <>
      <h2 className="mb-3">Runde {rounds + 1} von 5</h2>
      <div className="row mb-4">
        <div className="col">
          <h5>Spieler</h5>
          <div className="card-display">{playerCard ? `${playerCard.suit} ${playerCard.rank}` : '—'}</div>
        </div>
        <div className="col">
          <h5>Computer</h5>
          <div className="card-display">{computerCard ? `${computerCard.suit} ${computerCard.rank}` : '—'}</div>
        </div>
      </div>
      <button className="btn btn-success w-100" onClick={drawCards} disabled={rounds >= 5}>
        Karte ziehen
      </button>
    </>
  );
}

