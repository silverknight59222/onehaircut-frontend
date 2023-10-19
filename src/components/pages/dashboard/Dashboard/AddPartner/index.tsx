"use client";
import React, { useState } from "react";
import BaseModal from "@/components/UI/BaseModal";
import Image from "next/image";
import Footer from "@/components/UI/Footer";
import { Theme_A } from "@/components/utilis/Themes";

const AddPartner = () => {
  const [isModal, setIsModal] = useState(false);

  return (
    <div>
      <div>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-7 mb-10 mt-20">
          <button className={`${Theme_A.button.bigGradientButton}`}>
            Envoyer une demande
          </button>
          <button className={`${Theme_A.button.bigWhiteColoredButton}`}>
            <p>Demande reçu</p>
            <div className={`${Theme_A.indicators.counterIndicator}`}>
              1
            </div>
          </button>
        </div>
      </div>
      <div className="flex items-center gap-14">
        <div className="w-full lg:w-6/12 border border-[#CACACA] rounded-3xl py-6 px-8 lg:px-12">
          <p className="font-semibold text-black text-[22px] lg:text-[27px]">
            Ajout de salon partenaire
          </p>
          <input
            placeholder="Nom salon"
            className="w-full h-[60px] px-3 placeholder:text-[#1f1515] placeholder:text-lg rounded-md shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)] outline-none mt-4"
          />
          <input
            placeholder="Adresse "
            className="w-full h-[60px] px-3 placeholder:text-[#959595] placeholder:text-lg rounded-md shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)] outline-none mt-6"
          />
          <input
            placeholder="Adresse mail"
            className="w-full h-[60px] px-3 placeholder:text-[#959595] placeholder:text-lg rounded-md shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)] outline-none mt-6"
          />
          <button className={`${Theme_A.button.bigWhiteColoredButton}`}>
            Rechercher
          </button>
          <div className="bg-darkGrey rounded-3xl py-5 px-5 my-10 w-[280px] lg:w-[440px]">
            <p className="text-2xl font-semibold text-black">HappyCut</p>
            <p className="text-base text text-[#868484] mt-2.5">
              5 av. Saint-Martin, 81562 Nantes
            </p>
            <p className="text-base text text-[#868484]">happycut@hotmail.fr</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 m:gap-7">
            <button className={`${Theme_A.button.bigWhiteColoredButton}`}>
              Détail
            </button>
            <button
              onClick={() => setIsModal(true)}
              className={`${Theme_A.button.bigGradientButton}`}
            >
              Envoyer une demande
            </button>
          </div>
        </div>
        <div className="w-full lg:w-6/12">{/* map  */}</div>
      </div>
      {isModal && (
        <BaseModal close={() => setIsModal(!isModal)}>
          <div className="flex flex-col items-center justify-center">
            <p className="text-3xl font-semibold text-black text-center">Demande de liaison avec</p>
            <p className="mt-12 text-2xl font-bold text-black">Bore Cutstyle</p>
            <p className="text-xl font-semibold text-black">20 rue Knoxville, Miami</p>
            <p className="mb-6 font-normal text-black">happycut@hotmail.fr</p>
            <img src="/assets/salon2.png" alt="" width={190} height={190} />
            <p className="mt-10 text-sm font-normal text-black w-[472px] text-center">
              Si ce salon l’accepte et si vous avez l’abonnement pro, vous
              partagerez toutes les données liées au dashboard
            </p>
            <button className="mt-[49px] text-white font-normal text-xl rounded-xl w-[290px] h-14 bg-gradient-to-r from-pink-500 to-orange-500 shadow-[0px_14px_24px_0px_rgba(255,125,60,0.25)]">
              Envoyer une demande
            </button>
          </div>
        </BaseModal>
      )}
      <Footer />
    </div>
  );
};

export default AddPartner;
