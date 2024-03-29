import Link from "next/link";
import euro from "@/functions/euro";
import Emp from "@/components/Emphasize";

export default {
  locale: "nl",

  // ******** HEADER ********

  home: "Home",
  menu: "Menu",
  order: "Bestellen",
  catering: "Catering",
  contact: "Contact",
  sign_out: "Uitloggen",
  signed_in_as: "Ingelogd als",
  monthly_overview: "Maandelijkse Overzicht",
  categories: "Categorieën",

  // ******** HEADER ********

  // ******** SIGN IN ********

  welcome: "Welkom",
  welcome_text: "Log hier in!",
  sign_in: "Inloggen",
  or: "of",
  sign_in_google: "Inloggen via Google",
  sign_in_facebook: "Inloggen via Facebook",
  forgot_password: "Wachtwoord vergeten?",
  sign_in_failed:
    "Er is geen account gevonden met dit e-mailadres en wachtwoord. Probeer het opnieuw.",
  exists_with_different_credential:
    "Er bestaat al een account met dit e-mailadres.",
  no_account: "Heb je nog geen account?",
  sign_up_here: "Meld je aan",
  email: "E-mailadres",
  password: "Wachtwoord",

  // ******** SIGN IN ********

  // ******** SIGN UP ********

  // ******** SIGN UP ********

  // ******** FORGOT PASSWORD ********

  reset_password: "Reset wachtwoord",
  reset_password_info: "Om je wachtwoord te resetten sturen we je een email.",
  back_to_signup: "Terug naar login",
  send: "Versturen",
  reset_password_succes:
    "Bedankt, binnen enkele minuten ontvang je een email met daarin een persoonlijke link. Via de link kan je een nieuwe wachtwoord opgeven.",
  reset_password_failed:
    "Er is geen account gevonden met dit e-mailadres. Probeer het opnieuw.",

  // ******** FORGOT PASSWORD ********

  // ******** MENU ********

  choose_an_option: "Kies een optie:",
  choose_two_options: "Kies twee opties:",
  choose_three_options: "Kies drie opties:",
  cancel: "Annuleren",
  add_for: "Toevoegen",
  rather_pick_up: "Wil je liever afhalen?",
  rather_deliver: "Wil je liever laten bezorgen?",
  pick_up_or_deliver: "Afhalen of bezorgen?",
  closed_for_delivery:
    "Wij zijn momenteel gesloten voor bezorgen. Afhalen is nog wel mogelijk.",

  // ******** MENU ********

  // ******** CHECKOUT ********

  almost_done: "Bijna Klaar",
  online: "Online",
  to_pay: "Naar Betalen",
  pay: "Betalen",

  // ******** CHECKOUT ********

  // Common
  customer_service: "Klantenservice",
  yesterday: "gisteren",
  search: "zoeken",
  back_to: "Terug naar",
  profile: "Profiel",
  settings: "Instellingen",
  address: "Adres",
  dashboard: "Dashboard",
  favorites: "Favorieten",
  order_history: "Bestellingen",
  order_again: "Opnieuw bestellen",
  your_order: "Jouw bestelling",
  closed: "Gesloten",
  minimum: "Minimum",
  attention: "Opgelet",
  understood: "Begrepen",
  popular: "Populair",

  // Banner
  store_open_soon: (openingTime) => (
    <span className="font-normal">
      Wij gaan om {openingTime} uur open, maar je kan je bestelling alvast
      online plaatsen.
    </span>
  ),
  store_closing_soon: (remainingTime) => (
    <span className="font-normal">
      Wij sluiten met {remainingTime}{" "}
      {remainingTime === 1 ? "minuut" : "minuten"}.
    </span>
  ),
  store_closed: (openingTime, closingTime) => (
    <span className="font-normal">
      Gesloten, wij zijn dinsdag t/m zondag geopend van {openingTime} tot{" "}
      {closingTime} uur. Gesloten op maandag met uitzondering van feestdagen.
    </span>
  ),
  custom_message: "",

  // sign up page
  sign_up: "Aanmelden",
  sign_in_text: "Meld je hier aan!",
  already_have_account: "Heb je al een account?",
  email_already_used: "Er bestaat al een account met dit e-mailadres.",
  our: "Onze",
  privacy_policy: "privacybeleid",
  applies: "is van toepassing",

  // Profile
  save: "Opslaan",
  settings_information: "Verander je profielgegevens hier.",
  change_name: "Wijzig je naam hier.",
  change_phone_number: "Wijzig je telefoonnummer hier.",
  change_address: "Wijzig je adres hier.",
  change_email: "Wijzig je e-mailadres hier.",
  change_password: "Wijzig je wachtwoord hier.",
  new_email: "nieuw e-mailadres",
  current_password: "huidig wachtwoord",
  new_password: "nieuw wachtwoord",
  wrong_password: "Wachtwoord is niet geldig.",

  // Cart
  cart: "Bestellijst",
  to_cart: "Lijstje bekijken",
  to_checkout: "Naar bestellen",
  back_to_checkout: "Terug naar betalen",
  back_to_menu: "Terug naar menu",
  your_cart_is_empty: "Je lijstje is leeg.",
  subtotal: "Subtotaal",
  delivery_fee: "Bezorgkosten",
  transaction_fee: "Transactiekosten",
  restaurant_tip: "Fooi",
  total: "Totaal",
  bag: "Tasje",
  packaging: "Verpakking",
  plastic: "Toeslag plastic",
  packaging_fee: "Verpakkingstoeslag",
  bag_tooltip:
    "Wij zijn verplicht de plastic tasjes te verrekenen. Ben je van plan om je eigen tas mee te nemen? Zorg dan dat je dit uitschakelt.",
  packaging_fee_tooltip:
    "Voor plastic verpakkingsmateriaal zijn wij verplicht een vergoeding in rekening te brengen.",

  // Functions
  with: "met",
  and: "en",
  today: "Vandaag",
  days: [
    "zondag",
    "maandag",
    "dinsdag",
    "woensdag",
    "donderdag",
    "vrijdag",
    "zaterdag",
  ],
  months: [
    "januari",
    "februari",
    "maart",
    "april",
    "mei",
    "juni",
    "juli",
    "augustus",
    "september",
    "oktober",
    "november",
    "december",
  ],

  // Pick up or delivery
  pickup_delivery: "Wil je het eten zelf afhalen of bezorgd krijgen?",
  pick_up: "Afhalen",
  delivery: "Bezorgen",
  coming_up: "Binnenkort",
  no_orders: "Geen bestellingen",
  delivery_warning_sundayOrHoliday: () => (
    <>
      Op zondagen en feestdagen bezorgen wij niet tussen <Emp>17:00</Emp> en{" "}
      <Emp>19:00</Emp> uur.
    </>
  ),
  delivery_warning: (required, minimum, address) => (
    <>
      Voor bezorgen naar <Emp>{address}</Emp> hanteren wij een minimum
      bestelbedrag van <Emp>{euro(minimum)}</Emp> exclusief bezorgkosten.
      Benodigd bedrag om de minimum bezorgwaarde te bereiken is{" "}
      <Emp>{euro(required)}</Emp>.
    </>
  ),

  // To where
  to_where: "Waar wil je dat het eten bezorgd wordt?",
  postalcode: "Postcode",
  house_number: "Huisnummer",
  house_number_addition: "Toevoeging",
  can_not_find_address: "Geen adres gevonden. Probeer het nog eens.",
  for_who: "Voor wie is het eten?",

  // For Who
  name: "Naam",
  phone_number: "Telefoonnummer",

  // For when
  for_when: "Voor wanneer is het eten?",
  date: "Datum",
  time: "Tijdstip",
  select_time: "Selecteer een tijdstip",
  asap: "zo snel mogelijk",
  remarks: "Opmerkingen",
  remarks_placeholder: "babi pangang zonder saus",
  save_remarks: "Mijn opmerkingen opslaan.",

  //Payment
  payment_method: "Hoe wil je betalen?",
  at_store: "Winkel",
  cash: "Contant",
  ideal: "iDeal",
  place_order: "Bestelling plaatsen",

  // Validation
  postalcode_not_valid: "Postcode is ongeldig.",
  no_delivery_here: "Wij bezorgen niet in uw regio.",
  house_number_not_valid: "Huisnummer is ongeldig.",
  required: "Verplicht.",
  tel_not_valid: "Telefoonnummer is ongeldig.",
  email_not_valid: "E-mailadres is ongeldig.",
  remarks_max: "Mag niet meer dan 500 tekens bevatten.",
  min_6: "Moet minstens 6 tekens bevatten.",

  // Succes page
  thank_you: "Dankjewel!",
  order_received_pick_up: (data) => (
    <>
      Wij hebben je bestelling in goede orde ontvangen. Je bestelling staat
      gereserveerd onder de naam <Emp className="capitalize">{data.name}</Emp>{" "}
      en zal <Emp>vandaag</Emp> rond <Emp>{data.time}</Emp> uur klaar staan om{" "}
      <Emp>opgehaald</Emp> te worden.
    </>
  ),
  order_received_delivery: (data) => {
    const asap = !data.time?.includes("-");
    return (
      <>
        Wij hebben je bestelling in goede orde ontvangen. Je bestelling staat
        gereserveerd onder de naam <Emp className="capitalize">{data.name}</Emp>{" "}
        en wordt {asap ? "" : <Emp>vandaag</Emp>} {asap ? "" : "tussen"}{" "}
        {asap ? <Emp>zo snel mogelijk</Emp> : <Emp>{data.time}</Emp>} uur
        bezorgt naar{" "}
        <Emp>{`${data.address.street} ${data.address.houseNumber}${
          data.addition ? `${data.addition}` : ""
        }`}</Emp>
        .
      </>
    );
  },
  mail_sent: (email) => (
    <>
      Verder hebben wij een bevestingsmail gestuurd naar <Emp>{email}</Emp>. Heb
      je geen email ontvangen? Controleer je spam folder of neem contact met ons
      op via{" "}
      <a href="tel:+31252372902" className="text-main font-medium">
        0252 37 29 02
      </a>
      .
    </>
  ),
  something_went_wrong:
    "Er is iets misgegaan. Probeer het nogmaals of neem contact met ons op via",
  try_again: "Probeer opnieuw",

  // Contact page
  opening_hours: (openingTime, closingTime) => (
    <>
      New Hong kong is van dinsdag tot en met zondag geopend van{" "}
      <Emp>{openingTime}</Emp> tot <Emp>{closingTime}</Emp>. Gesloten op maandag
      met uitzondering van feestdagen. Een{" "}
      <Link href="/menu">
        <a>
          <Emp>bestelling</Emp>
        </a>
      </Link>{" "}
      plaatsen of een{" "}
      <Link href="/">
        <a>
          <Emp>catering</Emp>
        </a>
      </Link>{" "}
      reserveren kan zowel online als telefonisch. Wilt je een tafel reserveren?
      Dan kan dat echter alleen{" "}
      <a href="tel:+31252372902">
        <Emp>telefonisch</Emp>
      </a>
      .
    </>
  ),
};
