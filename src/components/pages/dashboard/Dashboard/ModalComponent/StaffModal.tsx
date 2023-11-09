"use client";
import React from "react";
import RechartsPieChart from '@/views/charts/chartjs/RechartsPieChart'
import RechartsGroupBarChart from "@/views/charts/chartjs/RechartGroupBarChart";
import RechartsRadarChart from "@/views/charts/chartjs/RechartsRadarChart";





const StaffModal = () => {

    const data = [
        { name: 'Jason', value: 17, color: 'rgba(50, 120, 220, 1)' }, // Blue
        { name: 'Melinda', value: 20, color: 'rgba(255, 70, 70, 0.8)' }, // Red
        { name: 'Karim', value: 18, color: 'rgba(122, 191, 80, 1)' }, // Green
        { name: 'Dyone', value: 23, color: 'rgba(255, 200, 102, 1)' }, // Yellow
        { name: 'Deborah', value: 13, color: 'rgba(75, 150, 255, 1)' }, // Dark Blue
        { name: 'Daniel', value: 9, color: '#FA8E1B' }, // Orange
    ];


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
        Service: '#FA8E1B',
        Prestation: 'rgba(75, 150, 255, 1)',
        Total: 'rgba(122, 191, 80, 1)',
    };

    // Legend information
    const chartLegends = [
        { key: 'Service', color: '#FA8E1B', text: 'Service' },
        { key: 'Prestation', color: 'rgba(75, 150, 255, 1)', text: 'Prestation' },
        { key: 'Total', color: 'rgba(122, 191, 80, 1)', text: 'Total' },
    ];

    const yourDropdownClickHandler = (item: string) => {
        console.log(`You selected: ${item}`);
        // Here, you can add additional logic to handle the dropdown selection.
    }


    return (
        <div>
            <div className='mt-4 mb-4'>
                <p className="text-neutral-500 font-semibold text-2xl text-center">
                    Activité du personnel
                </p>
            </div>

            {/* Group Bar Chart Container */}
            <div className="mb-12">
                <RechartsGroupBarChart
                    direction="ltr"
                    data={chartData}
                    barFills={barColors}
                    legends={chartLegends}
                    yAxisName="Commmandes" // Vous ajoutez la valeur pour yAxisName ici
                />

            </div>

            <div>
                {/* Container for charts that should be side by side */}
                <div className="flex flex-wrap -mx-3">
                    {/* Pie Chart Container */}
                    <div className="w-full lg:w-1/2 px-3">
                        <p className="text-neutral-500 font-semibold text-2xl text-center">
                            Repartition de la charge totale
                        </p>
                        <RechartsPieChart data={data} />
                    </div>
                    {/* Radar Chart Container */}
                    <div className="w-full lg:w-1/2 px-3">
                        <p className="text-neutral-500 font-semibold text-2xl text-center">
                            Repartition visites sur les jours de la semaine
                        </p>
                        <RechartsRadarChart />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default StaffModal;
