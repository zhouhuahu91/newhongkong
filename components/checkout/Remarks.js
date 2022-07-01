// React imports
import { useEffect } from "react";
// Hook imports
import useI18n from "@/hooks/useI18n";
import { useCart } from "@/hooks/useCart";

const Remarks = ({ register, errors, getValues, isDirty, setValue }) => {
  const t = useI18n();
  const {
    dispatch,
    cartState: { remarks },
  } = useCart();

  useEffect(() => {
    // If form is dirty we return
    if (isDirty) return;
    // If remarks is the same as the remarks in the form we also exit the function.
    if (remarks === getValues("remarks")) return;
    // If remarks is not the same as the remarks in the cartState we set the form value to the cartState value.
    setValue("remarks", remarks);
  }, [remarks]);

  return (
    <>
      <div className="flex flex-col mt-2">
        <label htmlFor="remarks" className={`text-sm text-gray-500`}>
          {t.remarks}
        </label>
        <textarea
          {...register("remarks")}
          type="text"
          id="remarks"
          className={`h-20 appearance-none my-0.5 border rounded-lg w-full text-sm py-2 px-3 focus:outline-none red-focus-ring ${
            errors.remarks && "border-main selected"
          }`}
          onBlur={() => {
            dispatch({ type: "SET_REMARKS", payload: getValues("remarks") });
          }}
        />
        <label htmlFor="remarks" className="text-red-400 text-xs">
          {errors.remarks?.message}
        </label>
      </div>
      <div className="flex space-x-2 items-center mt-2">
        <input
          type="checkbox"
          className="form-checkbox rounded shadow-sm border-gray-300 text-main focus:ring-red-200 focus:ring-offset-0 cursor-pointer"
          placeholder="saveRemarks"
          id="saveRemarks"
          {...register("saveRemarks")}
        />
        <label
          htmlFor="saveRemarks"
          className="text-sm select-none text-gray-500"
        >
          {t.save_remarks}
        </label>
      </div>
    </>
  );
};

export default Remarks;
