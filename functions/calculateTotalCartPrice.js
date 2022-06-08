const calculateTotalCartPrice = (cartState) => {
  let total = 0;
  // We add the price of all the items in the cart.
  total += cartState.cart.reduce((x, y) => x + y.price, 0);
  // We add the fee if user selects delivery.
  if (cartState.delivery && cartState.delivery !== "undecided") {
    total += 250;
  }
  // We add the fee if user doesn't pay with cash.
  if (
    cartState.paymentMethod !== "cash" &&
    cartState.paymentMethod !== "undecided"
  ) {
    total += 30;
  }
  // We add the fee if user requires a bag.
  // But delivery must be false because bag price is included in delivery fee.
  if (
    // bag must be true
    cartState.bag &&
    // delivery must be false and not "undecided"
    cartState.delivery !== "undecided" &&
    !cartState.delivery
  ) {
    total += 10;
  }
  // We always at the tip, if there is no tip, tip is 0 anyway.
  total += cartState.tip;

  return total;
};

export default calculateTotalCartPrice;
