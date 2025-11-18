import type Dish from './Dish';
import type {DishId} from './Dish';
import type {DishDto} from './DishDto';

export type Action =
  | { type: 'dishes/create'; payload: DishDto }
  | { type: 'dishes/edit'; payload: Dish }
  | { type: 'dishes/delete'; payload: DishId };