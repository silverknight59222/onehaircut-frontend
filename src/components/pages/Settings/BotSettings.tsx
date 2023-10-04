"use client";
import { CheckedIcon } from "@/components/utilis/Icons";
import React, { useEffect, useState } from "react";
import useSnackbar from "@/hooks/useSnackbar";
import { ColorsThemeA, Theme_A } from "@/components/utilis/Themes";

const BotSettings = () => {

    const [isCorrectInfo, setIsCorrectInfo] = useState(false)

    return (
        <div className={`w-[400px] h-max bg-white rounded-2xl text-xl font-medium shadow-[3px_3px_10px_-1px_rgba(0,0,0,0.30)]`}>
            <p className={`${Theme_A.textFont.headerH2} my-5 justify-center`}>
                Réglage du bot
            </p>
            <div className="mb-3 gap-3">
                <div
                    onClick={() => setIsCorrectInfo(!isCorrectInfo)}
                    className="flex flex-row justify-around cursor-pointer">

                    <p className="text-sm md:text-xl text-zinc-600 font-medium items-start">
                        Execution automatique
                    </p>
                    <div className={`flex rounded-sm w-5 h-5 border  ${isCorrectInfo ? `${ColorsThemeA.ohcVerticalGradient_A}` : "border-[#CCC] bg-white"}`}>
                        <CheckedIcon width="35" height="35" />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BotSettings;
