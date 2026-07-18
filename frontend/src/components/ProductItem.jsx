function ProductItem ({ product, onUpdateStock, onDelete }) {
    return (
        <li>
            {product.name} — ฿{product.price} — Stock: {product.stock}

            <button
                type="button"
                onClick={() => {onUpdateStock(product.id, product.stock - 1)}}
                disabled={product.stock === 0}
            >
                -
            </button>
            <button
                type="button"
                onClick={() => {onUpdateStock(product.id, product.stock + 1)}}
            >
                +
            </button>

            <button type="button" onClick={() => onDelete(product.id)}>Delete</button>
        </li>
    )
}

export default ProductItem