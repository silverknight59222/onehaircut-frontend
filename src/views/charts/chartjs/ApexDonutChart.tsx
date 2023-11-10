import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import ReactApexcharts from 'react-apexcharts'; // Assuming the path is 'react-apexcharts'

const ApexDonutChart = () => {

  // Hardcoded options for ApexCharts
  const options:any = {
    chart: {
      type: 'donut',
    },
    stroke: {
      width: 0
    },
    labels: ['Operational', 'Networking', 'Hiring', 'R&D'],
    colors: ['#fdd835', '#ffa1a1', '#826bf8', '#00d4bd'],
    dataLabels: {
      enabled: true,
      formatter: function(val: string) {
        return parseInt(val, 10) + "%";
      }
    },
    legend: {
      position: 'bottom',
      markers: {
        offsetX: -3
      },
      labels: {
        colors: 'gray' // Using hardcoded color for legend labels
      },
      itemMargin: {
        vertical: 3,
        horizontal: 10
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '1.2rem'
            },
            value: {
              fontSize: '1.2rem',
              color: 'gray', // Using hardcoded color for value labels
              formatter: function(val: string) {
                return parseInt(val, 10);
              }
            },
            total: {
              show: true,
              fontSize: '1.2rem',
              label: 'Operational',
              formatter: function() {
                return '31%';
              },
              color: 'black' // Using hardcoded color for total label
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1rem' // Hardcoded fontSize for small screens
                  },
                  value: {
                    fontSize: '1rem' // Hardcoded fontSize for small screens
                  },
                  total: {
                    fontSize: '1rem' // Hardcoded fontSize for small screens
                  }
                }
              }
            }
          }
        }
      }
    ]
  };

  // Hardcoded series data for the chart
  const series = [85, 16, 50, 50];

  return (
    <Card>
      <CardHeader
        title='Expense Ratio'
        subheader='Spending on various categories'
      />
      <CardContent>
        <ReactApexcharts type='donut' height={400} options={options} series={series} />
      </CardContent>
    </Card>
  );
}

export default ApexDonutChart;
