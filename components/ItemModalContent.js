// Hook imports
import useI18n from "@/hooks/useI18n";
// Component imports
import IconButton from "@/components/IconButton";
import ToolTip from "@/components/ToolTip";
import ItemOptionsComponent from "@/components/ItemOptionsComponent";

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
  // t is used for translations.
  const t = useI18n();
  return (
    <>
      {/* Container for the title */}
      <div className="p-4 flex justify-between items-center shadow border-b">
        <h1 className="text-xl font-semibold">{item.name[t.locale]}</h1>
        <IconButton variant="close" onClick={() => setOpen(false)} />
      </div>
      {/* Container for the information and options. */}
      <div
        style={{ maxHeight: "calc(100vh - 185px)" }}
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
                    <Tooltip tip={menuItem.description[t.locale]} />
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
            <label
              htmlFor="itemRemarks"
              className={`text-xs ${
                errors.remarks ? "text-red-400" : "text-gray-500"
              }`}
            >
              {errors.remarks ? t.remarks_max : t.remarks}
            </label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows="3"
              id="itemRemarks"
              className="appearance-none border w-full focus:outline-none py-2 px-3 rounded-lg text-sm focus:shadow hover:shadow transition-shadow"
            />
          </div>
        </div>
        <div className="flex items-center justify-evenly relative h-8">
          <IconButton
            onClick={() => setQwt((qwt) => (qwt > 1 ? qwt - 1 : qwt))}
            variant="remove_circle_outline"
            color="main"
          />
          <div className="text-2xl font-semibold absolute">{qwt}</div>
          <IconButton
            onClick={() => setQwt((qwt) => qwt + 1)}
            variant="add_circle_outline"
            color="main"
          />
        </div>
      </div>
    </>
  );
};

export default ItemModalContent;
