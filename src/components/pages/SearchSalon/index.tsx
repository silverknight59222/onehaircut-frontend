"use client";
import { client, user_api } from "@/api/clientSide";
import Navbar from "@/components/shared/Navbar";
import {
  LogoCircleFixLeft,
  BackArrow,
} from "@/components/utilis/Icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import StarRatings from "react-star-ratings";
import userLoader from "@/hooks/useLoader";
import { getLocalStorage, removeFromLocalStorage, setLocalStorage } from "@/api/storage";
import { Theme_A } from "@/components/utilis/Themes";
import ChatModal from "./ChatModal";
import { GoogleMap, Marker, useJsApiLoader, LoadScript, MarkerF } from '@react-google-maps/api';
import Footer from "@/components/UI/Footer";
import SalonPicModal from "./SalonPicModal";
import PerfSampleModal from "./PerfSampleModal";
import MapIcon from "@/components/utilis/Icons";
import ReactDOMServer from 'react-dom/server';
import { dashboard } from '@/api/dashboard';
import { elements } from "chart.js";
import { Address } from "@/types"
import TourModal, { Steps } from "@/components/UI/TourModal";
import AudioPlayerForTour from "@/components/UI/PlayerForTour";


const temp = getLocalStorage("haircut")
const haircut = temp ? JSON.parse(String(temp)) : null

interface SalonImages {
  image: string,
  is_cover: boolean,
  type: string
}
interface SalonHairdressers {
  profile_image: string,
  name: string,
  avatar_id: string,
  avatar: any,
}
interface SalonProfile {
  address: Address;
  name: string,
  rating: number,
  description: string,
  salon_images: SalonImages[],
  salon_hairdressers: SalonHairdressers[],
  user_id: number,
  openTimes: any[],
  final_price: number,
  haircut_duration: number,
  haircut_price: number,
  total_duration: number,
  rating_counts: number,
  haircut: any,
  total_service_duration: number,
  salon_haircut: any,
}


