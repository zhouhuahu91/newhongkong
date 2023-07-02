const calculateTotalCartPrice = (cartState, storeFees) => {
  let total = 0;
  // We add the price of all the items in the cart.
  total += cartState.cart.reduce((x, y) => x + y.price, 0);
  // We add the fee if user selects delivery.
  if (cartState.delivery && cartState.delivery !== "undecided") {
    total += storeFees.deliveryFee;
  }
  // We add the fee if user pays online.
  if (
    cartState.paymentMethod !== "in_person" &&
    cartState.paymentMethod !== "undecided"
  ) {
    total += storeFees.transactionFee;
  }

  // We need to add fee for plastic packaging. currently we charge 10 cent for 1 and 20 cents for > 1.
  // We need to check how much plastic is being used.
  const totalQtyPlastic = cartState.cart.reduce((x, y) => {
    return x + y.qtyPlastic;
  }, 0);
  // If it is 1 we add the base of 10 cents.
  if (totalQtyPlastic === 1) {
    total += storeFees.plasticFee;
  }
  // if it is more than 1 we add max of 2 * base of 10 cents aka 20 cents.
  if (totalQtyPlastic > 1) {
    total += storeFees.plasticFee * 2;
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
    total += storeFees.plasticBagFee;
  }
  // We always at the tip, if there is no tip, tip is 0 anyway.
  total += cartState.tip;

  return total;
};

export default calculateTotalCartPrice;
