import React, { useState } from 'react';
import { DownArrow } from "../utilis/Icons";

const DropdownMenu = ({
    dropdownItems = [""],
    width = '',
    height = '',
    rounded = '',
    borderClr = '',
    disabled = false,
    backgroundClr = '',
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
    };

    return (
        <div
            className={`relative flex  items-center px-3 border ${`${width ? width : 'w-40'} ${rounded ? rounded : 'rounded-md'} ${height ? height : 'h-8'} ${borderClr ? borderClr : 'border-black'} ${disabled ? 'bg-[rgba(171,171,171,0.10)] cursor-default' : backgroundClr ? `${backgroundClr} cursor-pointer` : 'bg-white cursor-pointer'}`}`}
            onClick={toggleDropdown}>

            <p className="text-sm">{selectedItem}</p>
            <div className="absolute right-3">
                <DownArrow />
            </div>

            {isOpen && (
                <div className={`absolute top-8 px-3 flex flex-col border ${`${width ? width : 'w-40'} ${rounded ? rounded : 'rounded-md'}  ${borderClr ? borderClr : 'border-black'} ${disabled ? 'bg-[rgba(171,171,171,0.10)] cursor-default' : backgroundClr ? `${backgroundClr} cursor-pointer` : 'bg-white cursor-pointer'}`} `}
                // style={{ width: width }}
                >
                    {dropdownItems.map((item) => (
                        <p className='text-sm'
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
