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
    return(
        <>
            <h2>Filter products</h2>

            <form onSubmit={handleSubmit}>
                <label>
                    Search
                    <input
                        type="text"
                        value={searchText}
                        onChange={(event) => setSearchText(event.target.value)}
                        placeholder="Name or description"
                    />
                </label>

                <label>
                    Minimum price
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(event) => setMinPrice(event.target.value)}
                        min="0"
                        step="0.01"
                    />
                </label>

                <label>
                    Maximum price
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(event) => setMaxPrice(event.target.value)}
                        min="0"
                        step="0.01"
                    />
                </label>

                <label>
                    <input
                        type="checkbox"
                        checked={lowStock}
                        onChange={(event) => setLowStock(event.target.checked)}
                    />
                    Low stock only
                </label>

                <button type="submit">Apply filters</button>

                <button type="button" onClick={handleReset}>Reset filters</button>
            </form>
        </>
    )
}

export default ProductFilters