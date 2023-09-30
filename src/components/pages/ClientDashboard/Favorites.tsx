"use client";
import { dashboard } from "@/api/dashboard";
import { LogoCircleFixRight, RegistrationCheckedIcon } from "@/components/utilis/Icons";
import ClientDashboardLayout from "@/layout/ClientDashboardLayout";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import userLoader from "@/hooks/useLoader";
import { SalonWishlist, WishlistHaircuts } from "@/types";
import { getLocalStorage } from "@/api/storage";
import { Theme_A } from "@/components/utilis/Themes";
import Footer from "@/components/UI/Footer";

const Favorites = () => {
    const { loadingView } = userLoader();
    const [isLoading, setIsLoading] = useState(false);
    const [haircuts, setHaircuts] = useState<WishlistHaircuts[]>([]);
    const [salons, setSalons] = useState<SalonWishlist[]>([]);
    const user = getLocalStorage("user");
    const userId = user ? Number(JSON.parse(user).id) : null;

    const getWishlistHaircuts = () => {
        if (userId) {
            setIsLoading(true);
            dashboard.getWishlistHaircuts(userId)
                .then((res) => {
                    if (res.data.data.length > 0) {
                        setHaircuts(res.data.data);
                    }
                    setIsLoading(false);
                })
                .catch(error => {
                    setIsLoading(false);
                    console.log(error)
                })
        }

    }

    const getSalonsWishlist = () => {
        if (userId) {
            setIsLoading(true);
            dashboard.getSalonsWishlist(userId)
                .then((res) => {
                    if (res.data.data.length > 0) {
                        setSalons(res.data.data);
                    }
                    setIsLoading(false);
                })
                .catch(error => {
                    setIsLoading(false);
                    console.log(error)
                })
        }
    }

    useEffect(() => {
        getWishlistHaircuts()
        getSalonsWishlist()
    }, [])
    return (
        <div>
            <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 -z-10">
                <LogoCircleFixRight />
            </div>
            <ClientDashboardLayout>
                <div className="flex flex-col items-center justify-center mt-10 mb-5 px-8">
                    {isLoading && loadingView()}
                    <p className={`text-black ${Theme_A.fonts.header} ${Theme_A.textFont.headerH1} mb-10 static`}>
                        Favoris
                    </p>
                    <div className="w-full relative flex flex-col items-center justify-center my-28">
                        <div className="w-full">
                            <p className="text-black text-3xl mb-3">Coiffures</p>
                            <div className="w-full h-7 flex items-center rounded-xl text-white px-5 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-200">
                                {haircuts.length} / 10
                            </div>
                        </div>
                        <div className="lg:absolute -top-10 right-7 2xl:right-auto w-full md:w-[600px] lg:w-[550px] xl:w-[750px] overflow-auto mt-3">
                            <table>
                                <tbody className="flex items-center justify-center gap-8 pb-2">
                                    {haircuts.map((item, index) => {
                                        return (
                                            <tr key={index} className="flex flex-col items-center justify-center">
                                                <div

                                                    className={`${Theme_A.hairstyleCards.cardgradientTop}`}
                                                >
                                                    <div className="relative w-max px-4 pt-4 bg-[#F5F5F5] rounded-t-xl">
                                                        <div className="relative w-32 h-32">
                                                            <Image src={item.haircut.image} fill={true} alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="rounded-b-xl bg-gradient-to-r from-pinkGradientFrom via-pinkGradientVia to-pinkGradientTo">
                                                        <p className={`${Theme_A.hairstyleCards.cardText}`}>
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
                    <div className="w-full relativ mt-14">
                        <p className="text-black text-3xl mb-3">Salons</p>
                        <div className="w-full relativ  overflow-auto">
                            <table className="w-full">
                                <thead className="w-full h-7 flex items-center rounded-xl text-white px-5 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-200">
                                    <tr>
                                        <td className="">
                                            {salons.length}/10
                                        </td>
                                        {salons.map((item, index) => {
                                            return <td key={index} scope="col" className="text-center font-bold px-6">
                                                {item.hairsalon.address}
                                            </td>
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-black">
                                        <td className="px-6"></td>
                                        {salons.map((salon, index) => {
                                            return <td key={index} className="px-3 py-4">
                                                <div className="flex flex-col items-center justify-center">
                                                    <Image src={salon.hairsalon.logo} width={120} height={120} alt="" />
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
            <Footer />
        </div>
    );
};

export default Favorites;
