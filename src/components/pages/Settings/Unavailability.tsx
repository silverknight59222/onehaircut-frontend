import React, { useEffect, useState } from "react";
import { CalenderIcon } from "@/components/utilis/Icons";
import MultipleDatePicker from "@/components/UI/MultipleDatePicker";
import DropdownMenu from "@/components/UI/DropDownMenu";
import BaseModal from "@/components/UI/BaseModal";
import { Theme_A, ColorsThemeA } from "@/components/utilis/Themes";
import CustomizedTable from "@/components/UI/CustomizedTable";
import CustomInput from "@/components/UI/CustomInput";


// Définissez un type ou une interface pour les données d'indisponibilité
interface UnavailabilityData {
    startDate: Date;
    endDate: Date;
    reason: string;
    status: string;
}


const Unavailability = () => {

    const [selectedEntity, setSelectedEntity] = useState("Etablissement");
    const [showModal, setShowModal] = useState(false); // Initialize showModal state
    const [showCalender, setShowCalender] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date>()


    const [selectedDates, setSelectedDates] = useState<Date[]>([]);

    const onDatesSelect = (dates: Date[]) => {
        setSelectedDates(dates);
    };
    useEffect(() => {
        setSelectedDate(new Date())
    }, [])

    const initialDays: Date[] = [];
    const [days, setDays] = React.useState<Date[] | undefined>(initialDays);

    useEffect(() => {
        console.log('Selected dates:', selectedDates);
    }, [selectedDates]);


    // FORMATAGE POUR L'AFFICHAGE DE LA PLAGE/DATE SELECTIONNEE
    const formatDateRange = (dates: Date[]) => {
        if (dates.length === 0) return 'Aucune date sélectionnée';

        const format = (date: Date) => new Intl.DateTimeFormat('fr-FR', {
            year: 'numeric', month: 'long', day: 'numeric'
        }).format(date);

        if (dates.length === 1) {
            return `Jour unique: ${format(dates[0])}`;  // Modification ici
        } else {
            return (
                <>
                    <span>Début: {format(dates[0])}</span>
                    <br />
                    <span>Fin: {format(dates[dates.length - 1])}</span>
                </>
            );
        }
    };

    // ACTION SLORS DU CHOIX ENTRE ETABLISSEMENT ET PERSONNEL
    const handleEntityClick = (role: string) => {
        setSelectedEntity(role);
        if (role === "Personnel") {
            setShowHairdresserDropdown(true);
            // Mettez à jour la classe CSS en fonction de la sélection
            setMainContainerClass("h-[900px]");
        } else {
            setShowHairdresserDropdown(false);
            // Mettez à jour la classe CSS en fonction de la sélection
            setMainContainerClass("h-[800px]");
        }
    };

    //DATA UNAVALABILITY TO SAVE 
    const SalonColumns = ['Date de début', 'Date de fin', 'Raison', 'Actions'];
    const HairdresserColumns = ['Date de début', 'Date de fin', 'Heure de début', 'Heure de fin', 'Raison', 'Actions'];
    const [unavailabilities, setUnavailabilities] = useState<UnavailabilityData[]>([]); // Déclaration de la variable unavailabilities

    const columnsToDisplay = selectedEntity === "Personnel" ? HairdresserColumns : SalonColumns;

    // Dans le rendu JSX, utilisez columnsToDisplay comme colonnes à afficher dans le composant CustomizedTable
    <CustomizedTable columns={columnsToDisplay} data={unavailabilities} />

    const [reason, setReason] = useState(""); // État local pour la raison

    const handleSubmitClick = () => {
        if (selectedDates.length > 0) {
            // Utilisez l'état local pour la raison
            const newUnavailability = {
                startDate: selectedDates[0],
                endDate: selectedDates[selectedDates.length - 1],
                reason: reason, // Utilisez l'état local pour la raison
                status: "En attente",
            };

            // Ajoutez la nouvelle donnée d'indisponibilité à votre tableau de données
            setUnavailabilities([...unavailabilities, newUnavailability]);

            // Réinitialisez l'état des dates sélectionnées
            setSelectedDates([]);

            // Réinitialisez la raison dans le champ de saisie
            setReason(""); // Réinitialisez la raison en vidant l'état local
        }
    };

    // POUR AFFICHER LA LISTE DES COIFFEURS DU SALON
    const [showHairdresserDropdown, setShowHairdresserDropdown] = useState(false); // État local pour afficher ou masquer la dropdown
    const [mainContainerClass, setMainContainerClass] = useState("h-[800px]"); // Classe CSS par défaut

    // TODO IMPORT TRUE LIST
    const hairdresserList = [
        "Dimitri",
        "William",
        "Florian",
        "Ben",
    ];



    return (

        <div className={`w-[500px] mb-2 bg-white rounded-2xl py-4 shadow-lg overflow-hidden z-50 ${mainContainerClass}`}>


            {/* MODAL POUR AFFICHER LES PERIODES D'INDISPONIBILITE ENREGISTREES */}
            {
                showModal && (
                    <BaseModal
                        close={() => setShowModal(false)}
                    >
                        {/* Contenu du Modal ici. Assurez-vous que c'est un seul élément JSX ou un fragment */}
                        <CustomizedTable columns={columnsToDisplay} data={unavailabilities} />
                    </BaseModal>
                )
            }


            {/* Etablissement / Personnel  */}
            <div className="flex justify-center items-center">
                <button
                    className={`text-xl font-semibold focus:outline-none mr-32 p-2 rounded-md ${selectedEntity === "Etablissement"
                        ? "bg-stone-800 text-white "
                        : "bg-white text-stone-800 hover:bg-stone-200"
                        }`}
                    onClick={() => handleEntityClick("Etablissement")} // Passer "Etablissement" en tant que chaîne de caractères
                >
                    Etablissement
                </button>
                <button
                    className={`text-xl font-semibold focus:outline-none p-2 rounded-md ${selectedEntity === "Personnel"
                        ? "bg-stone-700 text-white "
                        : "bg-white text-stone-800 hover:bg-stone-200"
                        }`}
                    onClick={() => handleEntityClick("Personnel")} // Passer "Personnel" en tant que chaîne de caractères
                >
                    Personnel
                </button>
            </div>


            {/* Séparation */}
            <hr className=" mx-16 border-gray-300 h-4 mt-4 mb-4" />

            {/* SELECTION DU COIFFEUR SI "PERSONNEL" EST SELECTIONNE */}
            {showHairdresserDropdown && (
                // Contenu de la dropdown à afficher
                <>
                    <div className="flex justify-center items-center">
                        {/* Left-aligned Dropdown */}
                        <DropdownMenu
                            dropdownItems={hairdresserList} // Assurez-vous d'avoir une liste de coiffeurs à afficher
                            selectId="" // Assurez-vous de définir l'ID approprié ici
                            menuName="Coiffeurs"
                        />
                    </div>

                    {/* Séparation */}
                    <div>
                        <hr className="mx-16 border-gray-300 h-4 mt-4 mb-4" />
                    </div>
                </>
            )}


            {/* BOUTON POUR AFFICHER LES PERIODES d'INDISPONIBILITE*/}
            <div className="flex justify-center items-center mt-4 mb-4">
                <button className={`${Theme_A.button.medWhiteColoredButton}`}
                    onClick={() => setShowModal(true)}>
                    Afficher les absences programmées
                </button>
            </div>


            {/* Séparation */}
            <hr className=" mx-16 border-gray-300 h-4 mt-8 mb-8" />


            {/* DATEPICKER TO SET UNAVAILABILITIES */}
            <div className="flex flex-col sm:flex-row items-center justify-evenly px-1 sm:px-10">
                {/* DATEPICKER */}
                <div className="relative">
                    <div className="cursor-pointer hover:scale-110 transition duration-300" onClick={() => setShowCalender(!showCalender)}>
                        <CalenderIcon />
                    </div>
                    {/* DATEPICKER MODAL */}
                    {showCalender &&
                        <div className="shadow-lg" style={{ position: 'absolute', top: '100%', left: 0, zIndex: 999 }}>
                            <MultipleDatePicker
                                selectedDates={selectedDates}
                                onSelect={onDatesSelect}
                                close={() => setShowCalender(false)}
                            />
                        </div>
                    }

                </div>

                {/* AFFICHAGE DE LA DATE */}
                <p className={` h-auto w-auto ml-4 text-sm items-center justify-center font-medium shadow-sm shadow-stone-600 rounded-lg px-6 py-3 ${selectedDates.length > 0 ? ` ${ColorsThemeA.OhcGradient_A} text-white` : 'bg-gray-300 text-stone-500'}`}>
                    {formatDateRange(selectedDates)}
                </p>
            </div>

            {/* REASON INPUT FIELD */}
            <div className="w-auto px-16 mt-12">
                <CustomInput
                    id="UnavailabilityReason"
                    type="text"
                    label="Renseigner une raison (optionnel)"
                    value={reason} // Utilisez l'état local pour la valeur du champ
                    onChange={(e) => setReason(e.target.value)} // Mettez à jour l'état local avec les changements du champ
                />
            </div>


            {/* BOUTON POUR AFFICHER LES PÉRIODES D'INDISPONIBILITÉ */}
            <div className="flex justify-center items-center mt-10 mb-4">
                <button
                    className={`${selectedDates.length > 0 ? Theme_A.button.medBlackColoredButton : Theme_A.button.medGreyColoredButton} ${selectedDates.length === 0 ? 'cursor-not-allowed' : ''}`}
                    onClick={selectedDates.length > 0 ? handleSubmitClick : undefined}
                    disabled={selectedDates.length === 0}
                >
                    Valider l'indisponibilité
                </button>
            </div>

        </div >
    );
};

export default Unavailability;
