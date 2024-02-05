import { useState, useEffect } from "react";
// Firebase imports
import { db } from "@/firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
// Icon imports
import ReportIcon from "@/icons/ReportIcon";
import CloseIcon from "@/icons/CloseIcon";
import LoadingIcon from "@/icons/LoadingIcon";
// Component imports
import IconBtn from "@/components/IconBtn";
import Modal from "@/components/Modal";

const DailyReportModal = ({ date }) => {
  // State for opening and closing the modal
  const [open, setOpen] = useState(false);
  // We store all the orders here
  const [orders, setOrders] = useState([]);
  // Refresh is to not waste recourse. We don't need to fetch all the orders all the time.
  const [refresh, setRefresh] = useState(false);

  const fetchOrders = async () => {
    console.log("i fetched");
    const q = query(collection(db, "orders"), where("date", "==", date));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => doc.data());
    setOrders(data);
    setRefresh(false);
  };

  useEffect(() => {
    if (open && refresh) {
      fetchOrders();
    }
  }, [open, date, refresh]);

  return (
    <>
      <IconBtn onClick={() => setOpen((prev) => !prev)}>
        <ReportIcon />
      </IconBtn>
      <Modal
        toggle={open}
        close={() => setOpen(false)}
        className="bg-white max-w-md w-full rounded-lg overflow-hidden text-sm mx-2"
      >
        <div className="flex items-center justify-between p-4 shadow border-b">
          <h2 className="text-lg font-normal">Daily Report</h2>
          <IconBtn
            onClick={() => {
              setRefresh(true);
            }}
          >
            <LoadingIcon />
          </IconBtn>
        </div>
        <button>{date}</button>
      </Modal>
    </>
  );
};

export default DailyReportModal;
