// Function imports
import euro from "@/functions/euro";
// Component imports
import IconBtn from "@/components/IconBtn";
// Icon imports
import MinusIcon from "@/icons/MinusIcon";
import PlusIcon from "@/icons/PlusIcon";

const Receipt = ({
  table,
  incrementBeverage,
  decrementBeverage,
  incrementDish,
  decrementDish,
}) => {
  return (
    <div className="p-4 flex flex-col uppercase text-lg">
      <div>
        {table.food.map((dish) => {
          return (
            <div className="grid grid-cols-12" key={dish.id}>
              <div className="col-span-2 flex items-center justify-center">
                <IconBtn onClick={() => decrementDish(dish)}>
                  <MinusIcon size="18" className="fill-main" />
                </IconBtn>
                <div className="mx-2">{dish.qwt}</div>
                <IconBtn onClick={() => incrementDish(dish)}>
                  <PlusIcon size="18" className="fill-main" />
                </IconBtn>
              </div>
              <div className="col-span-7 ml-1">{dish.name.nl}</div>
              <div className="col-span-3 text-right">{euro(dish.price)}</div>
              <div className="col-span-2" />
              <div className="col-span-7 ml-1 -mt-2 text-xs">
                {dish.description}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4">
        {table.beverages.map((beverage) => {
          return (
            <div className="grid grid-cols-12" key={beverage.id}>
              <div className="col-span-2 flex items-center justify-center">
                <IconBtn onClick={() => decrementBeverage(beverage)}>
                  <MinusIcon size="18" className="fill-main" />
                </IconBtn>
                <div className="mx-2">{beverage.qwt}</div>
                <IconBtn onClick={() => incrementBeverage(beverage)}>
                  <PlusIcon size="18" className="fill-main" />
                </IconBtn>
              </div>
              <div className="col-span-7 ml-1">{beverage.name}</div>
              <div className="col-span-3 text-right">
                {euro(beverage.price)}
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-right border-t pt-2 mt-2">totaal: € 100,00</div>
    </div>
  );
};

export default Receipt;
