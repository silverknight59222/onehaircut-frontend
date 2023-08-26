import { LogoIcon, LogoCircle } from "@/components/utilis/Icons";
import React from "react";

export default function Page() {
  return (
    <div className="flex flex-col mt-14 w-full items-center justify-center">
      <div className="-z-50 fixed  -left-32 md:-left-28 -bottom-32 md:-bottom-28 overflow-hidden">
        <LogoCircle />
      </div>
      <div>
        <LogoIcon />
      </div>
      <div className="md:max-w-[1022px] w-full px-4 md:mx-16">
        <div className="mt-28 2xl:mt-40 mb-10 2xl:mb-16 text-center ">
          <h1 className="text-black font-bold text-5xl md:text-7xl">
            Site web en cours de construction!
          </h1>
          <p className="text-black text-xl md:text-3xl mt-7 md:mt-3">
            Nous travaillons dur pour vous offrir une expérience utilisateur
            exceptionnelle.
          </p>
        </div>
        <div className="flex items-center justify-center relative">
          <input
            type="email"
            placeholder="Entrez votre adresse email"
            className="relative h-16 md:h-24 w-full md:w-4/5 rounded-md p-4 md:p-7 text-base md:text-xl outline-none"
            style={{ boxShadow: "0px 18px 58px 0px rgba(255, 125, 60, 0.21)" }}
          />
          <button
            type="button"
            className="absolute right-2 md:right-28 cursor-pointer text-white text-sm md:text-lg font-semibold py-3 px-3 md:py-6 md:px-10 rounded-xl md:w-56 placeholder:text-sm"
            style={{
              background:
                "linear-gradient(90deg, #FE2569 0%, #FD4C55 54.89%, #FF8636 100%)",
            }}
          >
            PRÉVENEZ-MOI
          </button>
        </div>
      </div>
    </div>
  );
}
