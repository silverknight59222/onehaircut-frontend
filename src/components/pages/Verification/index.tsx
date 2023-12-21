import React from 'react'
import { LogoIcon, LogoCircleFixRight } from "@/components/utilis/Icons";

const Verification = () => {
  return (
    <div className="flex flex-col mt-14 w-full items-center justify-center">
      <div className="-z-50 fixed  -left-32 md:-left-28 -bottom-32 md:-bottom-28 overflow-hidden">
        <LogoCircleFixRight />
      </div>
      <div>
        <LogoIcon className={''} />
      </div>
      <div className="md:max-w-[1022px] w-full px-4 md:mx-16">
        <div className="mt-28 2xl:mt-40 mb-10 2xl:mb-16 text-center ">
          <h1 className="text-black font-bold text-5xl md:text-7xl">
            Merci pour votre adhésion ! Un email vous a été envoyé.
          </h1>
          <p className="text-black text-xl md:text-3xl pt-14 md:mt-3">
            Pour pouvoir utiliser notre plateforme, il vous faut confirmer votre adresse email.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Verification