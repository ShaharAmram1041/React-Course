import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { CircularProgress } from '@mui/material'
import './Home.css'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../shared/api'

interface Product {
  id: number
  title: string
}


export function Home() {
  const [showList, setShowList] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetched,
  } = useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
    enabled: false,
  })

  // timer for the spinner
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(isLoading)
    }, 300)
    return () => clearTimeout(timer)
  }, [isLoading])


  const handleSearch = () => {
    setShowList(true)
    refetch()
  }

  return (
    <div className="home">
      <h1 className="home_title">Products</h1>

      <button className="search_button" onClick={handleSearch}>Search</button>

      {showSpinner && (
        <div className="home_spinner">
          <CircularProgress size={32} />
        </div>
      )}

      {isError && <p className="home_error">Error: {error.message}</p>}

      {isFetched && data && showList && (
        <>
        <div className="home_list_container">
        <ul className="home_list">
            {data.map((product) => (
             <li key={product.id} className="home_list_item">
                <Link
                to={`/products/${product.id}`}
                className="home_list_link"
                >
                {product.title}
                </Link>
            </li>
            ))}
        </ul>
        </div>

    <button
      className="close_button"
      onClick={() => setShowList(false)}
    >
      Close
    </button>
  </>
  )}
  </div>
  )
}