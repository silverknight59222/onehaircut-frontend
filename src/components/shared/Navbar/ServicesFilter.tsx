import { CheckedIcon } from "@/components/utilis/Icons";
import React, { useState, useEffect } from "react";
import { ColorsThemeA } from "@/components/utilis/Themes";

interface ServicesFilterProps {
  onTypeSelect: (arg0: string[]) => void
}

const ServicesFilter = ({ onTypeSelect }: ServicesFilterProps) => {
  const [showDesktopType, setShowDesktopType] = useState(false);
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const servicesDesktopRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;

  // Ajout d'une propriété 'nameFr' pour le nom en français
  const types = [
    {
      name: "Coloration",
      value: "coloration",
      nameFr: "Coloration", // En français, c'est la même chose
    },
    /*
    {
      name: "Discount",
      value: "discount",
      nameFr: "Promotion",
    },
  */
    {
      name: "Care",
      value: "care",
      nameFr: "Soin",
    },
    {
      name: "Special treatment",
      value: "special_treatment",
      nameFr: "Traitement",
    },
    {
      name: "Men",
      value: "men",
      nameFr: "Hommes",
    },
    {
      name: "Styling",
      value: "styling",
      nameFr: "Coiffure",
    },
  ];

  const onClickTypeCheckbox = (item: string) => {
    // Utilisez 'value' pour la gestion des états, pas 'nameFr'
    if (typeFilters.includes(item)) {
      setTypeFilters(typeFilters.filter((filter) => filter !== item));
    } else {
      setTypeFilters((prev) => [...prev, item]);
    }
  };

  useEffect(() => {
    onTypeSelect && onTypeSelect(typeFilters)
  }, [typeFilters])

  const closeSelectBox = ({ target }: MouseEvent): void => {
    if (!servicesDesktopRef.current?.contains(target as Node)) {
      setShowDesktopType(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeSelectBox);
    return () => {
      document.removeEventListener("click", closeSelectBox);
    };
  }, []);

  return (
    <>
      <div ref={servicesDesktopRef}
        className={typeFilters.length > 0
          ? `rounded-xl py-2 cursor-pointer px-6 ml-2 ${ColorsThemeA.filterSelected} text-white font-semibold`
          : (servicesDesktopRef ? "rounded-xl py-1 px-6 ml-2 hover:bg-stone-200 text-black font-semibold cursor-pointer" : "hover:bg-white rounded-xl px-6 ml-2")}
      >
        <p
          onClick={() => setShowDesktopType(!showDesktopType)}
        >
          Type
        </p>
        {showDesktopType &&
          <div className="absolute -ml-2 z-30 flex flex-col items-center justify-center w-56 pt-5 px-7 text-black rounded-3xl bg-white shadow-md shadow-stone-300">
            {types.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex w-full cursor-pointer mb-[19px]"
                  // Utilisez 'value' pour la gestion des états et des clics
                  onClick={() => onClickTypeCheckbox(item.value)}
                >
                  <div
                    className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5 ${typeFilters.includes(item.value) ? ColorsThemeA.OhcGradient_A : "bg-[#D6D6D6]"}`}
                    style={{ width: '20px', height: '20px' }}
                  >
                    <CheckedIcon />
                  </div>
                  {/* Affichez 'nameFr' pour l'utilisateur */}
                  <p className="ml-2 whitespace-nowrap">{item.nameFr}</p>
                </div>
              );
            })}
          </div>
        }
      </div>
    </>
  );
};

export default ServicesFilter;
