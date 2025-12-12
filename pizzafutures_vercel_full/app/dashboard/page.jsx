"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from "../../lib/supabaseClient";
import PriceChart from "../../components/PriceChart";
import SentimentCard from "../../components/SentimentCard";
import RecentPredictions from "../../components/RecentPredictions";

export default function DashboardPage() {
  const [predictions, setPredictions] = useState([]);
  const [averagePrice, setAveragePrice] = useState(null);
  const [sentiment, setSentiment] = useState(null);
  const [volume24h, setVolume24h] = useState(null);

  async function loadPredictions() {
    const { data, error } = await supabaseClient
      .from("predictions")
      .select("*")
      .order("created_at", { ascending: true });

    if (!error && data) {
      setPredictions(data);
      recalcMetrics(data);
    }
  }

  function recalcMetrics(data) {
    if (!data.length) return;

    const avg = data.reduce((sum, p) => sum + Number(p.price), 0) / data.length;
    setAveragePrice(avg.toFixed(2));

    const bullishCount = data.filter((p) => Number(p.price) > avg).length;
    const sentimentScore = Math.round((bullishCount / data.length) * 100);
    setSentiment(sentimentScore);

    const now = new Date();
    const last24h = data.filter(
      (p) => now - new Date(p.created_at) < 24 * 60 * 60 * 1000
    );
    setVolume24h(last24h.length);
  }

  useEffect(() => {
    loadPredictions();

    const channel = supabaseClient
      .channel("realtime:predictions")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "predictions" },
        (payload) => {
          setPredictions((prev) => {
            const updated = [...prev, payload.new];
            recalcMetrics(updated);
            return updated;
          });
        }
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, []);

  return (
    <main className="px-6 py-10 flex flex-col md:flex-row gap-10">
      <div className="md:w-2/3 space-y-6">
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Slice Index Chart 🍕📈</h2>
          <PriceChart predictions={predictions} />
        </div>
      </div>

      <div className="md:w-1/3 space-y-6">
        <SentimentCard
          averagePrice={averagePrice}
          sentiment={sentiment}
          volume24h={volume24h}
        />
        <RecentPredictions predictions={predictions} />
      </div>
    </main>
  );
}
