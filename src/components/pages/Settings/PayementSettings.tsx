"use client";
import { CheckedIcon } from "@/components/utilis/Icons";
import React, { useEffect, useState } from "react";
import useSnackbar from "@/hooks/useSnackbar";
import { ColorsThemeA, Theme_A } from "@/components/utilis/Themes";
import BaseDropdown from "@/components/UI/BaseDropdown";
import BaseModal from "@/components/UI/BaseModal";
import PaymentForm from "@/components/shared/Payement";

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
    const [showPaymentModal, setShowPaymentModal] = useState(false)
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
        setShowPaymentModal(true) // show popup
    }
    const modifBankCard: React.JSX.Element =
        <div>
            <PaymentForm />
        </div >;


    return (
        <div className={`w-[400px] h-max bg-white rounded-2xl py-4 shadow-lg mb-4`}>
            {showPaymentModal &&
                <BaseModal close={() => setShowPaymentModal(false)}>
                    {modifBankCard}
                </BaseModal>
            }
            {/* TODO LINKAGE WITH STRIPE */}
            {/* REGLAGE DU MOYEN DE PAIEMENT */}
            <p className={`${Theme_A.textFont.headerH2} my-5 justify-center`}>
                Moyen de paiement
            </p>
            <div className="flex flex-row justify-around italic">
                <p className="text-sm md:text-sm justify-center text-zinc-800  font-normal items-start my-1">
                    {payMethod}
                </p>
                {payMethod == payementMethodStruct[0] &&
                    <p className="text-sm md:text-sm justify-center text-zinc-600  font-normal items-start my-1">
                        {currentCardNb[0] + currentCardNb[1] + currentCardNb[2] + currentCardNb[3]} **** **** ****
                    </p>
                }
                {payMethod == payementMethodStruct[1] &&
                    <p className="text-sm md:text-sm justify-center text-zinc-600  font-normal items-start my-1">
                        {PaypalAccount}
                    </p>
                }
            </div>
            <div className="flex flex-col items-center mt-4">
                <p
                    className={`w-max justify-center py-2 px-3 text-sm mb-6 ${Theme_A.button.medBlackColoredButton}`}
                    onClick={() => setShowPaymentModal(true)}
                >
                    Mettre à jour
                </p>
            </div>

            {/* TODO LINKAGE WITH STRIPE */}
            {/* RECEPTION DES PAIEMENTS*/}
            <p className={`${Theme_A.textFont.headerH2} my-5 justify-center`}>
                Reception des paiements
            </p>
            <div className="flex flex-row justify-around italic">
                <p className="text-sm md:text-sm justify-center text-zinc-800  font-normal items-start my-1">
                    Aucun compte paramétré
                </p>
                {payMethod == payementMethodStruct[1] &&
                    <p className="text-sm md:text-sm justify-center text-zinc-600  font-normal items-start my-1">
                        {PaypalAccount}
                    </p>
                }
            </div>
            <div className="flex flex-col items-center mt-4">
                <p
                    className={`w-max justify-center py-2 px-3 text-sm mb-6 ${Theme_A.button.medStripeButton}`}
                    onClick={() => ""} /* TODO LINK TO STRIPE CONNECTION*/
                >
                    Connecter un compte stripe
                </p>
            </div>

        </div >
    );
};

export default PayementSettings;
