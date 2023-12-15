import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import React, { useState, useEffect } from "react";
import { dashboard } from "@/api/dashboard";
import { getLocalStorage } from "@/api/storage";

interface NotificationsParams{
  chat_count : number, reservation_count : number
}

interface DashboardLayout {
  children: JSX.Element;
  notifications: NotificationsParams
}

const DashboardLayout = ({ children, notifications }: DashboardLayout) => {
  const [isSidebar, setIsSidebar] = useState(true);
  const [tab, setTab] = useState("Dashboard");
  const sidebarItems = [
    { icon: "DashboardIcon", title: "Dashboard", route: "/dashboard" },
    { icon: "ClientActivityIcon", title: "Client Activité", route: "/dashboard/client-activity" },
    { icon: "StatsIcon", title: "Visites / Stats", route: "/dashboard/visites" },
    // { icon: "RevenueIcon", title: "Revenue", route:"/dashboard/revenue" },
    { icon: "MessageIcon", title: "Message", route: "/dashboard/messages" },
    { icon: "SettingsIcon", title: "Réglages", permission: "Reglages", route: "/dashboard/settings" },
    { icon: "PersonalizationIcon", title: "Abonnement", route: "/dashboard/subscription" },
    // { icon: "BoostIcon", title: "Boost", route: "" },
    { icon: "BotIcon", title: "OnehairBot", permission: "Onehairbot", route: "/dashboard/bot" },
    { icon: "ContactIcon", title: "Contactez-nous", route: "/dashboard/contactUs" },
  ];
  const SidebarHandler = () => {
    setIsSidebar(!isSidebar);
  };
  const tabHandler = (name: string) => {
    setTab(name);
  };

  return (
    <div>
      <Sidebar
        notifications={notifications}
        sidebarItems={sidebarItems}
        isSidebar={isSidebar}
        SidebarHandler={SidebarHandler}
      />
      <div
        className={`h-screen px-4 lg:px-8 py-5 overflow-x-hidden bg-[#F4F4F6] ml-0 lg:ml-72`}
      >
        <Topbar
          isDashboard={tab !== "Dashboard"}
          SidebarHandler={SidebarHandler}
          tabHandler={tabHandler}
        />
        <div className="mt-12 px-4 lg:px-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
