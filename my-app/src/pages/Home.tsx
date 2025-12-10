import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { CircularProgress } from '@mui/material'
import './Home.css'
import { Link } from 'react-router-dom'


interface Product {
  id: number
  title: string
}

function Home() {
  const [showList, setShowList] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)


  // fetch the fake data
  const fetchProducts = async (): Promise<Product[]> => {
    const res = await fetch('https://fakestoreapi.com/products')
    if (!res.ok) {
      throw new Error('Failed to fetch products')
    }
    return res.json()
  }

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

export default Home
