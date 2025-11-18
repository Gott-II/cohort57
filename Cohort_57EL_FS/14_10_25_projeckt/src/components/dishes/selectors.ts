import type {RootState} from '../../store';
import type Dish from './types/Dish';

const selectDishes = (state: RootState): Dish[] => state.dishes;
export default selectDishes;