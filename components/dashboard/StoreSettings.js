// React imports
import { useState, useEffect } from "react";
// Component imports
import IconBtn from "@/components/IconBtn";
import CloseIcon from "@/icons/CloseIcon";
import CalendarIcon from "@/icons/CalendarIcon";
import StoreIcon from "@/icons/StoreIcon";
import ClockIcon from "@/icons/ClockIcon";
import PedalBikeIcon from "@/icons/PedalBikeIcon";
import SettingsIcon from "@/icons/SettingsIcon";
import Modal from "@/components/Modal";
import Switch from "@/components/Switch";
import AddEmployeeRoll from "@/components/dashboard/AddEmployeeRoll";
// Firebase imports
import { db } from "@/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
// Function imports
import getDigitalTime from "@/functions/getDigitalTime";

const StoreSettings = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [settings, setSettings] = useState([]);

  let showMondayFirst = [...settings];
  if (showMondayFirst.length) {
    showMondayFirst.push(showMondayFirst.shift());
  }

  const fetchSettings = async () => {
    const ref = doc(db, "general/settings");
    const snapshot = await getDoc(ref);
    if (snapshot.exists()) {
      const { openingHours, liveMessage } = snapshot.data();
      setSettings(openingHours);
      if (liveMessage) {
        setMessage(liveMessage);
      }
    }
  };

  const saveSettings = () => {
    const ref = doc(db, "general/settings");
    // We do this in case we leave spaces in message.
    if (!message.replace(/\s/g, "").length) {
      return updateDoc(ref, { openingHours: settings, liveMessage: "" });
    }
    updateDoc(ref, {
      openingHours: settings,
      liveMessage: message,
    });
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const getOptions = () => {
    const options = [];
    // Total seconds in a day: 24 * 60 * 60 = 86400.
    // Interval is every 30 minutes: 30 * 60 = 1800.
    // We start at 2 pm and end at 12am.
    for (let i = 50400; i <= 86400; i += 1800) {
      options.push({ name: getDigitalTime(i), value: i });
    }
    return options;
  };

  return (
    <>
      <IconBtn className="mx-2" onClick={() => setOpen(true)}>
        <SettingsIcon />
      </IconBtn>
      <Modal
        toggle={open}
        close={() => {
          fetchSettings();
          setOpen(false);
        }}
        className="bg-white max-w-md w-full rounded-lg overflow-hidden text-sm mx-2"
      >
        <div className="flex items-center justify-between p-4 shadow border-b">
          <div className="flex items-center">
            <h2 className="text-lg font-normal">Store Settings</h2>
            <AddEmployeeRoll />
          </div>
          <IconBtn
            onClick={() => {
              fetchSettings();
              setOpen(false);
            }}
          >
            <CloseIcon />
          </IconBtn>
        </div>
        <div className="p-3 bg-gray-50">
          <div className="flex">
            <div className="w-full p-0.5 flex justify-center items-center">
              <CalendarIcon />
            </div>
            <div className="w-full p-0.5 flex justify-center items-center">
              <StoreIcon />
            </div>
            <div className="w-full p-0.5 flex justify-center items-center">
              <ClockIcon />
            </div>
            <div className="w-full p-0.5 flex justify-center items-center">
              <ClockIcon />
            </div>
            <div className="w-full p-0.5 flex justify-center items-center">
              <PedalBikeIcon />
            </div>
            <div className="w-full p-0.5 flex justify-center items-center">
              <ClockIcon />
            </div>
            <div className="w-full p-0.5 flex justify-center items-center">
              <ClockIcon />
            </div>
          </div>
          {showMondayFirst.map((day) => {
            // We want to know what day it is today, makes it easier to work with.
            const today = settings[new Date().getDay()];
            return (
              <div
                key={day.name}
                className={`flex border ${
                  today.name === day.name
                    ? "selected rounded-md border-main"
                    : "border-gray-50"
                }`}
              >
                <div className="w-full p-0.5 text-center">{day.name}</div>
                <div className="w-full flex justify-center items-center">
                  <Switch
                    toggle={day.open}
                    onClick={() =>
                      setSettings((prev) =>
                        prev.map((x) => {
                          return x.name === day.name
                            ? { ...x, open: !x.open }
                            : x;
                        })
                      )
                    }
                  />
                </div>
                <div className="w-full p-0.5 text-center">
                  <select
                    value={day.openingTime}
                    onChange={(e) =>
                      setSettings((prev) =>
                        prev.map((x) => {
                          const value = parseInt(e.target.value);
                          return x.name === day.name
                            ? {
                                ...x,
                                openingTime: value,
                                startTimeDelivery:
                                  // We can't not start deliver before we open.
                                  // If start time delivery is before opening time than we set it to opening time.
                                  x.startTimeDelivery < value
                                    ? value
                                    : x.startTimeDelivery,
                              }
                            : x;
                        })
                      )
                    }
                    className={`appearance-none focus:outline-none cursor-pointer bg-gray-50`}
                  >
                    {getOptions().map((option) => {
                      return (
                        <option value={option.value} key={option.value}>
                          {option.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="w-full p-0.5 text-center">
                  <select
                    value={day.closingTime}
                    onChange={(e) =>
                      setSettings((prev) =>
                        prev.map((x) => {
                          const value = parseInt(e.target.value);
                          return x.name === day.name
                            ? {
                                ...x,
                                closingTime: value,
                                endTimeDelivery:
                                  // We can not deliver after closing time.
                                  // If end time delivery is after closing time than we set it to closing time.
                                  x.endTimeDelivery > value
                                    ? value
                                    : x.endTimeDelivery,
                              }
                            : x;
                        })
                      )
                    }
                    className={`appearance-none focus:outline-none cursor-pointer bg-gray-50`}
                  >
                    {getOptions().map((option) => {
                      return (
                        <option value={option.value} key={option.value}>
                          {option.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="w-full flex justify-center items-center">
                  <Switch
                    toggle={day.openForDelivery}
                    onClick={() =>
                      setSettings((prev) =>
                        prev.map((x) => {
                          return x.name === day.name
                            ? { ...x, openForDelivery: !x.openForDelivery }
                            : x;
                        })
                      )
                    }
                  />
                </div>
                <div className="w-full p-0.5 text-center">
                  <select
                    value={day.startTimeDelivery}
                    onChange={(e) =>
                      setSettings((prev) =>
                        prev.map((x) => {
                          return x.name === day.name
                            ? {
                                ...x,
                                startTimeDelivery: parseInt(e.target.value),
                              }
                            : x;
                        })
                      )
                    }
                    className={`appearance-none focus:outline-none cursor-pointer bg-gray-50`}
                  >
                    {getOptions().map((option) => {
                      return (
                        <option value={option.value} key={option.value}>
                          {option.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="w-full p-0.5 text-center">
                  <select
                    value={day.endTimeDelivery}
                    onChange={(e) =>
                      setSettings((prev) =>
                        prev.map((x) => {
                          return x.name === day.name
                            ? {
                                ...x,
                                endTimeDelivery: parseInt(e.target.value),
                              }
                            : x;
                        })
                      )
                    }
                    className={`appearance-none focus:outline-none cursor-pointer bg-gray-50`}
                  >
                    {getOptions().map((option) => {
                      return (
                        <option value={option.value} key={option.value}>
                          {option.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            );
          })}
          <div className="flex flex-col my-2">
            <label htmlFor="remarks" className={`text-sm text-gray-500`}>
              Banner Message
            </label>
            <textarea
              value={message}
              type="text"
              id="remarks"
              className={`h-20 appearance-none my-0.5 border rounded-lg w-full text-sm py-2 px-3 focus:outline-none red-focus-ring`}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-evenly p-4 space-x-4">
          <button
            onClick={() => {
              setOpen(false);
              fetchSettings();
            }}
            type="button"
            className="button border w-5/12"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              saveSettings();
              setOpen(false);
            }}
            type="button"
            className="button text-white bg-main w-7/12"
          >
            Save
          </button>
        </div>
      </Modal>
    </>
  );
};

export default StoreSettings;
