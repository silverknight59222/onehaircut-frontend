"use client";
import BaseDropdown from "@/components/UI/BaseDropdown";
import RechartsLineChart from '@/views/charts/chartjs/RechartsLineChart'
import RechartsBarChart from '@/views/charts/chartjs/RechartsBarChart'
import RechartSingleBarChart from '@/views/charts/chartjs/RechartSingleBarChart'
import ApexAreaChart from '@/views/charts/chartjs/ApexAreaChart'
import RechartsPieChart from '@/views/charts/chartjs/RechartsPieChart'
import ChartjsBarChart from "@/views/charts/chartjs/ChartjsBarChart";
import DropdownMenu from "@/components/UI/DropDownMenu";
import { ColorsThemeA } from "@/components/utilis/Themes";
import RechartsGroupBarChart from "@/views/charts/chartjs/RechartGroupBarChart";
import { CrossIcon } from "@/components/utilis/Icons";
import React, { useEffect, useState } from "react";
import RevenueChart from "@/components/UI/RevenueChart";
import { dashboard } from "@/api/dashboard";

// Define the table headers
const tableHeaders = [
    { title: "Top 5 Coiffures", width: "w-1/4" },
    { title: "Nombre de commande", width: "w-1/4" },
    { title: "Top 5 Prestations", width: "w-1/4" },
    { title: "Nombre de commandes", width: "w-1/4" }
];

// Define the table data
const tableData = [
    { annulation: "Bob avec frange", remboursement: "125", enCours: "Extensions capillaires", transactions: "125" },
    { annulation: "Bob avec frange", remboursement: "125", enCours: "Extensions capillaires", transactions: "125" },
    { annulation: "Bob avec frange", remboursement: "125", enCours: "Extensions capillaires", transactions: "125" },
    { annulation: "Bob avec frange", remboursement: "125", enCours: "Extensions capillaires", transactions: "125" },
    { annulation: "Bob avec frange", remboursement: "125", enCours: "Extensions capillaires", transactions: "125" },
];


// Define the staff data and fill color in the parent component
// const staffData = [
//     { name: 'Hairstyle 1', value: 8000 },
//     { name: 'Hairstyle 2', value: 7500 },
//     { name: 'Hairstyle 3', value: 6000 },
//     { name: 'Hairstyle 4', value: 4000 },
//     { name: 'Hairstyle 5', value: 3000 },
//     { name: 'Hairstyle 6', value: 2000 },
//     { name: 'Hairstyle 7', value: 1500 },
//     { name: 'Hairstyle 8', value: 1000 },
//     { name: 'Hairstyle 9', value: 500 },
//     { name: 'Hairstyle 10', value: 100 },
// ];

const fillColor = '#49A204'; // Example fill color
const barSize = 80; // Example barSize

