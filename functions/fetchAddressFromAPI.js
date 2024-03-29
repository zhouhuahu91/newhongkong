// import axios from "axios";

const fetchAddressFromAPI = async (postalcode, houseNumber) => {
  let sanitizedPostalcode = postalcode || "";
  let sanitizedHouseNumber = houseNumber || "";

  // We check if postalcode and houseNumber are strings.
  if (typeof sanitizedPostalcode === "string") {
    // wWe remove all white spaces from the postalcode.
    sanitizedPostalcode = sanitizedPostalcode.replace(/ /g, "");
  }
  if (typeof sanitizedHouseNumber === "string") {
    // We remove all non-numeric characters from the houseNumber.
    sanitizedHouseNumber = sanitizedHouseNumber.replace(/[^0-9]/g, "");
  }

  // We check if the postalcode has 6 characters and if the houseNumber has atleast 1 character.
  if (sanitizedPostalcode.length === 6 && sanitizedHouseNumber > 0) {
    // If both critiria's meet we fetch data from the api.
    // It's a free api from the goverment, not sure if it will stay online forever.
    // If this one doesn't work use https://postcode.tech/home
    // import axios
    // set the bearer api

    // try {
    //   let config = {
    //     headers: {
    //       Authorization: `Bearer ${process.env.NEXT_PUBLIC_POSTALCODE_API}`,
    //     },
    //   };
    //   const err = await axios.get(
    //     `https://postcode.tech/api/v1/postcode?postcode=${sanitizedPostalcode}&number=${sanitizedHouseNumber}`,
    //     config
    //   );

    //   if (err.data) {
    //     return {
    //       street: err.data.street,
    //       houseNumber: sanitizedHouseNumber,
    //       postalcode: sanitizedPostalcode,
    //       city: err.data.city,
    //     };
    //   }
    //   return {
    //     error: "not found",
    //   };
    // } catch (e) {
    //   console.log(e);
    //   return {
    //     error: "not found",
    //   };
    // }

    const res = await fetch(
      `https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?rows=1&fq=postcode:${sanitizedPostalcode}&fq=huisnummer:${sanitizedHouseNumber}`
    );
    const raw = await res.json();
    // If the raw data returns an error we return from the function.
    if (raw.error) {
      console.log(raw.error);
      return { error: "something went wrong" };
    }
    // If there are no errors we check if the api returned an address.
    if (raw.response?.numFound > 0) {
      // We populate the address state with the response data.
      const data = raw.response.docs[0];
      return {
        street: data.straatnaam,
        houseNumber: data.huisnummer,
        postalcode: data.postcode,
        city: data.woonplaatsnaam,
      };
    }

    // If api can't find the address we set our own error.
    return {
      error: "not found",
    };
  } else {
    return {
      error: "no input",
    };
  }
};

export default fetchAddressFromAPI;
