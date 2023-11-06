"use client";
import React, { useState } from "react";

import ProgressBar from "@/components/UI/ProgressBar";
import {styled} from "@mui/material/styles";
import IconButton, {IconButtonProps} from "@mui/material/IconButton";

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

    const [progressBars, setProgressBars] = useState([
        { value: 61, name: "Revenu Mensuel", number: 27, color: "#FE2569" },
        { value: 73, name: "Commandesd’ habitué", number: 47, color: "#0FBFF1" },
        { value: 50, name: "Nouveaux clients", number: 31, color: "#7ABF50" },
        { value: 0, name: "Nombre de visites en ligne", number: 0, color: "#15BAF2" },
    ]);

    // State to track which card is selected
    const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);

    const handleCardClick = (card: { title: string; objective: string }, index: number) => {
        setSelectedCardIndex(index);
        // Now we have access to `card.title` and `card.objective` here
        const updatedProgressBars = progressBars.map((bar) => {
            if (bar.name === card.title) {
                // Update the values for the clicked card's corresponding progress bar
                const objectiveNumber = parseFloat(card.objective.replace(/[^\d.-]/g, ''));

return { ...bar, number: objectiveNumber };
            }

return bar;
        });

        // Update the state with the new progress bars array
        setProgressBars(updatedProgressBars);
    };

    return (
        <div>
            <div className='mb-6'>
                <p className="text-neutral-500 font-semibold text-2xl text-center">
                    Vos objectifs
                </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-10 flex-grow mb-7">
                {progressBars.map((bar, index) => (
                    <ProgressBar
                        key={index}
                        value={bar.value}
                        name={bar.name}
                        number={bar.number}
                        rotation={0.25}
                        color={bar.color}
                    />
                ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-10 flex-grow mb-7">
                {revenueCards.map((card, index) => (
                    <div
                        style={{
                            width: '230px',
                            height: '173px',
                            borderRadius: '37px',
                            background: selectedCardIndex === index ? '#E5E5E5' : '#FFFFFF',
                        }}
                        key={index}
                        className="max-w-xs w-full rounded-xl shadow-md p-6 cursor-pointer"
                        onClick={() => handleCardClick(card, index)}
                    >
                        <h3 className="text-gray-900 text-xl font-medium mb-2">{card.title}</h3>
                        <p className="text-gray-500 text-sm mb-3">Objectif</p>
                        <p className="text-lg font-semibold text-gray-900">{card.objective}</p>
                    </div>
                ))}
            </div>

        </div>

    );
};

export default StaffModal;
