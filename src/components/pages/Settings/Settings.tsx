"use client";
import { LogoCircleFixRight } from "@/components/utilis/Icons";
import DashboardLayout from "@/layout/DashboardLayout";
import React, { useEffect, useState } from "react";
import userLoader from "@/hooks/useLoader";
import useSnackbar from "@/hooks/useSnackbar";
import { getLocalStorage } from "@/api/storage";
import { dashboard } from "@/api/dashboard";
import { SalonDetails } from "@/types";
import OpenningHours from "./OpenningHours";
import Footer from "@/components/UI/Footer";
import { Theme_A } from "@/components/utilis/Themes";
import PayementSettings from "./PayementSettings";
import TaxesSettings from "./TaxesSettings";
import SalonInfos from "./SalonInfos";
import RolesSettings from "./RolesSettings";
import Unavailability from "./Unavailability";
import PasswordSettings from "./PasswordSettings";
export interface settingsStruct {
  name: string;
  permission: string,
  display: () => React.JSX.Element;
}

const settingsMenu: settingsStruct[] = [
  { name: "Générales", permission: "Générales", display: SalonInfos },
  { name: "Horaires", permission: "Horaires",display: OpenningHours },
  { name: "Indisponibilités", permission: "Indisponibilités",display: Unavailability },
  { name: "Réglage des roles", permission: "Réglage des roles",display: RolesSettings },
  { name: "Paiements", permission: "Paiements",display: PayementSettings },
  { name: "Mot de passe", permission: "",display: PasswordSettings },
  //{ name: "Taxes", display: TaxesSettings },
  // { name: "Notifications", display: NotificationsSettings }, // not needed for the salon
  //{ name: "OnehairBot", display: BotSettings },
  //{ name: "Promotions", display: PromotionsSettings },
]


const Settings = () => {
  const { loadingView } = userLoader();
  // const showSnackbar = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState(settingsMenu[Object.keys(settingsMenu)[0]].name);
  const [currentMenu, setCurrentMenu] = useState<settingsStruct[]>([]);



  const [notifications, setNotifications] = useState({} as any);
  const fetchSalonNotifications = async () => {
    const { data } = await dashboard.salonNotification()
    setNotifications(data)
  }
  const applyPermissions = (menus: any) => {
    const temp = getLocalStorage("user");
    const user = temp ? JSON.parse(temp) : null;
    let currentMenuCopy: settingsStruct[] = [];
    if (user.role != 'salon_professional' && user.permissions.length > 0) {
      menus.forEach((m: any, k: number) => {
        if ((user.permissions.indexOf(m.permission || m.name) != -1) || (m.name == "Mot de passe")) {
          currentMenuCopy.push(m)
        }
      });
    }
    else if(user.role == 'salon_professional')
    {
      currentMenuCopy = [...settingsMenu];
    }
    else
    {
      currentMenuCopy.push(settingsMenu[5]);
    }

    setCurrentMenu(currentMenuCopy)
    setActiveMenu(currentMenuCopy[0].name)
  }
  useEffect(() => {
    applyPermissions(settingsMenu)
    fetchSalonNotifications()
  }, []);

  return (
    <div>
      {isLoading && loadingView()}
      <div className="hidden sm:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 z-10">
        <LogoCircleFixRight />
      </div>
      <DashboardLayout notifications={notifications}>
        <div className="flex md:gap-4 ">
          {/* DISPLAY SETTINGS MENU */}
          {!isLoading && (
            <div className="max-w-[300px] h-max flex flex-col items-left justify-center text-center px-1 md:px-2 py-6 gap-8 rounded-2xl bg-white text-sm md:text-lg font-medium text-[#909090] shadow-md">
              {currentMenu.map((item, index) => {
                return (
                  <p
                    key={index}
                    className={` cursor-pointer md:ml-2 md:mr-2 ${activeMenu === item.name &&
                      " text-black "
                      }`}
                    onClick={() => setActiveMenu(item.name)}
                  >
                    {item.name}
                  </p>
                )
              })}
            </div>
          )}

          {/*  DISPLAY SUB MENU */}
          {currentMenu.map((item, index) => {
            return (
              <>
                {activeMenu === item.name && !isLoading && (
                  <div key={index} className="relative flex z-10 md:pl-auto overflow-auto bg-transparent rounded-2xl px-2">
                    <item.display />
                  </div>
                )}
              </>
            )
          })}
        </div>
      </DashboardLayout >
      <Footer />
    </div >
  );
};

export default Settings;
