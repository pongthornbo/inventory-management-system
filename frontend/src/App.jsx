import { useState, useEffect } from 'react'
import ProductItem from './components/ProductItem.jsx'

function App() {
  const [products, setProducts] = useState([])
  const [searchText, setSearchText] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  const [newProductName, setNewProductName] = useState('')
  const [newProductPrice, setNewProductPrice] = useState('')
  const [newProductStock, setNewProductStock] = useState('0')
  const [createErrorMessage, setCreateErrorMessage] = useState('')

  useEffect(() => {
    async function loadProducts(){
      try{
        const response = await fetch('http://localhost:8000/products')

        if (!response.ok) {
          throw new Error('Failed to load products')
        }

        const data = await response.json()

        setProducts(data)
      } catch(error) {
        setErrorMessage(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts();
  }, [])

  function handleClearProduct() {
    setProducts([])
  }

  const filterProducts = products.filter((product) => product.name.toLowerCase().includes(searchText.toLowerCase()))

  async function handleCreateProduct(event) {
    event.preventDefault()
    setCreateErrorMessage('')

    const productData = {
      name: newProductName,
      price: Number(newProductPrice),
      stock: Number(newProductStock),
    }

    try { 
      const response = await fetch('http://localhost:8000/products', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(productData),
      })

      if (!response.ok) {
        throw new Error('Failed to create product')
      }

      const createdProduct = await response.json()

      setProducts((currentProducts) => [...currentProducts, createdProduct])

      setNewProductName('')
      setNewProductPrice('')
      setNewProductStock('0')
    } catch(error) {
      console.error(error)
      setCreateErrorMessage('Failed to create product')
    }
  }

  async function handleDeleteProduct(productId) {
    try {
      const response = await fetch(`http://localhost:8000/products/${productId}`, {
          method: 'DELETE',
        })

      if (!response.ok) {
        throw new Error('Failed to delete product')
      }

      setProducts((currentProducts) => currentProducts.filter((product) => product.id !== productId),)
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <main>
      <h1>Inventory Management System</h1>
      <p>Manage products and stock.</p>

      <h2>Products</h2>
      <input
        type="text"
        value={searchText}
        onChange={(event) => {setSearchText(event.target.value)}}
        placeholder="Search products"
      />

      <button type="button" onClick={handleClearProduct}>Clear products</button>

      {isLoading ? (
        <p>Loading products...</p>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : filterProducts.length > 0 ? (
          <ul>
            {filterProducts.map((product) => (
                <ProductItem key={product.id} product={product} onDelete={handleDeleteProduct}/>
            ))}
          </ul>
        ) : (
          <p>No products found.</p>
      )}

      <h2>Add product</h2>
      <form onSubmit={handleCreateProduct}>
        <label>
          Name
          <input
            type="text"
            value={newProductName}
            onChange={(event) => {setNewProductName(event.target.value)}}
            required
          />
        </label>

        <label>
          Price
          <input
            type="number"
            value={newProductPrice}
            onChange={(event) => {setNewProductPrice(event.target.value)}}
            min="0"
            step="0.01"
            required
          />
        </label>

        <label>
          Stock
          <input
            type="number"
            value={newProductStock}
            onChange={(event) => {setNewProductStock(event.target.value)}}
            min="0"
            required
          />
        </label>

      <button type="submit">Add product</button>
    </form>

    {createErrorMessage && (<p>{createErrorMessage}</p>)}
    </main>
  )
}

export default App