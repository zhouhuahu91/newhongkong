const createItemId = (item, selectedOptions, selectedSides) => {
  // If there are no options and no sides it means that the item id is all we need
  if (!selectedOptions.length && !selectedSides.length) {
    return item.id;
  }
  // If there are options and sides want to create a new id with them as well.
  let id = "";

  // When optionIsMain is true it means that the option that the user chooses is the main dish.
  // This also means that the selectedOptions should only be one item.
  // If not true it means that the option are the sides or the dishes that they have to combine  themselfs.
  if (item.optionIsMain) {
    // If option is main we return the option id as the id of the item.
    id = selectedOptions[0];
    // If the item also has sides we want to add that to the id.
    if (selectedSides.length > 0) {
      id += `_${selectedSides.sort().join("_")}`;
    }

    return id;
  }

  // If the item has options or sides and the option is the main dish it self we want to...
  // ...create a new id when them.
  // It converts like this: 96 ["A", "B"] ["B1"] => 96_A_B_B1.
  return `${item.id}${
    selectedOptions.length ? `_${selectedOptions.sort().join("_")}` : ""
  }${selectedSides.length ? `-${selectedSides.sort().join("_")}` : ""}`;
};

export default createItemId;
