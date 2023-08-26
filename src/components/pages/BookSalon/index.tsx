"use client";
import Navbar from "@/components/shared/Navbar";
import {
  CalenderIcon,
  LeftArrowIcon,
  RightArrowIcon,
} from "@/components/utilis/Icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const BookSalon = () => {
  const [selectedSlot, setSelectedSlot] = useState(4);
  const [selectedHairdresser, setSelectedHairdresser] = useState(0);
  const route=useRouter()
  const items = [
    { name: "Type de coiffure", desc: "Curly" },
    { name: "Couleur", desc: "Blond" },
    { name: "Durée", desc: "2 heures " },
    { name: "Lieu", desc: "à domicile" },
  ];
  const slots = [
    { name: "09:00 ", isDisable: false },
    { name: "13:00 ", isDisable: false },
    { name: "17:00 ", isDisable: false },
    { name: "09:30 ", isDisable: false },
    { name: "13:30 ", isDisable: false },
    { name: "17:30 ", isDisable: false },
    { name: "09:00 ", isDisable: true },
    { name: "13:00 ", isDisable: true },
    { name: "17:00 ", isDisable: false },
    { name: "09:30 ", isDisable: false },
    { name: "13:30 ", isDisable: true },
    { name: "17:30 ", isDisable: false },
  ];
  const hairdressers = [
    { rating: "4.9", img: "/assets/hairdresser1.png" },
    { rating: "4.8", img: "/assets/hairdresser2.png" },
    { rating: "5.0", img: "/assets/hairdresser3.png" },
    { rating: "5.0", img: "/assets/hairdresser4.png" },
  ];
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-16 mb-5 px-6 md:px-10 2xl:px-14">
        <div className="flex flex-col md:flex-row items-center justify-center gap-16">
          <div className="relative w-[350px] lg:w-[500px] xl:w-[588px] h-[350px] lg:h-[450px] xl:h-[516px] rounded-[70px]">
            <Image src="/assets/salon9.png" alt="" fill={true} />
          </div>
          <div>
            <p className="w-80 lg:w-[400px] xl:w-[500px] text-4xl font-bold text-black border-b-2 border-[#696969] pb-3">
              Golden Barber
            </p>
            <div className="flex flex-col gap-3 text-2xl font-medium text-black mt-6">
              {items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-black text-2xl"
                  >
                    <p className="font-semibold">{item.name}: </p>
                    <p>{item.desc}</p>
                  </div>
                );
              })}
            </div>
            <button className="w-80 h-20 text-white text-xl font-semibold mt-6 bg-background-gradient rounded-[22px]">
              Revenir au choix de coiffure
            </button>
          </div>
        </div>
        <div className="w-full md:w-[750px] lg:w-[1000px] xl:w-[1250px] border-2 border-[#D0D0D0] py-10 rounded-[54px] mt-20 md:mt-28">
          <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-10">
            <CalenderIcon />
            <div className="flex items-center gap-2 mt-10 sm:mt-0">
              <LeftArrowIcon />
              <p className="text-2xl font-medium text-center">
                Tuesday April 2023
              </p>
              <RightArrowIcon />
            </div>
          </div>
          <div className="flex items-center justify-center mt-12 mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {slots.map((slot, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedSlot(index)}
                    className={`w-56 lg:w-64 h-20 flex items-center justify-center text-3xl font-semibold border rounded-[20px] cursor-pointer ${
                      slot.isDisable ? "text-[#AEAEAE]" : "text-black"
                    } ${
                      selectedSlot === index
                        ? "bg-[#FFE7DF] text-[#FF7143]"
                        : "bg-white border-[#BABABA]"
                    }`}
                  >
                    {slot.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-16">
          <p className="text-5xl text-black font-semibold text-center">
            Choisissez de votre coiffeur
          </p>
          <p className="text-5xl text-black font-semibold text-center">
            (optionnel)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4 2xl:gap-12 mt-8">
            {hairdressers.map((hairdresser, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setSelectedHairdresser(index)}
                  className={`flex items-center justify-center w-[311px] h-[376px] border rounded-2xl cursor-pointer ${
                    selectedHairdresser === index
                      ? "border-secondary"
                      : "border-white"
                  }`}
                >
                  <div className="relative">
                    <div className="relative w-[263px] h-[334px] rounded-2xl">
                      <Image src={hairdresser.img} alt="" fill={true} />
                    </div>
                    <p className="absolute top-5 right-3 w-14 h-8 flex items-center justify-center rounded-[26px] text-lg text-white font-semibold bg-[rgba(0,0,0,0.24)]">
                      {hairdresser.rating}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full lg:w-[940px] h-64 flex flex-col items-center justify-center border border-[#DFDFDF] bg-[#F8F8F8] text-xl sm:text-2xl rounded-[22px] mt-10 lg:mt-20 text-black text-center px-2 shadow-[0px_1px_46px_0px_rgba(121,121,121,0.06) inset]">
          <p className="font-bold mb-2">Récapitulatif de la prestation</p>
            <p className="font-medium">Vous avez choisi: <span className="font-normal">Lundi 15 à 17h, à domicile</span></p>
            <p className="font-medium my-2">par: <span className="font-normal">Nom du coiffeur</span></p>
            <p className="font-medium">Temps d’éxécution : <span className="font-normal">2 heures</span></p>
        </div>
        <button onClick={()=>route.push('/payment')} className="w-72 h-14 rounded-xl text-xl font-semibold text-white bg-background-gradient mt-10 lg:mt-16">Réservez ce créneau</button>
      </div>
    </div>
  );
};

export default BookSalon;
