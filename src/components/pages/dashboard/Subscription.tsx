"use client";
import React, { useState, useEffect } from "react";
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
import { salonApi } from '@/api/salonSide';
import { user_api } from "@/api/clientSide";
import { DeactivateAccountParams } from "@/api/clientSide";
import { Subscription } from "../../../types";
import { Auth } from "@/api/auth";
import { getLocalStorage } from "@/api/storage";
import useSnackbar from "@/hooks/useSnackbar";
import { dashboard } from "@/api/dashboard";
import userLoader from "@/hooks/useLoader";

const SubSelected_text = "text-white"
const SubSelected_recommended = "bg-[rgba(255,255,255,0.53)] text-white"
const SubSelected_BG = `${ColorsThemeA.ohcBigVerticalGradient_A}`
// const SubSelected_BG = `"linear-gradient(162deg, #f54257 0%, #FD4C55 40.71%, #FF8637 70.46%, #FFE30F 100%)"`
const SubUnselected_text = "text-black"
const SubUnselected_recommended = `${ColorsThemeA.OhcGradient_D} text-black`
const SubUnselected_BG = `bg-white`


const Subscription = () => {
  const showSnackbar = useSnackbar();
  const router = useRouter();
  const { loadingView } = userLoader();
  const [isLoading, setIsLoading] = useState(false);
  const defaultSubscription = {
    created_at: '',
    current_period_end: '',
    ends_at: '',
    id: 0,
    items: {},
    name: '',
    owner: {},
    quantity: 0,
    stripe_id: '',
    stripe_price: '',
    stripe_status: '',
    trial_ends_at: '',
    updated_at: '',
    user_id: 0,
    readable_trial_period: ''
  }

  const [isAutomaticRenewal, setIsAutomaticRenewal] = useState(true);
  const [currentPlan, setCurrentPlan] = useState<Subscription>(defaultSubscription);
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
    //console.log("PAY");
  }
  const [notifications, setNotifications] = useState({} as any);
  const fetchSalonNotifications = async () => {
    const { data } = await dashboard.salonNotification()
    setNotifications(data)
  }


  useEffect(() => {
    fetchSubscription();
    fetchSalonNotifications();
  }, []);

  const fetchSubscription = async () => {
    setIsLoading(true)
    const resp = await salonApi.getSubscription()
    console.log(resp.data.data)
    if (resp.data.data) {
      setCurrentPlan(resp.data.data)
    }
    if (resp.data.data && resp.data.data.name == 'OneHaircut Pro') {
      setIsCurrSubscriptionPro(true)
    } else {
      setIsCurrSubscriptionPro(false)
    }
    setIsLoading(false)
  }
  // const modifBankCard: React.JSX.Element =
  //   <div>
  //       <PaymentModal handleClickPay={handleClickPay} />
  //   </div >;

  // when clicking on the "choisir" button
  const handleClickChoose = () => {
    console.log(isCurrSubscriptionPro);

    if (isCurrSubscriptionPro) {
      closeConfirmationDowngradeModal();
      downgradePlan();
      window.location.reload(); // Rafraîchit la page
      //TODO REFRESH PAGE HERE
    } else {
      handleCloseUpgradeModal();
      upgradePlan();
      //TODO REFRESH PAGE HERE OR LOGOUT
    }
    //setIsCurrSubscriptionPro(!isCurrSubscriptionPro)

  }

  const upgradePlan = async () => {
    setIsLoading(true)
    const resp = await salonApi.upgradeToProPlan()
    console.log(resp.data)
    if (resp.data.data.subscription) {
      setCurrentPlan(resp.data.data.subscription)
    }
    if (resp.data.data.subscription && resp.data.data.subscription.name == 'OneHaircut Pro') {

      setIsCurrSubscriptionPro(true)
    } else {
      setIsCurrSubscriptionPro(false)
    }
    setIsLoading(false)
  }

  const downgradePlan = async () => {
    setIsLoading(true)
    console.log('downgrading plan')
    const resp = await salonApi.downgradeToFreePlan()
    console.log(resp.data)
    if (resp.data.data.subscription) {
      setCurrentPlan(resp.data.data.subscription)
    }
    if (resp.data.data.subscription && resp.data.data.subscription.name == 'OneHaircut Pro') {
      setIsCurrSubscriptionPro(true)
    } else {
      setIsCurrSubscriptionPro(false)
    }
    setIsLoading(false)
  }

  const handleCloseAccount = async () => {

    let answer = confirm('Les données de votre compte seront dans le système pendant 30 jours, vous pourrez vous connecter et réactiver votre compte pendant cette période. Après les 30 jours, les données seront définitivement supprimées et vous ne pourrez plus les récupérer. Êtes-vous sûr de vouloir fermer le compte ?')

    if (answer) {
      let data: DeactivateAccountParams =
      {
        user_id: ""
      }
      const user = JSON.parse(getLocalStorage("user") as string);
      data.user_id = user?.id;
      await user_api.deactivateUser(data).then((resp) => {

        /* Logout user */
        Auth.logout()
          .then((response) => {
            showSnackbar('success', 'Account deactivated successfully')
            localStorage.clear();
            router.push("/");
          })
          .catch((error) => console.log(error))
          .finally(() => {
          })


      }).catch((error) => {

      });
    }
  }

  // DOWNGRADE CONFIRMATION MODAL 
  const [isConfirmationDowngradeModalOpen, setisConfirmationDowngradeModalOpen] = useState(false);

  // Fonction appelée lorsque l'utilisateur clique sur "Choisir" pour passer à l'abonnement gratuit
  const handleDowngradeToFree = () => {
    // Affiche le modal de confirmation
    setisConfirmationDowngradeModalOpen(true);
  };
  // Fonction pour fermer le modal de confirmation
  const closeConfirmationDowngradeModal = () => {
    setisConfirmationDowngradeModalOpen(false);
  };


  // UPGRADE CONFIRMATION MODAL
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = React.useState(false);
  const handleCloseUpgradeModal = () => {
    setIsUpgradeModalOpen(false);
  };
  const handleConfirmUpgrade = () => {
    // Logique pour gérer l'upgrade
    setIsUpgradeModalOpen(true);
  };

  return (
    <div>
      <div className="hidden sm:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 z-10">
        <LogoCircleFixRight />
      </div>
      <DashboardLayout notifications={notifications}>
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
                      <button className={` font-semibold text-center pt-2 ${isCurrSubscriptionPro ? SubSelected_text : SubUnselected_text}`}>
                        <span className="text-2xl">79€ /mois</span>
                      </button>
                    </div>
                  </div>
                  {isCurrSubscriptionPro && <div className="w-48 absolute left-[230px] top-[650px]  flex items-center justify-center text-white font-semibold rounded-3xl -mb-12 h-12 bg-black cursor-not-allowed">
                    {/* <div className={`${Theme_A.button.medBlackColoredButton} w-52 absolute left-[224px] top-[650px]  flex items-center justify-center`}> */}
                    Abo actuel
                  </div>}
                  {!isCurrSubscriptionPro && <div className="z-10 w-48 absolute left-[230px] top-[650px]  flex items-center justify-center text-black font-semibold border border-[#000000] rounded-3xl -mb-12 h-12 bg-white hover:scale-105 transition-transform hover:shadow-md cursor-pointer"
                    onClick={() => handleConfirmUpgrade()}>
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
                  {!isCurrSubscriptionPro && <div className="w-48 absolute left-[450px] top-[650px]  flex items-center justify-center text-white font-semibold rounded-3xl -mb-12 h-12 bg-black cursor-not-allowed">
                    {/* <div className={`${Theme_A.button.medBlackColoredButton} w-52 absolute left-[224px] top-[650px]  flex items-center justify-center`}> */}
                    Abo actuel
                  </div>}
                  {isCurrSubscriptionPro && <div className="z-10 w-48 absolute left-[450px] top-[650px]  flex items-center justify-center text-black font-semibold border border-[#000000] rounded-3xl -mb-12 h-12 bg-white hover:scale-105 transition-transform hover:shadow-md cursor-pointer"
                    onClick={() => handleDowngradeToFree()}>
                    Choisir
                  </div>}
                </div>
              </div>
            </div>
            <div className="relative z-10 flex items-center justify-center w-full lg:hidden">
              <MobilePricingTable />
            </div>


            <div className="relative z-10 w-full sm:w-[450px] flex flex-col  sm:-mt-5 lg:mt-20 xl:mt-20">

              <div >
                {currentPlan.trial_ends_at && (
                  <div className="py-4 px-5 2xl:text-xl text-center text-black whitespace-nowrap bg-[#F4F4F6] font-medium border border-[#9B9B9B] rounded-xl">
                    <p>Votre contrat sera renouvelé le: </p>
                    <p>{currentPlan.trial_ends_at}</p>
                    {currentPlan.stripe_status && currentPlan.stripe_status === 'trialing' &&
                      <p>L'essai se termine le : {currentPlan.trial_ends_at}</p>
                    }
                  </div>
                )}
              </div>

              <button onClick={handleCloseAccount} className="w-40 h-10 flex items-center justify-center bg-[#ffffff] border border-black rounded-xl mt-20 mb-20 text-black font-normal hover:scale-95 transition-transform duration-300 hover:bg-stone-100 ">
                Clôturer le compte
              </button>
            </div>


          </div>
        </div>
      </DashboardLayout >
      <Footer />

      {/* Modal de confirmation pour le DOWNGRADE d'abonnement */}
      {isConfirmationDowngradeModalOpen && (
        <BaseModal close={closeConfirmationDowngradeModal}>
          <div className="modal-content text-center p-6">
            <p className="text-xl font-semibold mb-4">Changement d'abonnement</p>
            <p className="mb-4">Êtes-vous sûr de vouloir passer à l'abonnement gratuit ?</p>
            <p className="">Vous perdrez tous les avantages liés à l'abonnement Pro,</p>
            <p className="mb-4">y compris le nombre d'images que vous présentez aux clients.</p>
            <div className="flex justify-center gap-4 mt-8"> {/* Ajout de flex et gap */}
              <button
                className={`${Theme_A.button.medWhiteColoredButton}`}
                onClick={closeConfirmationDowngradeModal}
              >
                Annuler
              </button>
              <button
                className={`${Theme_A.button.mediumGradientButton}`}
                onClick={handleClickChoose}
              >
                Confirmer
              </button>
            </div>
          </div>
        </BaseModal>
      )}
      {/* Modal de confirmation pour l'UPGRADE d'abonnement */}
      {isUpgradeModalOpen && (
        <BaseModal close={handleCloseUpgradeModal}>
          <div className="modal-content text-center p-6">
            <p className="text-xl font-semibold mb-4">Changement d'abonnement</p>
            <p className="mb-4">Félicitation, vous êtes sur le point de booster votre affaire</p>
            <img
              src='/assets/DefaultPictures/Boost_Plan.png'
              alt="Description de l'image" // Fournissez une description alternative pour l'image
              className="mx-auto mb-4 h-48 w-48 rounded-full" // Centrer l'image et ajouter une marge en bas
            />
            <p className="">De nouveaux horizons s'offrent à vous !</p>

            <div className="flex justify-center gap-4 mt-8"> {/* Ajout de flex et gap */}
              <button
                className={`${Theme_A.button.medWhiteColoredButton}`}
                onClick={handleCloseUpgradeModal}
              >
                Annuler
              </button>
              <button
                className={`${Theme_A.button.mediumGradientButton}`}
                onClick={handleClickChoose}
              >
                Confirmer
              </button>
            </div>
          </div>
        </BaseModal>
      )}

    </div >
  );
};

export default Subscription;
