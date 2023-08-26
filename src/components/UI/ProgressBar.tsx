import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

interface ProgressBar{
    value?: number,
    name: string,
    number?: number,
    color?: string,
    rotation: number
}

const ProgressBar = ({value, name, number, color, rotation}: ProgressBar) => {
  return (
    <div className="w-48 sm:w-44">
      <CircularProgressbarWithChildren
        value={value ? value : 0}
        strokeWidth={14}
        styles={buildStyles({
          rotation: rotation,
          strokeLinecap: "round",
          pathTransitionDuration: 0.5,
          pathColor: color,
          trailColor: "#FFEDE4",
        })}
      >
        <p className="font-semibold text-[#656565] text-center w-32 mt-2">{name}</p>
        <p className="text-3xl font-semibold text-black">{number ? number : '-'}</p>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default ProgressBar;
