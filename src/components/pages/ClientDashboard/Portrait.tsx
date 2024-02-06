"use client";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { dashboard } from "@/api/dashboard";
import DropdownMenu from "@/components/UI/DropDownMenu";
import { CrossIcon, LogoCircleFixRight } from "@/components/utilis/Icons";
import { Theme_A } from "@/components/utilis/Themes";
import ClientDashboardLayout from "@/layout/ClientDashboardLayout";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Footer from '@/components/UI/Footer';
import { client, user_api } from "@/api/clientSide";
import useSnackbar from "@/hooks/useSnackbar";
import InfoButton from "@/components/UI/InfoButton";
import { getLocalStorage, removeFromLocalStorage, setLocalStorage } from "@/api/storage";
import TourModal, { Steps } from "@/components/UI/TourModal";
import userLoader from "@/hooks/useLoader";

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

const DefaultProfilFace = <Image src='/assets/PortraitClient/ProfilFace.png' alt='' fill={true} className='rounded-3xl ' />
const DefaultProfilLeft = <Image src='/assets/PortraitClient/ProfilLeft.png' alt='' fill={true} className='rounded-3xl ' />
const DefaultProfilLeft2 = <Image src='/assets/PortraitClient/ProfilLeft2.png' alt='' fill={true} className='rounded-3xl ' />
const DefaultProfilRight = <Image src='/assets/PortraitClient/ProfilRight.png' alt='' fill={true} className='rounded-3xl ' />
const DefaultProfilRight2 = <Image src='/assets/PortraitClient/ProfilRight2.png' alt='' fill={true} className='rounded-3xl ' />
const user = getLocalStorage('user');
const userData = user ? JSON.parse(user) : null;
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

    const [imagesToUpload, setImagesToUpload] = useState<any>([]);
    const [gender, setGender] = useState('');
    const [ethnicGroup, setethnicGroup] = useState('');
    const [hairLength, sethairLength] = useState('');
    const [pageDone, setPageDone] = useState<String[]>(['portrait']);
    const { loadingView } = userLoader();

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
        getBase64(fileUploaded, (result) => {
            setProfileImage(result);
        });
        imagesToUpload.push({ 'type': 'front_profile', 'file': event.target.files[0] })
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
        getBase64(fileUploaded, (result) => {
            setProfileLeftImage(result);
        });
        imagesToUpload.push({ 'type': 'left_profile', 'file': event.target.files[0] })
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

        getBase64(fileUploaded, (result) => {
            setprofileSlightlyLeftImage(result);
        });
        //setprofileSlightlyLeftImage(URL.createObjectURL(fileUploaded));
        imagesToUpload.push({ 'type': 'slightly_left_profile', 'file': event.target.files[0] })
        //setImagesToUpload([{'type': 'slightly_left_profile',  'file': event.target.files[0]}])
    };

    const getBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            //console.log('Error: ', error);
        };
    }
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
        getBase64(fileUploaded, (result) => {
            setProfileRightImage(result);
        });
        //setProfileRightImage(URL.createObjectURL(fileUploaded));
        imagesToUpload.push({ 'type': 'right_profile', 'file': event.target.files[0] })
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
        getBase64(fileUploaded, (result) => {
            setProfileSlightlyRightImage(result);
        });
        imagesToUpload.push({ 'type': 'slightly_right_profile', 'file': event.target.files[0] })
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
                    className="relative p-4 rounded-2xl border-2 bg-white shadow-md hover:shadow-xl pic_left_profil">
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
        if (profileSlightlyLeftImage)
            formData.append("slightly_left_profile", profileSlightlyLeftImage);
        if (profileLeftImage)
            formData.append("left_profile", profileLeftImage);
        if (profileImage)
            formData.append("front_profile", profileImage);
        if (profileSlightlyRightImage)
            formData.append("slightly_right_profile", profileSlightlyRightImage);
        if (profileRightImage)
            formData.append("right_profile", profileRightImage);
        imagesToUpload.forEach(image => {
            if (image)
                formData.append(image.type, image.file);
        });
        userData.ethnic_group = ethnicGroup
        userData.hair_length = hairLength
        userData.gender = gender
        setLocalStorage('user', JSON.stringify(userData))
        await client.storeUserPotrait(formData)
            .then(resp => {
                //console.log(resp.data);
                showSnackbar("success", "Portraits enregistrés avec succès");
            })
            .catch(err => {
                //console.log(err)
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

    const [notifications, setNotifications] = useState({} as any);
    const fetchUserNotifications = async () => {
        const { data } = await dashboard.userNotification();
        setNotifications(data);
    }

    useEffect(() => {
        fetchPotraits();
        fetchUserNotifications();
        const pages_done = getLocalStorage('pages_done')
        setPageDone(pages_done ? JSON.parse(pages_done) : [])
    }, []);

    // ------------------------------------------------------------------
    // For Tour
    const tourSteps: Steps[] = [
        {
            selector: '',
            content: 'Vous pouvez ici entrer vos photos de profil qui seront utilisées lors de la génération d\'une coiffure sur votre tête',
        },
        {
            selector: '.zone_left_profil',
            content: 'La photo doit correspondre au titre placé dessous',
        },
        {
            selector: '.pic_left_profil',
            content: 'Cliquer ici pour selectionner une de vos photos.',
        },
        {
            selector: '.zone_filters',
            content: 'Indiquer vos préférences pour vos recherches de coiffures.',
        },
    ];

    const closeTour = async () => {
        // You may want to store in local storage or state that the user has completed the tour
        setIsLoading(true)
        if (!pageDone.includes('portrait')) {
            let resp = await user_api.assignStepDone({ page: 'portrait' });
            if(resp.data?.pages_done) {
              setLocalStorage('pages_done', JSON.stringify(resp.data.pages_done));
            }
            setPageDone((prevArray) => [...prevArray, 'portrait'])
        }
        setIsLoading(false);
    };
    // ------------------------------------------------------------------


    return (
        <div>
            {isLoading && loadingView()}

            {/* For explaining the website */}<TourModal steps={tourSteps} onRequestClose={closeTour} doneTour={pageDone.includes('portrait')} />

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
            <ClientDashboardLayout notifications={notifications}>
                <div className="relative mt-10 mb-5 px-4 sm:px-6 md:px-20">
                    <div className='flex flex-row items-center justify-center pb-10 w-full'>
                        <div className="pr-4">
                            <p className="text-black font-medium text-3xl text-center">
                                Modifiez vos photos de profils
                            </p>
                        </div>
                        {/* Info icon  */}
                        <InfoButton title_1={"Photos de profil"} content_1={"Vous pouvez  disposer ici vos photos de profil."} content_2="Celles-ci seront utilisées lors de la génération de votre photos avec une coiffure voulue." onOpenModal={undefined} />
                    </div>

                    <p className="text-stone-400 font-normal italic text-sm text-center my-10">
                        Pour modifiez une photo, cliquer sur celle-ci et sélectionner la remplaçante
                    </p>
                    <div className="flex flex-col sm:flex-row  items-center justify-center gap-x-4 gap-y-8 lg:gap-14">
                        {/* Left side of the head placed left */}
                        <div className="flex sm:flex-col gap-6 md:gap-10 -mt-6 sm:-mt-0 ">

                            {profilPicToDisplay(handleClickLeft2, profileSlightlyLeftImage, SubTextToDisplay[0], 32, DefaultProfilLeft2)}
                            <div className="zone_left_profil">
                                {profilPicToDisplay(handleClickLeft, profileLeftImage, SubTextToDisplay[1], 32, DefaultProfilLeft)}
                            </div>
                        </div>

                        {/* Straight side in the middle */}

                        {/* <div className="w-40 gap-10 -mt-6 sm:-mt-0"> */}
                        {profilPicToDisplay(handleClick, profileImage, SubTextToDisplay[2], 52, DefaultProfilFace)}
                        {/* </div> */}

                        {/* Right side of the face on the right */}
                        <div className="flex sm:flex-col gap-6 md:gap-10 -mt-6 sm:-mt-0">
                            {profilPicToDisplay(handleClickRight2, profileSlightlyRightImage, SubTextToDisplay[3], 32, DefaultProfilRight2)}

                            {profilPicToDisplay(handleClickRight, profileRightImage, SubTextToDisplay[4], 32, DefaultProfilRight)}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 mt-10">

                    </div>
                    <p className="text-stone-400 font-normal italic text-sm text-center my-10">
                        Indiquer votre genre et groupe ethnique. Ceux-ci serviront lors de la presentation des coiffures à la page d'accueil
                    </p>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-2 lg:gap-14 zone_filters">
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
                            Enregistrer
                        </button>
                    </div>
                </div>
            </ClientDashboardLayout >
            <Footer />
        </div >
    );
};

export default Portrait;

