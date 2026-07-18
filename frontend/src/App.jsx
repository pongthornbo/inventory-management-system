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

  function handleClearProduct() {
    setProducts([])
  }

  return (
    <main>
      <h1>Inventory Management System</h1>
      <p>Manage products and stock.</p>

      <h2>Products</h2>

      <button type="button" onClick={handleClearProduct}>
        Clear products
      </button>

      <ul>
        {products.map((product) => (
            <ProductItem key={product.id} product={product} />
        ))}

      </ul>
    </main>
  )
}

export default App
