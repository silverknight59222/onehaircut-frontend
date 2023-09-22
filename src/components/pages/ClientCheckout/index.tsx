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
import { dashboard } from "@/api/dashboard";

const Step5 = () => {
  const router = useRouter();
  const [stripePromise, setStripePromise] = useState<string>("pk_test_51IkzH1ExivflHCSmgQfNoQAWOnOcfKopp26Ct493No4QtWa8Cv6HEf9933YbMXcrs6wVR7YjWslQV58IikPujC5U006Imw8zpO");  
  const [mounted, setMounted] = useState(false);
  const [selectedServices, setSelectedServices]=useState<string[]>([])
  const temp1=getLocalStorage("haircut")
  const haircut= temp1 ? JSON.parse(String(temp1)) : null
  const temp2=getLocalStorage('ServiceIds')
  const servicesIds= temp2 ? JSON.parse(temp2) : null

  const getSelectedServices = () => {
    dashboard.getServicesByHaircut()
        .then((res) => {
          const arr: string[]=[]
            if (res.data.data.length > 0) {
              res.data.data.forEach((ele: any) => {
                servicesIds.forEach((serviceId: number) => {
                  if(ele.id===serviceId){
                    arr.push(ele.name)
                  }
                });
              });
                setSelectedServices(arr);
            }
        })
        .catch(error => console.log(error))
}

  useEffect(() => {
    getSelectedServices()
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
      <div className="z-50 flex flex-col items-center justify-center">
        <p className="text-black font-medium text-5xl mt-10">Checkout</p>
        <div className="w-full flex flex-col lg:flex-row items-start justify-center gap-12 mt-9 px-5">
          <div className="w-full lg:w-[670px]">
            <div className="bg-[#FAFAFA] rounded-3xl py-8 px-6 sm:px-10">
              <div className="bg-white px-4 py-8 w-full">
                <p className="text-lg font-semibold text-black">
                  Billing Detail
                </p>
                <div className="text-black text-lg mt-5">
                  {haircut ? <p><span className="font-semibold">Haircut: </span>{haircut.name}</p> : ''}
                  {selectedServices.length ? <p><span className="font-semibold mt-5">Services: </span> 
                  {selectedServices.map((item,index)=>{
                    return <p key={index}>{++index}. {item}</p>
                  })}
                  </p> : ''}
                </div>
              </div>
              <div className="bg-white px-4 py-8 mt-7 w-full">
                <p className="text-lg font-semibold text-black">
                  Payment Method
                </p>
                {mounted && (
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
        </div>
      </div>
    </div>
  );
};

export default Step5;