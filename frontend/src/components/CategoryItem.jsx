import { useState } from 'react'

function CategoryItem({category, onUpdateCategory, onDeleteCategory}){
    const [isEditing, setIsEditing] = useState(false)
    const [editName, setEditName] = useState(category.name)
    const [editDescription, setEditDescription] = useState(category.description ?? '')

    function handleStartEdit() {
        setIsEditing(true)
        setEditName(category.name)
        setEditDescription(category.description ?? '')
    }

    async function handleSubmit(event) {
        event.preventDefault()

        const isSuccess = await onUpdateCategory(
            category.id,
            {
                name: editName,
                description: editDescription
            }
        )

        if (isSuccess){
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
                        Description
                        <input
                            type="text"
                            value={editDescription}
                            onChange={(event) => setEditDescription(event.target.value)}
                        />
                    </label>

                    <div className="button-row form-actions">
                        <button className="button button-primary" type="submit">Save</button>

                        <button
                            className="button button-secondary"
                            type="button"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </li>
        )
    }

    return (
        <li className="item-card">
            <div className="item-main">
                <h3 className="item-title">{category.name}</h3>

                <p className="item-description">{category.description ?? 'No description'}</p>
            </div>

            <div className="item-actions">
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
                    onClick={() => onDeleteCategory(category.id)}
                >
                    Delete
                </button>
            </div>
        </li>
    )
}

export default CategoryItem