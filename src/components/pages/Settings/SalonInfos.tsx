import React, { useState } from "react";
import { EditIcon } from "@/components/utilis/Icons";
import { Theme_A } from "@/components/utilis/Themes";
import BaseModal from "@/components/UI/BaseModal";

const SalonInfos = () => {
    const [isModal, setIsModal] = useState(false)
    const openModal = () => {
        setIsModal(true);
    };
    const closeModal = () => {
        setIsModal(false);
    };

    return (
        <div className={`w-[500px] h-max bg-white rounded-2xl py-4 shadow-lg`}>
            {isModal &&
                <BaseModal close={() => setIsModal(false)}>
                    <div className="relative z-100"> {/* z-50 or more to make sure it is always on top */}
                        {/* Contenu du Modal Adresse */}

                        <div className="flex">
                            <div className="flex-1 py-5 pl-5 overflow-hidden">
                                <h1 className="inline text-2xl font-semibold leading-none">Adresse</h1>
                            </div>
                        </div>
                        <div className="px-5 pb-5">
                            <input placeholder="Name" className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" /><input placeholder="Address" className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" />
                            <div className="flex">
                                <div className="flex-grow w-1/4 pr-2"><input placeholder="PLZ" className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" /></div>
                                <div className="flex-grow"><input placeholder="City" className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" /></div>
                            </div>
                            <div className="flex items-center pt-3"><input type="checkbox" className="w-4 h-4 text-black bg-gray-300 border-none rounded-md focus:ring-transparent" /><label htmlFor="safeAdress" className="block ml-2 text-sm text-gray-900">Adresse de facturation</label></div>
                        </div>
                        <div className="flex">
                            <div className="flex-1 py-5 pl-5 overflow-hidden">
                                <h1 className="inline text-2xl font-semibold leading-none">Adresse de facturation</h1>
                            </div>
                            <div className="flex-none pt-2.5 pr-2.5 pl-1" />
                        </div>
                        <div className="px-5 pb-5">
                            <input placeholder="Name" className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" /><input placeholder="Address" className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" />
                            <div className="flex">
                                <div className="flex-grow w-1/4 pr-2"><input placeholder="PLZ" className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" /></div>
                                <div className="flex-grow"><input placeholder="City" className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" /></div>
                            </div>
                        </div>
                        <hr className="mt-4" />
                        <div className="flex flex-row-reverse p-3">
                            <div className="flex-initial pl-3">
                                <button type="button" className="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out">
                                    <span className="pl-2 mx-1">Enregistrer</span>
                                </button>
                            </div>
                            <div className="flex-initial">
                                <button type="button" className="flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize rounded-md  hover:bg-red-200 hover:fill-current hover:text-red-600  focus:outline-none  transition duration-300 transform active:scale-95 ease-in-out">
                                    <span className="pl-2 mx-1">Annuler</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Fin du contenu du modal */}
                </BaseModal>
            }



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
