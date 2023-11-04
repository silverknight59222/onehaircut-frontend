"use client";
import { dashboard } from "@/api/dashboard";
import DropdownMenu from "@/components/UI/DropDownMenu";
import { CrossIcon, LogoCircleFixRight } from "@/components/utilis/Icons";
import { Theme_A } from "@/components/utilis/Themes";
import ClientDashboardLayout from "@/layout/ClientDashboardLayout";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Footer from '@/components/UI/Footer';
import { client } from "@/api/clientSide";
import useSnackbar from "@/hooks/useSnackbar";

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

const DefaultProfilFace = <Image src='/assets/PortraitClient/ProfilFace.jpg' alt='' fill={true} className='rounded-3xl ' />
const DefaultProfilLeft = <Image src='/assets/PortraitClient/ProfilLeft.jpg' alt='' fill={true} className='rounded-3xl ' />
const DefaultProfilLeft2 = <Image src='/assets/PortraitClient/ProfilLeft2.png' alt='' fill={true} className='rounded-3xl ' />
const DefaultProfilRight = <Image src='/assets/PortraitClient/ProfilRight.png' alt='' fill={true} className='rounded-3xl ' />
const DefaultProfilRight2 = <Image src='/assets/PortraitClient/ProfilRight2.jpg' alt='' fill={true} className='rounded-3xl ' />

