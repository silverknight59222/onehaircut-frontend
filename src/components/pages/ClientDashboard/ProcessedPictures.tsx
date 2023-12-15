"use client";
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/shared/Sidebar';
import React, { useState, useEffect } from "react";
import { LogoCircleFixRight } from "@/components/utilis/Icons";
import Footer from "@/components/UI/Footer";
import ClientDashboardLayout from '@/layout/ClientDashboardLayout'; // Assurez-vous d'importer correctement le composant
import CustomCard from '@/components/UI/CustomCard';
import Image from "next/image";
import { dashboard } from '@/api/dashboard';

// IMAGE PAR DEFAUT SI PAS DE COIFFURE SELECTIONNEE
const DefaultProfilFace = '/assets/DefaultPictures/Profil.png'; // L'URL de l'image
const DefaultName = "Cabine vide";


const ProcessedPictures = () => {

    const [notifications, setNotifications] = useState({} as any);
    const fetchUserNotifications = async () => {
        const { data } = await dashboard.userNotification();
        setNotifications(data);
    }



    useEffect(() => { fetchUserNotifications() }, [])
    return (
        <div>
            <div className="fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 -z-10">
                <LogoCircleFixRight />
            </div>
            <ClientDashboardLayout notifications={notifications}>
                <div className="mt-14 mb-5 px-6 w-full">
                    {/* Première ligne de cartes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4  justify-center">
                        <div className="flex-1">
                            <CustomCard
                                title={DefaultName}
                                imageUrl={DefaultProfilFace} // Utilisez l'URL de l'image ici
                                initialProgress={50}
                            />


                        </div>
                        <div className="flex-1">
                            <CustomCard
                                title={DefaultName}
                                imageUrl={DefaultProfilFace}
                                initialProgress={50}
                            />
                        </div>
                        <div className="flex-1">
                            <CustomCard
                                title={DefaultName}
                                imageUrl={DefaultProfilFace}
                                initialProgress={50}
                            />
                        </div>
                        {/* </div> */}

                        {/* Deuxième ligne de cartes */}
                        {/* <div className="grid grid-rows-3 gap-4 md:flex flex-row mt-4 justify-evenly"> */}
                        <div className="flex-1">
                            <CustomCard
                                title={DefaultName}
                                imageUrl={DefaultProfilFace}
                                initialProgress={50}
                            />
                        </div>
                        <div className="flex-1">
                            <CustomCard
                                title={DefaultName}
                                imageUrl={DefaultProfilFace}
                                initialProgress={50}
                            />
                        </div>
                    </div>
                </div>
            </ClientDashboardLayout>
            <Footer />
        </div>
    )
}

export default ProcessedPictures;
