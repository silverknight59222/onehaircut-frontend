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

const dataForRechart = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        tv: 3000,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        tv: 3000,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        tv: 3000,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        tv: 3000,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        tv: 3000,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        tv: 3000,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        tv: 3000,
        amt: 2100,
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

const RechartsGroupBarChart = ({ direction }: Props) => {
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
            <CardHeader
                title='Brand Turnover'
                sx={{
                    flexDirection: ['column', 'row'],
                    alignItems: ['flex-start', 'center'],
                    '& .MuiCardHeader-action': { mb: 0 },
                    '& .MuiCardHeader-content': { mb: [2, 0] }
                }}
                action={
                    'hello'
                    // <DatePicker
                    //   selectsRange
                    //   id='recharts-bar'
                    //   endDate={endDate}
                    //   selected={startDate}
                    //   startDate={startDate}
                    //   onChange={handleOnChange}
                    //   placeholderText='Click to select a date'
                    //   customInput={<CustomInput start={startDate as Date | number} end={endDate as Date | number} />}
                    // />
                }
            />
            <CardContent>
                <Box sx={{ mb: 4, display: 'flex', flexWrap: 'wrap' }}>
                    <Box sx={{ mr: 6, display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: '#826af9' } }}>
                        <Icon icon='mdi:circle' fontSize='0.75rem' />
                        <Typography variant='body2'>Apple</Typography>
                    </Box>
                    <Box sx={{ mr: 6, display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: '#9f87ff' } }}>
                        <Icon icon='mdi:circle' fontSize='0.75rem' />
                        <Typography variant='body2'>Samsung</Typography>
                    </Box>
                    <Box sx={{ mr: 6, display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: '#d2b0ff' } }}>
                        <Icon icon='mdi:circle' fontSize='0.75rem' />
                        <Typography variant='body2'>Oneplus</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: '#f8d3ff' } }}>
                        <Icon icon='mdi:circle' fontSize='0.75rem' />
                        <Typography variant='body2'>Motorola</Typography>
                    </Box>
                </Box>
                <Box sx={{ height: 350 }}>
                    <ResponsiveContainer>
                        <BarChart height={350} data={dataForRechart} barSize={40} style={{ direction }} margin={{ left: 0 }}>
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis dataKey='name' reversed={direction === 'rtl'} />
                            <YAxis orientation={direction === 'rtl' ? 'right' : 'left'} />
                            <Tooltip content={CustomTooltip} />
                            <Bar dataKey="pv" fill="#8884d8" background={{ fill: '#eee' }} />
                            <Bar dataKey="uv" fill="#82ca9d" />
                            <Bar dataKey="tv" fill="#72ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    )
}

export default RechartsGroupBarChart
