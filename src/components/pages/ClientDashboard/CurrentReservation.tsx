"use client";
import Footer from "@/components/UI/Footer";
import { LogoCircleFixRight } from "@/components/utilis/Icons";
import { ColorsThemeA, Theme_A } from "@/components/utilis/Themes";
import ClientDashboardLayout from "@/layout/ClientDashboardLayout";
import Image from "next/image";
import ChatModal from "../SearchSalon/ChatModal";
import React, { useEffect, useState, useRef } from "react";
import { client } from "@/api/clientSide";
import BaseModal from "@/components/UI/BaseModal";
import { dashboard } from "@/api/dashboard";

interface selectedSalonInterface {
    name: string, id: number
}

const Currentreservation = () => {


    // FOR CHAT MODAL 
    // Créez un état pour suivre si le Chat modal est ouvert ou fermé
    const [isChatModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [activeSalon, setActiveSalon] = useState<any>(null);
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Array<{ content: string, sent: boolean }>>([]);
    const closeChatModal = () => {
        setActiveSalon(null)
        setIsModalOpen(false);
    };
    // Cette fonction sera appelée lorsque l'utilisateur clique sur le bouton pour ouvrir le modal
    const openChatModal = (item) => {
        setActiveSalon(item.hair_salon)
        setIsModalOpen(true);
    };

    const [items, setItems] = useState<any>([]);
    const [itemCount, setItemCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    let page = 1;
    let isPageLoading = false

    const allReservations = async (currentPage: number) => {
        setIsLoading(true);
        isPageLoading = true
        client.getMyReservations(currentPage)
            .then((resp) => {
                if (currentPage == 1) {
                    setItems(resp.data.bookings);
                } else {
                    setItems(prevPage => [...prevPage, ...resp.data.bookings]);
                }

                setItemCount(resp.data.count);
                setIsLoading(false);
                if (resp.data.count <= (currentPage * resp.data.perPage)) {
                    page = -1
                } else {
                    page = currentPage + 1
                }
            })
            .finally(() => {
                setIsLoading(false)
                isPageLoading = false
            });
    }
    const [totalAmountForSevice, setTotalAmountForSevice] = useState(0);
    const handleScroll = () => {
        if (isPageLoading) return;
        if (page == -1) return;

        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 30) {
            allReservations(page);
        }
    };
    const [notifications, setNotifications] = useState({} as any);
    const fetchUserNotifications = async () => {
        const { data } = await dashboard.userNotification();
        setNotifications(data);
    }

    useEffect(() => {
        fetchUserNotifications();
        allReservations(page);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    // ------------- FOR CANCELLING ---------------------
    // state variables
    // Modal for canceling the reservation
    const [isModalCancel, setIsModalCancel] = useState(false);
    const [itemToCancel, setItemToCancel] = useState<any>({});
    const [currentTime, setCurrentTime] = useState<Date | null>(null);
    const [cancelAccepted, setCancelAccepted] = useState(false);

    // function to update the time every seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);
        }, 1000); // Update every second
        return () => clearInterval(intervalId);
    }, []);

    // function when pressing on the cancel button
    const startCancel = (reservation: any) => {
        setItemToCancel(reservation); // save up the reservation to cancel
        setIsModalCancel(true); // start modal
        compareDates();
    };

    // function to calculate if cancelation is acceptable
    const compareDates = () => {
        //calculate the time remaining until reservation
        const currentDateTimeString = currentTime?.toDateString(); // Change this if you want a different format
        const currentDateTime = new Date(currentDateTimeString!);

        const reservationDateTime = new Date(itemToCancel.date);

        const timeDifference = reservationDateTime.getTime() - currentDateTime.getTime();
        const hoursDifference = timeDifference / (1000 * 3600);

        //console.log(currentDateTime)
        //console.log(reservationDateTime)
        //console.log(hoursDifference)

        if (hoursDifference >= 24) {
            // Current time is 24 hours or more before the reservation time.
            // cancellation is accepted
            setCancelAccepted(true)
        } else {
            // Current time is less than 24 hours before the reservation time.
            // cancellation is rejected
            setCancelAccepted(false)
        }
    };

    useEffect(() => {
        compareDates();
    }, [itemToCancel, cancelAccepted])

    // function to cancel the booking
    const onConfirm = () => {
        // TODO add Backend
        setIsModalCancel(false); // start modal
    }


    function formaterDate(dateString: string) {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
        };

        const date = new Date(dateString);
        const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(date);

        // Insérer " à " avant l'heure
        const parts = formattedDate.split(', ');
        if (parts.length > 1) {
            return `${parts[0]} à ${parts[1].replace(':', 'h')}`;
        } else {
            return formattedDate;
        }
    }



    // function to display the modal when the reservation wants to be canceled
    const modifReservation: React.JSX.Element =
        <div>
            <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-2xl font-semibold text-black text-center mb-6">Annulation de la réservation</p>
                {/* check if cancellation was accepted */}
                {cancelAccepted &&
                    <div>
                        <p className="text-sm font-medium text-red-600 text-center">
                            Êtes-vous sûr de vouloir annuler la reservation du </p>
                        <p className="text-sm font-medium text-red-600 text-center">
                            {formaterDate(itemToCancel.redable_date)} ?
                        </p>
                    </div>
                }
                {!cancelAccepted &&
                    // Cancellation denied
                    <div className="text-stone-800 font-normal italic text-sm text-center my-2">
                        <p >
                            Une reservation ne peut être annuler si elle ne se situe pas dans les 24 heures suivant l'annulation. Veuillez vous référez à nos
                        </p>
                        {/* redirect user to the terms */}
                        <p className="cursor-pointer underline"
                            onClick={() => window.open('/terms')}> conditions générales</p>
                    </div>}




            </div>
            <div className="mt-12 flex gap-4 items-center justify-center w-full ">
                <button
                    className={`${Theme_A.button.medWhiteColoredButton}`}
                    onClick={() => setIsModalCancel(false)}
                >
                    Retour
                </button>
                {cancelAccepted && <button
                    className={`${Theme_A.button.medBlackColoredButton}`}
                    onClick={onConfirm}
                >
                    Confirmer l'annulation
                </button>}
            </div>
        </div >

    const formatFrenchDate = (dateString) => {
        const date = new Date(dateString);

        // Options avec des valeurs littérales spécifiques
        const optionsDate = { weekday: 'long' as const, day: 'numeric' as const, month: 'long' as const };
        const optionsTime = { hour: '2-digit' as const, minute: '2-digit' as const, hour12: false };

        const formattedDate = new Intl.DateTimeFormat('fr-FR', optionsDate).format(date);
        const formattedTime = new Intl.DateTimeFormat('fr-FR', optionsTime).format(date);

        return `${formattedDate}, ${formattedTime}`;
    };


    return (
        <div>
            <div className="hidden lg:block fixed -right-2 md:-right-2 -bottom-2 md:-bottom-2 z-10">
                <LogoCircleFixRight />
            </div>
            {isChatModalOpen && activeSalon && (
                <ChatModal
                    isModalOpen={isChatModalOpen}
                    closeModal={closeChatModal}
                    professionalData={activeSalon} // TODO ADD TRUE SALON LINK
                    className="z-1000 opacity-100"

                />
            )}
            <ClientDashboardLayout notifications={notifications}>
                <div className="flex flex-col items-center justify-center mt-10 mb-5 px-6 sm:px-10 md:px-20">
                    {/* MODAL FOR CANCELLATION */}
                    {isModalCancel && (
                        <BaseModal close={() => setIsModalCancel(false)}>
                            <div>
                                {modifReservation}
                            </div>
                        </BaseModal>)}
                    {/* REST OF THE PAGE */}
                    <p className="text-black font-medium text-3xl text-center mb-8">
                        Réservations à venir
                    </p>
                    {/* <p className='text-sm text-black font-semibold mb-2'>15/04/2023</p> */}
                    {!items.length && <p className="text-lg italic">Aucune Réservation Disponible</p>}
                    {items.map((item, index) => {
                        return (
                            <div key={index} className={`relative z-10 w-full xl:w-[800px]  rounded-3xl bg-white border-2 border-zinc-100 py-6 px-12 shadow-sm shadow-stone-600 mb-12`}>
                                <div className='grid grid-cols-2 gap-4 '>
                                    <div className='flex flex-col items-start justify-start gap-5 mt-5 sm:mt-0'>
                                        <div>
                                            <p className='text-[#444343] font-bold text-start'>Date</p>
                                            <p className='text-[#666] text-sm text-start'>{formatFrenchDate(item.redable_date)}</p>
                                        </div>
                                        <div>
                                            <p className='text-[#444343] font-bold text-start'>Durée</p>
                                            <p className='text-[#666] text-sm text-start'>{item.total_duration} mins</p>
                                        </div>
                                        {item.haircut && <div>
                                            <p className='text-[#444343] font-bold text-start'>Coiffure</p>
                                            <p className='text-[#666] text-sm text-start'>{item.haircut.name}</p>
                                        </div>}
                                        {item.salon_haircut && <div>
                                            <p className='text-[#444343] font-bold text-start'>Prix coiffure</p>
                                            <p className='text-[#666] text-sm text-start'>{item.salon_haircut.base_price}€</p>
                                        </div>}
                                        <div>
                                            <p className='text-[#444343] font-bold text-start'>Prestation</p>
                                            {
                                                item.items.filter((ele) => ele.type == 'service').map((ele, index) => {

                                                    if (ele.name) {
                                                        return (<p key={index} className='text-[#666] text-sm text-start'>{ele.name}.</p>);
                                                    }
                                                    else {
                                                        return (<p key={index} className='text-[#666] text-sm text-start'>-</p>);
                                                    }
                                                })
                                            }
                                            {item.items.filter((ele) => ele.type == 'service').length == 0 && <p key={index} className='text-[#666] text-sm text-start'>-</p>}
                                        </div>
                                        <div>
                                            <p className='text-[#444343] font-bold text-start'>Prix prestation</p>
                                            <p key={index} className='text-[#666] text-sm text-start'>{item.total_service_price}€</p>
                                            {/* {item.total_amount}</p> */}
                                        </div>
                                        <div>
                                            <p className='text-[#444343] font-bold text-start'>Coiffeur</p>
                                            <p className='text-[#666] text-sm text-start'>{item.hair_dresser_info.name}</p>
                                        </div>
                                    </div>
                                    <div className="">
                                        {item.haircut && <div className="relative w-28 h-28 xl:w-[200px] xl:h-[200px] lg:w-[150px] lg:h-[150px] sm:w-[130px] sm:h-[130px] mb-5">
                                            <Image src={`https://api.onehaircut.com${item.haircut.image}`} alt='' fill={true} className='rounded-3xl ' />
                                        </div>}
                                        <div className='flex flex-col items-center sm:items-start justify-center sm:justify-start gap-4 mt-5 sm:mt-0'>
                                            <div>
                                                <p className='text-[#494949] font-bold text-start'>Salon</p>
                                                <p className='text-[#666] text-sm text-start'>{item.salon_info.name}</p>
                                            </div>
                                            <div>
                                                <p className='text-[#494949] font-bold text-start'>Addresse du salon</p>
                                                <p className='text-[#666] text-sm text-start'>{item.hair_salon.address.street} {item.hair_salon.address.city} {item.hair_salon.address.state} {item.hair_salon.address.country}</p>
                                            </div>
                                            <div>
                                                <p className='text-[#494949] font-bold text-start'>Telephone</p>
                                                <p className='text-[#666] text-sm text-start'>{item.hair_salon.phone || '-'}</p>
                                            </div>
                                        </div>
                                        <div className='flex  justify-start mt-10 sm:mt-5'>
                                            <button onClick={() => openChatModal(item)} className={`xl:w-full ${Theme_A.button.medBlackColoredButton}`}>
                                                Contacter le salon
                                            </button>
                                        </div>
                                    </div>

                                </div>
                                {!item.salon_haircut && <div className='flex mt-10 items-center justify-center '>
                                    <p className='text-[#e05a51] font-bold text-center sm:text-start'>Le salon ne propose plus cette coupe</p>
                                </div>}
                                <div
                                    className='flex mt-10 items-center justify-center cursor-pointer '
                                    onClick={() => startCancel(item)}>
                                    <p className="text-xs text-[#666] underline transform hover:scale-105 transition-transform hover:text-red-500 hover:font-medium">
                                        Annuler cette réservation </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </ClientDashboardLayout>
            <Footer />
        </div>
    );
};

export default Currentreservation;
