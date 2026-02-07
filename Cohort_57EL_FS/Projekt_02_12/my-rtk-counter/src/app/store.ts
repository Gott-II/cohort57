// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import counterReducer from '../features/counter/counterSlice';
import productsReducer from '../features/products/productsSlice';
import cartReducer from '../features/cart/cartSlice';
import apodReducer from '../features/apod/apodSlice';
import { weatherApi } from '../features/weather/types/weatherApi';
import { usersApi } from '../features/users/types/usersApi';
import { exchangeRateApi } from '../features/exchangeRate/exchangeRateApi';
import exchangeRateReducer from '../features/exchangeRate/exchangeRateSlice';
import { cryptoApi } from '../features/crypto/cryptoApi';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['counter','exchangeRate','crypto', weatherApi.reducerPath, usersApi.reducerPath]

};

const rootReducer = combineReducers({
  counter: counterReducer,
  exchangeRate: exchangeRateReducer,
  products: productsReducer,
  cart: cartReducer,
  apod: apodReducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [weatherApi.reducerPath]: weatherApi.reducer,
  [exchangeRateApi.reducerPath]: exchangeRateApi.reducer,
  [cryptoApi.reducerPath]: cryptoApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(usersApi.middleware)
      .concat(weatherApi.middleware)
      .concat(exchangeRateApi.middleware)
      .concat(cryptoApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

