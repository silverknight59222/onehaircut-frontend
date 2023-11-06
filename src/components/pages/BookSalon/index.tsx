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
import { Theme_A } from "@/components/utilis/Themes";


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
      const data = {
        date: selectedDate.toLocaleDateString().replaceAll("/", "-")
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
    const year = String(selectedDate?.getFullYear());
    const month = String(selectedDate?.getMonth() + 1).padStart(2, '0');  // Month is zero-indexed
    const day = String(selectedDate?.getDate()).padStart(2, '0');
    setLocalStorage('selectDate', `${year}-${month}-${day}`)

    route.push('/payment')
  }

  const onSelectSlot = (slot: any) => {
    const currentIndex = slots.findIndex((item) => item.id === slot.id);
    if (currentIndex !== -1) {
      const selectedObjects = [];
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
      {isLoading && loadingView()}
      <Navbar hideSearchBar={true} />

      {/* RETOUR AU PROFIL */}
      <div className='flex items-start cursor-pointer mt-8 mb-8 sm:mx-10 2xl:mx-14' onClick={() => route.push('/salon/profile')}>
        <BackArrow />
        <p className={`${Theme_A.textFont.navigationGreyFont}`}>Retour au profil de {salon.name}</p>
      </div>

      {/* CADRE SUPERIEUR */}
      <div className="flex flex-row items-start justify-start gap-8">
        {/* IMAGE PRINCIPALE */}
        <div className="w-[320px] lg:w-[500px] 2xl:w-[600px] h-64 lg:h-[500px] relative rounded-4xl p-2 mb-3">
          {salon && (
            <div className="w-full h-full relative rounded-4xl">
              <Image
                src={
                  selectedImage.includes('http')
                    ? selectedImage
                    : `https://api.onehaircut.com${selectedImage}`
                }
                alt="Image principale du salon"
                layout="fill"
                objectFit="fill"
                className="rounded-lg"
              />
            </div>
          )}
        </div>

        {/* INFORMATIONS DU SALON */}
        <div>
          {salon && (
            <p className="w-80 lg:w-[400px] xl:w-[500px] text-3xl font-bold text-black border-b-2 border-[#696969] pb-3">
              {salon.name}
            </p>
          )}
          {salon && (
            <div className="flex flex-col gap-3 text-xl font-medium text-black mt-6">
              {haircutData && (
                <div className="flex items-center gap-2 text-black text-xl">
                  <p className="font-semibold">Choix de la coiffure: </p>
                  <p>{haircutData.name}</p>
                </div>
              )}
              <div className="flex items-center gap-2 text-black text-xl">
                <p className="font-semibold">Durée: </p>
                <p>{salon.total_duration} minutes</p>
              </div>
              <div className="flex items-center gap-2 text-black text-xl">
                <p className="font-semibold">Lieu: </p>
                <p>{salon.Adresse}</p>
              </div>
            </div>
          )}
        </div>
      </div>





      {/* PARTIE STAFF DU SALON */}
      <div className="flex flex-col items-center justify-center mt-20">
        <p className="text-4xl text-black font-semibold text-center">
          Choisissez de votre coiffeur
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4 2xl:gap-12 mt-10">
          {hairDressers.map((hairdresser, index) => {
            return (
              <div
                key={index}
                onClick={() => setSelectedHairdresser({ name: hairdresser.name, id: hairdresser.id })}
                className={`flex items-center justify-center w-[311px] h-[376px] border rounded-2xl cursor-pointer hover:border-secondary ${selectedHairdresser.id === hairdresser.id
                  ? "border-secondary"
                  : "border-white"
                  }`}
              >
                <div className="relative">
                  <div className="relative w-[263px] h-[334px] rounded-2xl">

                    <Image
                      src={hairdresser.profile_image ? (hairdresser.profile_image.includes('http') ? hairdresser.profile_image : 'https://api.onehaircut.com/' + hairdresser.profile_image) : `https://api.onehaircut.com/avatars/man/man_01.jpg`}
                      alt=""
                      layout="fill"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/*PARTIE RESERVATION DE SLOT*/}
      <div className="w-full md:w-[750px] lg:w-[940px] border-2 border-[#D0D0D0] py-10 rounded-[22px] mt-20">
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-10">
          <div className="relative">
            <div className="cursor-pointer" onClick={() => setShowCalender(!showCalender)}>
              <CalenderIcon />
            </div>
            {showCalender &&
              <DatePicker startDate={new Date()} close={() => setShowCalender(false)} onSelectedDate={onSelectedDate} />
            }
          </div>
          <p className='text-[#A0A0A0] text-lg font-medium bg-[#F7F7F7] rounded-lg px-6 py-3'>{selectedDate && DateFormat(selectedDate)}</p>
        </div>

        <div className="flex items-center justify-center mt-12 mb-4">
          {slots.length ?
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-10 gap-y-7">
              {slots.map((slot: any, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => { slot.is_booked ? "" : onSelectSlot(slot) }}
                    className={`w-32 h-14 flex items-center justify-center text-xl font-semibold border rounded-2xl  ${slot.is_booked ? "curson-not-allowed" : "cursor-pointer"}  text-black ${selectedSlot.some((item: any) => item.id === slot.id)
                      ? "bg-[#fbd3c6] text-[#473c38]"
                      : "border-[#b8b8b8]"
                      } ${slot.is_booked && "bg-[#4d4a4a]"}`}
                  >
                    {slot.start}
                  </div>
                );
              })}

            </div>
            :
            <p className="text-[#A0A0A0] text-xl font-medium">No slots for today</p>
          }
        </div>
      </div>
      <button disabled={selectedSlot.length > 0 ? false : true} onClick={onContinue} className={`w-72 h-14 rounded-xl text-xl font-semibold text-white mt-10 ${selectedSlot.length > 0 ? 'bg-background-gradient' : 'bg-[#D9D9D9]'}`}>Réservez ce créneau</button>



    </div>
  );
};

export default BookSalon;
