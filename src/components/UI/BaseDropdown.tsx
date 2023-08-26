import React from "react";
import { DownArrow } from "../utilis/Icons";

interface BaseDropdown{
    dropdownItems?: string[],
    width?: string,
    height?: string,
    rounded?: string,
    borderClr?: string,
    disabled?: boolean,
    backgroundClr?: string
}

const BaseDropdown = ({dropdownItems, width, height, rounded, borderClr, disabled, backgroundClr }: BaseDropdown) => {
  return (
    <div>
      <div className={`relative flex items-center px-3 border ${`${ width ? width : 'w-36'} ${rounded ? rounded : 'rounded-md'} ${ height ? height : 'h-8'} ${ borderClr ? borderClr : 'border-black'} ${disabled ? 'bg-[rgba(171,171,171,0.10)] cursor-default' : backgroundClr ? `${backgroundClr} cursor-pointer` : 'bg-white cursor-pointer'}`}`}>
        <p className="text-sm">{dropdownItems && dropdownItems[0]}</p>
        <div className="absolute right-3">
          <DownArrow />
        </div>
      </div>
    </div>
  );
};

export default BaseDropdown;
