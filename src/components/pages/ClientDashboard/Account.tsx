import { LogoCircleFixRight } from "@/components/utilis/Icons";
import ClientDashboardLayout from "@/layout/ClientDashboardLayout";
import React, { useState } from "react";
import BaseModal from "@/components/UI/BaseModal";
import Footer from "@/components/UI/Footer";
import { ColorsThemeA, Theme_A } from "@/components/utilis/Themes";

interface infoInterface {
    name: string;
    desc: string;
    modif: boolean;
    popup: React.JSX.Element
}

// function emptyFct() {
//     return (
//         <div></div>)
// };

const emptyPopup: React.JSX.Element = <div></div>; // Define an empty JSX element


const infoInterfaceIni: infoInterface =
    { name: "", desc: "", modif: false, popup: emptyPopup }


const Account = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const items = [
        "Informations personnelles",
        "Mot de passe",
        "Moyens de paiements",
        "Réservations en cours",
        "Notifications",
        "Confidentialité et règles d’utilisation",
        "Langue",
    ];


    ////////////////////////////////////////////////////
    ///////////////////// PASSWORD 
    ////////////////////////////////////////////////////
    const [passwordField, renewPassword] = useState({
        old: "",
        new: "",
        new2: "",
    });
    const setOldPassword = (value: string) => {
        renewPassword((prev) => {
            return { ...prev, old: value };
        });
    };
    const setNewPassword = (value: string) => {
        renewPassword((prev) => {
            return { ...prev, new: value };
        });
    };
    const setNew2Password = (value: string) => {
        renewPassword((prev) => {
            return { ...prev, new2: value };
        });
    };

    const onSubmitPassword = async () => {
        if (passwordField.new != passwordField.new2) { // TODO modify
            setError((prev) => {
                return { ...prev, text: "Nouveaux mots de passe différents" };
            });
            return;
        }
        else if (passwordField.new.length < 8) {
            setError((prev) => {
                return { ...prev, text: "Nouveaux mots de passe trop petits" };
            });
            return;
        }
        else {
            setError((prev) => {
                return { ...prev, text: "" };
            });
        }
    }

    const [error, setError] = useState({
        text: "",
    })
    const modifPassWord: React.JSX.Element =
        <div>
            <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-3xl font-semibold text-black text-center">Modification du mot de passe</p>


                {error && (
                    <p className={`${Theme_A.checkers.errorText}`}>
                        {error.text}
                    </p>
                )}
                <input
                    // type=""
                    placeholder="Ancien mot de passe"
                    className={`w-full p-3 placeholder:text-[#959595] placeholder:text-base rounded-md shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)] outline-none ${Theme_A.behaviour.fieldFocused_B}`}
                    value={passwordField.old}
                    maxLength={30}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                    // type=""
                    placeholder="Nouveau mot de passe"
                    className={`w-full p-3 placeholder:text-[#959595] placeholder:text-base rounded-md shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)] outline-none ${Theme_A.behaviour.fieldFocused_B}`}
                    value={passwordField.new}
                    maxLength={30}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <input
                    // type=""
                    placeholder="Nouveau mot de passe"
                    className={`w-full p-3 placeholder:text-[#959595] placeholder:text-base rounded-md shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)] outline-none fieldFocused ${Theme_A.behaviour.fieldFocused_B}`}
                    value={passwordField.new2}
                    maxLength={30}
                    onChange={(e) => setNew2Password(e.target.value)}
                />
            </div>
            <div className="mt-4 flex gap-4 items-center justify-center w-full">
                <button
                    className={`${Theme_A.button.medWhiteColoredButton}`}
                    onClick={() => setIsModal(!isModal)}
                >
                    Annuler
                </button>
                <button
                    className={`${Theme_A.button.mediumGradientButton}`}
                    onClick={() => onSubmitPassword()}
                >
                    Actualiser
                </button>
            </div>
        </div>


    ////////////////////////////////////////////////////
    ///////////////////// ADDRESS 
    ////////////////////////////////////////////////////
    const [addressField, newAddressField] = useState("");
    const setNewAddress = (value: string) => {
        newAddressField(value);
    };

    const onSubmitAdd = async () => {
        if (addressField.length > 8) { // TODO modify
            setError((prev) => {
                return { ...prev, text: "Entrez une address correcte" };
            });
            return;
        }
        else {
            setError((prev) => {
                return { ...prev, text: "" };
            });
        }
    }


    const modifAddress: React.JSX.Element =
        <div>
            <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-3xl font-semibold text-black text-center">Modification de l'adresse</p>
                {error && (
                    <p className={`${Theme_A.checkers.errorText}`}>
                        {error.text}
                    </p>
                )}
                <input
                    placeholder="Nouvelle adresse"
                    className={`w-full p-3 placeholder:text-[#959595] placeholder:text-base rounded-md shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)] outline-none ${Theme_A.behaviour.fieldFocused_B}`}
                    value={addressField}
                    maxLength={100}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
            </div>
            <div className="mt-4 flex gap-4 items-center justify-center w-full">
                <button
                    className={`${Theme_A.button.medWhiteColoredButton}`}
                    onClick={() => setIsModal(!isModal)}
                >
                    Annuler
                </button>
                <button
                    className={`${Theme_A.button.mediumGradientButton}`}
                    onClick={() => onSubmitAdd()}
                >
                    Actualiser
                </button>
            </div>
        </div>
        ;

    // TODO: add information about the client.
    const informations: infoInterface[] = [
        { name: "Nom légal", desc: "Dimitri Bala", modif: false, popup: emptyPopup },
        { name: "Adresse", desc: "Information non fournie", modif: true, popup: modifAddress },
        { name: "Numéro de téléphone", desc: "+41 ** *** 62 92", modif: true, popup: emptyPopup },
        { name: "Adresse e-mail", desc: "b***9@gmail.com", modif: false, popup: emptyPopup },
        { name: "Pièce d'identité officielle", desc: "Information non fournie", modif: true, popup: emptyPopup },
        { name: "Statut", desc: "Etudiant - vérifié", modif: true, popup: emptyPopup },
    ];

    const password: infoInterface[] = [
        { name: "Mot de passe", desc: "", modif: true, popup: modifPassWord },
    ];

    const notifications: infoInterface[] = [
        { name: "Activité du compte", desc: "Activé : E-mail et SMS", modif: true, popup: emptyPopup },
        { name: "Rappels", desc: "Activé : E-mail, SMS et Whatsapp", modif: true, popup: emptyPopup },
        { name: "Messages", desc: "Activé : E-mail, Whatsapp", modif: true, popup: emptyPopup },
    ];

    const payments: infoInterface[] = [
        // TODO: Add card number
        { name: "Carte de crédit", desc: "4212 **** **** ****", modif: true, popup: emptyPopup },
        { name: "Paypal", desc: "Bientôt disponible", modif: false, popup: emptyPopup },
    ];

    const reservations: infoInterface[] = [
        { name: "", desc: "", modif: false, popup: emptyPopup },
    ];

    const confidentiality: infoInterface[] = [
        { name: "", desc: "", modif: false, popup: emptyPopup },
    ];

    const languages: infoInterface[] = [
        { name: "Langue actuelle", desc: "Francais", modif: true, popup: emptyPopup },
    ];


    const [showItem, setShowItem] = useState(informations);
    const [selectedParam, setSelectedParam] = useState(infoInterfaceIni);

    const onSelectTab = (item: string, index: number) => {
        setSelectedTab(index);
        if (item === "Notifications") {
            setShowItem(notifications);
        }
        else if (item === "Moyens de paiements") {
            setShowItem(payments);
        }
        else if (item === "Langue") {
            setShowItem(languages);
        }
        else if (item === "Mot de passe") {
            setShowItem(password);
        }
        else if (item === "Réservations en cours") {
            setShowItem(reservations);
        }
        else if (item === "Confidentialité et règles d’utilisation") {
            setShowItem(confidentiality);
            const urlToOpen = '/confidentiality'; // Replace with your URL or component path
            // Open the URL in a new tab
            window.open(urlToOpen);
        }
        else {
            setShowItem(informations);
        }
    };

    const [isModal, setIsModal] = useState(false);
    const handleModifierClick = (item: infoInterface) => {
        setIsModal(true); // Show the modal when "modifier" is clicked
        setSelectedParam(item);
    };




    return (
        <div>
            <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 -z-10">
                <LogoCircleFixRight />
            </div>
            <ClientDashboardLayout>
                <div className="mt-14 mb-5 px-6">
                    {isModal && (
                        <BaseModal close={() => setIsModal(!isModal)}>
                            <div>
                                {/* {modifPassWord()} */}
                                {selectedParam.popup}
                            </div>

                        </BaseModal>)}

                    {/* NORMAL VIEW */}
                    <p className="text-black font-medium text-3xl text-center">
                        Gestion du compte
                    </p>
                    <div className="flex flex-col md:flex-row items-start justify-center gap-10 xl:gap-20 mt-10">
                        <div className="w-full md:w-auto flex flex-col items-center justify-center gap-6">
                            {items.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => onSelectTab(item, index)}
                                        className={`flex items-center justify-center w-full md:w-80 xl:w-96 h-16 bg-white rounded-2xl text-black shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)] border cursor-pointer ${selectedTab === index && "border-secondary"
                                            }`}
                                    >
                                        {item}
                                    </div>
                                );
                            })}
                        </div>
                        <div className=" w-full md:w-6/12 md:h-[590px] mt-5 md:mt-0 rounded-3xl bg-white py-8 px-14 shadow-[0px_13px_37px_0px_rgba(176,176,176,0.28)]">
                            {showItem.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex items-start justify-between my-6"
                                    >
                                        <div>
                                            <p className="text-black">{item.name}</p>
                                            <p className="text-[#666] text-sm">{item.desc}</p>
                                        </div>
                                        {item.modif === true ?
                                            <div className="cursor-pointer text-black underline text-xs"
                                                onClick={() => handleModifierClick(item)}
                                            >modifier
                                            </div>
                                            :
                                            <div></div>
                                        }
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </ClientDashboardLayout >
            <Footer />
        </div >
    )
}

export default Account