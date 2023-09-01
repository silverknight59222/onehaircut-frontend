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
import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { getLocalStorage } from "@/api/storage";
import StripePayment from "../StripePayment";

const Step5 = () => {
  const router = useRouter();
  const [stripePromise, setStripePromise] = useState<string>("pk_test_51IkzH1ExivflHCSmgQfNoQAWOnOcfKopp26Ct493No4QtWa8Cv6HEf9933YbMXcrs6wVR7YjWslQV58IikPujC5U006Imw8zpO");  


  const options = {
    clientSecret: getLocalStorage("secret_key")?.toString()
  };
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
                  <PaypalIcon />
                </button>
                <div className="flex items-center justify-center gap-5 my-5">
                  <div className="w-36 border-t-2 border-[#F5F5F5]" />
                  <p>or</p>
                  <div className="w-36 border-t-2 border-[#F5F5F5]" />
                </div>
                {options.clientSecret && (
                  <Elements
                    stripe={loadStripe(stripePromise)}
                    options={options}
                  >
                    <StripePayment/>
                  </Elements>
                )}
              </div>
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

export default Step5;
