import { useState, useEffect } from 'react'
import ProductItem from './components/ProductItem.jsx'
import CategoryItem from './components/CategoryItem.jsx'
import CategoryForm from './components/CategoryForm.jsx'
import ProductForm from './components/ProductForm.jsx'
import ProductFilters from './components/ProductFilters.jsx'

function App() {
  const [products, setProducts] = useState([])
  const [appliedFilters, setAppliedFilters] = useState({
    search: '',
    minPrice: '',
    maxPrice: '',
    lowStock: false,
  })
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
        const params = new URLSearchParams()

        if (appliedFilters.search) {params.set('search', appliedFilters.search)}

        if (appliedFilters.minPrice) {params.set('min_price', appliedFilters.minPrice)}

        if (appliedFilters.maxPrice) {params.set('max_price', appliedFilters.maxPrice)}

        if (appliedFilters.lowStock) {params.set('low_stock', 'true')}

        const queryString = params.toString()

        const url = queryString
          ? `http://localhost:8000/products?${queryString}`
          : 'http://localhost:8000/products'

        const response = await fetch(url)

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
  }, [refreshCount, appliedFilters])

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

  function handleApplyFilters(filterData) {
    setAppliedFilters(filterData)
  }

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

      setRefreshCount((currentCount) => currentCount + 1)

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

      setRefreshCount((currentCount) => currentCount + 1)
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

      setRefreshCount((currentCount) => currentCount + 1)
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

      setRefreshCount((currentCount) => currentCount + 1)

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
    <main className="dashboard">
      <header className="dashboard-header">
        <p className="eyebrow">Inventory dashboard</p>
        <h1>Inventory Management System</h1>
        <p className="dashboard-subtitle">
          Manage products, stock, and categories.
        </p>
      </header>

      <div className="dashboard-grid">
        <section className="dashboard-section">
          <div className="section-header">
            <div>
              <p className="eyebrow">Inventory</p>
              <h2>Products</h2>
            </div>

            <div className="button-row">
              <button
                className="button button-secondary"
                type="button"
                onClick={() => {setRefreshCount((currentCount) => currentCount + 1)}}
              >
                Refresh
              </button>

              <button
                className="button button-secondary"
                type="button"
                onClick={handleClearProduct}
              >
                Clear products
              </button>
            </div>
          </div>

          <ProductFilters onApplyFilters={handleApplyFilters} />

          {productErrorMessage && (<p className="status-message status-message-error">{productErrorMessage}</p>)}

          {isLoading ? (
            <p className="status-message">Loading products...</p>
          ) : products.length > 0 ? (
            <ul className="item-list">
              {products.map((product) => (
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
          ) : !productErrorMessage ? (
            <p className="empty-state">No products found.</p>
          ) : null}

          <ProductForm categories={categories} onCreateProduct={handleCreateProduct}/>
        </section>

        <section className="dashboard-section">
          <div className="section-header">
            <div>
              <p className="eyebrow">Organization</p>
              <h2>Categories</h2>
            </div>
          </div>

          {categoryErrorMessage && (<p className="status-message status-message-error">{categoryErrorMessage}</p>)}

          {categories.length > 0 ? (
            <ul className="item-list">
              {categories.map((category) => (
                <CategoryItem
                  key={category.id}
                  category={category}
                  onUpdateCategory={handleUpdateCategory}
                  onDeleteCategory={handleDeleteCategory}
                />
              ))}
            </ul>
          ) : !categoryErrorMessage ? (
            <p className="empty-state">No categories found.</p>
          ) : null}

          <CategoryForm onCreateCategory={handleCreateCategory} />
        </section>
      </div>
    </main>
  )
}

export default App