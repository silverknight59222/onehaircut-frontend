"use client";
import Navbar from '@/components/shared/Navbar'
import React, { useEffect, useState } from 'react'
import '../dashboard/Dashboard/Services/index.css'
import { Like, StarGreyIcon, StarIcon } from '@/components/utilis/Icons';
import Image from 'next/image';
import StarRatings from 'react-star-ratings';
import { useRouter } from 'next/navigation';
import { dashboard } from '@/api/dashboard';
import { getLocalStorage, setLocalStorage } from '@/api/storage';
import { SalonDetails } from '@/types';
import userLoader from "@/hooks/useLoader";
import useSnackbar from '@/hooks/useSnackbar';
import { GoogleMap, MarkerF, OverlayView, LoadScriptProps, useLoadScript, OverlayViewF } from '@react-google-maps/api';
import { ColorsThemeA, Theme_A } from '@/components/utilis/Themes';
import { BackArrow } from '@/components/utilis/Icons';
import Footer from '@/components/UI/Footer';
import MapIcon from "@/components/utilis/Icons";
import { MapIconRed } from '@/components/utilis/Icons';
import { HomeIcon } from '@/components/utilis/Icons';
import ReactDOMServer from 'react-dom/server';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { salonApi } from '@/api/salonSide';
import BaseModal from '@/components/UI/BaseModal';
import CustomInput from '@/components/UI/CustomInput';

// TODO IMPORT TO USE ADRESSES 
//import axios from 'axios'; 

