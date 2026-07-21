import { useState, useEffect } from 'react'
import ProductItem from './components/ProductItem.jsx'
import CategoryItem from './components/CategoryItem.jsx'
import CategoryForm from './components/CategoryForm.jsx'
import ProductForm from './components/ProductForm.jsx'

function App() {
  const [products, setProducts] = useState([])
  const [searchText, setSearchText] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [refreshCount, setRefreshCount] = useState(0)
  const [productErrorMessage, setProductErrorMessage] = useState('')

  const [categories, setCategories] = useState([])
  const [categoryErrorMessage, setCategoryErrorMessage] = useState('')

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

  async function handleCreateProduct(productData) {
    setProductErrorMessage('')

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

      return true
    } catch(error) {
      console.error(error)
      setProductErrorMessage('Failed to create product')

      return false
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

  async function handleCreateCategory(categoryData) {
    setCategoryErrorMessage('')

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

      return true
    } catch (error) {
      console.error(error)
      setCategoryErrorMessage('Failed to create category')

      return false
    }
  }

  async function handleUpdateCategory(categoryId, categoryData) {
    setCategoryErrorMessage('')

    try {
      const response = await fetch(
        `http://localhost:8000/categories/${categoryId}`,
        {
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(categoryData)
        }
      )

      if (!response.ok) {
        throw new Error('Failed to update category')
      }

      const updatedCategory = await response.json()

      setCategories((currentCategories) => currentCategories.map((category) => category.id===categoryId ? updatedCategory: category))

      return true
    } catch{
      console.error('Failed to update category')
      setCategoryErrorMessage('Failed to update category')

      return false
    }
  }

  async function handleDeleteCategory(categoryId) {
    setCategoryErrorMessage('')

    try {
      const response = await fetch(
        `http://localhost:8000/categories/${categoryId}`,
        {
          method: 'DELETE'
        }
      )

      if (!response.ok) {
        throw new Error('Failed to delete category')
      }

      setCategories((currentCategories) => currentCategories.filter((category) => category.id !== categoryId))
    } catch (error) {
      console.error(error)
      setCategoryErrorMessage('Failed to delete category')
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
                    categories={categories}
                    onUpdateStock={handleUpdateStock}
                    onUpdateProduct={handleUpdateProduct}
                    onDelete={handleDeleteProduct}
                  />
              ))}
            </ul>
          ) : (!productErrorMessage) ? (
          <p>No products found.</p>
          ) : null}

      <ProductForm categories={categories} onCreateProduct={handleCreateProduct}/>

      <h2>Categories</h2>
      {categoryErrorMessage && (<p>{categoryErrorMessage}</p>)}

      {categories.length > 0 ? (
        <ul>
          {categories.map((category) =>
            <CategoryItem
              key={category.id}
              category={category}
              onUpdateCategory={handleUpdateCategory}
              onDeleteCategory={handleDeleteCategory}
            />
          )}
        </ul>
      ) : !categoryErrorMessage ? (
        <p>No categories found.</p>
      ) : null}

      <CategoryForm onCreateCategory={handleCreateCategory}/>
    </main>
  )
}

export default App