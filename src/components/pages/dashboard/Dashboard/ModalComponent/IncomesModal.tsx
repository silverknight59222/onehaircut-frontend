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
import React, { useState } from "react";

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
const staffData = [
    { name: 'Hairstyle 1', value: 8000 },
    { name: 'Hairstyle 2', value: 7500 },
    { name: 'Hairstyle 3', value: 6000 },
    { name: 'Hairstyle 4', value: 4000 },
    { name: 'Hairstyle 5', value: 3000 },
    { name: 'Hairstyle 6', value: 2000 },
    { name: 'Hairstyle 7', value: 1500 },
    { name: 'Hairstyle 8', value: 1000 },
    { name: 'Hairstyle 9', value: 500 },
    { name: 'Hairstyle 10', value: 100 },
];

const fillColor = '#49A204'; // Example fill color
const barSize = 80; // Example barSize

const IncomesModal = () => {

    const DisplayedMonths = [
        "Ce mois",
        "3 derniers mois",
        "Cette année"
    ]
    const handleNewMonthRevenu = (item: string) => {
        // Mettez à jour l'état avec la nouvelle valeur sélectionnée
        setSelectedMonthRevenu(item);
        // TODO: Ajoutez la logique pour sauvegarder la nouvelle préférence
    }
    const [selectedMonthRevenu, setSelectedMonthRevenu] = useState(DisplayedMonths[0]);

    const yourChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 500 },
        scales: {
            x: {
                display: true,
                grid: {
                    color: "#f1f1f1" // Using borderColor prop directly here for simplicity
                },
                ticks: { color: "#000" } // Using labelColor prop directly here for simplicity
            },
            y: {
                min: 0,
                max: 100,
                grid: {
                    color: "#f1f1f1" // Using borderColor prop directly here for simplicity
                },
                ticks: {
                    color: "#000", // Using labelColor prop directly here for simplicity
                    padding: 10
                }
            }
        },
        plugins: {
            legend: { display: false }
        }
    }

    // Data for the chart, can be dynamic and coming from props or state
    const chartData = [
        {
            name: 'Staff 1',
            Service: 25,  // Approximated from image
            Prestation: 50,  // Approximated from image
            Total: 75,  // Approximated from image
        },
        {
            name: 'Staff 2',
            Service: 50,  // Approximated from image
            Prestation: 75,  // Approximated from image
            Total: 100,  // Approximated from image
        },
        {
            name: 'Staff 3',
            Service: 35,  // Approximated from image
            Prestation: 60,  // Approximated from image
            Total: 90,  // Approximated from image
        },
        {
            name: 'Staff 4',
            Service: 20,  // Approximated from image
            Prestation: 80,  // Approximated from image
            Total: 95,  // Approximated from image
        },
        {
            name: 'Staff 5',
            Service: 30,  // Approximated from image
            Prestation: 45,  // Approximated from image
            Total: 70,  // Approximated from image
        },
    ];

    const yourDropdownClickHandler = (item: string) => {
        console.log(`You selected: ${item}`);
        // Here, you can add additional logic to handle the dropdown selection.
    }


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
                <ApexAreaChart />

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
                                            17225 $
                                        </td>
                                        <td className="w-1/4 px-6 py-4 whitespace-nowrap text-sm font-bold text-zinc-600 border-r border-gray-300">
                                            6750 $
                                        </td>
                                        <td className="w-1/4 px-6 py-4 whitespace-nowrap text-sm font-bold text-zinc-600 border-r border-gray-300">
                                            650 $
                                        </td>
                                        <td className="w-1/4 px-6 py-4 whitespace-nowrap text-sm font-bold text-red-600">
                                            -6500 $
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="shadow-md sm:rounded-lg mb-12">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        {tableHeaders.map(header => (
                                            <th
                                                key={header.title}
                                                scope="col"
                                                className={`${header.width} px-6 py-3 text-left text-xs font-bold text-black-500 uppercase tracking-wider border-r border-gray-300`}
                                            >
                                                {header.title}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {tableData.map((data, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-zinc-600 border-r border-gray-300">
                                                {data.annulation}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-zinc-600 border-r border-gray-300">
                                                {data.remboursement}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-zinc-600 border-r border-gray-300">
                                                {data.enCours}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-red-600">
                                                {data.transactions}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <p className="text-neutral-500 font-semibold text-2xl text-center">
                        Top revenu coiffure
                    </p>
                    <RechartSingleBarChart direction="ltr" staffData={staffData} fill={fillColor} barSize={barSize} />
                </div>
            </div>
        </div>
    );
};

export default IncomesModal;
