import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import React, { useState } from "react";

interface DashboardLayout {
  children: JSX.Element;
}

const DashboardLayout = ({ children }: DashboardLayout) => {
  const [isSidebar, setIsSidebar] = useState(true);
  const [tab, setTab] = useState("Dashboard");
  const sidebarItems = [
    { icon: "DashboardIcon", title: "Dashboard", route: "/dashboard" },
    { icon: "ClientActivityIcon", title: "Client Activité", route: "/client-activity" },
    { icon: "StatsIcon", title: "Visites / Stats", route: "/visites" },
    { icon: "RevenueIcon", title: "Revenue", route: "/revenue" },
    { icon: "MessageIcon", title: "Message", route: "/messages" },
    { icon: "SettingsIcon", title: "Réglages", route: "/settings" },
    { icon: "PersonalizationIcon", title: "Abonnement", route: "/subscription" },
    { icon: "BoostIcon", title: "Boost", route: "" },
    { icon: "BotIcon", title: "OnehairBot", route: "/bot" },
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
				        <div>
            {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
