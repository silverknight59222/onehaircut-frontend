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
import BotSettings from "./BotSettings";
import PromotionsSettings from "./PromotionsSettings";
import PayementSettings from "./PayementSettings";
import SalonInfos from "./SalonInfos";
import RolesSettings from "./RolesSettings";
export interface settingsStruct {
  name: string;
  display: () => React.JSX.Element;
}

const settingsMenu: settingsStruct[] = [
  { name: "Générales", display: SalonInfos },
  { name: "Horaires", display: OpenningHours },
  { name: "Accès des rôles", display: RolesSettings },
  { name: "Paiements", display: PayementSettings },
  { name: "Notifications", display: BotSettings },
  { name: "OnehairBot", display: BotSettings },
  { name: "Promotions", display: PromotionsSettings },
]


const Settings = () => {
  const { loadingView } = userLoader();
  // const showSnackbar = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState(settingsMenu[0].name);


  useEffect(() => {

  }, []);
  return (
    <div>
      {isLoading && loadingView()}
      <div className="hidden sm:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 z-10">
        <LogoCircleFixRight />
      </div>
      <DashboardLayout>
        <div className="flex gap-4">
          {/* DISPLAY SETTINGS MENU */}
          {!isLoading && (
            <div className="max-w-[300px] h-max flex flex-col items-left justify-center text-center px-2 py-6 gap-8 rounded-2xl bg-white text- font-medium text-[#909090] shadow-md">
              {settingsMenu.map((item) => {
                return (
                  <p
                    className={` cursor-pointer ml-2 mr-2 ${activeMenu === item.name &&
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
          {settingsMenu.map((item) => {
            return (
              <>
                {activeMenu === item.name && !isLoading && (
                  <div className="relative flex z-10 md:pl-auto overflow-auto bg-transparent rounded-2xl px-2">
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
