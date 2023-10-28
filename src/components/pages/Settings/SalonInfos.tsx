import React, { useState, useEffect } from "react";
import { EditIcon, CheckedIcon } from "@/components/utilis/Icons";
import { Theme_A } from "@/components/utilis/Themes";
import BaseModal from "@/components/UI/BaseModal";
import DropdownMenu from "@/components/UI/DropDownMenu";
import { ColorsThemeA } from "@/components/utilis/Themes";
import CustomSlider from "@/components/UI/OHC_Slider";
import ComponentTheme from "@/components/UI/ComponentTheme";

const SalonInfos = () => {
    const [isModal, setIsModal] = useState(false);
    const [isBillingAddressVisible, setIsBillingAddressVisible] = useState(true);
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState(""); // État pour la ville
    const [billingPostalCode, setBillingPostalCode] = useState("");
    const [billingCity, setBillingCity] = useState(""); // État pour la ville de facturation
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); // État pour la checkbox
    const [SelectedSalonType, setSelectedSalonType] = useState<string>('');
    const [SalonType, setSalonType] = useState('');


    const openModal = () => {
        setIsModal(true);
    };
    const closeModal = () => {
        setIsModal(false);
    };
    const SaveAddress = () => {
        setIsModal(false);
    };

    // Fonction pour générer les champs d'entrée Pour l'adresse standard
    const renderTextInputField = (placeholder: string, type?: string) => (
        <input
            placeholder={placeholder}
            type={type}
            inputMode="text"
            maxLength={50}
            className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-Gray-500 focus:bg-gray-900 focus:text-white focus:placeholder-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
            onInput={(e) => {
                // Nothing to do on a single character change
            }}
        />
    );

    // Fonction pour générer les champs d'entrée Pour l'adresse standard
    const renderZipField = (placeholder: string) => (
        <input
            placeholder={placeholder}
            inputMode="numeric"
            maxLength={5} // Limiter la longueur maximale à 5 caractères
            className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-Gray-500 focus:bg-gray-900 focus:text-white focus:placeholder-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
            onInput={(e) => {
                let value = e.currentTarget.value;

                // Remplacer tout ce qui n'est pas un chiffre par une chaîne vide
                value = value.replace(/[^0-9]/g, '');

                // Limiter la valeur à 5 caractères
                if (value.length > 5) {
                    value = value.slice(0, 5);
                }

                // Mettre à jour le code postal correspondant
                setPostalCode(value);
                e.currentTarget.value = value;
            }}
        />
    );


    // Fonction pour générer les champs d'entrée
    const renderInputFieldBilling = (placeholder: string, type?: string) => (
        <input
            placeholder={placeholder}
            type={type}
            inputMode="numeric"
            maxLength={5} // Limiter la longueur maximale à 5 caractères
            className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-Gray-500 focus:bg-gray-900 focus:text-white focus:placeholder-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
            onInput={(e) => {
                let value = e.currentTarget.value;

                // Remplacer tout ce qui n'est pas un chiffre par une chaîne vide
                value = value.replace(/[^0-9]/g, '');

                // Limiter la valeur à 5 caractères
                if (value.length > 5) {
                    value = value.slice(0, 5);
                }

                // Mettre à jour le code postal correspondant
                setBillingPostalCode(value);
                e.currentTarget.value = value;
            }}
        />
    );

    // Fonction pour générer un élément <li> avec style
    const renderListItem = (label: string, text: string) => (
        <li className="text-sm text-gray-400 italic">
            {label} : {text}
        </li>
    );

    // Fonction pour rechercher la ville en fonction du code postal
    const searchCityByPostalCode = async (code: string, isBillingAddress = false) => {
        try {
            if (code.length === 5) {
                const apiKey = 'AIzaSyAJiOb1572yF7YbApKjwe5E9L2NfzkH51E';
                const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${code}&key=${apiKey}`);
                const data = await response.json();
                if (data.results.length > 0) {
                    const cityComponent = data.results[0].address_components.find((component: any) =>
                        component.types.includes('locality')
                    );
                    if (cityComponent) {
                        if (isBillingAddress) {
                            setBillingCity(cityComponent.long_name);
                        } else {
                            setCity(cityComponent.long_name);
                        }
                    } else {
                        console.log('Ville non trouvée.');
                    }
                } else {
                    console.log('Aucun résultat trouvé.');
                }
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de la ville :", error);
        }
    };

    // FOR AUTOMATICALLY FIND THE CITY OF BILLING ADDRESS 
    const searchBillingCityByPostalCode = async (code: string) => {
        try {
            if (code.length === 5) {
                const apiKey = 'AIzaSyAJiOb1572yF7YbApKjwe5E9L2NfzkH51E';
                const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${code}&key=${apiKey}`);
                const data = await response.json();
                if (data.results.length > 0) {
                    const cityComponent = data.results[0].address_components.find((component: any) =>
                        component.types.includes('locality')
                    );
                    if (cityComponent) {
                        setBillingCity(cityComponent.long_name);
                    } else {
                        console.log('Ville de facturation non trouvée.');
                    }
                } else {
                    console.log('Aucun résultat trouvé.');
                }
            }
        } catch (error) {
            console.error("Erreur lors de la recherche de la ville de facturation :", error);
        }
    };


    // Utilisez useEffect pour déclencher la recherche de la ville lorsque le code postal change
    useEffect(() => {
        searchCityByPostalCode(postalCode);
    }, [postalCode]);

    // Utilisez useEffect pour déclencher la recherche de la ville de facturation lorsque le code postal change
    useEffect(() => {
        searchBillingCityByPostalCode(billingPostalCode);
    }, [billingPostalCode]);



    //For Dropdown lists Type of salon
    const SalonTypeList = [
        "Barber-shop",
        "Salon pour hommes",
        "Salon pour femmes",
        "Coiffeur/euse mobile homme",
        "Coiffeur/euse mobile femme",
        "Salon mixte",
    ];
    // handling the change of Salon type change
    const SaveSalonType = (item: string) => {
        // TODO: add backend to save the new preference
    }

    //For mobility checkbox
    const [isMobilityAllowed, setIsMobilityAllowed] = useState(false); // État de la checkbox
    const handleCheckboxChange = (event: any) => {
        setIsMobilityAllowed(event.target.checked);
    };
    const [selectedWeekday, setSelectedWeekday] = useState<string>('');
    const HandleSelectedSalonType = (item: string) => {
        switch (item) {
            case 'Barber-shop':
                setSalonType("Barber-shop");
                break;
            case 'Salon pour hommes':
                setSalonType("Salon pour hommes");
                break;
            case 'Salon pour femmes':
                setSalonType("Salon pour femmes");
                break;
            case 'Coiffeur/euse mobile homme':
                setSalonType("Coiffeur/euse mobile homme");
                break;
            case 'Coiffeur/euse mobile femme':
                setSalonType("Coiffeur/euse mobile femme");
                break;
            case 'Salon mixte':
                setSalonType("Salon mixte'");
                break;
        }
        setSelectedSalonType(item);
    }

    //For the slider :
    // Reset the slider values
    const [zoneSliderRange, setZoneSliderRange] = useState([0, 15]);
    const handleZoneSliderChange = (event: any, newValue: any) => {
        setZoneSliderRange(newValue);
    };

    /************************************************************************************************************************** */

    return (
        // ...
        <div className={`w-[500px] h-max bg-white rounded-2xl py-4 shadow-lg`}>
            {isModal && (
                <BaseModal close={() => setIsModal(false)}>
                    <div className="relative z-100">
                        {/* Contenu du Modal Adresse */}
                        <div className="flex">
                            {/* Adresse */}
                            <div className="flex-1 py-5 pl-5 overflow-hidden">
                                <h1 className="inline text-2xl font-semibold leading-none">Adresse</h1>
                            </div>
                        </div>
                        <div className="px-5 pb-5">
                            {renderTextInputField("Nom")}
                            {renderTextInputField("Adresse")}
                            <div className="flex">
                                <div className="flex-grow w-1/4 pr-2">
                                    {renderZipField("Code Postal")}
                                </div>
                                <div className="flex-grow">
                                    <input
                                        placeholder="Ville"
                                        type="text"
                                        className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-Gray-500 focus:bg-gray-900 focus:text-white focus:placeholder-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                        value={city} // Valeur de la ville mise à jour automatiquement
                                        onClick={() => {
                                            setCity('');
                                            setPostalCode('');

                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center pt-3">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-black bg-gray-300 border-none rounded-xl focus:ring-transparent"
                                    checked={isCheckboxChecked} // Utilisation de l'état de la checkbox
                                    onChange={() => setIsCheckboxChecked(!isCheckboxChecked)} // Mettre à jour l'état de la checkbox
                                />
                                <label htmlFor="safeAdress" className="block ml-2 text-sm text-gray-900">
                                    Adresse de facturation
                                </label>
                            </div>
                        </div>

                        {/* Adresse de facturation */}
                        {!isCheckboxChecked && isBillingAddressVisible && (
                            <div className="flex">
                                <div className="flex-1 py-5 pl-5 overflow-hidden">
                                    <h1 className="inline text-2xl font-semibold leading-none">Adresse de facturation</h1>
                                </div>
                                <div className="flex-none pt-2.5 pr-2.5 pl-1" />
                            </div>
                        )}
                        {!isCheckboxChecked && isBillingAddressVisible && (
                            <div className="px-5 pb-5">
                                {renderTextInputField("Nom")}
                                {renderTextInputField("Adresse de facturation")}
                                <div className="flex">
                                    <div className="flex-grow w-1/4 pr-2">
                                        {renderInputFieldBilling("Code Postal", "number")}
                                    </div>
                                    <div className="flex-grow">
                                        <input
                                            placeholder="Ville de facturation"
                                            type="text"
                                            className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-Gray-500 focus:bg-gray-900 focus:text-white focus:placeholder-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                                            value={billingCity} // Valeur de la ville mise à jour automatiquement
                                            onClick={() => {
                                                setBillingCity('');
                                                setBillingPostalCode('');

                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        <hr className="mt-4" />

                        {/* Séparation */}
                        <div className="flex flex-row-reverse p-3">
                            {/* Boutons */}
                            <div className="flex-initial pl-3">
                                <button
                                    type="button"
                                    onClick={SaveAddress} // TODO SAVE ADDRESS
                                    className={`${Theme_A.button.medBlackColoredButton} ease-in-out transition duration-300`}
                                >
                                    <span>Enregistrer</span>
                                </button>
                            </div>
                            <div className="flex-initial">
                                <button
                                    type="button"
                                    onClick={closeModal} // TODO SAVE ADDRESS
                                    className={`${Theme_A.button.medWhiteColoredButton} ease-in-out transition duration-300`}
                                >
                                    <span>Annuler</span>
                                </button>
                            </div>
                        </div>
                        {/* Fin du contenu du Modal Adresse */}
                    </div>
                </BaseModal>
            )}
            {/* Affichage des adresses dans la vignette principale */}
            <div className="flex">
                <h4 className="flex items-center justify- ml-6 mb-2 font-semibold text-lg">
                    Adresses
                </h4>
            </div>


            <div className="flex">
                <div className="flex-1 py-5 pl-5 ml-8 ">

                    <ul>
                        <li className="text-sm mb-2 text-gray-400 uppercase font-semibold">
                            Adresse de l'établissement
                        </li>
                        {renderListItem("Nom", "Max Mustermann")}
                        {renderListItem("Adresse", "Musterstrasse 1")}
                        {renderListItem("PLZ", "4020 Linz")}
                        {renderListItem("Pays", "Suisse")}
                    </ul>
                </div>
                <div className="flex-1 py-5 pl-1 overflow-hidden ml-4">
                    <ul>
                        <li className="text-sm mb-2 text-gray-400 uppercase font-semibold">
                            Adresse de <br /> facturation
                        </li>
                        {renderListItem("Nom", "Rick Astley")}
                        {renderListItem("Adresse", "Rickrolled 11")}
                        {renderListItem("PLZ", "1000 Vienna")}
                        {renderListItem("Pays", "Autriche")}
                    </ul>
                </div>
                <div
                    className={`${Theme_A.servicesCards.modifyButton} mr-8 shadow-md  transition-transform duration-300 transform hover:scale-125`}
                    onClick={openModal}
                >
                    <EditIcon />
                </div>
            </div>

            {/* Séparation */}
            <hr className="mx-16 border-gray-300 h-4" />

            {/* TYPE D ETABLISSEMENT */}
            <h4 className="flex items-center justify- ml-6 mb-8 font-semibold text-lg">
                Type d'établissement
            </h4>
            <div className="flex items-center justify-center mb-2 "> {/* Increased horizontal spacing */}
                {/* DropDown + Vignette avec image */}
                <div className="flex items-center">
                    <DropdownMenu
                        dropdownItems={SalonTypeList}
                        fctToCallOnClick={HandleSelectedSalonType}
                        menuName="Type d'établissement"
                        selectId={SelectedSalonType}
                    />
                    <img
                        src="chemin_de_votre_image.png"
                        alt="Icon"
                        className="w-24 h-24 mr-4 ml-8 bg-stone-300 rounded-lg mb-4 "
                    />
                </div>
            </div>


            {/* Séparation */}
            <hr className=" mx-16 border-gray-300 h-4" />


            {/* ZONE DE MOBILITE */}
            <div className="flex flex-col">
                {/* Titre "Zone de mobilité" */}
                <h4 className="flex ml-6 mb-2 font-semibold text-lg">
                    Zone de mobilité
                </h4>

                {/* Checkbox et label "Autoriser la mobilité" */}
                <div className="flex-1 py-5 pl-5 ml-8 flex items-center"> {/* Utilisez flex items-center ici */}
                    <div onClick={() => setIsMobilityAllowed(!isMobilityAllowed)} className={`w-6 h-6 flex items-center justify-center cursor-pointer rounded ${isMobilityAllowed
                        ? ColorsThemeA.ohcVerticalGradient_A
                        : "bg-[#D6D6D6]"
                        }`}>
                        <CheckedIcon />
                    </div>
                    <label htmlFor="mobilityZone" className="ml-2 text-sm text-gray-900">
                        Coiffure à domicile
                    </label>
                </div>

                {/* Label supplémentaire qui apparaît si la checkbox est cochée */}
                {isMobilityAllowed && (
                    <div className="relative items-center justify-center w-64 mx-auto"> {/* Utilisez mx-auto pour centrer */}
                        <CustomSlider
                            theme={ComponentTheme}
                            value={zoneSliderRange}
                            onChange={handleZoneSliderChange}
                            min={0}
                            max={30}
                            unit="km"
                            label="Zone de mobilité" // Fournissez une prop label si votre composant CustomSlider l'attend
                            valueLabelDisplay="auto"
                        />
                    </div>
                )}
            </div>





            {/* fin Affichage des adresses dans la vignette principale */}
        </div>


    );
};

export default SalonInfos;