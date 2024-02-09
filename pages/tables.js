import { useState } from "react";
import { motion } from "framer-motion";
// Hook imports
import { useStoreInfo } from "@/hooks/useStoreInfo";
import { useAuth } from "@/hooks/useAuth";
// Component imports
import Header from "@/tables/Header";
import Spinner from "@/components/Spinner";
import StoreLayout from "@/tables/StoreLayout";

const Tables = () => {
  const { currentDate } = useStoreInfo();
  const { user } = useAuth();
  const [date, setDate] = useState(currentDate);

  // Tables page is only for admin...
  // If no user is not fetched yet we show spinner
  // If there is no user we redirect to log in
  // If there is a user but not an admin we redirect to home page.
  if (user === null) {
    return <Spinner />;
  } else if (user === false) {
    router.push("/sign_in");
    return <Spinner />;
  } else if (!user?.admin) {
    router.push("/");
    return <Spinner />;
  }

  return (
    <>
      <Header date={date} setDate={setDate} />
      <div className="w-full max-w-screen-xl mx-auto">
        <div className="w-full border rounded-xl relative h-[756px] mt-o xl:mt-20">
          <StoreLayout />
          <motion.div
            drag
            className="w-20 aspect-square bg-white rounded-md border shadow-xl flex items-center justify-center text-3xl font-bold"
          >
            6
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Tables;
