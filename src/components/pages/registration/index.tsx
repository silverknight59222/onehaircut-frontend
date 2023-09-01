"use client";
import React, { useState } from "react";
import "./index.css";
import {
  DropdownCloseArrow,
  DropdownOpenArrow,
  LogoIcon,
  RegistrationIcon1,
  RegistrationIcon2,
  RegistrationIcon3,
  RegistrationIcon4,
} from "@/components/utilis/Icons";
import PricingTable from "./PricingTable";
import MobilePricingTable from "./MobilePricingTable";

const Registration = () => {
  const items = [
    {
      text: "Un processus de réservation révolutionnaire",
      icon: <RegistrationIcon1 />,
      borderClr: "border-[#FF6890]",
    },
    {
      text: "Un agenda pratique et dynamique",
      icon: <RegistrationIcon2 />,
      borderClr: "border-[#FF9D5C]",
    },
    {
      text: "Une visibilité internationnale",
      icon: <RegistrationIcon3 />,
      borderClr: "border-[#8AD7F0]",
    },
    {
      text: "Un marketing qui vous correspond",
      icon: <RegistrationIcon4 />,
      borderClr: "border-[#7ABF50]",
    },
    {
      text: "Du professionnalisme et du sérieux dans les réservations",
      icon: "",
      borderClr: "border-[#5C9DFF]",
    },
    {
      text: "OnehairBot, le partenaire d'affaire rêvé",
      icon: "",
      borderClr: "border-[#FAE100]",
    },
  ];
  const questions = [
    {
      title: "Question 1",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    },
    {
      title: "Question 2",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    },
    {
      title: "Question 3",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    },
    {
      title: "Question 4",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
    },
  ];
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);
  const questionToggle = (index: number) => {
    if (openQuestion === index) {
      setOpenQuestion(null);
    } else {
      setOpenQuestion(index);
    }
  };
  return (
    <div className="relative">
    <div>
      <img src="/assets/registration_bg_top.png" className="absolute top-0 w-full"/>
    <div className="overflow-hidden px-8 sm:px-14 lg:px-20">
      <div className="flex flex-col items-center justify-center mt-14">
        <div className="relative z-10">
          <p className="font-semibold text-2xl sm:text-3xl lg:text-5xl text-black text-center">
            Bien plus qu’un booker !
          </p>
          <p className="font-semibold text-2xl sm:text-3xl lg:text-5xl text-black text-center mt-1">
            <span className="text-gradient">OneHaircut</span> devient votre
            associer
          </p>
        </div>
        <img
          src="/assets/hero_img.png"
          alt=""
          width={1600}
          height={1090}
          className="w-full sm:w-10/12 xl:w-full -mt-6 sm:-mt-16 lg:-mt-24 xl:-mt-32 md:-mb-10 xl:-mb-16"
        />
        <p className="font-semibold text-2xl sm:text-3xl lg:text-5xl text-black text-center">
          Créé pour vous et pour eux !
        </p>
        <img width={858} height={431} src="/assets/img3.png" alt="" className="mt-7 lg:w-auto rounded-[60px] shadow-xl" />
      </div>
      <div className="mt-28 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {items.map((item, index) => {
            return (
              <div
                key={index}
                className={`w-full flex items-center justify-betweeen gap-2 bg-white rounded-tr-[14px] rounded-br-[14px] py-12 pl-6 sm:pl-12 pr-4 sm:pr-8 shadow-[0px_8px_24px_rgba(149,157,165,0.2)] border-l-8 ${item.borderClr}`}
              >
                <p className="w-full text-black font-semibold text-xl sm:text-2xl">
                  {item.text}
                </p>
                <div className="flex items-center justify-end">
                  <div
                    className={`${
                      index === 3 &&
                      "flex items-center justify-center icon-bg w-20 h-20 rounded-xl"
                    }`}
                  >
                    {item.icon}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="hidden sm:flex items-center justify-center w-full overflow-auto">
        <PricingTable />
      </div>
      <div className="flex items-center justify-center w-full sm:hidden">
        <MobilePricingTable/>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-16 mt-4 lg:mt-14 mb-24">
          <div className="font-semibold cursor-pointer text-3xl py-16 px-12 border-4 border-[#EFEFEF] rounded-lg">
          Avis Salon sponsorisé
          </div>
          <div className="font-semibold cursor-pointer text-3xl py-16 px-12 border-4 border-[#EFEFEF] rounded-lg">
          Avis Salon sponsorisé
          </div>
          <div className="font-semibold cursor-pointer text-3xl py-16 px-12 border-4 border-[#EFEFEF] rounded-lg">
          Avis Salon sponsorisé
          </div>
      </div>
      <div>
        <p className="font-semibold text-3xl sm:text-4xl lg:text-5xl text-center text-black mb-12">
          Questions fréquentes
        </p>
        <div className="flex flex-col items-center justify-center">
          {questions.map((question, index) => {
            return (
              <div
                key={index}
                onClick={()=>questionToggle(index)}
                className={`w-full lg:w-[900px] cursor-pointer  ${
                  openQuestion === index ? "h-40" : "h-[72px]"
                } py-5 pl-6 md:pl-12 pr-6 md:pr-7 mb-9 rounded-xl bg-[#ECECEC] shadow-[0px_8px_9px_0px_rgba(179,184,185,0.15)]`}
              >
                <div
                  className="flex items-center justify-between cursor-pointer"
                >
                  <p className="font-medium text-xl sm:text-2xl lg:text-3xl text-center text-black">
                    {question.title}
                  </p>
                  {openQuestion !== index ? (
                    <DropdownCloseArrow />
                  ) : (
                    <DropdownOpenArrow />
                  )}
                </div>
                {openQuestion === index && (
                  <p className="font-medium text-[#C6C6C6] mt-6 transition ease-in-out duration-100">
                    {question.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-16">
        <LogoIcon />
      </div>
    </div>
    </div>
    <img src="/assets/registration_bg_bottom.png" className="absolute -bottom-24 -z-20"/>
    </div>
  );
};

export default Registration;
