"use client";
import RechartSingleBarChart from '@/views/charts/chartjs/RechartSingleBarChart'
import DropdownMenu from "@/components/UI/DropDownMenu";
import React, { useEffect, useState } from "react";

import { dashboard } from "@/api/dashboard";
import { Theme_A } from "@/components/utilis/Themes";


const HairdresserRevenueBarChart = ({period}) => {
    const [data, setData] = useState([] as any);

    const fetchRevenueStats = async (periodKey) => {
        const { data } = await dashboard.hairdresserRevenueChart(periodKey)
        setData(data.hairstyle_data)
    }

    useEffect(() => {
        let periodKey = "month"
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
        fetchRevenueStats(periodKey)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [period])

    return (
        <div className="rounded-xl shadow-sm shadow-stone-600 mb-20">
            <RechartSingleBarChart
                direction="ltr"
                staffData={data}
                fill={''}
                barSize={200}
                chartTitle="Charge générale liées aux commandes"
                chartTitleColor="rgba(150,150,150,1)"
            />
        </div>
    );
};

export default HairdresserRevenueBarChart;
