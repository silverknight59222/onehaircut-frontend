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
import { salonApi } from "@/api/salonSide";
import DatePicker from "@/components/UI/DatePicker";
import TourModal, { Steps } from "@/components/UI/TourModal";
import { BankAccountStripe } from "@/types";
import PaymentFormSetting from "@/components/pages/Settings/PaymentformSetting";
import { loadStripe } from '@stripe/stripe-js';
import userLoader from "@/hooks/useLoader";
import { Elements } from "@stripe/react-stripe-js";
import { Auth } from "@/api/auth";
import { getLocalStorage, removeFromLocalStorage, setLocalStorage } from "@/api/storage";
const { loadingView } = userLoader();

const PayementSettings = () => {
    const payementMethodStruct: string[] = [
        "Carte bancaire", "Paypal",
    ]


    // TODO: get from the backend the payement method
    // state for knowing the execution periode of the bot
    const { loadingView } = userLoader();
    const [isLoading, setIsLoading] = useState(false);
    const showSnackbar = useSnackbar();

    const [stripeKey, setStripeKey] = useState("");
    const [payMethod, setPayMethod] = useState(payementMethodStruct[0])
    const [currentCardNb, setCurrentCardNb] = useState("2453 1245 7745 2052")
    const PaypalAccount: string = "leLascar" // TODO: get from backend
    let stripePromise = loadStripe(stripeKey);  // public key for stripe
    // state for showing the pop up to change the payement info
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    // state for knowing where the user clicked
    const [clickedMethod, setClickedMethod] = useState(payementMethodStruct[0])
    // state for the card number
    const [cardNb, setCardNb] = useState(0)
    const [pageDone, setPageDone] = useState<String[]>(['salon_payment']);




    // Function to send the new settings values into backend
    const updateBankingSettings = async (data) => {
        // TODO add backend
        console.log(data);
        let resp = await salonApi.updateBankAccount(data);
        console.log(resp);

    }
    const [accountPaymentName, setAccountPaymentName] = useState('');
    const [accountPaymentNumber, setAccountPaymentNumber] = useState('');
    const [accountPaymentExpMonth, setAccountPaymentExpMonth] = useState('');
    const [accountPaymentExpYear, setAccountPaymentExpYear] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        // appearance,
    };
    const getStripeKey = async () => {
        let resp_intent = await salonApi.submitNewPaymentMethod({});
        setClientSecret(resp_intent.data.clientSecret)
        setIsLoading(true)
        let resp = await salonApi.getStripeKey();
        stripePromise = loadStripe(resp.data.pk)
        setStripeKey(resp.data.pk)
        setIsLoading(false)
    }


    // Function change the banking informations
    const popupBankingSettings = (method: string) => {
        setClickedMethod(method) // remomber the payement wished
        setShowPaymentModal(true) // show popup
    }
    const handleCardNumberChange = (newCardNumber: string) => {
        setAccountPaymentNumber(newCardNumber);
    };
    const handleCardExpMonthChange = (expMonth: string) => {
        setAccountPaymentExpMonth(expMonth);
    };
    const handleCardExpYearChange = (expYear: string) => {
        setAccountPaymentExpYear(expYear);
    };
    const handleCardNameChange = (name: string) => {
        setAccountPaymentName(name);
    };

    const modifBankCard: React.JSX.Element =
        <div style={{ maxWidth: '500px', margin: 'auto' }}>
            <Elements options={options} stripe={stripePromise} >
                {/* <PaymentForm onCardNumberChange={handleCardNumberChange}
                    onCardExpMonthChange={handleCardExpMonthChange}
                    onCardExpYearChange={handleCardExpYearChange}
                    onCardNameChange={handleCardNameChange}
                /> */}
                <PaymentFormSetting />
            </Elements>
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
    const isFormValid = () => {
        // Add your validation logic here
        return (
            accountName.trim() !== "" &&
            accountOwner.trim() !== "" &&
            bank.trim() !== "" &&
            bankAccountType.trim() !== "" &&
            iban.trim() !== ""
        );
    };

    const handleCloseBankAccountModal = () => {
        // Fermer le modal ici (ajuster selon votre logique existante)
        setShowPaymentModal(false);
        setShowAddBankAccountModal(false);
    };

    const [bankAccountDisplay, setBankAccountDisplay] = useState('Aucun compte paramétré');
    // Fonction pour simuler l'enregistrement des données
    const handleSaveBankAccountData = () => {
        if (isFormValid()) {
            // Ici, vous pourriez avoir votre logique pour enregistrer les données de l'IBAN dans la base de données ou ailleurs
            console.log("Données enregistrées (simulation)");
            const bankData: BankAccountStripe = {
                name: accountName,
                owner: accountOwner,
                bank_name: bank,
                business_type: bankAccountType,
                iban: iban,
                currency: 'eur',
            }
            updateBankingSettings(bankData).then(async (e) => {
                console.log(e)
                const { data } = await Auth.getUser()
                setLocalStorage("user", JSON.stringify(data.user));
                if (data.user.hair_salon) {
                    setLocalStorage("hair_salon", JSON.stringify(data.user.hair_salon));
                }
                showSnackbar('success', 'Bank Account Data Stored')
            }).catch((e) => {
                showSnackbar('error', "Please Check Your Identity : Such as valid phone number, bank account number , etc")
            });
            // Mettre à jour l'affichage du compte bancaire avec l'IBAN
            setBankAccountDisplay(iban);

            // Fermez le modal après l'enregistrement
            setShowAddBankAccountModal(false);
        }
        else {
            showSnackbar("error", "There are missing field. Please give a valid information");
        }
    };

    const getCustomerStripeInformation = async () => {
        let resp = await salonApi.getSalonCustomerStripeInformation();
        console.log(resp.data)
        if (resp.data.current_pm_list.data.length > 0) {
            const card_information = resp.data.current_pm_list.data[0].card;
            setCurrentCardNb('**** **** **** ' + card_information.last4)
        }
        // setAccountPaymentName()
        // setAccountPaymentNumber()
        // setAccountPaymentExpDate()
    }

    // État pour le solde du compte - TODO LINK ACCOUNT BALANCE
    const [accountBalance, setAccountBalance] = useState('100.00'); // Mettez à jour avec la logique appropriée
    const [accountPendingBalance, setAccountPendingBalance] = useState('0.00'); // Mettez à jour avec la logique appropriée

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

    const getSalonStripeInformation = async () => {
        let resp = await salonApi.getAllStripeInformation();
        console.log(resp.data)
        if (resp.data.status == 200) {
            let account_data = resp.data.account_data
            let balance_data = resp.data.balance_data
            if (account_data.length != 0) {
                console.log(account_data.external_accounts)
                console.log(account_data.external_accounts.data.length)
                if (account_data.external_accounts.data.length > 0) {
                    let card_account_info = account_data.external_accounts.data[0]
                    setAccountOwner(card_account_info.account_holder_name)
                    setAccountName(account_data.individual.first_name + " " + account_data.individual.last_name)
                    setOwnerCountry(card_account_info.country)
                    setBank(card_account_info.bank_name)
                    setAccountType(card_account_info.account_holder_type == 'individual' ? bankAccountTypes[0] : bankAccountTypes[1])
                    setIban(card_account_info.country + '******' + card_account_info.last4)
                }
                setAccountBalance((balance_data.available[0].amount / 100).toString())
                setAccountPendingBalance((balance_data.pending[0].amount / 100).toString())
            }
            else {
                setAccountBalance("0.00")
            }
        }

    }

    useEffect(() => {
        getStripeKey()
        getSalonStripeInformation()
        getCustomerStripeInformation()
        const pages_done = getLocalStorage('pages_done')
        setPageDone(pages_done ? JSON.parse(pages_done) : [])
    }, [])

    const [birthdate, setBirthdate] = useState(new Date());


    // ------------------------------------------------------------------
    // For Tour
    const tourSteps: Steps[] = [
        {
            selector: '.balance_display',
            content: 'Vous trouverez ici le solde provenant de vos prestations.',
        },
        {
            selector: '.button_withdraw',
            content: 'En cliquant sur ce bouton, vous pouvez transferer cette somme vers votre compte bancaire.',
        },
        {
            selector: '.button_add_bank_account',
            content: 'Pour entrer ou modifier vos informations bancaires, vous pouvez cliquer ici.',
        },
        {
            selector: '.button_add_bank_card',
            content: 'Ce bouton vous permettra d’ajouter ou modifier votre moyen de paiement pour l’abonnement pro.',
        },
    ];

    const closeTour = async () => {
        // You may want to store in local storage or state that the user has completed the tour
        setIsLoading(true)
        if (!pageDone.includes('salon_payment')) {
            let resp = await salonApi.assignStepDone({ page: 'salon_payment' });

            if (resp.data?.pages_done) {
                setLocalStorage('pages_done', JSON.stringify(resp.data.pages_done));
            }
            setPageDone((prevArray) => [...prevArray, 'salon_payment'])
        }
        setIsLoading(false);
    };
    // ------------------------------------------------------------------

    /************************************************************************************************************************** */

    return (
        <div className={`w-[400px] h-max bg-white rounded-2xl py-4 shadow-lg mb-4`}>
            {isLoading && loadingView()}
            {showPaymentModal &&
                <BaseModal close={() => setShowPaymentModal(false)}>
                    {modifBankCard}
                </BaseModal>
            }


            {/* For explaining the website */}
            <TourModal steps={tourSteps} onRequestClose={closeTour} doneTour={pageDone.includes('salon_payment')} />


            {/* Nouvelle section pour le solde du compte */}
            <div className="flex flex-col items-center mt-4 balance_display">
                <h3 className={`${Theme_A.textFont.headerH2} mb-2`}>Solde du compte</h3>
                <p className="text-sm md:text-md justify-center text-zinc-800 font-bold mb-4 ">{`€${accountBalance}`}</p>
                <button
                    onClick={handlePayoutClick}
                    className={`w-max justify-center py-2 px-3 text-sm mb-6 ${Theme_A.button.mediumGradientButton} button_withdraw`}
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
                        **** **** **** {currentCardNb.slice(-4)}
                    </p>
                }
                {payMethod == payementMethodStruct[1] &&
                    <p className="text-sm md:text-sm justify-center text-zinc-600  font-normal items-start my-1">
                        {PaypalAccount}
                    </p>
                }
            </div>
            {clientSecret &&
                <div className="flex flex-col items-center mt-4 button_add_bank_card">
                    <p
                        className={`w-max justify-center py-2 px-3 text-sm mb-6 ${Theme_A.button.medBlackColoredButton}`}
                        onClick={() => setShowPaymentModal(true)}
                    >
                        Mettre à jour
                    </p>
                </div>
            }


            {/* Séparation */}
            <hr className=" mx-16 border-gray-300 h-4 mt-4" />


            {/* TODO LINKAGE WITH STRIPE */}
            {/* RECEPTION DES PAIEMENTS*/}
            <p className={`${Theme_A.textFont.headerH2} my-5 justify-center`}>
                Reception des paiements
            </p>
            <div className="flex flex-row justify-around italic">
                <p className="text-sm md:text-sm justify-center text-zinc-800  font-normal items-start my-1">
                    {iban != '' ? iban : "Aucun compte paramétré"}
                </p>
                {payMethod == payementMethodStruct[1] &&
                    <p className="text-sm md:text-sm justify-center text-zinc-600  font-normal items-start my-1">
                        {PaypalAccount}
                    </p>
                }
            </div>
            <div className="flex flex-col items-center mt-4 button_add_bank_account">
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

                        <div className="flex-inputs flex justify-between py-2 mb-8">
                            {/* Champ pour le nom du compte */}
                            <CustomInput
                                id="accountFirstName"
                                label="Nom du salon"
                                value={accountName}
                                onChange={handleAccountNameChange} // Implémentez cette fonction pour mettre à jour l'état
                            />

                            {/* Champ pour le propriétaire du compte */}
                            <CustomInput
                                id="accountLastName"
                                label="Nom du titulaire du compte"
                                value={accountOwner}
                                onChange={handleAccountOwnerChange} // Implémentez cette fonction pour mettre à jour l'état
                            />
                        </div>

                        <div className="flex-inputs flex justify-between mb-4 py-2 ">
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

                        {/* Séparation */}
                        <hr className="mt-8 mx-16 border-gray-300 h-4" />


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
                            // disabled={!isFormValid()}
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
