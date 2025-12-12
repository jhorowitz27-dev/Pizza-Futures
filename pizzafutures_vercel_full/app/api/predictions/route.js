import { supabaseAdmin } from "../../../lib/supabaseAdmin";

const timeframeWeights = {
  "24h": 1.0,
  "3d": 0.9,
  "7d": 0.75,
  "14d": 0.5,
  "30d": 0.35,
  "90d": 0.2,
};

const timeframeToMs = {
  "24h": 24 * 60 * 60 * 1000,
  "3d": 3 * 24 * 60 * 60 * 1000,
  "7d": 7 * 24 * 60 * 60 * 1000,
  "14d": 14 * 24 * 60 * 60 * 1000,
  "30d": 30 * 24 * 60 * 60 * 1000,
  "90d": 90 * 24 * 60 * 60 * 1000,
};

function applyRangeFilter(data, range) {
  const now = Date.now();
  const cutoff = now - timeframeToMs[range];
  return data.filter((p) => new Date(p.created_at).getTime() >= cutoff);
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const range = searchParams.get("range");
    const since = searchParams.get("since");
    const limit = searchParams.get("limit");
    const raw = searchParams.get("raw") === "true";

    let query = supabaseAdmin.from("predictions").select("*");

    if (limit) query = query.limit(Number(limit));

    let { data: rows, error } = await query;
    if (error) throw error;

    if (!rows.length) {
      return Response.json({
        sliceIndexPrice: null,
        sliceIndexNormalized: 100,
        marketSentiment: 0,
        volume24h: 0,
        historical: [],
        raw: raw ? [] : undefined,
      });
    }

    if (since) {
      const sinceDate = new Date(since).getTime();
      rows = rows.filter((p) => new Date(p.created_at).getTime() >= sinceDate);
    }

    if (range && timeframeToMs[range]) {
      rows = applyRangeFilter(rows, range);
    }

    let weightedSum = 0;
    let weightTotal = 0;

    for (const p of rows) {
      const price = Number(p.price);
      const conf = Number(p.confidence);
      const timeframe = p.timeframe;

      const confidenceWeight = 0.5 + conf / 200;
      const timeframeWeight = timeframeWeights[timeframe] || 1;
      const totalWeight = confidenceWeight * timeframeWeight;

      weightedSum += price * totalWeight;
      weightTotal += totalWeight;
    }

    const sliceIndexPrice = weightedSum / weightTotal;
    const baseline = 100;
    const sliceIndexNormalized =
      (sliceIndexPrice / Number(rows[0].price)) * baseline;

    const now = Date.now();
    const volume24h = rows.filter(
      (p) => now - new Date(p.created_at).getTime() < 24 * 60 * 60 * 1000
    ).length;

    const bullish = rows.filter((p) => Number(p.price) > sliceIndexPrice).length;
    const marketSentiment = Math.round((bullish / rows.length) * 100);

    const historical = rows.map((r) => ({
      t: r.created_at,
      price: Number(r.price),
      confidence: Number(r.confidence),
      timeframe: r.timeframe,
    }));

    return Response.json({
      sliceIndexPrice: Number(sliceIndexPrice.toFixed(2)),
      sliceIndexNormalized: Number(sliceIndexNormalized.toFixed(2)),
      marketSentiment,
      volume24h,
      historical,
      raw: raw ? rows : undefined,
    });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { price, timeframe, confidence } = body;

    if (!price || !timeframe || confidence === undefined) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from("predictions").insert([
      { price, timeframe, confidence },
    ]);
    if (error) throw error;

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
