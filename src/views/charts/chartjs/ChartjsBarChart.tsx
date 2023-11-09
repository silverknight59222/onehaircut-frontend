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
import { ChartData, ChartOptions } from 'chart.js'

// ** Icon Imports
import Icon from '@/@core/components/icon'

// ** Types
import { DateType } from '@/types/forms/reactDatepickerTypes'
import DropdownMenu from "@/components/UI/DropDownMenu"
import {ColorsThemeA} from "@/components/utilis/Themes"

interface ChartjsBarChartProps {
  title: string
  dropdownItems: string[]
  data: ChartData<'bar'>
  options: ChartOptions<'bar'>
  yellow: string
  labelColor: string
  borderColor: string
  handleDropdownClick?: (item: string) => void
}

const ChartjsBarChart: React.FC<ChartjsBarChartProps> = ({
                                                           title,
                                                           dropdownItems,
                                                           data,
                                                           options,
                                                           yellow,
                                                           labelColor,
                                                           borderColor,
                                                           handleDropdownClick
                                                         }) => {

  const [endDate, setEndDate] = useState<DateType>(null)
  const [startDate, setStartDate] = useState<DateType>(null)

  const CustomInput = forwardRef(({ ...props }: any, ref) => {
    const startDateValue = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
    const endDateValue = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

    const value = `${startDateValue}${endDateValue !== null ? endDateValue : ''}`

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

  const handleNewMonth = (item: string) => {
    // TODO: add backend to save the new preference
    if(handleDropdownClick) handleDropdownClick(item)
  }

  return (
      <div>
          <p className="text-neutral-500 font-semibold text-2xl text-center">
          {title}
      </p>
          <CardContent>
              <Bar data={data} height={400} options={options} />
          </CardContent></div>

  )
}

export default ChartjsBarChart
