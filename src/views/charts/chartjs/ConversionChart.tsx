import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import RechartsWrapper from '@/@core/styles/libs/recharts'
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Icon from '@/@core/components/icon';
import { dashboard } from '@/api/dashboard';


// Define the props for the component including the data array
interface RechartsPieChartProps {
    data: {
        name: string;
        value: number;
        color: string;
    }[];
}


const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
}: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
}): JSX.Element => {
    const radius = outerRadius + 30;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Ajuster l'alignement du texte en fonction de la position
    const textAnchor = x > cx ? 'start' : 'end';

    return (
        <text x={x} y={y} fill="black" textAnchor={textAnchor} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

// Update the component to accept props
const ConversionChart = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const [conversionData, setConversionData] = useState([] as any)

    const [indiceTauxConversion, setIndiceTauxConversion] = useState("")
    const [couleurTaux, setCouleurTaux] = useState("")

    const onPieEnter = (_: any, index: number): void => {
        setActiveIndex(index);
    };

    const onPieLeave = (): void => {
        setActiveIndex(null);
    };

    const calculateTitle = () => {
        let tauxDeConversion = 0
        if (data.total_orders != 0) {
            tauxDeConversion = (data.total_orders / data.total_views) * 100
        }

        if (tauxDeConversion >= 0 && tauxDeConversion <= 5) {
            setIndiceTauxConversion("Faible");
            setCouleurTaux('rgba(255, 70, 70, 1)');
        } else if (tauxDeConversion > 5 && tauxDeConversion <= 10) {
            setIndiceTauxConversion("Intéressant");
            setCouleurTaux('rgba(255, 165, 0, 1)');
        } else if (tauxDeConversion > 10) {
            setIndiceTauxConversion("Performant");
            setCouleurTaux('rgba(50, 151, 80, 1)');
        }
    }

    const setChartData = () => {
        setConversionData([
            { name: 'Commandes', value: data.total_orders, color: "rgba(255, 70, 70, 1)" },
            { name: 'Visites', value: data.total_views, color: "rgba(16, 161, 216, 1)" },
        ])
    }

    useEffect(() => {
        calculateTitle()
        setChartData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return (
        <div className="px-3 xl:w-4/12 h-[460px] overflow-auto w-full p-6 bg-[rgba(255,255,255,0.69)] rounded-xl shadow-sm shadow-stone-600">
            <p className="text-xl sm:text-2xl text-[#727272] font-semibold text-center mt-6 ">
                Taux de Conversion: <span style={{ color: couleurTaux }}>{indiceTauxConversion}</span>
            </p>
            {/* Wrapper for ProgressBar components */}
            <div className="flex flex-wrap items-center justify-center gap-4 ">
                <RechartsWrapper>
                    <CardContent>
                        <Box sx={{ height: 280, width: 500 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart width={400} height={400} margin={{ top: 5, right: 50, left: 50, bottom: 5 }}>
                                    <Pie
                                        data={conversionData}
                                        innerRadius={40}
                                        dataKey='value'
                                        label={renderCustomizedLabel}
                                        labelLine={false}
                                        onMouseEnter={onPieEnter}
                                        onMouseLeave={onPieLeave}
                                    >
                                        {conversionData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.color}
                                                strokeWidth={activeIndex === index ? 0.5 : 4}
                                                scale={activeIndex === index ? 1 : 4}
                                                style={{
                                                    outline: 'none',
                                                    transition: 'transform 300ms ease-out, stroke-width duration 300ms ease-out',
                                                    cursor: 'pointer',
                                                }}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 0, justifyContent: 'center' }}>
                            {conversionData.map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        mr: 6,
                                        display: 'flex',
                                        alignItems: 'center',
                                        '& svg': { mr: 1.5, color: item.color }
                                    }}
                                >
                                    <Icon icon='mdi:circle' fontSize='0.75rem' />
                                    <Typography variant='body2'>{item.name}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </CardContent>
                </RechartsWrapper>
            </div>
        </div>

    );
};

export default ConversionChart;
