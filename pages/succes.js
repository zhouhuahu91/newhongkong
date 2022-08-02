// React imports
import { useState, useEffect } from "react";
// NextJs imports
import Link from "next/link";
import { useRouter } from "next/router";
// Component imports
import Spinner from "@/components/Spinner";
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

const Succes = () => {
  const [order, setOrder] = useState(null);
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
      // If there is no query or the redirect_status failed we set the state to false.
      return setOrder(false);
    };
    fetchData();
  }, [query, dispatch]);

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
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2441.97711764866!2d4.492445416000293!3d52.26196056307211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5c1c5907b92e3%3A0xc413e142a993cc45!2sHavenstraat%2013%2C%202211%20EE%20Noordwijkerhout!5e0!3m2!1snl!2snl!4v1622457839667!5m2!1snl!2snl"
            className="border-0 w-full h-[480px] px-4 sm:px-0"
            loading="lazy"
            title="google maps"
          />
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
