import { useState } from 'react'

function CategoryForm({ onCreateCategory }) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    async function handleSubmit(event) {
        event.preventDefault()

        const categoryData = {
            name,
            description,
        }

        const isSuccess = await onCreateCategory(categoryData)

        if (isSuccess) {
            setName('')
            setDescription('')
        }
    }

    return (
        <>
            <h2>Add category</h2>
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
                Description
                <input
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                />
            </label>

            <button type="submit">Add category</button>
            </form>
        </>
  )
}

export default CategoryForm