const fetchLatLngFromApi = async (address) => {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.NEXT_PUBLIC_GOOGLEMAPS_API}`
    );
    const data = await res.json();

    if (data.status === "ZERO_RESULTS") return { msg: "error" };
    if (data.status === "REQEUST_DENIED")
      return { msg: "error, excess denied" };
    if (data.results?.length == 0) return { msg: "no address found" };
    if (data.status === "OK") {
      return data.results[0]?.geometry?.location;
    }
  } catch (e) {
    return e;
  }
};

export default fetchLatLngFromApi;
