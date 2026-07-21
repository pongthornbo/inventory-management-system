import { useState } from "react"

function ProductFilters({onApplyFilters}){
    const [searchText, setSearchText] = useState('')
    const [minPrice, setMinPrice] = useState('')
    const [maxPrice, setMaxPrice] = useState('')
    const [lowStock, setLowStock] = useState(false)

    function handleSubmit(event) {
        event.preventDefault()

        const filterData = {
            search: searchText.trim(),
            minPrice,
            maxPrice,
            lowStock,
        }

        onApplyFilters(filterData)
    }

    function handleReset() {
        setSearchText('')
        setMinPrice('')
        setMaxPrice('')
        setLowStock(false)

        onApplyFilters({
            search: '',
            minPrice: '',
            maxPrice: '',
            lowStock: false,
        })
    }
    return (
        <section className="panel">
            <h3>Filter products</h3>

            <form className="form-grid form-grid-filters" onSubmit={handleSubmit}>
                <label className="form-field">
                    Search
                    <input
                        type="text"
                        value={searchText}
                        onChange={(event) => setSearchText(event.target.value)}
                        placeholder="Name or description"
                    />
                </label>

                <label className="form-field">
                    Minimum price
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(event) => setMinPrice(event.target.value)}
                        min="0"
                        step="0.01"
                    />
                </label>

                <label className="form-field">
                    Maximum price
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(event) => setMaxPrice(event.target.value)}
                        min="0"
                        step="0.01"
                    />
                </label>

                <label className="checkbox-field">
                    <input
                        type="checkbox"
                        checked={lowStock}
                        onChange={(event) => setLowStock(event.target.checked)}
                    />
                    Low stock only
                </label>

                <div className="button-row form-actions">
                    <button className="button button-primary" type="submit">
                        Apply filters
                    </button>

                    <button
                        className="button button-secondary"
                        type="button"
                        onClick={handleReset}
                    >
                        Reset filters
                    </button>
                </div>
            </form>
        </section>
    )
}

export default ProductFilters