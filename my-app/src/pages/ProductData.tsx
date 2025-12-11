import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import './ProductData.css'
import { CircularProgress } from '@mui/material'
import { fetchProductById } from '../shared/api'

  interface ProductDetails {
  id: number
  title: string
  description: string
  price: number
  image: string
}

export function ProductData() {
  const { id } = useParams()

  const { data, isLoading, isError, error } = useQuery<ProductDetails, Error>({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  })



  return (
  <div className="product_data">
    {isLoading && 
      <div className="product_data_spinner">
        <CircularProgress size={32} />
      </div>
    }
    {isError && 
      <div className="product_data_error">Error: {error.message}</div>
    }
    <div className="product_data">
      <h2>{data?.title}</h2>
      <img src={data?.image} alt={data?.title} className="product_data_image" />
      <p className="product_data_description">{data?.description}</p>
      <p className="product_data_price">${data?.price}</p>
    </div>
  </div>
  )
}
