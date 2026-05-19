import { useSearchStore } from '../store/useSearchStore'
import { useAnalytics } from '../hooks/useAnalytics'
import { useDebounce } from '../hooks/useDebounce'
import { useEffect } from 'react'

type SearchBarProps = {
  onFocus: () => void
  onBlur: () => void
}

export function SearchBar({ onFocus, onBlur }: SearchBarProps) {
  const { query, setQuery, addRecentSearch } = useSearchStore()
  const { track } = useAnalytics()

  const debouncedQuery = useDebounce(query, 400)
  const debouncedRecent = useDebounce(query, 1000)

  useEffect(() => {
    if (debouncedQuery.trim()) {
      track('search_submitted', { query: debouncedQuery })
    }
  }, [debouncedQuery])

  useEffect(() => {
    if (debouncedRecent.trim()) {
      addRecentSearch(debouncedRecent)
    }
  }, [debouncedRecent])

  return (
    <input
      className='search-input'
      type='text'
      placeholder='Search grocery deals...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
}