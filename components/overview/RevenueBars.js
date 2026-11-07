import euro from "@/functions/euro";

// Stacked bar per day: take-away (main color) on top of restaurant (gray).
const RevenueBars = ({ perDay, onSelectDay, showWeekday }) => {
  const max = Math.max(...perDay.map((d) => d.total), 1);

  return (
    <div className="bg-white border rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-medium">Omzet per dag</h2>
        <div className="flex gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm bg-main" /> Afhaal
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm bg-slate-400" /> Restaurant
          </span>
        </div>
      </div>
      <div className="flex items-end gap-[2px] sm:gap-1 h-48">
        {perDay.map((day) => (
          <button
            key={day.date}
            type="button"
            onClick={() => onSelectDay(day)}
            title={`${day.date}\nAfhaal: ${euro(day.takeaway)}\nRestaurant: ${euro(
              day.restaurant,
            )}\nTotaal: ${euro(day.total)}`}
            className="group flex-1 h-full flex flex-col justify-end min-w-0"
          >
            <div
              className="w-full bg-main rounded-t-sm group-hover:opacity-80"
              style={{ height: `${(day.takeaway / max) * 100}%` }}
            />
            <div
              className={`w-full bg-slate-400 group-hover:opacity-80 ${
                day.takeaway ? "" : "rounded-t-sm"
              }`}
              style={{ height: `${(day.restaurant / max) * 100}%` }}
            />
          </button>
        ))}
      </div>
      <div className="flex gap-[2px] sm:gap-1 mt-1">
        {perDay.map((day) => (
          <span
            key={day.date}
            className="flex-1 min-w-0 text-center text-[10px] sm:text-xs text-gray-500"
          >
            {showWeekday ? day.weekday : day.dayOfMonth}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RevenueBars;
