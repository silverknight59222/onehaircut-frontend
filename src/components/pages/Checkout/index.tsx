"use client";
import {
  LogoCircleFixRight,
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
  const [stripePromise, setStripePromise] = useState<string>("pk_test_51OBGjoAHQOXKizcuQiaNTSGNA6lftEd3lekpQDN7DGGpx4lQGttBHwI62qzZiq85lelN91uyppVeLUsnC5WfmSZQ00LuhmW4QA");
  const [mounted, setMounted] = useState(false);
  const salonAddress = getLocalStorage("salon_address") ? JSON.parse(getLocalStorage("salon_address") as string) : null
  const planType = getLocalStorage("plan_type") ? JSON.parse(getLocalStorage("plan_type") as string) : null;
  const salonInfo = getLocalStorage("salon_name") as string;
  useEffect(() => {
    setMounted(true)
  }, [])

  const options = {
    clientSecret: getLocalStorage("secret_key")?.toString(),
  };

  return (
    <div>
      <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 -z-10">
        <LogoCircleFixRight />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center border-b border-[#EBF0F2] pb-4">
        <div className="absolute top-1 flex items-center justify-start sm:justify-center w-full gap-5 px-4 sm:px-14 py-5">
          <div onClick={() => router.push('/')} className='relative z-30 cursor-pointer'><LogoIcon className={''} /></div>
        </div>
        <div className="relative z-20 w-full flex items-center justify-end gap-4 px-4 sm:px-14 mt-6">
          <UserProfile />
        </div>
      </div>
      <div className="z-50 flex flex-col items-center justify-center ">
        <p className="text-black font-medium text-5xl mt-10">Panier</p>
        <div className="w-full flex flex-col lg:flex-row items-start justify-center gap-12 mt-9 px-5">
          <div className="w-full lg:w-[550px] 2xl:w-[670px] ">
            <div className="bg-[#f3f2f2] rounded-3xl py-8 px-6 sm:px-10 shadow-sm shadow-stone-300">
              <div className="bg-white px-4 py-8 w-full rounded-lg">
                <p className="text-lg font-semibold text-black">
                  Adresse de facturation
                </p>
                <div className="text-black text-lg mt-5">
                  <p>{salonAddress ? `${salonAddress.street},${salonAddress.city}, ${salonAddress.country}` : '-'}</p>
                </div>
              </div>
              <div className="bg-white px-4 py-8 mt-7 w-full rounded-lg">
                <p className="text-lg font-semibold text-black">
                  Moyen de paiement
                </p>
                {options.clientSecret && mounted && (
                  <Elements
                    stripe={loadStripe(stripePromise)}
                    options={options}
                  >
                    <StripePayment />
                  </Elements>
                )}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[480px] 2xl:w-[590px] bg-[#f3f2f2] rounded-3xl py-8 px-6 sm:px-8 shadow-sm shadow-stone-300">
            <p className="text-lg font-semibold text-black">Commande</p>
            <div className="text-black text-lg mt-5">
              <div className="flex items-center justify-between gap-3">
                <p>{planType ? planType.name : '-'}</p>
                <p className="whitespace-nowrap">{planType ? planType.price : '-'} €</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-5">
              <p className="text-black font-bold text-lg">Total</p>
              <p>{planType ? planType.price : '-'} €</p>
            </div>
            <div className="mt-10">
              <p className="text-lg font-semibold text-black">Salon</p>
              <div className="text-black text-lg mt-5">
                <p>{salonInfo ? `${salonInfo}` : '-'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step5;