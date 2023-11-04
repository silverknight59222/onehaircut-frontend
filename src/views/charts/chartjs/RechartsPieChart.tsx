import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
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
    const radius = outerRadius + 20;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

// Update the component to accept props
const RechartsPieChart: React.FC<RechartsPieChartProps> = ({ data }) => {
    return (
            <CardContent>
                <Box sx={{ height: 350 }}>
                    <ResponsiveContainer>
                        <PieChart height={350}>
                            <Pie data={data} innerRadius={0} dataKey='value' label={renderCustomizedLabel} labelLine={false}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 4, justifyContent: 'center' }}>
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
    );
};

export default RechartsPieChart;
