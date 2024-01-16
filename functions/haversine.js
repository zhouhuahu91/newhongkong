const haversine = (coords1, coords2) => {
  Number.prototype.toRad = function () {
    return (this * Math.PI) / 180;
  };

  const lat2 = coords2.lat;
  const lon2 = coords2.lng;
  const lat1 = coords1.lat;
  const lon1 = coords1.lng;

  const R = 6371; // km
  //has a problem with the .toRad() method below.
  const x1 = lat2 - lat1;
  const dLat = x1.toRad();
  const x2 = lon2 - lon1;
  const dLon = x2.toRad();
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1.toRad()) *
      Math.cos(lat2.toRad()) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  return d;
};

export default haversine;
