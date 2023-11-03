"use client";
import Footer from "@/components/UI/Footer";
import { CircleRight, LogoCircleFixRight } from "@/components/utilis/Icons";
import { ColorsThemeA, Theme_A } from "@/components/utilis/Themes";
import ClientDashboardLayout from "@/layout/ClientDashboardLayout";
import Image from "next/image";
import ChatModal from "../SearchSalon/ChatModal";
import React, { useEffect, useState, useRef } from "react";
import { client } from "@/api/clientSide";

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
                    <p className="text-black font-medium text-3xl text-center mb-8">
                        Réservations à venir
                    </p>
                    {/* <p className='text-sm text-black font-semibold mb-2'>15/04/2023</p> */}
                    {!items.length && <p className="text-3xl">Aucune Réservation Disponible</p>}
                    {items.map((item, index) => {
                        return (
                            <div key={index} className={`relative z-10 w-full xl:w-[800px]  rounded-3xl bg-white border-2 border-zinc-100 py-6 px-12 shadow-[0px_13px_37px_0px_rgba(176,176,176,0.28)] mb-3`}>
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
                                        {item.salon_haircut && <div>
                                            <p className='text-[#444343] font-bold text-center sm:text-start'>Coiffure</p>
                                            <p className='text-[#666] text-sm text-center sm:text-start'>{item.salon_haircut.haircut.name}</p>
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
                                        {item.salon_haircut && <div className="relative xl:w-[200px] xl:h-[200px] lg:w-[150px] lg:h-[150px] sm:w-[100px] sm:h-[100px] mb-5">
                                            <Image src={`https://api-server.onehaircut.com/public${item.salon_haircut.haircut.image}`} alt='' fill={true} className='rounded-3xl ' />
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
                                <div
                                    className='flex mt-10 items-center justify-center cursor-pointer '>
                                    <p className="text-xs text-[#666] underline transform hover:scale-105 transition-transform hover:text-red-500 hover:font-medium"> Annuler cette réservation </p>
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
