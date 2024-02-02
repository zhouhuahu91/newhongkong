// React imports
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// Firebase imports
import { db } from "@/firebase/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
// Function imports
import euro from "@/functions/euro";
// Hook imports
import useI18n from "@/hooks/useI18n";
import { useAuth } from "@/hooks/useAuth";
// Component imports
import Spinner from "@/components/Spinner";
import MonthPicker from "@/components/MonthPicker";

const MonthlyOverview = () => {
  const [date, setDate] = useState(new Date());
  const [dailyData, setDailyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState({});

  const { user } = useAuth();
  const router = useRouter();
  const t = useI18n();

  const tdStyling = "py-2 px-4 text-center";
  const thStyling = "p-4 text-center font-medium";

  useEffect(() => {
    const y = date.getFullYear();
    const m = date.getMonth();
    // This is the first day in the selected month.
    const firstDay = new Date(y, m, 1).getTime();
    // This is the last day in the selected month.
    const lastDay = new Date(y, m + 1).getTime();

    // We subscribe to all the documents of the selected month.
    const q = query(
      collection(db, "orders"),
      where("createdAt", ">", firstDay),
      where("createdAt", "<", lastDay)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const documents = snapshot.docs.map((doc) => doc.data());
      // We check on what days there are orders in that month.
      const datesInArray = [];
      // The array that we later loop over.
      const documentsByDate = [];
      // We push in every unique date.
      documents.forEach((doc) => {
        if (!datesInArray.includes(doc.date)) datesInArray.push(doc.date);
      });
      // We sort the date by day.
      datesInArray.sort((a, b) => {
        return a.slice(0, 2) - b.slice(0, 2);
      });
      // And for each date we push in the availeble documents.
      datesInArray.forEach((date) =>
        documentsByDate.push(documents.filter((item) => item.date === date))
      );

      // For every date we accumulate the totals.
      const dailySummary = documentsByDate.map((day) => {
        // This returns total of the day.
        const total = day.reduce((x, y) => x + y.total, 0);
        // This returns total of ideal payments of the day.
        const online = day.reduce(
          (x, y) => (y.paymentMethod === "online" ? x + y.total : x),
          0
        );
        // This returns total of cahs payments of the day.
        const cash = day.reduce(
          (x, y) => (y.paymentMethodType === "cash" ? x + y.total : x),
          0
        );
        const card = day.reduce(
          (x, y) => (y.paymentMethodType === "card" ? x + y.total : x),
          0
        );
        // This returns qwt of deliveries of the day.
        const delivery = day.reduce((x, y) => (y.delivery ? x + 1 : x), 0);
        // This returns qwt of pickups of the day.
        const pickup = day.reduce((x, y) => (y.delivery ? x : x + 1), 0);
        return {
          total,
          online,
          cash,
          card,
          delivery,
          pickup,
          qwt: day.length,
          date: day[0].date,
        };
      });
      // Besides the daily summary we need a monthly summary.
      const monthlySummary = {};
      monthlySummary.total = documents.reduce((x, y) => x + y.total, 0);
      monthlySummary.online = documents.reduce(
        (x, y) => (y.paymentMethod === "online" ? x + y.total : x),
        0
      );
      monthlySummary.cash = documents.reduce(
        (x, y) => (y.paymentMethodType === "cash" ? x + y.total : x),
        0
      );
      monthlySummary.card = documents.reduce(
        (x, y) => (y.paymentMethodType === "card" ? x + y.total : x),
        0
      );
      monthlySummary.delivery = documents.reduce(
        (x, y) => (y.delivery ? x + 1 : x),
        0
      );
      monthlySummary.pickup = documents.reduce(
        (x, y) => (y.delivery ? x : x + 1),
        0
      );
      monthlySummary.qwt = documents.length;
      setDailyData(dailySummary);
      setMonthlyData(monthlySummary);
    });

    return () => unsubscribe();
  }, [date]);

  useEffect(() => {
    if (!user || (!user?.admin && !user?.accountant)) {
      router.push("/sign_in");
    }
  }, [user, router]);

  if (!user || (!user?.admin && !user?.accountant)) return <Spinner />;

  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="font-bold text-2xl text-center mt-8 mb-4">
        {t.monthly_overview}
      </h1>
      <table className="table-auto w-full text-left border shadow rounded-xl overflow-hidden min-h-[210px]">
        <thead className="border-b bg-white">
          <tr>
            <th className={thStyling}>
              <MonthPicker setDate={setDate} date={date} />
            </th>
            <th className={thStyling}>Aantal</th>
            <th className={thStyling}>Afhaal</th>
            <th className={thStyling}>Bezorgen</th>
            <th className={thStyling}>Online</th>
            <th className={thStyling}>Pin</th>
            <th className={thStyling}>Cash</th>
            <th className={thStyling}>Omzet</th>
          </tr>
        </thead>
        <tbody>
          {dailyData.map((day, idx) => {
            return (
              <tr key={day.date} className={`${idx % 2 && "bg-gray-100"}`}>
                <td className={tdStyling}>{day.date}</td>
                <td className={tdStyling}>{day.qwt}</td>
                <td className={tdStyling}>{day.pickup}</td>
                <td className={tdStyling}>{day.delivery}</td>
                <td className={tdStyling}>{euro(day.online)}</td>
                <td className={tdStyling}>{euro(day.card)}</td>
                <td className={tdStyling}>{euro(day.cash)}</td>
                <td className={tdStyling}>{euro(day.total)}</td>
              </tr>
            );
          })}
        </tbody>
        <thead className="border-t bg-white">
          <tr>
            <th className={thStyling}>Totaal</th>
            <th className={thStyling}>{monthlyData.qwt}</th>
            <th className={thStyling}>{monthlyData.pickup}</th>
            <th className={thStyling}>{monthlyData.delivery}</th>
            <th className={thStyling}>{euro(monthlyData.online)}</th>
            <th className={thStyling}>{euro(monthlyData.card)}</th>
            <th className={thStyling}>{euro(monthlyData.cash)}</th>
            <th className={thStyling}>{euro(monthlyData.total)}</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default MonthlyOverview;
