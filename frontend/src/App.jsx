import { useState, useEffect } from 'react'
import ProductItem from './components/ProductItem.jsx'

function App() {
  const [products, setProducts] = useState([])
  const [searchText, setSearchText] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [refreshCount, setRefreshCount] = useState(0)
  const [productErrorMessage, setProductErrorMessage] = useState('')

  const [newProductName, setNewProductName] = useState('')
  const [newProductPrice, setNewProductPrice] = useState('')
  const [newProductStock, setNewProductStock] = useState('0')

  const [categories, setCategories] = useState([])
  const [categoryErrorMessage, setCategoryErrorMessage] = useState('')

  const [newCategoryName, setNewCategoryName] = useState('')
  const [newCategoryDescription, setNewCategoryDescription] = useState('')
  const [newProductCategoryId, setNewProductCategoryId] = useState('')

  useEffect(() => {
    async function loadProducts(){
      setIsLoading(true)
      setProducts([])
      setProductErrorMessage('')
      try{
        const response = await fetch('http://localhost:8000/products')

        if (!response.ok) {
          throw new Error('Failed to load products')
        }

        const data = await response.json()

        setProducts(data)
      } catch(error) {
        console.error('Failed to load products')
        setProductErrorMessage(error.message)
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
    setProductErrorMessage('')

    const productData = {
      name: newProductName,
      price: Number(newProductPrice),
      stock: Number(newProductStock),
      category_id: 
        Number(newProductCategoryId) === '' ?
        null :
        Number(newProductCategoryId)
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
      setNewProductCategoryId('')
    } catch(error) {
      console.error(error)
      setProductErrorMessage('Failed to create product')
    }
  }

  async function handleDeleteProduct(productId) {
    setProductErrorMessage('')

    try {
      const response = await fetch(`http://localhost:8000/products/${productId}`, {method: 'DELETE',})

      if (!response.ok) {
        throw new Error('Failed to delete product')
      }

      setProducts((currentProducts) => currentProducts.filter((product) => product.id !== productId),)
    } catch(error) {
      console.error(error)
      setProductErrorMessage('Failed to delete product')
    }
  }

  async function handleUpdateStock(productId, newStock) {
    setProductErrorMessage('')

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
      setProductErrorMessage('Failed to update stock')
    }
  }

  async function handleUpdateProduct(productId, productData) {
    setProductErrorMessage('')

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
      setProductErrorMessage('Failed to update product')

      return false
    }
  }

  async function handleCreateCategory(event) {
    event.preventDefault()
    setCategoryErrorMessage('')

    const categoryData = {
      name: newCategoryName,
      description: newCategoryDescription,
    }

    try {
      const response = await fetch(
        'http://localhost:8000/categories',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(categoryData)
        }
      )

      if (!response.ok) {
        throw new Error('Failed to create category')
      }

      const createdCategory = await response.json()

      setCategories((currentCategories) => [...currentCategories, createdCategory,])

      setNewCategoryName('')
      setNewCategoryDescription('')
    } catch (error) {
      console.error(error)
      setCategoryErrorMessage('Failed to create category')
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

      {productErrorMessage && (<p>{productErrorMessage}</p>)}

      {isLoading ? (
        <p>Loading products...</p>
      ) : (filterProducts.length>0) ? (
            <ul>
              {filterProducts.map((product) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    onUpdateStock={handleUpdateStock}
                    onUpdateProduct={handleUpdateProduct}
                    onDelete={handleDeleteProduct}
                  />
              ))}
            </ul>
          ) : (!productErrorMessage) ? (
          <p>No products found.</p>
          ) : null}

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

        <label>
          Category
          <select
              value={newProductCategoryId}
              onChange={(event) => {setNewProductCategoryId(event.target.value)}}
          >
              <option value="">
                  No category
              </option>

              {categories.map((category) => (<option key={category.id} value={category.id}>{category.name}</option>))}
          </select>
          </label>

        <button type="submit">Add product</button>
      </form>

      <h2>Categories</h2>
      {categoryErrorMessage && (<p>{categoryErrorMessage}</p>)}

      {categories.length > 0 ? (
        <ul>{categories.map((category) => (<li key={category.id}>{category.name}</li>))}</ul>
      ) : !categoryErrorMessage ? (
        <p>No categories found.</p>
      ) : null}

      <h2>Add category</h2>
      <form onSubmit={handleCreateCategory}>
        <label>
          Name
          <input
            type="text"
            value={newCategoryName}
            onChange={(event) => {setNewCategoryName(event.target.value)}}
            required
          />
        </label>

        <label>
          Description
          <input
            type="text"
            value={newCategoryDescription}
            onChange={(event) => {setNewCategoryDescription(event.target.value)}}
            />
        </label>
        <button type="submit">Add category</button>
      </form>
    </main>
  )
}

export default App