// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from '@/@core/components/icon'

// ** Third Party Imports
import ReactApexcharts from 'react-apexcharts'; // Assuming the path is 'react-apexcharts'

// ** Custom Components Imports
import CustomChip from '@/@core/components/mui/chip'
// import ReactApexcharts from '@/@core/components/react-apexcharts'

const ApexLineChart = () => {
  // ** Hook
  const theme = useTheme()

  const series = [
    {
      data: [280, 200, 220, 180, 270, 250, 70, 90, 200, 150, 160, 100, 150, 100, 50]
    }
  ]

  const options: any = {
    chart: {
      parentHeightOffset: 0,
      zoom: { enabled: false },
      toolbar: { show: false },
      type: 'line',
    },
    colors: ['#FF4560', '#008FFB'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
      },
    },
    xaxis: {
      categories: [
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'
      ],
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: true,
      },
    },
    yaxis: {
      labels: {
        formatter: function (value: string) {
          return value + ' $';
        },
      },
      title: {
        text: 'Amount',
      },
    },
    tooltip: {
      theme: 'dark',
    },
    grid: {
      borderColor: theme.palette.divider,
    },
    legend: {
      horizontalAlign: 'left',
    },
    markers: {
      size: 0,
    },
  };


  return (
    <Card>
      <CardHeader
        title='Balance'
        subheader='Commercial networks & enterprises'
        sx={{
          flexDirection: ['column', 'row'],
          alignItems: ['flex-start', 'center'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
        action={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='h6' sx={{ mr: 5 }}>
              $221,267
            </Typography>
            <CustomChip
              skin='light'
              color='success'
              sx={{ fontWeight: 500, borderRadius: 1, fontSize: theme.typography.body2.fontSize }}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1 } }}>
                  <Icon icon='tabler:arrow-up' fontSize='1rem' />
                  <span>22%</span>
                </Box>
              }
            />
          </Box>
        }
      />
      <CardContent>
        <ReactApexcharts type='line' height={400} options={options} series={series} />
      </CardContent>
    </Card>
  )
}

export default ApexLineChart
