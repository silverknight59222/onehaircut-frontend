"use client";
import Navbar from "@/components/shared/Navbar";
import {
  AppleIcon,
  CardIcon,
  PayPal,
  RegistrationCheckedIcon,
} from "@/components/utilis/Icons";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Index = () => {
  const [selectedPayment, setSelectedPayment] = useState("Carte");
  const router = useRouter();
  const items = [
    { name: "Salon", desc: "Le Bon Coiffeur" },
    { name: "Type de coiffure", desc: "Curly" },
    { name: "Couleur", desc: "Blond" },
    { name: "Temps", desc: "2 heures " },
    { name: "Lieu", desc: "à domicile" },
  ];
  return (
    <div>
      <Navbar isBookSalon={true} />
      <div className="flex flex-col items-center justify-center mt-16 mb-5 px-6">
        <div className="flex md:block flex-col items-center justify-center">
          <p className="text-4xl text-black font-medium text-center md:text-start mb-4">
            Confirmer et payer
          </p>
          <div className="w-full md:w-[750px] lg:w-[940px] pt-10 pb-10 px-6 sm:px-14 bg-[#F8F8F8] rounded-[22px] border border-[#ECECEC]">
            <div className="flex flex-col gap-3 text-xl font-medium text-black">
              {items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-black"
                  >
                    <p className="font-semibold">{item.name}: </p>
                    <p>{item.desc}</p>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between border-t-2 border-[#CBCBCB] pt-9 mt-9">
              <button className="w-36 h-14 flex items-center justify-center border border-secondary rounded-xl text-xl text-black font-semibold">
                Modifier
              </button>
              <p className="text-5xl md:text-6xl text-black font-semibold">
                35$
              </p>
            </div>
          </div>
          <p className="text-2xl text-black md:text-start text-center mb-4 mt-14">
            Choisissez comment vous souhaitez payer
          </p>
          <div className="flex items-center justify-center md:justify-start flex-wrap gap-10">
            <button
              onClick={() => setSelectedPayment("Carte")}
              className={`relative w-52 lg:w-64 h-16 flex items-center justify-center gap-4 border rounded-xl text-2xl font-medium hover:border-secondary ${
                selectedPayment === "Carte"
                  ? "border-secondary"
                  : "border-[#C1C1C1]"
              }`}
            >
              <CardIcon />
              <p>Carte</p>
              {selectedPayment === "Carte" && (
                <div className="absolute -top-1 -right-2">
                  <RegistrationCheckedIcon width="18px" />
                </div>
              )}
            </button>
            <button
              onClick={() => setSelectedPayment("Paypal")}
              className={`relative w-52 lg:w-64 h-16 flex items-center justify-center gap-4 border rounded-xl text-2xl font-medium hover:border-secondary ${
                selectedPayment === "Paypal"
                  ? "border-secondary"
                  : "border-[#C1C1C1]"
              }`}
            >
              <PayPal />
              <p>Paypal</p>
              {selectedPayment === "Paypal" && (
                <div className="absolute -top-1 -right-2">
                  <RegistrationCheckedIcon width="18px" />
                </div>
              )}
            </button>
            <button
              onClick={() => setSelectedPayment("Pay")}
              className={`relative w-52 lg:w-64 h-16 flex items-center justify-center gap-4 border rounded-xl text-2xl font-medium hover:border-secondary ${
                selectedPayment === "Pay"
                  ? "border-secondary"
                  : "border-[#C1C1C1]"
              }`}
            >
              <AppleIcon />
              {selectedPayment === "Pay" && (
                <div className="absolute -top-1 -right-2">
                  <RegistrationCheckedIcon width="18px" />
                </div>
              )}
            </button>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={() => router.push("/checkout")}
              className="w-60 h-14 rounded-xl text-xl text-white font-semibold bg-background-gradient shadow-[0px_17px_36px_0px_rgba(255,125,60,0.25)] mt-14"
            >
              Vers le paiement{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
