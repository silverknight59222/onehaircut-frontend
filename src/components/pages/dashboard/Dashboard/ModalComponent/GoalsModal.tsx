"use client";
import React, { useState } from "react";

import ProgressBar from "@/components/UI/ProgressBar";
import {styled} from "@mui/material/styles";
import IconButton, {IconButtonProps} from "@mui/material/IconButton";
import Grid from '@mui/material/Grid'
import Icon from "@/@core/components/icon";

const CustomCloseButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
    top: 0,
    right: 0,
    color: theme.palette.common.white, // Set icon color to white
    position: 'absolute',
    boxShadow: theme.shadows[2],
    transform: 'translate(10px, -10px)',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: `${theme.palette.error.main} !important`, // Set background to red
    transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
    '&:hover': {
        backgroundColor: theme.palette.error.dark, // Optionally change the hover color to a darker red
        color: theme.palette.common.white
    }
}));







const StaffModal = () => {

    const data = [
        { name: 'Jason', value: 17, color: '#4184f3' }, // Blue
        { name: 'Melinda', value: 20, color: '#ff6262' }, // Red
        { name: 'Karim', value: 18, color: '#50be87' }, // Green
        { name: 'Dyone', value: 23, color: '#ffce5a' }, // Yellow
        { name: 'Deborah', value: 13, color: '#6070db' }, // Dark Blue
        { name: 'Daniel', value: 9, color: '#db7c00' }, // Orange
    ];

    const revenueCards = [
        { title: 'Revenu Mensuel', objective: '42.000 €' },
        { title: 'Commandesd’ habitué', objective: '35.000 €' },
        { title: 'Nouveaux clients', objective: '50.000 €' },
        { title: 'Nombre de visites en ligne', objective: '10.000 €' },
        { title: 'Nombre max ', objective: '18.00 €' },
        { title: 'Note moyenne', objective: '19.00 €' },
        { title: 'Occupation du personnel', objective: '12.00 €' },
        { title: 'Objectif one haircut', objective: '7.00 €' },
    ];

  const [cards, setCards] = useState([
    // Initial cards data with 'clicked' state to track if it's disabled
    { title: 'Revenu Mensuel', objective: '42.000 €', clicked: false },
    { title: 'Commandesd’ habitué', objective: '35.000 €', clicked: false },
    { title: 'Nouveaux clients', objective: '35.000 €', clicked: false },
    { title: 'Nombre de visites en ligne', objective: '35.000 €', clicked: false },
    { title: 'Nombre max', objective: '35.000 €', clicked: false },
    { title: 'Note moyenne', objective: '35.000 €', clicked: false },
    { title: 'Occupation du personnel', objective: '35.000 €', clicked: false },
    { title: 'Objectif one haircut', objective: '35.000 €', clicked: false },
  ]);


    const [progressBars, setProgressBars] = useState([
        // Assuming 'number' is also a required field, set it initially to a default value like 0 or any start point
        { title: 'Revenu Mensuel', value: 0, number: 0, color: '#FE2569', filled: false },
        { title: 'Commandesd’ habitué', value: 0, number: 0, color: '#0FBFF1', filled: false },
        { title: 'Nouveaux clients', value: 0, number: 0, color: '#7ABF50', filled: false },
        { title: 'Nombre de visites en ligne', value: 0, number: 0, color: '#15BAF2', filled: false },
        // ... more bars
    ]);

    const handleCloseClick = (index: number) => {
        // Update the progressBars state to reset the value and color of the specific progress bar
        const newProgressBars = progressBars.map((bar, i) => {
            if (i === index) {
                // Reset value and color for the progress bar that has the close button clicked
                return { ...bar, value: 0, number: 0, color: '#ccc', filled: false }; // Set a default color or keep it empty
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
// Handles the click on a discount card
// Handles the click on a discount card
    const handleCardClick = (cardIndex: number) => {
        // Find the first unfilled progress bar
        const unfilledIndex = progressBars.findIndex(bar => !bar.filled);
        // If there's no unfilled progress bar, do nothing
        if (unfilledIndex === -1) {
            return;
        }

        // Extract the number from the clicked card's objective
        const card = cards[cardIndex];
        const value = parseFloat(card.objective.replace(/[^\d.-]/g, '')); // Extract number from objective

        // Update the corresponding progress bar with the card's details
        setProgressBars(
            progressBars.map((bar, index) => {
                if (index === unfilledIndex) {
                    // Use the card's color if available, otherwise generate a random color
                    const color = bar.color || `#${Math.floor(Math.random()*16777215).toString(16)}`;

return { ...bar, title: card.title, value, number: value, color, filled: true };
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

    // Prevents the click event from propagating to the card when clicking on the input
    const handleInputClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        event.stopPropagation();
    };


    return (
        <div>
            <div className='mb-6'>
                <p className="text-neutral-500 font-semibold text-2xl text-center">
                    Vos objectifs
                </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-10 flex-grow mb-7"

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
                            // Add any additional styles if necessary
                        }}>
                            <Icon icon='tabler:x' fontSize='1.25rem'
                                  style={{ background: '#FF2968',
                                      cursor: 'pointer',
                                      width:'31px',
                                      height: '33px',
                                      borderRadius: '11px',
                            }}
                                  onClick={() => handleCloseClick(index)}/>
                        </div>
                    </div>
                    </Grid>
                ))}
              </Grid>

            </div>
            <div className="flex flex-wrap items-center justify-center gap-10 flex-grow mb-7">
                <Grid container spacing={0}>
                {cards.map((card, index) => (
                    // eslint-disable-next-line react/jsx-key
                    <Grid item xs={3} style={{marginTop: '8px'}}>
                    <div
                        key={index}
                        style={{
                            width: '230px',
                            height: '173px',
                            borderRadius: '37px',
                            background: card.clicked ? '#E5E5E5' : '#FFFFFF',
                            pointerEvents: card.clicked ? 'none' : 'auto',
                            opacity: card.clicked ? 0.5 : 1,
                        }}
                        className="max-w-xs w-full rounded-xl shadow-md p-6 cursor-pointer relative"
                        onClick={() => handleCardClick(index)}
                    >
                        <h3 className="text-gray-900 text-xl font-medium mb-2">{card.title}</h3>
                        <p className="text-gray-500 text-sm mb-3">Objectif</p>
                        {!card.clicked ? (
                            <input
                                type="text"
                                value={card.objective}
                                onChange={(e) => handleObjectiveChange(e, index)}
                                onClick={handleInputClick}
                                className="text-lg font-semibold text-gray-900 bg-transparent border-none focus:outline-none"                            />
                        ) : (
                            <p className="text-lg font-semibold text-gray-900">{card.objective}</p>
                        )}
                    </div>
                    </Grid>
                ))}
                </Grid>
            </div>

        </div>

    );
};

export default StaffModal;
