"use client";
import { CheckedIcon } from "@/components/utilis/Icons";
import React, { useEffect, useState } from "react";
import useSnackbar from "@/hooks/useSnackbar";
import { ColorsThemeA, Theme_A } from "@/components/utilis/Themes";
import BaseDropdown from "@/components/UI/BaseDropdown";
import BaseModal from "@/components/UI/BaseModal";
import PaymentForm from "@/components/shared/Payement";
import DropdownMenu from "@/components/UI/DropDownMenu";

const TVASettings = () => {

    return (
        <div className={`w-[400px] h-max bg-white rounded-2xl py-4 shadow-lg mb-4`}>

            <h4 className="flex items-center justify- ml-6 mb-2 font-semibold text-lg">
                Réglage de votre TVA
            </h4>
            <div className="flex flex-col gap-2">
                {/* 
                <DropdownMenu dropdownItems={DisplayedMonths} backgroundColor="bg-white" selectId={selectedMonthRevenu} menuName="Pays"
                    fctToCallOnClick={handleNewMonthRevenu} />
                    */}
            </div>
        </div >
    );
};

export default TVASettings;
