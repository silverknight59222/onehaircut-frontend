"use client";
import {
  BellIcon,
  CircleRight,
  Hamburger,
  LogoIcon,
  PaypalIcon,
  UserIcon,
} from "@/components/utilis/Icons";
import { useRouter } from "next/navigation";
import React from "react";

const Step4 = () => {
  const router=useRouter()
  return (
    <div>
      <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 -z-10">
        <CircleRight />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center border-b border-[#EBF0F2] pb-3">
      <div className="absolute top-1 flex items-center justify-start sm:justify-center w-full gap-5 px-10 sm:px-14 py-5">
          <LogoIcon />
        </div>
        <div className="w-full flex items-center justify-end gap-4 px-4 sm:px-14 mt-5">
          <div className="w-14 h-14 flex items-center justify-center pb-1 border-2 border-secondary rounded-full cursor-pointer">
            <UserIcon />
          </div>
        </div>
      </div>
      <div className="z-50 flex flex-col items-center justify-center mx-4">
        <p className="text-black font-medium text-5xl mt-10">Checkout</p>
        <div className="flex flex-col lg:flex-row items-start justify-center gap-12 mt-7 px-5">
          <div className="w-full lg:w-7/12">
            <div className="bg-[#FAFAFA] rounded-3xl py-8 px-6 sm:px-10">
              <div className="bg-white px-4 py-8">
                <p className="text-lg font-semibold text-black">
                  Billing address
                </p>
                <div className="text-black text-lg mt-5">
                  <p>Mike John</p>
                  <p>243 high road</p>
                  <p>12456 Atlanta</p>
                </div>
              </div>
              <div className="bg-white px-4 py-8 mt-7">
                <p className="text-lg font-semibold text-black">
                  Payment Method
                </p>
                <button className="w-full flex items-center justify-center rounded-md h-14 bg-[#FFC107] mt-8">
                  <PaypalIcon/>
                </button>
                <div className="flex items-center justify-center gap-5 my-5">
                  <div className="w-36 border-t-2 border-[#F5F5F5]"/>
                  <p>or</p>
                  <div className="w-36 border-t-2 border-[#F5F5F5]"/>
                </div>
                <div>
                  <div className="relative">
                    <input
                      placeholder="Card Number"
                      className="w-full p-3 border-2 border-[#F5F5F5] rounded-sm outline-none"
                    />
                    <div className="absolute top-1 right-2 bg-white flex items-center justify-end gap-1">
                      <img
                        src="/assets/visa.jpg"
                        alt=""
                        width={56}
                        height={48}
                        className="-mr-1.5"
                      />
                      <img
                        src="/assets/amex.png"
                        alt=""
                        width={48}
                        height={36}
                        className="w-12 h-9"
                      />
                      <img
                        src="/assets/mastercard.png"
                        alt=""
                        width={56}
                        height={40}
                        className="w-14 h-10"
                      />
                      <img
                        src="/assets/discovery.jpeg"
                        alt=""
                        width={56}
                        height={28}
                        className="w-14 h-7"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-3 my-3">
                    <input
                      placeholder="Expiration"
                      className="w-6/12 p-3 border-2 border-[#F5F5F5] rounded-sm outline-none"
                    />
                    <input
                      placeholder="CVV"
                      className="w-6/12 p-3 border-2 border-[#F5F5F5] rounded-sm outline-none"
                    />
                  </div>
                  <div className="flex items-center justify-center gap-3 my-3">
                    <input
                      placeholder="First Name"
                      className="w-6/12 p-3 border-2 border-[#F5F5F5] rounded-sm outline-none"
                    />
                    <input
                      placeholder="Last Name"
                      className="w-6/12 p-3 border-2 border-[#F5F5F5] rounded-sm outline-none"
                    />
                  </div>
                  <input
                    placeholder="Billing zip code"
                    className="w-full p-3 border-2 border-[#F5F5F5] rounded-sm outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="w-full flex items-center justify-center my-5">
              <button onClick={()=>router.push('/confirm-payment')} className="w-full h-14 text-white text-xl font-semibold rounded-xl bg-background-gradient shadow-[0px_17px_36px_0px_rgba(255,125,60,0.25)]">
                Vers le paiement
              </button>
            </div>
          </div>
          <div className="w-full lg:w-5/12 bg-[#FAFAFA] rounded-3xl py-8 px-6 sm:px-10">
            <p className="text-lg font-semibold text-black">Order</p>
            <div className="text-black text-lg mt-5">
              <div className="flex items-center justify-between">
                <p>Abonnement Onehaircut Pro</p>
                <p>89,00 €</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="w-[317px]">Parrainage</p>
                <p>-20,00&nbsp;€</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-5">
              <p className="text-black font-bold text-lg">Order total</p>
              <p>69,00 €</p>
            </div>
            <div className="mt-10">
              <p className="text-lg font-semibold text-black">Salon</p>
              <div className="text-black text-lg mt-5">
                <p>Golden Blabla</p>
                <p>2 rue de la Victoire</p>
                <p>75000 Paris</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
