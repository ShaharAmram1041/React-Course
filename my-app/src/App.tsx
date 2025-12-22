// I chose FakeStoreAPI. 
// List: /products. 
// Detail: /products/:title.

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Routes, Route } from "react-router-dom";
import { Home, ProductData } from "./pages";
import { SidebarProvider } from "./providers/SidebarProvider";
import { Header, Sidebar, ToastHost } from './components';
import { useEffect } from "react";
import { useTranslation } from "react-i18next";



const queryClient = new QueryClient()

function App() {
  const { i18n } = useTranslation();

  // Set direction based on language
  useEffect(() => {
    const html = document.documentElement;

    if (i18n.language === 'he') {
      html.setAttribute('dir', 'rtl');
      html.setAttribute('lang', 'he');
    } else {
      html.setAttribute('dir', 'ltr');
      html.setAttribute('lang', 'en');
    }
  }, [i18n.language]);

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <Header />
        <Sidebar />
          <ToastHost />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductData />} />
        </Routes>
      </SidebarProvider>
      </QueryClientProvider>
  )
}

export default App
