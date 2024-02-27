// React imports
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// Firebase imports
import { db } from "@/firebase/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
// Function imports
import euro from "@/functions/euro";
import calculateTableTotal from "@/functions/calculateTableTotal";
// Hook imports
import { useAuth } from "@/hooks/useAuth";
// Component imports
import Spinner from "@/components/Spinner";
import MonthPicker from "@/components/MonthPicker";

const MonthlyOverview = () => {
  const [date, setDate] = useState(new Date());
  // Data for orders
  const [dailyData, setDailyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState({});
  // Data for tables
  const [tableData, setTableData] = useState([]);
  const [monthlyTableData, setMonthlyTableData] = useState({});

  const { user } = useAuth();
  const router = useRouter();

  // Is the day that we use the website to store all take away orders.
  const midnightFeb5_2024 = new Date("2024-02-05T00:00:00").getTime();
  const midnightFeb23_2024 = new Date("2024-02-23T00:00:00").getTime();

  const tdStyling = "py-2 px-4 text-center";
  const thStyling = "p-4 text-center font-medium";

  const sortDocsByDate = (documents) => {
    // We check on what days there are  in that month.
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

    return documentsByDate;
  };

  // We need to merge dailies from tables and take aways
  const mergeDailies = () => {
    // Combine the arrays
    const combined = dailyData.concat(tableData);

    combined.sort((a, b) => {
      return a.date.slice(0, 2) - b.date.slice(0, 2);
    });

    // Create an object to hold the sums of totals for each id
    const sums = {};

    // Iterate through the combined array
    combined.forEach((item) => {
      if (sums[item.date]) {
        // If the id exists, add the total
        if (item.total && !item.table) {
          sums[item.date].total += item.total;
        }
        if (item.total && item.table) {
          sums[item.date].totalTables += item.total;
        }

        if (item.cash) {
          sums[item.date].cash += item.cash;
        }
        if (item.card) {
          sums[item.date].card += item.card;
        }
        if (item.online) {
          sums[item.date].online += item.online;
        }
      } else {
        // Otherwise, create a new entry with the id and total
        sums[item.date] = {
          total: item.total && !item.table ? item.total : 0,
          totalTables: item.total && item.table ? item.total : 0,
          cash: item.cash ? item.cash : 0,
          card: item.card ? item.card : 0,
          online: item.online ? item.online : 0,
          createdAt: item.createdAt,
        };
      }
    });

    // Convert the sums object back into an array of objects
    const result = Object.keys(sums).map((date) => ({
      date: date,
      total: sums[date].total,
      cash: sums[date].cash,
      card: sums[date].card,
      online: sums[date].online,
      totalTables: sums[date].totalTables,
      createdAt: sums[date].createdAt,
    }));

    return result;
  };

  const all = mergeDailies();

  useEffect(() => {
    const y = date.getFullYear();
    const m = date.getMonth();
    // This is the first day in the selected month.
    const firstDay = new Date(y, m, 1).getTime();
    // This is the last day in the selected month.
    const lastDay = new Date(y, m + 1).getTime();

    const qTables = query(
      collection(db, "tables"),
      where("createdAt", ">", firstDay),
      where("createdAt", "<", lastDay)
    );

    const unsubscribeTables = onSnapshot(qTables, (snapshot) => {
      const documents = snapshot.docs.map((doc) => doc.data());
      const documentsWithTotal = documents.map((doc) => {
        return {
          ...doc,
          total: calculateTableTotal(doc),
        };
      });
      const data = sortDocsByDate(documentsWithTotal);

      const dailySummaryTables = data.map((day) => {
        const total = day.reduce((x, y) => x + y.total, 0);

        const cash = day.reduce(
          (x, y) => (y.paymentMethodType === "cash" ? x + y.total : x),
          0
        );

        const card = day.reduce(
          (x, y) => (y.paymentMethodType === "card" ? x + y.total : x),
          0
        );

        return {
          table: true,
          total,
          cash,
          card,
          date: day[0].date,
          createdAt: day[0].createdAt,
        };
      });

      // Besides the daily summary we need a monthly summary.
      const monthlySummaryTables = {};
      monthlySummaryTables.total = documentsWithTotal.reduce(
        (x, y) => x + y.total,
        0
      );
      monthlySummaryTables.cash = documentsWithTotal.reduce(
        (x, y) => (y.paymentMethodType === "cash" ? x + y.total : x),
        0
      );
      monthlySummaryTables.card = documentsWithTotal.reduce(
        (x, y) => (y.paymentMethodType === "card" ? x + y.total : x),
        0
      );

      setTableData(dailySummaryTables);
      setMonthlyTableData(monthlySummaryTables);
    });

    // We subscribe to all the documents of the selected month.
    const q = query(
      collection(db, "orders"),
      where("createdAt", ">", firstDay),
      where("createdAt", "<", lastDay)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const documents = snapshot.docs.map((doc) => doc.data());

      const data = sortDocsByDate(documents);

      // For every date we accumulate the totals.
      const dailySummary = data.map((day) => {
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
          (x, y) =>
            y.paymentMethodType === "card" && y.paymentMethod === "in_person"
              ? x + y.total
              : x,
          0
        );
        return {
          total,
          online,
          cash,
          card,
          date: day[0].date,
          createdAt: day[0].createdAt,
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
        (x, y) =>
          y.paymentMethodType === "card" && y.paymentMethod === "in_person"
            ? x + y.total
            : x,
        0
      );
      setDailyData(dailySummary);
      setMonthlyData(monthlySummary);
    });

    return () => {
      unsubscribeTables();
      unsubscribe();
    };
  }, [date]);

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
              <MonthPicker setDate={setDate} date={date} />
            </th>
            <th className={thStyling}>Online</th>
            <th className={thStyling}>Pin</th>
            <th className={thStyling}>Cash</th>
            <th className={thStyling}>Afhaal</th>
            <th className={thStyling}>Restaurant</th>
            <th className={thStyling}>Omzet</th>
          </tr>
        </thead>
        <tbody>
          {all.map((day, idx) => {
            return (
              <tr key={day.date} className={`${idx % 2 && "bg-gray-100"}`}>
                <td className={tdStyling}>{day.date}</td>
                <td className={tdStyling}>{euro(day.online)}</td>
                <td
                  className={`${tdStyling} ${
                    midnightFeb5_2024 > day.createdAt
                      ? "text-red-700 line-through"
                      : ""
                  }`}
                >
                  {euro(day.card)}
                </td>
                <td
                  className={`${tdStyling} ${
                    midnightFeb5_2024 > day.createdAt
                      ? "text-red-700 line-through"
                      : ""
                  }`}
                >
                  {euro(day.cash)}
                </td>
                <td
                  className={`${tdStyling} ${
                    midnightFeb5_2024 > day.createdAt
                      ? "text-red-700 line-through"
                      : ""
                  }`}
                >
                  {euro(day.total)}
                </td>
                <td
                  className={`${tdStyling} ${
                    midnightFeb23_2024 > day.createdAt
                      ? "text-red-700 line-through"
                      : ""
                  }`}
                >
                  {euro(day.totalTables)}
                </td>
                <td
                  className={`${tdStyling} ${
                    midnightFeb23_2024 > day.createdAt
                      ? "text-red-700 line-through"
                      : ""
                  }`}
                >
                  {euro(day.totalTables + day.total)}
                </td>
              </tr>
            );
          })}
        </tbody>
        <thead className="border-t bg-white">
          <tr>
            <th className={thStyling}>Totaal</th>
            <th className={thStyling}>{euro(monthlyData.online)}</th>
            <th
              className={`${thStyling} ${
                midnightFeb5_2024 + 432000000 > new Date(date).getTime()
                  ? "text-red-700 line-through"
                  : ""
              }`}
            >
              {euro(monthlyData.card + monthlyTableData.card)}
            </th>
            <th
              className={`${thStyling} ${
                midnightFeb5_2024 + 432000000 > new Date(date).getTime()
                  ? "text-red-700 line-through"
                  : ""
              }`}
            >
              {euro(monthlyData.cash + monthlyTableData.cash)}
            </th>
            <th
              className={`${thStyling} ${
                midnightFeb5_2024 + 432000000 > new Date(date).getTime()
                  ? "text-red-700 line-through"
                  : ""
              }`}
            >
              {euro(monthlyData.total)}
            </th>
            <th
              className={`${thStyling} ${
                midnightFeb5_2024 + 432000000 > new Date(date).getTime()
                  ? "text-red-700 line-through"
                  : ""
              }`}
            >
              {euro(monthlyTableData.total)}
            </th>
            <th
              className={`${thStyling} ${
                midnightFeb5_2024 + 432000000 > new Date(date).getTime()
                  ? "text-red-700 line-through"
                  : ""
              }`}
            >
              {euro(monthlyTableData.total + monthlyData.total)}
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default MonthlyOverview;
