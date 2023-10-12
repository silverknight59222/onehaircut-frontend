"use client";
import { dashboard } from "@/api/dashboard";
import BaseDropdown from "@/components/UI/BaseDropdown";
import { CircleRight, CrossIcon, LogoCircleFixRight } from "@/components/utilis/Icons";
import { Theme_A } from "@/components/utilis/Themes";
import ClientDashboardLayout from "@/layout/ClientDashboardLayout";
import Image from "next/image";
import React, { useState } from "react";

const TextToDsplayifNoPic =
    <div>
        <p className={`${Theme_A.textFont.infoTextSmall}`}>
            Ajouter une photo
        </p>
        <p className={`${Theme_A.textFont.infoTextSmall}`}>
            Taille min. recommendée 300px x 300px
        </p>
    </div>

const Portrait = () => {
    // -----------------------------------------------
    // for the straight picture
    const hiddenFileInput = React.useRef<HTMLInputElement | null>(null);
    const [profileImage, setProfileImage] = useState<string | null>("");
    // handle the profil pic change
    const handleProfileImageUpload = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!event.target.files) {
            return;
        }
        const fileUploaded = event.target.files[0];
        setProfileImage(URL.createObjectURL(fileUploaded));
    };
    // handle the click to modify the pic
    const handleClick = () => {
        if (hiddenFileInput.current) {
            hiddenFileInput.current.click();
        }
    };

    // -----------------------------------------------
    // for the left picture
    const hiddenFile2Input = React.useRef<HTMLInputElement | null>(null);
    const [profileLeftImage, setProfileLeftImage] = useState<string | null>("");
    // handle the profil pic change
    const handleProfileLeftImageUpload = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!event.target.files) {
            return;
        }
        const fileUploaded = event.target.files[0];
        setProfileLeftImage(URL.createObjectURL(fileUploaded));
    };
    // handle the click to modify the pic
    const handleClickLeft = () => {
        if (hiddenFile2Input.current) {
            hiddenFile2Input.current.click();
        }
    };

    // -----------------------------------------------
    // for the slightly left picture
    const hiddenFile3Input = React.useRef<HTMLInputElement | null>(null);
    const [profileLeft2Image, setProfileLeft2Image] = useState<string | null>("");
    // handle the profil pic change
    const handleProfileLeft2ImageUpload = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!event.target.files) {
            return;
        }
        const fileUploaded = event.target.files[0];
        setProfileLeft2Image(URL.createObjectURL(fileUploaded));
    };
    // handle the click to modify the pic
    const handleClickLeft2 = () => {
        if (hiddenFile3Input.current) {
            hiddenFile3Input.current.click();
        }
    };


    // For removing
    const RemoveHaircutWishlist = async (e: any, profil: string) => {
        // Handle removing profil picture
        e.stopPropagation()
        // if (userId) {
        //     let data = {
        //         user_id: userId,
        //         haircut_id: haircutId
        //     }

        // await dashboard.removeFromWishList(haircutId, userId) // TODO replace with correct function
        // .then(response => {
        //     // getWishlistHaircuts()
        //     showSnackbar('succès', 'Photo de profil supprimée')
        // })
        // .catch(error => {
        //     showSnackbar('erreur', 'Photo non supprimée!')
        // })

    }


    return (
        <div>
            <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 z-0">
                <LogoCircleFixRight />
            </div>
            <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleProfileImageUpload}
                style={{ display: "none" }}
            />
            <input
                type="file"
                ref={hiddenFile2Input}
                onChange={handleProfileLeftImageUpload}
                style={{ display: "none" }}
            />
            <input
                type="file"
                ref={hiddenFile3Input}
                onChange={handleProfileLeft2ImageUpload}
                style={{ display: "none" }}
            />
            <ClientDashboardLayout>
                <div className="relative mt-10 mb-5 px-6 sm:px-10 md:px-20">
                    <p className="text-black font-medium text-3xl text-center mb-8">
                        Modifiez vos photos de profils
                    </p>
                    <p className="text-black font-normal text-md text-center mb-8">
                        Pour modifiez une photo, cliquer sur celle-ci et selectionner la remplacente
                    </p>
                    <div className="flex flex-col sm:flex-row  sm:items-start justify-center gap-14">
                        {/* Left side of the head placed left */}
                        <div className="flex sm:flex-col  gap-10 -mt-6 sm:-mt-0">
                            <div className="w-6/12 sm:w-full flex flex-col   gap-2"
                                onClick={handleClickLeft2}
                                role="button"
                                tabIndex={0}>
                                <div
                                    // className={` ${Theme_A.thumbnails.containerPicThumbnail} cursor-pointer `}
                                    className="flex p-4 rounded-2xl border-2 bg-white shadow-lg"
                                    onClick={handleClickLeft2}
                                    role="button"
                                    tabIndex={0}>
                                    <div className={`w-32 h-32 relative flex items-center text-center`}>
                                        {profileLeft2Image ? (
                                            <Image src={profileLeft2Image} fill={true} alt="Profile Image" />
                                        ) : (
                                            TextToDsplayifNoPic
                                        )}
                                    </div>
                                    <div
                                        onClick={(e) => RemoveHaircutWishlist(e, "LightLeft")}
                                        className={`absolut -top-2 -right-2 flex items-center w-6 h-6 cursor-pointer rounded-md ${Theme_A.button.crossButtonSmall} z-10`}>
                                        <CrossIcon width="18" height="18" />
                                    </div>
                                </div>
                                <p className="text-black">Profil légèrement gauche</p>
                            </div>
                            <div className="w-6/12 sm:w-full flex flex-col items-center justify-center"
                                onClick={handleClickLeft}
                                role="button"
                                tabIndex={0}>
                                <div className={`${Theme_A.thumbnails.containerPicThumbnail} cursor-pointer `}
                                    onClick={handleClickLeft}
                                    role="button"
                                    tabIndex={0}>
                                    <div className={`w-32 h-32 relative flex items-center text-center`}>
                                        {profileLeftImage ? (
                                            <Image src={profileLeftImage} fill={true} alt="Profile Image" />
                                        ) : (
                                            TextToDsplayifNoPic
                                        )}
                                    </div>
                                </div>
                                <p className="text-black">Profil gauche</p>
                            </div>
                        </div>

                        {/* Straight side in the middle */}
                        <div className="flex flex-col items-center justify-center"      >
                            <div className={`${Theme_A.thumbnails.containerPicThumbnail} cursor-pointer `}
                                onClick={handleClick}
                                role="button"
                                tabIndex={0}>
                                <div className={`w-48 h-48 relative flex items-center text-center`}>
                                    {profileImage ? (
                                        <Image src={profileImage} fill={true} alt="Profile Image" />
                                    ) : (
                                        TextToDsplayifNoPic
                                    )}
                                </div>
                            </div>
                            <p className="text-black">Profil de face</p>
                        </div>

                        {/* Right side of the face on the right */}
                        <div className="flex sm:flex-col items-center justify-center gap-10 -mt-6 sm:-mt-0">
                            <div className="w-6/12 sm:w-full flex flex-col items-center justify-center gap-2">
                                <Image
                                    src="/assets/portrait2.png"
                                    alt=""
                                    width={150}
                                    height={150}
                                    className="rounded-3xl"
                                />
                                <p className="text-black">Profil légèrement droite</p>
                            </div>
                            <div className="w-6/12 sm:w-full flex flex-col items-center justify-center">
                                <div>
                                    <Image
                                        src="/assets/portrait2.png"
                                        alt=""
                                        width={150}
                                        height={150}
                                        className="rounded-3xl"
                                    />
                                </div>
                                <p className="text-black">Profil droite</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 mt-10">
                        {/* this must be rather in the filter part */}
                        {/* <div className="flex flex-col items-center justify-center">
                            <p className="text-black text-sm mb-2">Longueur de cheveux actuelle</p>
                            <BaseDropdown dropdownItems={['Court']} width="w-52" height="h-14" rounded="rounded-2xl" />
                        </div> */}
                        {/* <div className="flex flex-col items-center justify-center gap-4 md:mt-8"> */}
                        {/* <button className={`w-52 h-14 ${Theme_A.button.medWhiteColoredButton}`} >Supprimer</button> */}
                        {/* <button className={`w-52 h-14 ${Theme_A.button.medWhiteColoredButton}`}>Parcourir</button> */}
                        {/* <button className={`w-52 h-14 ${Theme_A.button.mediumGradientButton}`}>Enregistrer</button> */}
                        {/* </div> */}
                        {/* <div className="flex flex-col items-center justify-center">
                            <p className="text-black text-sm mb-2">Ou Selectionner un avatar</p>
                            <BaseDropdown dropdownItems={['Aucun']} width="w-52" height="h-14" rounded="rounded-2xl" />
                        </div> */}
                    </div>
                </div>
            </ClientDashboardLayout >
        </div >
    );
};

export default Portrait;
function showSnackbar(arg0: string, arg1: string) {
    throw new Error("Function not implemented.");
}

