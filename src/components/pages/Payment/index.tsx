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

const Index = () => {
  const router = useRouter();
  const showSnackbar=useSnackbar()
  const user = getLocalStorage("user");
  const haircut=getLocalStorage("haircut")
  const salonId=getLocalStorage('selectedSalon')
  const services=getLocalStorage('ServiceIds')
  const slotData = getLocalStorage('slotData')
  const [haircutPrize,setHaircutPrize]=useState()
  const [servicePrize,setServicePrize]=useState<number>()
  const { loadingView } = userLoader();
  const [isLoading, setIsLoading] = useState(false);
  const items = [
    { name: "Salon", desc: "Le Bon Coiffeur" },
    { name: "Type de coiffure", desc: "Curly" },
    { name: "Couleur", desc: "Blond" },
    { name: "Temps", desc: "2 heures " },
    { name: "Lieu", desc: "à domicile" },
  ];
  const getHaircutPrize= async () =>{
    if(haircut){
    setIsLoading(true)
    const selectedHaircutId=JSON.parse(haircut).id
    await dashboard.getAllSalonHaircuts(Number(salonId))
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
    if(services?.length){
    setIsLoading(true)
    const selectedServiceIds=JSON.parse(services)
    let price=0
    await dashboard.getAllSalonServices(Number(salonId))
    .then(resp=>{
      resp.data.data.forEach((service: any) => {
        selectedServiceIds.forEach((selectedService: number)=>{
          if(service.id===selectedService){
            console.log(service.price)
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
    setIsLoading(true)
    const data={
      user_id: user ? Number(JSON.parse(user).id) : null,
      hair_salon_id: Number(salonId),
      slot_id: slotData ? JSON.parse(slotData).slot : null,
      hair_dresser_id: slotData ? JSON.parse(slotData).hairDresserId : null,
      amount: !haircutPrize ? servicePrize : !servicePrize ? haircutPrize : haircutPrize && servicePrize ? haircutPrize + servicePrize : 0,
      salon_haircut_id: haircut ? JSON.parse(haircut).id : null,
      services: services ? JSON.parse(services) : null,
    }
    await client.createBooking(data)
    .then(resp=>{
      removeFromLocalStorage('haircut')
      removeFromLocalStorage('slotData')
      removeFromLocalStorage('ServiceIds')
      removeFromLocalStorage('selectedSalon')
      showSnackbar("success", 'Booking Created Successfully');
    })
    .catch(err=>console.log(err))
    .finally(()=>{
      setIsLoading(false)
    })
  }

  useEffect(()=>{
    getHaircutPrize()
    getServicesPrize()
  },[])
  return (
    <div>
      {isLoading && loadingView()}
      <Navbar isBookSalon={true} />
      <div className="flex flex-col items-center justify-center mt-16 mb-5 px-6">
        <div className="flex md:block flex-col items-center justify-center">
          <p className="text-4xl text-black font-medium text-center md:text-start mb-4">
            Confirmer et payer
          </p>
          <div className="w-full md:w-[750px] lg:w-[940px] pt-10 pb-10 px-6 sm:px-14 bg-[#F8F8F8] rounded-[22px] border border-[#ECECEC]">
            <div className="flex flex-col gap-3 text-xl font-medium text-black">
              {items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-black"
                  >
                    <p className="font-semibold">{item.name}: </p>
                    <p>{item.desc}</p>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between border-t-2 border-[#CBCBCB] pt-9 mt-9">
              <button className="w-36 h-14 flex items-center justify-center border border-secondary rounded-xl text-xl text-black font-semibold">
                Modifier
              </button>
              <p className="text-5xl md:text-6xl text-black font-semibold">
                ${!haircutPrize ? servicePrize : !servicePrize ? haircutPrize : haircutPrize && servicePrize && haircutPrize + servicePrize }
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
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
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={onBooking}
              className="w-60 h-14 rounded-xl text-xl text-white font-semibold bg-background-gradient shadow-[0px_17px_36px_0px_rgba(255,125,60,0.25)] mt-10"
            >
              Vers le paiement{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
