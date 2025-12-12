"use client";

import { useState } from "react";
import { supabaseClient } from "../../lib/supabaseClient";

export default function PredictPage() {
  const [price, setPrice] = useState("");
  const [timeframe, setTimeframe] = useState("24h");
  const [confidence, setConfidence] = useState(50);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const timeframes = [
    { label: "24 hours", value: "24h" },
    { label: "3 days", value: "3d" },
    { label: "7 days", value: "7d" },
    { label: "14 days", value: "14d" },
    { label: "30 days", value: "30d" },
    { label: "90 days", value: "90d" }
  ];

  async function submitPrediction(e) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabaseClient.from("predictions").insert([
      {
        price: Number(price),
        timeframe,
        confidence: Number(confidence),
      }
    ]);

    setLoading(false);

    if (!error) {
      setSubmitted(true);
      setPrice("");
      setConfidence(50);
      setTimeframe("24h");
    }
  }

  return (
    <main className="px-6 py-16 max-w-xl mx-auto space-y-10">
      <h1 className="text-4xl font-bold text-center">
        Make a Prediction 🍕📈
      </h1>

      {!submitted && (
        <form onSubmit={submitPrediction} className="card space-y-6">
          <div>
            <label className="block mb-2 text-textSecondary">
              Predicted Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-3 bg-surface border border-textSecondary rounded-lg focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block mb-2 text-textSecondary">Timeframe</label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="w-full px-4 py-3 bg-surface border border-textSecondary rounded-lg"
            >
              {timeframes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-textSecondary">
              Confidence: {confidence}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={confidence}
              onChange={(e) => setConfidence(e.target.value)}
              className="w-full accent-accent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-accent text-black font-semibold text-lg shadow-lg hover:bg-accent2 transition"
          >
            {loading ? "Submitting..." : "Submit Prediction"}
          </button>
        </form>
      )}

      {submitted && (
        <div className="card text-center space-y-4">
          <h2 className="text-2xl font-semibold">Prediction Submitted!</h2>
          <p className="text-textSecondary">
            Your forecast is now part of the Slice Index.
            Check out the dashboard to see how the market reacts.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-3 rounded-xl bg-surface border border-textSecondary hover:bg-[#2f3035] transition"
          >
            Make Another Prediction
          </button>
        </div>
      )}
    </main>
  );
}
