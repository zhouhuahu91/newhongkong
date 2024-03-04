import DeleteIcon from "@/icons/DeleteIcon";

// Firebase imports
import { db } from "@/firebase/firebase";
import { doc, deleteDoc } from "firebase/firestore";

const DeleteTable = ({ table, mainCategory, setMainCategory, buttonStyle }) => {
  if (mainCategory === false) {
    return (
      <button
        onClick={() => {
          setMainCategory("tafel verwijderen");
        }}
        type="button"
        className={`${buttonStyle} flex items-center justify-center gap-2`}
      >
        <DeleteIcon size="20" className="fill-inherit" />
        verwijderen
      </button>
    );
  }

  if (mainCategory === "tafel verwijderen") {
    return (
      <>
        <h1 className="col-span-2 text-center text-base mb-4">
          Weet je het zeker?
        </h1>
        <button
          onClick={() => {
            const ref = doc(db, `tables/${table.id}`);
            deleteDoc(ref);
          }}
          className={`h-20 border text-base p-4 rounded-md font-medium bg-main text-white flex items-center justify-center hover:shadow hover:scale-[1.04] red-focus-ring`}
        >
          <DeleteIcon className="fill-white mr-2" />
          Verwijderen
        </button>
        <button
          onClick={() => setMainCategory(false)}
          className={`${buttonStyle}`}
        >
          annuleren
        </button>
      </>
    );
  }
};

export default DeleteTable;
