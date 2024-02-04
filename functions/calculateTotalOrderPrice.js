// Is basicly the same as calculateTotalCartPrice but with an order that is added already.
const calculateTotalOrderPrice = (order) => {
  let total = 0;
  // We add the prices of all items in the order.
  total += order.cart.reduce((x, y) => x + y.price, 0);

  // If order is delivery we need to add delivery Fee
  if (order.delivery) {
    total += order.storeFees.deliveryFee;
  }

  // If order is payed online we add transactionFee
  if (order.paymentMethod === "online") {
    total += order.storeFees.transactionFee;
  }

  // If order has a plasticbag but isn't delivery we add the plastic bag fee.
  if (order.bag && order.delivery === false) {
    total += order.storeFees.plasticBagFee;
  }

  return total;
};

export default calculateTotalOrderPrice;
