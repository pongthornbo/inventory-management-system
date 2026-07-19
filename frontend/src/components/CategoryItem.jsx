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
            <li>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name
                        <input
                            type="text"
                            value={editName}
                            onChange={(event) => setEditName(event.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Description
                        <input
                            type="text"
                            value={editDescription}
                            onChange={(event) => setEditDescription(event.target.value)}
                        />
                    </label>

                    <button type="submit">Save</button>

                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            </li>
        )
    }

    return (
        <li>
            {category.name} - Description: {category.description ?? "No description"}
            <button type="button" onClick={handleStartEdit}>Edit</button>
            <button type="button" onClick={() => onDeleteCategory(category.id)}>Delete</button>
        </li>
    )
}

export default CategoryItem