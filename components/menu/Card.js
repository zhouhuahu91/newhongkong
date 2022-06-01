// Hook imports
import useI18n from "@/hooks/useI18n";
// Function imports
import euro from "@/functions/euro";

const Card = ({ item }) => {
  const t = useI18n();

  return (
    <div className="p-4 flex flex-col rounded-lg bg-white hover:shadow hover:scale-[1.04] transition-all ease-in border cursor-pointer">
      <h3 className="font-medium capitalize">{item.name[t.locale]}</h3>
      <span className="text-xs text-gray-500 block my-2 flex-grow line-clamp-2">
        {item.description[t.locale]}
      </span>
      <span className="font-medium">{euro(item.price)}</span>
    </div>
  );
};

export default Card;
