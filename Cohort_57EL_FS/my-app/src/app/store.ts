import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { combineSlices, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { counterSlice } from '../features/counter/counterSlice'
import { quotesApiSlice } from '../features/quotes/quotesApiSlice'
import { productsSlice } from '../features/products/productsSlice'
import { authSlice } from '../features/auth/authSlice'
import { postsSlice } from '../features/posts/postsSlice'
// Beispiel: weitere API-Slices
import { productsApiSlice } from '../features/products/productsApiSlice'
import { usersApiSlice } from '../features/users/usersApiSlice'

// Root Reducer automatisch aus allen Slices
const rootReducer = combineSlices(
  counterSlice,
  quotesApiSlice,
  productsSlice,
  authSlice,
  postsSlice,
  productsApiSlice,
  usersApiSlice
)

// Typ für den State
export type RootState = ReturnType<typeof rootReducer>

// Store Factory
export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        quotesApiSlice.middleware,
        productsApiSlice.middleware,
        usersApiSlice.middleware
      ),
    preloadedState,
  })

  setupListeners(store.dispatch)
  return store
}

// Standard-Store
export const store = makeStore()

// Typen
export type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
