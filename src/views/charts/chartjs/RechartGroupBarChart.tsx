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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'

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

interface RechartsGroupBarChartProps {
    direction: 'ltr' | 'rtl',
    data: Array<any>, // This will be your data array prop
    barFills: { [key: string]: string }, // Object containing fill colors for each dataKey
    legends: Array<{ key: string, color: string, text: string }>, // Array of legend items
    yAxisName?: string, // Optional prop to set Y Axis name
}

//TODO ADD REAL DATA HERE OR IN STAFFMORAL
const dataForRechart = [
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


const CustomTooltip = (data: TooltipProps<any, any>) => {
    const { active, payload } = data

    if (active && payload) {
        return (
            <div className='recharts-custom-tooltip'>
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




const RechartsGroupBarChart = ({
    direction,
    data,
    barFills,
    legends,
    yAxisName // Ajoutez cette ligne ici pour accepter yAxisName en tant que prop
}: RechartsGroupBarChartProps) => {


    // ** States
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

    return (
        <RechartsWrapper>
            <CardContent>
                <Box sx={{ height: 350 }}>
                    <ResponsiveContainer>
                        <BarChart height={350} data={data} style={{ direction }} margin={{ left: 0 }}>
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis dataKey='name' reversed={direction === 'rtl'} />
                            <YAxis orientation={direction === 'rtl' ? 'right' : 'left'} />
                            <Tooltip content={<CustomTooltip />} />
                            {Object.keys(barFills).map((key, index) => (
                                <Bar
                                    key={key}
                                    dataKey={key}
                                    fill={barFills[key]}
                                    barSize={60} // Vous pouvez ajuster cette valeur pour l'élargissement
                                    radius={[10, 10, 0, 0]} // Arrondit les coins supérieurs des barres
                                />
                            ))}
                        </BarChart>
                    </ResponsiveContainer>
                </Box>

                <Box sx={{ mt: 3, ml: 6, display: 'flex', flexWrap: 'wrap' }}>
                    {legends.map((legend, index) => (
                        <Box key={index} sx={{ mr: 6, display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: legend.color } }}>
                            <Icon icon='mdi:circle' fontSize='0.75rem' />
                            <Typography variant='body2'>{legend.text}</Typography>
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </RechartsWrapper>
    )
}

export default RechartsGroupBarChart
