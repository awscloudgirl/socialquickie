// pages/index.js
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-50 to-white text-center px-4">
      <div className="max-w-2xl">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          ⚡ <span className="text-pink-600">SocialQuickie</span>
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          Build beautiful one-page link sites for creators, freelancers, and
          small businesses — to sell digital products, collect leads, and
          promote offers in seconds.
        </p>

        <div className="flex justify-center gap-4 mb-12">
          <a
            href="/auth.html"
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow-md transition-all"
          >
            Get Started
          </a>
        </div>

        {/* Feature icons */}
        <div className="grid grid-cols-3 gap-6 text-gray-700">
          <div>
            <div className="text-2xl">💸</div>
            <p className="font-semibold mt-2">Sell</p>
            <p className="text-sm text-gray-500">Instantly accept payments via Stripe or PayPal</p>
          </div>
          <div>
            <div className="text-2xl">📧</div>
            <p className="font-semibold mt-2">Collect</p>
            <p className="text-sm text-gray-500">Grow your audience with built-in email forms</p>
          </div>
          <div>
            <div className="text-2xl">🚀</div>
            <p className="font-semibold mt-2">Promote</p>
            <p className="text-sm text-gray-500">Share your link everywhere in seconds</p>
          </div>
        </div>
      </div>

      <footer className="mt-16 text-gray-500 text-sm">
        Built with ❤️ by <span className="font-semibold text-pink-600">Bianca</span> using{" "}
        <span className="font-semibold">Next.js</span>,{" "}
        <span className="font-semibold">Supabase</span>, and{" "}
        <span className="font-semibold">Tailwind CSS</span>.
      </footer>
    </div>
  );
}