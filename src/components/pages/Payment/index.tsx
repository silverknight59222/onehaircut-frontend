"use client";
import { client } from "@/api/clientSide";
import { dashboard } from "@/api/dashboard";
import Image from "next/image";
import { getLocalStorage, removeFromLocalStorage, setLocalStorage } from "@/api/storage";
import Navbar from "@/components/shared/Navbar";
import {
  CardIcon,
  RegistrationCheckedIcon,
} from "@/components/utilis/Icons";
import useSnackbar from "@/hooks/useSnackbar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import userLoader from "@/hooks/useLoader";
import BaseModal from "@/components/UI/BaseModal";
import StripePayment from "@/components/pages/StripePayment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Theme_A } from "@/components/utilis/Themes";

const Index = () => {
  const router = useRouter();
  const showSnackbar = useSnackbar()
  const temp = getLocalStorage("user");
  const user = temp ? JSON.parse(temp) : null  
  const haircut = getLocalStorage("haircut")
  const hairTime = getLocalStorage("slotTime")
  const haircutTime = hairTime ? JSON.parse(hairTime) : null
  const durationData = getLocalStorage('serviceDuration')
  const durationTime = durationData ? JSON.parse(durationData) : null
  const priceData = getLocalStorage('servicePrice')
  const servicePrice = priceData ? JSON.parse(priceData) : null
  const hairTimeData = +haircutTime + durationTime
  const haircutData = haircut ? JSON.parse(haircut) : null
  const salon = getLocalStorage('selectedSalon')
  const salonData = salon ? JSON.parse(salon) : null
  const services = getLocalStorage('ServiceIds')
  const servicesData = services ? JSON.parse(services) : null
  const datetime = getLocalStorage('selectDate')
  const slot = getLocalStorage('slotData')
  const slotData = slot ? JSON.parse(slot) : null
  const [haircutPrize, setHaircutPrize] = useState(0)
  const [servicePrize, setServicePrize] = useState<number>()
  const { loadingView } = userLoader();
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false)
  const [duration, setDuration] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [stripePromise, setStripePromise] = useState<string>("pk_test_51OBGjoAHQOXKizcuQiaNTSGNA6lftEd3lekpQDN7DGGpx4lQGttBHwI62qzZiq85lelN91uyppVeLUsnC5WfmSZQ00LuhmW4QA");
  const [serviceIds, setServiceIds] = useState<number[]>([])
  const items = [
    { name: "Salon", desc: "Le Bon Coiffeur" },
    { name: "Type de coiffure", desc: "Curly" },
    { name: "Couleur", desc: "Blond" },
    { name: "Temps", desc: "2 heures " },
    { name: "Lieu", desc: "à domicile" },
  ];
  const options = {
    clientSecret: getLocalStorage("secret_key")?.toString()
  };
  const getHaircutPrize = async () => {
    if (haircut) {
      setIsLoading(true)
      const selectedHaircutId = JSON.parse(haircut).id
      await dashboard.getAllSalonHaircuts(Number(salonData.id))
        .then(resp => {
          resp.data.data.forEach((haircut: any) => {
            if (haircut.haircut_id === selectedHaircutId) {
              setHaircutPrize(haircut.base_price)
            }
          });
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }
  function getClassNameForDay(day: any) {
    switch (day) {
      case 'Monday':
        return 'Lundi';
      case 'Tuesday':
        return 'Mardi';
      case 'Wednesday':
        return 'Mercredi';
      case 'Thursday':
        return 'Jeudi';
      case 'Friday':
        return 'Vendredi';
      case 'Saturday':
        return 'Samedi';
      case 'Sunday':
        return 'Dimanche';
      default:
        return 'JourInconnu';
    }
  }

  const getServicesPrize = async () => {
    if (serviceIds?.length) {
      setIsLoading(true)
      const selectedServiceIds = serviceIds
      let price = 0
      await dashboard.getAllSalonServices(Number(salonData.id))
        .then(resp => {
          resp.data.data.forEach((service: any) => {
            selectedServiceIds.forEach((selectedService: number) => {
              if (service.id === selectedService) {
                price += Number(service.price)
              }
            })
          });
          setServicePrize(price + servicePrice)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }
  const onBooking = async () => {
    // const userInfo = JSON.parse(getLocalStorage("user") as string);
    // console.log(userInfo);
    if (isLoggedIn) {
      setIsModal(true)
    } else {
      setIsLoading(true)

      const targetDayOfWeek = slotData.slot[0].day;

      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const number = daysOfWeek.indexOf(targetDayOfWeek);
      const today = new Date();
      const currentDayOfWeek = today.getDay();
      let difference = number - currentDayOfWeek;
      if (difference < 0) {
        difference += 7;
      }
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + difference);

      const formattedDate = targetDate.toISOString().split('T')[0];
      const bookingDate = getLocalStorage('selectDate');
      const data = {
        user_id: user ? user.id : null,
        hair_salon_id: Number(salonData.id),
        slot_ids: slotData.slot.map((prevSlot: any) => prevSlot.id),
        hair_dresser_id: slotData.hairDresser.id,
        amount: salonData.final_price,
        salon_haircut_id: salonData.haircut ? salonData.haircut.id : null,
        services: salonData.services || [],
        date: bookingDate
      }

      await client.createBooking(data)
        .then(resp => {
          // removeFromLocalStorage('haircut')
          // removeFromLocalStorage('slotData')
          // removeFromLocalStorage('ServiceIds')
          // removeFromLocalStorage('selectedSalon')
          setLocalStorage("plan_type", haircutPrize)
          showSnackbar("success", 'Booking Created Successfully');
          //window.open("https://api.whatsapp.com/send?phone=" + userInfo.phone + "&text=Booking Success!", '_blank');
          router.push('/confirm-payment')
        })
        .catch(err => console.log(err))
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  useEffect(() => {
    //const user = getLocalStorage("user");
    const userId = user ? user.id : null;
    if (!userId) {
      setIsLoggedIn(true);
    }
    setMounted(true)
    getHaircutPrize()
    getServicesPrize()
    const arr: number[] = []
    servicesData.forEach((service: { name: string, id: number }) => {
      arr.push(service.id)
    })
    setServiceIds(arr)

    if (hairTimeData > 30 && !Number.isInteger(hairTimeData / 30)) {
      const i = Math.floor(hairTimeData / 30)
      const ppp = 30 * (i + 1) - hairTimeData
      const newTime = calculateTimeAfterSeparatingMinutes(slotData.slot[slotData.slot.length - 1].end, ppp);
      setDuration(newTime)
    } else if (hairTimeData > 30 && Number.isInteger(hairTimeData / 30)) {
      const i = Math.floor(hairTimeData / 30)
      const ppp = 0
      const newTime = calculateTimeAfterSeparatingMinutes(slotData.slot[slotData.slot.length - 1].end, ppp);
      setDuration(newTime)
    }
    else {
      var value = 0;
      if (hairTimeData == 30) {
        value = 0
      } else {
        value = 30 - hairTimeData
      }
      // const newTime = calculateTimeAfterSeparatingMinutes(slotData.slot[0].end, value);
      // setDuration(newTime)
    }
  }, [])

  function calculateTimeAfterSeparatingMinutes(timeString: any, minutesToSeparate: any) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    const newTotalMinutes = totalMinutes - minutesToSeparate;
    let newHours = Math.floor(newTotalMinutes / 60);
    let newMinutes = newTotalMinutes % 60;
    if (newHours < 0) {
      newHours += 24;
    }
    const newTimeString = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;

    return newTimeString;
  }
  
  return (
    <div>
      {isLoading && haircutData && loadingView()}
      <Navbar hideSearchBar={true} />
      <div className="flex flex-col items-center justify-center mt-16 mb-5 px-6 ">
        <div className="w-full md:w-auto flex md:block flex-col items-center justify-center ">


          <p className="text-2xl md:text-4xl text-black font-medium text-center md:text-start mb-4 ">
            Confirmer et payer
          </p>
          <div className="w-full md:w-[750px] lg:w-[940px] pt-10 pb-10 px-6 sm:px-14 bg-[#F8F8F8] rounded-[22px] border border-[#ECECEC] shadow-sm shadow-stone-600">
            <div className="grid grid-cols-2">
              <div className="flex flex-col gap-3 text-xl font-medium text-black">
                {haircutData ? <p className="text-base"><span className="font-bold text-lg   ">Coiffure: </span>{haircutData.name}</p> : ''}
                {servicesData ? <p><span className="font-bold text-lg ">Services: </span>
                  {servicesData.map((item: { name: string, id: number }, index: number) => {
                    return <p key={index} className="text-base">{++index}. {item.name}</p>
                  })}
                </p> : ''}
                {salonData && <p className="text-base"><span className="font-bold text-lg ">Etablissement: </span>{salonData.name}</p>}
                {slotData && <p className="text-base"><span className="font-bold text-lg ">Coiffeur: </span>{slotData.hairDresser.name}</p>}
                {slotData && (<p className="text-base"><span className={`font-bold text-lg `}>Créneau horaire: </span>{getClassNameForDay(slotData.slot[0].day)}</p>)}

                {slotData && <p className="text-base"><span className="font-bold text-lg ">Heure de début: </span>{slotData.slot[0].start}</p>}
                {slotData && <p className="text-base"><span className="font-bold text-lg ">Heure de fin: </span>{slotData.slot[slotData.slot.length - 1].end}</p>}
                {slotData && <p className="text-base"><span className="font-bold text-lg ">Durée totale: </span>{salonData.total_duration} Minutes</p>}
              </div>
              {
              haircutData && haircutData.image && 
                <div className="flex flex-col gap-3 text-xl font-medium text-black">
                  <div className={`${Theme_A.hairstyleCards.cardSize.big} ml-12`}>
                    <Image src={haircutData.image.includes('http') ? haircutData.image : `https://api.onehaircut.com${haircutData.image}`} fill={true} alt="" className="rounded-t-xl" sizes="640w"/>
                  </div>
                </div>
              }
            </div>
            <div className="flex items-center justify-between border-t-2 border-[#CBCBCB] pt-9 mt-9">
              <button onClick={() => router.push('/book-salon')} className={`${Theme_A.button.bigWhiteColoredButton}`}>
                Modifier
              </button>
              <p className="text-5xl md:text-5xl text-black font-semibold">
                €{salonData?.final_price}
              </p>
            </div>
          </div>
          

          <div className="w-full flex items-center justify-center">
            {mounted && (
              <div className="mt-7 w-full md:w-5/12 lg:w-4/12">
                {/* <Elements
                    stripe={loadStripe(stripePromise)}
                    options={options}
                  >
                    <StripePayment/>
                  </Elements> */}
              </div>
            )}
          </div>
          <div className="w-full flex items-center justify-center">
            <button
              onClick={onBooking}
              className={`${Theme_A.button.bigGradientButton}`}
            >
              Vers le paiement{" "}
            </button>
          </div>
        </div>
      </div>
      {isModal &&
        <BaseModal close={() => setIsModal(false)}>
          <div className="my-3">
            <p className="text-center text-xl font-semibold mb-5">You need to login to create booking!</p>
            <div className=' flex items-center justify-center gap-6'>
              <button onClick={() => setIsModal(false)} className='w-32 h-12 flex items-center justify-center border border-black rounded-xl'>Cancel</button>
              <button onClick={() => router.push('/login?redirect=payment')} className={`w-32 h-12 flex items-center justify-center rounded-xl text-white bg-background-gradient`}>Login</button>
            </div>
          </div>
        </BaseModal>}
    </div>
  );
};

export default Index;
