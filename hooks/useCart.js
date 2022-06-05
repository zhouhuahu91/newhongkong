import { useReducer, useContext, createContext, useEffect } from "react";

// First we create the context
const cartContext = createContext();

// We export this context so we can use it in other components.
export const useCart = () => {
  return useContext(cartContext);
};

// Declare initial state globally so that we can use it in the cartReducer.
const initial = {
  items: [],
  delivery: "undecided",
  paymentMethod: "undecided",
  tip: 0,
  bag: true,
  updatedAt: Date.now(),
};

// The cartReducer provides the cart state and dispatch to manipulate it.
const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_STATE":
      return action.payload;
    case "ADD_ITEM":
      return {
        ...state,
        items: addItem(state.items, action.payload),
        updatedAt: Date.now(),
      };
    case "INCREMENT_ITEM":
      return {
        ...state,
        items: incrementItem(state.items, action.payload),
        updatedAt: Date.now(),
      };
    case "DECREMENT_ITEM":
      return {
        ...state,
        items: decrementItem(state.items, action.payload),
        updatedAt: Date.now(),
      };
    case "INCREMENT_TIP":
      return {
        ...state,
        tip: state.tip + 20,
        updatedAt: Date.now(),
      };
    case "DECREMENT_TIP":
      return {
        ...state,
        tip: state.tip > 0 ? state.tip - 20 : 0,
        updatedAt: Date.now(),
      };
    case "SET_DELIVERY":
      return {
        ...state,
        delivery: action.payload,
        updatedAt: Date.now(),
      };
    case "SET_PAYMENT_MEHTOD":
      return {
        ...state,
        paymentMethod: action.payload,
        updatedAt: Date.now(),
      };
    case "SET_BAG":
      return {
        ...state,
        bag: action.payload,
        updatedAt: Date.now(),
      };
    case "RESET_CART":
      return initial;
    default:
      return state;
  }
};

// This hook provides the cart state and dispatch to manipulate it.
const useCartProvider = () => {
  const [cart, dispatch] = useReducer(cartReducer, initial);

  // First time this renders we check if there is cartState in localStorage.
  // We would also want to clear cart if the user has been inactive for more than 12 hours.
  useEffect(() => {
    // Get cartState from localStorage.
    const cartState = JSON.parse(localStorage.getItem("cartState"));
    // Check if there is a cartState.
    // If not we exit the function.
    if (!cartState) return;

    // We check when the cart was last updated.
    const lastCartUpdate = Date.now() - cartState.updatedAt;
    // If the cart is older than 3 hours we reset the cart.
    if (lastCartUpdate > 1000 * 60 * 60 * 3) {
      return dispatch({ type: "RESET_CART" });
    }
    // If the cart is not older than 3 hours we set the cartState.
    // Strict mode is causing this te rerender the cart state to initial.
    // That is why we only set cart state if it has items
    if (cartState.items.length > 0) {
      dispatch({ type: "SET_STATE", payload: cartState });
    }
  }, []);

  // Every time the cart updates we save it to the local storage.
  useEffect(() => {
    localStorage.setItem("cartState", JSON.stringify(cart));
  }, [cart]);

  return { cart, dispatch };
};

// We export this provider to wrap it around the other components.
export const CartProvider = ({ children }) => {
  const value = useCartProvider();
  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};

// ******** REDUCER FUNCTIONS ********

const addItem = (items, payload) => {
  // We use the find method to check if the item is already in the cart.
  const found = items.find((item) => item.id === payload.id);
  // If found we map over the items array and increment the qwt.
  if (found) {
    return items.map((item) => {
      return item.id === payload.id
        ? {
            ...item,
            qwt: item.qwt + payload.qwt,
            // First we calculate the price per item and then we multiply it by the total qwt.
            // price: (item.price / item.qwt) * (item.qwt + newItem.qwt),
          }
        : item;
    });
  } else {
    // If not found we add the new item to the cart.
    return [...items, payload];
  }
};

const incrementItem = (items, payload) => {
  // We use the map function to increment the qwt of the item.
  return items.map((item) => {
    return item.id === payload.id
      ? {
          ...item,
          qwt: item.qwt + 1,
          // We calculate the new price by getting the price of 1 and then...
          // multipling it with the new qwt + 1.
          // price: (item.price / item.qwt) * (item.qwt + 1),
        }
      : item;
  });
};

const decrementItem = (items, payload) => {
  // If there is only one remaining we filter out the item.
  if (payload.qwt === 1) {
    return items.filter((item) => item.id !== payload.id);
  } else {
    // If there is more than one we decrement the qwt.
    return items.map((item) => {
      return item.id === payload.id
        ? {
            ...item,
            qwt: item.qwt - 1,
            // We calculate the new price by getting the price of 1 and then...
            // multipling it with the new qwt - 1.
            // price: (item.price / item.qwt) * (item.qwt - 1),
          }
        : item;
    });
  }
};
