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
  } else if (order.paymentMethodType === "visa") {
    return (
      <Image
        src="/paymentIcons/visa.svg"
        alt="visa icon"
        width={24}
        height={24}
      />
    );
  } else if (order.paymentMethodType === "mastercard") {
    return (
      <Image
        src="/paymentIcons/mastercard.svg"
        alt="mastercard icon"
        width={24}
        height={24}
      />
    );
  } else if (order.paymentMethodType === "apple_pay") {
    return (
      <Image
        src="/paymentIcons/ApplePay.svg"
        alt="apple pay icon"
        width={24}
        height={24}
      />
    );
  } else {
    return <span>{order.paymentMethodType}</span>;
  }
};

export default PaymentMethodType;
