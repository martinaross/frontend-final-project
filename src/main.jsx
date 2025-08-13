import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RouterApp } from "./router/RouterApp";
import { UserProvider } from "./context/UserContext.jsx";

import "./styles/components/Footer.css";
import "./styles/components/Header.css";
import "./styles/pages/Home.css";
import "./styles/pages/Dashboard.css";
import "./styles/pages/Login.css";
import "./styles/pages/NotFound.css";
import "./styles/pages/Register.css";
import "./styles/pages/About.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <RouterApp />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
