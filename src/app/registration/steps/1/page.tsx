"use client";
import { LogoIcon } from "@/components/utilis/Icons";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { RegistrationCheckedIcon } from "@/components/utilis/Icons";
import { setLocalStorage } from "@/api/storage";
const Step1 = () => {
  const route = useRouter();
  const [selectedType, setSelectedType] = useState("Barber Shop");
  const [salonName, setSalonName] = useState("");
  const items = [
    { name: "Barber Shop", img: "/assets/salon_types/BarberShop.png" },
    {
      name: "Salon de coiffure pour femme",
      img: "/assets/salon_types/Salon de coiffure pour femme.png",
    },
    {
      name: "Salon de coiffure pour homme",
      img: "/assets/salon_types/Salon de coiffure pour homme.png",
    },
    {
      name: "Coiffeuse indépendante",
      img: "/assets/salon_types/Coiffeuse indépendante.png",
    },
    {
      name: "Salon de coiffure mixte",
      img: "/assets/salon_types/Salon de coiffure mixte.png",
    },
    {
      name: "Coiffeur Independant",
      img: "/assets/salon_types/Coiffeur Independant.png",
    },
  ];

  const onClickNext = () => {
    let salonType = '';
    if (selectedType === "Barber Shop") {
      salonType = "barber_shop";
    } else if (selectedType === "Salon de coiffure pour femme") {
      salonType = "women_hair_salon";
    } else if (selectedType === "Salon de coiffure pour homme") {
      salonType = "men_hair_salon";
    } else if (selectedType === "Salon de coiffure mixte") {
      salonType = "unisex_hair_salon";
    } else if (selectedType === "Coiffeuse indépendante") {
      salonType = "independent_woman_mobile_hairdresser";
    } else if (selectedType === "Coiffeur Independant") {
      salonType = "independent_man_mobile_hairdresser";
    } 
    setLocalStorage('salon_type', salonType);
    setLocalStorage('salon_name', salonName);
    route.push("/registration/steps/2")
  }
  return (
    <div className="px-7 mb-8">
      <div className="flex items-center justify-center border-b border-[#EBF0F2] mt-5 pb-3">
        <LogoIcon />
      </div>
      <div className="flex flex-col items-center justify-center mt-7">
        <p className="text-black font-semibold text-3xl md:text-4xl xl:text-5xl text-center">
          Quel type de salon souhaites-tu enregistrer ?{" "}
        </p>
        <div className="flex items-center lg:items-baseline justify-center gap-1 lg:gap-48 flex-col lg:flex-row">
          <div>
            <input
              placeholder="Nom du salon"
              onChange={(e)=>setSalonName(e.target.value)}
              value={salonName}
              className="border border-secondary rounded-xl w-80 sm:w-[500px] mt-7 py-4 px-6 md:px-10 outline-none"
            />
          </div>
          <div className="flex items-center justify-end mb-5 mt-10 w-full sm:w-auto">
            <button
              onClick={() => onClickNext()}
              disabled={selectedType ? false : true}
              className="w-full sm:w-56 h-14 text-white text-xl font-semibold rounded-xl bg-background-gradient shadow-[0px_17px_36px_0px_rgba(255,125,60,0.25)]"
            >
              Continuons !
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
            {items.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`relative flex flex-col items-center justify-center cursor-pointer
                  ${
                    item.name === selectedType
                      ? "border-4 border-secondary rounded-2xl"
                      : "border-4 border-white rounded-xl"
                  }`}
                  onClick={() => setSelectedType(item.name)}
                >
                  <img
                    src={item.img}
                    alt=""
                    width={259}
                    height={240}
                    className="rounded-t-xl"
                  />
                  <p className="flex items-center justify-center text-black font-semibold text-lg md:text-xl xl:text-2xl text-center w-64 h-[60px] mt-2 mb-3">
                    {item.name}
                  </p>
                  {item.name === selectedType && (
                    <div className="absolute -bottom-[19px] z-20 bg-white">
                      <RegistrationCheckedIcon />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
