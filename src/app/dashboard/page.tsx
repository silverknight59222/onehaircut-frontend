"use client"
import React, { Component, ComponentType, useEffect, useState } from "react";
import dynamic, { Loader } from "next/dynamic";
import Topbar from "@/components/shared/Topbar";
import Sidebar from "@/components/shared/Sidebar";
import { ColorsThemeA } from "@/components/utilis/Themes";
import { dashboard } from "@/api/dashboard";
import { getLocalStorage } from "@/api/storage";

const Dashboard = dynamic(() => import('@/components/pages/dashboard/Dashboard'), {
  ssr: false, // Disable server-side rendering for this component
});

const Hairdressers = dynamic(() => import('@/components/pages/dashboard/Dashboard/Hairdressers'), {
  ssr: false,
});

const ImagesSalon = dynamic(() => import('@/components/pages/dashboard/Dashboard/ImagesSalon'), {
  ssr: false,
});

const Hairstyles = dynamic(() => import('@/components/pages/dashboard/Dashboard/Hairstyles'), {
  ssr: false,
});

const Services = dynamic(() => import('@/components/pages/dashboard/Dashboard/Services'), {
  ssr: false,
});

const AddPartner = dynamic(() => import('@/components/pages/dashboard/Dashboard/AddPartner'), {
  ssr: false,
});

const Agenda = dynamic(() => import('@/components/pages/dashboard/Dashboard/Agenda'), {
	ssr: false,
});

const UsersPage = dynamic(() => import('@/components/pages/dashboard/Dashboard/Users'), {
  ssr: false,
});

const Page = () => {
  const user = getLocalStorage('user');
  const user_data = user ? JSON.parse(user) : null;
  const [notifications, setNotifications] = useState({} as any);
  const [isSidebar, setIsSidebar] = useState(true);
  const [tab, setTab] = useState("Dashboard");
  const [showWarningForBankAccount, setShowWarningForBankAccount] = useState<boolean>(!user_data?.bank_acc_stripe_id)


  const [sidebarItems, setSidebarItems] = useState([
    { icon: "DashboardIcon", title: "Dashboard", route: "/dashboard" },
    // { icon: "ClientActivityIcon", title: "Client Activité", route: "/dashboard/client-activity" },
    // { icon: "StatsIcon", title: "Visites / Stats", route: "/dashboard/visites" },
    // { icon: "RevenueIcon", title: "Revenue", route:"/dashboard/revenue" },
    { icon: "MessageIcon", title: "Message", route: "/dashboard/messages" },
    { icon: "SettingsIcon", title: "Réglages", permission: "Reglages", route: "/dashboard/settings", showWarning: showWarningForBankAccount },
    { icon: "PersonalizationIcon", title: "Abonnement", route: "/dashboard/subscription" },
    // { icon: "BoostIcon", title: "Boost", route: "" },
    // { icon: "BotIcon", title: "OnehairBot", permission: "Onehairbot", route: "/dashboard/bot" },
    { icon: "ContactIcon", title: "Contactez-nous", route: "/dashboard/contactUs" },
  ]);

  const SidebarHandler = () => {
    setIsSidebar(!isSidebar);
  };

  const tabHandler = (name: string) => {
    setTab(name);
  };

  const fetchSalonNotifications = async () => {
    const { data } = await dashboard.salonNotification();
    setNotifications(data);
  };

  const getStatusSubscription = () => {
    // Update sidebarItems based on user subscription
    const isProSubscription = user_data ? user_data.subscription?.name?.includes("Pro") : false;

    setSidebarItems((prevSidebarItems) => {
      // Create a new array with the existing items
      let updatedSidebarItems = [...prevSidebarItems];

      if (isProSubscription) {
        updatedSidebarItems.splice(4, 0, { icon: "BotIcon", title: "OnehairBot", route: "/dashboard/bot" });
      }

      // Return the updated array
      return updatedSidebarItems;
    });
  };

  useEffect(() => {
    fetchSalonNotifications();
    getStatusSubscription();
  }, []);

  return (
    <>
      {tab === "Dashboard" && (
        <Sidebar notifications={notifications} sidebarItems={sidebarItems} isSidebar={isSidebar}
                 SidebarHandler={SidebarHandler}/>
      )}
      <div
        className={`h-screen px-4 lg:px-8 py-5 overflow-x-hidden ${tab === "Dashboard" && `${ColorsThemeA.pageBgColorLight} ml-0 lg:ml-72`}`}>
        <Topbar
          isDashboard={tab !== "Dashboard"}
          SidebarHandler={SidebarHandler}
          tabHandler={tabHandler}
          isSidebar={isSidebar}
        />
        {tab === 'Dashboard' && <Dashboard />}
        {tab === 'Coiffeurs' && <Hairdressers />}
        {tab === 'Images Salon' && <ImagesSalon />}
        {tab === 'Coiffures' && <Hairstyles />}
        {tab === 'Prestation' && <Services />}
        {tab === 'Agenda' && <Agenda />}
        {tab === 'Ajouter un salon partenaire' && <AddPartner />}
        {tab === 'Users' && <UsersPage />}
      </div>
    </>
  );
};

export default Page;
