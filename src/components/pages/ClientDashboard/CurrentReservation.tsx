"use client";
import Footer from "@/components/UI/Footer";
import { CircleRight, LogoCircleFixRight } from "@/components/utilis/Icons";
import { ColorsThemeA, Theme_A } from "@/components/utilis/Themes";
import ClientDashboardLayout from "@/layout/ClientDashboardLayout";
import Image from "next/image";
import React from "react";


const Currentreservation = () => {

    // TODO: get information from the current reservation
    const items = [
        { name: 'Date', desc: '13 Janvier 2024' },
        { name: 'Heure', desc: '13:00' },
        { name: 'Coiffure', desc: 'Fondu haut' },
        { name: 'Couleur', desc: 'Aucune' },
        { name: 'Prix coiffure', desc: '45 euro' },
        { name: 'Prestation', desc: 'Brushing' },
        { name: 'Prix prestation', desc: '15 euro' },
        { name: 'Coiffeur', desc: 'Karim' },
    ]

    const itemsSalons = [
        { name: 'Salon', desc: 'Golden Barber' },
        { name: 'Addresse du salon', desc: '215 avenue Saint-Martin 75001 Paris' },
        { name: 'Telephone', desc: '03 22 55 66 77' },
    ]

    return (
        <div>
            <div className="hidden lg:block fixed -right-2 md:-right-2 -bottom-2 md:-bottom-2 z-10">
                <LogoCircleFixRight />
            </div>
            <ClientDashboardLayout>
                <div className="flex flex-col items-center justify-center mt-10 mb-5 px-6 sm:px-10 md:px-20">
                    <p className="text-black font-medium text-3xl text-center mb-8">
                        Réservations à venir
                    </p>
                    {/* <p className='text-sm text-black font-semibold mb-2'>15/04/2023</p> */}
                    <div className={`relative z-10 w-full xl:w-[800px]  rounded-3xl bg-white border-2 border-zinc-100 py-6 px-12 shadow-[0px_13px_37px_0px_rgba(176,176,176,0.28)]`}>
                        <div className='flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between'>
                            <div className='flex flex-col items-center sm:items-start justify-center sm:justify-start gap-5 mt-5 sm:mt-0'>
                                {items.map((item, index) => {
                                    return <div key={index}>
                                        <p className='text-[#444343] font-bold text-center sm:text-start'>{item.name}</p>
                                        <p className='text-[#666] text-sm text-center sm:text-start'>{item.desc}</p>
                                    </div>
                                })}
                            </div>
                            <div>
                                <div className="relative xl:w-[200px] xl:h-[200px] lg:w-[150px] lg:h-[150px] sm:w-[100px] sm:h-[100px] mb-5">
                                    <Image src='/assets/img1.png' alt='' fill={true} className='rounded-3xl ' />
                                </div>
                                <div className='flex flex-col items-center sm:items-start justify-center sm:justify-start gap-4 mt-5 sm:mt-0'>
                                    {itemsSalons.map((item, index) => {
                                        return <div key={index}>
                                            <p className='text-[#494949] font-bold text-center sm:text-start'>{item.name}</p>
                                            <p className='text-[#666] text-sm text-center sm:text-start'>{item.desc}</p>
                                        </div>
                                    })}
                                </div>
                                <div className='flex  justify-start mt-10 sm:mt-5'>
                                    <button className={`xl:w-full ${Theme_A.button.medBlackColoredButton}`}>
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
                </div>
            </ClientDashboardLayout>
            <Footer />
        </div>
    );
};

export default Currentreservation;
