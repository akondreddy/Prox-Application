/* EmptyState shows when a search returns no results
query is passed in so we can show what the user searched for */
type EmptyStateProps = {
  query: string
}

export function EmptyState({ query }: EmptyStateProps) {
  return (
    <div className='state-container'>
      <div className='state-emoji'>🛒</div>
      <div className='state-title'>No deals found</div>
      <div className='state-subtitle'>
        {query
          ? `No results for "${query}". Try a different search or filter.`
          : 'Start searching to find grocery deals near you.'}
      </div>
    </div>
  )
}