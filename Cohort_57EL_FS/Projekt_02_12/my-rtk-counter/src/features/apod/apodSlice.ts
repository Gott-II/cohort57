import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ApodItem } from "./apodTypes";

const API_KEY = "uCABTgoVXNxPZoUztGICazW3JNxYLjesyFKrSGVU";

export const fetchRandomApod = createAsyncThunk<
  ApodItem[],
  void
>("apod/fetchRandomApod", async () => {
  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=3`
  );
  return await response.json();
});

interface ApodState {
  items: ApodItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ApodState = {
  items: [],
  loading: false,
  error: null,
};

const apodSlice = createSlice({
  name: "apod",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomApod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRandomApod.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRandomApod.rejected, (state) => {
        state.loading = false;
        state.error = "Ошибка загрузки данных APOD";
      });
  },
});

export default apodSlice.reducer;
