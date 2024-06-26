import React, { useEffect, useState } from 'react';
import { ColorsThemeA, Theme_A } from "@/components/utilis/Themes";
import Image from "next/image";
import {
    CheckedIcon,
    SearcIcon,
    SelectedIcon,
} from "@/components/utilis/Icons";
import { getLocalStorage } from "@/api/storage";
import { Haircut, SalonHaircut } from "@/types";
import { dashboard } from "@/api/dashboard";
import userLoader from "@/hooks/useLoader";
import StarRatings from "react-star-ratings";


// For update commit
const HairStyleListItem = React.memo(({ item, activeMenu, hairStyleSelectEvent, filters, isAllSelected, cB, tB }: any) => {

    const [isSelected, setIsSelected] = useState(false);
    const [itemSelected, setItemSelected] = useState({});
    const [salon_id, setSalonId] = useState(0);
    const selectHaircut = (item: Haircut) => {
        if (isAllSelected) {
            return
        }
        if (isSelected) {
            hairStyleSelectEvent.on({
                type: "remove",
                item
            })
            tB(item)
        } else {
            hairStyleSelectEvent.on({
                type: "add",
                item
            })
            cB(item)
        }
        setIsSelected(!isSelected)
        setItemSelected(item)
    };

    // useEffect(() => {
    //     console.log(itemSelected)
    // },[itemSelected])

    // useEffect(() => {
    //     console.log(isSelected)
    //     console.log(itemSelected)
    //     if(isSelected){
    //         cB(itemSelected)
    //     }
    //     else {
    //         tB(itemSelected)
    //     }
    // },[isSelected])

    useEffect(() => {
        if (isAllSelected == false) {
            setIsSelected(false)
        }
        else {
            setIsSelected(true)
        }
    }, [isAllSelected])

    useEffect(() => {
        setIsSelected(false)
    }, [filters]) // filter name is not changed, change it to integer "Key"

    useEffect(() => {
        setIsSelected(false)
    }, [activeMenu])

    useEffect(() => {
        if (getLocalStorage('salon_id')) {
            setSalonId(Number(getLocalStorage('salon_id')));
        }
    }, [])

    // This component will re-render only if the `data` prop changes
    return (

        <div
            key={item.id}
            className={`${Theme_A.behaviour.cardBehaviour}`}
            onClick={() => selectHaircut(item)}
        >
            {/* TODO change class name based on parent card component */}
            <div className={`${activeMenu === "new" ? Theme_A.hairstyleCards.cardgradientTop : Theme_A.hairstyleCards.selectedCardGradientTop} z-[-1]`}>
                <div className={`${Theme_A.hairstyleCards.cardSize.med}`}>
                    <Image src={item.image.includes('http') ? item.image : `https://api.onehaircut.com/${item.image}`} fill={true} alt="" />
                </div>
                <div className={`${Theme_A.hairstyleCards.checkbubbleOFF}`}>
                    {(isSelected || isAllSelected) && <SelectedIcon />}
                </div>
            </div>
            <div className={` ${activeMenu === "new" ? Theme_A.hairstyleCards.cardGradientBott : Theme_A.hairstyleCards.selectedCardGradientBott}`}>
                <p className={`${Theme_A.hairstyleCards.cardText} `}>
                    {item.name}
                </p>
                {activeMenu !== "new" ?
                    <div>
                        {/* Price and Duration */}
                        <p className={`${Theme_A.hairstyleCards.cardText} flex mx-8 justify-evenly items-center ${ColorsThemeA.OhcGradient_E} text-xs text-stone-400 border-2 border-stone-300 rounded-xl shadow-inner shadow-stone-300`}>
                            {activeMenu === "added" && (
                                <>
                                    <span className="">
                                        {item.salon_haircuts.length === 0 ? 0 : item.salon_haircuts[0].base_price}€
                                    </span>
                                    <span className="">
                                        {item.salon_haircuts.length === 0 ? 0 : item.salon_haircuts[0].base_duration} mins
                                    </span>
                                </>
                            )}
                        </p>

                        {/* Rating */}
                        <p className={`${Theme_A.hairstyleCards.cardText} justify-evenly`}>
                            {activeMenu === "added" ?
                                <StarRatings
                                    rating={item.salon_haircuts.findIndex(el => el.hair_salon_id == salon_id) !== -1 ? item.salon_haircuts[item.salon_haircuts.findIndex(el => el.hair_salon_id == salon_id)].rating : 0}
                                    starRatedColor="#FEDF10"
                                    starSpacing="1px"
                                    starDimension="12px"
                                    numberOfStars={5}
                                    name={`rating-${item.salon_haircuts.findIndex(el => el.hair_salon_id == salon_id) !== -1 ? item.salon_haircuts[item.salon_haircuts.findIndex(el => el.hair_salon_id == salon_id)].rating : 0}`}
                                /> : ''}
                            {activeMenu === "added" ?
                                <p className='text-xs justify-end items-center text-stone-600'>( {item.salon_haircuts[item.salon_haircuts.findIndex(el => el.hair_salon_id == salon_id)]?.rating_counts} avis)</p>
                                : ""
                            }
                        </p>
                    </div>
                    : ""
                }
            </div>
        </div>

    );
});

export default HairStyleListItem;
