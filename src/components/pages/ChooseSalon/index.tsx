"use client";
import Navbar from '@/components/shared/Navbar'
import React, { useEffect, useState } from 'react'
import '../dashboard/Dashboard/Services/index.css'
import { Like } from '@/components/utilis/Icons';
import Image from 'next/image';
import StarRatings from 'react-star-ratings';
import { useRouter } from 'next/navigation';
import { dashboard } from '@/api/dashboard';
import { getLocalStorage, setLocalStorage } from '@/api/storage';
import { SalonDetails } from '@/types';
import userLoader from "@/hooks/useLoader";
import useSnackbar from '@/hooks/useSnackbar';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const SalonChoice = () => {
    const [selectedTab, setSelectedTab] = useState(0)
    const [selectedSalon, setSelectedSalon] = useState<{name: string, id: number|null}>({name: '', id: null})
    const [selectedWhishlist,setSelectedWhishlist]=useState<number | null>()
    const [salonImage,setSalonImage]=useState<string[]>([])
    const [salons,setSalons]=useState<SalonDetails[]>([])
    const router = useRouter();
    let user = getLocalStorage("user");
    const userId = user ? Number(JSON.parse(user).id) : null;
    const getHaircut = getLocalStorage("haircut") as string;
    const haircut = user ? JSON.parse(getHaircut) : null;
    const [isLoading, setIsLoading] = useState(false);
    const { loadingView } = userLoader();
    const showSnackbar = useSnackbar();
    const [location, setLocation] = useState({lat: 48.8584, lng: 2.2945});
      const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyAJiOb1572yF7YbApKjwe5E9L2NfzkH51E',
        libraries: ['places'],
      })

    const getAllSalons= async ()=>{
        const services=getLocalStorage('ServiceIds')
        const servicesData=services ? JSON.parse(services) : null
        const serviceIds: number[]=[]
        servicesData.forEach((service: {name: string, id: number})=>{
            serviceIds.push(service.id)
        })
        setIsLoading(true);
        if(haircut) {
            const data={
                haircut_id: haircut.id,
                servicesIDs: serviceIds
            } 
           await dashboard.getSalonsByHaircut(data)
            .then((res) => {
            setIsLoading(false);
              if (res.data.data.length > 0) {
                setSalons(res.data.data);
              }
            })
            .catch(error => {
                setIsLoading(false);
                console.log(error)
            })
        }
      }

    const onWishlist= async (e: any, haircutId: number, isDelete?: boolean)=>{
        e.stopPropagation()
        let data
        if(isDelete){
            await dashboard.removeFromSalonWishList(haircutId)
            .then(()=>{
                getAllSalons()
              showSnackbar('success', 'Remove From Wishlist Successfully!')
            })
            .catch(error=>{
              console.log(error)
              showSnackbar('error', 'Error Occured!')
            })
          }
        else {
            if (userId) {
                data = {
                    user_id: userId,
                    hair_salon_id: haircutId
                }
                if (selectedWhishlist !== haircutId) {
                    setSelectedWhishlist(haircutId)
                    dashboard.addSalonWishList(data)
                        .then(response => {
                            showSnackbar('success', 'Added To Wishlist Successfully!')
                        })
                        .catch(err => console.log(err))
                }
                else {
                    setSelectedWhishlist(null)
                    showSnackbar('error', 'Error Occured!')
                }
            }
        }
      }

      const onContinue=()=>{
        router.push(`salon/profile`)
        setLocalStorage('selectedSalon',JSON.stringify(selectedSalon))
      }

      useEffect(()=>{
        getAllSalons()
      },[])
    
    if (!isLoaded) {
        return loadingView()
    }
    return (
        <div className='w-full'>
            <Navbar isSalonPage={true}/>
            <div className='w-full flex flex-col items-center justify-center px-6'>
            {isLoading && loadingView()}
                <p className='text-4xl font-medium text-black text-center mt-14'>87 <span className='font-bold text-gradient'>Salons</span> correspondent à vos critères</p>
                {/* <div className='flex flex-col md:flex-row items-center justify-center gap-8  mt-6'>
                    <div onClick={() => setSelectedTab(0)} className='flex items-center justify-center gap-7 w-[350px] h-14 border border-[#BDBDBD] rounded-xl cursor-pointer'>
                        <p className='text-xl font-semibold'>Selection d’une coiffure</p>
                        {selectedTab === 0 ? <RegistrationCheckedIcon /> : <div className='w-7 h-7 bg-[#D9D9D9] rounded-full' />}
                    </div>
                    <div onClick={() => setSelectedTab(1)} className='flex items-center justify-center gap-7 w-[350px] h-14 border border-[#BDBDBD] rounded-xl cursor-pointer'>
                        <p className='text-xl font-semibold'>Selection d’une prestation</p>
                        {selectedTab === 1 ? <RegistrationCheckedIcon /> : <div className='w-7 h-7 bg-[#D9D9D9] rounded-full' />}
                    </div>
                </div> */}
                <div className='w-full flex items-end justify-end mt-12'>
                    <button disabled={!selectedSalon.id} onClick={onContinue} className={`flex items-center justify-center text-lg text-white font-medium w-full md:w-52 h-14 rounded-xl px-4 ${selectedSalon.id ? 'bg-background-gradient' : 'bg-[#D9D9D9]'}`}>Continue</button>
                </div>
                <div className='w-full mt-14 mb-5'>
                    <div className='w-full flex flex-col lg:flex-row items-start justify-center gap-6'>
                        <div className='md:h-[1100px] md:overflow-y-auto'>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {salons.map((salon, index) => {
                                    return <div key={index} onClick={()=>setSelectedSalon({name: salon.name, id: salon.id})} className={`bg-[rgba(242,242,242,0.66)] rounded-2xl pb-3 border hover:border-secondary cursor-pointer ${selectedSalon.id===salon.id && 'border-secondary'}`}>
                                        <div className="px-4 pt-4 relative">
                                        <div onClick={(e) => onWishlist(e, 3)} className="absolute right-6 top-6 z-20 cursor-pointer">
                                            <Like color={selectedWhishlist === index ? "#FF0000" : ""}  />
                                        </div>
                                        <div className='relative w-48 h-48'>
                                            <Image
                                                src={salon.salon_images.length && salon.salon_images[index].is_cover ? salon.salon_images[index].image.includes('api-server') ? salon.salon_images[index].image : `https://api-server.onehaircut.com/public${salon.salon_images[index].image}` : salon.logo.includes('api-server') ? salon.logo : `https://api-server.onehaircut.com/public${salon.logo}`}
                                                fill={true}
                                                alt="image"
                                            />
                                        </div>
                                        </div>
                                        <div className="flex items-start justify-between text-black text-lg font-semibold px-3 pt-2">
                                            <p className='w-36'>{salon.name}</p>
                                            <p>$35</p>
                                        </div>
                                        <div className='flex items-center gap-1 text-xs text-[#7B7B7B] px-3 pt-1'>
                                            <StarRatings
                                                rating={1}
                                                starRatedColor="#FEDF10"
                                                starSpacing="4px"
                                                starDimension="12px"
                                                numberOfStars={1}
                                                name="rating"
                                            />
                                            <p className='border-r border-[#A7A7A7] pr-1'>{salon.rating}</p>
                                            <p>348 avis</p>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                        {salons.length ?
                        <div className='hidden lg:block w-[300pxw] lg:w-[400px] 2xl:w-[725px]'>
                            <GoogleMap center={location} zoom={10} mapContainerStyle={{ width: '100%', height: '100vh' }}>
                                <Marker position={location} />
                            </GoogleMap>
                        </div>
                    :''    
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SalonChoice