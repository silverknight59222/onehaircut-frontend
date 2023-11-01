import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Line } from 'react-chartjs-2'
import { ChartData, ChartOptions } from 'chart.js'

interface LineProps {
  white: string
  primary: string
  secondary: string
  labelColor: string
  borderColor: string
  legendColor: string
}

const ChartjsLineChart = (props: LineProps) => {
  const { white, primary, secondary, labelColor, borderColor, legendColor } = props

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: labelColor },
        grid: {
          color: borderColor
        }
      },
      y: {
        min: 0,
        max: 400,
        ticks: {
          stepSize: 100,
          color: labelColor
        },
        grid: {
          color: borderColor
        }
      }
    },
    plugins: {
      legend: {
        align: 'end',
        position: 'top',
        labels: {
          padding: 25,
          boxWidth: 10,
          color: legendColor,
          usePointStyle: true
        }
      }
    }
  }

  const data: ChartData<'line'> = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
    datasets: [
      {
        fill: false,
        tension: 0.5,
        pointRadius: 1,
        label: 'Income',
        pointHoverRadius: 5,
        pointStyle: 'circle',
        borderColor: primary,
        backgroundColor: primary,
        pointHoverBorderWidth: 5,
        pointHoverBorderColor: white,
        pointBorderColor: 'transparent',
        pointHoverBackgroundColor: primary,
        data: [100, 250, 200, 350, 280, 180, 270, 310, 320, 290, 360, 340, 375, 390, 400]
      },
      {
        fill: false,
        tension: 0.5,
        label: 'New Clients',
        pointRadius: 1,
        pointHoverRadius: 5,
        pointStyle: 'circle',
        borderColor: secondary,
        backgroundColor: secondary,
        pointHoverBorderWidth: 5,
        pointHoverBorderColor: white,
        pointBorderColor: 'transparent',
        pointHoverBackgroundColor: secondary,
        data: [80, 180, 160, 270, 230, 150, 220, 250, 260, 240, 290, 280, 300, 320, 340]
      }
    ]
  }

  return (
      <Card>
        <CardHeader
            title='Revenue'
            subheader={
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <select>
                  <option value="thisMonth">This month</option>
                  {/* Add other month options here */}
                </select>
              </div>
            }
        />
        <CardContent>
          <Line data={data} height={400} options={options} />
        </CardContent>
      </Card>

  )
}

export default ChartjsLineChart
