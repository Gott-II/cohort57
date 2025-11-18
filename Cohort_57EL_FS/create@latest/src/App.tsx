import { useState } from 'react';
import { type Page, type GameScore, type TotalScores } from './utils/types';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { EndScreen } from './components/EndScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [page, setPage] = useState<Page>('start');
  const [name, setName] = useState<string>('Player');
  const [gameScore, setGameScore] = useState<GameScore>([0, 0, 'DRAW']);
  const [totalScores, setTotalScores] = useState<TotalScores>([0, 0]);

  const changeResults = (result: TotalScores) => {
    let res: 'WIN' | 'LOSE' | 'DRAW' = 'DRAW';
    if (result[0] > result[1]) res = 'WIN';
    if (result[0] < result[1]) res = 'LOSE';
    setGameScore([result[0], result[1], res]);
    if (res === 'WIN') setTotalScores([totalScores[0] + 1, totalScores[1]]);
    if (res === 'LOSE') setTotalScores([totalScores[0], totalScores[1] + 1]);
    setPage('end');
  };

  return (
    <div className="App">
      <div
        className="container bg-white p-4 rounded shadow text-center"
        style={{ maxWidth: '500px', width: '100%' }}
      >
        {page === 'start' && (
          <StartScreen
            name={name}
            setName={setName}
            onStart={() => setPage('game')}
          />
        )}
        {page === 'game' && <GameScreen onEnd={changeResults} />}
        {page === 'end' && (
          <EndScreen
            name={name}
            score={gameScore}
            total={totalScores}
            onRestart={() => setPage('start')}
          />
        )}
      </div>
    </div>
  );
}

export default App;
