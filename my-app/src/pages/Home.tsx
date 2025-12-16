import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { CircularProgress } from '@mui/material'
import './Home.css'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../shared/api'
import { useToastStore } from "../shared/index";


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

  useEffect(() => {
  if (isFetched && data && data.length > 0) {
    useToastStore.getState().addToast({
      type: "success",
      message: `Fetched ${data.length} products successfully!`,
      timeout: 3000,
    });
  }
}, [isFetched, data]);

useEffect(() => {
  if (isError && error) {
    useToastStore.getState().addToast({
      type: "error",
      message: `Failed to load products: ${error.message}`,
      timeout: 4000,
    });
  }
}, [isError, error]);



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