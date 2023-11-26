"use client";
import React, { useState } from "react";
import DashboardLayout from "@/layout/DashboardLayout";
import {
  BgDashboardPricingTable,
  CheckedIcon,
  LogoCircleFixRight,
  PackageCheckedIcon,
  PackageUnCheckedIcon,
  RegistrationCheckedIcon,
} from "@/components/utilis/Icons";
import MobilePricingTable from "../registration/MobilePricingTable";
import { ColorsThemeA, Theme_A } from "@/components/utilis/Themes";
import { The_Nautigal } from "next/font/google";
import Footer from "@/components/UI/Footer";
import BaseModal from "@/components/UI/BaseModal";
import { useRouter } from "next/navigation";
import PaymentModal from "./PaymentModal";
import { dashboard } from "@/api/dashboard";

const SubSelected_text = "text-white"
const SubSelected_recommended = "bg-[rgba(255,255,255,0.53)] text-white"
const SubSelected_BG = `${ColorsThemeA.OhcGradient_B}`
// const SubSelected_BG = `"linear-gradient(162deg, #f54257 0%, #FD4C55 40.71%, #FF8637 70.46%, #FFE30F 100%)"`
const SubUnselected_text = "text-black"
const SubUnselected_recommended = `${ColorsThemeA.OhcGradient_D} text-black`
const SubUnselected_BG = `bg-white`

