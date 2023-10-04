"use client";
import { client } from "@/api/clientSide";
import Navbar from "@/components/shared/Navbar";
import {
  Instagram,
  LogoIcon,
  QuotationFillIcon,
  QuotationIcon,
  ChatSendIcon,
  CrossIcon,
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
}

const SearchSalon = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [salonProfile, setSalonProfile] = useState<SalonProfile>({ name: '', rating: '', salon_images: [{ image: '', is_cover: true }], salon_hairdressers: [{ name: '', profile_image: '' }] })
  const router = useRouter()
  const { loadingView } = userLoader();
  const salon = getLocalStorage('selectedSalon')
  const salonId = salon ? JSON.parse(salon).id : null
  const hours = [
    { title: "Lundi", hours: "Fermé" },
    { title: "Mardi", hours: "10:00 - 19:00" },
    { title: "Mercredi", hours: "10:00 - 19:00" },
    { title: "Jeudi", hours: "10:00 - 19:00" },
    { title: "Vendredi", hours: "10:00 - 19:00" },
    { title: "Samedi", hours: "10:00 - 19:00" },
    { title: "Dimanche", hours: "10:00 - 19:00" },
  ];
  // Créez un état pour suivre si le modal est ouvert ou fermé
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Cette fonction sera appelée lorsque l'utilisateur clique sur le bouton pour ouvrir le modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Cette fonction sera passée au modal pour le fermer lorsqu'il est ouvert
  const closeModal = () => {
    setIsModalOpen(false);
  };
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

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ content: string, sent: boolean }[]>([]);

  {/* TODO Replace with the correction message function */ }
  const sendMessage = () => {
    if (message) {
      setMessages([...messages, { content: message, sent: true }]);
      setMessage("");
      // Pour simuler la réception d'un message
      setMessages(prev => [...prev, { content: "Réponse automatique", sent: false }]);
    }
  };

  // Définition du type des propriétés (props) attendues par le composant `BaseModal`
  interface ModalType {
    children: JSX.Element,  // Les éléments JSX enfant à afficher dans le modal
    close: () => void,  // La fonction à exécuter pour fermer le modal
    width?: string,  // La largeur du modal (optionnelle)
    height?: string  // La hauteur du modal (optionnelle)
  }

  // Déclaration du composant `BaseModal`
  const BaseModal = ({ children, close, width, height }: ModalType) => {
    return (
      // Div englobante pour positionner le modal
      <div className="relative z-50">
        {/* Div fixée pour centrer le contenu et pour superposer le modal au contenu de la page */}
        <div className="fixed top-0 left-0 h-full w-screen overflow-y-auto flex justify-center items-center z-50">
          {/* Div pour l'arrière-plan sombre semi-transparent qui s'étend sur toute la page, et qui ferme le modal lorsqu'on clique dessus */}
          <div className="fixed top-0 left-0 h-full w-screen bg-black bg-opacity-40 cursor-pointer z-40" onClick={close} />
          {/* Div relative pour encapsuler le contenu du modal */}
          <div className="relative z-50">
            {/* Bouton pour fermer le modal, positionné absolument en haut à droite du modal */}
            <div className={`absolute -top-5 right-0 sm:-right-2 z-50 flex items-center justify-center w-12 h-12 text-darkBlue font-semibold cursor-pointer rounded-xl shadow-md ${ColorsThemeA.ohcVerticalGradient_A}`} onClick={close}>
              {/* Icône de croix pour le bouton de fermeture */}
              <CrossIcon />
            </div>
            {/* Div pour le contenu du modal. Sa largeur est définie soit par la prop `width` si elle est fournie, soit à min-w-[470px] par défaut. La hauteur est définie par la prop `height` si elle est fournie, sinon elle n'est pas contrainte */}
            <div className={`bg-white rounded-xl max-h-full overflow-y-auto no-scrollbar px-6 mx-4 md:px-8 py-6 ${width ? width : 'md:min-w-[470px]'} ${height ? height : ''}`}>
              {/* Affichage des enfants JSX passés en tant que prop `children` */}
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="relative">
      {/* Affiche une vue de chargement pendant que les données sont récupérées */}
      {isLoading && loadingView()}

      {/* Image en arrière-plan */}
      <img src="/assets/registration_bg_bottom.png" className="absolute -bottom-5 w-full" />

      {/* Barre de navigation */}
      <Navbar isSalonPage={true} />

      <div className="mt-16 mb-5 px-5 md:px-10 2xl:px-14">

        {/* Section d'image et d'informations du salon */}
        <div className="flex flex-col lg:flex-row items-center md:items-start xl:justify-between gap-11">

          <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-8 2xl:gap-12">
            <div>

              {/* Image principale du salon */}
              <div className="w-[320px] lg:w-[400px] 2xl:w-[483px] h-64 lg:h-80 relative">
                <Image src={selectedImage.includes('https://api-server.onehaircut.com/public') ? selectedImage : `https://api-server.onehaircut.com/public${selectedImage}`} alt="" fill={true} />
              </div>

              {/* Images miniatures du salon */}
              <div className="flex items-center gap-3 mt-3">
                {salonProfile.salon_images.map((img, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedImage(img.image)}
                      className="relative w-24 lg:w-32 2xl:w-36 h-24 lg:h-32 2xl:h-36 cursor-pointer"
                    >
                      <Image src={img.image.includes('https://api-server.onehaircut.com/public') ? img.image : `https://api-server.onehaircut.com/public${img.image}`} alt="" fill={true} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Nom et notation du salon */}
            <div className="md:mt-5">
              <p className="text-black font-bold text-2xl 2xl:text-3xl">
                {salonProfile.name}
              </p>
              <div className="flex items-center gap-1 border-b-2 border-[#DBDBDB] text-xl 2xl:text-2xl font-semibold text-black pb-3 mt-1">
                <StarRatings
                  rating={1}
                  starRatedColor="#FEDF10"
                  starSpacing="4px"
                  starDimension="25px"
                  numberOfStars={1}
                  name="rating"
                />
                <p className="-mb-2">{salonProfile.rating}</p>
              </div>
            </div>
          </div>

          {/* Horaires et bouton de réservation */}
          <div className="w-full md:w-auto flex flex-col items-center justify-center">
            <div className="flex flex-col gap-6 w-full md:w-[350px] xl:w-[420px] 2xl:w-[470px] border border-[#E1E1E1] rounded-3xl py-6 px-8 2xl:px-10 shadow-[0px_4px_24px_0px_rgba(183,183,183,0.25)]">
              {hours.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between text-xl 2xl:text-2xl font-medium text-[#898989]"
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
            {/* Affichez le modal si `isModalOpen` est vrai */}
            {isModalOpen && (
              <BaseModal close={closeModal} width="500px" height="600px" z-index="10">

                {/* Zone de messagerie */}
                <div className="flex flex-col gap-2 ">
                  <div className="text-center text-xl">
                    <strong>Posez votre question</strong>
                  </div>
                  <div className="text-center ">
                    Le salon vous répondra aussi rapidement qu'il le peut.<br />
                    Vous pourrez consulter la réponse <br /> dans votre centre de messagerie
                  </div>

                  {/* Conversation */}
                  <div className=" border border-gray-300 rounded-xl p-2 rounded-bl-lg overflow-auto h-40 bg-stone-100 shadow-inner mb-2 ">
                    {messages.map((msg, index) => (
                      <div key={`msg-${index}`} className={`${msg.sent ? 'text-right' : 'text-left '} mb-2`}>
                        <div
                          className={`inline-block p-2 text-xs outline-1 ${msg.sent ? 'rounded-l-lg rounded-b-lg outline outline-orange-500 bg-stone-100 ' : 'rounded-r-lg rounded-b-lg outline outline-stone-400 bg-white'}`}
                        >
                          <strong>{msg.sent ? 'Vous:' : 'Client:'}</strong> {msg.content}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Zone d'écriture et envoi - ajouter nKeyDown={handleKeyPress} pour valider le message avec Enter */}
                  <div className="flex gap-1">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Écrire un message"
                      className="flex-grow border border-gray-300 rounded-xl p-2 min-w-0 focus:outline-none focus:border-red-500 shadow-inner"

                    />
                    <button type="button" onClick={sendMessage} className="transform hover:scale-105 " > <ChatSendIcon /> </button>
                  </div>
                </div>
              </BaseModal>
            )}
          </div>
        </div>

        {/* Galerie d'images du salon */}
        <div className="flex items-center justify-center">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-12 mt-20">
            {salonProfile.salon_images.map((img, index) => {
              return (
                <div
                  key={index}
                  className="relative w-full sm:w-[280px] md:w-[315px] xl:w-[390px] 2xl:w-[487px] h-60 md:h-64 xl:h-72 2xl:h-80 bg-[#D9D9D9] rounded-3xl"
                >
                  <Image src={img.image.includes('https://api-server.onehaircut.com/public') ? img.image : `https://api-server.onehaircut.com/public${img.image}`} alt="" fill={true} className="rounded-3xl" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Section des coiffeurs */}
        <div className="mt-20">
          <p className="text-5xl font-semibold text-black text-center">
            Coiffeur
          </p>
          <div className="flex items-center justify-center mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-20 ">
              {salonProfile.salon_hairdressers.map((hairdresser, index) => {
                return (
                  <div key={index}>
                    <div className="relative w-52 lg:w-64 h-52 lg:h-64 rounded-[20px]">
                      <Image
                        src={hairdresser.profile_image && hairdresser.profile_image.includes('https://api-server.onehaircut.com/public') ? hairdresser.profile_image : `https://api-server.onehaircut.com/public${hairdresser.profile_image}`}
                        alt=""
                        fill={true}
                        className="rounded-[20px]"
                      />
                    </div>
                    <p className="text-2xl text-black font-medium text-center mt-1">
                      {hairdresser.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Logo en bas de la page */}
        <div className="pb-16 mt-20">
          <LogoIcon />
        </div>
      </div>
    </div >
  );
};

export default SearchSalon;