const IncomesModal = () => {

    const DisplayedMonths = [
        "Ce mois",
        "3 derniers mois",
        "Cette année"
    ]
    const handleNewMonthRevenu = (item: string) => {
        setSelectedMonthRevenu(item);
    }
    const [selectedMonthRevenu, setSelectedMonthRevenu] = useState(DisplayedMonths[0]);
    const [data, setData] = useState({} as any);
    const [hairstyleData, setHairstyleData] = useState([] as any);

    const fetchRevenueStats = async (periodKey) => {
        const {data} = await dashboard.revenueStats(periodKey)
        console.log(data)
        setData(data)
    }

    const fetchHairstyleChart = async (periodKey) => {
        const {data} = await dashboard.hairstyleChart(periodKey)
        setHairstyleData(data.hairstyle_data)
    }

    useEffect(() => {
        let periodKey = "month"
        switch (selectedMonthRevenu) {
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
        fetchRevenueStats(periodKey)
        fetchHairstyleChart(periodKey)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMonthRevenu])

    return (
        <div>
            <div>
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex-1 pl-5">
                            {/* Left-aligned Dropdown */}
                            <DropdownMenu dropdownItems={DisplayedMonths} selectId={selectedMonthRevenu} menuName="Période"
                                fctToCallOnClick={handleNewMonthRevenu} />
                        </div>
                        <div className="flex-1">
                            {/* Center-aligned Paragraph */}
                            <p className="text-2xl text-[#727272] font-semibold text-center">
                                Revenus
                            </p>
                        </div>
                        <div className="flex-1">
                            {/* Empty Div for balancing the space */}
                        </div>
                    </div>
                </div>

                {/*<RechartsLineChart direction="ltr" />*/}
                <RevenueChart period={selectedMonthRevenu} />

                <div className='mt-10 mb-10'>
                    <p className="text-neutral-500 font-semibold text-2xl text-center">
                        Top des ventes
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <div className="px-28">

                        <div className="shadow-md sm:rounded-lg mb-12">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        {/* Use the same width classes here for alignment */}
                                        <th scope="col" className="w-1/4 px-6 py-3 text-left text-xs font-bold text-black-500 uppercase tracking-wider border-r border-gray-300">
                                            Total montant coiffure
                                        </th>
                                        <th scope="col" className="w-1/4 px-6 py-3 text-left text-xs font-bold text-black-500 uppercase tracking-wider border-r border-gray-300">
                                            Total montant Prestation
                                        </th>
                                        <th scope="col" className="w-1/4 px-6 py-3 text-left text-xs font-bold text-black-500 uppercase tracking-wider border-r border-gray-300">
                                            Total montant Produits
                                        </th>
                                        <th scope="col" className="w-1/4 px-6 py-3 text-left text-xs font-bold text-black-500 uppercase tracking-wider border-r border-gray-300">
                                            Total montant TVA à déduire
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    <tr>
                                        {/* And also here */}
                                        <td className="w-1/4 px-6 py-4 whitespace-nowrap text-sm font-bold text-zinc-600 border-r border-gray-300">
                                            {data.total_hair_cut_price} $
                                        </td>
                                        <td className="w-1/4 px-6 py-4 whitespace-nowrap text-sm font-bold text-zinc-600 border-r border-gray-300">
                                            {data.total_services_price} $
                                        </td>
                                        <td className="w-1/4 px-6 py-4 whitespace-nowrap text-sm font-bold text-zinc-600 border-r border-gray-300">
                                            {data.total_order_price} $
                                        </td>
                                        <td className="w-1/4 px-6 py-4 whitespace-nowrap text-sm font-bold text-red-600">
                                            -0 $
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div >
                            <div className="flex">
                                <div className="w-2/4 shadow-md sm:rounded-lg mb-12">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className={`w-1/4 px-6 py-3 text-left text-xs font-bold text-black-500 uppercase tracking-wider border-r border-gray-300`}
                                                >
                                                    Top 5 Coiffures
                                                </th>
                                                <th
                                                    scope="col"
                                                    className={`w-1/4 px-6 py-3 text-left text-xs font-bold text-black-500 uppercase tracking-wider border-r border-gray-300`}
                                                >
                                                    Nombre de commande
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                            {data.top_hair_styles && data.top_hair_styles.map((data, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-zinc-600 border-r border-gray-300">
                                                        {data?.haircut?.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-zinc-600 border-r border-gray-300">
                                                        {data.haircut_count}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="w-2/4 shadow-md sm:rounded-lg mb-12">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className={`w-1/4 px-6 py-3 text-left text-xs font-bold text-black-500 uppercase tracking-wider border-r border-gray-300`}
                                                >
                                                    Top 5 Prestations
                                                </th>
                                                <th
                                                    scope="col"
                                                    className={`w-1/4 px-6 py-3 text-left text-xs font-bold text-black-500 uppercase tracking-wider border-r border-gray-300`}
                                                >
                                                    Nombre de commande
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                            {data.top_services && data.top_services.map((data, index) => (
                                                <tr key={index}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-zinc-600 border-r border-gray-300">
                                                        {data?.service?.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-zinc-600 border-r border-gray-300">
                                                        {data.service_count}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                    <p className="text-neutral-500 font-semibold text-2xl text-center">
                        Top revenu coiffure
                    </p>
                    <RechartSingleBarChart direction="ltr" chartTitle="Team Members" staffData={hairstyleData} fill={fillColor} barSize={barSize} />
                </div>
            </div>
        </div>
    );
};

export default IncomesModal;
