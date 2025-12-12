import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center px-6 py-24 text-center space-y-10">
      <section className="max-w-3xl space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Predict the Price of a Slice.
        </h1>
        <p className="text-lg md:text-xl text-textSecondary">
          PizzaFutures is the world’s first real-time pizza price prediction market.
          Track trends, forecast the Slice Index, and watch the market move with every prediction.
        </p>
      </section>

      <div className="flex flex-col md:flex-row gap-6">
        <Link
          href="/predict"
          className="px-8 py-4 rounded-xl bg-accent text-black font-semibold text-lg shadow-lg hover:bg-accent2 transition"
        >
          Make a Prediction
        </Link>

        <Link
          href="/dashboard"
          className="px-8 py-4 rounded-xl bg-surface border border-textSecondary text-textPrimary font-semibold text-lg hover:bg-[#2f3035] transition"
        >
          View the Dashboard
        </Link>
      </div>

      <section className="mt-12 max-w-2xl card">
        <h2 className="text-2xl font-semibold mb-4">
          Today’s Slice Index Snapshot 🍕📈
        </h2>
        <p className="text-textSecondary mb-4">
          Powered by real user predictions — updated live every time someone calls the next move.
        </p>
        <div className="flex justify-between text-textSecondary text-sm">
          <span>Market Sentiment:</span>
          <span className="text-accent">Bullish (61%)</span>
        </div>
        <div className="flex justify-between text-textSecondary text-sm mt-1">
          <span>24h Prediction Volume:</span>
          <span className="text-accent2">+142 entries</span>
        </div>
      </section>
    </main>
  );
}
