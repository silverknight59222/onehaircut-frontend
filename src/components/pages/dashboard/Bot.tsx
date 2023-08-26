"use client";
import { CircleRight, CrossIcon } from "@/components/utilis/Icons";
import DashboardLayout from "@/layout/DashboardLayout";
import React, { useState } from "react";

const Bot = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const items1 = [
    { title: "VIsibilité", count: 2 },
    { title: "Agencement Agenda", count: 3 },
    { title: "Coiffures dispensées", count: null },
    { title: "Assistance messagerie ", count: 1 },
    { title: "Performance du staff", count: null },
    { title: "Fidélisation client", count: 1 },
    { title: "Shop", count: "" },
  ];
  const items2 = [
    {
      title: "Images de vitrine peu attractives",
      desc: "Rédigez un message de la part de Onehairbot pour informer les professionnels du meilleur moment pour utiliser la fonctionnalité Booster et les encourager à maximiser leur visibilité sur Onehaircut.",
    },
    {
      title: 'Optimisez votre visibilité avec le "Booster',
      desc: 'Rédigez un message de la part de Onehairbot pour informer les professionnels du meilleur moment pour utiliser la fonctionnalité "Booster" et les encourager à maximiser leur visibilité sur Onehaircut.',
    },
    {
      title: "Optimisez votre attractivité avec le descriptif",
      desc: "Descriptif du salon manquant : Décrivez votre salon avec passion et précision pour attirer les clients. Exemple : 'Salon moderne offrant des coupes tendance, colorations éclatantes et styles personnalisés. Expérience capillaire exceptionnelle dans une ambiance conviviale. Rejoignez-nous pour briller avec style !'",
    },
  ];
  return (
    <div>
      <div className="hidden sm:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 z-10">
        <CircleRight />
      </div>
      <DashboardLayout>
        <div className="flex flex-col md:flex-row items-start justify-center gap-6 xl:gap-14 2xl:gap-28 mt-16 px-4 lg:px-11">
          <div>
            <p className="text-xl text-[#434343] font-bold text-center mb-2">
              OPTIMISATION
            </p>
            <div className="flex flex-row md:flex-col items-center justify-center flex-wrap gap-5 mt-6 md:mt-0">
            {items1.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setSelectedTab(index)}
                  className={`w-56 2xl:w-64 h-24 flex items-center justify-center bg-white rounded-2xl shadow-[3px_3px_10px_-1px_rgba(0,0,0,0.07)] cursor-pointer border ${
                    selectedTab === index && "border-secondary"
                  }`}
                >
                  {item.title}
                </div>
              );
            })}
            </div>
          </div>
          <div>
            <p className="text-xl text-[#434343] font-bold text-center mt-5 md:mt-0 mb-6 md:mb-2">
              Opportunités d'optimisation
            </p>
            {items2.map((item, index) => {
              return (
                <div
                  key={index}
                  className="relative z-20 w-full md:w-[450px] xl:w-[670px] 2xl:w-[850px] py-6 flex flex-col xl:flex-row items-start xl:items-end justify-between rounded-xl bg-white mb-7 px-8 shadow-[3px_3px_10px_-1px-rgba(0,0,0,0.30)]"
                >
                  <div className="absolute -top-3 -right-3 flex items-center justify-center w-6 h-6 text-darkBlue font-semibold cursor-pointer rounded-md bg-gradient-to-b from-pink-500 to-orange-500">
                        <CrossIcon width="9" height="9" />
                    </div>
                  <div>
                    <p className="text-[#FE4C56] font-bold text-center mb-4">
                      {item.title}
                    </p>
                    <p className="text-[#2C2C2C] font-medium xl:w-[500px] 2xl:w-[600px]">{item.desc}</p>
                  </div>
                  <button className="w-20 h-7 flex items-center justify-center rounded-md bg-background-gradient text-sm mt-4 xl:mt-0 text-white font-semibold">
                    Y-aller !
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Bot;
