import { useState } from 'react'
import ProductItem from './components/ProductItem.jsx'

const initialProducts = [
  {
    id: 1,
    name: 'Mechanical Keyboard',
    price: 2500,
    stock: 10,
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    price: 890,
    stock: 4,
  },
  {
    id: 3,
    name: 'USB-C Cable',
    price: 350,
    stock: 20,
  },
]

function App() {
  const [products, setProducts] = useState(initialProducts)
  const [searchText, setSearchText] = useState('')

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

      { filterProducts.length > 0 ? (
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