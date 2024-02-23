const calculateTableVat = (table) => {
  // currently low is 9%
  let low = 0;
  // high is 21%
  let high = 0;
  // there are also items with zero vat
  let zero = 0;

  table.food.forEach((item) => {
    if (item.btw === 9) {
      // add the price to low
      low += item.price;
    } else if (item.btw === 21) {
      // add the price to high
      high += item.price;
    } else if (item.btw === undefined) {
      // if items doesn't specify btw we assume it is low
      low += item.price;
    }
  });

  table.beverages.forEach((item) => {
    if (item.btw === 9) {
      // add the price to low
      low += item.price;
    } else if (item.btw === 21) {
      // add the price to high
      high += item.price;
    } else if (item.btw === undefined) {
      // if items doesn't specify btw we assume it is low
      low += item.price;
    }
  });
  zero += table.tip;
  return { low, high, zero };
};

export default calculateTableVat;
