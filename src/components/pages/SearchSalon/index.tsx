"use client";
import { client } from "@/api/clientSide";
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
import { getLocalStorage } from "@/api/storage";
import { Theme_A } from "@/components/utilis/Themes";
import ChatModal from "./ChatModal";
import { GoogleMap, Marker, useJsApiLoader, LoadScript } from '@react-google-maps/api';
import Footer from "@/components/UI/Footer";
import SalonPicModal from "./SalonPicModal";
import PerfSampleModal from "./PerfSampleModal";
import MapIcon from "@/components/utilis/Icons";
import ReactDOMServer from 'react-dom/server';


const temp = getLocalStorage("haircut")
const haircut = temp ? JSON.parse(String(temp)) : null

interface SalonImages {
  image: string,
  is_cover: boolean
}
interface SalonHairdressers {
  profile_image: string,
  name: string
}
interface SalonProfile {
  name: string,
  rating: string,
  salon_images: SalonImages[],
  salon_hairdressers: SalonHairdressers[],
  user_id: number
}


const SearchSalon = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [salonProfile, setSalonProfile] = useState<SalonProfile>({ name: '', rating: '', user_id: 0, salon_images: [{ image: '', is_cover: true }], salon_hairdressers: [{ name: '', profile_image: '' }] })
  const router = useRouter();
  const [hairCut, setHairCut] = useState({});
  const { loadingView } = userLoader();
  const haircut=getLocalStorage("haircut")
  const haircutData = haircut ? JSON.parse(haircut) : null
  const salon = getLocalStorage('selectedSalon')
  const services_ids = getLocalStorage('ServiceIds')
  const salonId = salon ? JSON.parse(salon).id : null

  //TODO Import salon availability times
  const hours = [
    { title: "Lundi", hours: "Fermé" },
    { title: "Mardi", hours: "10:00 - 19:00" },
    { title: "Mercredi", hours: "10:00 - 19:00" },
    { title: "Jeudi", hours: "10:00 - 19:00" },
    { title: "Vendredi", hours: "10:00 - 19:00" },
    { title: "Samedi", hours: "10:00 - 19:00" },
    { title: "Dimanche", hours: "10:00 - 19:00" },
  ];


  const getAllHairDresser = async () => {
    setIsLoading(true);
    console.log(salonId, haircutData.id)
    if (salonId) {

      await client.getSalonDetail(salonId,haircutData.id, services_ids)
        .then((resp) => {
          setSalonProfile(resp.data.data[0])
          setHairCut(resp.data.data[0].salon_haircut)
          setIsLoading(false);
        }).catch(error => {
          console.log(error)
        })
    }
  };

  useEffect(() => {
    getAllHairDresser()
  }, [])
  useEffect(() => {
    salonProfile.salon_images.forEach((img) => {
      if (img.is_cover) {
        setSelectedImage(img.image)
      }
    })
  }, [salonProfile])

  // FOR CHAT MODAL 
  // Créez un état pour suivre si le Chat modal est ouvert ou fermé
  const [isChatModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Array<{ content: string, sent: boolean }>>([]);
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
  //TODO Centrer par rapport aux coordonnées du salon
  const mapCenter = {
    lat: 47.146263032510866, // Latitude du centre de votre carte
    lng: 7.27569477025937  // Longitude du centre de votre carte
  };

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


  return (
    <div className="relative">
      {/* Affiche une vue de chargement pendant que les données sont récupérées */}
      {isLoading && loadingView()}

      {/* Barre de navigation */}
      <Navbar isSalonPage={false} />
      <div className="mt-2 mb-5 px-5 md:px-10 2xl:px-14">
        <div className='flex items-start cursor-pointer mt-8 mb-8 sm:mx-10 2xl:mx-14 text-stone-800' onClick={() => router.push('/salons')}>
          <BackArrow />
          <p className={`${Theme_A.textFont.navigationGreyFont}`}>Retour choix des salons</p>
        </div>

        <div className="bg-black bg-opacity-30 mt-2 mb-5 px-5 md:px-10 2xl:px-14 relative z-[1000] ">
          {/*Affichage de tous les modaux ici */}

          {/* Affichez le Salon Pic modal si `isSalonPicModalOpen` est vrai */}
          {isSalonPicModalOpen && (
            <SalonPicModal
              isModalOpen={isSalonPicModalOpen}
              closeModal={closeSalonPicModal}
              images={salonProfile.salon_images}  // Passer les images au modal
            />
          )}
          {/* Affichez le Salon Pic modal si `isPerfSampleModalOpen` est vrai */}
          {isPerfSampleModalOpen && (
            <PerfSampleModal
              isModalOpen={isPerfSampleModalOpen}
              closeModal={closePerfSampleModal}
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
        <div className="flex flex-col lg:flex-row items-center md:items-start xl:justify-between gap-11">

          <div className="w-full flex flex-col md:flex-row gap-8 2xl:gap-12 bg-gray-50 p-2 rounded-2xl">
            <div className="flex flex-col items-start">
              {/* Conteneur principal de l'image */}
              <div className="w-[320px] lg:w-[500px] 2xl:w-[600px] h-64 lg:h-[500px] relative rounded-4xl p-2 mb-3">

                {/* Image principale */}
                <div className="w-full h-full relative rounded-4xl">
                  <Image
                    src={selectedImage.includes('https://api-server.onehaircut.com/public') ? selectedImage : `https://api-server.onehaircut.com/public${selectedImage}`}
                    alt="Image principale du salon"
                    layout="fill"
                    objectFit="fill"
                    className="rounded-lg"
                  />
                </div>
              </div>

              {/* Conteneur pour les miniatures et les titres */}
              <div className="flex justify-between mt-3 w-[320px] lg:w-[500px] 2xl:w-[600px] relative">

                {/* Conteneur gauche (image + titre) */}
                <div className="flex flex-col items-center">
                  {/* Miniature gauche */}
                  <div
                    onClick={openSalonPicModal}
                    className="relative w-24 lg:w-32 2xl:w-36 h-24 lg:h-32 2xl:h-36 cursor-pointer overflow-hidden rounded-lg transform transition-all duration-300 group hover:scale-105"
                  >
                    {/* TODO charger les images vitrines ici */}
                    <Image
                      src={salonProfile.salon_images[0]?.image.includes('https://api-server.onehaircut.com/public') ? salonProfile.salon_images[0]?.image : `https://api-server.onehaircut.com/public${salonProfile.salon_images[0]?.image}`}
                      alt="Image miniature gauche"
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                  </div>
                  {/* Titre pour la miniature gauche */}
                  <p className="text-sm whitespace-nowrap mt-1"><strong>Images du salon</strong></p>
                </div>


                {/* Conteneur droit (image + titre) */}
                <div className="flex flex-col items-center">
                  {/* Miniature droite */}
                  <div
                    onClick={openPerfSampleModal}
                    className="relative w-24 lg:w-32 2xl:w-36 h-24 lg:h-32 2xl:h-36 cursor-pointer overflow-hidden rounded-lg transform transition-all duration-300 group hover:scale-105"
                  >
                    {/* TODO charger les images coiffures ici */}
                    <Image
                      src={salonProfile.salon_images[1]?.image.includes('https://api-server.onehaircut.com/public') ? salonProfile.salon_images[1]?.image : `https://api-server.onehaircut.com/public${salonProfile.salon_images[1]?.image}`}
                      alt="Image miniature droite"
                      layout="fill"
                      objectFit="cover"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                  </div>
                  {/* Titre pour la miniature droite */}
                  <p className="text-sm whitespace-nowrap mt-1"><strong>Exemples de réalisation</strong></p>
                </div>
              </div>
            </div>


            {/* Nom et notation du salon */}
            <div className="flex flex-col items-start md:items-center md:justify-center flex-grow">
              <p className="text-black font-bold text-3xl xl:text-4xl 2xl:text-5xl">
                {salonProfile.name}
              </p>
              {/*TODO import real rating on the selected haircut {salonProfile.rating} */}
              <div className="flex items-center gap-1 border-b-2 border-[#DBDBDB] text-xl 2xl:text-2xl font-semibold text-black pb-3 mt-1">
                <StarRatings
                  rating={4.5}
                  starRatedColor="#FEDF10"
                  starSpacing="4px"
                  starDimension="25px"
                  numberOfStars={5}
                  name="rating"
                />
                {/* TODO use salon's rating of the selected haircut {salonProfile.rating}*/}
                <p className="-mb-2"> 4.7</p> <br /> <small><small>  (348 avis</small></small> <p className="font-normal"><small><small><small>* sur cette coiffure</small></small></small> <br /></p> <small><small> ) </small></small>
              </div>
              {/* Description du salon */}
              <div className="mt-5 p-4 bg-gray-100 w-full lg:w-[400px] 2xl:w-[720px] rounded-xl ">
                <p className="text-black text-lg">
                  {/* TODO lien vers la description du salon {salonProfile.description} */}
                  "Bienvenue à L'Etoile Capillaire, où passion et créativité transforment vos cheveux en œuvres d'art. Ici, chaque rendez-vous est une expérience unique et personnalisée."
                </p>
              </div>
            </div>

          </div>

          {/* Horaires et bouton de réservation */}
          <div className="w-full md:w-auto flex flex-col items-center justify-center">
            <div className="flex flex-col gap-6 bg-white  opacity-90 w-full sm:w-[300px] md:w-[350px] xl:w-[420px] 2xl:w-[470px] border border-[#E1E1E1] rounded-3xl py-6 px-8 2xl:px-10 shadow-lg ">
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
            <button onClick={() => router.push('/book-salon')} className={`w-full md:w-64 2xl:w-72 h-14 flex items-center justify-center mt-7 text-white font-semibold text-xl rounded-xl ${Theme_A.button.mediumGradientButton} shadow-md`}>
              R&eacute;server un créneau
            </button>
            {/* Ajoutez le bouton pour ouvrir le modal ici */}
            <button
              onClick={openChatModal}
              className={`mt-4 ${Theme_A.button.medBlackColoredButton}`}
            >
              Contacter le salon
            </button>
          </div>
        </div>

        {/*TODO importer les details des prix et durées ici */}
        {/* Section des informations des prix */}
        <div className="flex items-center justify-center bg-stone-50 p-8 rounded-lg shadow-sm opacity-90 mt-20 ">
          <div className="text-center">
            {/* Titre de la section */}
            <p className="text-3xl xl:text-4xl font-semibold text-black">
              Tarifs et informations
            </p>

            {/* Conteneur pour les informations */}
            <div className="flex flex-col items-center gap-6 bg-white opacity-90 w-full max-w-[90vw] sm:max-w-[300px] md:max-w-[350px] xl:max-w-[420px] 2xl:max-w-[470px] border border-[#E1E1E1] rounded-3xl py-6 px-8 2xl:px-10 shadow-md mt-6 ">

              {/* Ligne d'information avec titre et valeur */}
              {/* Ligne avec Prix et Durée totale */}
              <div className="flex justify-between w-full">
                {/* Partie gauche : Prix total */}
                <div className="flex justify-between w-1/2">
                  <p className="text-md xl:text-lg font-semibold text-black">
                    Prix total :
                  </p>
                  <p className="text-md xl:text-lg font-normal text-black">
                  {salonProfile.final_price}
                  </p>
                </div>

                {/* Partie droite : Durée totale */}
                <div className="flex justify-between w-1/2">
                  <p className="text-md xl:text-lg font-semibold text-black">
                    Dur&eacute;e totale :
                  </p>
                  <p className="text-md xl:text-lg font-normal text-black">
                    {hairCut.base_duration}
                  </p>
                </div>
              </div>
              <div className="flex justify-between w-full">
                {/* Nom de la coiffure*/}
                <p className="text-md xl:text-lg font-semibold text-black">
                  {haircut.name} :
                </p>
                <p className="text-md xl:text-lg font-normal text-black">
                  [Votre valeur ici]
                </p>
              </div>
              <div className="flex justify-between w-full">
                {/* Durée de la coiffure*/}
                <p className="text-md xl:text-lg font-semibold text-black">
                  Dur&eacute;e de la coiffure :
                </p>
                <p className="text-md xl:text-lg font-normal text-black">
                  [Votre valeur ici]
                </p>
              </div>
              <div className="flex justify-between w-full">
                {/* Durée de la coiffure*/}
                <p className="text-md xl:text-lg font-semibold text-black">
                  Nom des prestations:
                </p>
                <p className="text-md xl:text-lg font-normal text-black">
                  [Votre valeur ici]
                </p>
              </div>
              <div className="flex justify-between w-full">
                {/* Durée de la coiffure*/}
                <p className="text-md xl:text-lg font-semibold text-black">
                  Dur&eacute;e des prestations :
                </p>
                <p className="text-md xl:text-lg font-normal text-black">
                  [Votre valeur ici]
                </p>
              </div>


            </div>
          </div>
        </div>

        {/* Section des coiffeurs */}
        <div className="mt-20 bg-stone-50 p-8 rounded-lg shadow-sm  opacity-90"> {/* Vignette générale ajoutée ici */}
          <p className="text-3xl xl:text-4xl font-semibold text-black text-center">
            Coiffeurs
          </p>
          <div className="flex items-center justify-center mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-20 ">
              {salonProfile.salon_hairdressers.map((hairdresser, index) => {
                return (
                  <div key={index} className="p-2 rounded-lg shadow-sm relative bg-gray-100 border border-stone-300">

                    {/* Background de la vignette avec opacité */}
                    <div className="absolute inset-0 opacity-100 rounded-xl"></div>

                    {/* Image du coiffeur */}
                    <div className="relative w-40 lg:w-52 h-40 lg:h-52 rounded-[20px] ">
                      <Image
                        src={hairdresser.profile_image && hairdresser.profile_image.includes('https://api-server.onehaircut.com/public') ? hairdresser.profile_image : `https://api-server.onehaircut.com/public${hairdresser.profile_image}`}
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

            </div>
          </div>
        </div>

        {/*TODO import real adress of the salon */}
        <div className="mt-20 bg-stone-50 p-8 rounded-lg shadow-sm  opacity-90">
          <p className="text-3xl xl:text-4xl font-semibold text-black text-center">
            Adresse du salon
          </p>
          <p className="mt-6 text-lg xl:text-xl font-medium text-black text-center">
            {/*Import Salon's adress here  */}
            {salonProfile.name}
          </p>
        </div>
        {/* Import Google map here */}
        <div className="mt-20 shadow-xl rounded-3xl">
          <LoadScript googleMapsApiKey={googleMapsApiKey}>
            <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={13}
              center={mapCenter}
            >
              {/* Ajout d'un marqueur */}
              {/* TODO Position du salon ici */}
              <Marker
                position={mapCenter}
                icon={mapIconUrl}
              />

              {/* Vous pouvez ajouter des marqueurs ou d'autres éléments ici si nécessaire */}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>

      <div className="pb-16 mt-40 relative z-[-1]"> {/* Ici nous appliquons le z-index et position:relative */}
        <LogoCircleFixLeft />
      </div>
      <Footer />
    </div >

  );
};

export default SearchSalon;
