// pages/link/[slug].js
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function ProductPage() {
  const router = useRouter()
  const { slug } = router.query
  const [product, setProduct] = useState(null)

  useEffect(() => {
    if (!slug) return
    fetch(`/api/products/${slug}`)
      .then(res => res.json())
      .then(setProduct)
      .catch(console.error)
  }, [slug])

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600">Loading...</div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-lg font-semibold mb-6">${(product.price / 100).toFixed(2)}</p>

        {product.image_url && (
          <img src={product.image_url} alt={product.name} className="w-48 h-48 object-cover mx-auto rounded mb-6" />
        )}

        <form action="/api/checkout/stripe" method="POST">
          <input type="hidden" name="product_id" value={product.id} />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-5 py-2 rounded-md font-medium w-full hover:bg-indigo-700 transition"
          >
            💳 Pay with Stripe
          </button>
        </form>

        <form action="/api/checkout/paypal" method="POST" className="mt-3">
          <input type="hidden" name="product_id" value={product.id} />
          <button
            type="submit"
            className="bg-yellow-400 text-gray-800 px-5 py-2 rounded-md font-medium w-full hover:bg-yellow-500 transition"
          >
            🅿️ Pay with PayPal
          </button>
        </form>
      </div>
    </div>
  )
}

