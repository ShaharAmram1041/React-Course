// I chose FakeStoreAPI. 
// List: /products. 
// Detail: /products/:title.

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Routes, Route } from "react-router-dom";
import { Home, ProductData } from "./pages";
import { SidebarProvider } from "./providers/SidebarProvider";
import { Header, Sidebar, ToastHost } from './components';



const queryClient = new QueryClient()

function App() {    

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
