/* ProductCardSkeleton mimics the layout of ProductCard exactly
It shows a shimmer animation while real products are loading
No props needed, it just renders placeholder shapes */
export function ProductCardSkeleton() {
  return (
    <div className='skeleton-card'>
      <div className='skeleton' style={{ width: 72, height: 72, borderRadius: 8 }} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className='skeleton' style={{ width: '70%', height: 16 }} />
        <div className='skeleton' style={{ width: '50%', height: 13 }} />
        <div className='skeleton' style={{ width: '40%', height: 16 }} />
      </div>
    </div>
  )
}