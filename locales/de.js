import Link from "next/link";
import euro from "@/functions/euro";
import Emp from "@/components/Emphasize";

export default {
  locale: "de",

  // ******** HEADER ********

  home: "Home",
  menu: "Menü",
  order: "Bestellen",
  catering: "Catering",
  contact: "kontakt",
  sign_out: "Abmelden",
  signed_in_as: "Angemeldet als",

  // ******** HEADER ********

  // ******** SIGN IN ********

  welcome: "Willkommen",
  welcome_text: "Zur Anmeldung!",
  sign_in: "Anmelden",
  or: "oder",
  sign_in_google: "Mit Google anmelden",
  sign_in_facebook: "Mit Facebook anmelden",
  forgot_password: "Passwort vergessen?",
  sign_in_failed:
    "Wir konnten die Kombination von E-Mail und Passwort nicht finden. Versuche es noch einmal.",
  exists_with_different_credential:
    "Account mit dieser E-Mail Adresse existiert bereits.",
  no_account: "Noch keinen Account?",
  sign_up_here: "Registrieren",
  email: "E-Mail",
  password: "Passwort",

  // ******** SIGN IN ********

  // ******** SIGN UP ********

  // ******** SIGN UP ********

  // ******** FORGOT PASSWORD ********

  reset_password: "Passwort zurücksetzen",
  reset_password_info:
    "Wir werden Ihnen eine E-Mail zum Zurücksetzen des Passworts zusenden.",
  back_to_signup: "Zurück zur Anmeldung",
  send: "Senden",
  reset_password_succes:
    "Vielen Dank, in wenigen Minuten werden Sie eine E-Mail mit einem Link zum Zurücksetzen des Passworts erhalten.",
  reset_password_failed:
    "Wir konnten die angegebene E-Mail Adresse nicht finden. Versuche es noch einmal.",

  // ******** FORGOT PASSWORD ********

  // ******** MENU ********

  choose_an_option: "Eine Option auswählen *",
  choose_two_options: "Zwei Optionen auswählen *",
  choose_three_options: "Drei Optionen auswählen *",
  cancel: "Abbrechen",
  add_for: "Hinzufügen für",
  rather_pick_up: "Möchten Sie Ihre Bestellung lieber abholen?",
  rather_deliver:
    "Möchten Sie lieber, dass Ihre Bestellung zu Ihnen geliefert wird?",

  // ******** MENU ********

  // ******** CHECKOUT ********

  almost_done: "Fast geschafft",
  online: "Online",
  pay: "Zahlen",

  // ******** CHECKOUT ********

  // Common
  customer_service: "Kundendienst",
  yesterday: "gestern",
  back_to: "Zurück zu",
  search: "suchen",
  profile: "Profil",
  settings: "Einstellungen",
  address: "adresse",
  dashboard: "Dashboard",
  favorites: "Favouriten",
  order_history: "Bestellungshistorie",
  order_again: "Nochmal bestellen",
  your_order: "Deine Bestellung",
  closed: "Geschlossen",
  minimum: "Minimum",
  attention: "Achtung",
  understood: "Verstanden",
  popular: "Beliebt",

  // Banner
  store_open_soon: (openingTime) => (
    <span>
      Wir öffnen um {openingTime} Uhr, aber Sie können Ihre Bestellung bereits
      online aufgeben.
    </span>
  ),
  store_closing_soon: (remainingTime) => (
    <span>
      Wir schließen in {remainingTime}{" "}
      {remainingTime === 1 ? "Minute" : "Minuten"}.
    </span>
  ),
  store_closed: (openingTime, closingTime) => (
    <span>
      Geschlossen, wir sind von Dienstag bis Sonntag geöffnet von {openingTime}{" "}
      bis {closingTime} Uhr. Montags geschlossen außer an Feiertagen.
    </span>
  ),
  custom_message: "",

  // sign up page
  sign_in_text: "Zur Registrierung!",
  sign_up: "Registrieren",
  already_have_account: "Sie haben bereits einen Account?",
  email_already_used: "Account mit dieser E-Mail Adresse existiert bereits.",
  our: "Unsere",
  privacy_policy: "Datenschutz",
  applies: "gilt",

  // Profile
  save: "Speichern",
  settings_information: "Profiländerungen können hier vorgenommen werden.",
  change_name: "Ändern Sie Ihren Namen hier.",
  change_phone_number: "Ändern Sie Ihre Telefonnummer hier.",
  change_address: "Ändern Sie Ihre Adresse hier.",
  change_email: "Ändern Sie Ihre E-Mail Adresse hier.",
  change_password: "Ändern Sie das Passwort hier.",
  new_email: "neue E-Mail",
  current_password: "aktuelles Passwort",
  new_password: "neues Passwort",
  wrong_password: "Passwort ist nicht gültig",

  // Modal

  // Cart
  cart: "Einkaufswagen",
  to_cart: "Einkaufswagen ansehen",
  to_checkout: "Zur Kasse",
  back_to_checkout: "Zurück zur Kasse",
  back_to_menu: "Zurück zur Menü",
  your_cart_is_empty: "Ihr Einkaufswagen ist leer.",
  subtotal: "Zwischensumme",
  delivery_fee: "Liefergebühr",
  transaction_fee: "Transaktionsgebühr",
  restaurant_tip: "Trinkgeld",
  total: "Gesamt",
  bag: "Plastiktüte",
  bag_tooltip:
    "Das Gesetz schreibt uns vor eine Plastiktütegebühr einzufordern. Falls Sie Ihre eigene Tasche mitbringen sollten, wählen Sie bitte diese Auswahl ab.",

  // Functions
  with: "mit",
  and: "und",
  today: "Heute",
  days: [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ],
  months: [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ],

  // Pick up or delivery
  pickup_delivery: "Wollen Sie die Bestellung abholen oder geliefert bekommen?",
  pick_up: "Abholung",
  delivery: "Lieferung",
  coming_up: "Kommt bald",
  no_orders: "Keine Bestellungen",
  delivery_warning_sundayOrHoliday: () => (
    <>
      An Sonn- und gesetzliche Feiertagen liefern wir zwischen{" "}
      <Emp>17.00Uhr</Emp> und <Emp>19.00Uhr</Emp> nicht aus.
    </>
  ),
  delivery_warning: (required) => (
    <>
      Der Mindestbestellwert für eine Lieferung beträgt <Emp>€ 20,00</Emp>,{" "}
      wobei Lieferkosten nicht inkludiert sind. Es fehlen noch{" "}
      <Emp>{euro(required)}</Emp> bis zur Erreichung des Mindestbestellwerts.
    </>
  ),

  // To where
  to_where: "Wohin soll das Essen geliefert werden?",
  postalcode: "Postleitzahl",
  house_number: "Straßennummer",
  house_number_addition: "Zusatz",
  can_not_find_address: "Adresse konnte nicht gefunden werden",
  for_who: "Für wen ist das?",

  // For Who
  name: "Name",
  phone_number: "Telefonnummer",

  // For When
  for_when: "Wann soll geliefert werden?",
  date: "Datum",
  time: "Zeit",
  select_time: "Zeit auswählen",
  asap: "Sobald wie möglich",
  remarks: "Bemerkungen",
  remarks_placeholder: "Babi Pangang ohne Soße",
  save_remarks: "Bemerkungen speichern",
  closed_for_delivery: "Lieferung nicht verfügbar, Abholung ist möglich",

  // Payment
  payment_method: "Wie wollen Sie bezahlen?",
  at_store: "Im Geschäft",
  cash: "Bar",
  ideal: "iDeal",
  place_order: "Bestellung aufgeben",

  // Validation
  postalcode_not_valid: "Postleitzahl nicht gültig",
  no_delivery_here: "wir liefern nicht zu dieser Postleitzahl",
  house_number_not_valid: "Straßennummer ungültig",
  required: "benötigt",
  tel_not_valid: "Telefonnummer ungültig",
  email_not_valid: "E-Mail ungültig",
  remarks_max: "max. 500 Zeichen erlaubt",
  min_6: "muss mindestens 6 Zeichen enthalten",

  // Succes page
  thank_you: "Vielen Dank!",
  order_received_pick_up: (data) => (
    <>
      We are please to inform you that we have received your order. Your order
      is registered under the name of{" "}
      <Emp className="capitalize">{data.name}</Emp> and will be ready for{" "}
      <Emp>pick up</Emp> <Emp>today</Emp> around <Emp>{data.time}</Emp>.
    </>
  ),
  order_received_pick_up: (data) => (
    <>
      Wir freuen uns Ihnen mitteilen zu können, dass wir Ihre Bestellung
      erhalten haben. Ihre Bestellung ist unter den Namen{" "}
      <Emp className="capitalize">{data.name}</Emp> registriert und wird{" "}
      <Emp>heute</Emp> um ca. <Emp>{data.time}</Emp>Uhr für zur{" "}
      <Emp>Abholung</Emp> bereitstehen.
    </>
  ),
  order_received_delivery: (data) => {
    const asap = !data.time?.includes("-");
    return (
      <>
        Wir freuen uns Ihnen mitteilen zu können, dass wir Ihre Bestellung
        erhalten haben. Ihre Bestellung ist unter den Namen{" "}
        <Emp className="capitalize">{data.name}</Emp> registriert und wird
        ausgeliefert {asap ? "" : <Emp>heute</Emp>} {asap ? "" : "zwischen"}{" "}
        {asap ? <Emp>sobald wie möglich</Emp> : <Emp>{data.time}</Emp>} an{" "}
        <Emp>{`${data.address.street} ${data.address.houseNumber}${
          data.addition ? `${data.addition}` : ""
        }`}</Emp>
        .
      </>
    );
  },

  mail_sent: (email) => (
    <>
      Wir haben auch eine Bestätigung an <Emp>{email}</Emp> gesendet. Keine
      E-Mail erhalten? Überprüfen Sie Ihren Spam Ordner oder Sie können uns auch
      kontaktieren{" "}
      <a href="tel:+31252372902" className="text-main font-medium">
        0252 37 29 02
      </a>
      .
    </>
  ),
  something_went_wrong:
    "Etwas ist schief gelaufen. Bitte versuchen Sie es erneut oder kontaktieren Sie uns unter",
  try_again: "Erneut versuchen",

  // Contact page
  opening_hours: (openingTime, closingTime) => (
    <>
      New Hong kong ist von Diesntag bis Sonntag geöffnet von{" "}
      <Emp>{openingTime}</Emp> bis <Emp>{closingTime}</Emp>. Montags geschlossen
      außer an Feiertagen. Sie können eine Bestellung aufgeben für{" "}
      <Link href="/menu">
        <a>
          <Emp>Zum Mitnehmen</Emp>
        </a>
      </Link>{" "}
      oder eine Reserverierung für{" "}
      <Link href="/">
        <a>
          <Emp>Catering</Emp>
        </a>
      </Link>{" "}
      sowohl online als auch per Telefon. Um einen Tisch zu reservieren bitte
      nur per{" "}
      <a href="tel:+31252372902">
        <Emp>Telefon</Emp>
      </a>
      .
    </>
  ),
};
