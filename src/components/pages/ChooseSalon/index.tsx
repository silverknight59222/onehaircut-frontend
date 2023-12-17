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
    const [citySearch, setCitySearch] = useState<string>('');
    const [nameSearch, setNameSearch] = useState<string>('');
    const [filteredMobile, setFilteredMobile] = useState<string[]>([]);
    const [filtereRange, setRangeFilter] = useState([2, 100]);
    const [ratingFilter, setRatingFilter] = useState<number>(1);
    const [countryFilter, setCountryFilter] = useState<string>("");
    const [availabilityFilter, setAvailabilityFilter] = useState<string[]>([]);
    const [positions, setPositions] = useState<Position[]>([])
    const [center, setCenter] = useState<Position>()
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


    // const { isLoaded } = useJsApiLoader({
    //     googleMapsApiKey: 'AIzaSyAJiOb1572yF7YbApKjwe5E9L2NfzkH51E',
    //     libraries: ['places'],
    // })
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
            const salonAboveEqualRating = salon.rating >= ratingFilter;
            const salonInCountry = salon.address.country === countryFilter;
            const frenchToEnglishMapping = {
                'Lundi' : 1,
                'Mardi' : 2,
                'Mercredi' : 3,
                'Jeudi' : 4,
                'Vendredi' : 5,
                'Samedi' : 6,
                'Dimanche' : 0
            };
            let salonAvailable = false;

            for(const day of availabilityFilter)
            {
                salonAvailable = salon.openTimes[frenchToEnglishMapping[day]].available;
                if(salonAvailable)
                {
                    break;
                }
            }


            return (
                cityNameMatches &&
                salonNameMatches &&
                salonMobileMatches &&
                salonInRange &&
                salonAboveEqualRating &&
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

    const getCoordinates = (salons) => {
        //console.log('filtered salons', filteredSalons)
        const positionArray: Position[] = []
        salons.forEach(fsalon => {
            if (fsalon.address.lat && fsalon.address.long) {
                positionArray.push({ lat: Number(fsalon.address.lat), lng: Number(fsalon.address.long) })
            }
        })
        //console.log('position array', positionArray)
        setPositions(positionArray)
        const tempCenter: Position = getMapCenter(positionArray)
        setCenter(tempCenter);
    }
    // Fonction pour récupérer tous les salons
    const getAllSalons = async () => {
        const services = getLocalStorage('ServiceIds')
        const servicesData = services ? JSON.parse(services) : null
        const serviceIds: number[] = []
        servicesData.forEach((service: { name: string, id: number }) => {
            serviceIds.push(service.id)
        })
        // Code pour obtenir des informations sur les salons depuis l'API
        setIsLoading(true);

        let data = {
            servicesIds: serviceIds,
            haircut_id: 0
        }
        if (haircut) {
            data['haircut_id'] = haircut.id
        }
        await dashboard.getSalonsByHaircut(data)
            .then((res) => {
                setSalons(res.data.data);
                setFilteredSalons(res.data.data);
                getCoordinates(res.data.data)
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                //console.log(error)
            })
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

    // Utilisation de useEffect pour récupérer les données lors du montage du composant
    useEffect(() => {
        getAllSalons()

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
        filteredCityHandler()
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

    useEffect(() => {
        // const delay = setTimeout(()=>{
        //     // doFilter()
        // },1000)

        filteredCityHandler()
        //getCoordinates(filteredSalons)

        // return () => clearTimeout(delay)
    }, [citySearch, nameSearch, filteredMobile,filtereRange])

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
            bounds.extend({ lat: pos.lat, lng: pos.lng })
        })
        map.fitBounds(bounds);
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

    // Rendu du composant
    return (
        <div className='w-full'>
            {/* Entête du composant */}
            {/* <Navbar isSalonPage={true} /> */}
            <Navbar
                isSalonPage={true}
                onCitySearch={(value: string) => {
                    setCitySearch((pre) => {
                        if (value != pre) {
                            return value
                        }
                        return pre
                    })
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
                onRatingFilter={(rating: number) => setRatingFilter(rating)}
                onCountryFilter={(country: string) => setCountryFilter(country)}
                onAvailabilityFilter={(availability: string[]) => setAvailabilityFilter(availability)}
            />

            {/* Corps du composant */}
            <div className='w-full flex flex-col items-center justify-center px-6'>
                {isLoading && loadingView()}

                {/* Texte indiquant le nombre de salons */}
                <p className='text-4xl font-medium text-black text-center mt-6'>
                    {filteredSalons.length} <span className='font-bold text-gradient'>{salons.length === 1 ? 'Salon' : 'Salons'}</span> {salons.length === 1 ? 'correspond' : 'correspondent'} à vos critères
                </p>

                {/* Bouton retour et continuer */}
                <div className='w-full flex items-end justify-between mt-4 px-4'>
                    {/* Bouton pour retourner aux services */}
                    <div className='flex items-center cursor-pointer mt-4 mb-2 sm:mx-10 2xl:mx-14 text-stone-800' onClick={() => router.push('/services')}>
                        <BackArrow />
                        <p className={`${Theme_A.textFont.navigationGreyFont}`}>Retour aux services</p>
                    </div>

                    {/* Bouton pour continuer */}
                    <button disabled={!selectedSalon.id} onClick={onContinue}
                        className={`flex items-center justify-center text-lg text-white font-medium w-full md:w-52 h-14 rounded-xl px-4 ${selectedSalon.id ? Theme_A.button.medLargeGradientButton : 'bg-[#D9D9D9]'}`}>
                        Continuer
                    </button>
                </div>

                {/***************************************************************************************************************************************************************************************************************** */}

                {/* Conteneur principal pour les salons et la carte */}
                {isLoaded && positions.length > 0 &&
                    <div className='w-full mt-4 mb-2 relative '>
                        {/* Carte Google affichée uniquement si des salons sont disponibles */}
                        {
                            positions.length > 0 && (
                                <div className={`lg:absolute lg:top-0 lg:left-0 w-full h-[400px] lg:w-[400px] lg:h-[880px] 2xl:w-[880px] 4xl:w-[920px] rounded-lg overflow-hidden lg:z-10`}>

                                    {/*TODO USE salon.position when data are available  */}
                                    <GoogleMap
                                        onLoad={handleOnLoad}
                                        center={{ lat: userData?.lat!, lng: userData?.long! }}
                                        zoom={13}
                                        mapContainerStyle={{ width: '100%', height: '100%' }}
                                        options={{
                                            minZoom: 2,  // ici, définissez votre zoom minimum
                                            maxZoom: 18   // et ici, votre zoom maximumyy
                                        }}
                                    >
                                        {userData?.lat! && userData?.long && (
                                            <MarkerF
                                                position={{ lat: userData?.lat!, lng: userData?.long! }}
                                                options={{
                                                    icon: {
                                                        url: HomeIconUrl,
                                                        scaledSize: new window.google.maps.Size(50, 50),
                                                        anchor: new window.google.maps.Point(25, 25),
                                                    }
                                                }}

                                            />
                                        )}

                                        {filteredSalons.length > 0 && positions.map((position, index) => (
                                            <React.Fragment key={index}>

                                                <MarkerF
                                                    key={index}
                                                    // lat={positions[index].lat}
                                                    // lng={positions[index].lng}
                                                    position={position} // Utiliser la position du salon
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
                                        ))}
                                    </GoogleMap>
                                </div>
                            )
                        }

                        {/* Section affichant les vignettes des salons */}
                        <div className='flex-1 pr-4 pb-4 overflow-y-auto h-[calc(100vh - 160px)] lg:relative lg:mt-0 mt-3 lg:ml-[410px] 2xl:ml-[890px] 4xl:ml-[930px]'>

                            {/* Grid contenant les vignettes */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6 pb-10">

                                {/* VIGNETTES (ITERATIONS) */}
                                {filteredSalons.length > 0 && filteredSalons.map((fsalon, index) => {
                                    console.log('fsalon', fsalon)
                                    return (
                                        <div
                                            key={index}
                                            onClick={() => setSelectedSalon(fsalon)}
                                            className={`relative bg-stone-100 rounded-2xl border hover:border-stone-400 cursor-pointer ${selectedSalon.id === fsalon.id && 'border-4 border-red-400 shadow-xl'}`}
                                            style={{ width: '100%', aspectRatio: '1/1', display: 'flex', flexDirection: 'column', minWidth: '200px', maxWidth: '450px', minHeight: '200px', maxHeight: '420px' }}
                                        >
                                            {selectedSalon.id === fsalon.id && (
                                                <div className="absolute bottom-0 translate-y-1/2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                                                    <span className="text-white font-bold justify-center items-center">
                                                        <CheckOutlinedIcon style={{ width: '15px', height: '15px' }} />
                                                    </span>
                                                </div>
                                            )}


                                            {/* Contenu de la vignette */}
                                            <div className="flex flex-col p-4 shadow-md rounded-2xl " style={{ flexGrow: 1 }}>

                                                <div className='relative mb-4 hover:scale-105 transition duration-1000 m-2' style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    {!isLoggedIn &&
                                                        <div onClick={(e) => onWishlist(e, fsalon.id)} className="absolute right-6 top-6 z-20 cursor-pointer">
                                                            <StarIcon width='35' height='35'
                                                                color={wishlist.includes(String(fsalon.id)) ? "#FF5B5B" : ""}
                                                                stroke={wishlist.includes(String(fsalon.id)) ? "#FFFFFF" : ""} />
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
                                            <div className="flex items-start justify-between text-black text-lg font-semibold px-3 pt-2 ">
                                                <p className='w-36'>{fsalon.name}</p>
                                                {/* TODO PRICE SHOULD BE IN EUROS HERE */}
                                                <p className={`p-2 ${ColorsThemeA.OhcGradient_B} rounded-full border border-stone-300 text-white`}>{fsalon.final_price}</p>
                                            </div>

                                                {/* Évaluation et nombre d'avis */}
                                                <div className='flex items-center text-xs text-[#7B7B7B] px-3 pt-1'>
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
                    </div>
                }
            </div>
            {/* Pied de page du composant */}
            <Footer />
        </div>
    );
};

export default SalonChoice;