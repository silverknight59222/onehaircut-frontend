"use client";
import {
  BgPricingTable,
  PackageCheckedIcon,
  PackageUnCheckedIcon,
  RegistrationCheckedIcon,
  PackageSelectedUnCheckedIcon
} from "@/components/utilis/Icons";
import { Theme_A } from "@/components/utilis/Themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const PricingTable = () => {
  const router = useRouter();
  const [activePlan, setActivePlan] = useState("pro");
  const packageNames = [
    "Agenda dynamique",
    "Mise en avant de votre salon",
    "Sélections de vos coiffures",
    "Proposition de prestations supplémentaires",
    "Enregistrement du personnel",
    "Lier vos salons",
    "Dashboard Complet",
    "OnehairBot Assistant",
    "Personnalisation de l'Interface",
  ];
  return (
    <div className="relative mt-40 w-full xl:w-auto">
      <BgPricingTable />
      <div className="w-[1230px] rounded-xl py-4 px-6">
        <div className="flex">
          <div className="absolute top-24">
            {packageNames.map((name, index) => {
              return (
                <p key={index} className="flex items-center text-black font-medium text-xl w-[220px] h-[100px] border-b-2 border-[#E4E8E9] pl-3 pr-5 ">
                  {name}
                </p>
              );
            })}
            <div className="font-bold text-black text-center mt-10 text-2xl">
              Prix
            </div>
          </div>
          <div
            onClick={() => setActivePlan("pro")}
            style={{
              background: activePlan === "pro" ? "linear-gradient(162deg, #FE2569 0%, #FD4C55 42.71%, #FF8637 86.46%, #FFE30F 100%)" : "none",
            }}
            className="w-[324px] absolute -top-24 left-[245px] flex flex-col items-center justify-center py-6 rounded-[20px] cursor-pointer"
          >
            <div className={activePlan === "pro" ? "text-3xl font-semibold text-white w-48 text-center" : "text-3xl font-semibold text-black w-48 text-center"}>
              OneHaircut Pro
            </div>
            <div className={activePlan === "pro" ? "flex items-center justify-center bg-[rgba(255,255,255,0.53)] mb-14 rounded-lg w-36 h-10 text-white font-semibold" : "flex items-center justify-center bg-slate-200 mb-14 rounded-lg w-36 h-10 text-black font-semibold"}>
              recommandé
            </div>
            {packageNames.map((_, index) => {
              return (
                activePlan === "pro" ? (<div key={index} className="flex items-center justify-center w-full h-[100px] border-b-2 border-[#E4E8E9] py-4">
                  <PackageCheckedIcon />
                </div>) : (
                  <div key={index} className="flex items-center justify-center w-full h-[100px] border-b-2 border-[#E4E8E9] py-4">
                    <RegistrationCheckedIcon />
                  </div>
                )
              );
            })}
            <div className="mt-2 h-[100px]">
              <p className={activePlan === "pro" ? "text-white font-medium text-4xl text-center" : "text-black font-medium text-4xl text-center"}>
                79€<span className="text-2xl">/ mois</span>
              </p>
              <div className="text-stone-500 font-medium my-2"> 5% de taxe de service</div>
              <div className="flex items-center gap-10 mt-1">
              </div>
            </div>
            {activePlan === "pro" && <div onClick={() => router.push('registration/plans?plan=pro')} className="flex items-center justify-center text-white rounded-xl -mb-12 w-44 h-12 bg-[#070E06] transform hover:scale-105 transition-transform">
              Aperçu de l’Abo
            </div>}
          </div>
          <div onClick={() => setActivePlan("standard")}
            style={{
              background: activePlan === "standard" ? "linear-gradient(162deg, #FE2569 0%, #FD4C55 42.71%, #FF8637 86.46%, #FFE30F 100%)" : "none",
            }}
            className="w-[324px] absolute -top-24 left-[560px] flex flex-col items-center justify-center pt-6 pb-9 rounded-[20px] cursor-pointer">
            <div className={activePlan === "standard" ? "text-3xl font-semibold text-white w-48 text-center mb-24" : "text-3xl font-semibold text-black w-48 text-center mb-24"}>
              OneHaircut standard
            </div>
            <div className="w-full border-r-2 border-[#E4E8E9]">
              {packageNames.map((_, index) => {
                return (
                  <div key={index} className="flex items-center justify-center w-full h-[100px] border-b-2 border-[#E4E8E9] py-4">
                    {index < 6 ?
                      (activePlan === "standard" ? <PackageCheckedIcon /> : <RegistrationCheckedIcon />)
                      :
                      (activePlan === "standard" ? <PackageSelectedUnCheckedIcon /> : <PackageUnCheckedIcon />)
                    }
                  </div>
                );
              })}
            </div>
            <div className="w-full h-[100px] flex flex-col items-center justify-center border-r-2 border-[#E4E8E9] py-4">
              <p className={activePlan === "standard" ? "text-white font-medium text-4xl" : "text-black font-medium text-4xl"}>Gratuit</p>
              <div className="text-stone-500 font-medium my-2"> 5% de taxe de service</div>
            </div>
            {activePlan === "standard" && <div onClick={() => router.push('registration/plans?plan=standard')} className="flex items-center justify-center text-white rounded-xl absolute -bottom-8 w-44 h-12 bg-[#070E06] transform hover:scale-105 transition-transform">
              Aperçu de l’Abo
            </div>}
          </div>
          <div className="w-[347px] absolute -top-24 left-[880px] flex flex-col items-center justify-center py-6 rounded-[20px]">
            <div className="text-3xl font-semibold text-black w-48 text-center mb-[132px]">
              Concurrents
            </div>
            {packageNames.map((_, index) => {
              return (
                <div key={index} className="flex items-center justify-center w-full h-[100px] border-b-2 border-[#E4E8E9] py-4">
                  {index === 0 || index === 8 ?
                    <RegistrationCheckedIcon />
                    :
                    <PackageUnCheckedIcon />
                  }
                </div>
              );
            })}
            <div className="mt-2 h-[100px]">
              <p className={activePlan === "concorrent" ? "text-white font-medium text-4xl text-center" : "text-black font-medium text-4xl text-center"}>
                79€<span className="text-2xl">/ mois</span>
              </p>
              <div className="text-stone-500 font-medium my-2"> + taxes de service</div>
            </div>
          </div>
        </div>
        <div className={`flex relative content-center justify-center items-center text-center`}>
          <div
            onClick={() => router.push('registration/plans?plan=standard')}
            className={`flex items-center justify-center rounded-xl  w-2/5 h-16 ${Theme_A.button.bigGradientButton} `}>
            Vers le choix de l'abonnement
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTable;
