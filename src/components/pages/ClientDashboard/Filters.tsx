"use client";
import BaseDropdown from '@/components/UI/BaseDropdown';
import { CircleRight, LogoCircleFixRight, TickIcon } from '@/components/utilis/Icons';
import ClientDashboardLayout from '@/layout/ClientDashboardLayout'
import React, { useState } from 'react'
import StarRatings from "react-star-ratings";
import DropdownMenu from "@/components/UI/DropDownMenu";
import Slider from '@material-ui/core/Slider';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Theme_A } from '@/components/utilis/Themes';

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

    // For the Slider
    const theme = createTheme({
        palette: {
            primary: {
                main: '#3B3A3A',
            },
            secondary: {
                main: '#ec5657',
            },
        },
        overrides: {
            MuiSlider: {
                thumb: {
                    color: '#000000',
                    width: 14, // Set the desired width
                    height: 14, // Set the desired height
                    border: '3px solid #000000',
                    boxShadow: '0px 0px 0px 4px rgb(236, 86, 87, 0.1)',
                    backgroundColor: '#FFFF', // The interior color of the thumb
                    borderRadius: '50%',// This makes it a circle
                    '&:hover, &.Mui-focusVisible': {
                        /* Applies a sharp, translucent black halo shadow around the thumb. */
                        boxShadow: '0px 0px 0px 8px rgb(236, 86, 87, 0.5)',
                    },
                },
                track: {
                    height: '4px',  // Adjust for desired thickness
                    color: '#ec5657',
                    background: 'linear-gradient(90deg, red, orange)',
                },
                rail: {
                    color: '#000000', //colorForTheUnfilledPart
                    height: '4px',  // Adjust for desired thickness
                    borderRadius: '16px',
                },
                valueLabel: {
                    color: '#000000', // The color of the value label that appears on hover
                },
            },
        },
    });

    const handleSliderChange = (event: any, newValue: any) => {
        setSliderRange(newValue);
    };

    //For Dropdown lists
    const WishGender = [
        "Feminine",
        "Masculine",
        "Mixte",
    ];
    const WishLength = [
        "Court",
        "Moyen",
        "Long",
    ];



    // handling the change of Gender
    const handleNewWishGender = (item: string) => {
        // TODO: add backend to save the new preference
    }
    // handling the change of wishes length
    const handleNewWishLength = (item: string) => {
        // TODO: add backend to save the new preference
    }
    // handling the change of length
    const handleNewSetCurrentLength = (item: string) => {
        // TODO: add backend to save the new preference
    }

    const [currentLength, setCurrentLength] = useState('');
    const [desiredLength, setDesiredLength] = useState('');
    const [hairstyleTrend, setHairstyleTrend] = useState('');
    const [sliderRange, setSliderRange] = useState([0, 500]);

    const resetDropdowns = () => {
        setCurrentLength('');
        setDesiredLength('');
        setHairstyleTrend('');
        // Reset the slider value
        setSliderRange([0, 500]);
    };

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
                            <div className="relative z-10 w-full lg:w-[630px] mt-5 md:mt-0 rounded-3xl bg-white py-6 px- sm:px-10 shadow-[0px_13px_37px_0px_rgba(176,176,176,0.28)]">

                                {/* Title of the Section "Coiffure" */}
                                <p className="text-black text-lg mb-4 font-semibold">Coiffure</p>

                                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-6 md:gap-10 lg:gap-6 xl:gap-10">
                                    {/* First Column */}
                                    <div className="flex flex-col items-center">
                                        {/* Dropdown for "cheveux actuelle" */}
                                        <div className="flex items-center justify-center mb-2 mr-10"> {/* Increased horizontal spacing */}
                                            <p className="text-black text-sm mb-2 mr-10"></p>
                                            <DropdownMenu dropdownItems={WishLength} fctToCallOnClick={handleNewWishLength} menuName="cheveux actuelle" />
                                        </div>

                                        {/* Dropdown for "Longueur recherchée" */}
                                        <div className="flex items-center justify-center mb-2"> {/* Increased horizontal spacing */}
                                            <DropdownMenu dropdownItems={WishLength} fctToCallOnClick={handleNewSetCurrentLength} menuName="Longueur recherchée" />
                                        </div>
                                    </div>

                                    {/* Second Column */}
                                    <div className="flex flex-col items-center">
                                        {/* Dropdown for "Tendance de la coiffure" */}
                                        <div className="flex items-center justify-center mb-2"> {/* Increased horizontal spacing */}
                                            <DropdownMenu dropdownItems={WishGender} fctToCallOnClick={handleNewWishLength} menuName="Tendance de la coiffure" />
                                        </div>

                                        {/* Slider for budget */}
                                        <ThemeProvider theme={theme}>
                                            <div className="relative z-20 w-full">
                                                <p className="text-black text-md mb-2 font-md text-center">Budget</p>
                                                <div className="flex flex-col items-center justify-center">
                                                    <Typography id="range-slider" gutterBottom></Typography>
                                                    <Slider
                                                        value={sliderRange}
                                                        onChange={handleSliderChange}
                                                        valueLabelDisplay="auto"
                                                        min={0}
                                                        max={500}
                                                        style={{ width: '90%' }}
                                                    />
                                                    <div className="mt-2 text-center"> {/* Increased horizontal spacing */}
                                                        &#91;
                                                        <span style={{ fontSize: '0.8em', fontWeight: '500', color: '#757575' }}>
                                                            {sliderRange[0]}€ &#8211; {sliderRange[1]}€
                                                        </span>
                                                        &#93;
                                                    </div>
                                                </div>
                                            </div>
                                        </ThemeProvider>
                                    </div>
                                </div>

                                {/* Centered "Réinitialiser" button */}
                                <div className="flex justify-center mt-4">
                                    <button className={`${Theme_A.button.medBlackColoredButton}`}>Réinitialiser</button>
                                </div>
                                {/* Title of the Section coiffure */}
                                {/*
                                    <p className='text-black text-lg mb-4 font-semibold mt-4'>Popularit&eacute;</p>
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
                                    */}
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
                                <button className={`absolute bottom-6 left-12  ${Theme_A.button.medBlackColoredButton}`}>Réinitialiser</button>

                            </div>
                        }
                    </div>
                </div>
            </ClientDashboardLayout >
        </div >
    )
}
export default Filters
