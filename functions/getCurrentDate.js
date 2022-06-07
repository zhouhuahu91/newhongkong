// This function return the current dat in EU format "01-01-2021"
const getCurrentDate = (customDate) => {
  const d = customDate || new Date();
  const date = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
  const month =
    d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
  const year = d.getFullYear();
  return `${date}-${month}-${year}`;
};

export default getCurrentDate;
