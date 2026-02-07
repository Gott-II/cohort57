import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coingecko.com/api/v3/' }),
  endpoints: (builder) => ({
    getBitcoinPrice: builder.query<
      { bitcoin: { eur: number } },
      void
    >({
      query: () => 'simple/price?ids=bitcoin&vs_currencies=eur',
    }),
  }),
});

export const { useGetBitcoinPriceQuery } = cryptoApi;

