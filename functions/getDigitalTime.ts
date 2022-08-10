// converts seconds passed in the day to e.a. 18:00.
type getDigitalTimeType = (seconds: number) => string;

const getDigitalTime: getDigitalTimeType = (seconds) => {
  const hours: number = Math.floor(seconds / 3600);
  const minutes: number = Math.floor((seconds % 3600) / 60);

  return `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
};

export default getDigitalTime;
