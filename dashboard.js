import { useEffect, useState } from "react"
import { supabase } from "../public/lib/supabaseClient"

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    file_path: "",
  })

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser()
      if (!data?.user) {
        window.location.href = "/auth.html"
      } else {
        setUser(data.user)
        loadProducts(data.user.id)
      }
    }
    getUser()
  }, [])

  async function loadProducts(userId) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
    if (error) console.error(error)
    setProducts(data || [])
  }

  async function saveProduct() {
    const { name, description, price, image_url, file_path } = form
    if (!name || !price) return alert("Please enter name and price")

    const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "")

    const { error } = await supabase.from("products").insert({
      user_id: user.id,
      name,
      description,
      price: Math.round(price * 100),
      image_url,
      file_path,
      slug,
    })

    if (error) {
      console.error(error)
      alert("❌ Failed to save product.")
    } else {
      alert("✅ Product saved!")
      setForm({ name: "", description: "", price: "", image_url: "", file_path: "" })
      loadProducts(user.id)
    }
  }

  async function logout() {
    await supabase.auth.signOut()
    window.location.href = "/auth.html"
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-4">SocialQuickie Dashboard</h1>
        {user && <p className="text-center text-gray-600 mb-6">Logged in as {user.email}</p>}

        <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-inner">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add a Product</h2>

          <input
            placeholder="Product name"
            className="w-full border p-2 mb-3 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <textarea
            placeholder="Product description"
            className="w-full border p-2 mb-3 rounded"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price (USD)"
            className="w-full border p-2 mb-3 rounded"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <input
            placeholder="Image URL (optional)"
            className="w-full border p-2 mb-3 rounded"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          />
          <input
            placeholder="File path (e.g. downloads/ebook.pdf)"
            className="w-full border p-2 mb-3 rounded"
            value={form.file_path}
            onChange={(e) => setForm({ ...form, file_path: e.target.value })}
          />

          <button
            onClick={saveProduct}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            💾 Save Product
          </button>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b pb-2">Your Products</h2>
          {!products.length && (
            <p className="text-gray-400 text-sm">No products yet. Add one above 👆</p>
          )}
          <ul className="space-y-3 text-gray-700">
            {products.map((prod) => (
              <li key={prod.id} className="p-4 bg-white shadow rounded space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{prod.name}</p>
                    <p className="text-sm text-gray-500">${(prod.price / 100).toFixed(2)}</p>
                  </div>
                  {prod.image_url && (
                    <img
                      src={prod.image_url}
                      alt={prod.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  )}
                </div>

                <div className="flex flex-col space-y-2 mt-3">
                  <a
                    href={`/link/${prod.slug}`}
                    target="_blank"
                    className="text-blue-600 underline text-sm"
                  >
                    🌐 View Public Page
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={logout}
          className="mt-8 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
        >
          🚪 Log Out
        </button>
      </div>
    </div>
  )
}