import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Home } from './pages/Home'

import "./styles/components/Footer.css"
import "./styles/components/Header.css"
import "./styles/pages/Home.css"
import "./styles/pages/Dashboard.css"
import "./styles/pages/Login.css"
import "./styles/pages/NotFound.css"
import "./styles/pages/Register.css"
import { Login } from './pages/Login'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
  </StrictMode>,
)
