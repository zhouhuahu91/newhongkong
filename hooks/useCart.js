// React imports
import { useReducer, useContext, createContext, useEffect } from "react";
// Function imports
import createItemId from "@/functions/createItemId";
import createItemDescription from "@/functions/createItemDescription";

// First we create the context
const cartContext = createContext();

// We export this context so we can use it in other components.
export const useCart = () => {
  return useContext(cartContext);
};

// Declare initial state globally so that we can use it in the cartReducer.
const initial = {
  cart: [],
  delivery: "undecided",
  address: null,
  paymentMethod: "ideal",
  tip: 0,
  bag: true,
  updatedAt: Date.now(),
};

// The cartReducer provides the cart state and dispatch to manipulate it.
const cartReducer = (cartState, action) => {
  switch (action.type) {
    case "SET_CARTSTATE":
      return action.payload;
    case "ADD_ITEM":
      return {
        ...cartState,
        cart: addItem(cartState.cart, action.payload),
        updatedAt: Date.now(),
      };
    case "INCREMENT_ITEM":
      return {
        ...cartState,
        cart: incrementItem(cartState.cart, action.payload),
        updatedAt: Date.now(),
      };
    case "DECREMENT_ITEM":
      return {
        ...cartState,
        cart: decrementItem(cartState.cart, action.payload),
        updatedAt: Date.now(),
      };
    case "INCREMENT_TIP":
      return {
        ...cartState,
        tip: cartState.tip + 20,
        updatedAt: Date.now(),
      };
    case "DECREMENT_TIP":
      return {
        ...cartState,
        tip: cartState.tip > 0 ? cartState.tip - 20 : 0,
        updatedAt: Date.now(),
      };
    case "SET_DELIVERY":
      return {
        ...cartState,
        delivery: action.payload,
        updatedAt: Date.now(),
      };
    case "SET_ADDRESS":
      return {
        ...cartState,
        address: action.payload,
      };
    case "SET_PAYMENT_MEHTOD":
      return {
        ...cartState,
        paymentMethod: action.payload,
        updatedAt: Date.now(),
      };
    case "TOGGLE_BAG":
      return {
        ...cartState,
        bag: !cartState.bag,
        updatedAt: Date.now(),
      };
    case "RESET_CART":
      return initial;
    default:
      return cartState;
  }
};

// This hook provides the cart state and dispatch to manipulate it.
const useCartProvider = () => {
  const [cartState, dispatch] = useReducer(cartReducer, initial);
  // First time this renders we check if there is localCartState in localStorage.
  // We would also want to clear cart if the user has been inactive for more than 12 hours.
  useEffect(() => {
    // Get localCartState from localStorage.
    const localCartState = JSON.parse(localStorage.getItem("localCartState"));
    // Check if there is a localCartState.
    // If not we exit the function.
    if (!localCartState) return;
    // We check when the cart was last updated.
    const lastCartUpdate = Date.now() - localCartState.updatedAt;
    // If the cart is older than 3 hours we reset the cart.
    if (lastCartUpdate > 1000 * 60 * 60 * 3) {
      return dispatch({ type: "RESET_CART" });
    }
    // If the cart is not older than 3 hours we set the localCartState.
    // Strict mode is causing this te rerender the cart state to initial.
    // That is why we only set cart state if it has items
    if (localCartState.cart.length) {
      dispatch({ type: "SET_CARTSTATE", payload: localCartState });
    }
  }, []);

  // Every time the cart updates we save it to the local storage.
  useEffect(() => {
    localStorage.setItem("localCartState", JSON.stringify(cartState));
  }, [cartState]);

  return { cartState, dispatch };
};

// We export this provider to wrap it around the other components.
export const CartProvider = ({ children }) => {
  const value = useCartProvider();
  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};

// ******** REDUCER FUNCTIONS ********

const addItem = (cart, payload) => {
  const { qwt, item, selectedOptions, selectedSides } = payload;

  // We need a new id for the item that also includes the options and sides.
  const id = createItemId(item, selectedOptions, selectedSides);

  // We use the find method to check if the new item is already in the cart.
  const found = cart.find((cartItem) => cartItem.id === id);

  // If found we map over the cart array and increment the qwt.
  if (found) {
    return cart.map((cartItem) => {
      return cartItem.id === id
        ? {
            ...cartItem,
            qwt: cartItem.qwt + qwt,
            // We need the price of 1 item to calculate the new price.
            price: (cartItem.price / cartItem.qwt) * (cartItem.qwt + qwt),
          }
        : cartItem;
    });
  } else {
    // If not found we need to prepare a new item.
    // We need the actual options and sides instead of only there id.
    const options = selectedOptions.map((selectedOption) =>
      item.options.find((option) => option.id === selectedOption)
    );
    const sides = selectedSides.map((selectedSide) =>
      item.sides.find((side) => side.id === selectedSide)
    );

    // We need the total price for the options and sides.
    let addedPrice = 0;
    if (options.length > 0) {
      addedPrice += options.reduce((acc, option) => acc + option.price, 0);
    }
    if (sides.length > 0) {
      addedPrice += sides.reduce((acc, side) => acc + side.price, 0);
    }

    // We need the total price for the item.
    const price = (item.price + addedPrice) * qwt;

    // The name of the item is different if optionIsMain is true.
    const name = item.optionIsMain ? options[0].name : item.name;

    // We need a description for the options and sides they have selected.
    const description = createItemDescription(item, options, sides);

    const newItem = {
      id,
      name,
      description,
      price,
      qwt,
    };
    // we add the new item to the cart.
    return [...cart, newItem];
  }
};

const incrementItem = (cart, payload) => {
  // We use the map function to increment the qwt of the item.
  return cart.map((cartItem) => {
    return cartItem.id === payload.id
      ? {
          ...cartItem,
          qwt: cartItem.qwt + 1,
          // We calculate the new price by getting the price of 1 and then...
          // multipling it with the new qwt + 1.
          price: (cartItem.price / cartItem.qwt) * (cartItem.qwt + 1),
        }
      : cartItem;
  });
};

const decrementItem = (cart, payload) => {
  // If there is only one remaining we filter out the item.
  if (payload.qwt === 1) {
    return cart.filter((cartItem) => cartItem.id !== payload.id);
  } else {
    // If there is more than one we decrement the qwt.
    return cart.map((cartItem) => {
      return cartItem.id === payload.id
        ? {
            ...cartItem,
            qwt: cartItem.qwt - 1,
            // We calculate the new price by getting the price of 1 and then...
            // multipling it with the new qwt - 1.
            price: (cartItem.price / cartItem.qwt) * (cartItem.qwt - 1),
          }
        : cartItem;
    });
  }
};
