type getCurrentTimeInSecondsType = (customTime?: Date) => number;
// This functions returns the current time in seconds.
// Difference with Date.now() is that this return the current time in seconds from today not from 1970.
const getCurrentTimeInSeconds: getCurrentTimeInSecondsType = (customTime) => {
  // We can pass in a time in the past or if not provided we use the new date.
  const d: Date = customTime || new Date();
  // There are 3600 seconds in a hour.
  const hours: number = d.getHours() * 3600;
  // There are 60 seconds in a minute.
  const minutes: number = d.getMinutes() * 60;
  const seconds: number = d.getSeconds();

  // Return all seconds added up.
  return hours + minutes + seconds;
};

export default getCurrentTimeInSeconds;
