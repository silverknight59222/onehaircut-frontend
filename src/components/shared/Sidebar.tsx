"use client";
import React, { useEffect, useState, FC } from "react";
import "./index.css";
import {
  BoostIcon,
  BotIcon,
  ClientActivityIcon,
  DashboardIcon,
  StarGreyIcon,
  HelpIcon,
  HistoryIcon,
  MessageIcon,
  PersonalizationIcon,
  PortraitIcon,
  ProfileImageBorderIcon,
  RevenueIcon,
  SettingsIcon,
  StatsIcon,
  ReservationIcon,
  AddPlusIcon,
} from "../utilis/Icons";
import { SalonDetails } from "@/types";
import { getLocalStorage, setLocalStorage } from "@/api/storage";
import { dashboard } from "@/api/dashboard";
import { usePathname, useRouter } from "next/navigation";
import { ColorsThemeA, Theme_A } from "../utilis/Themes";
import BaseModal from "../UI/BaseModal";

interface SidebarItems {
  icon: string;
  title: string;
  route: string;

}
type SidebarType = {
  isSidebar: Boolean;
  sidebarItems: SidebarItems[];
  isClientDashboard?: boolean;
  SidebarHandler: () => void;
};

// Declare icon color
const colorIcon = "#ffffff"

// Define the Sidebar component
const Sidebar = ({ isSidebar, SidebarHandler, sidebarItems, isClientDashboard }: SidebarType) => {
  // State to store salon details
  const [salonDetail, setSalonDetails] = useState<SalonDetails[]>();
  // State to store active salon info
  const [activeSalon, setActiveSalon] = useState<SalonDetails>();
  // State to store sidebar items
  const [sidebarItem, setSidebarItem] = useState<SidebarItems[]>([])
  // Get routing functions and current path
  const router = useRouter()
  const path = usePathname()
  // Define routes that require a pro subscription
  const proRoutes = ['/dashboard/client-activity', '/dashboard/visites']


  // Function to determine which icon to display on the sidebar
  const setIcon = (SidebarIcon: string, activeIcon: string) => {
    // ... (icon displaying logic is defined here)
    let Icon;
    switch (SidebarIcon) {
      case "DashboardIcon":
        Icon = (
          <DashboardIcon
            color={activeIcon === SidebarIcon ? colorIcon : "#989898"}
            width="24"
            height="24"
          />
        );
        break;
      case "ClientActivityIcon":
        Icon = (
          <ClientActivityIcon
            color={activeIcon === SidebarIcon ? colorIcon : "#989898"}
            width="24"
            height="24"
          />
        );
        break;
      case "StatsIcon":
        Icon = (
          <StatsIcon
            color={activeIcon === SidebarIcon ? colorIcon : "#989898"}
            width="24"
            height="24"
          />
        );
        break;
      case "RevenueIcon":
        Icon = (
          <RevenueIcon
            color={activeIcon === SidebarIcon ? colorIcon : "#989898"}
            width="24"
            height="24"
          />
        );
        break;
      case "MessageIcon":
        Icon = (
          <MessageIcon
            color={activeIcon === SidebarIcon ? colorIcon : "#989898"}
            width="24"
            height="24"
          />
        );
        break;
      case "SettingsIcon":
        Icon = (
          <SettingsIcon
            color={activeIcon === SidebarIcon ? colorIcon : "#989898"}
            width="24"
            height="24"
          />
        );
        break;
      case "PersonalizationIcon":
        Icon = (
          <PersonalizationIcon
            color={activeIcon === SidebarIcon ? colorIcon : "#989898"}
            width="24"
            height="24"
          />
        );
        break;
      case "BoostIcon":
        Icon = (
          <BoostIcon
            color={activeIcon === SidebarIcon ? colorIcon : "#989898"}
            width="24"
            height="24"
          />
        );
        break;
      case "Reservation":
        Icon = (
          <ReservationIcon
            color={activeIcon === SidebarIcon ? colorIcon : "#989898"}
            width="24"
            height="24"
          />
        );
        break;
      case "BotIcon":
        Icon = (
          <BotIcon color={activeIcon === SidebarIcon ? colorIcon : "#989898"} width="24" height="24" />
        );
        break;
      case "StarGreyIcon":
        Icon = (
          <StarGreyIcon color={activeIcon === SidebarIcon ? colorIcon : "#989898"} width="28" height="28" />
        );
        break;
      case "PortraitIcon":
        Icon = (
          <PortraitIcon color={activeIcon === SidebarIcon ? colorIcon : "#989898"} width="24" height="24" />
        );
        break;
      case "HistoryIcon":
        Icon = (
          <HistoryIcon color={activeIcon === SidebarIcon ? colorIcon : "#989898"} width="24" height="24" />
        );
        break;
      case "HelpIcon":
        Icon = (
          <HelpIcon color={activeIcon === SidebarIcon ? colorIcon : "#989898"} width="24" height="24" />
        );
        break;
      case "ReservationIcon":
        Icon = (
          <ReservationIcon color={activeIcon === SidebarIcon ? colorIcon : "#989898"} width="30" height="28" />
        );
        break;
    }
    return Icon;
  };

  // Function to set the active salon
  const setSalon = (salonList: SalonDetails[]) => {
    salonList.forEach(salon => {
      if (salon.is_primary) {
        setActiveSalon(salon);
        setLocalStorage('salon_id', salon.id);
      }
    });
  };

  // Function to handle click on a sidebar item
  const onSelectItem = (route: string, index: number) => {
    if (route) {
      router.push(route)
    }
  }

  // Use effect to fetch data on component mount
  useEffect(() => {
    const temp = getLocalStorage("user");
    const user = temp ? JSON.parse(temp) : null;
    if (!user.subscription) {
      const filteredRoutes = sidebarItems.filter(route => {
        return !proRoutes.includes(route.route)
      })
      setSidebarItem(filteredRoutes)
    } else {
      setSidebarItem(sidebarItems)
    }
    if (user.id)
      dashboard.getHairSalon(Number(user.id)).then((res) => {
        setSalonDetails(res.data.data);
        setSalon(res.data.data);
      });
  }, []);


  /* For the modal */
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if (!isClientDashboard) {
      setIsModalOpen(true);
    } else {
      router.push("/client/portrait")
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const initialText = ""; // Ajoutez votre texte initial ici si nécessaire
  const [textDescription, setTextDescription] = useState(initialText);
  const [textLength, setTextLength] = useState(initialText.length);
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextDescription(e.target.value);
    setTextLength(e.target.value.length);
  };

  /* For The Logo */
  const [logoPath, setLogoPath] = useState(null);




  return (
    <>
      {isSidebar && (
        <div className="fixed z-20">
          <div
            className="lg:hidden fixed top-0 left-0 h-full w-screen bg-[#2E465C] bg-opacity-90 cursor-pointer"
            onClick={SidebarHandler}
          />
          <div className="w-72 h-screen fixed bg-white shadow-[0_1px_30px_0px_rgba(0,0,0,0.3)] pt-4 overflow-auto no-scrollbar">
            <div
              className="lg:hidden absolute top-2 right-3 text-2xl cursor-pointer"
              onClick={SidebarHandler}
            >
              &#10005;
            </div>

            {/* Section Salon LOGO On top of the Sidebar */}
            <div className="relative w-full flex flex-col items-center justify-center lg:mt-0 mt-10 group">
              {!isClientDashboard && <p className="text-xl font-bold mb-5">{activeSalon?.name ? activeSalon.name : '-'}</p>}

              {/* Conteneur de l'image et de l'icône */}
              <div
                className="relative cursor-pointer group"
                onClick={openModal}
                style={{ width: '160px', height: '160px' }}
              >
                {/* Icôn around the logo*/}
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:rotate-90"
                  style={{
                    left: '-15px',
                    transition: 'transform 500ms',
                    transformOrigin: '54% center', // ajustez selon vos besoins
                  }}> {/* Ajustement ici */}
                  <ProfileImageBorderIcon />
                </div>

                {/* Salon Logo*/}
                {/* TODO Add and save Logo fron salon there */}
                <img
                  src="/assets/user_img.png"
                  alt="profile"
                  className="rounded-full absolute inset-0 m-auto shadow-md transform transition-transform duration-300 group-hover:scale-90 hover:shadow-inner border border-stone-700"
                />
              </div>

              {/* Popup  to change the LOGO an DESCRIPTION*/}
              {isModalOpen && (
                <BaseModal close={closeModal} width="md:min-w-[470px] lg:min-w-[550px] xl:min-w-[600px]">
                  <div className="flex flex-col h-full p-4 justify-between">
                    {/* Section du contenu */}
                    <div>
                      <h2 className="text-center text-lg font-bold mb-4">
                        Modifiez votre logo
                      </h2>
                      {/*TODO save Logo */}
                      <div className="flex justify-center item-center mb-4 ">
                        {logoPath ? (
                          <img
                            src={logoPath}
                            alt="Logo"
                            className="w-48 h-48 rounded-full shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                          />
                        ) : (
                          <div className="w-48 h-48 rounded-full shadow-md flex items-center justify-center border-2 border-stone-200 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer">
                            <div className=" flex items-center justify-center w-24 h-24">
                              <AddPlusIcon />
                            </div>
                          </div>
                        )}
                      </div>
                      <h2 className="text-center text-lg font-bold mb-4">
                        Modifiez votre description
                      </h2>
                      {/*TODO save Description */}
                      <div className="relative">
                        <textarea
                          className="w-full p-2 mb-4 rounded border shadow-inner  border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                          id="Description"
                          rows={4}
                          value={textDescription}
                          onChange={handleTextChange}
                          maxLength={100}
                          placeholder="Décrivez votre service ici. Soyez attractif !"
                        ></textarea>

                        <div className="absolute bottom-2 right-2 text-sm text-gray-300 mt-2">
                          {textLength}/100
                        </div>
                      </div>
                    </div>
                    {/* Bouton Enregistrer */}
                    <div className="flex justify-center pb-2">
                      <button className={`${Theme_A.button.smallGradientButton}`}>
                        Enregistrer
                      </button>
                    </div>
                  </div>
                </BaseModal>
              )}
            </div>


            {/* Button to go directly to the order page */}
            {isClientDashboard && <div
              onClick={() => router.push('/')}
              className={`flex items-center justify-center w-auto h-14 px-4 py-6 mx-3 my-6 ${Theme_A.button.mediumGradientButton} rounded-2xl shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)] cursor-pointer `}
            >
              Réserver une coiffure
            </div>}
            {/* Sidebar items display - mb-8 added to be able to see the last element due to the bottom-bar */}
            <div className="mt-8 mb-8">
              {sidebarItem.map((item, index) => {
                return (
                  <div key={index}>
                    <div
                      onClick={() => onSelectItem(item.route, index)}
                      className={
                        `flex items-center my-2 pl-8 py-4 gap-4 cursor-pointer transition ease-in-out duration-100 border-l-4 
                        ${path === item.route && "border-rose-600 bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-400 font-bold"}`}
                    >
                      <div className="relative">
                        {setIcon(
                          item.icon,
                          path === item.route ? item.icon : ""
                        )}
                        {/* TODO make the message notification number dynamic */}
                        {item.title === 'Message' && <p className="absolute top-3 -right-2.5 flex items-center justify-center w-4 h-4 rounded-full bg-[#F44336]  text-white text-[10px] font-semibold">2</p>}
                      </div>
                      <p
                        className={`text-base ${path === item.route && "text-white"
                          }`}
                      >
                        {item.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
