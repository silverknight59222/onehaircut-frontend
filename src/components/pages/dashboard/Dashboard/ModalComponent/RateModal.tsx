"use client";
import BaseDropdown from "@/components/UI/BaseDropdown";
import React from "react";
import RechartsLineChart from '@/views/charts/chartjs/RechartsLineChart'
import RechartsBarChart from '@/views/charts/chartjs/RechartsBarChart'
import RechartSingleBarChart from '@/views/charts/chartjs/RechartSingleBarChart'
import RechartsPieChart from '@/views/charts/chartjs/RechartsPieChart'
import ChartjsBarChart from "@/views/charts/chartjs/ChartjsBarChart";
import DropdownMenu from "@/components/UI/DropDownMenu";
import {ColorsThemeA} from "@/components/utilis/Themes";
import RechartsGroupBarChart from "@/views/charts/chartjs/RechartGroupBarChart";

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

const fillColor = '#3C8A41'; // Example fill color
const barSize = 80; // Example barSize

const RateModal = () => {
const yourChartData = {
    labels: ['Staff 1', 'Staff 2', 'Staff 3', 'Staff 4', 'Staff 5'],
    datasets: [
        {
            maxBarThickness: 150,
            backgroundColor: "#3C8A41", // Using yellow prop directly here for simplicity
            borderColor: 'transparent',
            borderRadius: { topRight: 15, topLeft: 15 },
            data: [80, 35, 50, 65, 90]
        }
    ]
}

    const Month = [
        "Ce mois"]
    const handleNewMonth = (item: string) => {
        // TODO: add backend to save the new preference
    }

    const data = [
        { name: 'Jason', value: 17, color: '#4184f3' }, // Blue
        { name: 'Melinda', value: 20, color: '#ff6262' }, // Red
        { name: 'Karim', value: 18, color: '#50be87' }, // Green
        { name: 'Dyone', value: 23, color: '#ffce5a' }, // Yellow
        { name: 'Deborah', value: 13, color: '#6070db' }, // Dark Blue
        { name: 'Daniel', value: 9, color: '#db7c00' }, // Orange
    ];

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

// Fill colors for each type of bar in the chart
    const barColors = {
        Service: '#FFC107',
        Prestation: '#2A5782',
        Total: '#7ABF50',
    };

// Legend information
    const chartLegends = [
        { key: 'Service', color: '#FFC107', text: 'Service' },
        { key: 'Prestation', color: '#2A5782', text: 'Prestation' },
        { key: 'Total', color: '#7ABF50', text: 'Total' },
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
                                <DropdownMenu dropdownItems={Month} backgroundClr={ColorsThemeA.standardBorderGray}
                                              fctToCallOnClick={handleNewMonth} showDefaultMessage={false} />
                            </div>
                            <div className="flex-1">
                                {/* Center-aligned Paragraph */}
                                <p className="text-2xl text-[#727272] font-semibold text-center">
                                    Taux de conversion
                                </p>
                            </div>
                            <div className="flex-1">
                                {/* Empty Div for balancing the space */}
                            </div>
                        </div>
                    </div>

                    <RechartsLineChart direction="ltr" />

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

export default RateModal;
