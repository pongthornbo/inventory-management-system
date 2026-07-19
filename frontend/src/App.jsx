import { useState, useEffect } from 'react'
import ProductItem from './components/ProductItem.jsx'

function App() {
  const [products, setProducts] = useState([])
  const [searchText, setSearchText] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [refreshCount, setRefreshCount] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')

  const [newProductName, setNewProductName] = useState('')
  const [newProductPrice, setNewProductPrice] = useState('')
  const [newProductStock, setNewProductStock] = useState('0')
  const [actionErrorMessage, setActionErrorMessage] = useState('')

  const [categories, setCategories] = useState([])
  const [categoryErrorMessage, setCategoryErrorMessage] = useState('')

  useEffect(() => {
    async function loadProducts(){
      setIsLoading(true)
      setErrorMessage('')
      try{
        const response = await fetch('http://localhost:8000/products')

        if (!response.ok) {
          throw new Error('Failed to load products')
        }

        const data = await response.json()

        setProducts(data)
      } catch(error) {
        console.error('Failed to load products')
        setErrorMessage(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts();
  }, [refreshCount])

  useEffect(() => {
    async function loadCategories(){
      setCategories([])
      setCategoryErrorMessage('')
      try{
        const response = await fetch('http://localhost:8000/categories')

        if (!response.ok) {
          throw new Error('Failed to load categories')
        }

        const data = await response.json()

        setCategories(data)
      } catch(error) {
        console.error('Failed to load categories')
        setCategoryErrorMessage(error.message)
      }
    }

    loadCategories();
  }, [refreshCount])

  function handleClearProduct() {
    setProducts([])
  }

  const filterProducts = products.filter((product) => product.name.toLowerCase().includes(searchText.toLowerCase()))

  async function handleCreateProduct(event) {
    event.preventDefault()
    setActionErrorMessage('')

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
        }
      )

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
      setActionErrorMessage('Failed to create product')
    }
  }

  async function handleDeleteProduct(productId) {
    setActionErrorMessage('')

    try {
      const response = await fetch(`http://localhost:8000/products/${productId}`, {method: 'DELETE',})

      if (!response.ok) {
        throw new Error('Failed to delete product')
      }

      setProducts((currentProducts) => currentProducts.filter((product) => product.id !== productId),)
    } catch(error) {
      console.error(error)
      setActionErrorMessage('Failed to delete product')
    }
  }

  async function handleUpdateStock(productId, newStock) {
    setActionErrorMessage('')

    try {
      const response = await fetch(`http://localhost:8000/products/${productId}`, {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify({stock: newStock,}),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to update stock')
      }

      const updatedProduct = await response.json()

      setProducts((currentProducts) => currentProducts.map((product) => product.id === productId ? updatedProduct: product))
    } catch (error) {
      console.error(error)
      setActionErrorMessage('Failed to update stock')
    }
  }

  async function handleUpdateProduct(productId, productData) {
  setActionErrorMessage('')

  try {
    const response = await fetch(
      `http://localhost:8000/products/${productId}`,
      {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(productData),
      }
    )

    if (!response.ok) {
      throw new Error('Failed to update product')
    }

    const updatedProduct = await response.json()

    setProducts((currentProducts) => currentProducts.map((product) => product.id === productId ? updatedProduct : product))

    return true
  } catch (error) {
    console.error(error)
    setActionErrorMessage('Failed to update product')

    return false
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

      <button type="button" onClick={() => {setRefreshCount((currentCount) => currentCount+1)}}>Refresh</button>
      <button type="button" onClick={handleClearProduct}>Clear products</button>

      {isLoading ? (
        <p>Loading products...</p>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : filterProducts.length > 0 ? (
          <ul>
            {filterProducts.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  onUpdateStock={handleUpdateStock}
                  onUpdateProduct={handleUpdateProduct}
                  onDelete={handleDeleteProduct}/>
              ))
            }
          </ul>
        ) : (
          <p>No products found.</p>
      )}

      {actionErrorMessage && (<p>{actionErrorMessage}</p>)}

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

      <h2>Categories</h2>
      {categoryErrorMessage ? (
        <p>{categoryErrorMessage}</p>
      ): categories.length > 0 ? (
        <ul>{categories.map((category) => <li key={category.id}>{category.name}</li>)}</ul>
      ):
        <p>No categories found.</p>
      }
    </main>
  )
}

export default App