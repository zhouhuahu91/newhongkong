const getFullDate = (date) => {
  const now = date ? date : new Date();

  return now.toLocaleDateString("nl-NL", {
    weekday: "long", // full name of the day of the week
    day: "numeric", // numeric day of the month
    month: "long", // full name of the month
  });
};

export default getFullDate;
