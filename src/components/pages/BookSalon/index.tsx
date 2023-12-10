"use client";
import { client } from "@/api/clientSide";
import DatePicker from "@/components/UI/DatePicker";
import Navbar from "@/components/shared/Navbar";
import {
  CalenderIcon, LeftArrowIcon, RightArrowIcon, CheckedIcon
} from "@/components/utilis/Icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import userLoader from "@/hooks/useLoader";
import { Hairdresser, Slot } from "@/types";
import { getLocalStorage, setLocalStorage } from "@/api/storage";
import { BackArrow } from "@/components/utilis/Icons";
import { Theme_A, ColorsThemeA } from "@/components/utilis/Themes";
import Footer from "@/components/UI/Footer";
import { LogoCircleFixRight } from "@/components/utilis/Icons";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import StarRatings from "react-star-ratings";
import { salonApi } from "@/api/salonSide";

const BookSalon = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<[]>([]);
  const [selectedHairdresser, setSelectedHairdresser] = useState({ name: '', id: 0 });
  const [showCalender, setShowCalender] = useState(false)
  const haircut = getLocalStorage("haircut")
  const haircutData = haircut ? JSON.parse(haircut) : null
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [hairDressers, setHairDressers] = useState<Hairdresser[]>([])
  const route = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([])
  const [hairCut, setHairCut] = useState({});
  const [price, setPrice] = useState(15)
  const { loadingView } = userLoader();
  const salonData = getLocalStorage('selectedSalon')
  const userData = getLocalStorage("user")
  const service_ids = getLocalStorage('ServiceIds')

  const salon = salonData ? JSON.parse(salonData) : null
  const user = userData ? JSON.parse(userData) : null
  const services = service_ids ? JSON.parse(service_ids) : null
  // TODO SEE IF THE SALON IS MOBILE - SELECT AT HOME OR IN SALON BOOKING 
  const [locationType, setLocationType] = useState('salon');
  const durationTime = salon?.total_duration
  const items = [
    { name: "Type de coiffure", desc: "Curly" },
    { name: "Couleur", desc: "Blond" },
    { name: "Durée", desc: "2 heures " },
    { name: "Lieu", desc: "à domicile" },
  ];

  useEffect(() => {
    salon?.salon_images.forEach((img) => {
      if (img.is_cover) {
        setSelectedImage(img.image)
      }
    })
  }, [salon])

  useEffect(() => {
    setSelectedDate(new Date())
    getAllHairDresser()
  }, [])

  useEffect(() => {
    getSlots()
  }, [selectedHairdresser, selectedDate])

  useEffect(() => {
    getBillKMPrice();
  }, [locationType])

  const getAllHairDresser = async () => {
    if (salon) {
      setIsLoading(true);
      setHairDressers(salon?.salon_hairdressers)
      setHairCut(salon?.haircut)
      setSelectedHairdresser({ name: salon?.salon_hairdressers[0].name, id: salon?.salon_hairdressers[0].id })
      setIsLoading(false);
    }
  };

  const getBillKMPrice = async () => {
    const resp = await salonApi.getBillPerKM(user?.id, salon.user_id);
    console.log(resp.data.data.price);
    setPrice(Math.round(resp.data.data.price * 100) / 100)
  }

  const getSlots = async () => {
    setIsLoading(true);
    if (selectedHairdresser.id && selectedDate) {
      const yyyy = selectedDate.getFullYear().toString();
      let mm = (selectedDate.getMonth() + 1).toString(); // Months start at 0!
      let dd = selectedDate.getDate().toString();

      if (dd < '10') dd = '0' + dd;
      if (mm < '10') mm = '0' + mm;
      const formattedDate = dd + '-' + mm + '-' + yyyy;
      const data = {
        date: formattedDate
      }
      await client.getSlots(selectedHairdresser.id, data)
        .then((resp) => {
          setSlots(resp.data.data);
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false);
        })
    }
  };

  const DateFormat = (date: Date, isPayload?: boolean) => {
    const day = `${String(date)[0]}${String(date)[1]}${String(date)[2]}`
    const formattedDate = `${new Date(date).getFullYear()}-${new Date(date).getMonth()}-${new Date(date).getDate()}`
    if (isPayload) {
      return formattedDate
    } else {
      return day + ' ' + formattedDate
    }
  }
  const onSelectedDate = (date: Date) => {
    setSelectedDate(date)
    setSelectedSlot([])
  }


  const onContinue = () => {
    setLocalStorage('slotData', JSON.stringify({ hairDresser: selectedHairdresser, slot: selectedSlot }))
    const year = selectedDate ? String(selectedDate?.getFullYear()) : '';
    const month = selectedDate ? String(selectedDate?.getMonth() + 1).padStart(2, '0') : '';  // Month is zero-indexed
    const day = selectedDate ? String(selectedDate?.getDate()).padStart(2, '0') : '';
    setLocalStorage('selectDate', `${year}-${month}-${day}`)

    route.push('/payment')
  }

  const onSelectSlot = (slot: any) => {
    const currentIndex = slots.findIndex((item) => item.id === slot.id);
    if (currentIndex !== -1) {
      const selectedObjects: any = [];
      const ddd = Number(getLocalStorage('slotTime'))
      const time = durationTime

      let maxValue = currentIndex
      if (Number.isInteger(time / 30)) {
        maxValue = currentIndex + time / 30 - 1
      } else {
        maxValue = currentIndex + Math.floor(time / 30)
      }

      for (let i = currentIndex; i <= maxValue; i++) {
        if (slots[i]) {
          if (slots[i].is_booked) {
            selectedObjects.splice(0)
            break;
          }
          selectedObjects.push(slots[i]);
        } else {
          selectedObjects.splice(0)
          break;
        }
      }
      setSelectedSlot(selectedObjects)
    };
  };

  const handleChangeDate = (days) => {
    if (selectedDate) {
      // Crée une nouvelle date basée sur la date sélectionnée et ajoute ou soustrait des jours
      const newDate = new Date(selectedDate);
      newDate.setDate(newDate.getDate() + days);

      // Met à jour la date sélectionnée avec la nouvelle date
      // Assurez-vous que 'onSelectedDate' accepte un objet Date
      onSelectedDate(newDate);
    }
  };

  // Gestionnaire de clic pour les boutons personnalisés
  const handleLocationTypeClick = async (type) => {
    setLocationType(type);
  };


  return (
    <div>
      {isLoading && salon && loadingView()}
      <Navbar hideSearchBar={true} />

      {/* RETOUR AU PROFIL */}
      <div className='flex items-start cursor-pointer mt-8 mb-8 sm:mx-10 2xl:mx-14' onClick={() => route.push('/salon/profile')}>
        <BackArrow />
        <p className={`${Theme_A.textFont.navigationGreyFont}`}>Retour au profil de {salon?.name}</p>
      </div>

      {/* CADRE SUPERIEUR */}
      <div className="flex lg:flex-row flex-col items-center justify-center ml-12 gap-8">
        {/* IMAGE PRINCIPALE */}
        <div className="w-64 h-64 lg:w-44 lg:h-44 xl:w-[500px] 2xl:w-[600px] xl:h-[500px] 2xl:h-[600px] rounded-2xl ">
          {salon && (
            <div className="w-full h-full relative">
              <Image
                src={
                  selectedImage.includes('http')
                    ? selectedImage
                    : `https://api.onehaircut.com${selectedImage}`
                }
                alt="Image principale du salon"
                layout="fill"
                objectFit="fill"
                className="rounded-2xl shadow-sm shadow-stone-600"
              />
            </div>
          )}
        </div>

        {/* INFORMATIONS DU SALON */}
        <div className=" h-auto bg-stone-50 rounded-xl shadow-sm shadow-stone-400 border-b-2 border-[#aeaeae] p-8 m-4">
          {salon && (
            <div>
              <p className="w-80 text-3xl text-center font-bold text-stone-800  pb-3">
                {salon?.name}
              </p>

              <div className="flex items-center gap-1 border-b-2 border-[#DBDBDB] text-xl 2xl:text-2xl font-semibold text-black pb-3 mt-1">
                <StarRatings
                  rating={salon?.haircut.rating}
                  starRatedColor="#FEDF10"
                  starSpacing="4px"
                  starDimension="25px"
                  numberOfStars={5}
                  name="rating"
                />
                {/* TODO use salon's rating of the selected haircut {salonProfile.rating}*/}
                <p className="-mb-2"> {salon?.haircut.rating}</p> <br /> <small><small>  ({salon?.haircut.rating_counts} avis</small></small> <p className="font-normal"><small><small><small>* sur cette coiffure</small></small></small> <br /></p> <small><small> ) </small></small>
              </div>
            </div>
          )}
          {salon && (
            <div className="flex flex-col gap-2 text-xl font-medium mt-6">
              {haircutData && (
                <div>
                  <p className="font-semibold text-lg ">Choix de la coiffure: </p>
                  <p className="flex items-center gap-1 text-stone-600 text-base italic">{haircutData?.name}</p>
                </div>
              )}

              {services && (
                <div>
                  <p className="font-semibold text-lg ">Choix des services: </p>
                  <ul className="list-disc list-inside text-stone-600 text-xs italic">
                    {services.map((service, index) => (
                      <li key={index}>{service.name}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <p className="font-semibold text-lg ">Durée: </p>
                <p className="flex items-center gap-1 text-stone-600 text-sm italic">{salon?.total_duration} minutes</p>
              </div>

              <p className="font-semibold text-lg">Lieu: </p>
              <div className="flex space-x-4 text-sm">
                {/* Bouton personnalisé pour "À domicile" avec texte centré */}
                <div className="flex items-center space-x-2">
                  <div
                    onClick={() => {
                      if (salon?.is_mobile === "yes") {
                        handleLocationTypeClick('domicile');
                      }
                    }}
                    className={`w-6 h-6 flex items-center justify-center cursor-pointer rounded bg-[#D6D6D6]  ${salon?.is_mobile === 'yes'
                      ? locationType === 'domicile'
                        ? `${ColorsThemeA.ohcVerticalGradient_A}`
                        : 'hover:scale-125 transition duration-300'
                      : ''
                      }`}
                  >
                    {locationType === 'domicile' && <CheckedIcon />}
                  </div>
                  <span
                    className={`${salon?.is_mobile === 'yes'
                      ? "text-stone-700 font semi-bold"
                      : "font-medium text-stone-400"
                      }`}
                  >
                    À domicile
                  </span>
                </div>

                {/* Bouton personnalisé pour "En salon" avec texte centré */}
                <div className="flex items-center space-x-2">
                  <div
                    onClick={() => handleLocationTypeClick('salon')}
                    className={`w-6 h-6 flex items-center justify-center cursor-pointer rounded hover:scale-125 transition duration-300 ${locationType === 'salon' ? ColorsThemeA.ohcVerticalGradient_A : "bg-[#D6D6D6]"}`}
                  >
                    {locationType === 'salon' && <CheckedIcon />}
                  </div>
                  <span>En salon</span>
                </div>
              </div>

              {locationType === 'domicile' && (
                <>
                  <p className="text-xs text-stone-600 italic">{user?.street}<br />{user?.zipcode} {user?.city}<br />{user?.country}<br /></p>
                  <p className="font-semibold text-lg">Prix du déplacement :</p>
                  <div className="flex justify-center items-center bg-white border border-stone-400 rounded-lg px-4 py-2 mt-2">
                    <p className="text-stone-600 text-xl font-bold">{`+ ${price} €`} </p> {/* TODO UPDATE THE PRICE WITH THE MOBILITY COST OF THE SALON */}
                  </div>
                </>
              )}
              {locationType === 'salon' && <p className="text-xs text-stone-600 italic">{salon?.address.street}<br />{salon?.address.zipcode} {salon?.address.city}<br />{salon?.address.country}<br /></p>}
            </div>
          )}
        </div>


        {/* PARTIE STAFF DU SALON */}
        <div className="w-full lg:w-auto lg:mt-0 z-50">
          {hairDressers && hairDressers.length > 1 && (
            <p className="text-lg text-black font-semibold text-center lg:text-left">
              Choisissez votre coiffeur
            </p>
          )}
          {hairDressers && hairDressers.length > 1 && (
            <p className="text-sm text-stone-400 italic text-left">
              {salon?.name} fera au mieux pour respecter votre choix <br /> <br />
            </p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-1 2xl:gap-6 mt-4">
            {hairDressers.map((hairdresser, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setSelectedHairdresser({ name: hairdresser.name, id: hairdresser.id })}
                  className={`relative flex flex-col items-center justify-center p-4 border rounded-2xl cursor-pointer hover:border-stone-400 bg-stone-50 shadow-sm shadow-stone-500 ${selectedHairdresser.id === hairdresser.id ? "border-2 border-x-red-500 border-y-orange-500" : "border-white"}`}
                >
                  <div
                    className="relative xl:w-30 xl:h-30 2xl:w-36 2xl:h-36 w-20 h-20 mb-2"
                    style={{ minWidth: '100px', minHeight: '100px' }}
                  >
                    <Image
                      src={
                        hairdresser.profile_image
                          ? (hairdresser.profile_image.includes('http')
                            ? hairdresser.profile_image
                            : 'https://api.onehaircut.com/' + hairdresser.profile_image)
                          : hairdresser.avatar && hairdresser.avatar.image
                            ? 'https://api.onehaircut.com/' + hairdresser.avatar.image
                            : '' // Remplacez par l'URL de votre image par défaut
                      }
                      alt={`Coiffeur ${hairdresser.name}`}
                      layout="fill"
                      className="rounded-xl shadow-inner object-cover"
                    />
                  </div>
                  <p className="mt-2 text-center text-sm font-semibold text-black">{hairdresser.name}</p>
                  {/* Élément de cercle conditionnel */}
                  {selectedHairdresser.id === hairdresser.id && (
                    <div className="absolute bottom-0 translate-y-1/2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold justify-center items-center">
                        <CheckOutlinedIcon style={{ width: '15px', height: '15px' }} />
                      </span>
                    </div>
                  )}

                </div>
              );
            })}
          </div>


        </div>

      </div>



      {/* PARTIE RESERVATION DE SLOT */}
      <div className="flex justify-center z-50">
        <div className=" max-w-[800px] mx-2 bg-white border-2 border-[#c3c3c3] py-2 rounded-[22px] mb-16 shadow-sm shadow-stone-600 mt-8">

          {/* TITRE */}
          <div className="flex justify-center">
            <p className="text-xl text-black font-semibold lg:text-center mb-2 ">Sélectionnez une date</p>
          </div>

          {/* INFO ABOUT HAIRDRESSER SELECTION */}
          <p className="text-sm text-stone-400 italic mb-8 text-center">
            Les disponibilités dépendent du coiffeur sélectionné
          </p>


          <div className="flex flex-col sm:flex-row items-center justify-evenly px-1 sm:px-10">
            {/* DATEPICKER */}
            <div className="relative">
              <div className="cursor-pointer hover:scale-110 transition duration-300 mr-4" onClick={() => setShowCalender(!showCalender)}>
                <CalenderIcon />
              </div>
              {showCalender &&
                <div className={`shadow-lg`}> {/* Ajoutez ici la classe pour l'ombre */}
                  <DatePicker
                    startDate={new Date()}
                    close={() => setShowCalender(false)}
                    onSelectedDate={onSelectedDate}
                  // Ajoutez ici les props nécessaires pour personnaliser le style des dates sélectionnées
                  />
                </div>
              }
            </div>


            {/* NAVIGATION DE LA DATE */}
            <div className="flex items-center">
              {/* Flèche Gauche */}
              {selectedDate && new Date(selectedDate) > new Date() &&
                <button
                  className="cursor-pointer hover:scale-110 transition duration-300 mr-4"
                  onClick={() => handleChangeDate(-1)}>
                  <LeftArrowIcon />
                </button>
              }

              {/* AFFICHAGE DE LA DATE */}
              <p className={`text-[#ffffff] text-lg font-medium ${ColorsThemeA.OhcGradient_A} shadow-sm shadow-stone-600 rounded-lg px-6 py-3`}>
                {selectedDate ? new Intl.DateTimeFormat('fr-FR', {
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                }).format(new Date(selectedDate)) : "Sélectionnez une date"}
              </p>

              {/* Flèche Droite */}
              <button
                className="cursor-pointer hover:scale-110 transition duration-300 ml-4"
                onClick={() => handleChangeDate(1)}>
                <RightArrowIcon />
              </button>
            </div>
          </div>



          {/* SLOTS */}
          <div className="flex items-center justify-center mt-6 mb-4 px-4">
            {slots.length ?
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-7">
                {slots.map((slot: any, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => { slot.is_booked ? "" : onSelectSlot(slot) }}
                      className={`w-24 h-14 flex items-center justify-center text-xl font-semibold border rounded-2xl  ${slot.is_booked ? "curson-not-allowed" : "cursor-pointer"}  text-black ${selectedSlot.some((item: any) => item.id === slot.id)
                        ? "bg-[#fbd3c6] text-[#312c2a] "
                        : "border-[#b8b8b8] "
                        } ${slot.is_booked && "bg-[#f1f1f1] shadow-inner shadow-stone-600 text-gray-400 cursor-not-allowed"}`}
                    >
                      {slot.start}
                    </div>
                  );
                })}

              </div>
              :
              <p className="text-[#A0A0A0] text-xl font-medium mb-8">Aucun créneau disponible pour cette date</p>
            }
          </div>


          {/* Bouton de réservation */}
          <div className="flex justify-center mt-6 mb-4 ">
            <button
              disabled={!selectedSlot.length}
              onClick={onContinue}
              className={`w-72 h-14 rounded-xl text-xl font-semibold text-white ${selectedSlot.length ? Theme_A.button.medBlackColoredButton : 'bg-[#bcbcbc] cursor-not-allowed'}`}
            >
              Réservez ce créneau
            </button>
          </div>

        </div>


        <LogoCircleFixRight />
        <Footer />

      </div >
    </div>
  );
};

export default BookSalon;
