"use client";

import Sidebar from "@/components/shared/Sidebar";
import Topbar from "@/components/shared/Topbar";
import React, { useState, useEffect } from "react";
import { getLocalStorage } from "@/api/storage";
import { useNotification } from "@/hooks/useNotification";
import { usePathname } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebar, setIsSidebar] = useState(false);
  const [tab, setTab] = useState("Dashboard");
  const user = getLocalStorage("user");
  const user_data = user ? JSON.parse(user) : null;
  const [showWarningForBankAccount, setShowWarningForBankAccount] =
    useState<boolean>(!user_data?.bank_acc_stripe_id);
  const [sidebarItems, setSidebarItems] = useState([
    {
      icon: "DashboardIcon",
      title: "Dashboard",
      permission: "Dashboard",
      route: "/dashboard",
    },
    // { icon: "ClientActivityIcon", title: "Client Activité", route: "/dashboard/client-activity" },
    // { icon: "StatsIcon", title: "Visites / Stats", route: "/dashboard/visites" },
    // { icon: "RevenueIcon", title: "Revenue", route:"/dashboard/revenue" },
    {
      icon: "MessageIcon",
      title: "Message",
      permission: "Message",
      route: "/dashboard/messages",
    },
    {
      icon: "SettingsIcon",
      title: "Réglages",
      permission: null,
      route: "/dashboard/settings",
      showWarning: showWarningForBankAccount,
    },
    {
      icon: "PersonalizationIcon",
      title: "Abonnement",
      permission: "Abonnement",
      route: "/dashboard/subscription",
    },
    // { icon: "BoostIcon", title: "Boost", route: "" },
    // { icon: "BotIcon", title: "OnehairBot", permission: "Onehairbot", route: "/dashboard/bot" },
    {
      icon: "ContactIcon",
      title: "Contactez-nous",
      permission: null,
      route: "/dashboard/contactUs",
    },
  ]);

  const getStatusSubscription = () => {
    // Update sidebarItems based on user subscription
    const isProSubscription = user_data
      ? user_data.subscription?.name?.includes("Pro")
      : false;

    setSidebarItems((prevSidebarItems) => {
      // Create a new array with the existing items
      let updatedSidebarItems = [...prevSidebarItems];

      if (isProSubscription) {
        updatedSidebarItems.splice(4, 0, {
          icon: "BotIcon",
          title: "OnehairBot",
          permission: "Onehairbot",
          route: "/dashboard/bot",
        });
      }
      // Return the updated array
      return updatedSidebarItems;
    });
  };

  const pathname = usePathname();
  const { notifications, refetchSalonNotifications } = useNotification();

  useEffect(() => {
    refetchSalonNotifications();
  }, [pathname]);

  useEffect(() => {
    getStatusSubscription();
    refetchSalonNotifications();
  }, []);

  const SidebarHandler = (state: boolean) => {
    setIsSidebar(state);
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
      <div className="ml-0 lg:ml-72">
        <div className="px-8 py-2 lg:py-5">
          <Topbar
            isDashboard={tab !== "Dashboard"}
            SidebarHandler={SidebarHandler}
            tabHandler={tabHandler}
            isSidebar={isSidebar}
          />
        </div>
        <div className="px-1 md:px-4 lg:px-6 w-full h-full">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
