import React, { useState } from 'react'
import Sidebar from "@/components/shared/Sidebar";
import {
  CircleRight,
  Hamburger,
  HamburgerIcon,
  HeartIcon,
  LogoIcon,
  UserIcon,
} from "@/components/utilis/Icons";

interface DashboardLayout {
  children: JSX.Element,
}


const ClientDashboardLayout = ({ children }: DashboardLayout) => {
  const [isSidebar, setIsSidebar] = useState(true);
  const sidebarItems = [
    { icon: "DashboardIcon", title: "Compte", route: "/client/dashboard" },
    { icon: "MessageIcon", title: "Message", route: "/client/messages" },
    { icon: "HeartIcon", title: "Favoris", route: "/client/favorites" },
    { icon: "PortraitIcon", title: "Portrait", route: "/client/portrait" },
    { icon: "MessageIcon", title: "Filtres", route: "/client/filters" },
    { icon: "ReservationIcon", title: "Réservations en cours", route: "/client/reservation" },
    { icon: "HistoryIcon", title: "Historique", route: "/client/history" },
    { icon: "HelpIcon", title: "Aide", route: "" },
  ];
  const SidebarHandler = () => {
    setIsSidebar(!isSidebar);
  };
  return (
    <div>
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
              <div className="lg:hidden" onClick={SidebarHandler}>
                <HamburgerIcon />
              </div>
              <div className="w-full hidden lg:block">
                <div className='flex items-center justify-center'>
                  <LogoIcon />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-4">
              <div className="cursor-pointer">
                <HeartIcon color="#000" />
              </div>
              <div className="cursor-pointer">
                <Hamburger />
              </div>
              <div className="w-14 h-14 flex items-center justify-center pb-1 border-2 border-secondary rounded-full cursor-pointer">
                <UserIcon />
              </div>
            </div>
          </div>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ClientDashboardLayout