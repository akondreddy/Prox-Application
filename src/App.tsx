import { useEffect, useState, useMemo } from 'react'
import { useSearchStore } from './store/useSearchStore'
import { useDebounce } from './hooks/useDebounce'
import { mockProducts } from './data/mockProducts'
import type { Product } from './data/mockProducts'
import { SearchBar } from './components/SearchBar'
import { FilterBar } from './components/FilterBar'
import { ProductCard } from './components/ProductCard'
import { SkeletonList } from './components/SkeletonList'
import { EmptyState } from './components/EmptyState'
import { ErrorState } from './components/ErrorState'
import { RecentSearches } from './components/RecentSearches'
import './styles.css'


export default function App() {
  const { query, selectedRetailer, selectedCategory, isLoading, isError, setLoading, setError, recentSearches } = useSearchStore()
  const debouncedQuery = useDebounce(query, 400)
  const [savedDeals, setSavedDeals] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('savedDeals') || '[]')
  })
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  /* Simulate a real API call with a loading delay
  Fires every time the debounced query or filters change */
  useEffect(() => {
    setLoading(true)
    setError(false)

    const timer = setTimeout(() => {
      /* Randomly trigger an error 1 in 10 times to demo error state */
      if (Math.random() < 0.1) {
        setError(true)
        setLoading(false)
        return
      }
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [debouncedQuery, selectedRetailer, selectedCategory])

  /* Filter products based on query, retailer, and category
  useMemo prevents recalculating unless these values actually change */
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesQuery =
      product.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      product.retailer.toLowerCase().includes(debouncedQuery.toLowerCase())
      const matchesRetailer = selectedRetailer === 'All' || product.retailer === selectedRetailer
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
      return matchesQuery && matchesRetailer && matchesCategory
    })
  }, [debouncedQuery, selectedRetailer, selectedCategory])

  /* Toggle saved state and persist to localStorage */
  const handleSave = (product: Product) => {
    setSavedDeals((prev) => {
      const isAlreadySaved = prev.includes(product.id)
      const updated = isAlreadySaved
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
      localStorage.setItem('savedDeals', JSON.stringify(updated))
      return updated
    })
  }

  const handleRetry = () => {
    setError(false)
    setLoading(true)
    setTimeout(() => setLoading(false), 800)
  }

  const showRecentSearches = isSearchFocused && query === '' && recentSearches.length > 0

  return (
    <div className='app'>
      {/* Header */}
      <div className='header'>
        <h1>Prox Deals</h1>
        <SearchBar
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
      </div>

      {/* Filters */}
      <FilterBar />

      {/* Content */}
      {isLoading ? (
        <SkeletonList count={5} />
      ) : isError ? (
        <ErrorState onRetry={handleRetry} />
      ) : showRecentSearches ? (
        <RecentSearches />
      ) : filteredProducts.length === 0 ? (
        <EmptyState query={debouncedQuery} />
      ) : (
        <div className='product-list'>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isSaved={savedDeals.includes(product.id)}
              onSave={handleSave}
            />
          ))}
        </div>
      )}
    </div>
  )
}