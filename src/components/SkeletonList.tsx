import { ProductCardSkeleton } from './ProductCardSkeleton'

/* Renders multiple skeleton cards while loading
count controls how many placeholders to show */
export function SkeletonList({ count = 5 }: { count?: number }) {
  return (
    <div className='product-list'>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}