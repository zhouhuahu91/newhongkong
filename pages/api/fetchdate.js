import getCurrentDate from "@/functions/getCurrentDate";

// This is a simple API that returns the current date on the server.
// I implemented this because some users might have the wrong date on their computer.
const fetchDates = (req, res) => {
  try {
    const timeZone = new Date().toLocaleString("en-Us", {
      timeZone: "Europe/Amsterdam",
    });
    const date = new Date(timeZone);
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

export default fetchDates;
