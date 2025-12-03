// src/features/users/usersSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export interface User {
  id: number;
  email: string;
  username: string;
  name: {
    firstname: string;
    lastname: string;
  };
  phone: string;
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
}

interface UsersState {
  list: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  list: [],
  loading: false,
  error: null,
};

// Async Thunk mit Fehlerbehandlung
export const fetchUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: string }
>("users/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("https://fakestoreapi.com/users");

    if (!res.ok) {
      return rejectWithValue("Serverfehler: " + res.status);
    }

    return await res.json();
  } catch (err) {
    return rejectWithValue("Netzwerkfehler: " + (err as Error).message);
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null; // Fehler zurücksetzen
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unbekannter Fehler";
      });
  },
});

// Selektoren
export const selectUsers = (state: RootState) => state.users.list;
export const selectLoading = (state: RootState) => state.users.loading;
export const selectError = (state: RootState) => state.users.error;

export default usersSlice.reducer;




//const fetchUsers — создаём переменную, в которой будет храниться thunk-функция.
//fetchUsers — это имя асинхронного экшена, который мы будем диспатчить: dispatch(fetchUsers());
//createAsyncThunk — специальная функция из Redux Toolkit.
// Она автоматически создаёт:
// асинхронный thunk,
// 3 экшена:

// fetchUsers/pending

// fetchUsers/fulfilled

// fetchUsers/rejected

// <User[]> — это тип успешного результата, который вернётся из нашего запроса.

//Второй аргумент: строка-ключ (action type)
// "users/fetchUsers"
//Это строковый идентификатор API-запроса.

// "users" — имя слайса (рекомендуется)
// "fetchUsers" — название запрашиваемого действия
// В итоге Redux Toolkit автоматически создаёт 3 экшена:

// | Событие                   | Тип экшена                     |
// | ------------------------- | ------------------------------ |
// | запрос начался            | `"users/fetchUsers/pending"`   |
// | запрос завершился успешно | `"users/fetchUsers/fulfilled"` |
// | запрос упал в ошибку      | `"users/fetchUsers/rejected"`  |

//Это значит, что в extraReducers ты можешь писать:

// .addCase(fetchUsers.pending, ...)
// .addCase(fetchUsers.fulfilled, ...)
// .addCase(fetchUsers.rejected, ...)

// Что делает createAsyncThunk "под капотом"?
//Когда ты вызываешь:dispatch(fetchUsers());

// Redux Toolkit:

// отправляет экшен
// → "users/fetchUsers/pending"

// выполняет  async-функцию

// если она завершилась успешно:
// → отправляет "users/fetchUsers/fulfilled"

// если произошла ошибка:
// → отправляет "users/fetchUsers/rejected"
//Когда компонент монтируется:

// Происходит следующее:

// ✔ Событие 1:

// fetchUsers.pending
// → ставит loading = true

// ✔ Событие 2:

// Запрос идёт к API:
// https://fakestoreapi.com/users

// ✔ Событие 3 (если успешно):

// fetchUsers.fulfilled
// → кладёт пользователей в state.list
// → убирает loading

// ✔ Событие 4 (если ошибка):

// fetchUsers.rejected
// → loading = false
// → error = "Ошибка загрузки пользователей"

// Итоговое объяснение

// export const fetchUsers = createAsyncThunk<User[]>(
// создаёт асинхронный Redux-экшен, который:

// запускает fetch-запрос

// автоматически создаёт 3 состояния: pending / fulfilled / rejected

// вернёт массив пользователей как payload

// будет обработан в extraReducers
