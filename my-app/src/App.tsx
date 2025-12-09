// I chose FakeStoreAPI. 
// List: /products. 
// Detail: /products/:title.

import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import ProductData from './pages/ProductData';



const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductData />} />

      </Routes>

      </QueryClientProvider>
  )
}

export default App
