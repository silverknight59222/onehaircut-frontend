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
export interface settingsStruct {
  name: string;
  display: () => React.JSX.Element;
}

const settingsMenu: settingsStruct[] = [
  { name: "Horaires", display: OpenningHours },
  { name: "Promotions", display: PromotionsSettings },
  { name: "Bot", display: BotSettings }
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
        <div className="flex items-center justify-center gap-2">
          {/* DISPLAY SETTINGS MENU */}
          {!isLoading && (
            <div className="max-w-[200px] h-max flex flex-col items-left justify-center text-center px-2 py-6 gap-8 rounded-2xl bg-white text-xl font-medium text-[#ABABAB] shadow-[3px_3px_10px_-1px_rgba(0,0,0,0.30)]">
              {settingsMenu.map((item) => {
                return (
                  <p
                    className={` cursor-pointer text-black ${activeMenu === item.name &&
                      "px-3 py-2 rounded-md bg-gray-200"
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
                  <div className="relative flex z-10 md:pl-auto overflow-auto py-4 px-4 bg-transparent rounded-2xl">
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
