import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import './ProductData.css'

interface Product {
  id: number
  title: string
  description: string
  price: number
  image: string
}

const fetchProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`)
  if (!res.ok) {
    throw new Error('Failed to fetch product details')
  }
  return res.json()
}

function ProductData() {
  const { id } = useParams()

  const { data, isLoading, isError, error } = useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  })

  if (isLoading) {
    return <div className="product_detail">Loading product...</div>
  }

  if (isError) {
    return <div className="product_detail_error">Error: {error.message}</div>
  }

  return (
    <div className="product_detail">
      <h2>{data?.title}</h2>
      <img src={data?.image} alt={data?.title} className="product_detail_image" />
      <p className="product_detail_description">{data?.description}</p>
      <p className="product_detail_price">${data?.price}</p>
    </div>
  )
}

export default ProductData
