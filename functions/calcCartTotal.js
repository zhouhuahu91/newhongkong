const calcCartTotal = (cartState) => {
  let total = 0;
  // First we calculate the total for all the cart items.
  total += cartState.cart.reduce((x, y) => x + y.price, 0);
  // If delivery is true, we add the delivery fee.
  if (cartState.delivery) {
    total += 250;
  }
  // If the payment method is not cash, we add the transaction fee.
  if (cartState.paymentMethod !== "cash") {
    total += 30;
  }
  // If bag is true we add the bag fee.
  if (cartState.bag) {
    total += 10;
  }
  // We always add the tip to the total.
  total += cartState.tip;

  // We return the total.
  return total;
};

export default calcCartTotal;
