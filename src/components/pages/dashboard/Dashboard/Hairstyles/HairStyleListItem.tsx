import React, { useEffect, useState } from 'react';
import { Theme_A } from "@/components/utilis/Themes";
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



const HairStyleListItem = React.memo(({ item, activeMenu, hairStyleSelectEvent, filters, isAllSelected }: any) => {
    // //console.log("in HairStyleListItem")

    const [isSelected, setIsSelected] = useState(false);

    const selectHaircut = (item: Haircut) => {
        if (isAllSelected) {
            return
        }
        if (isSelected) {
            hairStyleSelectEvent.on({
                type: "remove",
                item
            })
        } else {
            hairStyleSelectEvent.on({
                type: "add",
                item
            })
        }
        setIsSelected(!isSelected)
    };

    useEffect(() => {
        if (isAllSelected == false) {
            setIsSelected(false)
        }
    }, [isAllSelected])

    useEffect(() => {
        setIsSelected(false)
    }, [filters]) // filter name is not changed, change it to integer "Key"

    useEffect(() => {
        setIsSelected(false)
    }, [activeMenu])

    // This component will re-render only if the `data` prop changes
    return (

        <div
            key={item.id}
            className={`${Theme_A.behaviour.cardBehaviour}`}
            onClick={() => selectHaircut(item)}
        >
            {/* TODO change class name based on parent card component */}
            <div className={`${activeMenu === "new" ? Theme_A.hairstyleCards.cardgradientTop : Theme_A.hairstyleCards.selectedCardGradientTop}`}>
                <div className={`${Theme_A.hairstyleCards.cardSize.med}`}>
                    <Image src={item.image.includes('http') ? item.image : `https://api.onehaircut.com/${item.image}`} fill={true} alt="" />
                </div>
                <div className={`${Theme_A.hairstyleCards.checkbubbleOFF}`}>
                    {(isSelected || isAllSelected) && <SelectedIcon />}
                </div>
            </div>
            <div className={`${activeMenu === "new" ? Theme_A.hairstyleCards.cardGradientBott : Theme_A.hairstyleCards.selectedCardGradientBott}`}>
                <p className={`${Theme_A.hairstyleCards.cardText}`}>
                    {item.name}
                </p>
            </div>
        </div>

    );
});

export default HairStyleListItem;