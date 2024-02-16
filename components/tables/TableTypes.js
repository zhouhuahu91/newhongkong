// Firebase imports
import { db } from "@/firebase/firebase";
import { updateDoc, doc } from "firebase/firestore";

const TableTypes = ({
  table,
  sizes,
  mainCategory,
  setMainCategory,
  buttonStyle,
}) => {
  // If there is no main category selected we just return the button for table types.
  if (mainCategory === false) {
    return (
      <button
        onClick={() => setMainCategory("tafeltype")}
        type="button"
        className={buttonStyle}
      >
        tafeltype
      </button>
    );
  }
  if (mainCategory === "tafeltype") {
    return (
      <>
        {Object.keys(sizes).map((size, idx) => {
          return (
            <div
              key={idx}
              className="flex items-center justify-center col-span-1 m-4"
            >
              <button
                onClick={() => {
                  const ref = doc(db, `tables/${table.id}`);
                  updateDoc(ref, {
                    type: size,
                  });
                }}
                type="button"
                className={`${sizes[size]} bg-white border shadow-md ${
                  table.type === size ? "border-red-200 border-4" : ""
                }`}
              />
            </div>
          );
        })}
      </>
    );
  }
};

export default TableTypes;
