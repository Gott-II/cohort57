import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AuthState from './types/AuthState'
import Credentials from './types/Credentials'
import * as api from './api'

const initialState: AuthState = {
	user: undefined,
}
export const login = createAsyncThunk('auth/login', ({ username, password }: Credentials) =>
	api.login(username, password)
)
// 1. export const login =
// Это объявление константы login с ключевым словом export, которое делает её доступной для импорта в других файлах.
// 2. createAsyncThunk('auth/login', ...)
// Функция createAsyncThunk используется в Redux Toolkit для создания асинхронных экшенов (thunk-ов).
//  Она автоматически управляет тремя состояниями запроса:
// * pending (ожидание выполнения)
// * fulfilled (успешное выполнение)
// * rejected (ошибка)
// Здесь 'auth/login' — это имя (action type), по которому будет идентифицироваться этот thunk.
// 3. ({ username, password }: Credentials) => api.login(username, password)
// Это стрелочная функция, которая принимает объект с username и password в качестве аргумента.
// Разбор:
// * ({ username, password }: Credentials) — это деструктуризация объекта,
//  который должен соответствовать типу Credentials.
// * api.login(username, password) — вызов метода login из объекта api, который,
//  выполняет HTTP-запрос к серверу для аутентификации пользователя.

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(login.fulfilled, (state, action) => {
				if ('message' in action.payload) {
					state.error = action.payload.message
				} else {
					state.user = action.payload
					state.error = ''
				}
				// в случае успешного входа уберем ошибку - если она была
			})
			.addCase(login.rejected, (state, action) => {
				state.error = 'Wrong email or password' // случай неудачного входа - добавили ошибку
			})
	},
})
export default authSlice.reducer
