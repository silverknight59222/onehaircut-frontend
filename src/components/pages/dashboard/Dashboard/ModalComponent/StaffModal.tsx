"use client";
import RechartsPieChart from '@/views/charts/chartjs/RechartsPieChart'
import RechartsGroupBarChart from "@/views/charts/chartjs/RechartGroupBarChart";
import RechartsRadarChart from "@/views/charts/chartjs/RechartsRadarChart";
import DropdownMenu from "@/components/UI/DropDownMenu";
import React, { useEffect, useState } from "react";
import { dashboard } from '@/api/dashboard';
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import {
    Radar,
    Tooltip,
    PolarGrid,
    RadarChart,
    TooltipProps,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer
} from 'recharts'
import Icon from '@/@core/components/icon'

const DisplayedMonths = [
    "Ce mois",
    "3 derniers mois",
    "Cette année"
]
const StaffModal = () => {


    const CustomTooltip = (data: TooltipProps<any, any>) => {
        const { active, payload } = data;

        if (active && payload) {
            return (
                <div
                    className='recharts-custom-tooltip'
                    style={{
                        backgroundColor: 'white',
                        padding: '10px',
                        border: '1px solid #dddddd',
                        borderRadius: '4px',
                        boxShadow: '0px 0px 5px #aaaaaa'
                    }}
                >
                    <Typography variant="subtitle2" color="textPrimary">{data.label}</Typography>
                    <Divider style={{ margin: '5px 0' }} />
                    {payload.map((entry, index) => (
                        <Box key={`item-${index}`} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Icon icon='mdi:circle' fontSize='small' style={{ color: entry.color }} />
                            <Typography variant='body2' style={{ marginLeft: '5px' }}>{`${entry.name}: ${entry.value}`}</Typography>
                        </Box>
                    ))}
                </div>
            );
        }

        return null;
    };

    // Fill colors for each type of bar in the chart
    const barColors = {
        Coiffures: '#FA8E1B',
        Prestation: 'rgba(75, 150, 255, 1)',
        Total: 'rgba(122, 191, 80, 1)',
    };

    // Legend information
    const chartLegends = [
        { key: 'hairstyle', color: '#FA8E1B', text: 'Coiffures' },
        { key: 'service', color: 'rgba(75, 150, 255, 1)', text: 'Prestation' },
        { key: 'total', color: 'rgba(122, 191, 80, 1)', text: 'Total' },
    ];

    const [chartData, setChartData] = useState([])
    const [data, setData] = useState([])
    const [dayWiseVisitData, setDayWiseVisitData] = useState([])
    const [selectedMonthPayload, setSelectedMonthPayload] = useState(DisplayedMonths[0]);
    const handleNewMonthRevenu = (item: string) => {
        // Mettez à jour l'état avec la nouvelle valeur sélectionnée
        setSelectedMonthPayload(item);
        // TODO: Ajoutez la logique pour sauvegarder la nouvelle préférence
    }

    const fetchStaffActivityChartData = async (period) => {
        const { data } = await dashboard.staffActivityChart(period);
        setChartData(data.hairstyle_sales_data)
    }

    const fetchStaffLoadChartData = async (period) => {
        const { data } = await dashboard.staffLoadChart(period);
        setData(data.hairstyle_load_data)
    }

    const fetchDayWiseVisitChart = async (period) => {
        const { data } = await dashboard.dayWiseVisitChart(period);
        setDayWiseVisitData(data.day_wise_visit_data)
    }

    useEffect(() => {
        let periodKey = "month"
        switch (selectedMonthPayload) {
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
        fetchStaffActivityChartData(periodKey)
        fetchStaffLoadChartData(periodKey)
        fetchDayWiseVisitChart(periodKey)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedMonthPayload])

    return (
        <div>
            <div className='mt-4 mb-4'>
                <span className="mr-4 mt-4">
                    <DropdownMenu dropdownItems={DisplayedMonths} backgroundColor="bg-white" selectId={selectedMonthPayload} menuName="Période d'observation"
                        fctToCallOnClick={handleNewMonthRevenu} />
                </span>
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
                        <CardContent>
                            <Box sx={{ height: 350 }}>
                                <ResponsiveContainer>
                                    <RadarChart cx='50%' cy='50%' outerRadius='70%' data={dayWiseVisitData}>
                                        <PolarGrid />
                                        <PolarAngleAxis dataKey='day' />
                                        <PolarRadiusAxis angle={30} domain={[0, 'dataMax + 50']} />
                                        <Radar name='Visites' dataKey='visits' stroke='rgba(50, 150, 50, 1)' fill='rgba(122, 191, 80, 1)' fillOpacity={0.6} />
                                        <Tooltip content={<CustomTooltip />} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default StaffModal;
