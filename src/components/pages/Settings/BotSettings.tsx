"use client";
import { CheckedIcon } from "@/components/utilis/Icons";
import React, { useEffect, useState } from "react";
import useSnackbar from "@/hooks/useSnackbar";
import { ColorsThemeA, Theme_A } from "@/components/utilis/Themes";
import BaseDropdown from "@/components/UI/BaseDropdown";

const BotSettings = () => {
    const botRepetition: string[] = [
        "Journalier", "Hebdomadaire", "Mensuelle"
    ]

    // TODO: get from the backend the value of isAutoExe and botPeriod
    // state to know if salon wants periodic bot execution
    const [isAutoExe, setisAutoExe] = useState(false)
    // state for knowing the execution periode of the bot
    const [botPeriod, setBotPeriod] = useState(botRepetition[0])

    // Function to send the new settings values into backend
    const updateBotSettings = async () => {
        // TODO add backend
    }

    return (
        <div className={`w-[400px] h-max bg-white rounded-2xl text-xl font-medium shadow-[3px_3px_10px_-1px_rgba(0,0,0,0.30)]`}>
            <p className={`${Theme_A.textFont.headerH2} my-5 justify-center`}>
                Réglage du bot
            </p>
            <div className="mb-3 gap-3">
                <div
                    onClick={() => setisAutoExe(!isAutoExe)}
                    className="flex flex-row justify-around cursor-pointer my-3">

                    <p className="text-sm md:text-md text-zinc-800 font-medium items-start">
                        Exécution automatique
                    </p>
                    <div

                        // key={ }
                        onClick={() => setisAutoExe(!isAutoExe)}
                        className="flex items-center gap-5 cursor-pointer"
                    >
                        <div
                            className={`w-6 h-6 pt-2 pl-1.5 rounded-[4px] border ${isAutoExe
                                ? `bg-gradient-to-b ${ColorsThemeA.ohcVerticalGradient_A} border-white`
                                : "border-[#767676]"
                                }`}
                        >
                            <CheckedIcon width="15" height="10" />
                        </div>
                    </div>
                </div>
                {isAutoExe &&
                    <div className="flex flex-row justify-around my-5">

                        <p className="text-sm md:text-md justify-center text-zinc-800 font-normal items-start my-1">
                            Période d'exécution
                        </p>
                        <div className="p-1 bg-zinc-200 rounded-lg">
                            {botRepetition.map((element) => {
                                return (
                                    <div className="">
                                        <p
                                            onClick={() => setBotPeriod(element)}
                                            className={`text-sm md:text-sm my-1 px-2 font-normal items-start  cursor-pointer ${botPeriod == element
                                                ? "text-white bg-black rounded-lg"
                                                : "text-zinc-600 "
                                                }`}>
                                            {element}
                                        </p>
                                    </div>)
                            })}
                        </div>
                    </div>
                }
                <div className="flex flex-col items-center">
                    <p
                        onClick={updateBotSettings}
                        className={`w-max justify-center  py-2 px-3  text-sm ${Theme_A.button.mediumGradientButton}`}>
                        Appliquer les changements
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BotSettings;
