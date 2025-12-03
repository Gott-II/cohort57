import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductsState {
  list: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      if (!res.ok) {
        return rejectWithValue("Serverfehler: " + res.status);
      }
      return await res.json();
    } catch (err) {
      return rejectWithValue("Netzwerkfehler: " + (err as Error).message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // ✅ Action zum Entfernen eines Produkts
    removeProduct: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((p) => p.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unbekannter Fehler";
      });
  },
});

// ✅ Action exportieren
export const { removeProduct } = productsSlice.actions;

// Selektoren
export const selectProducts = (state: RootState) => state.products.list;
export const selectLoading = (state: RootState) => state.products.loading;
export const selectError = (state: RootState) => state.products.error;

export default productsSlice.reducer;


