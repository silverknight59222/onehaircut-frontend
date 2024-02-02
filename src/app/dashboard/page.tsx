"use client";
import React, { useEffect, useState } from "react";
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
import { dashboard } from "@/api/dashboard";
import { getLocalStorage, setLocalStorage } from "@/api/storage";

const Page = () => {
	const user = getLocalStorage('user');
	const user_data = user ? JSON.parse(user) : null;
	const [notifications, setNotifications] = useState({} as any);
	const [isSidebar, setIsSidebar] = useState(true);
	const [tab, setTab] = useState("Dashboard");
	const [sidebarItems, setSidebarItems] = useState([
		{ icon: "DashboardIcon", title: "Dashboard", route: "/dashboard" },
		// { icon: "ClientActivityIcon", title: "Client Activité", route: "/dashboard/client-activity" },
		// { icon: "StatsIcon", title: "Visites / Stats", route: "/dashboard/visites" },
		// { icon: "RevenueIcon", title: "Revenue", route:"/dashboard/revenue" },
		{ icon: "MessageIcon", title: "Message", route: "/dashboard/messages" },
		{ icon: "SettingsIcon", title: "Réglages", permission: "Reglages", route: "/dashboard/settings" },
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
		const { data } = await dashboard.salonNotification()
		setNotifications(data)
	}

	const getStatusSubscription = () => {
		// Update sidebarItems based on user subscription
		const isProSubscription = user_data ? user_data.subscription.name.includes("Pro") : false;

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
		fetchSalonNotifications()
		getStatusSubscription()
	}
		, []
	)

	return (
		<>
			{tab === "Dashboard" && (
				<Sidebar notifications={notifications} sidebarItems={sidebarItems} isSidebar={isSidebar} SidebarHandler={SidebarHandler} />
			)}
			<div className={`h-screen px-4 lg:px-8 py-5 overflow-x-hidden ${tab === "Dashboard" && `${ColorsThemeA.pageBgColorLight} ml-0 lg:ml-72`}`}>
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
