"use client";
import React, { useState } from "react";

import ProgressBar from "@/components/UI/ProgressBar";
import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Grid from '@mui/material/Grid'
import CustomInput from "@/components/UI/CustomInput";
import { Theme_A, ColorsThemeA } from "@/components/utilis/Themes"
import { CrossIcon } from "@/components/utilis/Icons";


const GoalsModal = () => {

    const [cards, setCards] = useState([
        // Initial cards data with 'clicked' state to track if it's disabled
        { title: 'Revenu Mensuel', objective: '', clicked: false },
        { title: 'Commandes d’habitués', objective: '', clicked: false },
        { title: 'Nouveaux clients', objective: '', clicked: false },
        { title: 'Nombre de visites en ligne', objective: '', clicked: false },
        { title: "Nombre max. d'annulation", objective: '', clicked: false },
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
        const card = cards[cardIndex];

        // Traitement spécial pour "Objectif Onehaircut"
        if (card.title === 'Objectif Onehaircut') {
            setCards(
                cards.map((c, i) => {
                    if (i === cardIndex) {
                        return { ...c, clicked: true };
                    }
                    return c;
                })
            );

            // Mise à jour de la barre de progression correspondante
            const unfilledIndex = progressBars.findIndex(bar => !bar.filled);
            if (unfilledIndex !== -1) {
                setProgressBars(
                    progressBars.map((bar, i) => {
                        if (i === unfilledIndex) {
                            return { ...bar, title: card.title, value: 100, number: 100, filled: true };
                        }
                        return bar;
                    })
                );
            }
            return; // Arrêter l'exécution pour cette carte
        }

        // Vérification pour les autres cartes
        if (!card.objective || isNaN(Number(card.objective))) {
            return; // Ne rien faire si l'objectif est vide ou non numérique
        }

        // Traitement pour les autres cartes (comme auparavant)
        const value = parseFloat(card.objective.replace(/[^\d.-]/g, ''));
        const unfilledIndex = progressBars.findIndex(bar => !bar.filled);
        if (unfilledIndex === -1) {
            return;
        }

        setProgressBars(
            progressBars.map((bar, index) => {
                if (index === unfilledIndex) {
                    return { ...bar, title: card.title, value, number: value, filled: true };
                }
                return bar;
            })
        );

        setCards(
            cards.map((c, i) => {
                if (i === cardIndex) {
                    return { ...c, clicked: true };
                }
                return c;
            })
        );
    };



    const handleObjectiveChange = (event: React.ChangeEvent<HTMLInputElement>, cardIndex: number) => {
        const updatedCards = cards.map((card, index) => {
            if (index === cardIndex && !card.clicked) {
                let newValue = event.target.value;

                // Limite pour la carte 'Note moyenne'
                if (card.title === 'Note moyenne') {
                    const numericValue = parseFloat(newValue);

                    // Permettre seulement un chiffre après la virgule
                    if (!/^\d{1,}(\.\d{0,1})?$/.test(newValue)) {
                        newValue = numericValue.toFixed(1); // Arrondir à un chiffre après la virgule
                    }

                    // Vérifier si la valeur est comprise entre 1 et 5
                    if (numericValue < 1 || numericValue > 5) {
                        newValue = ''; // Réinitialiser si hors limites
                    }
                } else if (card.title === 'Occupation du personnel') {
                    // Limite pour la carte 'Occupation du personnel' (valeur maximale de 100)
                    const numericValue = parseFloat(newValue);
                    if (numericValue > 100) {
                        newValue = '100'; // Réinitialiser à 100 si la valeur dépasse 100
                    }
                } else {
                    // Limite pour les autres cartes (maximum 6 chiffres)
                    if (newValue.length > 6) {
                        newValue = newValue.slice(0, 6); // Garder seulement les 6 premiers chiffres
                    }
                }

                return { ...card, objective: newValue };
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
                        <Grid key={index} item xs={3} style={{ marginTop: '8px' }}>
                            <div
                                key={index}
                                style={{
                                    width: '230px',
                                    height: '173px',
                                    // Appliquer un arrondi différent pour la carte 'Objectif Onehaircut'
                                    borderRadius: card.title === 'Objectif Onehaircut' ? '10px' : '10px',
                                    background: card.clicked ? '#E5E5E5' : '#FFFFFF',
                                    pointerEvents: card.clicked ? 'none' : 'auto',
                                    opacity: card.clicked ? 0.5 : 1,
                                    ...(card.title === 'Objectif Onehaircut' && {
                                        background: 'linear-gradient(45deg, #FFC107, #FF5722)'
                                    })
                                }}
                                className="max-w-xs w-full rounded-sm shadow-sm shadow-stone-600 p-2 cursor-pointer relative mb-4"
                            >
                                <h3
                                    className="text-xl font-medium text-center mb-4"
                                    style={{
                                        color: card.title === 'Objectif Onehaircut' ? '#FFFFFF' : 'text-gray-900'
                                    }}
                                >
                                    {card.title}
                                </h3>

                                <div className="absolute bottom-2 left-0 right-0 px-2 mr-4 ml-4">
                                    {/* Afficher l'objectif si la carte est cliquée */}
                                    {card.clicked && (
                                        <p className="text-lg font-semibold text-stone-800 text-center ">
                                            {card.title === 'Revenu Mensuel' ? `${card.objective} €` : card.objective}
                                        </p>
                                    )}

                                    {/* Conteneur pour l'input et le bouton */}
                                    {!card.clicked && (
                                        <>
                                            {card.title !== 'Objectif Onehaircut' && (
                                                <CustomInput
                                                    id="GoalsInput"
                                                    type="number"
                                                    label="Objectif"
                                                    value={card.objective}
                                                    onChange={(e) => handleObjectiveChange(e, index)}
                                                />
                                            )}

                                            {/* Espace réservé pour le bouton (toujours présent, mais le bouton peut être caché) */}
                                            <div className="flex justify-center mt-2" style={{ height: '20px' }}> {/* Hauteur du bouton */}
                                                {(card.objective || card.title === 'Objectif Onehaircut') && (
                                                    <button
                                                        className={`${Theme_A.button.smallBlackColoredButton}`}
                                                        onClick={() => handleCardClick(index)}
                                                    >
                                                        valider
                                                    </button>
                                                )}
                                            </div>
                                        </>
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

export default GoalsModal;
