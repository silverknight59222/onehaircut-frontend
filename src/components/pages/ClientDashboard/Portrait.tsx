"use client";
import { dashboard } from "@/api/dashboard";
import DropdownMenu from "@/components/UI/DropDownMenu";
import { CircleRight, CrossIcon, LogoCircleFixRight } from "@/components/utilis/Icons";
import { ColorsThemeA, Theme_A } from "@/components/utilis/Themes";
import ClientDashboardLayout from "@/layout/ClientDashboardLayout";
import Image from "next/image";
import React, { useState } from "react";
import Footer from '@/components/UI/Footer';

// default text if no picture to display
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
    // filters
    const Gender = [
        "Femme",
        "Homme",
        "Autre",]
    const Ethnicity = [
        "Afro",
        "Asian",
        "Occidental",
        "Oriental",]

    // functions for filters
    // handling the change of gender
    const handleNewGender = (item: string) => {
        // TODO: add backend to save the new preference
    }
    // handling the change of ethnicity
    const handleNewEthnicity = (item: string) => {
        // TODO: add backend to save the new preference
    }


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

    // -----------------------------------------------
    // for the right picture
    const hiddenFile4Input = React.useRef<HTMLInputElement | null>(null);
    const [profileRightImage, setProfileRightImage] = useState<string | null>("");
    // handle the profil pic change
    const handleProfileRightImageUpload = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!event.target.files) {
            return;
        }
        const fileUploaded = event.target.files[0];
        setProfileLeftImage(URL.createObjectURL(fileUploaded));
    };
    // handle the click to modify the pic
    const handleClickRight = () => {
        if (hiddenFile4Input.current) {
            hiddenFile4Input.current.click();
        }
    };

    // -----------------------------------------------
    // for the slightly right picture
    const hiddenFile5Input = React.useRef<HTMLInputElement | null>(null);
    const [profileRight2Image, setProfileRight2Image] = useState<string | null>("");
    // handle the profil pic change
    const handleProfileRight2ImageUpload = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!event.target.files) {
            return;
        }
        const fileUploaded = event.target.files[0];
        setProfileRight2Image(URL.createObjectURL(fileUploaded));
    };
    // handle the click to modify the pic
    const handleClickRight2 = () => {
        if (hiddenFile5Input.current) {
            hiddenFile5Input.current.click();
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

    const profilPicToDisplay = (clickFct: () => void, img: string | null, subtitle: string, picSize: number) => {
        return (
            <div className=" flex flex-col gap-2 items-center transform hover:scale-105 transition-transform "
                onClick={clickFct}
                role="button"
                tabIndex={0}>
                <div
                    className="relative p-4 rounded-2xl border-2 bg-white shadow-md hover:shadow-xl">
                    <div className={`w-${picSize} h-${picSize} relative flex text-center items-center`}>
                        {img ? (
                            <Image src={img} fill={true} alt="Profile Image" />
                        ) : (
                            TextToDsplayifNoPic
                        )}
                    </div>
                    {img && (
                        <div
                            onClick={(e) => RemoveHaircutWishlist(e, "LightLeft")}
                            className={`absolute -top-5 -right-3 flex items-center w-6 h-6 cursor-pointer rounded-md ${Theme_A.button.crossButtonSmall} z-10`}>
                            <CrossIcon width="18" height="18" />
                        </div>)}
                </div>
                <p className="text-black ">{subtitle}</p>
            </div>
        )
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
            <input
                type="file"
                ref={hiddenFile4Input}
                onChange={handleProfileRightImageUpload}
                style={{ display: "none" }}
            />
            <input
                type="file"
                ref={hiddenFile5Input}
                onChange={handleProfileRight2ImageUpload}
                style={{ display: "none" }}
            />
            <ClientDashboardLayout>
                <div className="relative mt-10 mb-5 px-6 sm:px-10 md:px-20">
                    <p className="text-black font-medium text-3xl text-center mb-8">
                        Modifiez vos photos de profils
                    </p>
                    <p className="text-stone-400 font-normal italic text-sm text-center my-10">
                        Pour modifiez une photo, cliquer sur celle-ci et selectionner la remplacente
                    </p>
                    <div className="flex flex-col sm:flex-row  sm:items-start justify-center gap-14">
                        {/* Left side of the head placed left */}
                        <div className="flex sm:flex-col  gap-10 -mt-6 sm:-mt-0">
                            {profilPicToDisplay(handleClickLeft2, profileLeft2Image, "Profil légèrement gauche", 32)}

                            {profilPicToDisplay(handleClickLeft, profileLeftImage, "Profil gauche", 32)}
                        </div>

                        {/* Straight side in the middle */}

                        {/* <div className="w-40 gap-10 -mt-6 sm:-mt-0"> */}
                        {profilPicToDisplay(handleClick, profileImage, "Profil de face", 52)}
                        {/* </div> */}

                        {/* Right side of the face on the right */}
                        <div className="flex sm:flex-col  gap-10 -mt-6 sm:-mt-0">
                            {profilPicToDisplay(handleClickRight2, profileRight2Image, "Profil légèrement droite", 32)}

                            {profilPicToDisplay(handleClickRight, profileRightImage, "Profil droite", 32)}
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
                    <p className="text-stone-400 font-normal italic text-sm text-center my-10">
                        Indiquer votre genre et groupe ethnique. Ceux-ci serviront lors de la presentation des coiffures à la page d'accueil
                    </p>
                    <div className="flex flex-col sm:flex-row  sm:items-start justify-center gap-14 mb-40">
                        <div className="flex flex-col gap-2">
                            <p className="text-black text-sm">
                                Genre
                            </p>
                            <DropdownMenu dropdownItems={Gender}
                                fctToCallOnClick={handleNewGender} menuName="Genre"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-black text-sm">
                                Groupe ethnique
                            </p>
                            <DropdownMenu dropdownItems={Ethnicity}
                                fctToCallOnClick={handleNewEthnicity} menuName="Groupe"/>
                        </div>
                    </div>
                </div>
            </ClientDashboardLayout >
            <Footer />
        </div >
    );
};

export default Portrait;
function showSnackbar(arg0: string, arg1: string) {
    throw new Error("Function not implemented.");
}