const SubTextToDisplay =
    ["Profil légèrement gauche",
        "Profil gauche",
        "Profil de face",
        "Profil légèrement droite",
        "Profil droite"
    ]


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
    const Length = [
        "Court",
        "Moyen",
        "Long",]

    const [imagesToUpload, setImagesToUpload] = useState([]);
    const [gender, setGender] = useState('');
    const [ethnicGroup, setethnicGroup] = useState('');
    const [hairLength, sethairLength] = useState('');

    // functions for filters
    // handling the change of gender
    const handleNewGender = (item: string) => {
        setGender(item);
    }
    // handling the change of ethnicity
    const handleNewEthnicity = (item: string) => {
        setethnicGroup(item);
    }
    // handling the change of length
    const handleNewSetCurrentLength = (item: string) => {
        sethairLength(item);
    }

    const [isLoading, setIsLoading] = useState(false);
    const showSnackbar = useSnackbar();

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
        imagesToUpload.push({'type': 'front_profile',  'file': event.target.files[0]})
        //setImagesToUpload([{'type': 'profile_image',  'file': event.target.files[0]}])
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
        imagesToUpload.push({'type': 'left_profile',  'file': event.target.files[0]})
        //setImagesToUpload([{'type': 'left_profile',  'file': event.target.files[0]}])
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
    const [profileSlightlyLeftImage, setprofileSlightlyLeftImage] = useState<string | null>("");
    // handle the profil pic change
    const handleProfileLeft2ImageUpload = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!event.target.files) {
            return;
        }
        const fileUploaded = event.target.files[0];
        setprofileSlightlyLeftImage(URL.createObjectURL(fileUploaded));
        imagesToUpload.push({'type': 'slightly_left_profile',  'file': event.target.files[0]})
        //setImagesToUpload([{'type': 'slightly_left_profile',  'file': event.target.files[0]}])
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
        setProfileRightImage(URL.createObjectURL(fileUploaded));
        imagesToUpload.push({'type': 'right_profile',  'file': event.target.files[0]})
        //setImagesToUpload([{'type': 'right_profile',  'file': event.target.files[0]}])
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
    const [profileSlightlyRightImage, setProfileSlightlyRightImage] = useState<string | null>("");
    // handle the profil pic change
    const handleProfileRight2ImageUpload = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!event.target.files) {
            return;
        }
        const fileUploaded = event.target.files[0];
        setProfileSlightlyRightImage(URL.createObjectURL(fileUploaded));
        imagesToUpload.push({'type': 'slightly_right_profile',  'file': event.target.files[0]})
        //setImagesToUpload([{'type': 'slightly_right_profile',  'file': event.target.files[0]}])
    };
    // handle the click to modify the pic
    const handleClickRight2 = () => {
        if (hiddenFile5Input.current) {
            hiddenFile5Input.current.click();
        }
    };


    // Handle removing profil picture
    const RemoveImage = async (e: any, profil: string) => {
        // TODO Add backend

        e.stopPropagation()
        if (profil == SubTextToDisplay[0]) {
            setprofileSlightlyLeftImage(null)
        }
        else if (profil == SubTextToDisplay[1]) {
            setProfileLeftImage(null)
        }
        else if (profil == SubTextToDisplay[2]) {
            setProfileImage(null)
        }
        else if (profil == SubTextToDisplay[3]) {
            setProfileSlightlyRightImage(null)
        }
        else if (profil == SubTextToDisplay[4]) {
            setProfileRightImage(null)
        }
        else {
            // nothing
        }

    }

    const profilPicToDisplay = (clickFct: () => void, img: string | null, subtitle: string, picSize: number, defaultPic: React.JSX.Element) => {
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
                            defaultPic
                        )}
                    </div>
                    {img && (
                        <div
                            onClick={(e) => RemoveImage(e, subtitle)}
                            className={`absolute -top-5 -right-3 flex items-center w-6 h-6 cursor-pointer rounded-md ${Theme_A.button.crossButtonSmall} z-10`}>
                            <CrossIcon width="18" height="18" />
                        </div>)}
                </div>
                <p className="text-black ">{subtitle}</p>
            </div>
        )
    }

    const savePotraits = async () => {
        setIsLoading(true)
        const formData = new FormData();
        formData.append("ethnic_group", ethnicGroup);
        formData.append("hair_length", hairLength);
        formData.append("gender", gender);
        formData.append("slightly_left_profile", profileSlightlyLeftImage);
        formData.append("left_profile", profileLeftImage);
        formData.append("front_profile", profileImage);
        formData.append("slightly_right_profile", profileSlightlyRightImage);
        formData.append("right_profile", profileRightImage);        
        imagesToUpload.forEach(image => {
            if(image)
                formData.append(image.type, image.file);
        });        
        await client.storeUserPotrait(formData)
            .then(resp => {
                console.log(resp.data);
                showSnackbar("succès", "Portrait enregistrés avec succès");
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    };

    const fetchPotraits = async () => {
        const resp = await client.getUserPotrait();        

        setprofileSlightlyLeftImage(resp.data.slightly_left_profile)
        setProfileLeftImage(resp.data.left_profile);
        setProfileImage(resp.data.front_profile);
        setProfileSlightlyRightImage(resp.data.slightly_right_profile);
        setProfileRightImage(resp.data.right_profile);
        setGender(resp.data.gender);
        setethnicGroup(resp.data.ethnic_group);
        sethairLength(resp.data.hair_length);
    }

    useEffect(() => {
        fetchPotraits();
    }, []);


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
                            {profilPicToDisplay(handleClickLeft2, profileSlightlyLeftImage, SubTextToDisplay[0], 32, DefaultProfilLeft2)}

                            {profilPicToDisplay(handleClickLeft, profileLeftImage, SubTextToDisplay[1], 32, DefaultProfilLeft)}
                        </div>

                        {/* Straight side in the middle */}

                        {/* <div className="w-40 gap-10 -mt-6 sm:-mt-0"> */}
                        {profilPicToDisplay(handleClick, profileImage, SubTextToDisplay[2], 52, DefaultProfilFace)}
                        {/* </div> */}

                        {/* Right side of the face on the right */}
                        <div className="flex sm:flex-col  gap-10 -mt-6 sm:-mt-0">
                            {profilPicToDisplay(handleClickRight2, profileSlightlyRightImage, SubTextToDisplay[3], 32, DefaultProfilRight2)}

                            {profilPicToDisplay(handleClickRight, profileRightImage, SubTextToDisplay[4], 32, DefaultProfilRight)}
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
                    <div className="flex flex-col sm:flex-row  sm:items-start justify-center gap-14">
                        <div className="flex flex-col gap-2">

                            <DropdownMenu
                                dropdownItems={Gender.map((item) => item)}
                                fctToCallOnClick={handleNewGender}
                                selectId={gender}
                                menuName="Genre"
                            />
                        </div>
                        <div className="flex flex-col gap-2">

                            <DropdownMenu
                                dropdownItems={Ethnicity.map((item) => item)}
                                selectId={ethnicGroup}
                                fctToCallOnClick={handleNewEthnicity}
                                menuName="Groupe ethnique"
                            />
                        </div>
                        <div className="flex flex-col gap-2">

                            <DropdownMenu
                                dropdownItems={Length.map((item) => item)}
                                selectId={hairLength}
                                fctToCallOnClick={handleNewSetCurrentLength}
                                menuName="Longueur cheveux"
                            />
                        </div>
                    </div>
                    <div className="flex flex-row justify-center mb-40 mt-10">
                        {/* <button onClick={resetAllValues_1} className={`${Theme_A.button.medBlackColoredButton}`}>Réinitialiser</button> */}
                        <button
                            onClick={savePotraits}
                            className={`${Theme_A.button.mediumGradientButton} ml-3`}>
                            Save
                        </button>
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

