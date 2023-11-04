"use client";
import { dashboard } from "@/api/dashboard";
import { CircleRight, CrossIcon, LogoCircleFixRight, RegistrationCheckedIcon } from "@/components/utilis/Icons";
import ClientDashboardLayout from "@/layout/ClientDashboardLayout";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import userLoader from "@/hooks/useLoader";
import { SalonWishlist, WishlistHaircuts } from "@/types";
import { getLocalStorage } from "@/api/storage";
import { ColorsThemeA, Theme_A } from "@/components/utilis/Themes";
import Footer from "@/components/UI/Footer";
import useSnackbar from "@/hooks/useSnackbar";
import { ColorRing } from "react-loader-spinner";

const Favorites = () => {
    const { loadingView } = userLoader();
    const [isLoading, setIsLoading] = useState(false);
    const [haircuts, setHaircuts] = useState<WishlistHaircuts[]>([]);
    const [salons, setSalons] = useState<SalonWishlist[]>([]);
    const user = getLocalStorage("user");
    const userId = user ? Number(JSON.parse(user).id) : null;
    const showSnackbar = useSnackbar(); // Custom hook to show snackbars

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
                        console.log(res.data.data);
                    }
                    setIsLoading(false);
                })
                .catch(error => {
                    setIsLoading(false);
                    console.log(error)
                })
        }
    }

    const RemoveHaircutWishlist = async (e: any, haircutId: number) => {
        // Handle adding/removing haircuts to/from the wishlist
        e.stopPropagation()
        if (userId) {
            let data = {
                user_id: userId,
                haircut_id: haircutId
            }

            await dashboard.removeFromWishList(haircutId, userId)
                .then(response => {
                    getWishlistHaircuts()
                    showSnackbar('success', 'Removed From Wishlist Successfully!')
                })
                .catch(error => {
                    showSnackbar('error', 'Error Occured!')
                })

        }
    }

    const RemoveSalonFromFavorites = async (e: any, hairsalonId: number) => {
        // Handle adding/removing haircuts to/from the wishlist
        e.stopPropagation()
        if (userId) {
            let data = {
                user_id: userId,
                hairsalon_id: hairsalonId
            }

            await dashboard.removeFromSalonWishList(hairsalonId, userId)
                .then(response => {
                    getSalonsWishlist()
                    showSnackbar('succès', 'Salon supprimé des préférences')
                })
                .catch(error => {
                    showSnackbar('erreur', 'Salon non supprimé')
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
                    {/* Haircuts part */}
                    <div className="w-full relative flex flex-col items-center justify-center my-10">
                        <div className="w-full">
                            <p className="text-black text-3xl mb-3">Coiffures</p>
                            <div className={`h-7 flex items-center rounded-xl text-white px-5 bg-gradient-to-r  from-zinc-800 via-zinc-400 to-zinc-100`} >
                                {haircuts.length} favorites
                            </div>
                        </div>
                        <div className="lg:absolute -top-10 ml-72  w-9/12 overflow-auto mt-3 mr-48">
                            <table>
                                <tbody className="flex items-center  gap-8 pb-2">
                                    {haircuts.map((item, index) => {
                                        return (
                                            <tr key={index} className="flex flex-col items-center justify-center">
                                                <div

                                                    className={`${Theme_A.hairstyleCards.cardgradientTop} rounded-xl`}>
                                                    <div className="relative w-max  bg-[#F5F5F5] ">
                                                        <div className="relative w-32 h-32">
                                                            <Image src={item.haircut.image.includes('https://api.onehaircut.com') ? item.haircut.image : `https://api.onehaircut.com${item.haircut.image}`} fill={true} alt="" className="rounded-t-xl" />
                                                        </div>
                                                    </div>
                                                    <div className="rounded-xl ">
                                                        <p className={`${Theme_A.hairstyleCards.cardText}`}>
                                                            {item.haircut.name}
                                                        </p>
                                                    </div>
                                                    <div
                                                        onClick={(e) => RemoveHaircutWishlist(e, item.haircut.id)}
                                                        className={`absolute top-1 right-1 flex items-center justify-center w-6 h-6 cursor-pointer rounded-md ${Theme_A.button.crossButtonSmall}`}>
                                                        <CrossIcon width="18" height="18" />
                                                    </div>
                                                </div>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Salons' part */}
                    <div className="w-full relative flex flex-col items-center justify-center mt-40">
                        <div className="w-full">
                            <p className="text-black text-3xl mb-3">Salons</p>
                            <div className={`h-7 flex items-center rounded-xl text-white px-5 bg-gradient-to-r from-zinc-800 via-zinc-400 to-zinc-100`} >
                                {salons.length} favorites
                            </div>
                        </div>
                        <div className="lg:absolute -top-10 ml-72  w-9/12 overflow-auto mt-3 mr-48">
                            <table>
                                <tbody className="flex items-center  gap-8 pb-2">
                                    {salons.map((item, index) => {
                                        return (
                                            <tr key={index} className="flex flex-col items-center justify-center">
                                                <div

                                                    className={`relative w-52 px-4 pt-4 rounded-xl ${ColorsThemeA.pageBgColorLight}`}>
                                                    <div className="relative w-max px-4 pt-4  rounded-xl">
                                                        <div className="relative w-36 h-36">
                                                            <Image src={item.hairsalon.logo.includes('https://api.onehaircut.com') ? item.hairsalon.logo : `https://api.onehaircut.com${item.hairsalon.logo}`} fill={true} alt="" className="rounded-t-xl" />
                                                        </div>
                                                    </div>
                                                    <div className="rounded-b-xl">
                                                        <p className={`rounded-b-xl flex items-center justify-center py-2 text-lg text-black font-bold `}>
                                                            {item.hairsalon.name}
                                                        </p>
                                                    </div>
                                                    <div className="rounded-b-xl">
                                                        <p className={`rounded-b-xl flex items-center text-center justify-center py-2 text-lg ${ColorsThemeA.textSecondary} font-normal overflow-clip`}>
                                                            {item.hairsalon.address.city + " " + item.hairsalon.address.state + " " + item.hairsalon.address.country}
                                                            {/* 63a rue Dietwiller 68440 Schlierbach  comment */}
                                                        </p>
                                                    </div>
                                                    <div
                                                        onClick={(e) => RemoveSalonFromFavorites(e, item.hairsalon.id)}
                                                        className={`absolute top-1 right-1 flex items-center justify-center w-6 h-6 cursor-pointer rounded-md ${Theme_A.button.crossButtonSmall}`}>
                                                        <CrossIcon width="9" height="9" />
                                                    </div>
                                                </div>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* <div className="w-full relativ mt-14">
                        <p className="text-black text-3xl mb-3 ">Salons</p>
                        <div className="w-full relativ  overflow-auto absolute">
                            <table className="w-full ">
                                <thead className={`w-full h-7 flex items-center rounded-xl text-white px-5 ${ColorsThemeA.OhcGradient_A}`}>
                                    <tr>
                                        <td className="">
                                            {salons.length} favoris
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
                                            return <td key={index} className="px-3 py-4 ">
                                                <div className="flex flex-col items-center justify-center relative w-32 h-32">
                                                    <Image src={salon.hairsalon.logo.includes('https://api.onehaircut.com') ? salon.hairsalon.logo : `https://api.onehaircut.com${salon.hairsalon.logo}`} fill={true} alt="" className="rounded-t-xl" />
                                                    <p className="mb-2 mt-1 text-black text-center">{salon.hairsalon.name}</p>
                                                </div>
                                            </td>
                                        })}
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div> */}
                </div>
            </ClientDashboardLayout>
            <Footer />
        </div>
    );
};

export default Favorites;
