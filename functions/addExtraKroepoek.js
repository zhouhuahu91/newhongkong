import createItemDescription from "@/functions/createItemDescription";
import { orderTotal } from "@/functions/ledger";

// Remark added to the original order so staff know a quick order belongs to it.
export const ORIGINAL_ORDER_REMARK = "heeft kroepoek extra bij besteld";

// A quick order is pick-up, paid in person and has no fees.
// It skips the kitchen (printed + ready) but stays in the queue (not completed),
// so it reminds staff to put the kroepoek in the bag.
const newQuickOrder = (original, now) => ({
  cart: [],
  name: original.name,
  time: original.time,
  date: original.date,
  remarks: `bij bestelling ${original.name} ${original.time}`,
  paid: false,
  paymentMethod: "in_person",
  paymentMethodType: null,
  delivery: false,
  bag: false,
  tip: 0,
  storeFees: original.storeFees,
  canceled: false,
  printed: true,
  ready: true,
  completed: false,
  mailSent: false,
  createdAt: now,
  tel: original.tel || "",
  email: original.email || "",
  address: {},
  user: "guest",
});

const addOne = (cart, menuItem) => {
  const found = cart.find((cartItem) => cartItem.id === menuItem.id);
  if (found) {
    return cart.map((cartItem) =>
      cartItem.id === menuItem.id
        ? {
            ...cartItem,
            qwt: cartItem.qwt + 1,
            price: cartItem.price + menuItem.price,
          }
        : cartItem,
    );
  }
  return [
    ...cart,
    {
      id: menuItem.id,
      qwt: 1,
      name: menuItem.name,
      description: createItemDescription(menuItem, [], []),
      price: menuItem.price,
      btw: menuItem.btw,
      optionIsMain: false,
      selectedOptions: [],
      selectedSides: [],
      selectedOptionsForPrinter: [],
      selectedSidesForPrinter: [],
      remarks: "",
    },
  ];
};

// Adds one menu item to the quick order for `original`.
// Pass `quickOrder: null` on the first tap to start a new one.
// Returns the full quick order doc (without id) and the new remarks for the original.
const addExtraKroepoek = ({ original, quickOrder, menuItem, now = Date.now() }) => {
  const base = quickOrder || newQuickOrder(original, now);
  const cart = addOne(base.cart, menuItem);
  const order = { ...base, cart };
  order.total = orderTotal(order);

  const remarks = original.remarks || "";
  const originalRemarks = remarks.includes(ORIGINAL_ORDER_REMARK)
    ? remarks
    : [remarks, ORIGINAL_ORDER_REMARK].filter(Boolean).join("\n");

  return { order, originalRemarks };
};

export default addExtraKroepoek;
