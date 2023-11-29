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
      text: "Une visibilité internationale",
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
      title:
        "Comment Onehaircut peut-il améliorer la gestion de mon salon de coiffure ou mon activité de coiffure à domicile ?",
      answer:
        "Onehaircut est une plateforme tout-en-un conçue pour simplifier et optimiser la gestion de votre salon de coiffure ou de votre activité de coiffure à domicile. Grâce à ses fonctionnalités telles que la gestion des réservations, la visibilité accrue en ligne, la communication client-coiffeur, la gestion de la comptabilité, et bien plus encore, vous pouvez améliorer considérablement l'efficacité de votre entreprise.",
    },
    {
      title:
        "Comment puis-je gérer les réservations de mes clients avec Onehaircut ?",
      answer:
        "Avec Onehaircut, la gestion des réservations est un jeu d'enfant. Les clients peuvent réserver en ligne, et vous recevez instantanément des notifications. Vous avez un contrôle total sur les rendez-vous, avec la possibilité de gérer les modifications et les annulations directement depuis votre tableau de bord.",
    },
    {
      title: "Est-ce que Onehaircut offre un support en cas de besoin ?",
      answer:
        "Oui, nous avons une équipe de support dédiée prête à répondre à toutes vos questions et à vous aider en cas de problème. Vous pouvez nous contacter via notre chat en direct ou par e-mail à tout moment.",
    },
    {
      title:
        "Comment puis-je obtenir des avis et des commentaires de mes clients ?",
      answer:
        "Onehaircut propose une fonctionnalité de feedback intégrée qui vous permet de recueillir facilement les avis de vos clients. Cela vous aide à améliorer vos services en fonction de leurs retours et à renforcer la confiance de votre clientèle.",
    },
    {
      title:
        " Puis-je personnaliser les offres pour mes clients réguliers avec Onehaircut ?",
      answer:
        "Certainement. Onehaircut vous permet de créer des offres sur mesure pour vos clients réguliers, renforçant ainsi leur fidélité et les incitant à revenir.",
    },
    {
      title:
        "Est-ce que je peux utiliser Onehaircut pour gérer plusieurs salons ?",
      answer:
        "Oui, Onehaircut vous permet de gérer facilement plusieurs salons depuis un seul tableau de bord, centralisant ainsi toutes les informations importantes.",
    },
    {
      title:
        "Comment puis-je visualiser les coiffures souhaitées par mes clients avec Onehaircut ?",
      answer:
        "Onehaircut affiche directement la coiffure souhaitée par le client. Si une personnalisation est nécessaire, vous pouvez discuter des préférences de style avec les clients grâce à notre système de messagerie intégré.",
    },
    {
      title:
        "Est-ce que Onehaircut garantit la sécurité de mes données et des transactions financières ?",
      answer:
        "La sécurité de vos données est notre priorité. Onehaircut utilise des protocoles de sécurité avancés pour protéger vos informations et garantir des transactions financières sécurisées.",
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
        <img
          src="/assets/registration_bg_top.png"
          className="absolute top-0 w-full"
        />
        <div className="overflow-hidden px-8 sm:px-14 lg:px-20">
          <div className="flex flex-col items-center justify-center mt-14">
            <div className="relative z-10">
              <p className="font-semibold text-2xl sm:text-3xl lg:text-5xl text-black text-center">
                Bien plus qu’un booker !
              </p>
              <p className="font-semibold text-2xl sm:text-3xl lg:text-5xl text-black text-center mt-1">
                <span className="text-gradient">Onehaircut</span> devient votre
                associer
              </p>
            </div>
            <img
              src="/assets/hero_img.png"
              alt=""
              width={1200}
              height={800}
              className="w-full sm:w-10/12 xl:w-3/4 -mt-6 sm:-mt-16 lg:-mt-24 xl:-mt-20 md:-mb-10 xl:-mb-16"
            />
            <p className="font-semibold text-2xl sm:text-3xl lg:text-5xl text-black text-center">
              Créé pour vous et pour eux !
            </p>
            <img
              width={840}
              height={420}
              src="/assets/registration_people2.png"
              alt=""
              className="mt-7 w-3/4 lg:w-3/4 xl:w-3/4 rounded-2xl shadow-sm"
            />
          </div>
          <div className="mt-28 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`w-full flex items-center justify-between gap-2 bg-white rounded-tr-[14px] rounded-br-[14px] py-12 pl-6 sm:pl-12 pr-4 sm:pr-8 shadow-[0px_8px_24px_rgba(149,157,165,0.2)] border-l-8 ${item.borderClr}`}
                  >
                    <p className="w-full text-black font-semibold text-xl sm:text-2xl">
                      {item.text}
                    </p>
                    <div className="flex items-center justify-end">
                      <div
                        className={`${index === 3 &&
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
          <div className="mt-20  hidden xl:flex items-center justify-center w-full overflow-auto">
            <PricingTable />
          </div>
          <div className=" flex items-center justify-center w-full xl:hidden">
            <MobilePricingTable />
          </div>
          <div className="mt-20">
            <p className="font-semibold text-3xl sm:text-4xl lg:text-5xl text-center text-black mb-12">
              Questions fréquentes
            </p>
            <div className="flex flex-col items-center justify-center">
              {questions.map((question, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => questionToggle(index)}
                    className={`w-full lg:w-[900px] cursor-pointer  ${openQuestion === index ? "max-h-full" : "max-h-full"
                      } py-5 pl-6 md:pl-12 pr-6 md:pr-7 mb-9 rounded-xl bg-[#ECECEC] shadow-[0px_8px_9px_0px_rgba(179,184,185,0.15)]`}
                  >
                    <div className="flex items-center justify-between cursor-pointer">
                      <p className="font-medium text-base sm:text-lg xl:text-xl text-black">
                        {question.title}
                      </p>
                      {openQuestion !== index ? (
                        <DropdownCloseArrow />
                      ) : (
                        <DropdownOpenArrow />
                      )}
                    </div>
                    {openQuestion === index && (
                      <p className="font-normal text-stone-600 mt-6 transition ease-in-out duration-100">
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
      <div className="absolute -bottom-24 -z-20 w-full h-60 bg-gradient-to-b from-white via-rose-50 to-rose-200">

      </div>
    </div>
  );
};

export default Registration;
