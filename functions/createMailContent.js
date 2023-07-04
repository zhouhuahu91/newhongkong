// Function imports
import euro from "@/functions/euro";

const createMailContent = (data) => {
  // This is the cart "table" in the email.
  const createTable = (data) => {
    // Container for the order table with the title.
    let content = `
      <table style="border: 1px solid #e5e7eb; width: 100%; max-width: 434px; font-size: 14px;	border-radius: 0.75rem; margin-right: auto; margin-left: auto; padding: 1rem;">
        <tr>
        <td colspan="3" style="text-align: center; margin: 10px 0px; font-size: 1.875rem; font-weight: 600; color: #e76f51">Bestellijst</td>
        </tr>
    `;

    // For every item in the cart we create a row.
    data.cart.forEach(
      (item) =>
        (content += `
        <tr>
          <td style="text-align: left; padding-top: 10px;">
            ${item.qwt}
          </td>
          <td style="text-align: left; padding: 10px 5px 0px 5px">
            ${item.name["nl"]}
          </td>
          <td style="text-align: right; padding-top: 10px">
            ${euro(item.price)}
          </td>
        </tr>
        ${
          item.description["nl"].length
            ? `<tr>
            <td></td>
            <td colspan="2" style="text-align: left;padding-left: 5px ;font-size: 12px; color: rgba(107, 114, 128, 1)">${item.description["nl"]}</tr>`
            : ``
        }
        ${
          item.remarks.length
            ? `<tr>
            <td></td>
            <td colspan="2" style="text-align: left;padding-left: 5px ;font-size: 12px; color: rgba(107, 114, 128, 1)">${item.remarks}</tr>`
            : ``
        }
        `)
    );

    // Devider for items and subtotal.
    content += `<tr><td colspan="3" style="border-bottom: 1px solid #e5e7eb; padding-top: 2rem"></td><tr>`;

    // Subtotal.
    content += `
    <tr>
      <td colspan="2" style="text-align: left; padding-top: 1rem">subtotaal</td>
      <td colspan="1" style="text-align: right; padding-top: 1rem">${euro(
        data.cart.reduce((x, y) => x + y.price, 0)
      )}</td>
    </tr>`;

    // Delivery costs.
    if (data.delivery) {
      content += `
      <tr>
        <td colspan="2" style="text-align: left; padding-top: 0.5rem">bezorgkosten</td>
        <td colspan="1" style="text-align: right; padding-top: 0.5rem">${euro(
          data.storeFees.deliveryFee
        )}</td>
      </tr>`;
    }

    // Online payment costs.
    if (data.paymentMethod !== "in_person") {
      content += `
      <tr>
        <td colspan="2" style="text-align: left; padding-top: 0.5rem">transactiekosten</td>
        <td colspan="1" style="text-align: right; padding-top: 0.5rem">${euro(
          data.storeFees.transactionFee
        )}</td>
      </tr>`;
    }

    // We check if there is a packaging fee
    if (data.storeFees.packagingFee > 0) {
      content += `
      <tr>
        <td colspan="2" style="text-align: left; padding-top: 0.5rem">verpakkingstoeslag</td>
        <td colspan="1" style="text-align: right; padding-top: 0.5rem">${euro(
          data.storeFees.packagingFee
        )}</td>
      </tr>`;
    }

    if (data.bag && data.delivery === false) {
      content += `
      <tr>
        <td colspan="2" style="text-align: left; padding-top: 0.5rem">tasje</td>
        <td colspan="1" style="text-align: right; padding-top: 0.5rem">${euro(
          data.storeFees.plasticBagFee
        )}</td>
      </tr>`;
    }

    // Devider for subtotal and total.
    content += `<tr><td colspan="3" style="border-bottom: 1px solid #e5e7eb; padding-top: 1rem"></td><tr>`;

    // Tip.
    if (data.tip) {
      content += `
      <tr>
        <td colspan="2" style="text-align: left; padding-top: 1rem">fooi</td>
        <td colspan="1" style="text-align: right; padding-top: 1rem">${euro(
          data.tip
        )}</td>
      </tr>`;
    }

    // Total
    content += `
    <tr>
      <td colspan="2" style="text-align: left; padding-top: ${
        data.tip ? "0.5rem" : "1rem"
      }">totaal</td>
      <td colspan="1" style="text-align: right; padding-top:${
        data.tip ? "0.5rem" : "1rem"
      }">${euro(data.total)}</td>
    </tr>`;

    // Devider for total and payment method / remarks.
    content += `<tr><td colspan="3" style="border-bottom: 1px solid #e5e7eb; padding-top: 1rem"></td><tr>`;

    content += `
    <tr>
      <td colspan="3" style="text-align: left; padding-top: 1rem;">betaalmethode:
        <span style="float: right">${
          data.paymentMethod === "in_person"
            ? data.delivery === true
              ? "bij bezorging"
              : "bij afhalen"
            : "online betaald"
        }</span>
      </td>
    </tr>`;

    if (data.remarks) {
      content += `
      <tr>
        <td colspan="3" style="text-align: left; padding-top: 0.5rem">opmerkingen:</td>
      </tr>
      <tr>
        <td colspan="3" style="text-align: left; font-size: 12px; color: rgba(107, 114, 128, 1)">${data.remarks}</td>
      </tr>
      `;
    }

    content += "</table>";

    return content;
  };

  const asap = !data.time?.includes("-");

  const p = `style="font-size: 14px; color: #374151;"`;

  const Emp = (value) =>
    `<span style="color: #e76f51; font-weight: 600">${value}</span>`;

  const mailData = {
    from: `New Hong Kong <info@newhongkong.nl>`,
    to: data.email,
    subject: "Bedankt voor je bestelling.",
    html: `
        <head>
          <link rel="preconnect" href="https://fonts.gstatic.com">
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
        </head>
        <body>
          <div style="max-width: 55rem; font-family: 'Poppins', sans-serif;">
            <p ${p}>Hallo ${data.name},</p>
            <p ${p}>
              Bedankt voor je bestelling bij Chinees Indisch restaurant New Hong Kong.
            </p>
            <p ${p}>
              Wij hebben je bestelling in goede orde ontvangen. Je bestelling staat gereserveerd onder de naam ${Emp(
                data.name
              )} en
              ${
                data.delivery === true
                  ? `wordt ${
                      asap
                        ? Emp("zo snel mogelijk")
                        : `${Emp("vandaag")} tussen ${Emp(data.time)} uur`
                    } bezorgd naar:
                      <br>
                      <br>
                      ${Emp(
                        `${data.address.street} ${data.address.houseNumber}${
                          data.addition ? data.addition : ""
                        }`
                      )}<br>
                       ${Emp(
                         `${data.address.postalcode} ${data.address.city}`
                       )}`
                  : `zal ${Emp("vandaag")} rond ${Emp(
                      data.time
                    )} uur klaar staan om ${Emp("opgehaald")} te worden op:
                    <br>
                    <br>
                    ${Emp("Havenstraat 13")}<br>
                    ${Emp("2211EE Noordwijkerhout")}`
              }
            </p>
            <br>
            ${createTable(data)}
            <br>
            <p ${p}>
              Heb je vragen of een opmerking over je bestelling? Neem dan telefonisch contact op met ons via
              <a style="text-decoration: none; color: #e76f51; font-weight: 800" href="tel:+31252372902">0252 37 29 02<a>.
            </p>
            <p ${p}>
              Met vriendelijke groet,<br>
              <br>
              Zhouhua Hu<br>
              New Hong Kong
            </p>
          </div>
        </body>
        `,
  };
  return mailData;
};

export default createMailContent;
