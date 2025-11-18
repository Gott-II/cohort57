export type Page = 'start' | 'game' | 'end';
export type Card = {
  suit: string;
  rank: string;
  isRed: boolean;
  index: number;
};
export type GameScore = [number, number, 'WIN' | 'LOSE' | 'DRAW'];
export type TotalScores = [number, number];

