import React, { useState } from 'react';
import Box from '@mui/material/Box';
import RechartsWrapper from '@/@core/styles/libs/recharts'
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Icon from '@/@core/components/icon';


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
const ConversionChart: React.FC<RechartsPieChartProps> = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const onPieEnter = (_: any, index: number): void => {
        setActiveIndex(index);
    };

    const onPieLeave = (): void => {
        setActiveIndex(null);
    };

    return (
        <RechartsWrapper>
            <CardContent>
                <Box sx={{ height: 280, width: 500 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400} margin={{ top: 5, right: 50, left: 50, bottom: 5 }}>
                            <Pie
                                data={data}
                                innerRadius={40}
                                dataKey='value'
                                label={renderCustomizedLabel}
                                labelLine={false}
                                onMouseEnter={onPieEnter}
                                onMouseLeave={onPieLeave}
                            >
                                {data.map((entry, index) => (
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
                    {data.map((item, index) => (
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
    );
};

export default ConversionChart;
