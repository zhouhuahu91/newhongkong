const createItemDescription = (item, options, sides) => {
  // We need it in all the languages.
  const languages = ["nl", "en", "de"];
  // We just need these translations to finish the description.
  const t = {
    nl: {
      with: "met",
      and: "en",
    },
    en: {
      with: "with",
      and: "and",
    },
    de: {
      with: "mit",
      and: "und",
    },
  };
  const description = {};

  languages.forEach((language) => {
    let tempDescription = "";
    // We only at description for the option if there are options and if the selected option...
    // is not the main.
    if (options.length && !item.optionIsMain) {
      // We map over the selectedOptions.
      options.map((option, idx) => {
        // If the current option is the last one in the array we do not add a ",".
        return options.length - 1 === idx
          ? (tempDescription += `${option.name[language]} `)
          : (tempDescription += `${option.name[language]}, `);
      });
    }

    // We only at description for sides if there are sides.
    if (sides.length) {
      // If there are two sides and the both sides are the same we return...
      // "with 2x sides".
      if (sides.length === 2 && sides[0].id === sides[1].id) {
        tempDescription += `${t[language].with} 2x ${sides[0].name[language]}`;
      } else {
        // We map over the selectedSides.
        sides.map((side, idx) => {
          // If the current side is the first one we at "met " otherwise we add "en ".
          return idx === 0
            ? (tempDescription += `${t[language].with} ${side.name[language]} `)
            : (tempDescription += `${t[language].and} ${side.name[language]} `);
        });
      }
    }

    // We add the tempDescription to the description object.
    description[language] = tempDescription;
  });

  return description;
};

export default createItemDescription;