const SearchSalon = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [serviceDuration, setServiceDuration] = useState<Number>(0);
  const [servicePrice, setServicePrice] = useState<Number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [salonProfile, setSalonProfile] = useState<SalonProfile>()
  const router = useRouter();
  const { loadingView } = userLoader();
  const [pageDone, setPageDone] = useState<String[]>(['salon_profile']);

  const haircut = getLocalStorage("haircut")
  const haircutData = haircut ? JSON.parse(haircut) : null

  const services = getLocalStorage('ServiceIds')
  const servicesData = services ? JSON.parse(services) : null
  const defaultPicture = 'https://api.onehaircut.com/base_null_img.jpg';

  //TODO Import salon availability times
  const [hours, setHours] = useState([] as any[])
  const hoursList = {
    MONDAY: { title: "Lundi" },
    TUESDAY: { title: "Mardi" },
    WEDNESDAY: { title: "Mercredi" },
    THURSDAY: { title: "Jeudi" },
    FRIDAY: { title: "Vendredi" },
    SATURDAY: { title: "Samedi" },
    SUNDAY: { title: "Dimanche" },
  };

  useEffect(() => {
    let tempSalon = getLocalStorage('selectedSalon')
    const salon = tempSalon ? JSON.parse(tempSalon) : null
    setSalonProfile(salon)
    const pages_done = getLocalStorage('pages_done')
    setPageDone(pages_done ? JSON.parse(pages_done) : [])
  }, [])

  useEffect(() => {
    salonProfile?.salon_images.forEach((img) => {
      if (img.is_cover) {
        setSelectedImage(img.image)
      }
    })

    const tempHours = [] as any[]
    salonProfile?.openTimes.forEach((time, index) => {
      if (time.available) {
        const t = hoursList[time.day]
        t.hours = time.start + " - " + time.end
        tempHours.push(t)
      }
    })
    setHours(tempHours)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salonProfile])

  // FOR CHAT MODAL
  // Créez un état pour suivre si le Chat modal est ouvert ou fermé
  const [isChatModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Array<{ content: string, sent: boolean }>>([]);
  const [isLoadedPages, setIsLoadedPages] = useState(false);
  const closeChatModal = () => {
    setIsModalOpen(false);
  };
  // Cette fonction sera appelée lorsque l'utilisateur clique sur le bouton pour ouvrir le modal
  const openChatModal = () => {
    setIsModalOpen(true);
  };

  //FOR SALON PIC MODAL
  // Créez un état pour suivre si le Salon Pic modal est ouvert ou fermé
  const [isSalonPicModalOpen, setIsSalonPicModalOpen] = useState<boolean>(false);
  const closeSalonPicModal = () => {
    setIsSalonPicModalOpen(false);
  };
  // Cette fonction sera appelée lorsque l'utilisateur clique sur le bouton pour ouvrir le modal
  const openSalonPicModal = () => {
    setIsSalonPicModalOpen(true);
  };

  //FOR PERF SAMPLES MODAL
  // Créez un état pour suivre si le Chat modal est ouvert ou fermé
  const [isPerfSampleModalOpen, setIsPerfSampleModalOpen] = useState<boolean>(false);
  const closePerfSampleModal = () => {
    setIsPerfSampleModalOpen(false);
  };
  // Cette fonction sera appelée lorsque l'utilisateur clique sur le bouton pour ouvrir le modal
  const openPerfSampleModal = () => {
    setIsPerfSampleModalOpen(true);
  };


  //GOOGLE MAP
  const mapStyles = {
    height: "500px",
    width: "100%",
    borderRadius: "20px"
  };

  //TODO importer la clef autrement
  const googleMapsApiKey = 'AIzaSyAJiOb1572yF7YbApKjwe5E9L2NfzkH51E';
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAJiOb1572yF7YbApKjwe5E9L2NfzkH51E',
    libraries: ['places'],
  })
  // Pour l'icon sur la carte
  const mapIconSvg = ReactDOMServer.renderToStaticMarkup(<MapIcon />);
  const mapIconUrl = `data:image/svg+xml;base64,${btoa(mapIconSvg)}`;

  // ------------------------------------------------------------------
  // For Tour
  const tourSteps: Steps[] = [
    {
      selector: '',
      content:
        <div key="/assets/audio/tour/client/SearchSalon_woman_1.mp3">
          <AudioPlayerForTour src="/assets/audio/tour/client/SearchSalon_woman_1.mp3" />
          <p>Te voici sur la page de présentation du salon.</p>
        </div>,
    },
    {
      selector: '.pictures_salon',
      content:
        <div key="/assets/audio/tour/client/SearchSalon_woman_2.mp3">
          <AudioPlayerForTour src="/assets/audio/tour/client/SearchSalon_woman_2.mp3" />
          <p>En cliquant ici, tu peux voir les autres images de ce salon.</p>
        </div>,
    },
    {
      selector: '.pictures_hairstyles',
      content:
        <div key="/assets/audio/tour/client/SearchSalon_woman_3.mp3">
          <AudioPlayerForTour src="/assets/audio/tour/client/SearchSalon_woman_3.mp3" />
          <p>Et ici des exemples de coiffures que le salon sait faire.</p>
        </div>,
    },
    {
      selector: '.recap',
      content:
        <div key="/assets/audio/tour/client/SearchSalon_woman_4.mp3">
          <AudioPlayerForTour src="/assets/audio/tour/client/SearchSalon_woman_4.mp3" />
          <p>Voici le récapitulatif de ton choix.</p>
        </div>,
    },
    {
      selector: '.button_reservation',
      content:
        <div key="/assets/audio/tour/client/SearchSalon_woman_5.mp3">
          <AudioPlayerForTour src="/assets/audio/tour/client/SearchSalon_woman_5.mp3" />
          <p>Si tout est bon, tu peux passer à la suite.</p>
        </div>,
    },
    {
      selector: '.button_contact',
      content:
        <div key="/assets/audio/tour/client/SearchSalon_woman_6.mp3">
          <AudioPlayerForTour src="/assets/audio/tour/client/SearchSalon_woman_6.mp3" />
          <p>Tu peux aussi envoyer un message au salon avant de réserver.</p>
        </div>,
    },
  ];


  const closeTour = async () => {
    // You may want to store in local storage or state that the user has completed the tour
    setIsLoading(true)
    if (!pageDone.includes('salon_profile')) {
      let resp = await user_api.assignStepDone({ page: 'salon_profile' });

      if (resp.data?.pages_done) {
        setLocalStorage('pages_done', JSON.stringify(resp.data.pages_done));
      }
      setPageDone((prevArray) => [...prevArray, 'salon_profile'])
    }
    setIsLoading(false);
  };
  // ------------------------------------------------------------------


  return (
    <div className="relative">
      {/* Affiche une vue de chargement pendant que les données sont récupérées */}

      {isLoading && loadingView()}

      {/* For explaining the website */}
      <TourModal steps={tourSteps} onRequestClose={closeTour} doneTour={pageDone.includes('salon_profile')} />

      {/* Barre de navigation */}
      <Navbar hideSearchBar={true} />
      <div className="mt-2 mb-5 px-5 md:px-10 2xl:px-14">
        <div className='flex items-start cursor-pointer mt-8 mb-8 sm:mx-10 2xl:mx-14 text-stone-800' onClick={() => router.push('/salons')}>
          <BackArrow />
          <p className={`${Theme_A.textFont.navigationGreyFont}`}>Retour choix des salons</p>
        </div>

        <div className="bg-black bg-opacity-30 mt-2 mb-5 px-5 md:px-10 2xl:px-14 relative z-[1000] ">
          {/*Affichage de tous les modaux ici */}

          {/* Affichez le Salon Pic modal si `isSalonPicModalOpen` est vrai */}
          {isSalonPicModalOpen && salonProfile && (
            <SalonPicModal
              isModalOpen={isSalonPicModalOpen}
              closeModal={closeSalonPicModal}
              images={salonProfile.salon_images}  // Passer les images au modal
            />
          )}
          {/* Affichez le Salon Pic modal si `isPerfSampleModalOpen` est vrai */}
          {isPerfSampleModalOpen && salonProfile && (
            <PerfSampleModal
              isModalOpen={isPerfSampleModalOpen}
              closeModal={closePerfSampleModal}
              images={salonProfile.salon_images}  // Passer les images au modal
            />
          )}
          {/* Affichez le Chat modal si `isChatModalOpen` est vrai */}
          {isChatModalOpen && (
            <ChatModal
              isModalOpen={isChatModalOpen}
              closeModal={closeChatModal}
              professionalData={salonProfile}
            />
          )}
        </div>

        {/* Section d'image et d'informations du salon */}
        <div className="flex flex-col items-center md:items-center xl:justify-between gap-11">

          {/* Nom et notation du salon */}
          <div className="flex flex-col items-start md:items-center md:justify-center flex-grow">
            {salonProfile && <p className="text-black font-bold text-3xl xl:text-4xl 2xl:text-5xl">
              {salonProfile.name}
            </p>}
            {/*TODO import real rating on the selected haircut {salonProfile.rating} */}
            {salonProfile && <div className="flex items-center gap-1 border-b-2 border-[#DBDBDB] text-xl 2xl:text-2xl font-semibold text-black pb-3 mt-1">
              <StarRatings
                rating={haircutData ? salonProfile.salon_haircut.rating : salonProfile.rating}
                starRatedColor="#FEDF10"
                starSpacing="4px"
                starDimension="25px"
                numberOfStars={5}
                name="rating"
              />
              {/* TODO use salon's rating of the selected haircut {salonProfile.rating}*/}
              <p className="-mb-2">
                {haircutData ? salonProfile.salon_haircut.rating.toFixed(1) : salonProfile.rating.toFixed(1)}
              </p>
              <br />
              <small>
                <small>
                  ({haircutData ? salonProfile.salon_haircut.rating_counts : salonProfile.rating_counts} avis
                </small>
              </small>
              <p className="font-normal">
                <small><small><small> sur cette coiffure</small></small></small>
              </p>
              <br />
              <small><small> ) </small></small>
              {/* Ensure that haircut exists before logging */}
              {salonProfile.haircut && console.log('Haircut name : ' + salonProfile.haircut.rating)}
              {!salonProfile.haircut && console.log(salonProfile)}
            </div>}

            {/* Description du salon */}
            <div className="mt-5 p-4 bg-gray-200 w-full lg:w-[400px] 2xl:w-[720px] rounded-xl ">
              {salonProfile && <p className="text-black text-lg">
                {/* TODO lien vers la description du salon {salonProfile.description} */}
                {salonProfile.description}
              </p>}
            </div>
          </div>

          <div className="w-full flex flex-col sm:flex-row gap-4 2xl:gap-12 bg-gray-50 p-2 rounded-2xl justify-evenly">
            <div className="flex flex-col items-start">
              {/* Conteneur principal de l'image */}
              <div className="w-full sm:w-[350px] md:w-[400px] lg:w-[500px] 2xl:w-[600px] h-64 sm:h-80 md:h-60 lg:h-[500px] relative rounded-4xl p-2 mb-3 ">

                {/* Image principale */}
                {salonProfile && <div className="w-full h-full relative rounded-4xl ">
                  <Image
                    src={selectedImage ? (selectedImage.includes('http') ? selectedImage : `https://api.onehaircut.com${selectedImage}`) : defaultPicture}
                    alt="Image principale du salon"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg shadow-sm shadow-stone-600"
                  />

                </div>}
              </div>

              {/* Conteneur pour les miniatures et les titres */}
              <div className="flex justify-between mt-3 w-full lg:w-[500px] 2xl:w-[600px] relative">

                {/* Conteneur gauche (image + titre) */}
                <div className="flex flex-col items-center ">
                  {/* Miniature gauche */}
                  <div
                    onClick={openSalonPicModal}
                    className="relative w-24 lg:w-32 2xl:w-36 h-24 lg:h-32 2xl:h-36 cursor-pointer overflow-hidden rounded-lg transform transition-all duration-300 group hover:scale-105 shadow-sm shadow-stone-600 pictures_salon"
                  >
                    {/* TODO charger les images vitrines ici */}
                    {salonProfile && salonProfile.salon_images &&
                      <Image
                        src={salonProfile.salon_images.length > 0 ? (salonProfile.salon_images.filter((image) => image.type == "showcase")[0]?.image.includes('http') ?
                          salonProfile.salon_images.filter((image) => image.type == "showcase")[0]?.image :
                          `https://api.onehaircut.com${salonProfile.salon_images.filter((image) => image.type == "showcase")[0]?.image}`) :
                          defaultPicture}
                        alt="Image miniature gauche"
                        layout="fill"
                        objectFit="cover"
                      />}
                    <div id="miniature_Image_Salon" className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                  </div>
                  {/* Titre pour la miniature gauche */}
                  <p className="text-sm whitespace-nowrap mt-1"><strong> Voir images du salon</strong></p>
                </div>


                {/* Conteneur droit (image + titre) */}
                <div className="flex flex-col items-center">
                  {/* Miniature droite */}
                  <div
                    onClick={openPerfSampleModal}
                    className="relative w-24 lg:w-32 2xl:w-36 h-24 lg:h-32 2xl:h-36 cursor-pointer overflow-hidden rounded-lg transform transition-all duration-300 group hover:scale-105 shadow-sm shadow-stone-600 pictures_hairstyles"
                  >
                    {/* TODO charger les images vitrines ici */}
                    {salonProfile && salonProfile.salon_images && <Image
                      src={salonProfile.salon_images.length > 0 ? (salonProfile.salon_images.filter((image) => image.type == "hairstyle")[0]?.image.includes('http') ?
                        salonProfile.salon_images.filter((image) => image.type == "hairstyle")[0]?.image :
                        `https://api.onehaircut.com${salonProfile.salon_images.filter((image) => image.type == "hairstyle")[0]?.image}`) : defaultPicture}
                      alt="Image miniature droite"
                      layout="fill"
                      objectFit="cover"
                    />}
                    <div id="prestation_Image_Salon" className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                  </div>
                  {/* Titre pour la miniature droite */}
                  <p className="text-sm whitespace-nowrap mt-1"><strong>Voir prestations du salon</strong></p>
                </div>
              </div>
            </div>




            {/* Horaires et bouton de réservation */}
            <div className="w-full md:w-auto flex flex-col items-center justify-center">
              <div className="flex flex-col gap-6 bg-white  opacity-90 w-full sm:w-[270px] md:w-[300px] xl:w-[420px] 2xl:w-[470px] border border-[#E1E1E1] rounded-3xl py-6 px-8 2xl:px-10 shadow-sm shadow-stone-600">
                {/* Titre ajouté ici */}
                <h2 className="text-xl 2xl:text-2xl font-semibold text-[#272727] mb-4 text-center">
                  Horaire d'ouverture
                </h2>
                {hours.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between text-md 2xl:text-2xl font-small text-[#9e9e9e]"
                    >
                      <p>{item.title}</p>
                      <p>{item.hours}</p>
                    </div>
                  );
                })}
              </div>

              {/* Bouton de réservation */}
              <button onClick={() => router.push('/book-salon')}
                id="Reserver_Un_Creneau"
                className={`w-full md:w-64 2xl:w-72 h-14 flex items-center justify-center mt-7 text-white font-semibold text-xl rounded-xl ${Theme_A.button.mediumGradientButton} shadow-md button_reservation`}>
                Réserver un créneau
              </button>
              {/* Ajoutez le bouton pour ouvrir le modal ici */}
              <button
                onClick={openChatModal}
                className={`mt-4 ${Theme_A.button.medBlackColoredButton} button_contact`}
              >
                Contacter le salon
              </button>
            </div>
          </div>
        </div>

        {/* Section des informations des prix */}
        <div className="flex items-center justify-center bg-stone-50 p-8 rounded-lg shadow-sm opacity-90 mt-20 recap">
          <div className="text-center">
            {/* Titre de la section */}
            <p className="text-3xl xl:text-4xl font-semibold text-black">
              Tarifs et informations
            </p>

            {/* Conteneur pour les informations */}
            <div className="flex flex-col items-center gap-6 bg-white opacity-90 w-[420px] xl:max-w-[420px] 2xl:max-w-[500px] border border-[#E1E1E1] rounded-3xl py-6 px-8 2xl:px-10 shadow-sm shadow-stone-600 mt-6 ">

              {/* Ligne d'information avec titre et valeur */}
              {/* Ligne avec Prix et Durée totale */}
              <div className="flex justify-between w-full text-black gap-2 ">
                {/* Partie gauche : Prix total */}
                <div className="flex justify-evenly w-1/2">
                  <p className="text-md xl:text-lg font-semibold ">
                    Prix total :
                  </p>
                  {salonProfile && <p className="text-xl font-normal text-stone-700">
                    {salonProfile.final_price}€
                  </p>}
                </div>

                {/* Partie droite : Durée totale */}
                <div className="flex justify-evenly w-1/2">
                  <p className="text-md xl:text-lg font-semibold text-black mb-4">
                    Durée  :
                  </p>
                  {salonProfile && <p className="text-xl font-normal text-stone-700">
                    {salonProfile.total_duration} min
                  </p>}
                </div>
              </div>
              {haircutData && <div className="flex justify-between w-full">
                <p className="text-md xl:text-lg font-semibold text-stone-400">
                  <small>Nom de la coiffure :</small>
                </p>
                <p className="text-md xl:text-lg font-normal text-stone-400 italic">
                  {haircutData.name}
                </p>
              </div>}
              {salonProfile && salonProfile.haircut && <div className="flex justify-between text-stone-400 w-full">
                {/* Durée de la coiffure*/}
                <p className="text-md xl:text-lg font-semibold  ">
                  <small>Dur&eacute;e de la coiffure :</small>
                </p>
                <p className="text-md xl:text-lg font-normal text-stone-400 italic">
                  {salonProfile.haircut_duration} min
                </p>
              </div>}
              <div className="flex justify-between w-full">
                {/* Durée de la coiffure*/}
                <p className="text-md xl:text-lg font-semibold text-stone-400">
                  <small> Nom des prestations:</small>
                </p>
                <p className="text-md xl:text-lg font-normal text-stone-400 italic">
                  {servicesData ? <p>
                    {servicesData.map((item: { name: string, id: number }, index: number) => {
                      return <p key={index} className="text-base">{++index}. {item.name}</p>
                    })}
                  </p> : ''}
                </p>
              </div>
              <div className="flex justify-between w-full">
                {/* Durée de la coiffure*/}
                <p className="text-md xl:text-lg font-semibold text-stone-400">
                  <small>Durée des prestations :</small>
                </p>
                {salonProfile && <p className="text-md xl:text-lg font-normal text-stone-400 italic">
                  {salonProfile.total_service_duration} min
                </p>}
              </div>
            </div>
          </div>
        </div>

        {/* Section des coiffeurs */}
        <div className="mt-20 bg-stone-50 p-8 rounded-lg shadow-sm  opacity-90 zone_hairdressers"> {/* Vignette générale ajoutée ici */}
          <p className="text-3xl xl:text-4xl font-semibold text-black text-center">
            Coiffeurs
          </p>
          <div className="flex items-center justify-center mt-8">
            {salonProfile != null && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-20 ">
              {salonProfile.salon_hairdressers != null && salonProfile.salon_hairdressers.map((hairdresser, index) => {
                return (
                  <div key={index} className="p-2 rounded-lg shadow-sm shadow-stone-600 relative bg-gray-100 border border-stone-300">

                    {/* Background de la vignette avec opacité */}
                    <div className="absolute inset-0 opacity-100 rounded-xl"></div>

                    {/* Image du coiffeur */}
                    <div className="relative w-40 lg:w-52 h-40 lg:h-52 rounded-[20px] ">
                      <Image
                        src={hairdresser.profile_image || hairdresser.avatar ? (hairdresser.profile_image ? (hairdresser.profile_image.includes('http')
                          ? hairdresser.profile_image : 'https://api.onehaircut.com/' + hairdresser.profile_image)
                          : 'https://api.onehaircut.com/' + hairdresser.avatar.image) : defaultPicture}
                        alt=""
                        layout="fill"
                        className="rounded-[20px]"
                      />

                      {/*Affichage de tous les modaux ici */}
                      {/* Affichez le modal si `isModalOpen` est vrai */}
                      {isChatModalOpen && (
                        <ChatModal
                          isModalOpen={isChatModalOpen}
                          closeModal={closeChatModal}
                          professionalData={salonProfile}
                          className="z-1000 opacity-100"
                        />
                      )}
                    </div>

                    {/* Nom du coiffeur */}
                    <p className="text-2xl text-black font-medium text-center mt-1">
                      {hairdresser.name}
                    </p>
                  </div>
                );
              })}

            </div>}
          </div>
        </div>

        {/*TODO import real address of the salon */}
        <div className="mt-20 bg-stone-50 p-8 rounded-lg shadow-sm  opacity-90">
          <p className="text-3xl xl:text-4xl font-semibold text-black text-center">
            Adresse du salon
          </p>
          {salonProfile != null && <p className="mt-6 text-lg xl:text-xl font-normal text-black text-center">
            {salonProfile.address.city},  {salonProfile.address.country}
          </p>}
        </div>
        {/* Import Google map here */}
        {isLoaded && <div className="mt-20 shadow-xl rounded-3xl">
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={{ lat: salonProfile?.address.lat!, lng: salonProfile?.address.long! }}
          >
            {/* Ajout d'un marqueur */}
            {/* TODO Position du salon ici */}
            <MarkerF
              position={{ lat: salonProfile?.address.lat!, lng: salonProfile?.address.long! }}
              icon={mapIconUrl}
            />

            {/* Vous pouvez ajouter des marqueurs ou d'autres éléments ici si nécessaire */}
          </GoogleMap>
        </div>}
      </div>

      <div className="pb-16 mt-40 relative z-[-1]"> {/* Ici nous appliquons le z-index et position:relative */}
        <LogoCircleFixLeft />
      </div>
      <Footer />
    </div >

  );
};

export default SearchSalon;
