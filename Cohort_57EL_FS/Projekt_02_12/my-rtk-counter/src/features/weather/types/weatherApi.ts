import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { WeatherResponse } from './types';

const apiKey = '3603bb385cba1812ea388450e7b58c94';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/data/2.5/',
  }),
  endpoints: (builder) => ({
    getWeather: builder.query<WeatherResponse, string>({
      query: (city) => `weather?q=${city}&appid=${apiKey}&units=metric`,
    }),
  }),
});
export const { useGetWeatherQuery } = weatherApi;