const Subscription = () => {
  const router = useRouter();
  const [isAutomaticRenewal, setIsAutomaticRenewal] = useState(true);
  const packageNames = [
    "Agenda dynamique",
    "Mise en avant de votre salon",
    "Sélections de vos coiffures",
    "Proposition de prestations supplémentaires",
    "Enregistrement du personnel",
    "Lier vos salons",
    "Dashboard Complet",
    "OnehairBot Assistant",
    "Personnalisation de l'Interface",
  ];
  const [isModal, setIsModal] = useState(false);

  // state variable to know if the user has taken the pro subscription
  const [isCurrSubscriptionPro, setIsCurrSubscriptionPro] = useState(false); // TODO: link the BE

  const handleClickPay = () => {
    console.log("PAY");
  }

  // const modifBankCard: React.JSX.Element =
  //   <div>
  //       <PaymentModal handleClickPay={handleClickPay} />
  //   </div >;

  const handleClickPro = async () => {
    const accountSid = 'AC99a58b7c8d4cdeab1c149da8f1d02afe';
    const authToken = '383a31d3080accbe3a0c3f992eeb6854';
    const data = {
      accountSid: accountSid,
      authToken: authToken
    }
    // const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    await dashboard.sendWhatsapp(data).then((resp) => {
      console.log(resp.data.data);
    });


    // const client = twilio(accountSid, authToken);
    // const client = require('twilio')(accountSid, authToken);


    // client.messages.create({
    //   body: 'Booking Success!',
    //   from: 'whatsapp:+14155238886', // Your Twilio WhatsApp-enabled phone number
    //   to: 'whatsapp:+1234567890', // The recipient's WhatsApp number
    // })
    // .then(message => console.log(message.sid))
    // .catch(error => console.error(error));

    setIsModal(true);
  }

  // when clicking on the "choisir" button
  const handleClickChoose = () => {
    setIsCurrSubscriptionPro(!isCurrSubscriptionPro)
  }

  return (
    <div>
      <div className="hidden sm:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 z-10">
        <LogoCircleFixRight />
      </div>
      <DashboardLayout>
        <div className="mt-16 px-4 lg:px-11">
          <div className="flex items-center justify-center">
            {/* TODO: slide button not working */}
            {/* <div className="w-80 h-10 flex items-center justify-between rounded-3xl bg-[#FAFAFA] shadow-[rgba(220,215,215,0.34)] text-xs font-semibold">
              <p className="text-[#0E0D0D] pl-5 cursor-pointer">
                Paiement mensuel
              </p>
              <p className="text-white bg-[#3C3A3A] rounded-3xl py-2.5 px-5 cursor-pointer">
                Paiement Annuel
              </p>
            </div> */}
          </div>
          <div className="z-10  flex-col xl:flex-row items-center xl:items-start justify-center gap-4 2xl:gap-12 mt-10 lg:mt-52">
            <div className="hidden lg:block relative">
              <BgDashboardPricingTable />
              <div className="rounded-xl py-4 px-5">
                <div className="flex">
                  <div className="absolute top-0">
                    {packageNames.map((name, index) => {
                      return (
                        <p
                          key={index}
                          className="flex items-center text-black font-medium text-sm w-48 h-16 border-b-2 border-[#E4E8E9] pl-3"
                        >
                          {name}
                        </p>
                      );
                    })}
                    <div className="font-bold text-black text-center mt-5 text-2xl">
                      Prix
                    </div>
                  </div>
                  <div
                    className={`${isCurrSubscriptionPro ? SubSelected_BG : SubUnselected_BG} w-56 absolute -top-40 left-[216px] flex flex-col items-center justify-center py-6 rounded-2xl border border-stone-300 border-1] `}
                  >
                    <div className={`text-3xl font-semibold w-48 text-center ${isCurrSubscriptionPro ? SubSelected_text : SubUnselected_text}`}>
                      OneHaircut Pro
                    </div>
                    <div className={`flex items-center justify-center mb-5 mt-1 rounded-lg w-36 h-10  font-semibold ${isCurrSubscriptionPro ? SubSelected_recommended : SubUnselected_recommended}`}>
                      recommandé
                    </div>
                    {packageNames.map((_, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-center w-full h-16 border-b-2 border-[#E4E8E9] py-4"
                        >
                          {isCurrSubscriptionPro && <PackageCheckedIcon />}
                          {!isCurrSubscriptionPro && <RegistrationCheckedIcon />}
                        </div>
                      );
                    })}
                    <div className="mt-1 h-7">
                      <button className={` font-semibold text-center pt-2 ${isCurrSubscriptionPro ? SubSelected_text : SubUnselected_text}`}
                        onClick={handleClickPro}>
                        <span className="text-2xl">79€ /mois</span>
                      </button>
                    </div>
                  </div>
                  {isCurrSubscriptionPro && <div className="w-48 absolute left-[230px] top-[650px]  flex items-center justify-center text-white font-semibold rounded-3xl -mb-12 h-12 bg-black">
                    {/* <div className={`${Theme_A.button.medBlackColoredButton} w-52 absolute left-[224px] top-[650px]  flex items-center justify-center`}> */}
                    Abo actuel
                  </div>}
                  {!isCurrSubscriptionPro && <div className="z-10 w-48 absolute left-[230px] top-[650px]  flex items-center justify-center text-black font-semibold border border-[#000000] rounded-3xl -mb-12 h-12 bg-white hover:scale-105 transition-transform hover:shadow-md"
                    onClick={() => handleClickChoose()}>
                    Choisir
                  </div>}
                  {/* Regular side */}
                  <div
                    className={`${!isCurrSubscriptionPro ? SubSelected_BG : SubUnselected_BG} z-10 w-52 absolute -top-40 left-[440px] flex flex-col items-center justify-center py-6 rounded-[20px] border border-stone-300 border-1`}>
                    <div className={`text-3xl font-semibold  w-48 text-center mb-16 ${!isCurrSubscriptionPro ? SubSelected_text : SubUnselected_text}`}>
                      OneHaircut Regular
                    </div>
                    <div className="w-full">
                      {packageNames.map((_, index) => {
                        return (
                          <div
                            key={index}
                            className="flex items-center justify-center w-full h-16 border-b-2 border-[#E4E8E9] py-4"
                          >
                            {index < 5 ? (
                              !isCurrSubscriptionPro ? (<PackageCheckedIcon />) : (<RegistrationCheckedIcon />)
                            ) : (
                              <PackageUnCheckedIcon />
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="w-full h-3 flex flex-col items-center justify-center py-4">
                      <button className={`font-medium text-2xl pt-6 ${!isCurrSubscriptionPro ? SubSelected_text : SubUnselected_text}`}>Gratuit
                        <br />
                      </button>
                    </div>
                  </div>
                  {!isCurrSubscriptionPro && <div className="w-48 absolute left-[450px] top-[650px]  flex items-center justify-center text-white font-semibold rounded-3xl -mb-12 h-12 bg-black">
                    {/* <div className={`${Theme_A.button.medBlackColoredButton} w-52 absolute left-[224px] top-[650px]  flex items-center justify-center`}> */}
                    Abo actuel
                  </div>}
                  {isCurrSubscriptionPro && <div className="z-10 w-48 absolute left-[450px] top-[650px]  flex items-center justify-center text-black font-semibold border border-[#000000] rounded-3xl -mb-12 h-12 bg-white hover:scale-105 transition-transform hover:shadow-md"
                    onClick={() => handleClickChoose()}>
                    Choisir
                  </div>}
                </div>
              </div>
            </div>
            <div className="relative z-10 flex items-center justify-center w-full lg:hidden">
              <MobilePricingTable />
            </div>
            <div className="relative z-10 w-full sm:w-[415px] flex flex-col  sm:-mt-5 lg:mt-20 xl:mt-20">
              <div className="py-4 px-5 2xl:text-xl text-center text-black whitespace-nowrap bg-[#F4F4F6] font-medium border border-[#9B9B9B] rounded-xl">
                <p>Renouvellement de l’abonnement le: </p>
                {!isAutomaticRenewal && <p className="text-center mt-1">12 / 07 / 2024</p>}
                <div
                  onClick={() => setIsAutomaticRenewal(!isAutomaticRenewal)}
                  className="flex items-center justify-start gap-3 mt-4 cursor-pointer"
                >
                  <div
                    className={`w-6 h-6 pt-2 pl-1.5 rounded-[4px] border ${isAutomaticRenewal
                      ? ColorsThemeA.ohcVerticalGradient_A
                      : "border-[#767676]"
                      }`}
                  >
                    {isAutomaticRenewal && (
                      <CheckedIcon width="15" height="10" />
                    )}
                  </div>
                  <p>Renouvellement&nbsp;Automatique</p>
                </div>
              </div>
              <button className="w-40 h-10 flex items-center justify-center bg-[#ffffff] border border-black rounded-xl mt-40 mb-6 text-black font-normal hover:scale-90 transition-transform hover:bg-red-500 hover:font-bold">
                Clôturer le compte
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout >
      <Footer />
      {
        isModal && (
          <BaseModal close={() => setIsModal(false)}>
            <div>
              <PaymentModal />
            </div>
          </BaseModal>)
      }
    </div >
  );
};

export default Subscription;
