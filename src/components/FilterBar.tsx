import { useSearchStore } from "../store/useSearchStore";
import { useAnalytics } from "../hooks/useAnalytics";
import { retailers, categories } from "../data/mockProducts"

export function FilterBar() {
    const { selectedRetailer, selectedCategory, setRetailer, setCategory } = useSearchStore()
    const { track } = useAnalytics()

    const handleRetailer = (retailer: string) => {
        setRetailer(retailer)
        track('filter_applied', { type: 'retailer', value: retailer})
    }

    const handleCategory = (category: string) => {
        setCategory(category)
        track('filter_applied', { type: 'category', value: category})
    }

    return (
        <div>
            <div className='filter-bar'>
                {retailers.map((retailer) => (
                    <button
                        key = {retailer}
                        className = {'filter-pill ${selectedRetailer == retailer ? 'active' : ''}'}
                        onClick = {() => handleRetailer(retailer)}
                    >
                        {retailer}
                    </button>
                ))}
            </div>

            <div className="filter-bar">
                {categories.map((category) => (
                    <button
                        key = {category}
                        className = {'filter-pill ${selectedCateogory == category ? 'active' : ''}'}
                        onClick = {() => handleCategory(category)}
                    >

                    {category}
                    </button>
                ))}
            </div>
        </div>
    )
}

