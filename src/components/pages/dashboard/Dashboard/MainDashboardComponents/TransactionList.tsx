import { dashboard } from "@/api/dashboard";
import DropdownMenu from "@/components/UI/DropDownMenu";

import { ColorsThemeA } from "@/components/utilis/Themes";
import { Pagination } from "@mui/material";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const TransactionList = (period) => {


    const [data, setData] = useState({} as any);

    const fetchData = async (periodKey, page = 1) => {
        const { data } = await dashboard.salonTransactionList(periodKey, page)
        //console.log(data.data)
        setData(data.data)
    }

    useEffect(() => {
        let periodKey = "month"
        //console.log(period)
        switch (period) {
            case "Ce mois":
                periodKey = "month"
                break;
            case "3 derniers mois":
                periodKey = "3_month"
                break;
            case "Cette année":
                periodKey = "year"
                break;
        }
        fetchData(periodKey)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [period])

    return (
        <div>
            <div className="pt-7 pb-4 px-6 bg-white rounded-lg shadow-sm shadow-stone-600">
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-[#727272] whitespace-nowrap text-center uppercase bg-[rgba(255, 190, 148, 0.49)]" style={{ background: "rgba(255, 190, 148, 0.9)" }}>
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 border-x border-[#E4E7EB]"
                                >
                                    Client
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 border-r border-[#E4E7EB]"
                                >
                                    Commande
                                </th>
                                <th scope="col" className="px-10 py-3">
                                    Prix
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 border-x border-[#E4E7EB]"
                                >
                                    Moyen de paiement
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data != null && data.data != null && data.data.map((transaction, index) => {
                                let statusClass = '';
                                switch (transaction.payment_status) {
                                    case 'En vérification':
                                        statusClass = 'text-yellow-500 font-semibold';
                                        break;
                                    case 'Encaissé':
                                        statusClass = 'text-green-600 font-semibold';
                                        break;
                                    default:
                                        statusClass = 'text-gray-600'; // Default color for any other status
                                        break;
                                }

                                return (
                                    <tr
                                        key={index}
                                        className="text-[#636363] bg-white border-b text-center hover:bg-gray-100"
                                    >
                                        <td scope="row" className="px-6 py-4">
                                            {transaction.redable_date}
                                        </td>
                                        <td className="px-6 py-4 border-x border-[#E4E7EB]">
                                            {transaction.user_info.name}
                                        </td>
                                        <td className="px-6 py-4 border-r border-[#E4E7EB] text-left">
                                            {transaction.items.map((item, index) => {
                                                        return (
                                                            <ul key={index}>
                                                                <li >
                                                                    <b>{item.type}:</b> {item.name}
                                                                </li>
                                                            </ul>
                                                        )
                                                    }
                                                )
                                            }
                                        </td>
                                        <td className="px-10 py-4">{transaction.total_amount}</td>
                                        <td className="px-6 py-4 border-x border-[#E4E7EB]">
                                            {transaction.payment_type}
                                        </td>
                                        <td className={`px-6 py-4 ${statusClass}`}>{transaction.payment_status}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    
                </div>
                {data != null && data.data != null && 
                    <Pagination  onChange={(event, value) => {fetchData(period, value)}}  count={data.last_page} page={data.current_page} />
                }

                <div className="flex items-center gap-2 mt-3">
                    <Image
                        src="/assets/downloadIcon.png"
                        alt=""
                        width={32}
                        height={25}
                        className="cursor-pointer"
                    />
                    <Image
                        src="/assets/printerIcon.png"
                        alt=""
                        width={32}
                        height={25}
                        className="cursor-pointer"
                    />
                </div>
            </div>
        </div>
    )
}

export default TransactionList

