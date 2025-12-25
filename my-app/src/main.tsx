import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import './i18n/i18n.ts';
import 'primereact/resources/themes/lara-light-blue/theme.css';  
import 'primereact/resources/primereact.min.css';                 
import 'primeicons/primeicons.css';     
import { I18nProvider } from "./providers/I18nProvider";




createRoot(document.getElementById('root')!).render(
  <StrictMode>      
    <BrowserRouter>
      <I18nProvider>
        <App />
      </I18nProvider>      
    </BrowserRouter>
  </StrictMode>,
)
