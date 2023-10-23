import React, { useState } from "react";
import AdressModal from "./AddressModal";
import { EditIcon } from "@/components/utilis/Icons";
import { Theme_A } from "@/components/utilis/Themes";

const SalonInfos = () => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className={`w-[500px] h-max bg-white rounded-2xl py-4 shadow-lg`}>
            {showModal && (
                <AdressModal close={() => setShowModal(false)}>
                    <p>Ceci est le contenu du modal.</p>
                </AdressModal>
            )}



            {/* Choix du pays */}
            <div className="flex">
                {/* Ajouter un Dowpdown pour selectionner le paysd*/}

                {/* ADRESSE DE L'ÉTABLISSEMENT */}
                <div className="flex-1 py-5 pl-5 overflow-hidden">
                    <ul>
                        <li className="text-xs text-gray-800 uppercase font-semibold ">Adresse de l'établissement</li>
                        <li>Max Mustermann</li>
                        <li>Musterstrasse 1</li>
                        <li>4020 Linz</li>
                        <li>Suisse</li>
                    </ul>
                </div>
                {/* ADRESSE DE FACTURATION */}
                <div className="flex-1 py-5 pl-1 overflow-hidden">
                    <ul>
                        <li className="text-xs text-gray-800 uppercase font-semibold">Adresse de facturation</li>
                        <li>Rick Astley</li>
                        <li>Rickrolled 11</li>
                        <li>1000 Vienna</li>
                        <li>Autriche</li>
                    </ul>
                </div>

                {/* EDIT LES ADRESSES*/}
                <div
                    className={`${Theme_A.servicesCards.modifyButton} mr-4 shadow-md  transition-transform duration-300 transform hover:scale-125`}
                    onClick={openModal}
                >
                    <EditIcon />
                </div>
            </div>

        </div>
    );
};

export default SalonInfos;
