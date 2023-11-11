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

interface selectedSalonInterface {
    name: string, id: number
}

const Currentreservation = () => {


    // FOR CHAT MODAL 
    // Créez un état pour suivre si le Chat modal est ouvert ou fermé
    const [isChatModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Array<{ content: string, sent: boolean }>>([]);
    const closeChatModal = () => {
        setIsModalOpen(false);
    };
    // Cette fonction sera appelée lorsque l'utilisateur clique sur le bouton pour ouvrir le modal
    const openChatModal = () => {
        setIsModalOpen(true);
    };

    const [items, setItems] = useState([]);
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

    useEffect(() => {
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
    const [itemToCancel, setItemToCancel] = useState({});
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
        console.log(reservation.date)
        setItemToCancel(reservation); // save up the reservation to cancel
        setIsModalCancel(true); // start modal
        console.log(itemToCancel.date)
        // calculate the time difference
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

        console.log(currentDateTime)
        console.log(reservationDateTime)
        console.log(hoursDifference)

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

    // function to display the modal when the reservation wants to be canceled
    const modifReservation: React.JSX.Element =
        <div>
            <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-xl font-semibold text-black text-center">Annulation de la réservation</p>
                {/* check if cancellation was accepted */}
                {cancelAccepted &&
                    // Cancellation possible
                    <div>
                        <p className="text-md font-medium text-red-700 text-center">
                            Êtes-vous sûr de vouloir annuler la reservation du </p>
                        <p className="text-md font-medium text-black text-center">{itemToCancel.redable_date} ?</p>
                    </div>}
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
            <div className="mt-6 flex gap-4 items-center justify-center w-full">
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

    return (
        <div>
            <div className="hidden lg:block fixed -right-2 md:-right-2 -bottom-2 md:-bottom-2 z-10">
                <LogoCircleFixRight />
            </div>
            {isChatModalOpen && (
                <ChatModal
                    isModalOpen={isChatModalOpen}
                    closeModal={closeChatModal}
                    professionalData="" // TODO ADD TRUE SALON LINK
                    className="z-1000 opacity-100"
                />
            )}
            <ClientDashboardLayout>
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
                                <div className='flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between'>
                                    <div className='flex flex-col items-center sm:items-start justify-center sm:justify-start gap-5 mt-5 sm:mt-0'>
                                        <div>
                                            <p className='text-[#444343] font-bold text-center sm:text-start'>Date</p>
                                            <p className='text-[#666] text-sm text-center sm:text-start'>{item.redable_date}</p>
                                        </div>
                                        <div>
                                            <p className='text-[#444343] font-bold text-center sm:text-start'>Heure</p>
                                            <p className='text-[#666] text-sm text-center sm:text-start'>{item.total_duration} mins</p>
                                        </div>
                                        {item.haircut && <div>
                                            <p className='text-[#444343] font-bold text-center sm:text-start'>Coiffure</p>
                                            <p className='text-[#666] text-sm text-center sm:text-start'>{item.haircut.name}</p>
                                        </div>}
                                        {item.salon_haircut && <div>
                                            <p className='text-[#444343] font-bold text-center sm:text-start'>Prix coiffure</p>
                                            <p className='text-[#666] text-sm text-center sm:text-start'>{item.salon_haircut.base_price}</p>
                                        </div>}
                                        <div>
                                            <p className='text-[#444343] font-bold text-center sm:text-start'>Prestation</p>
                                            {
                                                item.items.filter((ele) => ele.type == 'service').map((ele, index) => {

                                                    if (ele.name) {
                                                        return (<p key={index} className='text-[#666] text-sm text-center sm:text-start'>{ele.name}.</p>);
                                                    }
                                                    else {
                                                        return (<p key={index} className='text-[#666] text-sm text-center sm:text-start'>none</p>);
                                                    }
                                                })
                                            }
                                            {item.items.filter((ele) => ele.type == 'service').length == 0 && <p key={index} className='text-[#666] text-sm text-center sm:text-start'>none.</p>}
                                        </div>
                                        <div>
                                            <p className='text-[#444343] font-bold text-center sm:text-start'>Prix prestation</p>
                                            <p key={index} className='text-[#666] text-sm text-center sm:text-start'>{item.total_service_price}</p>
                                            {/* {item.total_amount}</p> */}
                                        </div>
                                        <div>
                                            <p className='text-[#444343] font-bold text-center sm:text-start'>Coiffeur</p>
                                            <p className='text-[#666] text-sm text-center sm:text-start'>{item.hair_dresser_info.name}</p>
                                        </div>
                                    </div>
                                    <div>
                                        {item.haircut && <div className="relative xl:w-[200px] xl:h-[200px] lg:w-[150px] lg:h-[150px] sm:w-[100px] sm:h-[100px] mb-5">
                                            <Image src={`https://api.onehaircut.com${item.haircut.image}`} alt='' fill={true} className='rounded-3xl ' />
                                        </div>}
                                        <div className='flex flex-col items-center sm:items-start justify-center sm:justify-start gap-4 mt-5 sm:mt-0'>
                                            <div>
                                                <p className='text-[#494949] font-bold text-center sm:text-start'>Salon</p>
                                                <p className='text-[#666] text-sm text-center sm:text-start'>{item.salon_info.name}</p>
                                            </div>
                                            <div>
                                                <p className='text-[#494949] font-bold text-center sm:text-start'>Addresse du salon</p>
                                                <p className='text-[#666] text-sm text-center sm:text-start'>{item.hair_salon.address.street} {item.hair_salon.address.city} {item.hair_salon.address.state} {item.hair_salon.address.country}</p>
                                            </div>
                                            <div>
                                                <p className='text-[#494949] font-bold text-center sm:text-start'>Telephone</p>
                                                <p className='text-[#666] text-sm text-center sm:text-start'>{item.hair_salon.phone || '-'}</p>
                                            </div>
                                        </div>
                                        <div className='flex  justify-start mt-10 sm:mt-5'>
                                            <button onClick={openChatModal} className={`xl:w-full ${Theme_A.button.medBlackColoredButton}`}>
                                                Contacter le salon
                                            </button>
                                        </div>
                                    </div>

                                </div>
                                {!item.salon_haircut && <div className='flex mt-10 items-center justify-center '>
                                    <p className='text-[#AA4A44] font-bold text-center sm:text-start'>Le salon ne propose plus cette coupe</p>
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
