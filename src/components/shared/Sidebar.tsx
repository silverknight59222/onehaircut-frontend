"use client";
import React, { useEffect, useState } from "react";
import "./index.css";
import {
  BoostIcon,
  BotIcon,
  ClientActivityIcon,
  DashboardIcon,
  HeartIcon,
  HelpIcon,
  HistoryIcon,
  MessageIcon,
  PersonalizationIcon,
  PortraitIcon,
  ProfileImageBorderIcon,
  RevenueIcon,
  SettingsIcon,
  StatsIcon,
} from "../utilis/Icons";
import { SalonDetails } from "@/types";
import { getLocalStorage, setLocalStorage } from "@/api/storage";
import { dashboard } from "@/api/dashboard";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItems{
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

const Sidebar = ({ isSidebar, SidebarHandler, sidebarItems, isClientDashboard }: SidebarType) => {
  const [salonDetail, setSalonDetails] = useState<SalonDetails[]>();
  const [activeSalon, setActiveSalon] = useState<SalonDetails>();
  const router=useRouter()
  const path=usePathname()

  const setIcon = (SidebarIcon: string, activeIcon: string) => {
    let Icon;
    switch (SidebarIcon) {
      case "DashboardIcon":
        Icon = (
          <DashboardIcon
            color={activeIcon === SidebarIcon ? "#FE3164" : "#989898"}
            width="24"
            height="24"
          />
        );
        break;
      case "ClientActivityIcon":
        Icon = (
          <ClientActivityIcon
            color={activeIcon === SidebarIcon ? "#FE3164" : "#989898"}
            width="24"
            height="24"
          />
        );
        break;
      case "StatsIcon":
        Icon = (
          <StatsIcon
            color={activeIcon === SidebarIcon ? "#FE3164" : "#989898"}
            width="24"
            height="24"
          />
        );
        break;
      case "RevenueIcon":
        Icon = (
          <RevenueIcon
            color={activeIcon === SidebarIcon ? "#FE3164" : "#989898"}
            width="24"
            height="24"
          />
        );
        break;
      case "MessageIcon":
        Icon = (
          <MessageIcon
            color={activeIcon === SidebarIcon ? "#FE3164" : "#989898"}
            width="24"
            height="24"
          />
        );
        break;
      case "SettingsIcon":
        Icon = (
          <SettingsIcon
            color={activeIcon === SidebarIcon ? "#FE3164" : "#989898"}
            width="24"
            height="24"
          />
        );
        break;
      case "PersonalizationIcon":
        Icon = (
          <PersonalizationIcon
            color={activeIcon === SidebarIcon ? "#FE3164" : "#989898"}
            width="24"
            height="24"
          />
        );
        break;
      case "BoostIcon":
        Icon = (
          <BoostIcon
            color={activeIcon === SidebarIcon ? "#FE3164" : "#989898"}
            width="24"
            height="24"
          />
        );
        break;
      case "BotIcon":
        Icon = (
          <BotIcon color={activeIcon === SidebarIcon ? "#FE3164" : "#989898"} width="24" height="24" />
        );
        break;
      case "HeartIcon":
        Icon = (
          <HeartIcon color={activeIcon === SidebarIcon ? "#FE3164" : "#989898"} width="24" height="24" />
        );
        break;
      case "PortraitIcon":
        Icon = (
          <PortraitIcon color={activeIcon === SidebarIcon ? "#FE3164" : "#989898"} width="24" height="24" />
        );
        break;
      case "HistoryIcon":
        Icon = (
          <HistoryIcon color={activeIcon === SidebarIcon ? "#FE3164" : "#989898"} width="24" height="24" />
        );
        break;
      case "HelpIcon":
        Icon = (
          <HelpIcon color={activeIcon === SidebarIcon ? "#FE3164" : "#989898"} width="24" height="24" />
        );
        break;
    }
    return Icon;
  };
  const setSalon = (salonList: SalonDetails[]) => {
    salonList.forEach(salon => {
      if (salon.is_primary) {
        setActiveSalon(salon);
        setLocalStorage('salon_id', salon.id);
      }
    });
  };

  const onSelectItem=(route :string,index: number)=>{
    if(route){
    router.push(route)
    }
  }

  useEffect(() => {
    const user = getLocalStorage("user");
    const userId = user ? Number(JSON.parse(user).id) : null;
    if (userId)
      dashboard.getHairSalon(Number(userId)).then((res) => {
          setSalonDetails(res.data.data);
          setSalon(res.data.data);
      });
  }, []);

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
            <div className="relative w-full flex flex-col items-center justify-center lg:mt-0 mt-10">
              {!isClientDashboard && <p className="text-xl font-bold mb-5">{activeSalon?.name ? activeSalon.name : '-'}</p>}
              <ProfileImageBorderIcon />
              <img
                src="/assets/user_img.png"
                width={104}
                height={104}
                alt="profile"
                className={`rounded-full absolute left-[100px] ${isClientDashboard ? 'top-5' : 'top-[68px]'}`}
              />
             {!isClientDashboard && <p className="text-lg font-medium mt-2.5">Daniel j.</p>}
            </div>
            <div className="mt-8">
              {sidebarItems.map((item, index) => {
                return (
                  <div key={index}>
                    <div
                      onClick={() => onSelectItem(item.route,index)}
                      className={
                        `flex items-center my-2 pl-8 py-4 gap-4 cursor-pointer text-primary transition ease-in-out duration-100 border-l-4 
                        ${ path === item.route && "border-secondary bg-gradient-to-r from-pink-300 via-red-200 to-transparent" }`}
                    >
                      <div className="relative">
                        {setIcon(
                          item.icon,
                          path === item.route ? item.icon : ""
                        )}
                       {item.title === 'Message' &&<p className="absolute top-3 -right-2.5 flex items-center justify-center w-4 h-4 rounded-full bg-[#F44336] text-white text-[10px] font-semibold">2</p>}
                      </div>
                      <p
                        className={`text-base ${
                          path === item.route && "text-secondary"
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
