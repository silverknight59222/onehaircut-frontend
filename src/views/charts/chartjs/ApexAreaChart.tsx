// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Custom Component Import
import CustomTextField from '@/@core/components/mui/text-field'

// ** Third Party Imports
import format from 'date-fns/format'
import { ApexOptions } from 'apexcharts'

// ** Icon Imports
import Icon from '@/@core/components/icon'


// ** Component Import
import ReactApexcharts from 'react-apexcharts'; // Assuming the path is 'react-apexcharts'

const areaColors = {
    series1: '#ab7efd',
    series2: '#b992fe',
    series3: '#e0cffe'
}

interface PickerProps {
    start: Date | number
    end: Date | number
}

const series = [
    {
        name: 'Income',
        data: [100, 120, 90, 170, 130, 160, 140, 240, 220, 180, 270, 280, 375]
    },
    {
        name: 'New clients',
        data: [60, 80, 70, 110, 80, 100, 90, 180, 160, 140, 200, 220, 275]
    },
]

const ApexAreaChart = () => {
    // ** States
    // ** Hook
    const theme = useTheme()

    const options: any = {
        chart: {
            parentHeightOffset: 0,
            toolbar: { show: false }
        },
        tooltip: { shared: false },
        dataLabels: { enabled: false },
        stroke: {
            show: false,
            curve: 'straight'
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            labels: { colors: '#6E6E6E' }, // assuming a gray color for the hardcoded value
            markers: {
                offsetY: 1,
                offsetX: -3
            },
            itemMargin: {
                vertical: 3,
                horizontal: 10
            }
        },
        colors: ['#FFC0CB', '#FFA07A', '#20B2AA'], // replaced variables with actual color hex values
        fill: {
            opacity: 1,
            type: 'solid'
        },
        grid: {
            show: true,
            borderColor: '#e0e0e0', // hardcoding a light gray border color
            xaxis: {
                lines: { show: true }
            }
        },
        yaxis: {
            labels: {
                style: { colors: '#a9a9a9' } // assuming a dark gray for disabled text
            }
        },
        xaxis: {
            axisBorder: { show: false },
            axisTicks: { color: '#e0e0e0' }, // hardcoding a light gray for axis ticks
            crosshairs: {
                stroke: { color: '#e0e0e0' } // hardcoding a light gray for crosshairs
            },
            labels: {
                style: { colors: '#a9a9a9' } // assuming a dark gray for disabled text
            },
            categories: [
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12',
                '13'
            ]
        }
    }

    const CustomInput = forwardRef((props: PickerProps, ref) => {
        const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
        const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

        const value = `${startDate}${endDate !== null ? endDate : ''}`

        return (
            <CustomTextField
                {...props}
                size='small'
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

    return (
            <CardContent>
                <ReactApexcharts type='area' height={400} options={options} series={series} />
            </CardContent>
    )
}

export default ApexAreaChart
