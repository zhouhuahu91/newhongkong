const createItemId = (item, selectedOptions, selectedSides) => {
  // We need to create a new id for the item that also includes the options and sides.

  // If optionIsMain is true than we replace the id with the option id.
  if (item.optionIsMain) {
  }

  return item.id;
};

export default createItemId;
