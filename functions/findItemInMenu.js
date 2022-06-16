const findItemInMenu = (id, menu) => {
  const newId = id.split("_")[0].replace(/\D/g, "");
  let item = null;
  menu.forEach((category) => {
    const found = category.items.find((x) => {
      return x.id === newId;
    });
    if (found) {
      item = found;
    }
  });

  return item ? item : "item not found";
};

export default findItemInMenu;
