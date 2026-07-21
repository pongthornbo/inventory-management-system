import { useState } from "react"

function ProductItem ({ product, categories, onUpdateStock, onUpdateProduct, onDelete }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editName, setEditName] = useState(product.name)
    const [editPrice, setEditPrice] = useState(String(product.price))
    const [editStock, setEditStock] = useState(String(product.stock))
    const [editCategoryId, setEditCategoryId] = useState(product.category_id === null ? '' : String(product.category_id),)

    function handleStartEdit() {
        setEditName(product.name)
        setEditPrice(String(product.price))
        setEditStock(String(product.stock))
        setIsEditing(true)
        setEditCategoryId(product.category_id === null ? '' : String(product.category_id),)
    }

    async function handleSubmit(event) {
        event.preventDefault()

        const isSuccess = await onUpdateProduct(
            product.id, {
                name: editName,
                price: Number(editPrice),
                stock: Number(editStock),
                category_id: editCategoryId === '' ? null : Number(editCategoryId)
            })

        if (isSuccess) {
            setIsEditing(false)
        }
    }

    if (isEditing) {
        return (
            <li className="item-card">
                <form className="form-grid edit-form" onSubmit={handleSubmit}>
                    <label className="form-field">
                        Name
                        <input
                            type="text"
                            value={editName}
                            onChange={(event) => setEditName(event.target.value)}
                            required
                        />
                    </label>

                    <label className="form-field">
                        Price
                        <input
                            type="number"
                            value={editPrice}
                            onChange={(event) => setEditPrice(event.target.value)}
                            min="0"
                            step="0.01"
                            required
                        />
                    </label>

                    <label className="form-field">
                        Stock
                        <input
                            type="number"
                            value={editStock}
                            onChange={(event) => setEditStock(event.target.value)}
                            min="0"
                            required
                        />
                    </label>

                    <label className="form-field">
                        Category
                        <select value={editCategoryId} onChange={(event) => setEditCategoryId(event.target.value)}>
                            <option value="">No category</option>

                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </label>

                    <div className="button-row form-actions">
                        <button className="button button-primary" type="submit">Save</button>

                        <button
                            className="button button-secondary"
                            type="button"
                            onClick={() => {setIsEditing(false)}}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </li>
        )
    }

    const categoryName = product.category_id === null ?
        'No category':
        categories.find((category) => category.id === product.category_id,)?.name ?? 'Category unavailable'

    return (
        <li className="item-card">
            <div className="item-main">
                <h3 className="item-title">{product.name}</h3>

                <div className="item-meta">
                    <span className="meta-pill">฿{product.price}</span>
                    <span className="meta-pill">Stock: {product.stock}</span>
                    <span className="meta-pill">Category: {categoryName}</span>
                </div>
            </div>

            <div className="item-actions">
            <div className="stock-controls">
                <button
                    className="button button-secondary button-icon"
                    type="button"
                    onClick={() => {onUpdateStock(product.id, product.stock - 1)}}
                    disabled={product.stock === 0}
                >
                    −
                </button>

                <button
                    className="button button-secondary button-icon"
                    type="button"
                    onClick={() => {onUpdateStock(product.id, product.stock + 1)}}
                >
                    +
                </button>
            </div>

            <button
                className="button button-secondary"
                type="button"
                onClick={handleStartEdit}
            >
                Edit
            </button>

            <button
                className="button button-danger"
                type="button"
                onClick={() => onDelete(product.id)}
            >
                Delete
            </button>
            </div>
        </li>
    )
}

export default ProductItem