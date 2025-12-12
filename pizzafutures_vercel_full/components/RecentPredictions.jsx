export default function RecentPredictions({ predictions }) {
  const reversed = [...predictions].reverse();

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Recent Predictions</h2>
      <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
        {reversed.map((p, i) => (
          <div
            key={i}
            className="flex justify-between text-sm bg-[#2a2b2f] p-3 rounded-lg"
          >
            <span>${p.price}</span>
            <span className="text-textSecondary">
              {p.timeframe}, {p.confidence}% conf
            </span>
            <span className="text-textSecondary">
              {new Date(p.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
