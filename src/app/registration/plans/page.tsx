"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  LogoIcon,
  RegistrationCheckedIcon,
  RegistrationUnCheckedIcon,
  UserIcon,
} from "@/components/utilis/Icons";
import ReactPlayer from "react-player";
import userLoader from "@/hooks/useLoader";
import "./index.css";
import Link from "next/link";
import { registration } from "@/api/registration";
import { setLocalStorage } from "@/api/storage";
import UserProfile from "@/components/UI/UserProfile";

interface Package {
  package: string;
}

interface Params {
  params: Package;
}
interface PlanDetails {
  plan_id: string;
  name: string;
  price: string;
  description: string;
}
const Page = ({ params }: Params) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { loadingView } = userLoader();
  const [selectedPlan, setSelectedPlan] = useState(searchParams.get('plan'));
  const [isLoading, setIsLoading] = useState(false);
  const defaultPlan:PlanDetails[] = [{
    plan_id: "",
    name: "",
    price: "",
    description: ""
  }]
  const [plans, setPlans] = useState<PlanDetails[]>(defaultPlan);
  const packages = [
    {
      name: "Agenda dynamique",
      desc: "Gérer et agencer vos rendez-vous automatiquement. ",
    },
    {
      name: "Mise en avant de votre salon",
      desc: "Des photos et des liens vers vos réseaux sociaux",
    },
    {
      name: "Sélection des coiffures",
      desc: "Effectuer seulement les coiffures que vous souhaitez",
    },
    {
      name: "Proposition de prestations",
      desc: "Il n’y a pas que les coiffures qui compte !",
    },
    {
      name: "Enregistrement du personnel",
      desc: "Ajouter vos collaborateurs. ils auront accès à leur propre agenda.",
    },
    {
      name: "Liaisons de vos salons",
      desc: "Une manière révolutionnaire de travailler en collaboration vous attends",
    },
    {
      name: "Dashboard Complet",
      desc: "Vision détaillée de toutes vos activités et tous vos salons liés ",
    },
    {
      name: "OnehairBot Assistant",
      desc: "Votre partenaire dans l'optimisation de votre business",
    },
    {
      name: "Personnalisation de l'Interface",
      desc: " personnaliser votre espace à vos couleurs ",
    },
  ];

  const onSubmit = () => {
    if(selectedPlan === 'standard') {
      setLocalStorage('plan_type', JSON.stringify(plans[0]));
    } else {
      setLocalStorage('plan_type', JSON.stringify(plans[1]));
    }
    router.push("/registration/steps");
  }
  useEffect( () => {
    setIsLoading(true);
    registration.getAllPlans().then(res=>{
      setPlans(res.data.data);
    }).finally(()=>setIsLoading(false))
  }, [])
  
  return (
    <div>
      {isLoading && loadingView()}
      <div>
        <div className="fixed -z-40 -left-32 md:-left-28 -bottom-32 md:-bottom-28 overflow-hidden hidden md:block">
          {/* <LogoCircle /> */}
        </div>
        <div className="flex flex-row items-center justify-center border-b border-[#EBF0F2]">
          <div onClick={()=>router.push('/')} className="w-full flex items-center justify-start gap-5 px-4 md:px-14 py-5 cursor-pointer">
            <LogoIcon />
          </div>
          <div className="w-full flex items-center justify-center sm:justify-end gap-4 sm:px-14">
           <UserProfile/>
          </div>
        </div>
        {plans.length > 1 && ( <div className="flex flex-col items-center justify-center mt-12 px-6 w-full overflow-hidden">
            <div className="flex sm:flex-row flex-col gap-2 sm:gap-0 w-full items-center justify-center mb-6 max-w-[1300px] 2xl:max-w-[1340px]">
              <div className="flex sm:flex-row flex-col items-center justify-between w-full">
              <div className="text-black font-medium text-3xl ml-5">
                Abonnement
              </div>
              <button
                onClick={() => onSubmit()}
                className="w-full sm:w-auto text-white py-4 px-11 mt-5 mb-3 md:m-0 font-semibold bg-background-gradient rounded-xl shadow-[0px_17px_36px_0px_rgba(255,125,60,0.25)]"
              >
                Choisir cette offre
              </button>
            </div>
            </div>
          <div className="flex flex-col xl:flex-row items-center md:items-start gap-6 2xl:gap-11 w-full md:w-auto">
            <div className="w-full lg:w-auto sm:mx-4">
              <Link
                className={`w-full cursor-pointer sm:w-[600px] h-44 sm:h-[130px] px-8 flex flex-col sm:flex-row items-start sm:items-center justify-center sm:justify-between mb-7 rounded-xl ${
                  selectedPlan === "standard"
                    ? "bg-background-gradient text-white shadow-[0px_13px_38px_0px_rgba(180,180,180,0.42)]"
                    : "bg-white text-black border border-[#D7D5D5]"
                }`}
                href={'/registration/plans?plan=standard'}
                onClick={() =>setSelectedPlan("standard")}
              >
                <div>
                  <p className="font-semibold text-2xl">{plans.length > 1 && plans[0].name}</p>
                  <p className="sm:w-80">
                  {plans.length > 1 && plans[0].description}
                  </p>
                </div>
                <p className="font-semibold text-3xl mt-5">$ {plans.length > 1 && plans[0].price}</p>
              </Link>
              <Link
                className={`w-full cursor-pointer sm:w-[600px] h-44 sm:h-[130px] px-8 flex flex-col sm:flex-row items-start sm:items-center justify-center sm:justify-between rounded-xl ${
                  selectedPlan === "pro"
                    ? "bg-background-gradient text-white shadow-[0px_13px_38px_0px_rgba(180,180,180,0.42)]"
                    : "bg-white text-black border border-[#D7D5D5]"
                }`}
                href={'/registration/plans?plan=pro'}
                onClick={() => setSelectedPlan("pro")}
              >
                <div>
                  <p className="font-semibold text-2xl">{plans.length > 1 && plans[1].name}</p>
                  <p className="sm:w-96">
                  {plans.length > 1 && plans[1].description}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="">à partir de</p>
                  <p className="font-semibold text-3xl">$ {plans.length > 1 && plans[1].price}</p>
                </div>
              </Link>
            </div>
            <div className="flex flex-col gap-5 w-full xl:w-8/12 p-5 rounded-xl bg-[#F7F7F7] mt-5 xl:mt-0">
              {packages.map((item, index) => {
                return (
                  <div
                    key={index}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-black w-full sm:w-8/12">{item.name}</p>
                      <p className="hidden md:block w-full text-black text-xs text-start">
                        {item.desc}
                      </p>
                      <div className="w-2/12 flex items-end justify-end">
                        {selectedPlan === "pro" ? (
                          <RegistrationCheckedIcon width="22px" height="23px" />
                        ) : index < 5 ? (
                          <RegistrationCheckedIcon width="22px" height="23px" />
                        ) : (
                          <RegistrationUnCheckedIcon />
                        )}
                      </div>
                    </div>
                    <p className="md:hidden w-9/12 sm:w-full text-black text-xs text-start mt-1">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative video my-9 xl:ml-[520px] rounded-xl w-full md:max-w-[502px]">
            <ReactPlayer
              url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              poster="assets/poster.jpg"
              width="auto"
              height="auto"
              
            />
          </div>
        </div>)}
      </div>
    </div>
  );
};

export default Page;
