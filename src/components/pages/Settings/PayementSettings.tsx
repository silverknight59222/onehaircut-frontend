"use client";
import { CheckedIcon } from "@/components/utilis/Icons";
import React, { useEffect, useState } from "react";
import useSnackbar from "@/hooks/useSnackbar";
import { ColorsThemeA, Theme_A } from "@/components/utilis/Themes";
import BaseDropdown from "@/components/UI/BaseDropdown";
import BaseModal from "@/components/UI/BaseModal";

const PayementSettings = () => {
    const payementMethodStruct: string[] = [
        "Carte bancaire", "Paypal",
    ]

    // TODO: get from the backend the payement method 
    // state for knowing the execution periode of the bot
    const [payMethod, setPayMethod] = useState(payementMethodStruct[0])
    const currentCardNb: string = "2453 1245 7745 20" // TODO: get from backend
    const PaypalAccount: string = "leLascar" // TODO: get from backend
    // state for showing the pop up to change the payement info
    const [showModal, setShowModal] = useState(false)
    // state for knowing where the user clicked
    const [clickedMethod, setClickedMethod] = useState(payementMethodStruct[0])
    // state for the card number
    const [cardNb, setCardNb] = useState(0)

    // Function to send the new settings values into backend
    const updateBankingSettings = async () => {
        // TODO add backend
    }




    // Function change the banking informations
    const popupBankingSettings = (method: string) => {
        setClickedMethod(method) // remomber the payement wished
        setShowModal(true) // show popup
    }

    return (
        <div className={`w-[400px] h-max bg-white rounded-2xl py-4 shadow-lg`}>
            {showModal &&
                <BaseModal close={() => setShowModal(false)}>
                    <div className="">
                        {clickedMethod == "Carte bancaire" &&
                            <div className="justify-center">
                                <div className={`${Theme_A.textFont.headerH4} mb-6`}>
                                    Entrer les informations de votre carte bancaire
                                </div>
                                {/* Input for card number restricted to numbers */}
                                <div>
                                    <label htmlFor="creditCardMonth">Numéro de carte:</label>
                                    <input
                                        type="text"
                                        pattern="[0-9]*"
                                        className={`${Theme_A.fields.inputField} my-2 mx-4`}
                                        placeholder="************"
                                        maxLength={30}
                                        onChange={(e) => {
                                            setCardNb(e.target.valueAsNumber)
                                        }}
                                    />
                                </div>
                                <div className="">
                                    <label htmlFor="creditCardMonth">Mois et année d'expiration:</label>
                                    <input
                                        type="text"
                                        id="creditCardMonth"
                                        name="creditCardMonth"
                                        className={`${Theme_A.fields.inputField} my-2 mx-4 w-16`}
                                        placeholder="MM"
                                        maxLength={2}
                                        pattern="[0-9]*"
                                        onInput={(e) => {
                                            const inputElement = e.target as HTMLInputElement;
                                            const value = inputElement.value;
                                            let sanitizedValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                                            // check the month
                                            if (+sanitizedValue > 12) {
                                                sanitizedValue = ''
                                            }
                                            inputElement.value = sanitizedValue;
                                        }}
                                    />
                                    <input
                                        type="text"
                                        id="creditCardYear"
                                        name="creditCardYear"
                                        className={`${Theme_A.fields.inputField} my-2 mx-4 w-20`}
                                        placeholder="YYYY"
                                        maxLength={4}
                                        pattern="[0-9]*"
                                        onInput={(e) => {
                                            const inputElement = e.target as HTMLInputElement;
                                            const value = inputElement.value;
                                            const sanitizedValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                                            inputElement.value = sanitizedValue;
                                        }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="creditCardName">Nom sur la carte:</label>
                                    <input
                                        type="text"
                                        id="creditCardName"
                                        name="creditCardName"
                                        className={`${Theme_A.fields.inputField} my-2 mx-4`}
                                        placeholder="Entrer le nom"
                                    />
                                </div>
                                <div className="flex items-center justify-center rounded-xl text-lg">
                                    <p
                                        onClick={updateBankingSettings}
                                        className={`py-2 px-3 mt-6 text-sm ${Theme_A.button.mediumGradientButton}`}
                                    >
                                        Appliquer les changements
                                    </p>
                                </div>
                            </div>
                        }
                        {clickedMethod == "Paypal" &&
                            <div className={`${Theme_A.textFont.headerH4}`}>
                                Call Paypal TODO
                            </div>}
                    </div>
                </BaseModal>

            }

            <p className={`${Theme_A.textFont.headerH2} my-5 justify-center`}>
                Réglage du moyen de paiement
            </p>
            <p className="text-sm md:text-md ml-8 text-black font-normal items-start my-1">
                Moyen actuel
            </p>
            <div className="flex flex-row justify-around">
                <p className="text-sm md:text-sm justify-center text-zinc-800  font-normal items-start my-1">
                    {payMethod}
                </p>
                {payMethod == payementMethodStruct[0] &&
                    <p className="text-sm md:text-sm justify-center text-zinc-600  font-normal items-start my-1">
                        {currentCardNb[0] + currentCardNb[1]} **** **** **
                    </p>
                }
                {payMethod == payementMethodStruct[1] &&
                    <p className="text-sm md:text-sm justify-center text-zinc-600  font-normal items-start my-1">
                        {PaypalAccount}
                    </p>
                }
            </div>
            <div className="flex flex-row justify-around mt-8 ">

                <p className="text-sm md:text-md justify-center text-zinc-800 font-normal items-start my-1">
                    Moyens proposés
                </p>
                <div className=" p-1 bg-zinc-200 rounded-lg">
                    {payementMethodStruct.map((element) => {
                        return (
                            <div className="">
                                <p
                                    onClick={() => popupBankingSettings(element)}
                                    className={`text-sm md:text-sm my-1 px-2 font-normal items-start  cursor-pointer ${payMethod == element
                                        ? "text-white bg-black rounded-lg"
                                        : "text-zinc-600 "
                                        }`}>
                                    {element}
                                </p>
                            </div>)
                    })}
                </div>
            </div>
        </div >
    );
};

export default PayementSettings;
