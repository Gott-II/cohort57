// src/features/exchangeRate/exchangeRateSlice.ts
import { createSlice,type PayloadAction } from '@reduxjs/toolkit';

interface ExchangeRateState {
  lastRates: Record<string, number> | null;
}

const initialState: ExchangeRateState = {
  lastRates: null,
};

const exchangeRateSlice = createSlice({
  name: 'exchangeRate',
  initialState,
  reducers: {
    setLastRates: (state, action: PayloadAction<Record<string, number>>) => {
      state.lastRates = action.payload;
    },
  },
});

export const { setLastRates } = exchangeRateSlice.actions;
export default exchangeRateSlice.reducer;
