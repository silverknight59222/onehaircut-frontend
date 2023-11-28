"use client";
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/shared/Sidebar';
import React, { useState } from "react";
import { LogoCircleFixRight } from "@/components/utilis/Icons";
import Footer from "@/components/UI/Footer";
import ClientDashboardLayout from '@/layout/ClientDashboardLayout'; // Assurez-vous d'importer correctement le composant
import CustomCard from '@/components/UI/CustomCard';
import Image from "next/image";

// IMAGE PAR DEFAUT SI PAS DE COIFFURE SELECTIONNEE
const DefaultProfilFace = '/assets/DefaultPictures/Profil.png'; // L'URL de l'image
const DefaultName = "Cabine vide";


const ProcessedPictures = () => {
    return (
        <div>
            <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 -z-10">
                <LogoCircleFixRight />
            </div>
            <ClientDashboardLayout>
                <div className="mt-14 mb-5 px-6">
                    {/* Première ligne de cartes */}
                    <div className="grid grid-rows-3 gap-4 md:flex flex-row justify-evenly">
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
                    </div>

                    {/* Deuxième ligne de cartes */}
                    <div className="grid grid-rows-3 gap-4 md:flex flex-row mt-4 justify-evenly">
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
