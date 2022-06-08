import DesktopCart from "@/components/cart/DesktopCart";
import MobileCart from "@/components/cart/MobileCart";

const CheckOut = () => {
  return (
    <div className="relative">
      <MobileCart />
      <div className="hidden md:block">
        <DesktopCart />
      </div>
    </div>
  );
};

export default CheckOut;
