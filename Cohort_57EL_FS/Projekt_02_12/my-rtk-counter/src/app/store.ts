// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productsReducer from '../features/products/productsSlice';
import cartReducer from '../features/cart/cartSlice';
import apodReducer from '../features/apod/apodSlice';
import { weatherApi } from '../features/weather/types/weatherApi'; // Pfad anpassen: nicht in /types/
import { usersApi } from '../features/users/types/usersApi'; // RTK Query API für Users
import { setupListeners } from '@reduxjs/toolkit/query';

// → configureStore — einfacher Weg, den Store zu erstellen
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productsReducer,
    cart: cartReducer,
    apod: apodReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(weatherApi.middleware),
});

// Typen für useSelector und useDispatch
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
