import type { Product } from '../data/mockProducts'
import { useAnalytics } from '../hooks/useAnalytics'

/* ProductCard takes a single product and renders it as a deal card
The onSave callback lets the parent component handle save logic */
type ProductCardProps = {
  product: Product
  isSaved: boolean
  onSave: (product: Product) => void
}

export function ProductCard({ product, isSaved, onSave }: ProductCardProps) {
  const { track } = useAnalytics()

  /* When the user taps the heart button, it only tells the parent that the button was tapped
  Parent will decide the logic following that. Then analytics event is fired */
  const handleSave = () => {
    onSave(product)
    track('deal_viewed', { productId: product.id, productName: product.name })
  }


  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  )

  return (
    /* Will show the image for the product, if unable to load, then the name
    The product info is separated by ·, keeping it clean 
    Product prices shown with two decimal places, with toFixed(2) */
    <div className='product-card'>
      <img src={product.imageUrl} alt={product.name} />

      <div className='product-info'>
        <div className='product-name'>{product.name}</div>
        <div className='product-meta'>{product.retailer} · {product.size} · {product.distance} mi</div>

        <div className='product-prices'>
          <span className='price-deal'>${product.price.toFixed(2)}</span>
          <span className='price-original'>${product.originalPrice.toFixed(2)}</span>
          <span className='price-badge'>-{discount}%</span>
        </div>
      </div>

      <button
        className={`save-button ${isSaved ? 'saved' : ''}`}
        onClick={handleSave}
      >
        {isSaved ? '♥' : '♡'}
      </button>
    </div>
  )
}