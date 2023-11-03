// ** React Imports
import React, { forwardRef, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'

// ** Custom Component Import
import CustomTextField from '@/@core/components/mui/text-field'

// ** Third Party Imports
import format from 'date-fns/format'
import { Bar } from 'react-chartjs-2'
// import DatePicker from 'react-datepicker'
import { ChartData, ChartOptions } from 'chart.js'

// ** Icon Imports
import Icon from '@/@core/components/icon'

// ** Types
import { DateType } from '@/types/forms/reactDatepickerTypes'
import DropdownMenu from "@/components/UI/DropDownMenu";
import {ColorsThemeA} from "@/components/utilis/Themes";

interface BarProp {
  yellow: string
  labelColor: string
  borderColor: string
}

const ChartjsBarChart = (props: BarProp) => {
  // ** Props
  const { yellow, labelColor, borderColor } = props

  // ** States
  const [endDate, setEndDate] = useState<DateType>(null)
  const [startDate, setStartDate] = useState<DateType>(null)

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    scales: {
      x: {
        display: true,
        grid: {
          color: borderColor
        },
        ticks: { color: labelColor }
      },
      y: {
        min: 0,
        max: 100,  // Modify maximum value
        grid: {
          color: borderColor
        },
        ticks: {
          color: labelColor,
          padding: 10    // Adjusting padding for more spacing
        }
      }
    },
    plugins: {
      legend: { display: false }
    }
  }

  const data: ChartData<'bar'> = {
    labels: ['Staff 1', 'Staff 2', 'Staff 3', 'Staff 4', 'Staff 5'],
    datasets: [
      {
        maxBarThickness: 150,  // Adjust the width of the bars
        backgroundColor: yellow,
        borderColor: 'transparent',
        borderRadius: { topRight: 15, topLeft: 15 },
        data: [80, 35, 50, 65, 90]
      }
    ]
  }


  const CustomInput = forwardRef(({ ...props }: any, ref) => {
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

  const Month = [
    "January",
    "February",]
  const handleNewMonth = (item: string) => {
    // TODO: add backend to save the new preference
  }

  return (
    <Card>
      <CardHeader
        title='Occupation du personnel'
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
        action={
          <DropdownMenu dropdownItems={Month} backgroundClr={ColorsThemeA.standardBorderGray}
                        fctToCallOnClick={handleNewMonth} />
        }
      />
      <CardContent>
        <Bar data={data} height={400} options={options} />
      </CardContent>
    </Card>
  )
}

export default ChartjsBarChart
