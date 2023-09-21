import React from "react";
import { DownArrow } from "@/components/utilis/Icons";

interface SlotDropdown{
    selectedItem: string,
    disabled?: boolean,
    backgroundClr?: string
}

const SlotDropdown = ({selectedItem, disabled, backgroundClr }: SlotDropdown) => {
  return (
    <div>
      <div className={`relative flex items-center px-3 border w-28 h-9 md:w-36 md:h-11 rounded-md ${` ${disabled ? 'bg-[rgba(171,171,171,0.10)] cursor-default' : backgroundClr ? `${backgroundClr} cursor-pointer` : 'bg-white cursor-pointer'}`}`}>
        <p className="text-sm">{selectedItem}</p>
        <div className="absolute right-3">
          <DownArrow />
        </div>
      </div>

    </div>
  );
};

export default SlotDropdown;
