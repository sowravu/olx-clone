import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthProvider from './components/context/Auth.tsx'
import { ItemsContextProvider } from './components/context/Item.tsx'

import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(

  <BrowserRouter>
  <ItemsContextProvider>


  <AuthProvider>
  <StrictMode>
    <App />
  </StrictMode>,
  </AuthProvider>


  </ItemsContextProvider>
  </BrowserRouter>

)
