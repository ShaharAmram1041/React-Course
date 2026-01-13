 
export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}
 
 // fetch the fake data
  export const fetchProducts = async (): Promise<Product[]> => {
    const res = await fetch('https://fakestoreapi.com/products')
    if (!res.ok) {
      throw new Error('Failed to fetch products')
    }
    return res.json()
  }



  export interface ProductDetails {
  id: number
  title: string
  description: string
  price: number
  image: string
}

  // fetch the fake data
export const fetchProductById = async (id: string): Promise<ProductDetails> => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`)
  if (!res.ok) {
    throw new Error('Failed to fetch product details')
  }
  return res.json()
}
