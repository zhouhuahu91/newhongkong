import ChevronLeftIcon from "@/icons/ChevronLeftIcon";
import ChevronRightIcon from "@/icons/ChevronRightIcon";

const VIEWS = [
  { id: "day", label: "Dag" },
  { id: "week", label: "Week" },
  { id: "month", label: "Maand" },
];

// Tabs for day / week / month plus arrows to move one period back or forward.
const PeriodControls = ({ view, setView, label, onPrev, onNext, onToday, loading }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="inline-flex self-start rounded-lg bg-gray-100 p-1">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            type="button"
            onClick={() => setView(v.id)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              view === v.id
                ? "bg-white shadow text-gray-900"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Vorige periode"
          className="p-1.5 rounded-md hover:bg-gray-100 fill-gray-700"
        >
          <ChevronLeftIcon />
        </button>
        <span className="min-w-[200px] text-center font-medium capitalize flex items-center justify-center gap-2">
          {label}
          {loading && (
            <span className="inline-block rounded-full border-gray-200 border-t-main border-2 animate-spin w-4 h-4" />
          )}
        </span>
        <button
          type="button"
          onClick={onNext}
          aria-label="Volgende periode"
          className="p-1.5 rounded-md hover:bg-gray-100 fill-gray-700"
        >
          <ChevronRightIcon />
        </button>
        <button
          type="button"
          onClick={onToday}
          className="ml-2 px-3 py-1.5 rounded-md border text-sm font-medium hover:bg-gray-50"
        >
          Vandaag
        </button>
      </div>
    </div>
  );
};

export default PeriodControls;
