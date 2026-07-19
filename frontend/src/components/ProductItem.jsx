import { useState } from "react"

function ProductItem ({ product, categories, onUpdateStock, onUpdateProduct, onDelete }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editName, setEditName] = useState(product.name)
    const [editPrice, setEditPrice] = useState(String(product.price))
    const [editStock, setEditStock] = useState(String(product.stock))
    const [editCategoryId, setEditCategoryId] = useState(product.category_id)

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
                category_id: Number(editCategoryId)
            })

        if (isSuccess) {
            setIsEditing(false)
        }
    }

    if (isEditing) {
        return (
            <li>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name
                        <input
                            type="text"
                            value={editName}
                            onChange={(event) => {setEditName(event.target.value)}}
                            required
                        />
                    </label>

                    <label>
                        Price
                        <input
                            type="number"
                            value={editPrice}
                            onChange={(event) => {setEditPrice(event.target.value)}}
                            min="0"
                            step="0.01"
                            required
                        />
                    </label>

                    <label>
                        Stock
                        <input
                            type="number"
                            value={editStock}
                            onChange={(event) => {setEditStock(event.target.value)}}
                            min="0"
                            required
                        />
                    </label>

                    <label>
                        Category
                        <select
                            value={editCategoryId}
                            onChange={(event) => {setEditCategoryId(event.target.value)}}
                        >
                            <option value="">
                                No category
                            </option>

                            {categories.map((category) => (<option key={category.id} value={category.id}>{category.name}</option>))}
                        </select>
                    </label>

                    <button type="submit">
                        Save
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                        setIsEditing(false)
                        }}
                    >
                        Cancel
                    </button>
                </form>
            </li>
        )
    }

    return (
        <li>
            {product.name} — ฿{product.price} — Stock: {product.stock} 
            - Category: {categories.find(category => category.id === product.category_id)?.name ?? "No category"}

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

            <button
                type="button"
                onClick={handleStartEdit}
            >
                Edit
            </button>

            <button type="button" onClick={() => onDelete(product.id)}>Delete</button>
        </li>
    )
}

export default ProductItem