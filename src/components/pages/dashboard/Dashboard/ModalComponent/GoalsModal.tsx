"use client";
import React, { useState } from "react";

import ProgressBar from "@/components/UI/ProgressBar";
import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Grid from '@mui/material/Grid'
import CustomInput from "@/components/UI/CustomInput";
import { Theme_A, ColorsThemeA } from "@/components/utilis/Themes"
import { CrossIcon } from "@/components/utilis/Icons";


const StaffModal = () => {

    const [cards, setCards] = useState([
        // Initial cards data with 'clicked' state to track if it's disabled
        { title: 'Revenu Mensuel', objective: '', clicked: false },
        { title: 'Commandes d’habitués', objective: '', clicked: false },
        { title: 'Nouveaux clients', objective: '', clicked: false },
        { title: 'Nombre de visites en ligne', objective: '', clicked: false },
        { title: 'Nombre max', objective: '', clicked: false },
        { title: 'Note moyenne', objective: '', clicked: false },
        { title: 'Occupation du personnel', objective: '', clicked: false },
        { title: 'Objectif Onehaircut', objective: '', clicked: false },
    ]);


    const [progressBars, setProgressBars] = useState([
        // Assuming 'number' is also a required field, set it initially to a default value like 0 or any start point
        { title: 'Aucun objectif', value: 0, number: 0, color: '#FE2569', filled: false },
        { title: 'Aucun objectif', value: 0, number: 0, color: '#0FBFF1', filled: false },
        { title: 'Aucun objectif', value: 0, number: 0, color: '#7ABF50', filled: false },
        { title: 'Aucun objectif', value: 0, number: 0, color: '#ffc866', filled: false },
        // ... more bars
    ]);

    const handleCloseClick = (index: number) => {
        // Define the original colors for each progress bar index
        const originalColors = ['#FE2569', '#0FBFF1', '#7ABF50', '#ffc866']; // Add more if you have more bars

        // Update the progressBars state to reset the value and color of the specific progress bar
        const newProgressBars = progressBars.map((bar, i) => {
            if (i === index) {
                // Reset value and color for the progress bar that has the close button clicked
                return { ...bar, title: 'Aucun objectif', value: 0, number: 0, color: originalColors[i], filled: false }; // Reset to original color
            }

            return bar;
        });
        setProgressBars(newProgressBars);

        // Also update the 'clicked' state of the corresponding card to re-enable it
        const newCards = cards.map((card, i) => {
            if (progressBars[index].title === card.title) {
                return { ...card, clicked: false }; // Re-enable the card by resetting 'clicked' to false
            }

            return card;
        });
        setCards(newCards);
    };



    // State to track which card is selected
    const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

    // Handles the click on a discount card
    const handleCardClick = (cardIndex: number) => {

        // Extract the number from the clicked card's objective
        const card = cards[cardIndex];
        if (!card.objective || isNaN(Number(card.objective))) {
            // Ne rien faire si l'objectif est vide ou non numérique
            return;
        }
        // Find the first unfilled progress bar
        const unfilledIndex = progressBars.findIndex(bar => !bar.filled);
        // If there's no unfilled progress bar, do nothing
        if (unfilledIndex === -1) {
            return;
        }

        const value = parseFloat(card.objective.replace(/[^\d.-]/g, '')); // Extract number from objective

        // Update the corresponding progress bar with the card's details
        setProgressBars(
            progressBars.map((bar, index) => {
                if (index === unfilledIndex) {
                    // Keep the color as initialized for the progress bar
                    return { ...bar, title: card.title, value, number: value, filled: true };
                }

                return bar;
            })
        );

        // Mark the card as clicked
        setCards(
            cards.map((c, index) => {
                if (index === cardIndex) {
                    return { ...c, clicked: true };
                }

                return c;
            })
        );
    };



    const handleObjectiveChange = (event: React.ChangeEvent<HTMLInputElement>, cardIndex: number) => {
        const updatedCards = cards.map((card, index) => {
            if (index === cardIndex && !card.clicked) {
                return { ...card, objective: event.target.value };
            }

            return card;
        });
        setCards(updatedCards);
    };

    return (
        <div className="justify-center items-center" style={{ width: '100%' }}> {/* Ajustez la largeur ici */}
            <div className=''>
                <p className="text-neutral-500 font-semibold text-2xl text-center">
                    Définissez vos objectifs
                </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 flex-grow mb-7 mt-12"

            >
                <Grid container spacing={0}>
                    {progressBars.map((bar, index) => (
                        // eslint-disable-next-line react/jsx-key
                        <Grid item xs={3}>
                            <div
                                key={index}
                                className="relative" // This allows for absolute positioning of children
                                style={{
                                    width: '230px', // Set your desired width
                                    // ... other styles, ensure position is not overridden
                                }}
                            >
                                <ProgressBar
                                    value={bar.value}
                                    name={bar.title}
                                    number={bar.number}
                                    rotation={0.25}
                                    color={bar.color}
                                />
                                {/* Position Icon with absolute positioning */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0, // Align to top
                                    right: 0, // Align to right
                                    transform: 'translate(-50%, 50%)', // Adjust the position accordingly
                                }}>
                                    <div
                                        className={`absolute -top-5 right-0 sm:-right-2 z-50 flex items-center justify-center w-12 h-12 scale-75 text-darkBlue font-semibold cursor-pointer rounded-xl shadow-md 
                                    ${ColorsThemeA.ohcVerticalGradient_A} transform transition-transform duration-300 hover:scale-50`}
                                        onClick={() => handleCloseClick(index)} >
                                        <CrossIcon />
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    ))}
                </Grid>

            </div>

            <div className="flex flex-wrap items-center justify-center gap-10 flex-grow mb-2">
                <Grid container spacing={0}>
                    {cards.map((card, index) => (
                        <Grid item xs={3} style={{ marginTop: '8px' }}>
                            <div
                                key={index}
                                style={{
                                    width: '230px',
                                    height: '173px',
                                    borderRadius: '10px',
                                    background: card.clicked ? '#E5E5E5' : '#FFFFFF',
                                    pointerEvents: card.clicked ? 'none' : 'auto',
                                    opacity: card.clicked ? 0.5 : 1,
                                }}
                                className="max-w-xs w-full rounded-sm shadow-sm shadow-stone-600 p-2 cursor-pointer relative mb-4"
                            >
                                <h3 className="text-gray-900 text-xl font-medium text-center mb-4">{card.title}</h3>

                                {/* Conteneur pour l'input et le bouton avec positionnement absolu */}
                                <div className="absolute bottom-2 left-0 right-0 px-2 mr-4 ml-4">
                                    {!card.clicked ? (
                                        <CustomInput
                                            id="GoalsInput"
                                            type="number"
                                            label="Objectif"
                                            value={card.objective}
                                            onChange={(e) => handleObjectiveChange(e, index)}
                                        />
                                    ) : (
                                        <p className="text-lg font-semibold text-stone-800 text-center ">{"Aucun objectif"}</p>
                                    )}

                                    {/* Afficher le bouton uniquement si l'input contient une valeur */}
                                    {card.objective ? (
                                        <div className="flex justify-center mt-2">
                                            <button
                                                className={`${Theme_A.button.smallBlackColoredButton}`}
                                                onClick={() => handleCardClick(index)}
                                            >
                                                valider
                                            </button>
                                        </div>
                                    ) : (
                                        // Élément fictif pour garder l'espace
                                        <div className="mt-2" style={{ height: '20px' }}></div>
                                    )}
                                </div>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </div>





        </div>

    );
};

export default StaffModal;
