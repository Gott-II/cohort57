// src/features/exchangeRate/exchangeRateApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const exchangeRateApi = createApi({
  reducerPath: 'exchangeRateApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.exchangerate.host/' }),
  endpoints: (builder) => ({
    getRates: builder.query<{ rates: Record<string, number> }, string>({
      query: (baseCurrency) => `latest?base=${baseCurrency}`,
      // nur das letzte Ergebnis persistieren
      transformResponse: (response: any) => ({
        rates: response.rates,
      }),
    }),
  }),
});

export const { useGetRatesQuery } = exchangeRateApi;

