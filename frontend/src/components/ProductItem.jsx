function ProductItem ({ product }) {
    return (
        <li>
            {product.name} — ฿{product.price} — Stock: {product.stock}
        </li>
    )
}

export default ProductItem