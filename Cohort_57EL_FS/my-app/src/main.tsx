import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './app/store'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import * as React from 'react'

const container = document.getElementById('root') as HTMLElement

if (container) {
  const root = createRoot(container)
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  )
} else {
  console.error("Root element with ID 'root' was not found in the document.")
}

