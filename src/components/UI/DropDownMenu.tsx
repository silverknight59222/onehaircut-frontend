import React, { useState } from 'react';
// import { Menu, Transition } from 'react'
import { DownArrow } from "../utilis/Icons";
import { ColorsThemeA, Theme_A } from '../utilis/Themes';


const DropdownMenu = ({
    dropdownItems = [""],
    width = '',
    height = '',
    rounded = '',
    borderClr = '',
    disabled = false,
    backgroundClr = '',
    fctToCallOnClick = (item:string) =>{}, // Function to be called when user clicks on an item
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState('Select an option'); // Initial text

    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };
    const handleItemClick = (item: string) => {
        setSelectedItem(item); // Update the selected item
        setIsOpen(false); // Close the dropdown
        fctToCallOnClick(item); // calling function from the other page
    };

    return (
        <div
            className={`relative flex  items-center border-1 font-normal text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${`${width ? width : 'w-40'} ${rounded ? rounded : 'rounded-md'} ${height ? height : 'h-8'} ${borderClr ? borderClr : 'border-black'} ${disabled ? 'bg-[rgba(171,171,171,0.10)] cursor-default' : backgroundClr ? `${backgroundClr} cursor-pointer` : 'bg-white cursor-pointer'}`}`}
            onClick={toggleDropdown}>

            <p className="text-sm p-2">{selectedItem}</p>
            <div className="absolute right-3">
                <DownArrow />
            </div>

            {isOpen && (
                <div className={`absolute m-0 top-8 p-2 flex flex-col border-1 ${`${width ? width : 'w-40'} ${rounded ? rounded : 'rounded-md'}  ${borderClr ? borderClr : 'border-black'} ${disabled ? 'bg-[rgba(171,171,171,0.10)] cursor-default' : backgroundClr ? `${backgroundClr} cursor-pointer` : 'bg-white cursor-pointer'}`} `}
                // style={{ width: width }}
                >
                    {dropdownItems.map((item) => (
                        <p className='text-sm hover:bg-grey pl-2'
                            key={item}
                            onClick={() => handleItemClick(item)}>
                            {item}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
