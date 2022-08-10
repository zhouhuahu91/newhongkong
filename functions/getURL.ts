// This function return URL depending if we are in production or development.
// If we are in production we return the URL of the server.
// If we are in development we return the URL of the localhost.
type getURLType = () => string;

const getURL: getURLType = () => {
  let URL: string = "https://newhongkong.nl";
  if (process.env.NODE_ENV === "development") URL = "http://localhost:3000";

  return URL;
};

export default getURL;
