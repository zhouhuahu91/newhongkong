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
  createdAt: null,
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
      };
    case "INCREMENT_ITEM":
      return {
        ...state,
        items: incrementItem(state.items, action.payload),
      };
    case "DECREMENT_ITEM":
      return {
        ...state,
        items: decrementItem(state.items, action.payload),
      };
    case "INCREMENT_TIP":
      return { ...state, tip: state.tip + 20 };
    case "DECREMENT_TIP":
      return {
        ...state,
        tip: state.tip <= 0 ? 0 : state.tip - 20,
      };
    case "SET_DELIVERY":
      return {
        ...state,
        delivery: action.payload,
      };
    case "SET_CASH":
      return {
        ...state,
        cash: action.payload,
      };
    case "SET_BAG":
      return { ...state, bag: action.payload };
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
  useEffect(() => {
    const cartState = JSON.parse(localStorage.getItem("cartState"));
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
        ? { ...item, qwt: item.qwt + payload.qwt }
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
    return item.id === payload ? { ...item, qwt: item.qwt + 1 } : item;
  });
};

const decrementItem = (items, payload) => {
  // If there is only one remaining we filter out the item.
  if (payload.qwt === 1) {
    return items.filter((item) => item.id !== payload.id);
  } else {
    // If there is more than one we decrement the qwt.
    return items.map((item) => {
      return item.id === payload ? { ...item, qwt: item.qwt - 1 } : item;
    });
  }
};
