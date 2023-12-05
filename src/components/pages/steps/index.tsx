'use client';
import {
  AccountIcon,
  BackArrow,
  LocationIcon,
  LogoIcon,
  PaymentIcon,
  RoomTypeIcon,
} from "@/components/utilis/Icons";
import { useRouter } from "next/navigation";
import React from "react";
import { Theme_A } from '@/components/utilis/Themes';

const Steps = () => {
  const route = useRouter()
  const steps = [
    { name: "Choisi ton type de salon", icon: <RoomTypeIcon /> },
    { name: "Informe ta zone de travail", icon: <LocationIcon /> },
    { name: "Effectue le paiement", icon: <PaymentIcon /> },
    { name: "Personnalise ton compte", icon: <AccountIcon /> },
  ];

  const onOHCLogoClick = () => {
    route.push(`/`)
  }

  return (
    <div>
      <div className="flex items-center justify-center border-b border-[#EBF0F2] mt-5 pb-3 ">
        <button className="cursor-pointer"
          onClick={onOHCLogoClick}
        >
          <LogoIcon className={''} />
        </button>
      </div>
      <div className='flex items-start cursor-pointer mt-4 mb-2  sm:mx-10 2xl:mx-14 text-stone-800'
        onClick={() => route.push('/registration/plans')}>
        <BackArrow />
        <p className={`${Theme_A.textFont.navigationGreyFont}`}>Retour</p>
      </div>
      <div className="relative flex flex-col items-center justify-center rounded-[60px] mt-20 md:mt-40 mb-6 sm:mb-10 mx-8 md:mx-20 2xl:mx-28 sm:bg-[#F8F8F8] border sm:border-[#DADADA] px-6 sm:px-12 py-24 2xl:px-20 md:py-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-11">
          {steps.map((step, index) => {
            return (
              <div
                key={index}
                className="relative flex flex-col items-center justify-center"
              >
                <div
                  style={{
                    background:
                      "linear-gradient(180deg, #EDEBEB 0%, rgba(237, 235, 235, 0.38) 100%)",
                  }}
                  className="w-[250px] h-60 flex flex-col items-center justify-center rounded-[36px] gap-4"
                >
                  {step.icon}
                  <p className="text-black font-medium text-xl w-44 text-center">
                    {step.name}
                  </p>
                </div>
                <div
                  style={{
                    background:
                      "linear-gradient(180deg, #FE2A67 0%, #FE604B 52.60%, #FF793E 100%)",
                  }}
                  className="absolute -top-5 w-10 h-10 text-white rounded-full flex items-center justify-center text-xl"
                >
                  {++index}
                </div>
              </div>
            );
          })}
        </div>
        <div className="absolute -top-10 bg-white text-center w-[250px] sm:w-[500px] md:w-[600px] lg:w-[800px] xl:w-[1000px] h-20 flex items-center justify-center sm:text-xl md:text-2xl lg:text-3xl font-semibold text-black border border-secondary rounded-[20px]">
          Une inscription et un profil complété en 4 étapes
        </div>
      </div>
      <div className="flex items-center justify-center mb-5">
        <button onClick={() => route.push('/registration/steps/1')} className={`${Theme_A.button.bigGradientButton}`}>
          Allons-y!
        </button>
      </div>
    </div>
  );
};

export default Steps;
