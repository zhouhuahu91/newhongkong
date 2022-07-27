// NextJS imports
import Image from "next/image";

const PaymentMethodType = ({ order }) => {
  if (order.paymentMethodType === "ideal") {
    return (
      <Image
        src="/paymentIcons/ideal.svg"
        alt="ideal icon"
        width={24}
        height={24}
      />
    );
  } else if (order.paymentMethodType === "bancontact") {
    return (
      <Image
        src="/paymentIcons/banconnect.svg"
        alt="banconnect icon"
        width={24}
        height={24}
      />
    );
  } else if (order.paymentMethodType === "giropay") {
    return (
      <Image
        src="/paymentIcons/giropay.svg"
        alt="giropay icon"
        width={24}
        height={24}
      />
    );
  } else if (order.paymentMethodType === "p24") {
    return (
      <Image
        src="/paymentIcons/przelewy24.svg"
        alt="przelewy24 icon"
        width={24}
        height={24}
      />
    );
  } else {
    return <div>unknown type</div>;
  }
};

export default PaymentMethodType;
