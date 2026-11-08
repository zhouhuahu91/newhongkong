// Print Queue: the only place that writes to the `printer` collection.
//
// The app never talks to the printer directly. It writes a print job
// ({ type, printContent }) to `printer/{id}`; the external print service picks
// it up and deletes the doc when it's done. The printer handles one job at a
// time, so a new job is refused while any job is still in the collection.
import { useState, useEffect } from "react";
import { db } from "@/firebase/firebase";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  onSnapshot,
  query,
  limit,
} from "firebase/firestore";

const printerRef = () => collection(db, "printer");

// Shown when queuePrintJob() refuses a job because the printer is busy.
export const PRINTER_BUSY_MESSAGE = "Printer is bezig, probeer het zo opnieuw.";

// Queues a print job. Returns true when the job was written, false when the
// printer is still busy with another job (nothing is written then).
// `extra` adds fields to the job doc, e.g. the `table` of a kitchen ticket.
export const queuePrintJob = async (id, type, printContent, extra = {}) => {
  const waiting = await getDocs(query(printerRef(), limit(1)));
  if (!waiting.empty) return false;
  await setDoc(doc(db, "printer", id), { type, printContent, ...extra });
  return true;
};

// Removes the given jobs from the queue (the dashboard's "clear printer").
export const clearPrintJobs = (jobs) =>
  Promise.all(jobs.map((job) => deleteDoc(doc(db, "printer", job.id))));

// Live view of the queue for buttons and spinners.
//   jobs       every job in the queue
//   busy       true while any job is waiting
//   isQueued   (id) => whether a job with this id is in the queue
const usePrintQueue = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(printerRef(), (snapshot) => {
      setJobs(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsubscribe();
  }, []);

  return {
    jobs,
    busy: jobs.length > 0,
    isQueued: (id) => jobs.some((job) => job.id === id),
  };
};

export default usePrintQueue;
