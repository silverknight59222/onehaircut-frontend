"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Hamburger,
  LogoCircle,
  LogoIcon,
  RegistrationCheckedIcon,
  RegistrationUnCheckedIcon,
  UserIcon,
} from "@/components/utilis/Icons";
import ReactPlayer from "react-player";
import "./index.css";

interface Package {
  package: string;
}

interface Params {
  params: Package;
}

const Page = ({ params }: Params) => {
  const [selectedPlan, setSelectedPlan] = useState(params.package);
  const router = useRouter();

  const packages = [
    {
      name: "Agenda dynamique",
      desc: "Gérer et agencer vos rendez-vous automatiquement. ",
    },
    {
      name: "Mise en avant de votre salon",
      desc: "Des photos et des liens vers vos réseaux sociaux",
    },
    {
      name: "Sélection des coiffures",
      desc: "Effectuer seulement les coiffures que vous souhaitez",
    },
    {
      name: "Proposition de prestations",
      desc: "Il n’y a pas que les coiffures qui compte !",
    },
    {
      name: "Enregistrement du personnel",
      desc: "Ajouter vos collaborateurs. ils auront accès à leur propre agenda.",
    },
    {
      name: "Liaisons de vos salons",
      desc: "Une manière révolutionnaire de travailler en collaboration vous attends",
    },
    {
      name: "Dashboard Complet",
      desc: "Vision détaillée de toutes vos activités et tous vos salons liés ",
    },
    {
      name: "OnehairBot Assistant",
      desc: "Votre partenaire dans l'optimisation de votre business",
    },
    {
      name: "Personnalisation de l'Interface",
      desc: " personnaliser votre espace à vos couleurs ",
    },
  ];

  return (
    <div>
      <div>
        <div className="fixed -z-40 -left-32 md:-left-28 -bottom-32 md:-bottom-28 overflow-hidden hidden md:block">
          <LogoCircle />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center border-b border-[#EBF0F2] pb-3">
          <div className="w-full flex items-center justify-center md:justify-start gap-5 px-14 py-5">
            <LogoIcon />
          </div>
          <div className="w-full flex items-center justify-center md:justify-end gap-4 sm:px-14">
            <div className="w-14 h-14 flex items-center justify-center pb-1 border-2 border-secondary rounded-full cursor-pointer">
              <UserIcon />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-12 px-6 w-full overflow-hidden">
          <div className="flex flex-col xl:flex-row items-center md:items-start gap-11 w-full md:w-auto">
            <div className="mx-4">
              <p className="text-black font-medium text-3xl text-center md:text-left">
                Abonnement
              </p>
              <div
                className={`w-[350px] cursor-pointer sm:w-[600px] h-44 sm:h-[130px] px-8 flex flex-col sm:flex-row items-start sm:items-center justify-center sm:justify-between my-7 rounded-xl ${
                  selectedPlan === "regular"
                    ? "bg-background-gradient text-white shadow-[0px_13px_38px_0px_rgba(180,180,180,0.42)]"
                    : "bg-white text-black border border-[#D7D5D5]"
                }`}
                onClick={() => setSelectedPlan("regular")}
              >
                <div>
                  <p className="font-semibold text-2xl">OneHaircut Regular</p>
                  <p className="w-80">
                    Le parfait abonnement pour un business flexible{" "}
                  </p>
                </div>
                <p className="font-semibold text-3xl mt-5">$ 0</p>
              </div>
              <div
                className={`w-[350px] cursor-pointer sm:w-[600px] h-44 sm:h-[130px] px-8 flex flex-col sm:flex-row items-start sm:items-center justify-center sm:justify-between rounded-xl ${
                  selectedPlan === "pro"
                    ? "bg-background-gradient text-white shadow-[0px_13px_38px_0px_rgba(180,180,180,0.42)]"
                    : "bg-white text-black border border-[#D7D5D5]"
                }`}
                onClick={() => setSelectedPlan("pro")}
              >
                <div>
                  <p className="font-semibold text-2xl">OneHaircut Pro</p>
                  <p className="w-96">
                    Pour un business stable et en recherche d’évolution{" "}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="">à partir de</p>
                  <p className="font-semibold text-3xl">$ 79</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 w-full xl:w-8/12 p-5 pr-2 sm:pr-5 rounded-xl bg-[#F7F7F7]">
              {packages.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-start gap-2"
                  >
                    <p className="text-black w-6/12 sm:w-8/12">{item.name}</p>
                    <p className="w-full text-black text-xs text-start">
                      {item.desc}
                    </p>
                    <div className="w-2/12 flex items-end justify-end">
                      {selectedPlan === "pro" ? (
                        <RegistrationCheckedIcon width="22px" height="23px" />
                      ) : index < 5 ? (
                        <RegistrationCheckedIcon width="22px" height="23px" />
                      ) : (
                        <RegistrationUnCheckedIcon />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative video my-9 xl:ml-[350px] rounded-xl">
            <ReactPlayer
              url="https://www.youtube.com/watch?v=OxgXJqyxlZA&pp=ygUFc2Fsb24%3D"
              poster="assets/poster.jpg"
              width="350px"
              height="250px"
            />
            <p className="absolute bottom-5 text-white text-center w-full">
              {selectedPlan === "pro" ? "Video ohc pro" : "Video ohc regular"}
            </p>
          </div>
          <button
            onClick={() => router.push("/registration/steps")}
            className="text-white py-4 px-11 mb-9 xl:ml-52 font-semibold bg-background-gradient rounded-xl shadow-[0px_17px_36px_0px_rgba(255,125,60,0.25)]"
          >
            Choisir cette offre
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
