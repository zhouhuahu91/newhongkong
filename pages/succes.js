// React imports
import { useState, useEffect } from "react";
// NextJs imports
import Link from "next/link";
import { useRouter } from "next/router";
// Component imports
import Spinner from "@/components/Spinner";
// Google Maps imports
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
// Hook imports
import { useCart } from "@/hooks/useCart";
import useI18n from "@/hooks/useI18n";
// Firebase imports
import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
// Axios import
import axios from "axios";
// Function imports
import getURL from "@/functions/getURL";
import fetchLatLngFromApi from "@/functions/fetchLatLngFromApi";

const Succes = () => {
  const [order, setOrder] = useState(null);
  const [position, setPosition] = useState({ lat: 52.26196, lng: 4.49463 });
  const { dispatch } = useCart();
  const t = useI18n();
  const URL = getURL();
  const { query } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      // We check if there is a query and if the redirect_status succeeded or not.
      if (query && query.redirect_status === "succeeded") {
        // If there is we grab the id and get the data from firebase.
        const ref = doc(db, `orders/${query.id}`);
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
          // If snapshot exists we want to clear the cart
          dispatch({ type: "RESET_CART" });
          // And set the order to the snapshot data.
          const data = snapshot.data();
          return setOrder(data);
        }
      } else if (
        query &&
        query.redirect_status === "failed" &&
        query.payment_intent
      ) {
        try {
          const res = await axios.post(`${URL}/api/cancelorder`, {
            id: query.payment_intent,
          });
        } catch (e) {
          console.log(e);
        }
      }
      // Only if there is a redirect status we want to show the error.
      if (query.redirect_status) {
        return setOrder(false);
      }
    };
    fetchData();
  }, [query, dispatch, URL]);

  useEffect(() => {
    const getPosition = async () => {
      const data = await fetchLatLngFromApi(
        `${order.address.street}+${order.address.houseNumber}${
          order.address.addition ? `+${order.address.addition}` : ""
        }+${order.address.city}+Nederland`
      );
      if (data.msg) {
        return console.log(data.msg);
      }
      setPosition(data);
    };

    if (order !== null && order.delivery) {
      getPosition();
    }
  }, [order]);

  if (order === null) {
    return <Spinner />;
  }

  return (
    <div className="mx-auto max-w-lg flex justify-center">
      {order ? (
        <div className="rounded-xl flex flex-col sm:border sm:mt-10 sm:bg-white space-y-3 overflow-hidden">
          <div className="px-4 pt-4">
            <h1 className="font-semibold text-3xl my-2">{t.thank_you}</h1>
            {/* I do not like this translation aproach a lot but it isn't worth it to change everything just for this page. */}
            <p className="my-4 text-sm">
              {order.delivery === true
                ? t.order_received_delivery(order)
                : t.order_received_pick_up(order)}
            </p>
            <p className="my-4 text-sm">{t.mail_sent(order.email)}</p>
          </div>
          {/* TODO: maybe return a map of direction to the user if it is delivery. */}
          <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLEMAPS_API}>
            <div className="w-auto h-[480px] overflow-hidden roundedb-xl">
              <Map zoom={14} center={position}>
                <Marker position={position} />
              </Map>
            </div>
          </APIProvider>
        </div>
      ) : (
        <div className="rounded-xl max-w-md w-full flex flex-col mt-10 mx-4 overflow-hidden">
          <h1 className="font-semibold text-2xl p-4">Oeps..</h1>
          <p className="px-4 pb-4 text-sm">
            {t.something_went_wrong}{" "}
            <a href="tel:+31252372902" className="text-main font-semibold">
              0252 37 29 02
            </a>
            .
          </p>
          <div className="flex justify-evenly w-full p-4">
            <Link href="/menu">
              <a className="button border bg-white w-5/12 mx-1"> {t.cancel}</a>
            </Link>
            <Link href="/checkout">
              <a className="button bg-main text-white w-7/12 mx-1">
                {t.try_again}
              </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Succes;
