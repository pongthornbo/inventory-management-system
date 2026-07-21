import { useState } from "react"

function ProductForm({categories, onCreateProduct}) {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState(0)
    const [categoryId, setCategoryId] = useState('')

    const validCategoryId = (categories.some((category) => String(category.id) === categoryId)) ? categoryId : ''

    async function handleSubmit(event){
        event.preventDefault()

        const productData = {
            name: name,
            price: Number(price),
            stock: Number(stock),
            category_id:
                validCategoryId === '' ?
                null :
                Number(validCategoryId)
        }

        const isSuccess = await onCreateProduct(productData)

        if (isSuccess){
            setName('')
            setPrice('')
            setStock(0)
            setCategoryId('')
        }
    }

    return (
        <section className="panel">
            <h3>Add product</h3>

            <form className="form-grid" onSubmit={handleSubmit}>
                <label className="form-field">
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
                </label>

                <label className="form-field">
                    Price
                    <input
                        type="number"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                        min="0"
                        step="0.01"
                        required
                    />
                </label>

                <label className="form-field">
                    Stock
                    <input
                        type="number"
                        value={stock}
                        onChange={(event) => setStock(event.target.value)}
                        min="0"
                        required
                    />
                </label>

                <label className="form-field">
                    Category
                    <select
                        value={validCategoryId}
                        onChange={(event) => setCategoryId(event.target.value)}
                        >
                        <option value="">No category</option>

                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </label>

                <div className="button-row form-actions">
                    <button className="button button-primary" type="submit">
                        Add product
                    </button>
                </div>
            </form>
        </section>
    )
}

export default ProductForm