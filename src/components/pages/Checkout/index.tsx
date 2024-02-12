"use client";
import {
  LogoCircleFixRight,
  LogoIcon,
} from "@/components/utilis/Icons";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getLocalStorage } from "@/api/storage";
import StripePayment from "@/components/pages/StripePayment/StripePayment";
import UserProfile from "@/components/UI/UserProfile";
import { salonApi } from "@/api/salonSide";
import userLoader from "@/hooks/useLoader";
import { SalonRegisterParams, registration } from "@/api/registration";
import useSnackbar from "@/hooks/useSnackbar";
import '../../shared/index.css';

const Step5 = () => {
  const router = useRouter();
  const [promiseKey, setPromisKey] = useState<string[]>([]);
  const [stripePromise, setStripePromise] = useState<string | null>(null);;
  const [mounted, setMounted] = useState(false);
  const { loadingView } = userLoader();
  const showSnackbar = useSnackbar();
  const salonAddress = getLocalStorage("salon_address") ? JSON.parse(getLocalStorage("salon_address") as string) : null
  const planType = getLocalStorage("plan_type") ? JSON.parse(getLocalStorage("plan_type") as string) : null;
  const salonInfo = getLocalStorage("salon_name") as string;
  const [isLoading, setIsLoading] = useState(false);
  const [totalProSalon, setTotalProSalon] = useState(0);

  const getStripeKey = async () => {
    setIsLoading(true)
    try {
      let resp = await salonApi.getStripeKey();
      const publishableKey = resp.data.pk || null;
      setPromisKey(resp.data);
      setStripePromise(publishableKey);
      console.log(publishableKey);
    } catch (error) {
      console.error('Error fetching Stripe key:', error);
      // Handle error appropriately (e.g., show a message to the user)
    } finally {
      setIsLoading(false);
    }
  }
  const registerSalon = async (paymentMethod?: string) => {
    setIsLoading(true);
    let data: SalonRegisterParams = {
      user_id: "",
      salon_name: "",
      salon_description: "",
      country: '',
      city: '',
      state: '',
      zone_radius: 0,
      lat: 0,
      long: 0,
      salon_type: "",
      payment_method: "",
      plan_id: "",
      plan_name: "",
      plan_slug: "",
      street: "",
      postalCode: "",
      isMobile: false,
      dob: "1991-01-01",
      country_code: ""
    };
    const userInfo = JSON.parse(getLocalStorage("user_Info") as string);
    const salonName = getLocalStorage("salon_name") as string;
    const salonType = getLocalStorage("salon_type") as string;
    data.user_id = userInfo?.id;
    data.dob = userInfo?.dob;
    data.salon_name = salonName;
    data.salon_description = 'Description text here';
    data.country = salonAddress.country
    data.state = salonAddress.state
    data.city = salonAddress.city
    data.lat = salonAddress.lat
    data.long = salonAddress.long
    data.zone_radius = salonAddress.zone
    data.salon_type = salonType;
    data.payment_method = paymentMethod || "SI";
    data.plan_id = planType.plan_id;
    data.plan_name = planType.name;
    data.plan_slug = planType.slug;
    data.street = salonAddress.street;
    data.postalCode = salonAddress.postalCode;
    data.country_code = salonAddress.country_code;
    data.isMobile = salonAddress.isMobile;

    await registration
      .registerSalon(data)
      .then((res) => {
        showSnackbar("success", "Salon successfully created");
        router.push("/verification");
      })
      .catch((err) => {
        showSnackbar("error", "Error Occured!");
      }).finally(() => {
        setIsLoading(false);
      });
  };

  const getTotalProSalon = async () => {
    let resp = await salonApi.getProSalonCount();
    console.log("Total Pro Salon Registered : " + resp.data.pro_salon_count)
    if (resp.data.pro_salon_count) {
      setTotalProSalon(resp.data.pro_salon_count);
    }
  }

  useEffect(() => {
    getTotalProSalon()
    const url = new URL(window.location.href);
    const searchParams = url.searchParams.has('setup_intent');
    if (searchParams) {
      registerSalon();
    }
    else {
      setMounted(true)
      getStripeKey();
    }

  }, [])

  const options = {
    clientSecret: getLocalStorage("secret_key")?.toString(),
  };

  return (
    <div>
      {isLoading && loadingView()}
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
        <div className="w-full flex flex-col lg:flex-row items-start justify-center gap-6 my-9 px-5">
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
                <p className="text-lg font-semibold text-black mb-4">
                  Moyen de paiement
                </p>
                {options.clientSecret && mounted && (
                  <Elements
                    stripe={stripePromise ? loadStripe(stripePromise) : null}
                    options={options}
                  >
                    <StripePayment />
                  </Elements>
                )}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[480px] 2xl:w-[590px] bg-[#f3f2f2] rounded-3xl py-6 px-6 sm:px-8 shadow-sm shadow-stone-300">
            <p className="text-lg font-semibold text-black">Commande</p>

            <div className="text-black text-lg mt-5">
              <div className="flex items-center justify-between gap-3 mb-2">
                <p className="">• Nom de votre Salon</p>
                <p>{salonInfo ? `${salonInfo}` : '-'}</p>
              </div>

              <div className={(totalProSalon <= 1000 && planType && planType.name == 'OneHaircut Pro' ? "strikethrough" : "") + " flex items-center justify-between gap-3"}>
                <p>{planType ? '• ' + planType.name : '-'}</p>
                <p className="whitespace-nowrap">{planType ? planType.price : '-'} €</p>
              </div>

              {totalProSalon <= 1000 && planType && planType.name == 'OneHaircut Pro' &&
                <div className={"flex items-center justify-between gap-3"}>
                  <p>{'• Free OneHaircut Pro 6 months'}</p>
                  <p className="whitespace-nowrap">0 €</p>
                </div>}

              {planType && planType.name == 'OneHaircut Regular' &&
                <div className={"flex items-center justify-between gap-3"}>
                  <p>{'• Free OneHaircut Trial 1 months'}</p>
                  <p className="whitespace-nowrap">0 €</p>
                </div>}
            </div>

            <div className={"flex items-center justify-between mt-5"}>
              <p className="text-black font-bold text-lg">Total</p>
              <p>{totalProSalon <= 1000 ? 0 : (planType ? planType.price : '-')} €</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Step5;