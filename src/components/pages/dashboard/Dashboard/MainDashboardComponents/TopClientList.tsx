import DropdownMenu from "@/components/UI/DropDownMenu";
import {ColorsThemeA} from "@/components/utilis/Themes";
import Image from "next/image";
import React, {useMemo, useState} from "react";
import {activityClientData, clientTableData} from "@/data/dashboardData";
import DialogShareProject from "@/views/pages/dialog-examples/DialogShareProject";
import DynamicClientTable from "@/views/datatable/DynamicClientTable";

const TopClientList = () => {
    const Month = [
        "January",
        "February",]

    const data = useMemo(() => clientTableData, []);

    const toggleModal = (modal: ModalName) => {
        setModals(prev => ({ ...prev, [modal]: !prev[modal] }));
    };

    type ModalName = 'fullTable' | 'rate' | 'clientActivity' | 'staff'; // Add more modal keys as needed

    const [modals, setModals] = useState<{ [key in ModalName]?: boolean }>({
        fullTable: false,
        rate: false,
        clientActivity: false,
        staff: false,
        // ... initialize other modals as needed
    });

    const headers = ["Utilisateur", "Date dernière commande", "Visites", "Commandes",
        "Dernière commande", "Details dernière commande", "Status dernière commande", "Total payé"];

    return (
        <div>
                <p   className="text-primary text-2xl font-semibold">Client Activity</p>

                <div className="relative overflow-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-grey text-sm font-semibold mb-9">
                        <tr>
                            <th scope="col" className="pr-4 py-3">
                                Utilisateur
                            </th>
                            <th scope="col" className="pr-4 pl-20 py-3 text-center">
                                coiffure préférée
                            </th>
                            <th scope="col" className="px-4 py-3 text-center">
                                Commandes
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {activityClientData.map((item, index) => {

                            return <tr key={index} className="text-black border-b-2 border-[#F4F4F6] pb-2">
                                <th scope="row" className="pr-6 py-4 flex items-center gap-4">
                                    <img
                                        src="/assets/user_img.png"
                                        alt=""
                                        width={60}
                                        height={60}
                                        className="rounded-full"
                                    />
                                    {item.user}
                                </th>
                                <th className="px-4 py-4 text-center">{item.Date} </th>
                                <th className="px-4 py-4 text-center">{item.Status}</th>

                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
        </div>
    )
}

export default TopClientList

