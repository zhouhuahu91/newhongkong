// THIS API IS ONLY CREATED SO THAT THE OLD VERSION OF THE WEBSITE STILL CAN FETCH DATES...
// FOR PEOPLE THAT STILL HAVE OUR SITE OPEN AND NEVER REFRESHED.

import Cors from "micro-cors";
import getCurrentDate from "@/functions/getCurrentDate";

// To allow cross origin.
const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

const fetchDates = (req, res) => {
  try {
    const time_zone = new Date().toLocaleString("en-Us", {
      timeZone: "Europe/Amsterdam",
    });
    const date = new Date(time_zone);
    const day = date.getDay();
    const currentDate = getCurrentDate(date);
    return res.status(200).json({
      dates: { currentDate, day },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ e });
  }
};

export default cors(fetchDates);
