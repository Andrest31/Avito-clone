import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthModalProvider } from "./context/AuthModalContext";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthModalProvider>
      <App />
    </AuthModalProvider>
  </StrictMode>,
)
