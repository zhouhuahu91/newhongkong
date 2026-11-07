import euro from "@/functions/euro";

const Row = ({ label, value, share }) => (
  <div>
    <div className="flex justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium tabular-nums">{value}</span>
    </div>
    {share !== undefined && (
      <div className="h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
        <div
          className="h-full bg-main rounded-full"
          style={{ width: `${share}%` }}
        />
      </div>
    )}
  </div>
);

// Payment method split and BTW (VAT) breakdown side by side.
const BreakdownCards = ({ totals, vat }) => {
  const pct = (x) => (totals.total ? Math.round((x / totals.total) * 100) : 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white border rounded-xl shadow-sm p-4 space-y-3">
        <h2 className="font-medium">Betaalwijze</h2>
        <Row label={`Online (${pct(totals.online)}%)`} value={euro(totals.online)} share={pct(totals.online)} />
        <Row label={`Pin (${pct(totals.card)}%)`} value={euro(totals.card)} share={pct(totals.card)} />
        <Row label={`Cash (${pct(totals.cash)}%)`} value={euro(totals.cash)} share={pct(totals.cash)} />
      </div>

      <div className="bg-white border rounded-xl shadow-sm p-4">
        <h2 className="font-medium mb-3">BTW</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500">
              <th className="text-left font-normal pb-1">Tarief</th>
              <th className="text-right font-normal pb-1">Omzet incl.</th>
              <th className="text-right font-normal pb-1">BTW</th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            <tr>
              <td className="py-1">9%</td>
              <td className="text-right">{euro(vat.low.gross)}</td>
              <td className="text-right font-medium">{euro(vat.low.tax)}</td>
            </tr>
            <tr>
              <td className="py-1">21%</td>
              <td className="text-right">{euro(vat.high.gross)}</td>
              <td className="text-right font-medium">{euro(vat.high.tax)}</td>
            </tr>
            <tr>
              <td className="py-1">0% (fooi)</td>
              <td className="text-right">{euro(vat.zero.gross)}</td>
              <td className="text-right font-medium">{euro(0)}</td>
            </tr>
            <tr className="border-t">
              <td className="pt-2 font-medium">Totaal</td>
              <td className="pt-2 text-right font-medium">
                {euro(vat.low.gross + vat.high.gross + vat.zero.gross)}
              </td>
              <td className="pt-2 text-right font-medium">
                {euro(vat.low.tax + vat.high.tax)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BreakdownCards;
