"use client";
import Navbar from "@/components/shared/Navbar";
import { PaidIcon, QRCode } from "@/components/utilis/Icons";
import Image from "next/image";
import React from "react";

const index = () => {
  const items = [
    { name: "Nom", desc: "Gemini Prénom" },
    { name: "Prénom", desc: "Tchatcho" },
    { name: "Jour", desc: "Lundi 15 Avril Horaire" },
    { name: "Horaire", desc: "13h" },
    { name: "Salon", desc: "Le très bon coiffeur" },
    { name: "Coiffeur", desc: "Karim" },
    { name: "Lieu", desc: "En salon" },
    { name: "Numéro de téléphone salon", desc: "+3306888888" },
  ];
  return (
    <div>
      <Navbar />
      <div className="mt-16 mb-5 px-6">
        <div className="flex flex-col items-center justify-center gap-3">
          <PaidIcon />
          <p className="text-3xl font-medium text-black text-center">
            Merci pour votre reservation!
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 xl:gap-24">
        <div>
          <p className="text-3xl text-black font-medium text-center md:text-start mb-4 mt-14 lg:mt-28">
            Récapitulatif de votre reservation
          </p>
          <div className="w-full 2xl:w-[940px] pt-10 pb-10 px-6 sm:px-14 bg-[#F8F8F8] rounded-[22px] border border-[#ECECEC]">
            <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-5 md:gap-0">
              <div className="flex flex-col gap-3 sm:gap-1 text-xl font-medium text-black">
                {items.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center gap-2 text-black text-2xl"
                    >
                      <p className="font-semibold">{item.name}: </p>
                      <p className="text-[#767676]">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
              <div className="relative w-40 h-36 rounded-3xl">
                <Image src="/assets/salon9.png" alt="" fill={true} />
              </div>
            </div>
            <div className="flex items-center justify-end mt-4">
              <p className="text-black text-3xl font-medium ">
                Total: <span className="text-4xl font-semibold">35$</span>
              </p>
            </div>
            <div className="border-t-2 border-[#CBCBCB] pt-9 mt-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-black text-2xl">
                <p className="font-semibold">Email: </p>
                <p className="text-[#767676]">Gemini.Tchatcho@Gmail.com</p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-black text-2xl mt-3 sm:mt-0">
                <p className="font-semibold">Numéro de téléphone: </p>
                <p className="text-[#767676]">06999999</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-2xl text-black">
            <p className="font-bold">Important:</p>
            <p className="w-full sm:w-96">
              Lorsque vous arrivez chez votre coiffeur, veuillez scanner le QRC
              fourni par celui-ci.
            </p>
          </div>
          <div className="w-64 h-80 flex flex-col items-center justify-center border border-black mt-5 rounded-3xl shadow-[0px_5px_20px_0px_rgba(58,58,58,0.25)]">
            <QRCode />
            <p className="text-2xl text-black mt-1">Activer le scan </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default index;
