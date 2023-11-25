"use client";
import { client } from "@/api/clientSide";
import DatePicker from "@/components/UI/DatePicker";
import Navbar from "@/components/shared/Navbar";
import {
  CalenderIcon,
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
  const { loadingView } = userLoader();
  const salonData = getLocalStorage('selectedSalon')

  const service_ids = getLocalStorage('ServiceIds')

  const salon = salonData ? JSON.parse(salonData) : null
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

  const getAllHairDresser = async () => {
    if (salon) {
      setIsLoading(true);
      setHairDressers(salon?.salon_hairdressers)
      setHairCut(salon?.haircut)
      setSelectedHairdresser({ name: salon?.salon_hairdressers[0].name, id: salon?.salon_hairdressers[0].id })
      setIsLoading(false);
    }
  };

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
      const selectedObjects:any = [];
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
      <div className="flex flex-row items-start justify-center ml-12 gap-8">
        {/* IMAGE PRINCIPALE */}
        <div className="w-[320px] lg:w-[500px] 2xl:w-[600px] h-64 lg:h-[500px] relative rounded-4xl p-2 mb-3 ">
          {salon && (
            <div className="w-full h-full relative rounded-full">
              <Image
                src={
                  selectedImage.includes('http')
                    ? selectedImage
                    : `https://api.onehaircut.com${selectedImage}`
                }
                alt="Image principale du salon"
                layout="fill"
                objectFit="fill"
                className="rounded-3xl shadow-sm shadow-stone-600"
              />
            </div>
          )}
        </div>

        {/* INFORMATIONS DU SALON */}
        <div className=" h-64 lg:h-[470px]  bg-stone-50 rounded-xl shadow-sm shadow-stone-400 border-b-2 border-[#aeaeae] p-8 m-4">
          {salon && (
            <p className="w-80 text-3xl text-center font-bold text-stone-800  border-b-2 border-[#d7d7d7] pb-3">
              {salon?.name}
            </p>
          )}
          {salon && (
            <div className="flex flex-col gap-3 text-xl font-medium mt-6">
              {haircutData && (
                <div >
                  <p className="font-semibold text-lg ">Choix de la coiffure: </p>
                  <p className="flex items-center gap-2 text-stone-700 text-base italic">{haircutData?.name}</p>
                </div>
              )}
              <div>
                <p className="font-semibold text-lg ">Durée: </p>
                <p className="flex items-center gap-2 text-stone-700 text-base italic">{salon?.total_duration} minutes</p>
              </div>
              <div >
                <p className="font-semibold text-lg ">Lieu: </p>
                <p className="flex items-center gap-2 text-stone-700 text-base italic">{salon?.Adresse}</p>
              </div>
            </div>
          )}
        </div>


        {/* PARTIE STAFF DU SALON */}
        <div className="w-full lg:w-auto lg:mt-0">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 2xl:gap-6 mt-4">
            {hairDressers.map((hairdresser, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setSelectedHairdresser({ name: hairdresser.name, id: hairdresser.id })}
                  className={`relative flex flex-col items-center justify-center p-4 border rounded-2xl cursor-pointer hover:border-stone-400 bg-stone-50 shadow-sm shadow-stone-500 ${selectedHairdresser.id === hairdresser.id ? "border-2 border-x-red-500 border-y-orange-500" : "border-white"}`}
                >
                  <div className="relative w-32 h-32 mb-2" style={{ minWidth: '128px', minHeight: '128px' }}>
                    <Image
                      src={hairdresser.profile_image ? (hairdresser.profile_image.includes('http') ? hairdresser.profile_image : 'https://api.onehaircut.com/' + hairdresser.profile_image) : `https://api.onehaircut.com/avatars/man/man_01.jpg`}
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
      <div className="mx-auto max-w-[600px] bg-white border-2 border-[#c3c3c3] py-2 rounded-[22px] mb-16 shadow-sm shadow-stone-600 mt-8">

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
            <div className="cursor-pointer hover:scale-110 transition duration-300" onClick={() => setShowCalender(!showCalender)}>
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

          {/* AFFICHAGE DE LA DATE */}
          <p className={`text-[#ffffff] text-lg font-medium ${ColorsThemeA.OhcGradient_A} shadow-sm shadow-stone-600 rounded-lg px-6 py-3 `} >
            {selectedDate && new Intl.DateTimeFormat('fr-FR', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            }).format(new Date(selectedDate))}
          </p>

        </div>

        {/* SLOTS */}
        <div className="flex items-center justify-center mt-6 mb-4">
          {slots.length ?
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-6 gap-y-7">
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

    </div>
  );
};

export default BookSalon;
