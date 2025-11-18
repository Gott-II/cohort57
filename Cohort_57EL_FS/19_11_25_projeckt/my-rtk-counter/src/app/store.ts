import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import sandwichReducer from '../features/sandwich/sandwichSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    sandwich: sandwichReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
