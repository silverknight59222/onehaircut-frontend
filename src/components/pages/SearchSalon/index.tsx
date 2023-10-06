"use client";
import { client } from "@/api/clientSide";
import Navbar from "@/components/shared/Navbar";
import {
  LogoCircleFixLeft,
  LogoIcon,
} from "@/components/utilis/Icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import userLoader from "@/hooks/useLoader";
import { getLocalStorage } from "@/api/storage";
import BaseModal from "@/components/UI/BaseModal";
import { Theme_A } from "@/components/utilis/Themes";
import { ColorsThemeA } from "@/components/utilis/Themes";
import ChatModal from "./ChatModal";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Footer from "@/components/UI/Footer";
import useSnackbar from "@/hooks/useSnackbar";

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
  const { loadingView } = userLoader();
  const salon = getLocalStorage('selectedSalon')
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
    if (salonId) {
      await client.getSalonDetail(salonId)
        .then((resp) => {
          setSalonProfile(resp.data.data[0])
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

  // Créez un état pour suivre si le modal est ouvert ou fermé
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Array<{ content: string, sent: boolean }>>([]);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // Cette fonction sera appelée lorsque l'utilisateur clique sur le bouton pour ouvrir le modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="relative">
      {/* Affiche une vue de chargement pendant que les données sont récupérées */}
      {isLoading && loadingView()}

      {/* Barre de navigation */}
      <Navbar isSalonPage={true} />

      <div className="mt-16 mb-5 px-5 md:px-10 2xl:px-14">

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
                    onClick={() => {/* Votre fonction pour ouvrir le modal ici */ }}
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
                    onClick={() => {/* Votre fonction pour ouvrir le modal ici */ }}
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
              <p className="text-black font-bold text-2xl 2xl:text-3xl">
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
                <p className="-mb-2"> 4.7</p> <br />
                <p className="mt-2"> <small><small>  (note sur cette coiffure) </small></small> </p>
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
            <div className="flex flex-col gap-6 w-full md:w-[350px] xl:w-[420px] 2xl:w-[470px] border border-[#E1E1E1] rounded-3xl py-6 px-8 2xl:px-10 shadow-lg">
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
              Réservez un créneau
            </button>
            {/* Ajoutez le bouton pour ouvrir le modal ici */}
            <button
              onClick={openModal}
              className={`mt-4 ${Theme_A.button.medBlackColoredButton}`}
            >
              Contacter le salon
            </button>
          </div>
        </div>

        {/* Import Google map here */}


        {/* Section des coiffeurs */}
        <div className="mt-20 bg-stone-50 p-8 rounded-lg shadow-sm opacity-90 "> {/* Vignette générale ajoutée ici */}
          <p className="text-5xl font-semibold text-black text-center">
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
                      {isModalOpen && (
                        <ChatModal
                          isModalOpen={isModalOpen}
                          closeModal={closeModal}
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
      </div>

      <div className="pb-16 mt-40 relative z-[-1]"> {/* Ici nous appliquons le z-index et position:relative */}
        <LogoCircleFixLeft />
      </div>
      <Footer />
    </div >

  );
};

export default SearchSalon;
