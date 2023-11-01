"use client";
import { LogoCircleFixRight, CrossIcon } from "@/components/utilis/Icons";
import DashboardLayout from "@/layout/DashboardLayout";
import React, { useEffect, useState } from "react";
import { ColorsThemeA, Theme_A } from "@/components/utilis/Themes";
import Footer from "@/components/UI/Footer";
import { useRouter } from "next/navigation";
import Switch from "@material-ui/core/Switch";
import BaseModal from '@/components/UI/BaseModal';

const Bot = () => {

  const [isModal, setIsModal] = useState(false)

  // structure for the each advise card
  interface adviseInterface {
    title: string;
    desc: string;
    route: string;
  }


  // ADVISES PART
  // TODO: these arrays must be filled by the BE
  let advisesVisibility: adviseInterface[] = [
    {
      title: "Images de vitrine peu attractives",
      desc: "Les clients parcourent que peu les photos de votre salon avant de partir. ",
      route: "/dashboard",
    },
    {
      title: 'Optimisez votre visibilité avec le "Booster',
      desc: 'Rédigez un message de la part de Onehairbot pour informer les professionnels du meilleur moment pour utiliser la fonctionnalité "Booster" et les encourager à maximiser leur visibilité sur Onehaircut.',
      route: "",
    },
    {
      title: "Optimisez votre attractivité avec le descriptif",
      desc: "Descriptif du salon manquant : Décrivez votre salon avec passion et précision pour attirer les clients. Exemple : Salon moderne offrant des coupes tendance, colorations éclatantes et styles personnalisés. Expérience capillaire exceptionnelle dans une ambiance conviviale. Rejoignez-nous pour briller avec style !'",
      route: "",
    },
  ]
  let advisesAgenda: adviseInterface[] = [
    {
      title: "Titre",
      desc: "",
      route: "",
    },
  ]
  let advisesHaircuts: adviseInterface[] = [
    {
      title: "",
      desc: "",
      route: "",
    },
  ]
  let advisesChat: adviseInterface[] = [
    {
      title: "",
      desc: "",
      route: "",
    },
  ]
  let advisesStaff: adviseInterface[] = [
    {
      title: "",
      desc: "",
      route: "",
    },
  ]
  let advisesClientFidelity: adviseInterface[] = [
    {
      title: "",
      desc: "",
      route: "",
    },
  ]
  let advisesShop: adviseInterface[] = [
    {
      title: "",
      desc: "",
      route: "",
    },
  ]


  const router = useRouter() // for navigating to the page where the advise is showed

  const [selectedTab, setSelectedTab] = useState(0);
  // advises category to show
  const [showItem, setShowItem] = useState(advisesVisibility);

  const [optimizationMenu, setOptimizationMenu] = useState([
    { title: "Visibilité", count: 2, checked: false },
    { title: "Agencement agenda", count: 3, checked: true },
    { title: "Coiffures dispensées", count: 0, checked: true },
    { title: "Assistance messagerie", count: 1, checked: true },
    { title: "Performance du staff", count: 0, checked: true },
    { title: "Fidélisation client", count: 1, checked: true },
    // { title: "Shop", count: "" }, // TODO add in the future with the shop
  ]);

  // Copy of optimizationMenu
  const [optimizationCopy, setOptimizationCopy] = useState([...optimizationMenu])

  const onSelectTab = (item: string, index: number) => {
    setSelectedTab(index);
    if (item === "Visibilité") {
      setShowItem(advisesVisibility);
    }
    else if (item === "Agencement agenda") {
      setShowItem(advisesAgenda);
    }
    else if (item === "Coiffures dispensées") {
      setShowItem(advisesHaircuts);
    }
    else if (item === "Assistance messagerie") {
      setShowItem(advisesChat);
    }
    else if (item === "Performance du staff") {
      setShowItem(advisesStaff);
    }
    else if (item == "Fidélisation client") {
      setShowItem(advisesClientFidelity)
    }
    else if (item == "Shop") {
      setShowItem(advisesShop)
    }
    else {
      setShowItem(advisesVisibility);
    }
  };



  // function to acknowledge the advise and delete it
  const acknowledgeAdvise = (adviseToDelete: adviseInterface) => {
    let i = 0
    showItem.forEach(itemAdvise => {
      if (itemAdvise == adviseToDelete) {
        // advise found, aknowledge it
        showItem.slice
      }
      i++
    })
  }

  // to display the checkboxes
  const renderCheckboxWithLabel = (
    label: string,
    checked: boolean,
    onChange: (checked: boolean) => void
  ) => {
    const handleChange = () => {
      onChange(!checked);
    };
    return (
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <Switch
            color="primary"
            checked={checked}
            onChange={handleChange}
          />
          <label
            // htmlFor={`checkbox${id}`}
            className={`text-base font-medium text-navy-700 `}
          >
            {label}
          </label>
        </div>
      </div>
    );
  };

  // function to handle the click on the switch
  const toggleSwitch = (id: number) => {
    // Create a local copy of the optimizationMenuCopy
    const updatedMenu = [...optimizationCopy];

    // Toggle the checked property of the selected item
    updatedMenu[id].checked = !updatedMenu[id].checked;

    // Update the state with the new menu
    setOptimizationCopy(updatedMenu);
  };

  // function to handle the click on the validate button
  const onValidate = () => {
    // Copy the values from the copy back to the original array
    setOptimizationMenu([...optimizationCopy]);

    // Close the window
    setIsModal(false);
  };


  // function to handle the click on analyze
  const onStartAnalyze = () => {
    // Create a copy of the optimizationMenu
    // setOptimizationMenuCopy([...optimizationMenu]);
    // show window
    setIsModal(true)
  }

  const onAnnuler = () => {
    // Reset the copy to match the original menu
    setOptimizationCopy([...optimizationMenu]);

    // Close the window
    setIsModal(false);
  };




  return (
    <div>
      {/* Modal to display the categories to be analyzed */}
      {isModal &&
        <BaseModal close={() => setIsModal(false)}>
          <div>
            <p className='text-black text-center font-semibold text-xl pb-5'>Choisissez les catégories à analyser</p>
            <div className=" gap-5 mt-6 ">
              {optimizationCopy.map((item, index) => {
                return (
                  // renderCheckboxWithLabel(item.title, item.checked, () => toggleSwitch(index))
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <Switch key="BotList"
                        color="primary"
                        checked={item.checked}
                        onChange={() => toggleSwitch(index)}
                      />
                      <label key={index}
                        htmlFor={`checkbox${index}`}
                        className={`text-base font-medium text-navy-700 `}
                      >
                        {item.title}
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className='flex items-center justify-center gap-6 pt-10'>
              <button
                onClick={() => onAnnuler()}
                className={`w-32 h-12 flex items-center justify-center rounded-xl text-black ${Theme_A.button.medWhiteColoredButton}`}>Annuler</button>
              <button
                onClick={() => onValidate()}
                className={`w-32 h-12 flex items-center justify-center rounded-xl text-white ${Theme_A.button.mediumGradientButton}`}>Valider</button>
            </div>
          </div>
        </BaseModal>
      }

      <div className="hidden sm:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 z-10">
        <LogoCircleFixRight />
      </div>
      <DashboardLayout>
        <div className="flex flex-col md:flex-row items-start justify-center gap-6 xl:gap-14 2xl:gap-28">
          <div>

            <div
              onClick={() => onStartAnalyze()}
              className={`w-56 2xl:w-64 h-16 mb-6 flex items-center justify-center text-white font-semibold rounded-xl shadow-green-800 shadow-md  border-green-200 border-1 bg-gradient-to-br from-green-700 via-green-600 to-green-500 cursor-pointer transform hover:scale-105 transition-transform duration-300 hover:bg-gradient-to-r`}
            >
              Lancer une analyse
            </div>
            {/* </div> */}
            <p className="text-xl text-[#434343] font-bold text-center mb-2">
              OPTIMISATION
            </p>
            <div className="flex flex-row md:flex-col items-center justify-center flex-wrap gap-5 mt-6 md:mt-0">
              {optimizationMenu.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => onSelectTab(item.title, index)}
                    className={`w-56 2xl:w-64 h-24 flex items-center justify-center bg-white rounded-2xl shadow-lg cursor-pointer border ${selectedTab === index && "border-secondary"
                      }`}
                  >
                    {item.title}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <p className="text-xl text-[#434343] font-bold text-center mt-16 md:mt-16 mb-6 md:mb-6">
              Opportunités d&apos;optimisation
            </p>
            {showItem.map((item, index) => {
              return (
                <div
                  key={index}
                  className="relative z-10 w-full md:w-[450px] xl:w-[690px] 2xl:w-[850px] py-6 flex flex-col xl:flex-row items-start xl:items-end justify-between rounded-xl bg-white mb-7 px-8 shadow-xl">
                  <div
                    onClick={(e) => acknowledgeAdvise(item)}
                    className={`absolute -top-5 -right-3 flex items-center w-6 h-6 cursor-pointer rounded-md ${Theme_A.button.crossButtonSmall} z-10`}>
                    <CrossIcon width="18" height="18" />
                  </div>
                  <div>
                    <p className="text-[#FE4C56] font-bold text-center mb-4">
                      {item.title}
                    </p>
                    <p className="text-[#2C2C2C] font-normal xl:w-[500px] 2xl:w-[600px]">{item.desc}</p>
                  </div>
                  <button className={`w-22 text-center ${Theme_A.button.mediumGradientButton}`}
                    onClick={() => router.push(item.route)}>
                    Y-aller !
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </DashboardLayout>
      <Footer />
    </div >
  );
};

export default Bot;
