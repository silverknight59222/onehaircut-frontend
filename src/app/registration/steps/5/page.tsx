"use client";
import {
  CircleRight,
  LogoIcon,
  UserIcon,
} from "@/components/utilis/Icons";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getLocalStorage } from "@/api/storage";
import StripePayment from "@/components/pages/StripePayment";
import UserProfile from "@/components/UI/UserProfile";

const Step5 = () => {
  const router = useRouter();
  const [stripePromise, setStripePromise] = useState<string>("pk_test_51IkzH1ExivflHCSmgQfNoQAWOnOcfKopp26Ct493No4QtWa8Cv6HEf9933YbMXcrs6wVR7YjWslQV58IikPujC5U006Imw8zpO");  
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
      setMounted(true)
  }, [])

  const options = {
    clientSecret: getLocalStorage("secret_key")?.toString()
  };
  return (
    <div>
      <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 -z-10">
        <CircleRight />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center border-b border-[#EBF0F2] pb-4">
        <div className="absolute top-1 flex items-center justify-start sm:justify-center w-full gap-5 px-4 sm:px-14 py-5">
        <div onClick={()=>router.push('/')} className='relative z-30 cursor-pointer'><LogoIcon /></div>
        </div>
        <div className="relative z-20 w-full flex items-center justify-end gap-4 px-4 sm:px-14 mt-6">
          <UserProfile/>
        </div>
      </div>
      <div className="z-50 flex flex-col items-center justify-center mx-4">
        <p className="text-black font-medium text-5xl mt-10">Checkout</p>
        <div className="flex flex-col lg:flex-row items-start justify-center gap-12 mt-7 px-5">
          <div className="w-full lg:w-7/12">
            <div className="bg-[#FAFAFA] rounded-3xl py-8 px-6 sm:px-10">
              <div className="bg-white px-4 py-8 w-full">
                <p className="text-lg font-semibold text-black">
                  Billing address
                </p>
                <div className="text-black text-lg mt-5">
                  <p>Mike John</p>
                  <p>243 high road</p>
                  <p>12456 Atlanta</p>
                </div>
              </div>
              <div className="bg-white px-4 py-8 mt-7 w-full">
                <p className="text-lg font-semibold text-black">
                  Payment Method
                </p>
                {options.clientSecret && mounted && (
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
          <div className="w-full lg:w-6/12 bg-[#FAFAFA] rounded-3xl py-8 px-6 sm:px-8">
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
