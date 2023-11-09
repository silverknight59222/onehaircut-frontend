// ** React Imports
// ** MUI Imports
import { useTheme } from '@mui/material/styles'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import { forwardRef, useState, useEffect } from 'react' // Ajouté useEffect

// ** Custom Component Import
import CustomTextField from '@/@core/components/mui/text-field'

// ** Third Party Imports
import { format, getDaysInMonth, startOfMonth } from 'date-fns' // importing required functions from date-fns
import { ApexOptions } from 'apexcharts'

// ** Icon Imports
import Icon from '@/@core/components/icon'


// ** Component Import
import ReactApexcharts from 'react-apexcharts'; // Assuming the path is 'react-apexcharts'

interface PickerProps {
    start: Date | number
    end: Date | number
}


const ApexAreaChart = () => {
    // ** States
    // ** Hook
    const theme = useTheme()
    // État local pour les catégories de l'axe des x
    const [categories, setCategories] = useState<string[]>([]);



    //RANDOM DATA TODO : REMOVE WHEN LINKED WITH TRUE DATA

    // Générer des valeurs aléatoires pour les jours jusqu'à aujourd'hui dans le mois actuel
    const generateRandomData = (totalDays: number): number[] => {
        const data: number[] = [Math.floor(Math.random() * (2000 - 300 + 1)) + 300]; // Premier valeur aléatoire
        for (let i = 1; i < totalDays; i++) {
            // Calcul de la valeur précédente
            const previousValue = data[i - 1];
            // Déterminer le minimum et le maximum pour la variation de 500
            const min = Math.max(previousValue - 500, 300);
            const max = Math.min(previousValue + 500, 2000);
            // Ajouter une nouvelle valeur aléatoire basée sur la précédente
            const newValue = Math.floor(Math.random() * (max - min + 1)) + min;
            data.push(newValue);
        }
        return data;
    };



    // Utiliser un useEffect pour créer les séries avec des valeurs aléatoires
    const [series, setSeries] = useState<any[]>([]); // 'any[]' ou vous pouvez définir un type plus spécifique pour les séries
    useEffect(() => {
        const today = new Date();
        const dayOfMonth = today.getDate();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();

        // Créer un tableau de dates pour chaque jour à partir du premier du mois jusqu'à aujourd'hui
        const dateCategories = Array.from({ length: dayOfMonth }, (_, i) => {
            // Notez que getDay() renvoie le jour de la semaine, donc utilisez getDate() ici
            const date = new Date(currentYear, currentMonth, i + 1);
            return format(date, 'dd/MM'); // ou 'dd/MM' selon le format de date souhaité
        });

        // Mettre à jour les catégories avec les dates générées
        setCategories(dateCategories);

        // Générer les données pour les deux premières séries
        const servicesData = generateRandomData(dayOfMonth);
        const coiffuresData = generateRandomData(dayOfMonth);

        // Calculer les données pour la troisième série comme étant la somme des deux premières
        const ventesTotalesData = servicesData.map((value, index) => {
            // S'assurer que l'index existe aussi dans coiffuresData avant d'ajouter
            if (index < coiffuresData.length) {
                return value + coiffuresData[index];
            }
            return value;
        });


        //DATA CHART DESIGN
        setSeries([
            {
                name: 'Ventes totales',
                data: ventesTotalesData,
                zIndex: 0, // La série des sommes avec le plus petit zIndex pour qu'elle soit en arrière-plan
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: "vertical",
                        shadeIntensity: 0.7,
                        gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
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
                data: servicesData,
                zIndex: 2,
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: "vertical",
                        shadeIntensity: 0.7,
                        gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
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
                data: coiffuresData,
                zIndex: 1,
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: "vertical",
                        shadeIntensity: 0.7,
                        gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
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
    }, []);


    //MORE DESIGN AND COLORS SETTINGS
    const options: any = {
        chart: {
            parentHeightOffset: 0,
            toolbar: { show: false }
        },
        tooltip: { shared: false },
        dataLabels: { enabled: false },
        stroke: {
            show: true,  // Définir `true` pour afficher la ligne
            curve: 'smooth'  // Modifier ici pour lisser la ligne
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
        colors: ['rgba(255, 70, 70, 0.9)', 'rgba(255, 200, 102, 0.95)', 'rgba(16, 161, 216, 0.90)'], // replaced variables with actual color hex values
        grid: {
            show: true,
            borderColor: '#e0e0e0', // hardcoding a light gray border color
            xaxis: {
                lines: { show: true }
            }
        },
        yaxis: {
            labels: {
                formatter: (value: number) => `${value} €`, // Formatter pour ajouter le symbole euro
                style: { colors: '#a9a9a9' } // Couleurs de texte pour l'axe des y
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
            categories: categories, // Utiliser les catégories générées pour les dates
        },

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
