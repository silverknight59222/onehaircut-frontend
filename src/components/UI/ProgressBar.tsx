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

    const TooltipOverlay = ({ value, name, number }: { value?: number, name: string, number?: number }) => {
        return (
            <div
                className="tooltip-style"
                style={{
                    position: 'absolute',
                    top: '50%', // Centers vertically
                    left: '100%', // Moves the tooltip to the right of the bar
                    transform: 'translateY(-50%)', // Centers vertically with respect to the bar
                    marginLeft: '8px', // Adjust this value to move the tooltip right from the progress bar
                    padding: '6px 8px',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    border: '1px solid #dddddd',
                    boxShadow: '0px 0px 5px #aaaaaa',
                    whiteSpace: 'nowrap',
                    zIndex: 1000, // Make sure it's on top of other elements
                }}
            >
                <Typography variant="caption" display="block" gutterBottom>
                    {name}
                </Typography>
                <Typography variant="body2" display="block">
                    {value ? `${value}%` : 'N/A'}
                </Typography>
                {number && <Typography variant="body2" display="block">{number}</Typography>}
            </div>
        );
    };




    return (
        <div
            className="w-56 lg:w-52 transform transition-transform duration-300 hover:scale-105"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            title={isHovered && value ? `${value}%` : ""}
        >
            <CircularProgressbarWithChildren
                value={value ? value : 0}
                strokeWidth={12}
                styles={buildStyles({
                    rotation: rotation,
                    strokeLinecap: "round",
                    pathTransitionDuration: 0.5,
                    pathColor: isHovered && color ? darkenColor(color) : color,
                    trailColor: "#FFEDE4",
                })}
            >
                <p className="font-semibold text-[#656565] text-center w-28 text-md lg:font-normal mt-2 hover:text-black">{name}</p>
                <p className="2xl:text-lg lg:w-20 lg:text-sm lg:font-normal font-semibold text-black hover:text-gray-600 text-center">{number ? `${number} %` : '-'}</p>
            </CircularProgressbarWithChildren>
            {/*{isHovered && <TooltipOverlay value={value} name={name} number={number} />}*/}
        </div>
    );
};

export default ProgressBar;
