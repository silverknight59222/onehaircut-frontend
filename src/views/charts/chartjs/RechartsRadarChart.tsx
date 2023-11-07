// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import {
  Radar,
  Tooltip,
  PolarGrid,
  RadarChart,
  TooltipProps,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts'

// ** Icon Imports
import Icon from '@/@core/components/icon'

const data = [
    { day: 'Lundi', visits: 456 },
    { day: 'Mardi', visits: 389 },
    { day: 'Mercredi', visits: 431 },
    { day: 'Jeudi', visits: 495 },
    { day: 'Vendredi', visits: 523 },
    { day: 'Samedi', visits: 345 },
    { day: 'Dimanche', visits: 255 },
];1

const CustomTooltip = (data: TooltipProps<any, any>) => {
    const { active, payload } = data;

    if (active && payload) {
        return (
            <div
                className='recharts-custom-tooltip'
                style={{
                    backgroundColor: 'white',
                    padding: '10px',
                    border: '1px solid #dddddd',
                    borderRadius: '4px',
                    boxShadow: '0px 0px 5px #aaaaaa'
                }}
            >
                <Typography variant="subtitle2" color="textPrimary">{data.label}</Typography>
                <Divider style={{ margin: '5px 0' }} />
                {payload.map((entry, index) => (
                    <Box key={`item-${index}`} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Icon icon='mdi:circle' fontSize='small' style={{ color: entry.color }} />
                        <Typography variant='body2' style={{ marginLeft: '5px' }}>{`${entry.name}: ${entry.value}`}</Typography>
                    </Box>
                ))}
            </div>
        );
    }

    return null;
};


const RechartsRadarChart = () => {
  return (
          <CardContent>
              <Box sx={{ height: 350 }}>
                  <ResponsiveContainer>
                      <RadarChart cx='50%' cy='50%' outerRadius='70%' data={data}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey='day' />
                          <PolarRadiusAxis angle={30} domain={[0, 'dataMax + 50']} />
                          <Radar name='Visites' dataKey='visits' stroke='#8884d8' fill='#8884d8' fillOpacity={0.6} />
                          <Tooltip content={<CustomTooltip />} />
                      </RadarChart>
                  </ResponsiveContainer>
              </Box>
          </CardContent>
  )
}

export default RechartsRadarChart
