import { CircleRight } from "@/components/utilis/Icons";
import ClientDashboardLayout from "@/layout/ClientDashboardLayout";
import React, { useState } from "react";

const Account = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const items = [
        "Informations personnelles",
        "Mot de passe",
        "Moyens de paiements",
        "Réservations en cours",
        "Notifications",
        "Confidentialité et règles d’utilisation",
        "Langue",
    ];
    const informations = [
        { name: "Nom légal", desc: "Dimitri Bala" },
        { name: "Adresse", desc: "Information non fournie" },
        { name: "Numéro de téléphone", desc: "+41 ** *** 62 92" },
        { name: "Adresse e-mail", desc: "b***9@gmail.com" },
        { name: "Pièce d'identité officielle", desc: "Information non fournie" },
        { name: "Statut", desc: "Etudiant - vérifié" },
    ];
    const notifications = [
        { name: "Activité du compte", desc: "Activé : E-mail et SMS" },
        { name: "Rappels", desc: "Activé : E-mail, SMS et Whatsapp" },
        { name: "Messages", desc: "Activé : E-mail, Whatsapp" },
    ];
    const [showItem, setShowItem] = useState(informations);
    const onSelectTab = (item: string, index: number) => {
        setSelectedTab(index);
        if (item === "Notifications") {
            setShowItem(notifications);
        } else {
            setShowItem(informations);
        }
    };
    return (
        <div>
            <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 z-10">
                <CircleRight />
            </div>
            <ClientDashboardLayout>
                <div className="mt-14 mb-5 px-6">
                    <p className="text-black font-medium text-3xl text-center">
                        Gestion du compte
                    </p>
                    <div className="flex flex-col md:flex-row items-start justify-center gap-10 xl:gap-20 mt-10">
                        <div className="w-full md:w-auto flex flex-col items-center justify-center gap-6">
                            {items.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => onSelectTab(item, index)}
                                        className={`flex items-center justify-center w-full md:w-80 xl:w-96 h-16 bg-white rounded-2xl text-black shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)] border cursor-pointer ${selectedTab === index && "border-secondary"
                                            }`}
                                    >
                                        {item}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="relative z-10 w-full md:w-6/12 md:h-[590px] mt-5 md:mt-0 rounded-3xl bg-white py-8 px-14 shadow-[0px_13px_37px_0px_rgba(176,176,176,0.28)]">
                            {showItem.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex items-start justify-between my-6"
                                    >
                                        <div>
                                            <p className="text-black">{item.name}</p>
                                            <p className="text-[#666] text-sm">{item.desc}</p>
                                        </div>
                                        <div className="text-black underline text-xs">modifier</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </ClientDashboardLayout>
        </div>
    )
}

export default Account