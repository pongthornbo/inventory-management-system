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
        <section className="panel">
            <h3>Add category</h3>

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
                    Description
                    <input
                        type="text"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </label>

                <div className="button-row form-actions">
                    <button className="button button-primary" type="submit">
                        Add category
                    </button>
                </div>
            </form>
        </section>
    )
}

export default CategoryForm