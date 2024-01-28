import { CheckedIcon } from "@/components/utilis/Icons";
import React, { useState, useEffect } from "react";
import { ColorsThemeA } from "@/components/utilis/Themes";
import { getLocalStorage } from "@/api/storage";

interface ServicesFilterProps {
  onTypeSelect: (arg0: string[]) => void,
  onLengthSelect: (arg0: string[]) => void
}

const ServicesFilter = ({ onTypeSelect, onLengthSelect }: ServicesFilterProps) => {
  const [showDesktopType, setShowDesktopType] = useState(false);
  const [showDesktopLength, setShowDesktopLength] = useState(false);
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const [lengthFilters, setLengthFilters] = useState<string[]>([]);
  const servicesDesktopRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const LengthDesktopRef =
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
      nameFr: "Traitement spécial",
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

  const Length = [
    {
      name: "Short",
      nameFr: "Court",
    },
    {
      name: "Medium",
      nameFr: "Moyen",
    },
    {
      name: "Long",
      nameFr: "Long",
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
  const onClickLengthCheckbox = (length: string) => {
    if (lengthFilters.includes(length)) {
      setLengthFilters(lengthFilters.filter((item) => item !== length));
    } else {
      setLengthFilters((prev) => [...prev, length]);
    }
  };

  useEffect(() => {
    onTypeSelect && onTypeSelect(typeFilters)
  }, [typeFilters])

  useEffect(() => {
    onLengthSelect && onLengthSelect(lengthFilters)
  }, [lengthFilters])

  const closeSelectBox = ({ target }: MouseEvent): void => {
    if (!servicesDesktopRef.current?.contains(target as Node)) {
      setShowDesktopType(false);
    }
  };

  const getBasedFilter = () => {
    const user = getLocalStorage("user");
    const isEnableHaircutFilter = user ? (JSON.parse(user).user_preferences ? JSON.parse(user).user_preferences.haircut_filter : 0) : 0;
    const length_sought = user ? (JSON.parse(user).user_preferences ? String(JSON.parse(user).user_preferences.length_sought) : "") : "";
    if(user){
        let length = length_sought === 'Long' ? ['Long'] : length_sought === 'Moyen' ? ['Medium'] : length_sought === 'Court' ? ['Short'] : [];
        if(isEnableHaircutFilter){
          setLengthFilters(length)
        }
        else {
          setLengthFilters([]);
        }
    }
  }

  useEffect(() => {
    getBasedFilter()
    document.addEventListener("click", closeSelectBox);
    return () => {
      document.removeEventListener("click", closeSelectBox);
    };
  }, []);

  return (
    <>
      <div ref={servicesDesktopRef}
        className={typeFilters.length > 0
          ? `h-6 md:h-8 lg:h-10 rounded-xl py-0 md:py-1 lg:py-2 cursor-pointer px-6 ml-2 ${ColorsThemeA.filterSelected} text-white font-semibold`
          : (servicesDesktopRef ? "h-6 md:h-8 lg:h-10 rounded-xl py-0 md:py-1 lg:py-2 px-6 ml-2 hover:bg-stone-200 text-black font-semibold cursor-pointer" 
          : "h-6 md:h-8 lg:h-10 hover:bg-white rounded-xl px-6 py-0 md:py-1 lg:py-2 ml-2")}
      >
        <p
          onClick={() => {
            setShowDesktopLength(false)
            setShowDesktopType(!showDesktopType)
          }}
        >
          Type
        </p>
        {showDesktopType &&
          <div className="absolute -ml-2 z-30 flex flex-col items-center justify-center w-56 pt-5 px-7 text-black rounded-3xl bg-white shadow-md shadow-stone-300">
            {types.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex w-full cursor-pointer mb-[19px] text-sm "
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
      <div ref={LengthDesktopRef}
        className={lengthFilters.length > 0
          ? `h-6 md:h-8 lg:h-10 rounded-xl cursor-pointer py-0 md:py-1 lg:py-2 px-6 ml-2 ${ColorsThemeA.filterSelected} text-white font-semibold`
          : (LengthDesktopRef ? 
              "h-6 md:h-8 lg:h-10 rounded-xl py-0 md:py-1 lg:py-2 px-6 ml-2 hover:bg-stone-200 text-black font-semibold cursor-pointer" 
              : "h-6 md:h-8 lg:h-10 hover:bg-white rounded-xl py-0 md:py-1 lg:py-2 px-6 ml-2")}
      >
        <p
          onClick={() => {
            setShowDesktopType(false)
            setShowDesktopLength(!showDesktopLength)
          }}
        >
          Longueur
        </p>
        {showDesktopLength && (
          <div className="absolute  z-20 flex flex-col items-center justify-center w-32 mt-4 pt-5 px-2 lg:px-7 text-black rounded-2xl bg-white shadow-md shadow-stone-300">
            {Length.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex w-full cursor-pointer mb-[19px]  transform hover:scale-110 text-sm "
                  onClick={() => onClickLengthCheckbox(item.name)} // Conservez 'item.name' pour la logique interne
                >
                  <div
                    className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5  transform hover:scale-105 ${lengthFilters.includes(item.name) ? ColorsThemeA.OhcGradient_A : "bg-[#D6D6D6]"}`}
                  >
                    <CheckedIcon />
                  </div>
                  <p className="ml-2">{item.nameFr}</p> {/* Utilisez 'item.nameFr' pour l'affichage */}
                </div>
              );
            })}
          </div>

        )}
      </div>
    </>
  );
};

export default ServicesFilter;
