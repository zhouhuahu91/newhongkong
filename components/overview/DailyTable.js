import euro from "@/functions/euro";

const th = "px-3 py-2 font-medium text-right whitespace-nowrap";
const td = "px-3 py-2 text-right tabular-nums whitespace-nowrap";

// Table with one row per day; clicking a row opens the day view.
const DailyTable = ({ perDay, totals, onSelectDay }) => {
  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className={`${th} text-left`}>Datum</th>
            <th className={th}>Online</th>
            <th className={th}>Pin</th>
            <th className={th}>Cash</th>
            {/* Op rekening has its own payment bucket in the ledger (it used to count as online). */}
            <th className={th}>Op rek.</th>
            <th className={th}>Afhaal</th>
            <th className={th}>Restaurant</th>
            <th className={th}>Omzet</th>
            <th className={th}>Best. / Tafels</th>
          </tr>
        </thead>
        <tbody>
          {perDay.map((day) => (
            <tr
              key={day.date}
              onClick={() => onSelectDay(day)}
              className={`border-t cursor-pointer hover:bg-orange-50 ${
                day.total ? "" : "text-gray-400"
              }`}
            >
              <td className={`${td} text-left`}>
                {day.weekday && (
                  <span className="inline-block w-6 text-gray-400">
                    {day.weekday}
                  </span>
                )}
                {day.date}
              </td>
              <td className={td}>{euro(day.online)}</td>
              <td className={td}>{euro(day.card)}</td>
              <td className={td}>{euro(day.cash)}</td>
              <td className={td}>{euro(day.op_rekening)}</td>
              <td className={td}>{euro(day.takeaway)}</td>
              <td className={td}>{euro(day.restaurant)}</td>
              <td className={`${td} font-medium`}>{euro(day.total)}</td>
              <td className={td}>
                {day.orders} / {day.tables}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-50 font-medium border-t">
          <tr>
            <td className={`${td} text-left`}>Totaal</td>
            <td className={td}>{euro(totals.online)}</td>
            <td className={td}>{euro(totals.card)}</td>
            <td className={td}>{euro(totals.cash)}</td>
            <td className={td}>{euro(totals.op_rekening)}</td>
            <td className={td}>{euro(totals.takeaway)}</td>
            <td className={td}>{euro(totals.restaurant)}</td>
            <td className={td}>{euro(totals.total)}</td>
            <td className={td}>
              {totals.orders} / {totals.tables}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default DailyTable;
