// converts seconds passed in the day to e.a. 18:00.
const getDigitalTime = (seconds) => {
  let hours = parseInt(seconds / 3600);
  let minutes = parseInt((seconds % 3600) / 60);
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${minutes}`;
};

export default getDigitalTime;
