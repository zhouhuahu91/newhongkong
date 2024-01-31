// React imports
import { useEffect, useState } from "react";
// Component Imports
import Modal from "@/components/Modal";
import IconBtn from "@/components/IconBtn";
import CloseIcon from "@/icons/CloseIcon";
import DeleteIcon from "@/icons/DeleteIcon";
// Firebase imports
import { db } from "@/firebase/firebase";
import { doc, deleteDoc } from "firebase/firestore";

const PrinterModal = ({ printerModal, setPrinterModal, printJobs }) => {
  const deleteOrder = async (id) => {
    const ref = doc(db, `printer/${id}`);
    await deleteDoc(ref);
  };

  return (
    <Modal
      className="bg-white w-full max-w-xl rounded-lg mx-2 overflow-hidden"
      toggle={printerModal}
      close={() => setPrinterModal(false)}
    >
      <div>
        <div className="flex p-4 justify-between items-center border-b">
          <h1 className="font-semibold text-lg">Printer Queue</h1>
          <IconBtn onClick={() => setPrinterModal(false)}>
            <CloseIcon />
          </IconBtn>
        </div>
        <div className="p-4 bg-gray-50">
          <table className="table-auto w-full min-h-32">
            <thead className="">
              <tr>
                <th className="font-medium text-left">Type</th>
                <th className="font-medium text-left">Id</th>
                <th className="font-medium">Delete print job</th>
              </tr>
            </thead>
            <tbody>
              {printJobs.map((job) => {
                return (
                  <tr key={job.id} className={``}>
                    <td className="">{job.type}</td>
                    <td className="">{job.id}</td>
                    <td className="text-center">
                      <IconBtn onClick={() => deleteOrder(job.id)}>
                        <DeleteIcon className="fill-main" />
                      </IconBtn>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
};

export default PrinterModal;
