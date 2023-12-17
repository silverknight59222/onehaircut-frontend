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
  const types = [
    {
      name: "Coloration",
      value: "coloration",
    },
    {
      name: "Discount",
      value: "discount",
    },
    {
      name: "Care",
      value: "care",
    },
    {
      name: "Special treatment",
      value: "special_treatment",
    },
    {
      name: "Men",
      value: "men",
    },
    {
      name: "Styling",
      value: "styling",
    },
  ];

  const onClickTypeCheckbox = (item: string) => {
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
          ? `rounded-xl py-2 px-7 ${ColorsThemeA.filterSelected} text-white font-semibold`
          : (servicesDesktopRef ? "rounded-xl py-2 px-7 bg-white text-black font-semibold" : "hover:bg-white rounded-xl py-2 px-7")}
      >
        <p
          onClick={() => setShowDesktopType(!showDesktopType)}

        >
          Type
        </p>
        {showDesktopType &&
          <div className="absolute -ml-2 z-30 flex flex-col items-center justify-center w-56 pt-5 px-7 text-black rounded-3xl bg-white shadow-[6px_4px_25px_6px_rgba(176,176,176,0.25)]">
            {types.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex w-full cursor-pointer mb-[19px]"
                  onClick={() => onClickTypeCheckbox(item.name)}
                >
                  <div
                    className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5  ${typeFilters.includes(item.name)
                      ? ColorsThemeA.OhcGradient_A
                      : "bg-[#D6D6D6]"
                      }`}
                  >
                    <CheckedIcon />
                  </div>
                  <p className="ml-2 whitespace-nowrap">{item.name}</p>
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
