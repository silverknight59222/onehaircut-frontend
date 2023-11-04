import React, { useState } from "react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import { Typography } from '@mui/material';


interface ProgressBar {
    value?: number;
    name: string;
    number?: number;
    color?: string;
    rotation: number;
}

const ProgressBar = ({ value, name, number, color, rotation }: ProgressBar) => {
    const [isHovered, setIsHovered] = useState(false);

    // Function to darken the color by a factor (20% in this case)
    const darkenColor = (color: string, factor = 0.2) => {
        const r = Math.round(Math.min(255, parseInt(color.slice(1, 3), 16) * (1 - factor)));
        const g = Math.round(Math.min(255, parseInt(color.slice(3, 5), 16) * (1 - factor)));
        const b = Math.round(Math.min(255, parseInt(color.slice(5, 7), 16) * (1 - factor)));

return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    const TooltipOverlay = ({ value, name, number }: { value?: number, name: string, number?: number }) => (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="text-center p-4 rounded shadow-lg text-white">
                <Typography variant="h6" component="div">{name}</Typography>
                <Typography variant="body1" component="div">{value ? `${value}%` : 'N/A'}</Typography>
            </div>
        </div>
    );


    return (
        <div
            className="w-48 sm:w-44 transform transition-transform duration-300 hover:scale-105"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            title={isHovered && value ? `${value}%` : ""}
        >
            <CircularProgressbarWithChildren
                value={value ? value : 0}
                strokeWidth={14}
                styles={buildStyles({
                    rotation: rotation,
                    strokeLinecap: "round",
                    pathTransitionDuration: 0.5,
                    pathColor: isHovered && color ? darkenColor(color) : color,
                    trailColor: "#FFEDE4",
                })}
            >
                <p className="font-semibold text-[#656565] text-center w-32 mt-2 hover:text-black">{name}</p>
                <p className="text-3xl font-semibold text-black hover:text-gray-600">{number ? number : '-'}</p>
            </CircularProgressbarWithChildren>
            {isHovered && <TooltipOverlay value={value} name={name} number={number} />}
        </div>
    );
};

export default ProgressBar;
