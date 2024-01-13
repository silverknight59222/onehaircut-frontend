"use client";
import { client } from "@/api/clientSide";
import { dashboard } from "@/api/dashboard";
import Image from "next/image";
import { getLocalStorage, removeFromLocalStorage, setLocalStorage } from "@/api/storage";
import Navbar from "@/components/shared/Navbar";
import useSnackbar from "@/hooks/useSnackbar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import userLoader from "@/hooks/useLoader";
import BaseModal from "@/components/UI/BaseModal";
import PaymentForm from "@/components/pages/Payment/PaymentForm";

import { Theme_A } from "@/components/utilis/Themes";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { salonApi } from "@/api/salonSide";

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
  const [serviceIds, setServiceIds] = useState<number[]>([])
  const [stripeKey, setStripeKey] = useState("");
  const [KmPrice, setPrice] = useState(0);
  const OnehaircutFees = 0.09;
  const PaymentGatewayVariableFees = 0.008; //TODO LINK WITH ACTUAL FEES
  const PaymentGatewayFixFees = 0.11;
  let stripePromise = loadStripe(stripeKey);  // public key for stripe
  const items = [
    { name: "Salon", desc: "Le Bon Coiffeur" },
    { name: "Type de coiffure", desc: "Curly" },
    { name: "Couleur", desc: "Blond" },
    { name: "Temps", desc: "2 heures " },
    { name: "Lieu", desc: "à domicile" },
  ];
  let options = {
    clientSecret: ""
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
          //console.log(err)
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
          //console.log(err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }
  const onBooking = async () => {
    // const userInfo = JSON.parse(getLocalStorage("user") as string);
    // //console.log(userInfo);
    if (isLoggedIn) {
      setIsModal(true)
    } else {
      setIsLoading(true)
    }
  }

  const getBillKMPrice = async () => {
    setIsLoading(true)
    await salonApi.getBillPerKM(user?.id, salonData.id)
      .then(resp => {
        console.log(resp.data.data.price);
        setPrice(Math.round(resp.data.data.price * 100) / 100)
      })
      .catch(err => {
        //console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
    // const resp = await salonApi.getBillPerKM(user?.id, salonData.user_id);
    // console.log(resp.data.data.price);
    // setPrice(Math.round(resp.data.data.price * 100) / 100)
    // console.log(price)
  }

  useEffect(() => {
    console.log('Price', KmPrice);
  }, [KmPrice])

  const getStripeKey = async () => {
    setIsLoading(true)
    let resp = await salonApi.getStripeKey();
    stripePromise = loadStripe(resp.data.pk)
    options.clientSecret = resp.data.sk
    setStripeKey(resp.data.pk)
    setIsLoading(false)
  }

  useEffect(() => {
    //const user = getLocalStorage("user");
    const userId = user ? user.id : null;
    if (!userId) {
      setIsLoggedIn(true);
    }
    getHaircutPrize()
    getServicesPrize()
    getBillKMPrice()
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
    getStripeKey()
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Utilisez des chaînes littérales pour les options
    const options = { year: 'numeric' as const, month: 'long' as const, day: 'numeric' as const };
    return new Intl.DateTimeFormat('fr-FR', options).format(date);
  };
  const bookingDate = getLocalStorage('selectDate');
  const formattedBookingDate = bookingDate ? formatDate(bookingDate) : "";


  const updatedOHCfees = (salonData?.final_price + KmPrice) * OnehaircutFees;
  const bookingCost = salonData?.final_price + KmPrice;
  const updatedTransactionFees = (((bookingCost) + ((bookingCost) * OnehaircutFees)) * PaymentGatewayVariableFees + PaymentGatewayFixFees);
  const totalUpdatedCost = parseFloat(bookingCost + updatedOHCfees + updatedTransactionFees).toFixed(2);

  return (
    <div>
      {isLoading && haircutData && loadingView()}
      <Navbar hideSearchBar={true} />
      <div className="flex flex-col items-center justify-center mt-16 mb-12 ">
        <div className="w-full flex  flex-col items-center justify-center ">


          <p className="text-2xl md:text-4xl text-black font-medium text-center md:text-start mb-4 ">
            Confirmer et payer
          </p>
          <div className=" mx-4 md:w-[750px] lg:w-[940px] pt-10 pb-10 px-4 sm:px-14 bg-[#F8F8F8] rounded-[22px] border border-[#ECECEC] shadow-sm shadow-stone-600">
            <div className="flex flex-row justify-around">
              <div className="flex flex-col gap-3 text-xl font-medium text-black">
                {haircutData ? <p className="text-base"><span className="font-bold text-sm   ">Coiffure: </span>{haircutData.name}</p> : ''}
                {servicesData ? <p><span className="font-bold text-sm ">Services: </span>
                  {servicesData.map((item: { name: string, id: number }, index: number) => {
                    return <p key={index} className="text-base">{++index}. {item.name}</p>
                  })}
                </p> : ''}
                {salonData && <p className="text-base"><span className="font-bold text-sm ">Établissement: </span>{salonData.name}</p>}
                {slotData && <p className="text-base"><span className="font-bold text-sm ">Coiffeur: </span>{slotData.hairDresser.name}</p>}
                {slotData && (<p className="text-base"><span className="font-bold text-sm ">Date du rendez-vous: </span>{formattedBookingDate}</p>)}
                {slotData && <p className="text-base"><span className="font-bold text-sm ">Heure de début: </span>{slotData.slot[0].start}</p>}
                {slotData && <p className="text-base"><span className="font-bold text-sm ">Heure de fin: </span>{slotData.slot[slotData.slot.length - 1].end}</p>}
                {slotData && <p className="text-base"><span className="font-bold text-sm ">Durée totale: </span>{salonData.total_duration} Minutes</p>}
                {/* Les frais de déplacement ne doivent apparaître que si le client a choisi une coiffure à domicile */}
                {slotData && <p className="text-base"><span className="font-bold text-sm ">Prix de la coiffure et services: </span> {salonData?.final_price.toFixed(2)}€</p>}
                {slotData && <p className="text-base"><span className="font-bold text-sm ">Frais de déplacement: </span> {KmPrice.toFixed(2)}€ </p>}
                {slotData && <p className="text-base"><span className="font-bold text-sm ">Frais de fonctionnement Onehaircut: </span> {updatedOHCfees.toFixed(2)}€ </p>}
                {slotData && <p className="text-base"><span className="font-bold text-sm ">Frais de transaction : </span> {updatedTransactionFees.toFixed(2)}€ </p>}
              </div>

              {haircutData && haircutData.image &&
                <div className={` relative w-36 h-36 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72`}>
                  <Image src={haircutData.image.includes('http') ? haircutData.image : `https://api.onehaircut.com${haircutData.image}`}
                    fill={true} alt="" className="rounded-t-xl" />
                </div>
              }
            </div>
            <div className="flex items-center justify-around border-t-2 border-[#c12d2d] pt-9 mt-9">
              <button onClick={() => router.push('/book-salon')} className={`${Theme_A.button.bigWhiteColoredButton}`}>
                Modifier
              </button>
              <p className="text-3xl xl:text-4xl text-black font-semibold ml-8">
                Prix total : {totalUpdatedCost}€
              </p>
            </div>
          </div>


          <div className="flex mx-4 mt-4 mb-8 w-max md:w-[750px] lg:w-[940px] px-4 sm:px-14 bg-[#F8F8F8] rounded-[22px] border border-[#ECECEC] shadow-sm shadow-stone-600 justify-center">

            <div className="mt-7 mb-8 w-full md:w-5/12 lg:w-4/12  items-center justify-center">
              <Elements stripe={stripePromise}>
                <PaymentForm onSuccess={onBooking} />
              </Elements>
            </div>
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
