import React, { useState, useEffect } from "react";
import {
  HelpIcon,
  DashboardIcon,
  MessageIcon,
  UserIcon,
  StarGreyIcon,
  PortraitIcon,
  FilterIcon,
  ReservationIcon,
  HistoryIcon,
  LogoutIcon,
  CabineIcon,
}
  from "../utilis/Icons";
import { useRouter } from "next/navigation";
import { Auth } from "@/api/auth";
import { removeFromLocalStorage } from "@/api/storage";
import userLoader from '@/hooks/useLoader';
import { ColorsThemeA, Theme_A } from "../utilis/Themes";

interface UserProfileProfile {
  isDashboard?: Boolean
}
const UserProfile = ({ isDashboard }: UserProfileProfile) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const router = useRouter();
  const dropdownRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const { loadingView } = userLoader();
  const [isLoading, setIsLoading] = useState(false);

  /* TODO ADD USER SHORTCUT MENU HERE */
  const dropdownItems = [
    {
      name: "Compte",
      icon: <DashboardIcon width="18" height="18" color="#000000" />,
      route: "/client/dashboard",
    },
    {
      name: "Messages",
      icon: <MessageIcon width="18" height="18" color="#000000" />,
      route: "/client/messages",
    },
    {
      name: "Favoris",
      icon: <StarGreyIcon width="18" height="18" color="#FFFFFF" />,
      route: "/client/favorites",
    },
    {
      name: "Portrait",
      icon: <PortraitIcon width="18" height="18" color="#000000" />,
      route: "/client/portrait",
    },
    {
      name: "Cabine d'essayage",
      icon: <CabineIcon width="36" height="36" color="#000000" />,
      route: "/client/processed",
    },
    {
      name: "Filtre",
      icon: <FilterIcon width="18" height="18" color="#000000" />,
      route: "/client/filters",
    },
    {
      name: "Reservation",
      icon: <ReservationIcon width="18" height="18" color="#000000" />,
      route: "/client/currentreservation",
    },
    {
      name: "Historique",
      icon: <HistoryIcon width="18" height="18" color="#000000" />,
      route: "/client/history",
    },
    {
      name: "Aide",
      icon: <HelpIcon width="20" height="20" color="#000000" />,
      route: "/client/help"
    },
  ];


  const onDropdownItemClick = (route: string) => {
    if (route) {
      router.push(route);
    }
  };
  const onLogout = () => {
    setIsLoading(true);
    Auth.logout()
      .then((response) => {
        removeFromLocalStorage("auth-token");
        removeFromLocalStorage("user");
        router.push("/login");
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      })
  };
  const closeSelectBox = ({ target }: MouseEvent): void => {
    if (!dropdownRef.current?.contains(target as Node)) {
      setIsDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", closeSelectBox);

    return () => {
      document.removeEventListener("click", closeSelectBox);
    };
  }, []);
  return (
    <div ref={dropdownRef} className="relative">
      {isLoading && loadingView()}
      <div
        className={`w-12 h-12 flex items-center justify-center pb-1 ${ColorsThemeA.ohcBorder} hover:shadow-md rounded-full cursor-pointer transition-transform duration-300 transform hover:scale-110`}
        onClick={() => setIsDropdown(!isDropdown)}
      >
        <UserIcon />
      </div>
      {isDropdown && (
        <div className={`absolute top-[52px] right-0 z-20 pt-3 pb-2 flex flex-col items-center justify-center text-black bg-white shadow-[6px_4px_25px_6px_rgba(176,176,176,0.25)] ${!isDashboard ? 'rounded-lg' : 'rounded-xl'}`}>
          {!isDashboard &&
            <div className="flex flex-col gap-x-4 border-b w-44 border-[#D4CBCB] pb-3">
              {dropdownItems.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => onDropdownItemClick(item.route)}
                    className="flex gap-x-5 px-6 py-3 hover:bg-[#f5f5f5] cursor-pointer"
                  >
                    {item.icon}
                    <p>{item.name}</p>
                  </div>
                );
              })}
            </div>
          }
          <div
            onClick={onLogout}
            className={`w-full flex flex-row items-center justify-center hover:bg-[#F5F5F5] cursor-pointer gap-4 ${!isDashboard ? 'mt-2 px-6 py-3' : 'px-6 pt-1 pb-2'}`}
          >
            <LogoutIcon width='25' height='25' />
            <p>Déconnexion</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
