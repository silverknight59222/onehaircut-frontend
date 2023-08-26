"use client";
import { LogoIcon } from "@/components/utilis/Icons";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Step1 = () => {
  const route = useRouter();
  const [selectedType, setSelectedType] = useState("");
  const items = [
    { name: "Barber Shop", img: "/assets/barber_shop.png" },
    { name: "Salon de coiffure pour femme", img: "/assets/female_style.png" },
    { name: "Salon de coiffure pour homme", img: "/assets/coiffure.png" },
    { name: "Coiffeuse indépendant", img: "/assets/coiffeuse.png" },
    { name: "Salon de coiffure mixte", img: "/assets/mixed.png" },
    { name: "Coiffeur indépendant", img: "/assets/hairdresser.png" },
  ];
  return (
    <div className="mb-4 md:mb-0">
      <div className="flex items-center justify-center border-b border-[#EBF0F2] mt-5 pb-3">
        <LogoIcon />
      </div>
      <div className="flex flex-col items-center justify-center mt-7">
        <p className="text-black font-normal text-3xl md:text-4xl text-center">
          Quel type de salon souhaites-tu enregistrer ?{" "}
        </p>
        <input
          placeholder="Nom du salon"
          className="border border-secondary rounded-xl w-80 sm:w-[500px] mt-7 py-4 px-6 md:px-10 outline-none"
        />
        <div className="flex flex-col items-center justify-center mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
            {items.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`flex flex-col items-center justify-center ${
                    index === 0 && "sm:-mt-6"
                  } ${index === 4 && "sm:-mb-5"}
                  ${item.name === selectedType && 'border-2 border-secondary rounded-xl'}`}
                  onClick={()=>setSelectedType(item.name)}
                >
                  <img src={item.img} alt="" width={259} height={240} />
                  <p className="text-black text-3xl text-center w-64">
                    {item.name}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="w-full flex items-center justify-center mb-5 mt-10">
            <button
              onClick={() => route.push("/steps/2")}
              disabled={selectedType ? false : true}
              className="w-56 h-14 text-white text-xl font-semibold rounded-xl bg-background-gradient shadow-[0px_17px_36px_0px_rgba(255,125,60,0.25)]"
            >
              Continuons !
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
