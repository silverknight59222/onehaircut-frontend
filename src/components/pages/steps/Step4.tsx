"use client";
import { registration } from "@/api/registration";
import userLoader from "@/hooks/useLoader";
import {
  LogoIcon,
  SelectedPaymentIcon,
  StarIcon,
  UserIcon,
} from "@/components/utilis/Icons";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
interface PlanDetails {
  plan_id: string;
  name: string;
  price: string;
  description: string;
}
const Step4 = () => {
  const route = useRouter();
  const { loadingView } = userLoader();
  const [selectedBox, setSelectedBox] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const defaultPlan: PlanDetails[] = [
    {
      plan_id: "",
      name: "",
      price: "",
      description: "",
    },
  ];
  const [plans, setPlans] = useState<PlanDetails[]>(defaultPlan);
  useEffect(() => {
    setIsLoading(true);
    registration
      .getAllPlans()
      .then((res) => {
        setPlans(res.data.data);
      })
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <div>
      {isLoading && loadingView()}
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
      <div className="flex flex-col items-center justify-center px-5">
        <p className="text-black font-medium text-4xl mt-16">
          Confirmer et payer
        </p>
        <div className="w-full lg:w-[1000px] bg-[#F5F5F5] rounded-3xl my-10">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 bg-background-gradient rounded-tl-3xl rounded-tr-3xl text-white py-9 px-14">
            <p className="text-3xl text-center lg:text-start">
              Votre abonnement :{" "}
              <span className="font-semibold">OneHaircut Pro</span>{" "}
            </p>
            <button className="flex items-center justify-center font-semibold text-2xl w-52 h-16 border border-white rounded-xl">
              Modifier
            </button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-black mt-6 mb-4">
              Choisissez comment vous souhaitez payer
            </p>
            <div className="flex flex-col lg:flex-row mt-5 lg:mt-0 items-center justify-center gap-8 mb-14">
              <div
                onClick={() => setSelectedBox(0)}
                className={`relative pb-6 flex flex-col items-start justify-center bg-white px-7 border-2 rounded-2xl cursor-pointer ${
                  selectedBox === 0 ? "border-secondary" : "border-[DBDBDB]"
                }`}
              >
                {selectedBox === 0 && (
                  <div className="absolute top-0 right-0">
                    <SelectedPaymentIcon />
                  </div>
                )}
                {selectedBox === 0 && (
                  <div className="absolute top-2 right-2">
                    <StarIcon />
                  </div>
                )}
                <div className="flex flex-col sm:flex-row items-start justify-center gap-3 sm:gap-12 text-black mt-10 mb-2">
                  <div>
                    <p className="font-semibold text-xl">{plans.length > 1 && plans[1].name}</p>
                    <p>{plans.length > 1 && plans[1].description}</p>
                  </div>
                  <p className="text-2xl font-semibold">{plans.length > 1 && plans[1].price}$/mois</p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full  ${
                    selectedBox === 0
                      ? "border-[5px] border-[#537EED]"
                      : "border-[3px] border-[#C5C5C5]"
                  }`}
                />
              </div>
              <div
                onClick={() => setSelectedBox(1)}
                className={`relative flex flex-col items-start justify-center bg-white px-7 border-2 rounded-2xl cursor-pointer pb-6 ${
                  selectedBox === 1 ? "border-secondary" : "border-[DBDBDB]"
                }`}
              >
                {selectedBox === 1 && (
                  <div className="absolute top-0 right-0">
                    <SelectedPaymentIcon />
                  </div>
                )}
                {selectedBox === 1 && (
                  <div className="absolute top-2 right-2">
                    <StarIcon />
                  </div>
                )}
                <div className="flex flex-col sm:flex-row items-start justify-center gap-3 sm:gap-12 text-black mt-10 mb-2">
                  <div>
                    <p className="font-semibold text-xl">{plans.length > 1 && plans[2].name}</p>
                    <p>{plans.length > 1 && plans[2].description}</p>
                  </div>
                  <p className="text-2xl font-semibold">{plans.length > 1 && plans[2].price}$/mois</p>
                </div>
                <div
                  className={`w-6 h-6 rounded-full  ${
                    selectedBox === 1
                      ? "border-[5px] border-[#537EED]"
                      : "border-[3px] border-[#C5C5C5]"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center mb-5">
          <button
            onClick={() => route.push("/registration/steps/5")}
            className="w-56 h-14 text-white text-xl font-semibold rounded-xl bg-background-gradient shadow-[0px_17px_36px_0px_rgba(255,125,60,0.25)]"
          >
            Vers le paiement
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4;
