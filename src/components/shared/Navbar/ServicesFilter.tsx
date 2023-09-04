import { CheckedIcon } from "@/components/utilis/Icons";
import React, { useState, useEffect } from "react";

interface ServicesFilterProps{
    onTypeSelect:(arg0: string[])=>void
} 
const ServicesFilter = ({onTypeSelect}: ServicesFilterProps) => {
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
  useEffect(()=>{
    onTypeSelect && onTypeSelect(typeFilters)
  },[typeFilters])
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
      <div ref={servicesDesktopRef} className="border-r border-grey px-2 2xl:px-6 last:border-r-0 cursor-pointer">
        <p
        onClick={()=>setShowDesktopType(!showDesktopType)}
          className={
            showDesktopType ? "rounded-xl py-2 px-7 bg-white" : "py-2 px-7"
          }
        >
          Type
        </p>
        {showDesktopType &&
            <div className="absolute top-[75px] -ml-2 z-20 flex flex-col items-center justify-center w-56 pt-5 px-7 text-black rounded-3xl bg-white shadow-[6px_4px_25px_6px_rgba(176,176,176,0.25)]">
            {types.map((item, index) => {
                return (
                <div
                    key={index}
                    className="flex w-full cursor-pointer mb-[19px]"
                    onClick={() => onClickTypeCheckbox(item.name)}
                >
                    <div
                    className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5  ${
                        typeFilters.includes(item.name)
                        ? "bg-gradient-to-b from-pink-500 to-orange-500"
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
