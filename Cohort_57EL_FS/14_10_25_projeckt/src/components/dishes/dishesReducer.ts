import type Dish from "./types/Dish";
import type {Action} from "./types/Action";
import { uid } from "uid";


const initialState: Dish[] = [
    {
    id: uid(),
    title: 'Pie',
    category: "Dessert",
    price: 0,
    image: 'https://fsd.multiurok.ru/html/2018/05/03/s_5aeb2280cc6d6/894065_15.jpeg',
    }
];

export default function dishesReducer(
    state: Dish[] = initialState,
    action: Action
): Dish[] {
    switch (action.type) {
        case 'dishes/create':
            return [...state, { id: uid(), ...action.payload }];
            case 'dishes/delete':
            return state.filter((dish) => dish.id !== action.payload);
        case 'dishes/edit':
            return state.map((dish) => 
                dish.id === action.payload.id ? action.payload : dish
            );
        default:
            return state;
    }
}  