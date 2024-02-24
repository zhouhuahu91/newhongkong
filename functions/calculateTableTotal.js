const calculateTableTotal = (table) => {
  let price = 0;
  price += table.food.reduce((x, y) => x + y.price, 0);
  price += table.beverages.reduce((x, y) => x + y.price, 0);

  return price;
};

export default calculateTableTotal;
