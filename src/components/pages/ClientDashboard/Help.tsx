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
                        <p className="text-black font-normal text-lg text-center my-8">
                            Comment faire une réservation sur OneHairCut
                        </p>
                        <iframe
                            width="560"     // Set the width of the video player
                            height="315"    // Set the height of the video player
                            src={`https://www.youtube.com/embed/TW-LgJUiMX0`}  // Embed the video using the video ID
                            title="Comment faire une réservation sur OneHairCut"  // Provide a title for accessibility
                            allowFullScreen  // Allow full-screen mode
                        />
                    </div>
                </div>
            </ClientDashboardLayout>
            <Footer />
        </div>
    )
}

export default Help