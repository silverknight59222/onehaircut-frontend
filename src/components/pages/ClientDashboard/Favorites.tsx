"use client";
import { dashboard } from "@/api/dashboard";
import { RegistrationCheckedIcon } from "@/components/utilis/Icons";
import ClientDashboardLayout from "@/layout/ClientDashboardLayout";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import userLoader from "@/hooks/useLoader";
import { SalonWishlist, WishlistHaircuts } from "@/types";
import { getLocalStorage } from "@/api/storage";

const Favorites = () => {
    const { loadingView } = userLoader();
    const [isLoading, setIsLoading] = useState(false);
    const [haircuts, setHaircuts] = useState<WishlistHaircuts[]>([]);
    const [salons, setSalons] = useState<SalonWishlist[]>([]);
    const userId=Number(getLocalStorage("User"))

    const getWishlistHaircuts = () => {
        setIsLoading(true);
        dashboard.getWishlistHaircuts(userId)
            .then((res) => {
                if (res.data.data.length > 0) {
                    setHaircuts(res.data.data);
                }
            })
            .catch(error => console.log(error))
        setIsLoading(false);
    }

    const getSalonsWishlist = () => {
        setIsLoading(true);
        dashboard.getSalonsWishlist(userId)
            .then((res) => {
                if (res.data.data.length > 0) {
                    setSalons(res.data.data);
                }
            })
            .catch(error => console.log(error))
        setIsLoading(false);
    }

      useEffect(()=>{
        getWishlistHaircuts()
        getSalonsWishlist()
      },[])
    return (
        <div>
            <ClientDashboardLayout>
                <div className="flex flex-col items-center justify-center mt-10 mb-5 px-8">
                {isLoading && loadingView()}
                    <p className="text-black font-medium text-3xl text-center mb-10 static">
                        Gestion des favoris
                    </p>
                    <div className="w-full lg:w-auto relative flex flex-col items-center justify-center my-28">
                        <div className="w-full">
                            <p className="text-black text-3xl mb-3">Coiffures</p>
                            <div className="w-full lg:w-[750px] xl:w-[950px] 2xl:w-[1090px] h-7 flex items-center rounded-xl text-white px-5 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-200">
                                3 / 10
                            </div>
                        </div>
                        <div className="lg:absolute -top-10 right-7 2xl:right-auto w-full md:w-[600px] lg:w-[550px] xl:w-[750px] overflow-auto mt-3">
                            <table>
                                <tbody className="flex items-center justify-center gap-8 pb-2">
                                {haircuts.map((item, index) => {
                                return (
                                    <tr key={index} className="flex flex-col items-center justify-center">
                                        <div

                                            className="shadow-md rounded-xl my-2"
                                        >
                                            <div className="relative w-max px-4 pt-4 bg-[#F5F5F5] rounded-t-xl">
                                                <div className="relative w-32 h-32">
                                                    <Image src={item.haircut.image} fill={true} alt="" />
                                                </div>
                                            </div>
                                            <div className="rounded-b-xl bg-gradient-to-r from-pinkGradientFrom via-pinkGradientVia to-pinkGradientTo">
                                                <p className="rounded-b-xl flex items-center justify-center py-2 text-sm text-black font-medium">
                                                    {item.haircut.name}
                                                </p>
                                            </div>
                                        </div>
                                        <RegistrationCheckedIcon />
                                    </tr>
                                );
                            })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="mt-14">
                        <p className="text-black text-3xl mb-3">Salons</p>
                        <div className="w-full lg:w-[750px] xl:w-[950px] 2xl:w-[1090px] overflow-auto">
                            <table className="w-full">
                                <thead className="text-white whitespace-nowrap h-7 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-200">
                                    <tr>                                        
                                        <td className="px-6">
                                            4/10
                                        </td>
                                        {salons.map((item,index)=>{
                                            return <td key={index} scope="col" className="text-center font-bold px-6">
                                            {item.hairsalon.address}
                                        </td>
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-black">
                                        <td className="px-6"></td>
                                        {salons.map((salon,index)=>{
                                            return <td key={index} className="px-3 py-4">
                                            <div className="flex flex-col items-center justify-center">
                                                <Image src='/assets/salon1.png' width={120} height={120} alt="" />
                                                <p className="mb-2 mt-1 text-center">{salon.hairsalon.name}</p>
                                                <RegistrationCheckedIcon />
                                            </div>
                                        </td>
                                        })}
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </ClientDashboardLayout>
        </div>
    );
};

export default Favorites;
