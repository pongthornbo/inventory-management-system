import ProductItem from './components/ProductItem.jsx'

const products = [
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
  return (
    <main>
      <h1>Inventory Management System</h1>
      <p>Manage products and stock.</p>

      <h2>Products</h2>

      <ul>
        {products.map((product) => (
            <ProductItem key={product.id} product={product} />
        ))}

      </ul>
    </main>
  )
}

export default App
