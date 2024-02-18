// Function imports
import euro from "@/functions/euro";
// Component imports
import IconBtn from "@/components/IconBtn";
// Icon imports
import MinusIcon from "@/icons/MinusIcon";
import PlusIcon from "@/icons/PlusIcon";

const Receipt = ({ table }) => {
  return (
    <div className="p-4 flex flex-col">
      {table.beverages.map((beverage) => {
        return (
          <div className="grid grid-cols-12" key={beverage.id}>
            <div className="col-span-2 flex items-center justify-around">
              <IconBtn>
                <MinusIcon className="fill-main" />
              </IconBtn>
              <div>{beverage.qwt}</div>
              <IconBtn>
                <PlusIcon className="fill-main" />
              </IconBtn>
            </div>
            <div className="col-span-7 ml-1">{beverage.name}</div>
            <div className="col-span-3 text-right">{euro(beverage.price)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Receipt;
