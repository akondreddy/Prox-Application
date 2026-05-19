import { useSearchStore } from '../store/useSearchStore'
import { useAnalytics } from '../hooks/useAnalytics'

/* RecentSearches shows the last 5 searches from localStorage
Tapping one re-runs that search, clear button wipes the list */
export function RecentSearches() {
  const { recentSearches, setQuery, clearRecentSearches } = useSearchStore()
  const { track } = useAnalytics()

  /* If no recent searches exist, render nothing at all */
  if (recentSearches.length === 0) return null

  const handleTap = (search: string) => {
    setQuery(search)
    track('recent_search_tapped', { query: search })
  }

  return (
    <div className='recent-searches'>
      <div className='recent-header'>
        <span className='recent-title'>Recent Searches</span>
        <button className='clear-button' onClick={clearRecentSearches}>
          Clear
        </button>
      </div>

      {recentSearches.map((search: string) => (
        <div
          key={search}
          className='recent-item'
          onClick={() => handleTap(search)}
        >
          <span className='recent-icon'>🕐</span>
          {search}
        </div>
      ))}
    </div>
  )
}