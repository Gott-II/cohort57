// store.ts
import { createStore, combineReducers } from "redux";
import dishesReducer from "./components/dishes/dishesReducer";
// ggf. weitere Reducer importieren

const rootReducer = combineReducers({
  dishes: dishesReducer,
  // counter: counterReducer,
  // tasks: tasksReducer,
  // sandwich: sandwichReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;
export default store;

