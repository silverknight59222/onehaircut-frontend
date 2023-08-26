import React, { useEffect, useRef, useState } from 'react'
import { CheckedIcon, DownArrow } from '../utilis/Icons';

interface dropdown {
    name: string
}

export type BaseDropdown = {
    dropdownItems: dropdown[];
    getActiveFilters?:(value:string[])=>void;
}

const BaseMultiSelectbox = (props: BaseDropdown) => {
    const [isDropdown, setIsDropdown] = useState(false);
    const [selectedItems,setSelectedItems]=useState<string[]>([])
    const dropdownRef=React.useRef() as React.MutableRefObject<HTMLInputElement>

    const checkboxClickHandler = (value: string) => {
        if (selectedItems.includes(value)) {
            const tempArray = [...selectedItems];
            const index = tempArray.indexOf(value);
            tempArray.splice(index, 1);
            setSelectedItems(() => tempArray);
          } else {
                setSelectedItems((prevState) => [...prevState, value]);
            
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
      useEffect(() => {
        if(props.getActiveFilters)
        props.getActiveFilters(selectedItems);
      }, [selectedItems])
      
    return (
        <div ref={dropdownRef} className="relative w-52">
            <button onClick={()=>setIsDropdown(!isDropdown)} className={selectedItems.length ? "flex items-center justify-center gap-8 font-medium rounded-xl h-[52px] pl-3 pr-4 bg-gray-400 text-white shadow-[0px_15px_18px_0px_rgba(0, 0, 0, 0.14)]" : "flex items-center justify-center gap-8 bg-[#F7F7F7] font-medium rounded-xl h-[52px] pl-3 pr-4 shadow-[0px_15px_18px_0px_rgba(0, 0, 0, 0.14)]"}>
                Trier par : Nom
                <DownArrow color={selectedItems.length ? 'white' : '#000'}/>
            </button>
            {isDropdown && (
                <div className="mt-2 absolute rounded-xl border border-checkbox bg-white p-6">
                    {props.dropdownItems.map((item, index) => {
                        return (
                            <div key={index} onClick={()=>checkboxClickHandler(item.name)} className="flex cursor-pointer mb-[19px]">
                                <div className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5  ${selectedItems.includes(item.name) ? "bg-gradient-to-b from-pink-500 to-orange-500" : "bg-[#D6D6D6]"}`}>
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