/* ErrorState shows when something goes wrong with the search
onRetry is a callback that re-triggers the search */
type ErrorStateProps = {
  onRetry: () => void
}

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className='state-container'>
      <div className='state-emoji'>⚠️</div>
      <div className='state-title'>Something went wrong</div>
      <div className='state-subtitle'>We couldn't load deals right now.</div>
      <button className='retry-button' onClick={onRetry}>
        Try Again
      </button>
    </div>
  )
}