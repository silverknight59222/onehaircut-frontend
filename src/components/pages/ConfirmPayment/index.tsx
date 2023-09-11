"use client";
import Navbar from "@/components/shared/Navbar";
import { LogoIcon, PaidIcon, QRCode } from "@/components/utilis/Icons";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { getLocalStorage } from "@/api/storage";

const Index = () => {
  const router = useRouter();
  const userInfo = JSON.parse(getLocalStorage("user_Info") as string);
  const salonName = getLocalStorage("salon_name") as string;
  const salonAddress = getLocalStorage("salon_address") as string;
  const salonType = getLocalStorage("salon_type") as string;
  const planType = JSON.parse(getLocalStorage("plan_type") as string);
  const items = [
    { name: "Nom", desc: userInfo ? userInfo.name : '-' },
    { name: "Nom du salon", desc: salonName ? salonName : '-' },
    { name: "Adresse du salon", desc: salonAddress ? salonAddress : '-' },
    { name: "Type de salon", desc: salonType ? salonType : '-' },
    { name: "Type de régime", desc: planType ? planType.name : '-' }
  ];
  return (
    <div>
      <div
        onClick={() => router.push("/")}
        className="py-5 cursor-pointer w-full flex items-center justify-center"
      >
        <LogoIcon />
      </div>
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
            <div className="w-full md:w-[800px] xl:w-[930px] pt-10 pb-10 px-6 sm:px-14 bg-[#F8F8F8] rounded-[22px] border border-[#ECECEC]">
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
              </div>
              <div className="flex items-center justify-end mt-4">
                <p className="text-black text-3xl font-medium ">
                  Total: <span className="text-4xl font-semibold">{ planType ? planType.price : '-'} €</span>
                </p>
              </div>
              <div className="border-t-2 border-[#CBCBCB] pt-9 mt-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-black text-2xl">
                  <p className="font-semibold">Email: </p>
                  <p className="text-[#767676]">{ userInfo ? userInfo.email : '-'}</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-black text-2xl mt-3 sm:mt-0">
                  <p className="font-semibold">Numéro de téléphone: </p>
                  <p className="text-[#767676]">{ userInfo ? userInfo.phone : '-'}</p>
                </div>
              </div>
            </div>
          </div>
          {/* <div>
            <div className="text-2xl text-black">
              <p className="font-bold">Important:</p>
              <p className="w-full sm:w-96">
                Lorsque vous arrivez chez votre coiffeur, veuillez scanner le
                QRC fourni par celui-ci.
              </p>
            </div>
            <div className="w-64 h-80 flex flex-col items-center justify-center border border-black mt-5 rounded-3xl shadow-[0px_5px_20px_0px_rgba(58,58,58,0.25)]">
              <QRCode />
              <p className="text-2xl text-black mt-1">Activer le scan </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Index;
