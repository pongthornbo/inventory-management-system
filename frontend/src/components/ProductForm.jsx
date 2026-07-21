import { useState, useEffect } from "react"

function ProductForm({categories, onCreateProduct}) {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState(0)
    const [categoryId, setCategoryId] = useState('')

    useEffect(() => {
        const categoryStillExists = categories.some((category) => String(category.id) === categoryId)

        if (categoryId !== '' && !categoryStillExists)
            setCategoryId('')
    }

    , [categories, categoryId])

    async function handleSubmit(event){
        event.preventDefault()

        const productData = {
            name: name,
            price: Number(price),
            stock: Number(stock),
            category_id:
                categoryId === '' ?
                null :
                Number(categoryId)
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
        <>
            <h2>Add product</h2>

            <form onSubmit={handleSubmit}>
                <label>
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
                </label>

                <label>
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

                <label>
                Stock
                    <input
                        type="number"
                        value={stock}
                        onChange={(event) => setStock(event.target.value)}
                        min="0"
                        required
                    />
                </label>

                <label>
                    Category
                    <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)}>

                    <option value="">No category</option>
                    {categories.map((category) => (<option key={category.id} value={category.id}>{category.name}</option>))}
                </select>
                </label>

                <button type="submit">Add product</button>
            </form>
        </>
    )
}

export default ProductForm