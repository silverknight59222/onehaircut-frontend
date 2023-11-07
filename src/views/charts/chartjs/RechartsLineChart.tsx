// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,Legend, TooltipProps } from 'recharts'

// ** Icon Imports
import Icon from '@/@core/components/icon'

// ** Custom Components Imports
import CustomChip from '@/@core/components/mui/chip'

interface Props {
  direction: 'ltr' | 'rtl'
}

const data = [
  { name: '1', revenus: 500, visites: 800 },
  { name: '2', revenus: 450, visites: 900 },
  { name: '3', revenus: 500, visites: 1000 },
  { name: '4', revenus: 475, visites: 950 },
  { name: '5', revenus: 520, visites: 1200 },
  { name: '6', revenus: 560, visites: 1100 },
  { name: '7', revenus: 540, visites: 1150 },
  { name: '8', revenus: 600, visites: 1100 },
  { name: '9', revenus: 620, visites: 1050 },
  { name: '10', revenus: 600, visites: 1000 },
  { name: '11', revenus: 610, visites: 950 },
  { name: '12', revenus: 650, visites: 900 },
  { name: '13', revenus: 640, visites: 860 },
  { name: '14', revenus: 660, visites: 840 },
  { name: '15', revenus: 680, visites: 1100 },
  { name: '16', revenus: 700, visites: 1400 },
  { name: '17', revenus: 720, visites: 1300 },
  { name: '18', revenus: 750, visites: 1200 },
  { name: '19', revenus: 730, visites: 1150 },
  { name: '20', revenus: 710, visites: 1100 },
  { name: '21', revenus: 700, visites: 1050 },
  { name: '22', revenus: 690, visites: 1000 },
  { name: '23', revenus: 680, visites: 950 },
  { name: '24', revenus: 670, visites: 900 },
  { name: '25', revenus: 660, visites: 850 },
  { name: '26', revenus: 650, visites: 800 },
  { name: '27', revenus: 640, visites: 750 },
  { name: '28', revenus: 630, visites: 700 },
  { name: '29', revenus: 620, visites: 650 },
  { name: '30', revenus: 610, visites: 600 },
  { name: '31', revenus: 600, visites: 550 }
];


const CustomTooltip = (props: TooltipProps<any, any>) => {
  // ** Props
  const { active, payload } = props

  if (active && payload) {
    return (
      <div className='recharts-custom-tooltip'>
        <Typography sx={{ fontSize: theme => theme.typography.body2.fontSize }}>{`${payload[0].value}%`}</Typography>
      </div>
    )
  }

  return null
}

const RechartsLineChart = ({ direction }: Props) => {
  return (
      <CardContent>
        <Box sx={{ height: 350 }}>
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey='name' reversed={direction === 'rtl'} />
              <YAxis />
              <Tooltip content={CustomTooltip} />
              <Legend/>
              <Line type="monotone" dataKey='revenus' stroke='#ff6384' activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey='visites' stroke='#36A2EB' />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
  )
}

export default RechartsLineChart
