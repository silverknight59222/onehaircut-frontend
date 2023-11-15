"use client";
import React, { useState } from "react";
import Topbar from "@/components/shared/Topbar";
import Sidebar from "@/components/shared/Sidebar";
import Dashboard from '@/components/pages/dashboard/Dashboard'
import Hairdressers from '@/components/pages/dashboard/Dashboard/Hairdressers'
import ImagesSalon from '@/components/pages/dashboard/Dashboard/ImagesSalon'
import Hairstyles from '@/components/pages/dashboard/Dashboard/Hairstyles'
import Services from '@/components/pages/dashboard/Dashboard/Services'
import AddPartner from '@/components/pages/dashboard/Dashboard/AddPartner'
import { ColorsThemeA } from "@/components/utilis/Themes";
import { Agenda } from "@/components/pages/dashboard/Dashboard/Agenda";
import UsersPage from "@/components/pages/dashboard/Dashboard/Users";

const Page = () => {
	const [isSidebar, setIsSidebar] = useState(true);
	const [tab, setTab] = useState("Dashboard");
	const sidebarItems = [
		{ icon: "DashboardIcon", title: "Dashboard", route: "/dashboard" },
		{ icon: "ClientActivityIcon", title: "Client Activité", route: "/dashboard/client-activity" },
		{ icon: "StatsIcon", title: "Visites / Stats", route: "/dashboard/visites" },
		// { icon: "RevenueIcon", title: "Revenue", route:"/dashboard/revenue" },
		{ icon: "MessageIcon", title: "Message", route: "/dashboard/messages" },
		{ icon: "SettingsIcon", title: "Réglages", route: "/dashboard/settings" },
		{ icon: "PersonalizationIcon", title: "Abonnement", route: "/dashboard/subscription" },
		// { icon: "BoostIcon", title: "Boost", route: "" },
		{ icon: "BotIcon", title: "OnehairBot", route: "/dashboard/bot" },
		{ icon: "ContactIcon", title: "Contactez-nous", route: "/dashboard/contactUs" },
	];
	const SidebarHandler = () => {
		setIsSidebar(!isSidebar);
	};
	const tabHandler = (name: string) => {
		setTab(name);
	};

	return (
		<>
			{tab === "Dashboard" && (
				<Sidebar sidebarItems={sidebarItems} isSidebar={isSidebar} SidebarHandler={SidebarHandler} />
			)}
			<div className={`h-screen px-4 lg:px-8 py-5 overflow-x-hidden ${tab === "Dashboard" && `${ColorsThemeA.pageBgColorLight} ml-0 lg:ml-72`}`}>
				<Topbar
					isDashboard={tab !== "Dashboard"}
					SidebarHandler={SidebarHandler}
					tabHandler={tabHandler}
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
