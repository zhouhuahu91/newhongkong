import DesktopCart from "@/components/cart/DesktopCart";
import MobileCart from "@/components/cart/MobileCart";

const CheckOut = () => {
  return (
    <div className="relative">
      <MobileCart />
      <DesktopCart />
    </div>
  );
};

export default CheckOut;
