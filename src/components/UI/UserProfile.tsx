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
      name: "Filtres",
      icon: <FilterIcon width="18" height="18" color="#000000" />,
      route: "/client/filters",
    },
    {
      name: "Reservations",
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
        localStorage.clear();
        router.push("/");
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

  // for Icon size change:
  const [screenSize, setScreenSize] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    // Initial screen size check
    handleResize();

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      {isLoading && loadingView()}
      <div
        id="UserIcon"
        className={`w-10 lg:w-12 h-10 lg:h-12 flex items-center justify-center pb-1 ${ColorsThemeA.ohcBorder} hover:shadow-md rounded-full cursor-pointer transition-transform duration-300 transform hover:scale-110`}
        onClick={() => setIsDropdown(!isDropdown)}
      >
        <UserIcon size={screenSize}/>
      </div>
      {isDropdown && (
        <div
          className={`absolute z-50 top-[52px] right-0 pt-3 pb-2 flex flex-col items-center justify-center text-black border-2 border-stone-300 bg-white shadow-[6px_4px_25px_6px_rgba(176,176,176,0.25)] ${!isDashboard ? 'rounded-lg' : 'rounded-xl'}`}>
          {!isDashboard &&
            <div className="flex flex-col gap-x-4 border-b w-48 border-[#D4CBCB] pb-3">
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
            id="Deconnexion"
            className={`w-full flex flex-row items-center justify-center hover:bg-[#F5F5F5] cursor-pointer gap-4  ${!isDashboard ? 'mt-2 px-6 py-3' : 'px-6 pt-1 pb-2'}`}
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
