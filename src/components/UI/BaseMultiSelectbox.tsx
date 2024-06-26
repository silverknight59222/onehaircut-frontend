import React, { useEffect, useRef, useState } from 'react'
import { CheckedIcon, DownArrow } from '../utilis/Icons';
import { ColorsThemeA } from '../utilis/Themes';

interface dropdown {
    name: string
}

export type BaseDropdown = {
    dropdownItems: dropdown[];
    dropdownTitle: string;
    getActiveFilters?: (value: string) => void;
}

const BaseMultiSelectbox = ({ getActiveFilters, dropdownTitle, dropdownItems }: BaseDropdown) => {
    const [isDropdown, setIsDropdown] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string>('')
    const dropdownRef = React.useRef() as React.MutableRefObject<HTMLInputElement>

    const checkboxClickHandler = (value: string) => {
        if (selectedItems === value) {
            setSelectedItems(() => '');
            if (getActiveFilters)
                getActiveFilters(selectedItems);
        } else {
            setSelectedItems(value);
            if (getActiveFilters)
                getActiveFilters(selectedItems);
        }
    };
    const closeSelectBox = ({ target }: MouseEvent): void => {
        if (!dropdownRef.current?.contains(target as Node)) {
            setIsDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', closeSelectBox);

        return () => {
            document.removeEventListener('click', closeSelectBox);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="relative w-52">
            <button onClick={() => setIsDropdown(!isDropdown)} className={selectedItems.length ? "flex items-center justify-center gap-8 font-medium rounded-xl h-[52px] pl-3 pr-4 bg-stone-800 text-white shadow-[0px_15px_18px_0px_rgba(0, 0, 0, 0.14)]" : "flex items-center justify-center gap-8 bg-[#F7F7F7] font-medium rounded-xl h-[52px] pl-3 pr-4 shadow-[0px_15px_18px_0px_rgba(0, 0, 0, 0.14)]"}>
                {dropdownTitle}
                <DownArrow color={selectedItems.length ? 'white' : '#000'} />
            </button>
            {isDropdown && (
                <div className="mt-2 absolute rounded-xl border border-checkbox bg-white p-6">
                    {dropdownItems.map((item, index) => {
                        return (
                            <div key={index} onClick={() => checkboxClickHandler(item.name)} className="flex cursor-pointer mb-[19px]">
                                <div className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5  ${selectedItems.includes(item.name) ? ColorsThemeA.OhcGradient_A : "bg-[#D6D6D6]"}`}>
                                    <CheckedIcon />
                                </div>
                                <p className="ml-2">
                                    {item.name}
                                </p>
                            </div>)
                    })}

                </div>
            )}
        </div>
    )
}

export default BaseMultiSelectbox