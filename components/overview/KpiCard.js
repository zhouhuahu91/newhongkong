// Shows a single figure with the change compared to the previous period.
// current / previous are numbers; value is the formatted current value.
const KpiCard = ({ title, value, sub, current, previous, compareLabel }) => {
  let delta = null;
  if (previous > 0 && typeof current === "number") {
    delta = Math.round(((current - previous) / previous) * 100);
  }

  return (
    <div className="bg-white border rounded-xl shadow-sm p-4 flex flex-col">
      <span className="text-sm text-gray-500">{title}</span>
      <span className="text-2xl font-semibold mt-1 tabular-nums">{value}</span>
      {sub && <span className="text-sm text-gray-500 mt-0.5">{sub}</span>}
      <span className="text-xs mt-2">
        {delta === null ? (
          <span className="text-gray-400">— {compareLabel}</span>
        ) : (
          <span
            className={
              delta > 0
                ? "text-green-600"
                : delta < 0
                  ? "text-red-600"
                  : "text-gray-500"
            }
          >
            {delta > 0 ? "▲" : delta < 0 ? "▼" : "•"} {Math.abs(delta)}%{" "}
            <span className="text-gray-400">{compareLabel}</span>
          </span>
        )}
      </span>
    </div>
  );
};

export default KpiCard;
