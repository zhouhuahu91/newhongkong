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
        <DeleteIcon />
        verwijderen
      </button>
    );
  }

  if (mainCategory === "tafel verwijderen") {
    return (
      <>
        <h1 className="font-medium uppercase col-span-2 text-center text-xl mb-4">
          Weet je het zeker?
        </h1>
        <button
          onClick={() => {
            const ref = doc(db, `tables/${table.id}`);
            deleteDoc(ref);
          }}
          className={`h-[6.8rem] border p-4 rounded-md hover:shadow-md uppercase font-medium bg-main text-white flex items-center justify-center`}
        >
          <DeleteIcon className="fill-white mr-2" />
          verwijderen
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
