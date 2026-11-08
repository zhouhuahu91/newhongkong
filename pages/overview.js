// React imports
import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/router";
// Firebase imports
import { db } from "@/firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
// Function imports
import euro from "@/functions/euro";
import getPeriodRange, { shiftDate } from "@/functions/getPeriodRange";
import { summarize } from "@/functions/ledger";
// Hook imports
import { useAuth } from "@/hooks/useAuth";
// Component imports
import Spinner from "@/components/Spinner";
import PeriodControls from "@/components/overview/PeriodControls";
import KpiCard from "@/components/overview/KpiCard";
import RevenueBars from "@/components/overview/RevenueBars";
import BreakdownCards from "@/components/overview/BreakdownCards";
import DailyTable from "@/components/overview/DailyTable";

// Firestore SDK 9.8 allows at most 10 values in an "in" query.
const IN_LIMIT = 10;

// Fetches docs by their `date` field ("dd-mm-yyyy"), the day an order or
// table belongs to. Not by `createdAt`: when staff move an order to another
// day in the dashboard only `date` changes, so querying on `createdAt` would
// still count the order on the day it was placed.
const fetchCollection = async (name, dates) => {
  const chunks = [];
  for (let i = 0; i < dates.length; i += IN_LIMIT) {
    chunks.push(dates.slice(i, i + IN_LIMIT));
  }
  const snapshots = await Promise.all(
    chunks.map((chunk) =>
      getDocs(query(collection(db, name), where("date", "in", chunk))),
    ),
  );
  return snapshots.flatMap((snapshot) => snapshot.docs.map((doc) => doc.data()));
};

const Overview = () => {
  const [view, setView] = useState("day");
  const [date, setDate] = useState(() => new Date());
  const [current, setCurrent] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Cache of fetched ranges so switching back and forth doesn't refetch.
  const cache = useRef(new Map());

  const { user } = useAuth();
  const router = useRouter();
  const allowed = !!(user && (user.admin || user.accountant));

  const period = useMemo(() => getPeriodRange(view, date), [view, date]);

  useEffect(() => {
    if (!allowed) return;
    let cancelled = false;

    const load = async (start, end, days) => {
      const key = `${start}-${end}`;
      if (cache.current.has(key)) return cache.current.get(key);
      const dates = days.map((d) => d.date);
      const [orders, tables] = await Promise.all([
        fetchCollection("orders", dates),
        fetchCollection("tables", dates),
      ]);
      const result = { orders, tables };
      // Only cache periods that are fully in the past, today keeps changing.
      if (end <= Date.now()) cache.current.set(key, result);
      return result;
    };

    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const [cur, prev] = await Promise.all([
          load(period.start, period.end, period.days),
          load(period.prevStart, period.prevEnd, period.prevDays),
        ]);
        if (cancelled) return;
        setCurrent(summarize(cur.orders, cur.tables, period.days));
        setPrevious(summarize(prev.orders, prev.tables));
      } catch (e) {
        console.log(e);
        if (!cancelled) setError("Kon de gegevens niet ophalen.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [allowed, period]);

  // Overview page is only for admins or accountants.
  if (user === null) {
    return <Spinner />;
  } else if (user === false) {
    router.push("/sign_in");
    return <Spinner />;
  } else if (!allowed) {
    router.push("/");
    return <Spinner />;
  }

  const openDay = (day) => {
    setDate(new Date(day.timestamp));
    setView("day");
  };

  const t = current?.totals;
  const p = previous?.totals;

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8 space-y-4">
      <h1 className="font-bold text-2xl">Overzicht</h1>

      <PeriodControls
        view={view}
        setView={setView}
        label={period.label}
        loading={loading}
        onPrev={() => setDate((d) => shiftDate(view, d, -1))}
        onNext={() => setDate((d) => shiftDate(view, d, 1))}
        onToday={() => setDate(new Date())}
      />

      {error && (
        <div className="rounded-lg bg-red-50 text-red-700 px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {current && (
        <div className={`space-y-4 ${loading ? "opacity-60" : ""}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              title="Omzet"
              value={euro(t.total)}
              current={t.total}
              previous={p?.total}
              compareLabel={period.compareLabel}
            />
            <KpiCard
              title="Afhaal"
              value={euro(t.takeaway)}
              sub={`${t.orders} bestellingen · gem. ${euro(current.avgOrder)}`}
              current={t.takeaway}
              previous={p?.takeaway}
              compareLabel={period.compareLabel}
            />
            <KpiCard
              title="Restaurant"
              value={euro(t.restaurant)}
              sub={`${t.tables} tafels · gem. ${euro(current.avgTable)}`}
              current={t.restaurant}
              previous={p?.restaurant}
              compareLabel={period.compareLabel}
            />
            <KpiCard
              title="Bestellingen"
              value={t.orders + t.tables}
              sub={`${t.delivery} bezorgd · ${t.orders - t.delivery} afgehaald`}
              current={t.orders + t.tables}
              previous={p ? p.orders + p.tables : 0}
              compareLabel={period.compareLabel}
            />
          </div>

          {view !== "day" && (
            <RevenueBars
              perDay={current.perDay}
              onSelectDay={openDay}
              showWeekday={view === "week"}
            />
          )}

          <BreakdownCards totals={t} vat={current.vat} />

          {view !== "day" && (
            <DailyTable
              perDay={current.perDay}
              totals={t}
              onSelectDay={openDay}
            />
          )}
        </div>
      )}

      {!current && !error && (
        <div className="h-64 relative">
          <Spinner size="small" />
        </div>
      )}
    </div>
  );
};

export default Overview;
