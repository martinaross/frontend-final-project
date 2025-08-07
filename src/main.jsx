import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterApp } from './router/RouterApp'

import "./styles/components/Footer.css"
import "./styles/components/Header.css"
import "./styles/pages/Home.css"
import "./styles/pages/Dashboard.css"
import "./styles/pages/Login.css"
import "./styles/pages/NotFound.css"
import "./styles/pages/Register.css"
import "./styles/pages/About.css"
import { Login } from './pages/Login'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterApp />
  </StrictMode>,
)
