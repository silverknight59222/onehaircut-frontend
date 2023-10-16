"use client";
import { client } from "@/api/clientSide";
import { dashboard } from "@/api/dashboard";
import { getLocalStorage, removeFromLocalStorage } from "@/api/storage";
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

const Index = () => {
  const router = useRouter();
  const showSnackbar=useSnackbar()
  const user = getLocalStorage("user");
  const haircut=getLocalStorage("haircut")
  const haircutData = haircut ? JSON.parse(haircut) : null
  const salon=getLocalStorage('selectedSalon')
  const salonData= salon ? JSON.parse(salon) : null
  const services=getLocalStorage('ServiceIds')
  const servicesData=services ? JSON.parse(services) : null
  const slot = getLocalStorage('slotData')
  const slotData= slot ? JSON.parse(slot) : null
  const [haircutPrize,setHaircutPrize]=useState()
  const [servicePrize,setServicePrize]=useState<number>()
  const { loadingView } = userLoader();
  const [isLoading, setIsLoading] = useState(false);
  const [isModal,setIsModal]=useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [stripePromise, setStripePromise] = useState<string>("pk_test_51IkzH1ExivflHCSmgQfNoQAWOnOcfKopp26Ct493No4QtWa8Cv6HEf9933YbMXcrs6wVR7YjWslQV58IikPujC5U006Imw8zpO");
  const [serviceIds,setServiceIds]=useState<number[]>([])
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
  const getHaircutPrize= async () =>{
    if(haircut){
    setIsLoading(true)
    const selectedHaircutId=JSON.parse(haircut).id
    await dashboard.getAllSalonHaircuts(Number(salonData.id))
    .then(resp=>{
      resp.data.data.forEach((haircut: any) => {
        if(haircut.haircut_id===selectedHaircutId){
          setHaircutPrize(haircut.base_price)
        }
      });
    })
    .catch(err=>{
      console.log(err)
    })
    .finally(()=>{
      setIsLoading(false)
    })
  }
  }

  const getServicesPrize= async () =>{
    if(serviceIds?.length){
    setIsLoading(true)
    const selectedServiceIds=serviceIds
    let price=0
    await dashboard.getAllSalonServices(Number(salonData.id))
    .then(resp=>{
      resp.data.data.forEach((service: any) => {
        selectedServiceIds.forEach((selectedService: number)=>{
          if(service.id===selectedService){
            price+=Number(service.price)
          }
        })
      });
      setServicePrize(price)
    })
    .catch(err=>{
      console.log(err)
    })
    .finally(()=>{
      setIsLoading(false)
    })
  }
  }
  const onBooking= async ()=>{
    if(isLoggedIn){
      setIsModal(true)
    }else{
    setIsLoading(true)
    const data={
      user_id: user ? Number(JSON.parse(user).id) : null,
      hair_salon_id: Number(salonData.id),
      slot_ids:slotData.slot.map((prevSlot:any) => prevSlot.id),
      hair_dresser_id: slotData.hairDresser.id,
      amount: !haircutPrize ? servicePrize : !servicePrize ? haircutPrize : haircutPrize && servicePrize ? haircutPrize + servicePrize : 0,
      salon_haircut_id: haircutData.id,
      services: serviceIds
    }
    await client.createBooking(data)
    .then(resp=>{
      removeFromLocalStorage('haircut')
      removeFromLocalStorage('slotData')
      removeFromLocalStorage('ServiceIds')
      removeFromLocalStorage('selectedSalon')
      showSnackbar("success", 'Booking Created Successfully');
      router.push('/confirm-payment')
    })
    .catch(err=>console.log(err))
    .finally(()=>{
      setIsLoading(false)
    })
    }
  }

  useEffect(()=>{
    const user = getLocalStorage("user");
    const userId = user ? Number(JSON.parse(user).id) : null;
    if (!userId) {
      setIsLoggedIn(true);
    }
    setMounted(true)
    getHaircutPrize()
    getServicesPrize()
    const arr: number[]=[]
    servicesData.forEach((service: {name: string, id: number})=>{
      arr.push(service.id)
    })
    setServiceIds(arr)
  },[])
  return (
    <div>
      {isLoading && loadingView()}
      <Navbar isBookSalon={true} />
      <div className="flex flex-col items-center justify-center mt-16 mb-5 px-6">
        <div className="w-full md:w-auto flex md:block flex-col items-center justify-center">
          <p className="text-2xl md:text-4xl text-black font-medium text-center md:text-start mb-4">
            Confirmer et payer
          </p>
          <div className="w-full md:w-[750px] lg:w-[940px] pt-10 pb-10 px-6 sm:px-14 bg-[#F8F8F8] rounded-[22px] border border-[#ECECEC]">
            <div className="flex flex-col gap-3 text-xl font-medium text-black">
              {/* {items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-black"
                  >
                    <p className="font-semibold">{item.name}: </p>
                    <p>{item.desc}</p>
                  </div>
                );
              })} */}
              {haircutData ? <p className="text-base"><span className="font-semibold text-lg">Haircut: </span>{haircutData.name}</p> : ''}
              {servicesData ? <p><span className="font-semibold text-lg">Services: </span> 
                  {servicesData.map((item: {name: string, id: number},index: number)=>{
                    return <p key={index} className="text-base">{++index}. {item.name}</p>
                  })}
              </p> : ''}
              {salonData && <p className="text-base"><span className="font-semibold text-lg">Hair Salon: </span>{salonData.name}</p>}
              {slotData && <p className="text-base"><span className="font-semibold text-lg">Hair Dresser: </span>{slotData.hairDresser.name}</p>}
              {slotData && <p className="text-base"><span className="font-semibold text-lg">Slot: </span>{slotData.slot[0].day} {slotData.slot.map((prevSlot:any)=>{return <>{prevSlot.start}</>})}</p>} 
            </div>
            <div className="flex items-center justify-between border-t-2 border-[#CBCBCB] pt-9 mt-9">
              <button onClick={()=>router.push('/')} className="w-36 h-14 flex items-center justify-center border border-secondary rounded-xl text-xl text-black font-semibold">
                Modifier
              </button>
              <p className="text-5xl md:text-6xl text-black font-semibold">
                ${!haircutPrize ? servicePrize : !servicePrize ? haircutPrize : haircutPrize && servicePrize && haircutPrize + servicePrize }
              </p>
            </div>
          </div>
          {/* <div className="flex flex-col items-center justify-center">
          <p className="text-2xl text-black md:text-start text-center mb-4 mt-10">
            Choisissez comment vous souhaitez payer
          </p>
          <button
            className='relative w-52 lg:w-64 h-16 flex items-center justify-center gap-4 border rounded-xl text-2xl font-medium hover:border-secondary border-secondary'
          >
            <CardIcon />
            <p>Carte</p>
            <div className="absolute -top-1 -right-2">
              <RegistrationCheckedIcon width="18px" />
            </div>
          </button>
          </div> */}
          <div className="w-full flex items-center justify-center">
          {mounted && (
                <div className="mt-7 w-full md:w-5/12 lg:w-4/12">
                  <Elements
                    stripe={loadStripe(stripePromise)}
                    options={options}
                  >
                    <StripePayment/>
                  </Elements>
                </div>
                )}
                </div>
          <div className="w-full flex items-center justify-center">
            <button
              onClick={onBooking}
              className="w-full md:w-5/12 lg:w-4/12 h-14 rounded-xl text-xl text-white font-semibold bg-background-gradient shadow-[0px_17px_36px_0px_rgba(255,125,60,0.25)] mt-7"
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
            <button onClick={()=>router.push('/login?redirect=payment')} className={`w-32 h-12 flex items-center justify-center rounded-xl text-white bg-background-gradient`}>Login</button>
          </div>
        </div>
      </BaseModal>}
    </div>
  );
};

export default Index;
