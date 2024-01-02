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
import InfoButton from '@/components/UI/InfoButton';
import { user_api } from '@/api/clientSide';

// IMAGE PAR DEFAUT SI PAS DE COIFFURE SELECTIONNEE
const DefaultProfilFace = '/assets/DefaultPictures/Profil.png'; // L'URL de l'image
const DefaultName = "Cabine vide";


const ProcessedPictures = () => {

    const [notifications, setNotifications] = useState({} as any);
    const [fetchedImages, setFetchedImages] = useState<any>([]);
    const fetchUserNotifications = async () => {
        const { data } = await dashboard.userNotification();
        setNotifications(data);
    }
    const fetchUserPortraits = async () => {
        let resp = await user_api.getLatestPreviewImage();
        setFetchedImages(resp.data.data);
    }



    useEffect(() => {
        fetchUserNotifications()
        fetchUserPortraits()
    }, []);
    return (
        <div>
            <div className="fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 -z-10">
                <LogoCircleFixRight />
            </div>
            <ClientDashboardLayout notifications={notifications}>
                <div className="mt-14 mb-5 px-6 w-full">
                    <div className='flex flex-row items-center justify-center pb-10'>
                        <div className="pr-4">
                            <p className="text-black font-medium text-3xl text-center">
                                Cabine d'essayage
                            </p>
                        </div>
                        {/* Info icon  */}
                        <InfoButton title_1={"Cabine"} content_1={"Cette page contient les photos comportant votre portrait et une coiffure demandée. Une fois la génération finie, elle sera visible sur cette page."} content_2="Un maximum de 5 photos peut être générer. Une fois les 5 photos atteintes, il vous faudra supprimer une image sur cette page, avant de pouvoir en régénérer une nouvelle." onOpenModal={undefined} />
                    </div>
                    {/* Première ligne de cartes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4  justify-center">
                        {fetchedImages.map((fetched_image, index) => {
                            return (
                                <div key={index} className="flex-1">
                                    <CustomCard
                                        title={fetched_image.name}
                                        imageUrl={fetched_image.url} // Utilisez l'URL de l'image ici
                                        initialProgress={50}
                                        passed_interval={fetched_image.passed_interval}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </ClientDashboardLayout>
            <Footer />
        </div>
    )
}

export default ProcessedPictures;
