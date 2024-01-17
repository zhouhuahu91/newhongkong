// React imports
import { useState, useEffect } from "react";
// Google imports
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

const Directions = ({ order }) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: "havenstraat 13, 2211EE, Noordwijkerhout",
        destination: `${order.address.street}+${order.address.houseNumber}${
          order.address.addition ? `+${order.address.addition}` : ""
        }+${order.address.city}+Nederland`,
        travelMode: google.maps.TravelMode.BICYCLING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer]);

  return null;
};

export default Directions;
