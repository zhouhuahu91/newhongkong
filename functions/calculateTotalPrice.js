const calculateTotalOrderPrice = (order) => {
  let total = 0;
  // We add the prices of all items in the order.
  total += order.cart.reduce((x, y) => x + y.price, 0);

  if (order.delivery) {
    total += order.storeFees.deliveryFee;
  }

  if (order.paymentMethod === "online") {
    total += order.storeFees.transactionFee;
  }

  if (order.bag && order.delivery === false) {
    total += order.storeFees.plasticBagFee;
  }

  return total;
};

export default calculateTotalOrderPrice;
