import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "@my-app/i18n";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { I18nProvider } from "@my-app/i18n";




createRoot(document.getElementById('root')!).render(
  <StrictMode>      
    <BrowserRouter>
      <I18nProvider>
        <App />
      </I18nProvider>      
    </BrowserRouter>
  </StrictMode>,
)
