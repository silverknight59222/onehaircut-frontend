"use client";
import { CheckedIcon } from "@/components/utilis/Icons";
import React, { useEffect, useState } from "react";
import useSnackbar from "@/hooks/useSnackbar";
import { ColorsThemeA, Theme_A } from "@/components/utilis/Themes";
import BaseDropdown from "@/components/UI/BaseDropdown";
import BaseModal from "@/components/UI/BaseModal";
import PaymentForm from "@/components/shared/Payement";
import CustomInput from "@/components/UI/CustomInput";
import DropdownMenu from "@/components/UI/DropDownMenu";
import EUBanksList from "@/components/shared/EUBanks";

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

    // État pour afficher le modal d'ajout de compte bancaire
    const [showAddBankAccountModal, setShowAddBankAccountModal] = useState(false);
    // Fonction pour ouvrir le modal d'ajout de compte bancaire
    const openAddBankAccountModal = () => {
        setShowAddBankAccountModal(true);
    };


    const [accountName, setAccountName] = useState('');
    const [accountOwner, setAccountOwner] = useState('');
    const [OwnerCountry, setOwnerCountry] = useState('');

    const handleAccountNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccountName(e.target.value);
    };

    const handleAccountOwnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAccountOwner(e.target.value);
    };
    const handleAccountOwnerCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
        //TODO get country from address
    };

    const [bank, setBank] = useState(''); // État pour la banque sélectionnée
    // Les options de banques disponibles pour la sélection
    const banks = EUBanksList();

    // Fonction pour gérer le changement de banque sélectionnée
    const handleBankChange = (selectedBank) => {
        setBank(selectedBank);
    };

    const [bankAccountType, setAccountType] = useState(''); // État pour la banque sélectionnée
    const bankAccountTypes = [
        'Particulier',
        'Entreprise',
    ];
    const handleBankAccountTypeChange = (selectedBankAccountType) => {
        setAccountType(selectedBankAccountType);
    };

    // État pour l'IBAN
    const [iban, setIban] = useState('');

    // Fonction qui formate l'IBAN pour l'affichage
    const formatIbanDisplay = (value) => {
        // Enlève tous les points de la chaîne actuelle pour avoir une base propre
        const cleanValue = value.replace(/\./g, '');
        // Ajoute un point tous les quatre caractères sauf à la fin
        return cleanValue.replace(/(.{4})(?=.)/g, '$1.');
    };


    const ibanLengthsByCountry = {
        'DE': 22, // Allemagne
        'AT': 20, // Autriche
        'BE': 16, // Belgique
        'BG': 22, // Bulgarie
        'CY': 28, // Chypre
        'HR': 21, // Croatie
        'DK': 18, // Danemark
        'ES': 24, // Espagne
        'EE': 20, // Estonie
        'FI': 18, // Finlande
        'FR': 27, // France
        'GR': 27, // Grèce
        'HU': 28, // Hongrie
        'IE': 22, // Irlande
        'IT': 27, // Italie
        'LV': 21, // Lettonie
        'LT': 20, // Lituanie
        'LU': 20, // Luxembourg
        'MT': 31, // Malte
        'NL': 18, // Pays-Bas
        'PL': 28, // Pologne
        'PT': 25, // Portugal
        'CZ': 24, // République tchèque
        'RO': 24, // Roumanie
        'GB': 22, // Royaume-Uni
        'SK': 24, // Slovaquie
        'SI': 19, // Slovénie
        'SE': 24, // Suède
        'CH': 21  // Suisse
    };

    const handleIbanChange = (e) => {
        const rawIbanValue = e.target.value.replace(/\./g, ''); // Enlève les points pour obtenir la valeur brute
        const countryCode = rawIbanValue.slice(0, 2); // Prend les deux premiers caractères pour le code pays
        const maxLength = ibanLengthsByCountry[countryCode] || 27; // Obtient la longueur maximale ou utilise une valeur par défaut

        if (rawIbanValue.length <= maxLength) {
            // Si la longueur de l'IBAN brut est inférieure ou égale à la longueur maximale, met à jour l'IBAN
            const formattedIban = formatIbanDisplay(rawIbanValue); // Formate l'IBAN pour l'affichage
            setIban(formattedIban); // Met à jour l'état de l'IBAN avec la valeur formatée
        } else {
            // Si l'IBAN brut dépasse la longueur maximale, le coupe et le formate
            const formattedIban = formatIbanDisplay(rawIbanValue.slice(0, maxLength));
            setIban(formattedIban); // Met à jour l'état de l'IBAN avec la valeur formatée et tronquée
        }
    };

    const handleCloseBankAccountModal = () => {
        // Fermer le modal ici (ajuster selon votre logique existante)
        setShowPaymentModal(false);
        setShowAddBankAccountModal(false);
    };

    const [bankAccountDisplay, setBankAccountDisplay] = useState('Aucun compte paramétré');
    // Fonction pour simuler l'enregistrement des données
    const handleSaveBankAccountData = () => {
        // Ici, vous pourriez avoir votre logique pour enregistrer les données de l'IBAN dans la base de données ou ailleurs
        console.log("Données enregistrées (simulation)");

        // Mettre à jour l'affichage du compte bancaire avec l'IBAN
        setBankAccountDisplay(iban);

        // Fermez le modal après l'enregistrement
        setShowAddBankAccountModal(false);
    };


    // État pour le solde du compte - TODO LINK ACCOUNT BALANCE
    const [accountBalance, setAccountBalance] = useState('100.00'); // Mettez à jour avec la logique appropriée

    // État pour le popup de frais de transaction
    const [showTransactionFeePopup, setShowTransactionFeePopup] = useState(false);

    // Fonction appelée lors du clic sur le bouton de paiement
    const handlePayoutClick = () => {
        // Afficher le popup de frais de transaction
        setShowTransactionFeePopup(true);
    };

    // Fonction pour fermer le popup de frais de transaction
    const closeTransactionFeePopup = () => {
        setShowTransactionFeePopup(false);
    };

    // Fonction pour valider le paiement (incluant les frais de transaction)
    const validatePayout = () => {
        console.log("Paiement validé, frais de transaction inclus");
        // Ici, vous pouvez intégrer la logique pour traiter le paiement
        // N'oubliez pas de fermer le popup après le traitement
        closeTransactionFeePopup();
    };
    // Fonction pour calculer le montant après les frais
    const calculateReceivedAmount = (balance) => {
        const feePercentage = 0.0025; // 0,25%
        const fixedFee = 0.25; // 0,25€
        const amountAfterFees = balance - (balance * feePercentage + fixedFee);
        return amountAfterFees.toFixed(2); // Arrondi à deux décimales
    };


    return (
        <div className={`w-[400px] h-max bg-white rounded-2xl py-4 shadow-lg mb-4`}>
            {showPaymentModal &&
                <BaseModal close={() => setShowPaymentModal(false)}>
                    {modifBankCard}
                </BaseModal>
            }

            {/* Nouvelle section pour le solde du compte */}
            <div className="flex flex-col items-center mt-4">
                <h3 className={`${Theme_A.textFont.headerH2} mb-2`}>Solde du compte</h3>
                <p className="text-sm md:text-md justify-center text-zinc-800 font-bold mb-4">{`€${accountBalance}`}</p>
                <button
                    onClick={handlePayoutClick}
                    className={`w-max justify-center py-2 px-3 text-sm mb-6 ${Theme_A.button.mediumGradientButton}`}
                >
                    Réceptionner le solde
                </button>
            </div>

            {/* Popup de frais de transaction */}
            {showTransactionFeePopup && (
                <BaseModal close={closeTransactionFeePopup}>
                    <div className="text-center p-4">
                        <h2 className="text-xl font-bold mb-4">Frais de transaction</h2>
                        <p>Des frais de transaction seront appliqués pour ce paiement par notre fournisseur de paiement :</p>
                        <p>0,25% + 0.25€</p>
                        <p>Onehaircut ne prend aucun frais sur cette transaction</p>
                        <p className="text-md font-bold mb-8 mt-8">
                            Montant réceptionné : {`€${calculateReceivedAmount(parseFloat(accountBalance))}`}
                        </p>
                        <div className="flex justify-around mt-4">
                            <button
                                className={`${Theme_A.button.medBlackColoredButton}`}
                                onClick={closeTransactionFeePopup}
                            >
                                Retour
                            </button>
                            <button
                                className={`${Theme_A.button.mediumGradientButton}`}
                                onClick={validatePayout}
                            >
                                Réceptionner
                            </button>
                        </div>
                    </div>
                </BaseModal>
            )}


            {/* Séparation */}
            <hr className=" mx-16 border-gray-300 h-4 mt-4" />


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

            {/* Séparation */}
            <hr className=" mx-16 border-gray-300 h-4 mt-4" />


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
                    className={`w-max justify-center py-2 px-3 text-sm mb-6 ${Theme_A.button.medBlackColoredButton}`}
                    onClick={openAddBankAccountModal} // Utilisez ici la fonction pour ouvrir le modal
                >
                    Ajouter un compte bancaire
                </p>
            </div>

            {showAddBankAccountModal && (
                <BaseModal close={() => setShowAddBankAccountModal(false)}>
                    <div className="text-center mb-4">
                        <h2 className="text-3xl font-bold mb-10">Ajoutez vos informations bancaires</h2>

                        <div className="flex-inputs flex justify-between mb-8">
                            {/* Champ pour le nom du compte */}
                            <CustomInput
                                id="accountFirstName"
                                label="Prénom"
                                value={accountName} // Assurez-vous de gérer cet état dans votre composant
                                onChange={handleAccountNameChange} // Implémentez cette fonction pour mettre à jour l'état
                            />

                            {/* Champ pour le propriétaire du compte */}
                            <CustomInput
                                id="accountLastName"
                                label="Nom"
                                value={accountOwner} // Assurez-vous de gérer cet état dans votre composant
                                onChange={handleAccountOwnerChange} // Implémentez cette fonction pour mettre à jour l'état
                            />
                        </div>

                        <div className="flex-inputs flex justify-between mb-4">
                            {/* Ajout du menu déroulant pour la sélection de la banque */}
                            <DropdownMenu
                                dropdownItems={banks}
                                menuName="Banque"
                                fctToCallOnClick={handleBankChange}
                                labelId="bank-select-label"
                                selectId={bank}
                            />

                            <DropdownMenu
                                dropdownItems={bankAccountTypes}
                                menuName="Type de compte"
                                fctToCallOnClick={handleBankAccountTypeChange}
                                labelId="account-Type"
                                selectId={bankAccountType}
                            />
                        </div>

                        {/* Champ pour l'IBAN */}
                        <CustomInput
                            id="iban"
                            label="IBAN"
                            value={iban}
                            onChange={handleIbanChange} // Utilisez handleIbanChange modifié
                            type="text"
                        />

                        <div className={`mt-8 flex justify-evenly`}>
                            {/* Bouton 'Retour' */}
                            <button
                                onClick={handleCloseBankAccountModal}
                                className={`${Theme_A.button.medBlackColoredButton} ml-10`} // Ajustez la marge à droite si nécessaire
                            >
                                Retour
                            </button>

                            {/* Bouton 'Enregistrer' */}
                            <button
                                onClick={handleSaveBankAccountData}
                                className={`${Theme_A.button.mediumGradientButton} mr-10`} // Ajustez la marge à gauche si nécessaire
                            >
                                Enregistrer
                            </button>
                        </div>

                    </div>
                </BaseModal>
            )}
        </div >
    );
};

export default PayementSettings;