const libraries: LoadScriptProps["libraries"] = ["places"]
// Composant principal SalonChoice
const SalonChoice = () => {

    // Déclaration des états locaux
    const [selectedSalon, setSelectedSalon] = useState<{ name: string, id: number | null }>({ name: '', id: null })
    const [salonImage, setSalonImage] = useState<string[]>([])
    const [salons, setSalons] = useState<SalonDetails[]>([])
    const [filteredSalons, setFilteredSalons] = useState<SalonDetails[]>([]);

    const router = useRouter();
    let user = getLocalStorage("user");
    const userData = user ? JSON.parse(user) : null;
    const userId = user ? Number(JSON.parse(user).id) : null;
    const getHaircut = getLocalStorage("haircut") as string;
    const haircut = getHaircut ? JSON.parse(getHaircut) : null;

    const [isLoading, setIsLoading] = useState(true);
    const { loadingView } = userLoader();
    const showSnackbar = useSnackbar();
    const [location, setLocation] = useState({ lat: 47.18052966583263, lng: 7.358082527907601 });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [wishlist, setWishlist] = useState<string[]>([])
    const [citySearch, setCitySearch] = useState<any>(null);
    const [nameSearch, setNameSearch] = useState<string>('');
    const [filteredMobile, setFilteredMobile] = useState<string[]>([]);
    const [filtereRange, setRangeFilter] = useState([2, 100]);
    const [ratingFilter, setRatingFilter] = useState<number[]>([1, 2, 3, 4, 5]);
    const [countryFilter, setCountryFilter] = useState<string>("");
    const [availabilityFilter, setAvailabilityFilter] = useState<string[]>([]);
    const [newSalonFilter, setNewSalonFilter] = useState(true);
    const [positions, setPositions] = useState<Position[]>([])
    const [center, setCenter] = useState<Position>()
    const [map, setMap] = useState<google.maps.Map>();


    const [mapBound, setMapBound] = useState<any>();
    const [allowScroll, setAllowScroll] = useState(false)
    const [showMarker, setShowMarker] = useState(true)

    const getCurrentDimension = () => {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }

    const [screenSize, setScreenSize] = useState(getCurrentDimension());

    useEffect(() => {
        const updateDimension = () => {
            setScreenSize(getCurrentDimension())
        }
        window.addEventListener('resize', updateDimension);

        return (() => {
            window.removeEventListener('resize', updateDimension);
        })
    }, [screenSize])


    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAJiOb1572yF7YbApKjwe5E9L2NfzkH51E',
        libraries,
    })
    const getMapCenter = (positions: Positions): Position => {
        let totalLat = 0;
        let totalLng = 0;
        positions.forEach(pos => {
            totalLat += pos.lat;
            totalLng += pos.lng;
        });
        //console.log('lenght ', positions.length)
        if (positions.length > 1) {
            return {
                lat: totalLat / positions.length,
                lng: totalLng / positions.length,
            };
        } else {
            return {
                lat: totalLat,
                lng: totalLng,
            };
        }

    };

    useEffect(() => {
        if (positions.length > 0) {
            recalculateMap();
        }
    }, [positions])

    const recalculateMap = () => {
        if (map) {
            const bounds = new google.maps.LatLngBounds();
            positions.forEach(pos => {
                bounds.extend(new google.maps.LatLng({ lat: pos.lat, lng: pos.lng }))
            })
            //setMapBound(areaBounds)
            map.fitBounds(bounds);
        }
    }

    const filteredCityHandler = async () => {
        //const filteredSalons = salons
        let filteredSalonsFunc = salons.filter((salon) => {
            const cityNameMatches = citySearch
                ? salon.address.city.toLowerCase().includes(citySearch.toLowerCase())
                : true; // If citySearch is empty, consider it as a match

            const salonNameMatches = nameSearch
                ? salon.name.toLowerCase().includes(nameSearch.toLowerCase())
                : true; // If nameSearch is empty, consider it as a match

            const salonMobileMatches =
                filteredMobile.length === 0 ||
                filteredMobile.includes(salon.is_mobile.toLowerCase());

            const salonInRange = filtereRange[0] <= salon.final_price && salon.final_price <= filtereRange[1];
            const salonInRating = (ratingFilter.length === 0) || ((ratingFilter.length > 0) && (ratingFilter.includes(salon.rating))) || (newSalonFilter && salon.rating === 0);
            const salonInCountry = (countryFilter === '') || (salon.address.country === countryFilter);
            const frenchToEnglishMapping = {
                'Lundi': 1,
                'Mardi': 2,
                'Mercredi': 3,
                'Jeudi': 4,
                'Vendredi': 5,
                'Samedi': 6,
                'Dimanche': 0
            };
            let salonAvailable = true;


            for (const day of availabilityFilter) {
                salonAvailable = salon.openTimes[frenchToEnglishMapping[day]].available;
                if (salonAvailable) {
                    break;
                }
            }

            return (
                cityNameMatches &&
                salonNameMatches &&
                salonMobileMatches &&
                salonInRange &&
                salonInRating &&
                salonInCountry &&
                salonAvailable
            );
        });
        setFilteredSalons(filteredSalonsFunc);
    };

    // useEffect(() => {
    //     console.log(filteredSalons)
    //     setFilteredSalons(filteredSalons)
    // }, [filteredSalons])

    function timeout(delay: number) {
        return new Promise(res => setTimeout(res, delay));
    }

    const dayDict: { [key: string]: string } = {
        'Lundi': 'MONDAY',
        'Mardi': 'TUESDAY',
        'Mercredi': 'WEDNESDAY',
        'Jeudi': 'THURSDAY',
        'Vendredi': 'FRIDAY',
        'Samedi': 'SATURDAY',
        'Dimanche': 'SUNDAY'
    }

    const getAvailEnglish = (): String[] => {
        const result: string[] = []
        availabilityFilter.forEach((each) => {
            result.push(dayDict[each])
        })

        console.log('avail english', result)
        return result
    }

    const getAvailEnglishUP = (user_preferences_availability): String[] => {
        const result: string[] = []
        user_preferences_availability.forEach((each) => {
            result.push(dayDict[each])
        })
        return result
    }

    const getCoordinates = (salons) => {
        //console.log('filtered salons', filteredSalons)
        const positionArray: Position[] = []
        salons.forEach(fsalon => {
            if (fsalon.address.lat && fsalon.address.long) {
                positionArray.push({ lat: Number(fsalon.address.lat), lng: Number(fsalon.address.long) })
            }
        })

        console.log('position array', positionArray)

        // recalculateMap(positionArray)
        if (positionArray.length > 0) {

            setPositions(positionArray)
            const tempCenter: Position = getMapCenter(positionArray)
            setCenter(tempCenter);
            setAllowScroll(true)
        }
        else {
            const userPos: Position = { lat: parseFloat(userData?.lat), lng: parseFloat(userData?.long) }
            console.log('userPos', userData);
            setPositions([userPos])
            setCenter(userPos)
            setAllowScroll(false)
        }

    }
    // Fonction pour récupérer tous les salons
    const getAllSalons = async () => {
        const services = getLocalStorage('ServiceIds')
        const user = getLocalStorage("user");
        const hair_length = user ? String(JSON.parse(user).hair_length) : "";
        const servicesData = services ? JSON.parse(services) : []
        const serviceIds: number[] = []
        servicesData.forEach((service: { name: string, id: number }) => {
            serviceIds.push(service.id)
        })
        // Code pour obtenir des informations sur les salons depuis l'API
        setIsLoading(true);

        let data = {
            servicesIds: serviceIds,
            haircut_id: 0,
            hair_length: hair_length,
            client_id: user ? JSON.parse(user).id : 0,
        }
        if (haircut) {
            data['haircut_id'] = haircut.id
        }
        console.log('salon data', data)
        let allSalon;
        await dashboard.getSalonsByHaircut(data)
            .then((res) => {
                const orderedSalons = res.data.data.slice().sort((a, b) => b.wishlist - a.wishlist);
                console.log('all salon', res.data.data)
                setSalons(orderedSalons);
                setFilteredSalons(orderedSalons);
                allSalon = res.data.data;
                getCoordinates(res.data.data)
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                //console.log('salon error',error)
            })
        if (userData?.user_preferences?.salon_filter) {
            console.log("USER PREF SALON FILTER YES");
            console.log(allSalon);
            const user_preferences = userData.user_preferences;
            let translated = getAvailEnglishUP(user_preferences.availability)
            let filteredSalon = allSalon.filter((item) => {
                if (
                    (user_preferences.country != null && (item.address.country == user_preferences.country)) &&
                    (user_preferences.budget != null && (item.final_price >= user_preferences.budget[0] && item.final_price <= user_preferences.budget[1])) &&
                    (user_preferences.hairdressing_at_home != null && (item.is_mobile == ((user_preferences.hairdressing_at_home == 1) ? "yes" : "no"))) &&
                    (user_preferences.postal_code == null || user_preferences.postal_code && (item.postal_code == user_preferences.postal_code)) &&
                    (user_preferences.ratings && (item.rating >= user_preferences.ratings && item.rating <= user_preferences.max_ratings)) &&
                    (user_preferences.availability != null && translated.every(day => item.openTimes.some(item => item.day.toUpperCase() === day.toUpperCase())))
                ) {
                    return item;
                }
            })
            console.log("FILTERED SALON")
            console.log(filteredSalon)
            setFilteredSalons(filteredSalon)
        }
    }
    // Fonction pour obtenir la liste de souhaits des salons
    const getSalonsWishlist = () => {
        if (userId) {
            setIsLoading(true);
            dashboard.getSalonsWishlist(userId)
                .then((res) => {
                    if (res.data.data) {
                        if (salons.length) {
                            const arr: string[] = []
                            res.data.data.forEach((item: any) => {
                                salons.forEach((salon) => {
                                    if (item.hairsalon.id === salon.id) {
                                        arr.push(String(salon.id))
                                    }
                                })
                            });
                            setWishlist(arr)
                        }
                    }
                    setIsLoading(false);
                })
                .catch(error => {
                    setIsLoading(false);
                })
        }
    }

    // Modal for customer to be patient for new salon to come
    const [isCustomerInfoModalOpen, setIsCustomerInfoModalOpen] = useState(false);
    // Logique pour ouvrir le modal si le nombre de salons est inférieur à 6
    useEffect(() => {
        if (!isLoading && filteredSalons.length > 0 && filteredSalons.length < 10) {
            setIsCustomerInfoModalOpen(true);
        }
    }, [isLoading, filteredSalons.length]);

    // Fonction pour fermer le modal
    const closeModalCustomerInfo = () => {
        setIsCustomerInfoModalOpen(false);
    };
    const [guestEmail, setGuestEmail] = useState(''); // État pour stocker l'email de l'invité
    // Fonction pour gérer le changement de l'adresse email 
    // TODO Save email address for newsletters
    const handleGuestEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGuestEmail(e.target.value);
    };
    const saveToNewsLetters = async () => {
        // TODO : Ici, vous pouvez implémenter la logique pour envoyer l'email à votre serveur
        // ou à un service de newsletter, puis l'ajouter à la base de données.
        closeModalCustomerInfo();
    }

    const handleAllFilter = async () => {

        setIsLoading(true)

        console.log('citySearch', citySearch)
        console.log('nameSearch', nameSearch)
        console.log('filteredMobile', filteredMobile)
        console.log('filtereRange', filtereRange)
        console.log('ratingFilter', ratingFilter)
        console.log('countryFilter', countryFilter)
        console.log('availabilityFilter', availabilityFilter)
        console.log('newSalonFilter', newSalonFilter)
        // console.log('haircutID', haircut.id)

        const services = getLocalStorage('ServiceIds')
        const servicesData = services ? JSON.parse(services) : []
        const serviceIds: number[] = []
        servicesData.forEach((service: { name: string, id: number }) => {
            serviceIds.push(service.id)
        })
        const param = {
            client_id: userData !== null ? userData.id : null,
            haircut_id: haircut !== null ? haircut.id : null,
            services: serviceIds,
            citySearch: citySearch,
            nameSearch: nameSearch,
            filteredMobile: filteredMobile,
            filtereRange: filtereRange,
            ratingFilter: ratingFilter,
            countryFilter: (countryFilter && countryFilter !== 'null') ? countryFilter : '',
            availabilityFilter: getAvailEnglish(),
            newSalonFilter: newSalonFilter
        }

        console.log('result iss parma', JSON.stringify(param))

        const result = await salonApi.filterSalon(param)

        console.log('result iss', result)

        if (result.data.status === 200) {
            setSalons(result.data.data);
            setFilteredSalons(result.data.data);
            getCoordinates(result.data.data)
        }

        setIsLoading(false)

    }

    // Fonction pour ajouter/supprimer des salons à la liste de souhaits
    const onWishlist = async (e: any, salonId: number) => {
        e.stopPropagation()
        if (userId) {
            let data = {
                user_id: userId,
                hair_salon_id: salonId
            }
            if (wishlist.includes(String(salonId))) {
                await dashboard.removeFromSalonWishList(salonId, userId)
                    .then(() => {
                        getSalonsWishlist()
                        showSnackbar('success', 'Remove From Wishlist Successfully!')
                    })
                    .catch(error => {
                        showSnackbar('error', 'Error Occured!')
                    })
            }
            else {
                await dashboard.addSalonWishList(data)
                    .then(response => {
                        getSalonsWishlist()
                        showSnackbar('success', 'Added To Wishlist Successfully!')
                    })
                    .catch(err => console.log(err))
            }
        }
    }

    // Fonction pour continuer avec le salon sélectionné
    const onContinue = () => {
        setLocalStorage('selectedSalon', JSON.stringify(selectedSalon))
        router.push(`salon/profile`)
    }

    const getFilteredSalon = () => {
        handleAllFilter()
    }

    // Utilisation de useEffect pour récupérer les données lors du montage du composant
    useEffect(() => {
        getAllSalons()
        // if(userData.user_preferences.salon_filter){
        //     getFilteredSalon()
        // }
        // else {
        // }
        const user = getLocalStorage("user");
        const userId = user ? Number(JSON.parse(user).id) : null;
        if (!userId) {
            setIsLoggedIn(true);
        }
    }, [])

    // Autre appel useEffect basé sur l'état des salons
    // useEffect(() => {
    //     if (!isLoggedIn) {
    //         getSalonsWishlist()
    //     }
    // }, [salons])
    const doFilter = async () => {
        // await timeout(100)
        // timeout(500)
        console.log('filtering')
        // filteredCityHandler()
        getCoordinates(filteredSalons)
        // const delayTime = 1000;
        // const timeoutId = setTimeout(delayedFunction, delayTime);
        // return () => clearTimeout(timeoutId);
    }
    // useEffect(() => {
    //     const delay = setTimeout(()=>{
    //         doFilter()
    //     },1000)
    //     return () => clearTimeout(delay)
    // }, [filtereRange])

    // useEffect(() => {
    //     // const delay = setTimeout(()=>{
    //     //     // doFilter()
    //     // },1000)

    //     // filteredCityHandler()
    //     getCoordinates(filteredSalons)

    //     // return () => clearTimeout(delay)
    // }, [citySearch, nameSearch, filteredMobile, filtereRange, ratingFilter, countryFilter, availabilityFilter, newSalonFilter, salons])

    if (!isLoaded) {
        return loadingView()
    }

    // Définir un type pour une position individuelle
    type Position = {
        lat: number;
        lng: number;
    };

    // Définir un type pour un tableau de positions
    type Positions = Position[];


    // Utilisation
    // const center = getMapCenter(positions);

    // MARQUEUR PERSONNALISE
    const mapIconSvg = ReactDOMServer.renderToStaticMarkup(<MapIcon />);
    const MapIconRedSvg = ReactDOMServer.renderToStaticMarkup(<MapIconRed />);
    const mapIconUrl = `data:image/svg+xml;base64,${btoa(mapIconSvg)}`;
    const MapIconRedUrl = `data:image/svg+xml;base64,${btoa(MapIconRedSvg)}`;

    // const mapIconUrl = `https://api.onehaircut.com/dummy-logo.png`;
    // const MapIconRedUrl = `https://api.onehaircut.com/dummy-logo.png`;
    //https://api.onehaircut.com/dummy-logo.png
    const MAX_MARKERS = 15;

    const handleOnLoad = (map) => {
        const bounds = new google.maps.LatLngBounds();
        positions.forEach(pos => {
            bounds.extend(new google.maps.LatLng({ lat: pos.lat, lng: pos.lng }))
        })

        // setMapBound(bounds)
        map.fitBounds(bounds);
        map.setCenter(bounds.getCenter())
        setMap(map)
    };
    type Salon = {
        name: string;
        id: number;
    };

    const getMarkerIconUrl = () => {
        const svgString = encodeURIComponent(ReactDOMServer.renderToString(<HomeIcon />));
        return `data:image/svg+xml,${svgString}`;
    };

    // Dans votre composant de carte
    const HomeIconUrl = getMarkerIconUrl();

    console.log(userData?.lat!, userData?.long!);

    const handleZoomChange = () => {
        const ZOOM_THRESHOLD = 8
        if (map) {
            const zoom = map.getZoom() ?? 10
            console.log('zoom', zoom)
            if (zoom < ZOOM_THRESHOLD) {
                setShowMarker(false)
            }
            else {
                setShowMarker(true)
            }
        }
    }

    // function giving the height of the google map depending on the size of the screen
    const getFilteredHeight = () => {
        if (screen.width >= 1024) {
            return '70vh';  // 70% of the screen
        } else {
            return '35vh';  // 35% of the screen
        }
    }

    // give back the height of the thumbnails 
    const getHeightThumbnails = () => {
        let result: number | string

        if (screen.width < 640) {
            result = screen.height / 2
        }
        else if (screen.width < 1024) {
            result = '35vh' // 35% of the screen
        }
        else {
            result = '70vh' // 70% of the screen
        }
        console.log('screen width', screen.width)
        console.log('result', result)
        return result
    }

    const getFontSize = (price: number) => {
        const text = price.toString();
        if (text.length >= 3) {
            return `${(3 / text.length) + 0.2}rem`
        }
        else {
            return '1.125rem'
        }
    }



    // Rendu du composant
    return (
        <div className='w-full h-screen  overflow-hidden'>
            {/* Entête du composant */}
            {/* <Navbar isSalonPage={true} /> */}
            <Navbar
                isSalonPage={true}
                onSearch={handleAllFilter}
                onCityMapSearch={(value: any) => {
                    console.log('map search', value.geometry.location.lat())
                    const cityParam = {
                        lat: value.geometry.location.lat(),
                        long: value.geometry.location.lng()
                    }
                    setCitySearch(cityParam)
                    // setCitySearch((pre) => {
                    //     if (value != pre) {
                    //         return value
                    //     }
                    //     return pre
                    // })
                }}
                onNameSearch={(value: string) => {
                    setNameSearch((pre) => {
                        if (value != pre) {
                            return value
                        }
                        return pre
                    })
                }}
                onMobileFilters={(mobile) => {
                    setFilteredMobile((pre) => {
                        if (mobile == "") {
                            return []
                        }
                        if (JSON.stringify([mobile]) != JSON.stringify(pre)) {
                            return [mobile]
                        }
                        return pre
                    })
                }}
                onRangeFilters={(range: string[]) => {
                    const numberArray = range.map(item => parseInt(item, 10));
                    setRangeFilter((pre) => {
                        if (JSON.stringify(numberArray) != JSON.stringify(pre)) {
                            return numberArray
                        }
                        return pre
                    });
                }}
                onRatingFilter={(rating: number[]) => setRatingFilter(rating)}
                onCountryFilter={(country: string) => setCountryFilter(country)}
                onAvailabilityFilter={(availability: string[]) => setAvailabilityFilter(availability)}
                onNewSalonFilter={(newSalon: boolean) => setNewSalonFilter(newSalon)}
            />

            {/* Corps du composant */}
            <div className='w-full flex-col items-center justify-center px-6'>
                {isLoading && loadingView()}

                {/* Texte indiquant le nombre de salons */}
                <p className='text-md lg:text-4xl font-medium text-black text-center md:mt-6'>
                    {filteredSalons.length} <span className='font-bold text-gradient'>{filteredSalons.length === 1 ? 'Salon' : 'Salons'}</span> {filteredSalons.length === 1 ? 'correspond' : 'correspondent'} à vos critères
                </p>

                {/* Bouton retour et continuer */}
                <div className='w-full flex items-end justify-between mt-2 md:mt-4 px-4'>
                    {/* Bouton pour retourner aux services */}
                    <div className='flex items-center cursor-pointer md:mt-4 mb-2 sm:mx-10 2xl:mx-14 text-stone-800' onClick={() => router.push('/services')}>
                        <BackArrow />
                        <p className={`text-xs md:text-xl text-stone-600 justify-center font-medium`}>Retour aux services</p>
                    </div>

                    {/* Bouton pour continuer */}
                    <button disabled={!selectedSalon.id} onClick={onContinue}
                        className={`flex items-center justify-center text-lg text-white font-medium w-full md:w-52 h-10 md:h-14 rounded-xl px-4 ${selectedSalon.id ? Theme_A.button.medLargeGradientButton : 'bg-[#D9D9D9]'}`}>
                        Continuer
                    </button>
                </div>

                {/***************************************************************************************************************************************************************************************************************** */}

                {/* Conteneur principal pour les salons et la carte */}
                {isLoaded && positions.length > 0 &&
                    <div
                        className='w-full lg:h-screen mt-4  grid grid-rows-1 lg:grid-cols-2 gap-0 lg:gap-3 content-start '>

                        {/* Carte Google affichée uniquement si des salons sont disponibles */}
                        {
                            positions.length > 0 &&
                            <div
                                style={{ height: getFilteredHeight() }}
                                className={` lg:top-0 lg:left-0 w-full rounded-lg overflow-hidden lg:z-10`}>

                                {/*TODO USE salon.position when data are available  */}
                                <GoogleMap
                                    onLoad={handleOnLoad}
                                    center={center}
                                    //zoom={8}
                                    mapContainerStyle={{ width: '100%', height: '100%' }}
                                    onZoomChanged={handleZoomChange}
                                    options={{
                                        minZoom: 2,  // ici, définissez votre zoom minimum
                                        maxZoom: 18,   // et ici, votre zoom maximumyy
                                        scrollwheel: allowScroll
                                    }}
                                >
                                    {(userData?.lat! && userData?.long && showMarker) && (
                                        <MarkerF
                                            position={{ lat: parseFloat(userData?.lat), lng: parseFloat(userData?.long) }}
                                            options={{
                                                icon: {
                                                    url: HomeIconUrl,
                                                    scaledSize: new window.google.maps.Size(50, 50),
                                                    anchor: new window.google.maps.Point(25, 25),
                                                }
                                            }}

                                        />
                                    )}

                                    {(filteredSalons.length > 0 && showMarker) && positions.map((position, index) => {
                                        console.log('filtered salon pos', position)
                                        return (
                                            <React.Fragment key={index}>

                                                <MarkerF
                                                    key={index}
                                                    // lat={positions[index].lat}
                                                    // lng={positions[index].lng}
                                                    position={{ lat: position.lat, lng: position.lng }} // Utiliser la position du salon
                                                    onClick={() => setSelectedSalon(filteredSalons[index] != null ? filteredSalons[index] : { "name": "Null", "id": 0 })}
                                                    options={
                                                        {
                                                            icon: {
                                                                url: filteredSalons[index]?.id === selectedSalon.id ? MapIconRedUrl : mapIconUrl,
                                                                scaledSize: filteredSalons[index]?.id === selectedSalon.id ? new window.google.maps.Size(70, 90) : new window.google.maps.Size(60, 80),
                                                                origin: new window.google.maps.Point(0, -10),
                                                                anchor: filteredSalons[index]?.id === selectedSalon.id ? new window.google.maps.Point(25, 37) : new window.google.maps.Point(20, 35),

                                                            }
                                                        }
                                                    }
                                                    zIndex={filteredSalons[index]?.id === selectedSalon.id ? 4 : 3}

                                                />
                                                <OverlayViewF
                                                    key={selectedSalon.id}
                                                    position={position}
                                                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                                                    getPixelPositionOffset={(width, height) => ({ x: width - 20, y: height - 15 })}
                                                >
                                                    <div style={{
                                                        color: filteredSalons[index]?.id === selectedSalon.id ? "#FFF" : "#000",
                                                        whiteSpace: 'nowrap',
                                                        fontSize: filteredSalons[index]?.id === selectedSalon.id ? '12px' : "12px",
                                                        fontWeight: 'bold',
                                                        zIndex: filteredSalons[index]?.id === selectedSalon.id ? 2 : 1,
                                                    }}>
                                                        {`${filteredSalons[index]?.final_price}€`}

                                                    </div>
                                                </OverlayViewF>
                                            </React.Fragment>
                                        )
                                    })}
                                </GoogleMap>
                            </div>
                        }

                        {/* Grid containing thumbnails */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6 pb-52 lg:pb-36 overflow-y-scroll content-start overflow-x-hidden"
                            style={{ maxHeight: getHeightThumbnails() }}
                        >
                            {/* VIGNETTES (ITERATIONS) */}
                            {filteredSalons.length > 0 && filteredSalons.map((fsalon, index) => {
                                return (
                                    <div
                                        key={index}
                                        id={`Vignette-${index}`}
                                        onClick={() => setSelectedSalon(fsalon)}
                                        className={`relative flex w-full w-max[450px] h-56 h-max[300px] bg-stone-100 rounded-2xl border hover:border-stone-400 cursor-pointer ${selectedSalon.id === fsalon.id && 'border-4 border-red-400 shadow-xl'}`}
                                    >

                                        {/* Modal qui s'affiche si moins de 10 salons */}
                                        {isCustomerInfoModalOpen && (
                                            <BaseModal close={closeModalCustomerInfo} opacity={20}>
                                                <div className="text-center">
                                                    <h2 className="text-3xl font-bold mb-4 text-gradient">Onehaircut est en plein essor !</h2>
                                                    <p className="mb-8">
                                                        Il y a moins de 10 salons qui correspondent à vos critères.<br />
                                                        Nous travaillons activement pour ajouter plus de salons.<br />
                                                    </p>
                                                    <p className="mb-8 font-semibold">Merci de votre patience et de votre soutien !</p>

                                                    {/* Afficher l'input uniquement si l'utilisateur n'est pas connecté */}
                                                    {isLoggedIn && (
                                                        <div className="flex-grow mb-4">
                                                            <CustomInput
                                                                id="email"
                                                                label="Adresse e-mail"
                                                                value={guestEmail}
                                                                onChange={handleGuestEmail}
                                                                type="text"
                                                                isEmail={true}
                                                            />
                                                        </div>
                                                    )}

                                                    {/* Conteneur flex pour les boutons */}
                                                    <div className="flex justify-center items-center space-x-4 mt-8">
                                                        {/* Bouton Fermer */}
                                                        <button
                                                            className={`${Theme_A.button.medBlackColoredButton}`}
                                                            onClick={closeModalCustomerInfo}
                                                        >
                                                            Fermer
                                                        </button>

                                                        {/* Afficher le bouton "Me tenir informé" uniquement si l'utilisateur n'est pas connecté */}
                                                        {isLoggedIn && (
                                                            <button
                                                                disabled={!guestEmail} // Désactiver le bouton si guestEmail est vide
                                                                className={`${guestEmail ? Theme_A.button.mediumGradientButton : Theme_A.button.medGreyColoredButton} text-white font-bold py-2 px-4 rounded`} // Changer la classe en fonction de l'état du bouton
                                                                onClick={saveToNewsLetters}
                                                            >
                                                                Me tenir informé
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </BaseModal>
                                        )}



                                        {selectedSalon.id === fsalon.id && (
                                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white border-2 border-red-400 rounded-full mx-10 px-1">
                                                {/* Mettez ici le style pour l'icône, vous pourriez avoir besoin d'ajuster le translate-y pour la centrer comme vous le souhaitez */}
                                                <CheckOutlinedIcon style={{ color: 'red', width: '15px', height: '15px' }} />
                                            </div>
                                        )}

                                        {/* Contenu de la vignette */}
                                        <div className="flex flex-col p-1 md:p-2 shadow-md rounded-2xl " style={{ flexGrow: 1 }}>
                                            <div className='relative mb-1 md:mb-4 hover:scale-105 transition duration-1000 m-2' style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {!isLoggedIn &&
                                                    <div onClick={(e) => onWishlist(e, fsalon.id)} className="absolute right-6 sm:right-2 top-6 sm:top-2 z-10 cursor-pointer">
                                                        <StarIcon width='35' height='35'
                                                            color={wishlist.includes(String(fsalon.id)) || fsalon.wishlist == 1 ? "#FF5B5B" : ""}
                                                            stroke={wishlist.includes(String(fsalon.id)) || fsalon.wishlist == 1 ? "#FFFFFF" : ""} />
                                                    </div>}

                                                {fsalon && fsalon.salon_cover_image &&
                                                    <Image
                                                        src={fsalon && fsalon.salon_cover_image ? fsalon.salon_cover_image?.image?.includes('api') ? fsalon.salon_cover_image.image : `https://api.onehaircut.com${fsalon.salon_cover_image.image}` : fsalon.logo.includes('api') ? fsalon.logo : `https://api.onehaircut.com${fsalon.logo}`}
                                                        sizes="640w"
                                                        fill={true}
                                                        alt="image"
                                                        style={{ objectFit: 'cover', height: '100%', width: '100%', display: 'block' }}
                                                        className="rounded-2xl "
                                                    />
                                                }
                                            </div>

                                            {/* Nom et prix du salon */}
                                            {/* <div className="flex items-start justify-between  "> */}
                                            <p className='text-black text-md md:text-lg font-semibold md:pt-2 overflow-auto'>{fsalon.name}</p>
                                            <div className='flex justify-end'>
                                                <p
                                                    style={{ fontSize: getFontSize(fsalon.final_price) }}
                                                    className={`px-2 py-1 ${ColorsThemeA.OhcGradient_B} rounded-full border border-stone-300 text-white font-semibold text-xs md:text-sm w-max`}>
                                                    {fsalon.final_price} €
                                                </p>
                                            </div>
                                            {/* </div> */}

                                            {/* Évaluation et nombre d'avis */}
                                            <div className='flex items-center text-xs text-[#7B7B7B] pr-1 pt-1 gap-1'>
                                                <StarRatings
                                                    rating={fsalon.haircut ? fsalon.haircut.rating : fsalon.rating}
                                                    starRatedColor="#FEDF10"
                                                    starSpacing="4px"
                                                    starDimension="12px"
                                                    numberOfStars={5}
                                                    name="rating"
                                                />
                                                <p>{fsalon.haircut ? fsalon.haircut.rating_counts : fsalon.rating_counts} d'avis</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                }
            </div>
            {/* Pied de page du composant */}
            <Footer />
        </div>
    );
};

export default SalonChoice;