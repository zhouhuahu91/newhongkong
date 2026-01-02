import useI18n from "@/hooks/useI18n";

import Emp from "@/components/Emphasize";
import ToolTip from "@/components/ToolTip";

// Is onyl in dutch. English and German is not yet implemented.

const Catering = () => {
  const t = useI18n();
  const dishes = [
    {
      name: {
        nl: "babi pangang",
        en: "babi pangang",
      },
      description: {
        nl: "geroosterde varkensvlees reepjes in licht pikante tomatensaus",
        en: "deep fried lean pork strips in a mild spicy sauce",
      },
    },
    {
      name: {
        nl: "foe yong hai kip",
        en: "egg foo young chicken",
      },
      description: {
        nl: "omelet met kipfilet in zoete tomatensaus",
        en: "omelet with chicken in a sweet tomato sauce",
      },
    },
    {
      name: {
        nl: "tjap tjoy kip",
        en: "tjap tjoy chicken",
      },
      description: {
        nl: "roergebakken taugé, paprika, uien, champignons, bamboestrips en prei met kipfilet",
        en: "stir fried beansprout, paprika, onion, mushrooms, bamboo shoots and leek with chicken",
      },
    },
    {
      name: {
        nl: "saté ajam",
        en: "chicken satay",
      },
      description: {
        nl: "1 stokje kip saté per persoon",
        en: "1 chicken satay per person",
      },
    },
    {
      name: {
        nl: "pikante kip",
        en: "spicy chicken",
      },
      description: {
        nl: "roergebakken kipfilet met groenten in een licht pikante saus",
        en: "stir fried chicken with vegetables in a mild spicy sauce",
      },
    },
    {
      name: {
        nl: "kou lou kai",
        en: "kou lou kai",
      },
      description: {
        nl: "gepaneerde kipballetjes met zoetzure saus",
        en: "deep fried chicken in dough with a sweet & sour sauce",
      },
    },
    {
      name: {
        nl: "mini loempia's",
        en: "mini rolls",
      },
      description: {
        nl: "vegetarische mini loempias",
        en: "vegetarian mini rolls",
      },
    },
    {
      name: {
        nl: "nasi en bami goreng",
        en: "fried rice and noodles",
      },
      description: {
        nl: "roergebakken met ei, varkensvlees, ham en prei",
        en: "stir fried with egg, pork, ham and leek",
      },
    },
  ];
  return (
    <div className="max-w-md mx-auto">
      <div className="relative sm:border p-4 sm:p-6 space-y-2 rounded-xl sm:mt-10 sm:bg-white sm:shadow">
        <h1 className="font-semibold text-3xl">{t.catering}</h1>
        <p className="">
          Voor zowel particuliere als zakelijke gasten verzorgt New Hong Kong de
          catering in de vorm van lopende buffetten. Deze lopende buffetten
          worden bij u <Emp>thuis of op de zaak bezorgd</Emp>, waarna de
          gerechten warm worden gehouden door middel van rechauds. De kosten
          voor een standaard buffet bedragen <Emp>€ 16,50 per persoon</Emp> en
          is mogelijk <Emp>vanaf 20 personen</Emp>. Dit is inclusief borden,
          bestek en servetten.
        </p>
        <div>
          {dishes.map((dish) => (
            <div className="flex items-center" key={dish.name["nl"]}>
              <p className="list-item ml-4 mr-1">{dish.name["nl"]}</p>
              <ToolTip tip={dish.description["nl"]} />
            </div>
          ))}
        </div>
        <p className="">
          Naast onze standaard samengestelde lopende buffetten, kunt u uiteraard
          een samenstelling naar uw eigen wensen maken. Heeft u een feestelijke
          activiteit thuis of op werk,{" "}
          <a href="tel:+31252372902">
            <Emp>bel</Emp>
          </a>{" "}
          of{" "}
          <a href="mailto:info@newhongkong.nl">
            <Emp>mail</Emp>
          </a>{" "}
          ons gerust over de mogelijkheden.
        </p>
      </div>
    </div>
  );
};

export default Catering;
