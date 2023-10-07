"use client";
import BaseDropdown from "@/components/UI/BaseDropdown";
import { CircleRight, LogoCircleFixRight } from "@/components/utilis/Icons";
import ClientDashboardLayout from "@/layout/ClientDashboardLayout";
import Image from "next/image";
import React from "react";

const Portrait = () => {
    return (
        <div>
            <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 z-10">
                <LogoCircleFixRight />
            </div>
            <ClientDashboardLayout>
                <div className="relative z-10 mt-10 mb-5 px-6 sm:px-10 md:px-20">
                    <p className="text-black font-medium text-3xl text-center mb-8">
                        Modifiez vos photos de profils
                    </p>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-14">
                        <div className="flex flex-col items-center justify-center">
                            <Image src="/assets/portrait.png" alt="" width={311} height={316} />
                            <p className="text-black">Photo de Face</p>
                        </div>
                        <div className="flex sm:flex-col items-center justify-center gap-10 -mt-6 sm:-mt-0">
                            <div className="w-6/12 sm:w-full flex flex-col items-center justify-center gap-2">
                                <div className="w-full sm:w-36 h-28 border border-[rgba(0,0,0,0.06)] rounded-3xl shadow-[3px_3px_10px_-1px_rgba(0,0,0,0.30)]"></div>
                                <p className="text-black">Profil gauche</p>
                            </div>
                            <div className="w-6/12 sm:w-full flex flex-col items-center justify-center">
                                <div>
                                    <Image
                                        src="/assets/portrait2.png"
                                        alt=""
                                        width={152}
                                        height={136}
                                        className="rounded-3xl"
                                    />
                                </div>
                                <p className="text-black">Profil droit</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 mt-10">
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-black text-sm mb-2">Longueur de cheveux actuelle</p>
                            <BaseDropdown dropdownItems={['Court']} width="w-52" height="h-14" rounded="rounded-2xl" />
                        </div>
                        <div className="flex flex-col items-center justify-center gap-4 md:mt-8">
                            <button className="w-52 h-14 flex items-center justify-center border border-secondary rounded-2xl">Supprimer</button>
                            <button className="w-52 h-14 flex items-center justify-center border border-secondary rounded-2xl">Parcourir</button>
                            <button className="w-52 h-14 flex items-center justify-center bg-background-gradient text-white rounded-2xl">Enregistrer</button>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-black text-sm mb-2">Ou Selectionner un avatar</p>
                            <BaseDropdown dropdownItems={['Aucun']} width="w-52" height="h-14" rounded="rounded-2xl" />
                        </div>
                    </div>
                </div>
            </ClientDashboardLayout>
        </div>
    );
};

export default Portrait;
