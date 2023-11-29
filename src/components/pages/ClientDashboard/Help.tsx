"use client";
import Footer from '@/components/UI/Footer';
import { LogoCircleFixRight } from '@/components/utilis/Icons';
import { Theme_A } from '@/components/utilis/Themes';
import ClientDashboardLayout from '@/layout/ClientDashboardLayout'
import React, { useState } from "react";

const Help = () => {

    return (
        <div>
            <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 -z-10">
                <LogoCircleFixRight />
            </div>
            <ClientDashboardLayout>
                <div className="mt-14 mb-5 px-6">
                    {/*  For displaying the rating popup */}

                    <div className="flex flex-col items-center justify-center mt-10 mb-5 px-6 sm:px-10 md:px-20">
                        <p className="text-black font-medium text-3xl text-center mb-8">
                            Page d'aide
                        </p>
                        <p className="text-stone-500 italic font-normal text-lg text-center my-8">
                            Besoin de faire une réservation Onehaircut, rien de plus simple
                        </p>
                        <div className='p-6 rounded-2xl bg-stone-900 shadow-lg shadow-slate-700 w-[400px] h-[250px] md:w-[500px] md:h-[300px] lg:w-[600px] lg:h-[360px] xl:w-[800px] xl:h-[500px]'>
                            <iframe
                                // className="w-96 h-52 md:w-full md:h-full"
                                className="w-full h-full"
                                // height="315"    // Set the height of the video player
                                src={`https://www.youtube.com/embed/TW-LgJUiMX0`}  // Embed the video using the video ID
                                title="Comment faire une réservation sur Onehaircut"  // Provide a title for accessibility
                                allowFullScreen  // Allow full-screen mode
                            />
                        </div>
                    </div>
                </div>
            </ClientDashboardLayout>
            <Footer />
        </div>
    )
}

export default Help