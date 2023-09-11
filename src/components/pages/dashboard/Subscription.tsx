"use client";
import React, { useState } from "react";
import DashboardLayout from "@/layout/DashboardLayout";
import {
  BgDashboardPricingTable,
  CheckedIcon,
  CircleRight,
  PackageCheckedIcon,
  PackageUnCheckedIcon,
  RegistrationCheckedIcon,
} from "@/components/utilis/Icons";
import MobilePricingTable from "../registration/MobilePricingTable";

const Subscription = () => {
  const [isAutomaticRenewal, setIsAutomaticRenewal] = useState(false);
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
    <div>
      <div className="hidden sm:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 z-10">
        <CircleRight />
      </div>
      <DashboardLayout>
        <div className="mt-16 px-4 lg:px-11">
          <div className="flex items-center justify-center">
            <div className="w-80 h-10 flex items-center justify-between rounded-3xl bg-[#FAFAFA] shadow-[rgba(220,215,215,0.34)] text-xs font-semibold">
              <p className="text-[#0E0D0D] pl-5 cursor-pointer">
                Paiement mensuel
              </p>
              <p className="text-white bg-[#3C3A3A] rounded-3xl py-2.5 px-5 cursor-pointer">
                Paiement Annuel
              </p>
            </div>
          </div>
          <div className="flex flex-col xl:flex-row items-center xl:items-start justify-center gap-4 2xl:gap-12 mt-10 lg:mt-52">
            <div className="hidden lg:block relative">
              <BgDashboardPricingTable />
              <div className="rounded-xl py-4 px-5">
                <div className="flex">
                  <div className="absolute top-0">
                    {packageNames.map((name, index) => {
                      return (
                        <p
                          key={index}
                          className="flex items-center text-black font-medium text-sm w-48 h-16 border-b-2 border-[#E4E8E9] pl-3"
                        >
                          {name}
                        </p>
                      );
                    })}
                    <div className="font-bold text-black text-center mt-5 text-2xl">
                      Prix
                    </div>
                  </div>
                  <div
                    style={{
                      background:
                        "linear-gradient(162deg, #FE2569 0%, #FD4C55 42.71%, #FF8637 86.46%, #FFE30F 100%)",
                    }}
                    className="w-56 absolute -top-40 left-[216px] flex flex-col items-center justify-center py-6 rounded-[20px] shadow-[-71px_56px_56px_0px_rgba(255,125,60,0.13)]"
                  >
                    <div className="text-3xl font-semibold text-white w-48 text-center">
                      OneHaircut Pro
                    </div>
                    <div className="flex items-center justify-center bg-[rgba(255,255,255,0.53)] mb-5 mt-1 rounded-lg w-36 h-10 text-white font-semibold">
                      recommandé
                    </div>
                    {packageNames.map((_, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-center w-full h-16 border-b-2 border-[#E4E8E9] py-4"
                        >
                          <PackageCheckedIcon />
                        </div>
                      );
                    })}
                    <div className="mt-3 h-16">
                      <p className="text-white font-medium text-xl text-center">
                        79 $<span className="text-2xl">/ mois</span>
                      </p>
                      <p className="text-white text-xs font-semibold">
                        *1 % de tax de service
                      </p>
                    </div>
                    <div className="flex items-center justify-center text-white font-semibold rounded-3xl -mb-12 w-44 h-12 bg-[#070E06]">
                      Plan actuel
                    </div>
                  </div>
                  <div className="w-52 absolute -top-40 left-[440px] flex flex-col items-center justify-center py-6 rounded-[20px]">
                    <div className="text-3xl font-semibold text-black w-48 text-center mb-16">
                      OneHaircut Regular
                    </div>
                    <div className="w-full">
                      {packageNames.map((_, index) => {
                        return (
                          <div
                            key={index}
                            className="flex items-center justify-center w-full h-16 border-b-2 border-[#E4E8E9] py-4"
                          >
                            {index < 6 ? (
                              <RegistrationCheckedIcon />
                            ) : (
                              <PackageUnCheckedIcon />
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="w-full h-16 flex flex-col items-center justify-center py-4">
                      <p className="text-black font-medium text-2xl">Gratuit</p>
                      <p className="text-black text-xs font-medium ml-16">
                        *5 % de tax de service
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative z-10 flex items-center justify-center w-full lg:hidden">
            <MobilePricingTable />
          </div>
            <div className="relative z-20 w-full sm:w-[415px] flex flex-col items-center justify-center sm:-mt-5 lg:mt-10 xl:mt-0">
              <div className="py-4 px-5 2xl:text-xl text-center text-black whitespace-nowrap bg-[#F4F4F6] font-medium border border-[#9B9B9B] rounded-xl">
                <p>Renouvellement de l’abonnement le: </p>
                <p className="text-center mt-1">12 / 07 / 2024</p>
                <div
                  onClick={() => setIsAutomaticRenewal(!isAutomaticRenewal)}
                  className="flex items-center justify-start gap-3 mt-4 cursor-pointer"
                >
                  <div
                    className={`w-6 h-6 pt-2 pl-1.5 rounded-[4px] border ${
                      isAutomaticRenewal
                        ? "bg-gradient-to-b from-pink-500 to-orange-500 border-white"
                        : "border-[#767676]"
                    }`}
                  >
                    {isAutomaticRenewal && (
                      <CheckedIcon width="15" height="10" />
                    )}
                  </div>
                  <p>Renouvellement&nbsp;Automatique</p>
                </div>
              </div>
              <button className="w-52 h-14 flex items-center justify-center bg-[#F4F4F6] border border-secondary rounded-xl mt-4 text-black font-medium">
                Clôturer le compte
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Subscription;
