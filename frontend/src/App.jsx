import { useState, useEffect } from 'react'
import ProductItem from './components/ProductItem.jsx'

function App() {
  const [products, setProducts] = useState([])
  const [searchText, setSearchText] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadProducts(){
      const response = await fetch('http://localhost:8000/products')
      const data = await response.json()

      setProducts(data)
      setIsLoading(false)
    }

    loadProducts();
  }, [])

  function handleClearProduct() {
    setProducts([])
  }

  const filterProducts = products.filter((product) => product.name.toLowerCase().includes(searchText.toLowerCase()) )

  return (
    <main>
      <h1>Inventory Management System</h1>
      <p>Manage products and stock.</p>

      <h2>Products</h2>

      <input
        type="text"
        value={searchText}
        onChange={(event) => {
          setSearchText(event.target.value)
        }}
        placeholder="Search products"
      />

      <button type="button" onClick={handleClearProduct}>
        Clear products
      </button>

      { isLoading ? (
        <p>Loading products...</p>
      ) : filterProducts.length > 0 ? (
        <ul>
          {filterProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </main>
  )
}

export default App