import { useTheme } from '@mui/material/styles'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import React, { forwardRef, useState, useEffect } from 'react'
import CustomTextField from '@/@core/components/mui/text-field'
import { format, getDaysInMonth, startOfMonth } from 'date-fns'
import { ApexOptions } from 'apexcharts'
import Icon from '@/@core/components/icon'
import { dashboard } from '@/api/dashboard'
import ReactApexcharts from '@/@core/components/react-apexcharts'

interface PickerProps {
    start: Date | number
    end: Date | number
}


const RevenueChart = React.memo(({ period }: any) => {
    const theme = useTheme()
    const [categories, setCategories] = useState<string[]>([]);

    const generateRandomData = (totalDays: number): number[] => {
        const data: number[] = [Math.floor(Math.random() * (2000 - 300 + 1)) + 300];
        for (let i = 1; i < totalDays; i++) {
            const previousValue = data[i - 1];
            const min = Math.max(previousValue - 500, 300);
            const max = Math.min(previousValue + 500, 2000);
            const newValue = Math.floor(Math.random() * (max - min + 1)) + min;
            data.push(newValue);
        }

        return data;
    };

    const [series, setSeries] = useState<any[]>([]);
    const [options, setOptions] = useState({
        chart: {
            parentHeightOffset: 0,
            toolbar: { show: false }
        },
        tooltip: { shared: false },
        dataLabels: { enabled: false },
        stroke: {
            show: true,
            curve: 'smooth'
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            labels: { colors: '#6E6E6E' },
            markers: {
                offsetY: 1,
                offsetX: -3
            },
            itemMargin: {
                vertical: 3,
                horizontal: 10
            }

        },
        colors: ['rgba(255, 70, 70, 0.9)', 'rgba(255, 200, 102, 0.95)', 'rgba(16, 161, 216, 0.90)'],
        grid: {
            show: true,
            borderColor: '#e0e0e0',
            xaxis: {
                lines: { show: true }
            }
        },
        yaxis: {
            labels: {
                formatter: (value: number) => `${value} €`,
                style: { colors: '#a9a9a9' }
            }
        },
        xaxis: {
            axisBorder: { show: false },
            axisTicks: { color: '#e0e0e0' },
            crosshairs: {
                stroke: { color: '#e0e0e0' }
            },
            labels: {
                style: { colors: '#a9a9a9' }
            },
            categories: categories,
        },

    } as ApexOptions);
    useEffect(() => {
        // const today = new Date();
        // const dayOfMonth = today.getDate();
        // const currentMonth = today.getMonth();
        // const currentYear = today.getFullYear();

        // const dateCategories = Array.from({ length: dayOfMonth }, (_, i) => {
        //     const date = new Date(currentYear, currentMonth, i + 1);
        //     return format(date, 'dd/MM');
        // });

        // setCategories(dateCategories);

        // const servicesData = generateRandomData(dayOfMonth);
        // const coiffuresData = generateRandomData(dayOfMonth);

        // const ventesTotalesData = servicesData.map((value, index) => {
        //     if (index < coiffuresData.length) {
        //         return value + coiffuresData[index];
        //     }
        //     return value;
        // });
    }, []);

    const fetchData = async (periodKey) => {
        const { data } = await dashboard.monthlyRevenueChart(periodKey)
        
        setOptions({
            chart: {
                parentHeightOffset: 0,
                toolbar: { show: false }
            },
            tooltip: { shared: false },
            dataLabels: { enabled: false },
            stroke: {
                show: true,
                curve: 'smooth'
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left',
                labels: { colors: '#6E6E6E' },
                markers: {
                    offsetY: 1,
                    offsetX: -3
                },
                itemMargin: {
                    vertical: 3,
                    horizontal: 10
                }

            },
            colors: ['rgba(255, 70, 70, 0.9)', 'rgba(255, 200, 102, 0.95)', 'rgba(16, 161, 216, 0.90)'],
            grid: {
                show: true,
                borderColor: '#e0e0e0',
                xaxis: {
                    lines: { show: true }
                }
            },
            yaxis: {
                labels: {
                    formatter: (value: number) => `${value} €`,
                    style: { colors: '#a9a9a9' }
                }
            },
            xaxis: {
                axisBorder: { show: false },
                axisTicks: { color: '#e0e0e0' },
                crosshairs: {
                    stroke: { color: '#e0e0e0' }
                },
                labels: {
                    style: { colors: '#a9a9a9' }
                },
                categories: data.categories,
            },

        })
        setSeries([
            {
                name: 'Ventes totales',
                data: data.total_sales,
                zIndex: 0,
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: "vertical",
                        shadeIntensity: 0.7,
                        gradientToColors: undefined,
                        inverseColors: false,
                        opacityFrom: 0.5,
                        opacityTo: 1,
                        stops: [0, 90, 100],
                        colorStops: [
                            {
                                offset: 0,
                                color: "color1",
                                opacity: 1
                            },
                            {
                                offset: 100,
                                color: "color2",
                                opacity: 0.5
                            }
                        ]
                    }
                }
            },
            {
                name: 'Services',
                data: data.totalServicePrice,
                zIndex: 2,
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: "vertical",
                        shadeIntensity: 0.7,
                        gradientToColors: undefined,
                        inverseColors: false,
                        opacityFrom: 0.5,
                        opacityTo: 1,
                        stops: [0, 70, 100],
                        colorStops: [
                            {
                                offset: 0,
                                color: "color1",
                                opacity: 1
                            },
                            {
                                offset: 100,
                                color: "color2",
                                opacity: 0.5
                            }
                        ]
                    }
                }
            },
            {
                name: 'Coiffures',
                data: data.hairCurPrice,
                zIndex: 1,
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: "vertical",
                        shadeIntensity: 0.7,
                        gradientToColors: undefined,
                        inverseColors: false,
                        opacityFrom: 0.5,
                        opacityTo: 1,
                        stops: [0, 80, 100],
                        colorStops: [
                            {
                                offset: 0,
                                color: "color1",
                                opacity: 1
                            },
                            {
                                offset: 100,
                                color: "color2",
                                opacity: 0.5
                            }
                        ]
                    }
                }
            }
        ]);
    }

    useEffect(() => {
        let periodKey = "month"
        switch (period) {
            case "Ce mois":
                periodKey = "month"
                break;
            case "3 derniers mois":
                periodKey = "3_month"
                break;
            case "Cette année":
                periodKey = "year"
                break;
        }
        fetchData(periodKey)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [period])

    return (
        <CardContent>
            <ReactApexcharts width={"100%"} type='area' height={400} options={options} series={series} />
        </CardContent>
    )

});

export default RevenueChart
