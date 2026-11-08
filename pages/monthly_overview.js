// React imports
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// Firebase imports
import { db } from "@/firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
// Function imports
import euro from "@/functions/euro";
import { summarize } from "@/functions/ledger";
// Hook imports
import { useAuth } from "@/hooks/useAuth";
// Component imports
import Spinner from "@/components/Spinner";
import MonthPicker from "@/components/MonthPicker";

const MonthlyOverview = () => {
  const [date, setDate] = useState(new Date());
  // Data for orders
  const [dailyData, setDailyData] = useState(null);
  const [monthlyData, setMonthlyData] = useState({
    total: 0,
    cash: 0,
    card: 0,
    online: 0,
    op_rekening: 0,
  });
  // Data for tables
  const [tableData, setTableData] = useState(null);
  const [monthlyTableData, setMonthlyTableData] = useState({
    total: 0,
    cash: 0,
    card: 0,
  });
  // Combined data
  const [combined, setCombined] = useState([]);

  const { user } = useAuth();
  const router = useRouter();

  const y = date.getFullYear();
  const m = date.getMonth();
  // This is the first day in the selected month.
  const firstDay = new Date(y, m, 1).getTime();
  // This is the last day in the selected month.
  const lastDay = new Date(y, m + 1).getTime();

  const tdStyling = "py-2 px-4 text-center";
  const thStyling = "p-4 text-center font-medium";

  const fetchOrders = async () => {
    // We subscribe to all the documents of the selected month.
    const q = query(
      collection(db, "orders"),
      where("createdAt", ">", firstDay),
      where("createdAt", "<", lastDay),
    );

    const snapshot = await getDocs(q);
    const raw = snapshot.docs.map((doc) => doc.data());
    // Raw order docs; summarize() filters countable orders and splits the payments.
    setDailyData(raw);
  };

  const fetchTables = async () => {
    const q = query(
      collection(db, "tables"),
      where("createdAt", ">", firstDay),
      where("createdAt", "<", lastDay),
    );
    const snapshot = await getDocs(q);
    const raw = snapshot.docs.map((doc) => doc.data());
    // Raw table docs; summarize() filters paid tables and calculates their totals.
    setTableData(raw);
  };

  useEffect(() => {
    setDailyData(null);
    setMonthlyData({ total: 0, cash: 0, card: 0, online: 0, op_rekening: 0 });
    setTableData(null);
    setMonthlyTableData({ total: 0, cash: 0, card: 0 });
    setCombined(null);
    fetchTables();
    fetchOrders();
  }, [date]);

  useEffect(() => {
    if (dailyData === null || tableData === null) return;
    // summarize() keeps countable orders and paid tables, groups them per day
    // (by the order's date field) and splits cash / pin / online / op rekening.
    const summary = summarize(dailyData, tableData);
    setCombined(
      summary.perDay.map((day) => ({
        date: day.date,
        total: day.takeaway,
        totalTables: day.restaurant,
        cash: day.cash,
        card: day.card,
        online: day.online,
        op_rekening: day.op_rekening,
      })),
    );
    setMonthlyData({
      total: summary.totals.takeaway,
      online: summary.payments.takeaway.online,
      cash: summary.payments.takeaway.cash,
      card: summary.payments.takeaway.card,
      op_rekening: summary.payments.takeaway.op_rekening,
    });
    setMonthlyTableData({
      total: summary.totals.restaurant,
      cash: summary.payments.restaurant.cash,
      card: summary.payments.restaurant.card,
    });
  }, [dailyData, tableData]);

  // Overview page is only for admins or accountant
  // If user not fetched we show spinner
  // If there is no user we rerout to sign in
  // if there is a user but not an admin or accountant we rerout to home page.
  if (user === null) {
    return <Spinner />;
  } else if (user === false) {
    router.push("/sign_in");
    return <Spinner />;
  } else if (!user?.admin && !user?.accountant) {
    router.push("/");
    return <Spinner />;
  }

  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="font-bold text-2xl text-center mt-8 mb-4">
        Overzicht afhaal
      </h1>
      <table className="table-auto w-full text-left border shadow rounded-xl overflow-hidden min-h-[210px]">
        <thead className="border-b bg-white">
          <tr>
            <th className={thStyling}>
              <div className="flex items-center">
                <MonthPicker setDate={setDate} date={date} />
                {combined === null && (
                  <div
                    className={`rounded-full border-white border-t-main border-2 animate-spin w-5 h-5`}
                  />
                )}
              </div>
            </th>
            <th className={thStyling}>Online</th>
            <th className={thStyling}>Pin</th>
            <th className={thStyling}>Cash</th>
            {/* Op rekening has its own payment bucket in the ledger (it used to count as online). */}
            <th className={thStyling}>Op rekening</th>
            <th className={thStyling}>Afhaal</th>
            <th className={thStyling}>Restaurant</th>
            <th className={thStyling}>Omzet</th>
          </tr>
        </thead>
        <tbody className="min-h-40">
          {combined !== null ? (
            combined.map((day, idx) => {
              return (
                <tr key={day.date} className={`${idx % 2 && "bg-gray-100"}`}>
                  <td className={tdStyling}>{day.date}</td>
                  <td className={tdStyling}>{euro(day.online)}</td>
                  <td className={`${tdStyling}`}>{euro(day.card)}</td>
                  <td className={`${tdStyling}`}>{euro(day.cash)}</td>
                  <td className={`${tdStyling}`}>{euro(day.op_rekening)}</td>
                  <td className={`${tdStyling}`}>{euro(day.total)}</td>
                  <td className={`${tdStyling}`}>{euro(day.totalTables)}</td>
                  <td className={`${tdStyling}`}>
                    {euro(day.totalTables + day.total)}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="">
              <td className="h-16" />
            </tr>
          )}
        </tbody>
        <thead className="border-t bg-white">
          <tr>
            <th className={thStyling}>Totaal</th>
            <th className={thStyling}>{euro(monthlyData.online)}</th>
            <th className={`${thStyling}`}>
              {euro(monthlyData.card + monthlyTableData.card)}
            </th>
            <th className={`${thStyling}`}>
              {euro(monthlyData.cash + monthlyTableData.cash)}
            </th>
            <th className={`${thStyling}`}>{euro(monthlyData.op_rekening)}</th>
            <th className={`${thStyling}`}>{euro(monthlyData.total)}</th>
            <th className={`${thStyling}`}>{euro(monthlyTableData.total)}</th>
            <th className={`${thStyling}`}>
              {euro(monthlyTableData.total + monthlyData.total)}
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default MonthlyOverview;
