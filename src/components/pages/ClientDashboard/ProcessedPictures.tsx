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

const titresImagesParDefaut: string[] = [];
const maxEmplacements = 5;
for (let i = 1; i <= maxEmplacements; i++) {
    titresImagesParDefaut.push(`Emplacement ${i}`);
}


const ProcessedPictures = () => {
    return (
        <div>
            <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 -z-10">
                <LogoCircleFixRight />
            </div>
            <ClientDashboardLayout>
                <div className="mt-14 mb-5 px-6">
                    {/* Première ligne de cartes */}
                    <div className="flex flex-row">
                        <div className="flex-1">
                            <CustomCard
                                title={titresImagesParDefaut[0]}
                                imageUrl={DefaultProfilFace} // Utilisez l'URL de l'image ici
                                initialProgress={50}
                            />


                        </div>
                        <div className="flex-1 mr-4">
                            <CustomCard
                                title={titresImagesParDefaut[1]}
                                imageUrl={DefaultProfilFace}
                                initialProgress={50}
                            />
                        </div>
                        <div className="flex-1">
                            <CustomCard
                                title={titresImagesParDefaut[2]}
                                imageUrl={DefaultProfilFace}
                                initialProgress={50}
                            />
                        </div>
                    </div>

                    {/* Deuxième ligne de cartes */}
                    <div className="flex flex-row mt-4">
                        <div className="flex-1">
                            <CustomCard
                                title={titresImagesParDefaut[3]}
                                imageUrl={DefaultProfilFace}
                                initialProgress={50}
                            />
                        </div>
                        <div className="flex-1">
                            <CustomCard
                                title={titresImagesParDefaut[4]}
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
