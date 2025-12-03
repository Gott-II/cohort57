import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import sandwichReducer from '../features/sandwich/sandwichSlice';
import usersReducer from '../features/users/usersSlice'; // импортируем наш usersSlice
import productsReducer from "../features/products/productsSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    counter: counterReducer,
    sandwich: sandwichReducer,
    users: usersReducer, // добавляем редьюсер пользователей
  },
});

// Типы для использования в хуках
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// → отправляет "users/fetchUsers/rejected"
