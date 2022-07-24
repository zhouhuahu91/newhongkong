// Hook imports
import useI18n from "@/hooks/useI18n";
// Component imports
import IconBtn from "@/components/IconBtn";
import FavoriteIcon from "@/icons/FavoriteIcon";
import CloseIcon from "@/icons/CloseIcon";
import MinusIcon from "@/icons/MinusIcon";
import PlusIcon from "@/icons/PlusIcon";
import ToolTip from "@/components/ToolTip";
import ItemOptionsComponent from "@/components/ItemOptionsComponent";
// Hook imports
import { useMenu } from "@/hooks/useMenu";

const ItemModalContent = ({
  item,
  setOpen,
  errors,
  setErrors,
  selectedOptions,
  setSelectedOptions,
  selectedSides,
  setSelectedSides,
  remarks,
  setRemarks,
  qwt,
  setQwt,
}) => {
  const t = useI18n();
  const { toggleFavorite, favoritesID } = useMenu();

  return (
    <>
      {/* Container for the title */}
      <div className="p-4 flex justify-between items-center shadow border-b">
        <div className="flex items-center">
          <h1
            tabIndex="0"
            className="text-lg capitalize font-semibold mr-2 focus:outline-none"
          >
            {item.name[t.locale]}
          </h1>
          <IconBtn onClick={() => toggleFavorite(item.id)}>
            <FavoriteIcon
              className="fill-main"
              filled={favoritesID.includes(item.id)}
            />
          </IconBtn>
        </div>
        <IconBtn onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconBtn>
      </div>
      {/* Container for the information and options. */}
      <div
        style={{ maxHeight: "calc(100vh - 265px)" }}
        className="p-4 bg-neutral-50 flex-grow overflow-auto"
      >
        <h2>{item.description[t.locale]}</h2>
        {/* Container for increment and decrement */}
        <div className="my-2">
          {/* If the item is a menu it most likely contains a list of items they get. */}
          {item.menuList && (
            <>
              {item.menuList.map((menuItem, idx) => (
                <div className="flex space-x-1 items-center" key={idx}>
                  <span>• {menuItem.name[t.locale]}</span>
                  {menuItem.description && (
                    <ToolTip tip={menuItem.description[t.locale]} />
                  )}
                </div>
              ))}
            </>
          )}
        </div>
        <div className="my-2">
          {item.options && (
            <ItemOptionsComponent
              options={item.options}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              qwtOptions={item.totalOptions || 1}
              errors={errors.options}
              resetErrors={() => {
                setErrors((prev) => ({
                  ...prev,
                  options: false,
                }));
              }}
            />
          )}
          {item.sides && (
            <ItemOptionsComponent
              options={item.sides}
              selectedOptions={selectedSides}
              setSelectedOptions={setSelectedSides}
              qwtOptions={item.totalSides || 1}
              errors={errors.sides}
              resetErrors={() => {
                setErrors((prev) => ({
                  ...prev,
                  sides: false,
                }));
              }}
            />
          )}
          <div className="">
            <label htmlFor="itemRemarks" className={`text-sm text-gray-500`}>
              {t.remarks}
            </label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows="3"
              id="itemRemarks"
              className={`appearance-none border w-full red-focus-ring py-2 px-3 rounded-md text-sm ${
                errors.remarks && "border-main selected"
              }`}
            />
            <label htmlFor="itemRemarks" className={`text-sm text-red-400`}>
              {errors.remarks && t.remarks_max}
            </label>
          </div>
        </div>
        <div className="flex items-center justify-evenly relative h-8">
          <IconBtn onClick={() => setQwt((qwt) => (qwt > 1 ? qwt - 1 : qwt))}>
            <MinusIcon className="fill-main" />
          </IconBtn>
          <div className="text-2xl font-semibold absolute">{qwt}</div>
          <IconBtn onClick={() => setQwt((qwt) => qwt + 1)}>
            <PlusIcon className="fill-main" />
          </IconBtn>
        </div>
      </div>
    </>
  );
};

export default ItemModalContent;
