// ** React Imports
import React, { forwardRef, useState } from 'react'
import RechartsWrapper from '@/@core/styles/libs/recharts'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Custom Component Import
import CustomTextField from '@/@core/components/mui/text-field'

// ** Third Party Imports
import format from 'date-fns/format'
// import DatePicker from 'react-datepicker'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps, Cell } from 'recharts'

// ** Icon Imports
import Icon from '@/@core/components/icon'

// ** Types
import { DateType } from '@/types/forms/reactDatepickerTypes'

interface Props {
    direction: 'ltr' | 'rtl'
}

interface PickerProps {
    start: Date | number
    end: Date | number
}

interface RechartsBarChartProps {
    direction: 'ltr' | 'rtl';
    staffData: { name: string; value: number }[];
    fill: string;
    barSize: number;
    chartTitle: string;
    chartTitleColor?: string;
}

const getColor = (value: number) => {
    if (value <= 20) {
        return 'rgba(32, 102, 53, 1)';
    } else if (value <= 40) {
        return 'rgba(50, 151, 80, 1)';
    } else if (value <= 60) {
        return 'rgba(254, 191, 76, 1)'
    } else if (value <= 80) {
        return 'rgba(255, 165, 0, 1)';
    } else if (value <= 90) {
        return 'rgba(201, 70, 70, 1)';
    } else {
        return 'rgba(166, 19, 19, 1)';
    }

};


const CustomTooltip = (data: TooltipProps<any, any>) => {
    const { active, payload } = data

    if (active && payload) {
        return (
            <div className='recharts-custom-tooltip '>
                <Typography>{data.label}</Typography>
                <Divider />
                {data &&
                    data.payload &&
                    data.payload.map((i: any) => {
                        return (
                            <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: i.fill, mr: 2.5 } }} key={i.dataKey}>
                                <Icon icon='mdi:circle' fontSize='0.6rem' />
                                <Typography variant='body2'>{`${i.dataKey} : ${i.payload[i.dataKey]}`}</Typography>
                            </Box>
                        )
                    })}
            </div>
        )
    }

    return null
}

const RechartSingleBarChart: React.FC<RechartsBarChartProps> = ({ direction, staffData, fill, barSize = 150, chartTitle, chartTitleColor = 'inherit' }) => {
    const [endDate, setEndDate] = useState<DateType>(null)
    const [startDate, setStartDate] = useState<DateType>(null)

    const CustomInput = forwardRef((props: PickerProps, ref) => {
        const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
        const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

        const value = `${startDate}${endDate !== null ? endDate : ''}`

        return (
            <CustomTextField
                {...props}
                value={value}
                inputRef={ref}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <Icon fontSize='1.25rem' icon='tabler:calendar-event' />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position='end'>
                            <Icon fontSize='1.25rem' icon='tabler:chevron-down' />
                        </InputAdornment>
                    )
                }}
            />
        )
    })

    const handleOnChange = (dates: any) => {
        const [start, end] = dates
        setStartDate(start)
        setEndDate(end)
    }

    // @ts-ignore
    return (
        <RechartsWrapper >
            <Card >
                <CardHeader
                    title={chartTitle}
                    titleTypographyProps={{
                        align: 'center',
                        variant: 'h6', // Utilisez une variante qui correspond à la taille souhaitée
                        style: {
                            color: chartTitleColor, // Applique la couleur passée en prop
                            marginBottom: '-20px' // Ajuste l'espace en dessous du titre pour le "descendre"
                        }
                    }}
                />
                <CardContent>
                    {/* Legend, date picker and other elements you may want to include */}
                    <Box sx={{ height: 350 }}>
                        <ResponsiveContainer>
                            <BarChart data={staffData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar
                                    dataKey="value"
                                    barSize={barSize}
                                    radius={[15, 15, 0, 0]}
                                >a
                                    {
                                        staffData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={getColor(entry.value)} />
                                        ))
                                    }
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                </CardContent>
            </Card>
        </RechartsWrapper>
    )
}

export default RechartSingleBarChart
