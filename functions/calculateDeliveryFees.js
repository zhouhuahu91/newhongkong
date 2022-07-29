const calculateDeliveryFees = (postalcode) => {
  // If there is no postalcode we return the standard fees.
  if (!postalcode) {
    return { minimum: 2000, fee: 250 };
  }

  if (
    // 2211 postalcode is the hardest
    // We need to check every combination and see how far away it is. If it is pretty far away we add the extra cost...
    // ... and a higher minimum
    // 2211SW is vlak bij ruigerhoekerweg.
    // 2211TW is zo wat in Noordwijk.
    // 2211V... dat niet herenweg is ver weg.
    /^(2204)[\s]?([a][bcnprsx]|[b-c][a-z])$|^(2211)[\s]?(a[degl]|bl|nx|v[cdeghjst]|w[dekjhg]|x[nptwxz]|z[bceh])$|^(2212)[\s]?a[abcegh]$/i.test(
      postalcode
    )
  ) {
    return { minimum: 2500, fee: 300 };
  } else if (
    /^(2211)[\s]?(s[wz]|tw|v[klmnrp]|we|x[rs]|zg)$|^(2204)[\s]?([a][jkltvw])$/i.test(
      postalcode
    )
  ) {
    return { minimum: 3000, fee: 350 };
  } else {
    return { minimum: 2000, fee: 250 };
  }
};

export default calculateDeliveryFees;
