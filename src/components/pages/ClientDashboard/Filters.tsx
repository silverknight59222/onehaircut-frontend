"use client";
import BaseDropdown from '@/components/UI/BaseDropdown';
import { CircleRight, LogoCircleFixRight, TickIcon } from '@/components/utilis/Icons';
import ClientDashboardLayout from '@/layout/ClientDashboardLayout'
import React, { useState } from 'react'
import StarRatings from "react-star-ratings";
import DropdownMenu from "@/components/UI/DropDownMenu";

const Filters = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedItems, setSelectedItems] = useState<String[]>(['Geolocalisation', 'Utilisation de produits particuliers', 'Matinée', 'Après-Midi', 'Soirée', 'Couleur'])
    const items = [
        "Recherche Coiffure",
        "Recherche Salon ",
    ];
    const onSelectTab = (index: number) => {
        setSelectedTab(index);
    };

    const checkboxClickHandler = (value: string) => {
        if (selectedItems.includes(value)) {
            const tempArray = [...selectedItems];
            const index = tempArray.indexOf(value);
            tempArray.splice(index, 1);
            setSelectedItems(() => tempArray);
        } else {
            setSelectedItems((prevState) => [...prevState, value]);

        }
    };


    const WishGender = [
        "Femme",
        "Homme",
        "Mixte",]
    const WishLength = [
        "Court",
        "Moyen",
        "Long",]

    // handling the change of Gender
    const handleNewGender = (item: string) => {
        // TODO: add backend to save the new preference
    }
    // handling the change of length
    const handleNewLength = (item: string) => {
        // TODO: add backend to save the new preference
    }


    return (
        <div>
            <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 z-10">
                <LogoCircleFixRight />
            </div>
            <ClientDashboardLayout>
                <div className="mt-14 mb-5 px-5 sm:px-10">
                    <p className="text-black font-medium text-3xl text-center">
                        Gestion du compte
                    </p>
                    <div className="flex flex-col lg:flex-row items-start justify-center gap-10 2xl:gap-20 mt-10">
                        <div className="w-full lg:w-auto flex flex-col items-center justify-center gap-6">
                            {items.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => onSelectTab(index)}
                                        className={`flex items-center justify-center w-full lg:w-80 xl:w-96 h-16 bg-white rounded-2xl text-black shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)] border cursor-pointer ${selectedTab === index && "border-secondary"
                                            }`}
                                    >
                                        {item}
                                    </div>
                                );
                            })}
                        </div>
                        {selectedTab === 0 ?
                            <div className="relative z-10 w-full lg:w-[630px] h-[630px] sm:h-[590px] mt-5 md:mt-0 rounded-3xl bg-white py-6 px-6 sm:px-10 shadow-[0px_13px_37px_0px_rgba(176,176,176,0.28)]">

                                {/* Separator Color */}
                                <div className='border-b border-[#D8D8D8] pb-12'>

                                    {/* Title of the Section COIFFURE */}
                                    <p className='text-black text-lg mb-4 font-semibold'>Coiffure</p>
                                    <div>
                                        {/* Dropdown longueur coiffure*/}
                                        <p className="text-black text-sm mb-2"></p>
                                        <DropdownMenu dropdownItems={WishLength}
                                            fctToCallOnClick={handleNewLength} menuName="Longueur cheveux" />
                                    </div>
                                    <div className='flex flex-col sm:flex-row lg:flex-col xl:flex-row sm:items-center lg:items-start xl:items-center sm:justify-between mt-5'>
                                        <div>
                                            <p className="text-black text-sm mb-2">Tendance de la coiffure</p>
                                            <BaseDropdown dropdownItems={['Feminine']} />
                                        </div>
                                        <div className='flex items-center justify-start sm:justify-center gap-6 mt-5 sm:mt-0 lg:mt-5 xl:mt-0'>
                                            <div>
                                                <p className="text-black text-sm mb-2">Couleur</p>
                                                <div className='flex items-center gap-4'>
                                                    <div onClick={() => checkboxClickHandler('Couleur')} className={`w-6 h-6 flex items-center justify-center cursor-pointer border border-black rounded ${selectedItems.includes('Couleur') ? 'bg-black' : 'bg-white'}`}>
                                                        <TickIcon />
                                                    </div>
                                                    <BaseDropdown dropdownItems={['Blond']} width='w-24' />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-black text-sm mb-2">Longueur</p>
                                                <div className='flex items-center gap-4'>
                                                    <div onClick={() => checkboxClickHandler('Longueur')} className={`w-6 h-6 flex items-center justify-center cursor-pointer border border-black rounded ${selectedItems.includes('Longueur') ? 'bg-black' : 'bg-white'}`}>
                                                        <TickIcon />
                                                    </div>
                                                    <BaseDropdown dropdownItems={['Moyen']} width='w-24' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className='text-black text-lg my-3'>Popularité</p>
                                    <div className='flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-start xl:items-center justify-between'>
                                        <div>
                                            <p className='text-black text-sm'>Minimum</p>
                                            <div className='flex items-center gap-4'>
                                                <StarRatings
                                                    rating={3.5}
                                                    starRatedColor="#FEDF10"
                                                    starSpacing="4px"
                                                    starDimension="15px"
                                                    numberOfStars={5}
                                                    name="rating"
                                                />
                                                <p className='text-black text-sm'>3.5 / 5</p>
                                            </div>
                                        </div>
                                        <div className='mt-5 sm:mt-0 lg:mt-5 xl:mt-0'>
                                            <p className='text-black text-sm'>Maximum</p>
                                            <div className='flex items-center gap-4'>
                                                <StarRatings
                                                    rating={4.5}
                                                    starRatedColor="#FEDF10"
                                                    starSpacing="4px"
                                                    starDimension="15px"
                                                    numberOfStars={5}
                                                    name="rating"
                                                />
                                                <p className='text-black text-sm'>4.5 / 5</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className='absolute bottom-6 left-12 w-28 h-11 border border-black rounded-2xl text-sm text-black shadow-[3px_3px_10px_2px_rgba(0,0,0,0.07)]'>Réinitialiser</button>
                            </div>
                            :
                            <div className="relative z-10 w-full lg:w-[500px] xl:w-[630px] h-[1100px] sm:h-[890px] lg:h-[1100px] xl:h-[890px] mt-5 md:mt-0 rounded-3xl bg-white py-6 px-6 sm:px-10 shadow-[0px_13px_37px_0px_rgba(176,176,176,0.28)]">
                                <div>
                                    <p className='text-black text-lg mb-4'>Localisation</p>
                                    <div className='flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-24 lg:flex-col xl:flex-row lg:items-start xl:items-center lg:gap-5 xl:gap-24'>
                                        <div>
                                            <p className="text-black text-sm mb-2">Pays</p>
                                            <BaseDropdown dropdownItems={['Suisse']} width='w-52' borderClr='border-secondary' />
                                        </div>
                                        <div>
                                            <p className="text-black text-sm mb-2">à domicile </p>
                                            <div onClick={() => checkboxClickHandler('à domicile')} className={`w-6 h-6 flex items-center justify-center cursor-pointer border border-black rounded ${selectedItems.includes('à domicile') ? 'bg-black' : 'bg-white'}`}>
                                                <TickIcon />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-24 lg:flex-col xl:flex-row lg:items-start xl:items-center lg:gap-5 xl:gap-24 mt-6 sm:mt-3'>
                                        <div>
                                            <p className="text-black text-sm mb-2">Code postal</p>
                                            <div className='flex items-center justify-center w-52 h-8 rounded-md shadow-inner'>1033</div>
                                        </div>
                                        <div>
                                            <p className="text-black text-sm mb-2">Geolocalisation</p>
                                            <div onClick={() => checkboxClickHandler('Geolocalisation')} className={`w-6 h-6 flex items-center justify-center cursor-pointer border border-black rounded ${selectedItems.includes('Geolocalisation') ? 'bg-black' : 'bg-white'}`}>
                                                <TickIcon />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className='text-black text-lg mb-4 border-t mt-5 border-[#D8D8D8] pt-4'>Produits</p>
                                    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-24 lg:flex-col xl:flex-row lg:items-start xl:items-center lg:gap-5 xl:gap-24'>
                                        <div>
                                            <p className="text-black text-sm mb-2">Utilisation de produits particuliers</p>
                                            <div onClick={() => checkboxClickHandler('Utilisation de produits particuliers')} className={`w-6 h-6 flex items-center justify-center cursor-pointer border border-black rounded ${selectedItems.includes('Utilisation de produits particuliers') ? 'bg-black' : 'bg-white'}`}>
                                                <TickIcon />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-black text-sm mb-2">Particularité du produit</p>
                                            <BaseDropdown dropdownItems={['Choix multiples']} width='w-52' borderClr='border-secondary' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-24 lg:flex-col xl:flex-row lg:items-start xl:items-center lg:gap-5 xl:gap-24 mt-3'>
                                        <div className='w-52' />
                                        <div>
                                            <p className="text-black text-sm mb-2">Marques</p>
                                            <BaseDropdown dropdownItems={['Choix multiples']} width='w-52' borderClr='border-secondary' />
                                        </div>
                                    </div>
                                </div>
                                <div className='border-y border-[#D8D8D8] py-4 mt-5'>
                                    <p className='text-black text-lg my-3'>Classement</p>
                                    <div className='flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-start xl:items-center justify-between'>
                                        <div>
                                            <p className='text-black text-sm'>Minimum</p>
                                            <div className='flex items-center gap-4'>
                                                <StarRatings
                                                    rating={3.5}
                                                    starRatedColor="#FEDF10"
                                                    starSpacing="4px"
                                                    starDimension="15px"
                                                    numberOfStars={5}
                                                    name="rating"
                                                />
                                                <p className='text-black text-sm'>3.5 / 5</p>
                                            </div>
                                        </div>
                                        <div className='mt-5 sm:mt-0 lg:mt-5 xl:mt-0'>
                                            <p className='text-black text-sm'>Maximum</p>
                                            <div className='flex items-center gap-4'>
                                                <StarRatings
                                                    rating={4.5}
                                                    starRatedColor="#FEDF10"
                                                    starSpacing="4px"
                                                    starDimension="15px"
                                                    numberOfStars={5}
                                                    name="rating"
                                                />
                                                <p className='text-black text-sm'>4.5 / 5</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className='text-black text-lg mt-5 mb-3'>Disponibilité</p>
                                    <div className='flex items-center lg:justify-center gap-10 sm:gap-40 lg:gap-20 xl:gap-40'>
                                        <div className='flex flex-col items-center justify-center'>
                                            <p className="text-black text-sm mb-2">Matinée</p>
                                            <div onClick={() => checkboxClickHandler('Matinée')} className={`w-6 h-6 flex items-center justify-center cursor-pointer border border-black rounded ${selectedItems.includes('Matinée') ? 'bg-black' : 'bg-white'}`}>
                                                <TickIcon />
                                            </div>
                                        </div>
                                        <div className='flex flex-col items-center justify-center'>
                                            <p className="text-black text-sm mb-2">Après-Midi</p>
                                            <div onClick={() => checkboxClickHandler('Après-Midi')} className={`w-6 h-6 flex items-center justify-center cursor-pointer border border-black rounded ${selectedItems.includes('Après-Midi') ? 'bg-black' : 'bg-white'}`}>
                                                <TickIcon />
                                            </div>
                                        </div>
                                        <div className='flex flex-col items-center justify-center'>
                                            <p className="text-black text-sm mb-2">Soirée</p>
                                            <div onClick={() => checkboxClickHandler('Soirée')} className={`w-6 h-6 flex items-center justify-center cursor-pointer border border-black rounded ${selectedItems.includes('Soirée') ? 'bg-black' : 'bg-white'}`}>
                                                <TickIcon />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className='absolute bottom-6 left-12 w-28 h-11 border border-black rounded-2xl text-sm text-black shadow-[3px_3px_10px_2px_rgba(0,0,0,0.07)]'>Réinitialiser</button>
                            </div>
                        }
                    </div>
                </div>
            </ClientDashboardLayout>
        </div>
    )
}

export default Filters
