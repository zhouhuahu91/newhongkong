import Link from "next/link";
import euro from "@/functions/euro";
import Emp from "@/components/Emphasize";

export default {
  locale: "en",

  // ******** HEADER ********

  home: "Home",
  order: "Order",
  menu: "Menu",
  catering: "Catering",
  contact: "Contact",
  sign_out: "Sign out",
  signed_in_as: "Signed in as",

  // ******** HEADER ********

  // ******** SIGN IN ********

  welcome: "Welcome",
  welcome_text: "Sign in here!",
  sign_in: "Sign in",
  or: "or",
  sign_in_google: "Sign in with Google",
  sign_in_facebook: "Sign in with Facebook",
  forgot_password: "Forgot password?",
  sign_in_failed:
    "We couldn't find this email and password combination in our records. Try again.",
  exists_with_different_credential:
    "Account already exists with this email address.",
  no_account: "Don't have an account?",
  sign_up_here: "Sign up",
  email: "Email",
  password: "Password",

  // ******** SIGN IN ********

  // ******** SIGN UP ********

  // ******** SIGN UP ********

  // ******** FORGOT PASSWORD ********

  reset_password: "Reset password",
  reset_password_info: "We will send you an email to reset your password.",
  back_to_signup: "Back to sign in",
  send: "Send",
  reset_password_succes:
    "Thank you, in a few minutes you will receive an email containing a link to reset your password.",
  reset_password_failed:
    "We couldn't find this email in our records. Try again.",

  // ******** FORGOT PASSWORD ********

  // ******** MENU ********

  choose_an_option: "Choose an option.",
  choose_two_options: "Choose two options.",
  choose_three_options: "Choose three options.",
  cancel: "Cancel",
  add_for: "Add for",
  rather_pick_up: "Would you rather pick it up?",
  rather_deliver: "Would you rather have it deliverd?",

  // ******** MENU ********

  // ******** CHECKOUT ********

  almost_done: "Almost done",
  online: "Online",
  pay: "Pay",

  // ******** CHECKOUT ********

  // Common
  customer_service: "Customer service",
  yesterday: "yesterday",
  back_to: "Back to",
  search: "search",
  profile: "Profile",
  settings: "Settings",
  address: "address",
  dashboard: "Dashboard",
  favorites: "Favorites",
  order_history: "Order history",
  order_again: "Order again",
  your_order: "Your order",
  closed: "Closed",
  minimum: "Minimum",
  attention: "Attention",
  understood: "Understood",
  popular: "Popular",

  // Banner
  store_open_soon: (openingTime) => (
    <span>
      We open at {openingTime} o'clock, but you can already place your order
      online.
    </span>
  ),
  store_closing_soon: (remainingTime) => (
    <span>
      We are closing in {remainingTime}{" "}
      {remainingTime === 1 ? "minute" : "minutes"}.
    </span>
  ),
  store_closed: (openingTime, closingTime) => (
    <span>
      Closed, we are open from Thuesday to Sunday from {openingTime} to{" "}
      {closingTime} o'clock. We are closed on Mondays except on holidays.
    </span>
  ),
  custom_message: "",

  // sign up page
  sign_in_text: "Sign up here!",
  sign_up: "Sign up",
  already_have_account: "Already have an account?",
  email_already_used: "Account already exists with this email address.",
  our: "Our",
  privacy_policy: "privacy policy",
  applies: "applies",

  // Profile
  save: "Save",
  settings_information: "Change your profile data here.",
  change_name: "Change your name here.",
  change_phone_number: "Change your phone number here.",
  change_address: "Change your address here.",
  change_email: "Change your email here.",
  change_password: "Change your password here.",
  new_email: "new email",
  current_password: "current password",
  new_password: "new password",
  wrong_password: "password is not valid",

  // Cart
  cart: "Cart",
  to_cart: "View cart",
  to_checkout: "To checkout",
  back_to_checkout: "Back to checkout",
  back_to_menu: "Back to menu",
  your_cart_is_empty: "Your cart is empty.",
  subtotal: "subtotal",
  delivery_fee: "delivery fee",
  transaction_fee: "transaction fee",
  restaurant_tip: "tip",
  total: "total",
  bag: "plastic bag",
  bag_tooltip:
    "It is required by law to add a plastic bag fee. If you are planning to bring your own bag make sure to toggle this off.",

  // Functions
  with: "with",
  and: "and",
  today: "Today",
  days: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],

  // Pick up or delivery
  pickup_delivery: "Do you want to pick up the food or have it delivered?",
  pick_up: "Pick up",
  delivery: "Delivery",
  coming_up: "Coming up",
  no_orders: "No orders",
  delivery_warning_sundayOrHoliday: () => (
    <>
      On Sundays and holidays we do not deliver between <Emp>17:00</Emp> and
      <Emp>19:00</Emp> o'clock.
    </>
  ),
  delivery_warning: (required) => (
    <>
      For delivery we have a minimum order amount of <Emp>€ 20,00</Emp>,{" "}
      delivery fee excluded. Amount needed to reach the minimum order value is{" "}
      <Emp>{euro(required)}</Emp>.
    </>
  ),

  // To where
  to_where: "To where do you want the food to be delivered?",
  postalcode: "Postalcode",
  house_number: "House number",
  house_number_addition: "Addition",
  can_not_find_address: "No address found. Try again.",
  for_who: "For who is it?",

  // For Who
  name: "Name",
  phone_number: "Phone number",

  // For When
  for_when: "When do you want the food?",
  date: "Date",
  time: "Time",
  select_time: "Select a time",
  asap: "as soon as posible",
  remarks: "Remarks",
  remarks_placeholder: "babi pangang without sauce",
  save_remarks: "Save my remarks.",
  closed_for_delivery: "Closed for delivery, pick up is still possible.",

  // Payment
  payment_method: "How do you want to pay?",
  at_store: "Store",
  cash: "Cash",
  ideal: "iDeal",
  place_order: "Place order",

  // Validation
  postalcode_not_valid: "Postalcode is not valid.",
  no_delivery_here: "We do not deliver to this postalcode.",
  house_number_not_valid: "Is not a valid house number.",
  required: "Required.",
  tel_not_valid: "Phone number is not valid.",
  email_not_valid: "Email is not valid.",
  remarks_max: "Can't contain more than 500 characters.",
  min_6: "Must contain atleast 6 characters.",

  // Succes page
  thank_you: "Thank you!",
  order_received_pick_up: (data) => (
    <>
      We are please to inform you that we have received your order. Your order
      is registered under the name of{" "}
      <Emp className="capitalize">{data.name}</Emp> and will be ready for{" "}
      <Emp>pick up</Emp> <Emp>today</Emp> around <Emp>{data.time}</Emp>.
    </>
  ),
  order_received_delivery: (data) => {
    const asap = !data.time?.includes("-");
    return (
      <>
        We are pleased to inform you that we have received your order. Your
        order is registered under the name of{" "}
        <Emp className="capitalize">{data.name}</Emp> and will be delivered{" "}
        {asap ? "" : <Emp>today</Emp>} {asap ? "" : "between"}{" "}
        {asap ? <Emp>as soon as possible</Emp> : <Emp>{data.time}</Emp>} to{" "}
        <Emp>{`${data.address.street} ${data.address.houseNumber}${
          data.addition ? `${data.addition}` : ""
        }`}</Emp>
        .
      </>
    );
  },
  mail_sent: (email) => (
    <>
      We have also sent a confirmation email to <Emp>{email}</Emp>. No email
      received? Try checking your spam or you can contact us via{" "}
      <a href="tel:+31252372902" className="text-main font-medium">
        0252 37 29 02
      </a>
      .
    </>
  ),
  something_went_wrong:
    "Something went wrong. Please try again or contact us at",
  try_again: "Try again",

  // Contact page
  opening_hours: (openingTime, closingTime) => (
    <>
      New Hong kong is from Thuesday to Sunday day from <Emp>{openingTime}</Emp>{" "}
      to <Emp>{closingTime}</Emp>. Closed on Monday except on holidays. You can
      place an order for{" "}
      <Link href="/menu">
        <a>
          <Emp>take away</Emp>
        </a>
      </Link>{" "}
      or make a reservation for a{" "}
      <Link href="/">
        <a>
          <Emp>catering</Emp>
        </a>
      </Link>{" "}
      online or by telephone. To make a table reservation however can only be
      done by{" "}
      <a href="tel:+31252372902">
        <Emp>telephone</Emp>
      </a>
      .
    </>
  ),
};
