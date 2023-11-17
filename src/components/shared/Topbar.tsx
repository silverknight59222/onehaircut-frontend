"use client";
import React, { useEffect, useState } from "react";
import {
	BellIcon,
	Hamburger,
	HamburgerIcon,
	LogoIcon,
	UserIcon,
} from "../utilis/Icons";
import { SalonDetails } from "@/types";
import { getLocalStorage, setLocalStorage } from "@/api/storage";
import { dashboard } from "@/api/dashboard";
import { usePathname } from "next/navigation";
import UserProfile from "../UI/UserProfile";
import { Theme_A } from "../utilis/Themes";

export type TopbarType = {
	isDashboard: Boolean;
	tabHandler: (tab: string) => void;
	SidebarHandler: () => void;
};
const applyPermissions = (menus: any) => {
    const temp = localStorage.getItem("user");
    const user = temp ? JSON.parse(temp) : null;
    if (user.role != 'salon_professional' && user.permissions.length > 0) {
      menus.forEach((m: any, k: number) => {
        if (user.permissions.indexOf(m.title) == -1) {
          delete menus[k];
        }
      });
    }
  }
const Topbar = ({ isDashboard, tabHandler, SidebarHandler }: TopbarType) => {
	const [salonDetail, setSalonDetails] = useState<SalonDetails[]>();
	const [activeSalon, setActiveSalon] = useState<SalonDetails>();
	const temp = getLocalStorage("user");
    const user = temp ? JSON.parse(temp) : null;
	const path=usePathname()
	const topbarItems = [
		{ title: "Dashboard", permission: "Dashboard"},
		{ title: "Coiffeurs", permission: "Coiffeurs"},
		{ title: "Images Salon", permission: "Image du Salon"},
		{ title: "Coiffures", permission: "Coifures"},
		{ title: "Prestation", permission: "Prestation"},
		{ title: "Agenda", permission: "Agenda"},
		{ title: "Ajouter un salon partenaire", permission: "Ajouter un salon partenaire"},
	];
	const [selectedItem, setSelectedItem] = useState(0);
	const onTabClick = (tab: string, index: number) => {
		setSelectedItem(index);
		tabHandler(tab);
	};
	const setSalon = (salonList: SalonDetails[]) => {
		salonList.forEach(salon => {
			if (salon.is_primary) {
				setActiveSalon(salon);
        		if(getLocalStorage('salon_id')) {
					setLocalStorage('salon_id', salon.id);
				}
			}
		});
	};

	useEffect(() => {
		// applyPermissions(topbarItems);
		const user = getLocalStorage("user");
		const userId = user ? Number(JSON.parse(user).id) : null;
		if (userId) 
			dashboard.getHairSalon(userId).then((res) => {
				setSalonDetails(res.data.data);
				setSalon(res.data.data);
			});
	}, []);

	return (
		<div>
			<div className="flex items-center justify-center">
				<div className="w-full flex items-center gap-5">
					<div className="lg:hidden" onClick={SidebarHandler}>
						<HamburgerIcon />
					</div>
					{isDashboard && (
						<div className="hidden lg:block">
							<LogoIcon />
						</div>
					)}
				</div>
				{isDashboard && (
					<div className="hidden lg:block w-full text-center text-black font-bold text-4xl">
						{activeSalon?.name ? activeSalon.name : "-"}
					</div>
				)}
				<div className="w-full flex items-center justify-end gap-4">
					{/* <div className="cursor-pointer">
						<BellIcon />
					</div>
					<div className="cursor-pointer">
						<Hamburger />
					</div> */}
					<UserProfile isDashboard={true}/>
				</div>
			</div>
			{path === '/dashboard' &&
			<div className="flex items-center justify-center gap-4 flex-wrap mt-12 mb-7">
				{topbarItems.filter((item) => {
					if (user.permissions.length == 0) {
						return true
					}
					
					return user.permissions.indexOf(item.permission) != -1
				}).map((item, index) => {
					return (
						<div key={index} onClick={() => onTabClick(item.title, index)}>
							<p
								className={`${Theme_A.Bars.proTopBar.standardShape} ${selectedItem === index
										? `${Theme_A.Bars.proTopBar.activatedColor}`
										: `${Theme_A.Bars.proTopBar.inactivatedColor}`
									}`}
							>
								{item.title}
							</p>
						</div>
					);
				})}
			</div>}
		</div>
	);
};

export default Topbar;
