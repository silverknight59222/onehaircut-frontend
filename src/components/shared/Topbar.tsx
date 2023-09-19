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
export type TopbarType = {
	isDashboard: Boolean;
	tabHandler: (tab: string) => void;
	SidebarHandler: () => void;
};

const Topbar = ({ isDashboard, tabHandler, SidebarHandler }: TopbarType) => {
	const [salonDetail, setSalonDetails] = useState<SalonDetails[]>();
	const [activeSalon, setActiveSalon] = useState<SalonDetails>();
	const path=usePathname()
	const topbarItems = [
		"Dashboard",
		"Coiffeurs",
		"Images Salon",
		"Coiffures",
		"Prestation",
		"Agenda",
		"Ajouter un salon partenaire",
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
					<div className="cursor-pointer">
						<BellIcon />
					</div>
					<div className="cursor-pointer">
						<Hamburger />
					</div>
					<div className="w-9 h-9 flex items-center justify-center pb-1  border-2 border-secondary rounded-full cursor-pointer">
						<UserIcon />
					</div>
				</div>
			</div>
			{path === '/dashboard' &&
			<div className="flex items-center justify-center gap-4 flex-wrap mt-12 mb-7">
				{topbarItems.map((item, index) => {
					return (
						<div key={index} onClick={() => onTabClick(item, index)}>
							<p
								className={`w-full flex items-center justify-center text-base font-medium cursor-pointer rounded-xl px-5 h-11 hover:border-secondary hover:bg-gradient-to-b from-pink-100 to-transparent ${selectedItem === index
										? "border border-red-600 bg-gradient-to-b from-pink-100 to-transparent"
										: "border border-primary"
									}`}
							>
								{item}
							</p>
						</div>
					);
				})}
			</div>}
		</div>
	);
};

export default Topbar;
