export default function SentimentCard({
  averagePrice,
  sentiment,
  volume24h,
}) {
  const marketLabel =
    sentiment > 60 ? "Bullish" : sentiment < 40 ? "Bearish" : "Neutral";

  return (
    <div className="card space-y-4">
      <h2 className="text-xl font-semibold">Market Sentiment</h2>

      <div className="flex justify-between">
        <span className="text-textSecondary">Slice Index:</span>
        <span className="text-accent text-lg font-bold">
          ${averagePrice ?? "--"}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-textSecondary">Sentiment:</span>
        <span
          className={
            sentiment > 60
              ? "text-success"
              : sentiment < 40
              ? "text-danger"
              : "text-textPrimary"
          }
        >
          {marketLabel} ({sentiment ?? "--"}%)
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-textSecondary">24h Volume:</span>
        <span className="text-textPrimary">{volume24h ?? "--"}</span>
      </div>
    </div>
  );
}
