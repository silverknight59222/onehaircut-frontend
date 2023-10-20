import React, { useState } from 'react';
// import { Menu, Transition } from 'react'
import { DownArrow } from "../utilis/Icons";
import { ColorsThemeA, Theme_A } from '../utilis/Themes';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem'


const DropdownMenu = ({
    dropdownItems = [""],
    menuName = '',
    fctToCallOnClick = (item:string) =>{}, // Function to be called when user clicks on an item
}) => {
    const [selectedItem, setSelectedItem] = useState(''); // Initial text

    const handleChange = (item : any) => {
        setSelectedItem(item);
        fctToCallOnClick(item);
    }

    return (
        <div>
            <FormControl>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    style={{width: 200}}
                    value={selectedItem}
                    onChange={(event) => handleChange(event.target.value)}
                >
                    {dropdownItems.map((item) => (
                        <MenuItem className='text-sm hover:bg-grey pl-2'
                            value={item}
                        >
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default DropdownMenu;
