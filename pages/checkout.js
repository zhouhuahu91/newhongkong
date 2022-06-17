// Hook imports
import useI18n from "@/hooks/useI18n";
// Component imports
import DesktopCart from "@/components/cart/DesktopCart";
import MobileCart from "@/components/cart/MobileCart";
import PickUpOrDelivery from "@/components/checkout/PickUpOrDelivery";
// Form imports
import { useForm, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const CheckOut = () => {
  // t is used to translate text.
  const t = useI18n();

  return (
    <div className="w-full max-w-screen-xl mx-auto relative">
      <MobileCart />
      <div className="grid md:grid-cols-12 gap-6 mx-4">
        {/* Container for left part of the content, the form. */}
        <div className="col-span-12 md:col-span-6 lg:col-span-7 mb-20 w-full">
          {/* Main title of the checkout form. */}
          <h1 className="text-5xl uppercase font-semibold mt-4 mb-8">
            {t.almost_done}
          </h1>
          <PickUpOrDelivery />
        </div>
        {/* Container for the cart. */}
        <div className="col-span-6 lg:col-span-5">
          <DesktopCart />
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
