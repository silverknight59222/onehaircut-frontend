"use client";
import Navbar from '@/components/shared/Navbar'
import React, { useEffect, useState } from 'react'
import '../dashboard/Dashboard/Services/index.css'
import { Like } from '@/components/utilis/Icons';
import Image from 'next/image';
import StarRatings from 'react-star-ratings';
import { useRouter } from 'next/navigation';
import { dashboard } from '@/api/dashboard';
import { getLocalStorage, setLocalStorage } from '@/api/storage';
import { SalonDetails } from '@/types';
import userLoader from "@/hooks/useLoader";
import useSnackbar from '@/hooks/useSnackbar';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { ColorsThemeA, Theme_A } from '@/components/utilis/Themes';
import { BackArrow } from '@/components/utilis/Icons';
import Footer from '@/components/UI/Footer';
import MapIcon from "@/components/utilis/Icons";
import { MapIconRed } from '@/components/utilis/Icons';
import ReactDOMServer from 'react-dom/server';
// TODO IMPORT TO USE ADRESSES 
//import axios from 'axios'; 



// Composant principal SalonChoice
const SalonChoice = () => {
    // Déclaration des états locaux
    const [selectedSalon, setSelectedSalon] = useState<{ name: string, id: number | null }>({ name: '', id: null })
    const [salonImage, setSalonImage] = useState<string[]>([])
    const [salons, setSalons] = useState<SalonDetails[]>([])
    const router = useRouter();
    let user = getLocalStorage("user");
    const userId = user ? Number(JSON.parse(user).id) : null;
    const getHaircut = getLocalStorage("haircut") as string;
    const haircut = user ? JSON.parse(getHaircut) : null;
    const [isLoading, setIsLoading] = useState(false);
    const { loadingView } = userLoader();
    const showSnackbar = useSnackbar();
    const [location, setLocation] = useState({ lat: 47.18052966583263, lng: 7.358082527907601 });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [wishlist, setWishlist] = useState<string[]>([])
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyAJiOb1572yF7YbApKjwe5E9L2NfzkH51E',
        libraries: ['places'],
    })

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
        if (haircut) {
            const data = {
                haircut_id: haircut.id,
                servicesIDs: serviceIds
            }
            await dashboard.getSalonsByHaircut(data)
                .then((res) => {
                    setIsLoading(false);
                    if (res.data.data.length > 0) {
                        setSalons(res.data.data);
                    }
                })
                .catch(error => {
                    setIsLoading(false);
                    console.log(error)
                })
        }
    }
    // Fonction pour obtenir la liste de souhaits des salons
    const getSalonsWishlist = () => {
        //   if (userId) {
        //       setIsLoading(true);
        //       dashboard.getSalonsWishlist(userId)
        //           .then((res) => {
        //               if (res.data.data.length > 0) {
        //                   if (salons.length) {
        //                       const arr: string[] = []
        //                       res.data.data.forEach((item: any) => {
        //                           salons.forEach((salon) => {
        //                               if (item.hairsalon.id === salon.id) {
        //                                   arr.push(String(salon.id))
        //                               }
        //                           })
        //                       });
        //                       setWishlist(arr)
        //                   }
        //               }
        //               setIsLoading(false);
        //           })
        //           .catch(error => {
        //               setIsLoading(false);
        //           })
        //   }
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
        router.push(`salon/profile`)
        setLocalStorage('selectedSalon', JSON.stringify(selectedSalon))
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
    useEffect(() => {
        if (!isLoggedIn) {
            getSalonsWishlist()
        }
    }, [salons])

    if (!isLoaded) {
        return loadingView()
    }

    //TODO UNCOMMENT TO USE SALON ADRESSES ( NOT LAT AND LONG; FULL ADRESS)
    // Pour utiliser l'adresse du salon 
    /*
     const getCoordinates = async (address: string) => {
         try {
             const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
                 params: {
                     address: address,
                     key: 'VOTRE_CLÉ_API',
                 }
             });
             if (response.data.status === 'OK') {
                 return response.data.results[0].geometry.location;
             }
         } catch (error) {
             console.error('Erreur de géocodage:', error);
         }
     };
     useEffect(() => {
         const getSalonCoordinates = async () => {
             const updatedSalons = await Promise.all(salons.map(async (salon) => {
                 const coords = await getCoordinates(salon.address);
                 return { ...salon, coordinates: coords };
             }));
             setSalons(updatedSalons);
         };
 
         getSalonCoordinates();
     }, [salons]);
 */

    // MARQUEUR PERSONNALISE
    const mapIconSvg = ReactDOMServer.renderToStaticMarkup(<MapIcon />);
    const MapIconRedSvg = ReactDOMServer.renderToStaticMarkup(<MapIconRed />);
    const mapIconUrl = `data:image/svg+xml;base64,${btoa(mapIconSvg)}`;
    const MapIconRedUrl = `data:image/svg+xml;base64,${btoa(MapIconRedSvg)}`;
    const MAX_MARKERS = 15;

    // Rendu du composant
    return (
        <div className='w-full'>
            {/* Entête du composant */}
            <Navbar isSalonPage={true} />

            {/* Corps du composant */}
            <div className='w-full flex flex-col items-center justify-center px-6'>
                {isLoading && loadingView()}

                {/* Texte indiquant le nombre de salons */}
                <p className='text-4xl font-medium text-black text-center mt-6'>
                    {salons.length} <span className='font-bold text-gradient'>{salons.length === 1 ? 'Salon' : 'Salons'}</span> {salons.length === 1 ? 'correspond' : 'correspondent'} à vos critères
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
                <div className='w-full mt-4 mb-2 relative'>

                    {/* Carte Google affichée uniquement si des salons sont disponibles */}
                    {
                        salons.length > 0 && (
                            <div className={`lg:absolute lg:top-0 lg:left-0 w-full h-[400px] lg:w-[400px] lg:h-[970px] 2xl:w-[920px] 4xl:w-[920px] rounded-lg overflow-hidden lg:z-10`}>

                                <GoogleMap
                                    center={location}
                                    zoom={12}
                                    mapContainerStyle={{ width: '100%', height: '100%' }}
                                >

                                    {salons.slice(0, MAX_MARKERS).map((salon, index) => (
                                        <Marker
                                            key={index}
                                            label={{
                                                color: salon.id === selectedSalon.id ? "#FFF" : "#000",
                                                fontFamily: 'Arial',
                                                fontSize: '10px',
                                                fontWeight: 'semibold',
                                                text: `${salon.id}00$`,
                                            }}
                                            position={location} // Attention : ici vous devrez probablement utiliser la position du salon plutôt que la position centrale de la carte
                                            icon={{
                                                url: salon.id === selectedSalon.id ? MapIconRedUrl : mapIconUrl, // changer le marqueur en fonction du salon selectionné 
                                                scaledSize: salon.id === selectedSalon.id ? new window.google.maps.Size(70, 90) : new window.google.maps.Size(60, 80),
                                                origin: new window.google.maps.Point(0, -10),
                                                anchor: new window.google.maps.Point(20, 40),
                                            }}
                                        />
                                    ))}
                                </GoogleMap>
                            </div>
                        )
                    }

                    {/* Section affichant les vignettes des salons */}
                    <div className='flex-1 pr-4 pb-4 overflow-y-auto h-[calc(100vh - 160px)] lg:relative lg:mt-0 lg:ml-[410px] 2xl:ml-[930px] 4xl:ml-[930px]'>

                        {/* Grid contenant les vignettes */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">

                            {/* VIGNETTES (ITERATIONS) */}
                            {salons.map((salon, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedSalon({ name: salon.name, id: salon.id })}
                                    className={`relative bg-stone-100 rounded-2xl border hover:border-secondary cursor-pointer ${selectedSalon.id === salon.id && 'border-secondary'}`}
                                    style={{ width: '100%', aspectRatio: '1/1', display: 'flex', flexDirection: 'column', minWidth: '300px', minHeight: '300px' }}
                                >
                                    {/* Contenu de la vignette */}
                                    <div className="flex flex-col p-4 shadow-md rounded-2xl " style={{ flexGrow: 1 }}>

                                        <div className='relative mb-4 ' style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {!isLoggedIn &&
                                                <div onClick={(e) => onWishlist(e, salon.id)} className="absolute right-6 top-6 z-20 cursor-pointer">
                                                    <Like color={wishlist.includes(String(salon.id)) ? "#FF0000" : ""} />
                                                </div>}
                                            <Image
                                                src={salon.salon_images.length && salon.salon_images[index].is_cover ? salon.salon_images[index].image.includes('api-server') ? salon.salon_images[index].image : `https://api-server.onehaircut.com/public${salon.salon_images[index].image}` : salon.logo.includes('api-server') ? salon.logo : `https://api-server.onehaircut.com/public${salon.logo}`}
                                                fill={true}
                                                alt="image"
                                                style={{ objectFit: 'cover', height: '100%', width: '100%', display: 'block' }}
                                                className="rounded-2xl "
                                            />
                                        </div>

                                        {/* Nom et prix du salon */}
                                        <div className="flex items-start justify-between text-black text-lg font-semibold px-3 pt-2 ">
                                            <p className='w-36'>{salon.name}</p>
                                            <p className={`p-2 ${ColorsThemeA.OhcGradient_B} rounded-full border border-stone-300 text-white`}> $35</p>
                                        </div>

                                        {/* Évaluation et nombre d'avis */}
                                        <div className='flex items-center gap-1 text-xs text-[#7B7B7B] px-3 pt-1'>
                                            <StarRatings
                                                rating={salon.rating}
                                                starRatedColor="#FEDF10"
                                                starSpacing="4px"
                                                starDimension="12px"
                                                numberOfStars={5}
                                                name="rating"
                                            />
                                            <p className='border-r border-[#A7A7A7] pr-1'>{salon.rating}</p>
                                            <p>348 avis</p>
                                        </div>
                                    </div>
                                </div>
                            ))}



                        </div>
                    </div>
                </div>
            </div>
            {/* Pied de page du composant */}
            <Footer />
        </div>
    );
};

export default SalonChoice;