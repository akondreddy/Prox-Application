import { useSearchStore } from "../store/useSearchStore";
import { useAnalytics } from "../hooks/useAnalytics";
import { retailers, categories } from "../data/mockProducts.ts";

export function FilterBar() {
    /* This will take the active filters and use those for the pills 
    It will show which pills to highlight */
    const { selectedRetailer, selectedCategory, setRetailer, setCategory } = useSearchStore()
    const { track } = useAnalytics()

    /* Both of these handler functions will update the store and fire an analytics event */
    const handleRetailer = (retailer: string) => {
        setRetailer(retailer)
        track('filter_applied', { type: 'retailer', value: retailer})
    }

    const handleCategory = (category: string) => {
        setCategory(category)
        track('filter_applied', { type: 'category', value: category})
    }

    return (
        /* Map will loop over the retailers array and turn each item into a button
        className is a one line if statement, a ternary operator. If retailer, active, otherwise blank 
        When using map(), React needs a key prop in order to track which item is which when the list updates */
        <div>
            <div className='filter-bar'>
                {retailers.map((retailer: string) => (
                    <button
                        key = {retailer}
                        className = {`filter-pill ${selectedRetailer === retailer ? 'active' : ''}`}
                        onClick = {() => handleRetailer(retailer)}
                    >
                        {retailer}
                    </button>
                ))}
            </div>

            <div className="filter-bar">
                {categories.map((category: string) => (
                    <button
                        key = {category}
                        className = {`filter-pill ${selectedCategory === category ? 'active' : ''}`}
                        onClick = {() => handleCategory(category)}
                    >

                    {category}
                    </button>
                ))}
            </div>
        </div>
    )
}

