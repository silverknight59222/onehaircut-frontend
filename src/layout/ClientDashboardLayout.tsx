import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import Sidebar from "@/components/shared/Sidebar";
import {
  CircleRight,
  Hamburger,
  HamburgerIcon,
  LogoIcon,
  UserIcon,
  StarGreyIcon,
  FilterIcon,
} from "@/components/utilis/Icons";
import { request } from "../api/Request";
import { removeFromLocalStorage } from "@/api/storage";
import { Auth } from "@/api/auth";
import userLoader from '@/hooks/useLoader';

interface DashboardLayout {
  children: JSX.Element,
}


const ClientDashboardLayout = ({ children }: DashboardLayout) => {
  const router = useRouter()
  const [isSidebar, setIsSidebar] = useState(true);
  const sidebarItems = [
    { icon: "DashboardIcon", title: "Compte", route: "/client/dashboard" },
    { icon: "MessageIcon", title: "Message", route: "/client/messages" },
    { icon: "StarGreyIcon", title: "Favoris", route: "/client/favorites" },
    { icon: "PortraitIcon", title: "Portrait", route: "/client/portrait" },
    //TODO MODIFY MESSAGEICON VY FILTER ICON
    { icon: "MessageIcon", title: "Filtres", route: "/client/filters" },
    { icon: "ReservationIcon", title: "Réservations en cours", route: "/client/currentreservation" },
    { icon: "HistoryIcon", title: "Historique", route: "/client/history" },
    { icon: "HelpIcon", title: "Aide", route: "" },
  ];
  const SidebarHandler = () => {
    setIsSidebar(!isSidebar);
  };

  const { loadingView } = userLoader();

  // FOr the dropdown menu on userIcon
  const [isUserDropDwn, setIsUserDropDwn] = useState(false);

  const dropdownItems = [
    {
      name: "Déconnextion",
      icon: <StarGreyIcon width="18" height="18" />,
      route: "/client/dashboard",
    },
  ]


  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div>
      {isLoading && loadingView()}
      <Sidebar
        sidebarItems={sidebarItems}
        isSidebar={isSidebar}
        SidebarHandler={SidebarHandler}
        isClientDashboard={true}
      />
      <div className="ml-0 lg:ml-72">
        {/* topbar */}
        <div className="px-8 py-5 border-b border-[#EBF0F2]">
          <div className="flex items-center justify-between">
            <div className="w-full flex items-center gap-3">
              {!isSidebar &&
                <div className="" onClick={SidebarHandler}>
                  <HamburgerIcon />
                </div>
              }
              <div className="w-full hidden lg:block">
                <div className='flex items-center justify-center cursor-pointer' onClick={() => router.push('/')}>
                  <LogoIcon />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-4">

              <div className="w-14 h-14 flex items-center justify-center pb-1 border-2 border-secondary rounded-full cursor-pointer"
                onClick={() => setIsUserDropDwn(!isUserDropDwn)}>
                <UserIcon />
              </div>
            </div>
          </div>
          {isUserDropDwn && (
            <div className={`absolute top-[58px] right-0 z-20 pt-3 pb-2 flex flex-col items-center justify-center text-black bg-white shadow-[6px_4px_25px_6px_rgba(176,176,176,0.25)] rounded-lg`}>
              <div className="flex flex-col gap-x-4 border-b w-44 border-[#D4CBCB] pb-3">
                {dropdownItems.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => onLogout()}
                      className="flex gap-x-5 px-6 py-3 hover:bg-[#F5F5F5] cursor-pointer"
                    >
                      {item.icon}
                      <p>{item.name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ClientDashboardLayout