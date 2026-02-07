// src/main.tsx oder src/index.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { persistor, store } from './app/store'
import "./i18n/i18n";
import { PersistGate } from 'redux-persist/integration/react'

window.addEventListener("storage", () => {
  persistor.persist(); // Принудительно активировать восстановление persisted state
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
