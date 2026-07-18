function ProductItem ({ product, onDelete }) {
    return (
        <li>
            {product.name} — ฿{product.price} — Stock: {product.stock}

            <button type="button" onClick={() => onDelete(product.id)}>Delete</button>
        </li>
    )
}

export default ProductItem