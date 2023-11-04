// ** React Imports
import React, { forwardRef, useState } from 'react'

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

interface RechartsBarChartProps {
    direction: 'ltr' | 'rtl';
    staffData: { name: string; value: number }[]; // Adjust the type if necessary
    fill: string;
    barSize: number;
}
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

const RechartSingleBarChart: React.FC<RechartsBarChartProps> = ({ direction, staffData, fill, barSize }) => {
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

    // @ts-ignore
    return (
        <Card>
            <CardContent>
                {/* Legend, date picker and other elements you may want to include */}
                <Box sx={{ height: 350 }}>
                    <ResponsiveContainer>
                        <BarChart data={staffData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="value" fill={fill} barSize={barSize} />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    )
}

export default RechartSingleBarChart
