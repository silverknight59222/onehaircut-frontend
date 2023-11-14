import React, { useEffect, useState } from "react";
import { CalenderIcon } from "@/components/utilis/Icons";
import MultipleDatePicker from "@/components/UI/MultipleDatePicker";
import DropdownMenu from "@/components/UI/DropDownMenu";
import BaseModal from "@/components/UI/BaseModal";
import { Theme_A, ColorsThemeA } from "@/components/utilis/Themes";



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


    const handleEntityClick = (role: string) => {
    };

    const handleSubmitClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        // Votre logique de gestion de la soumission ici
    };

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



    return (

        <div className="w-[500px] h-[800px] mb-2 bg-white rounded-2xl py-4 shadow-lg overflow-hidden">


            {/* MODAL POUR AFFICHER LES PERIODES D'INDISPONIBILITE ENREGISTREES */}
            {
                showModal && (
                    <BaseModal
                        close={() => setShowModal(false)}
                    >
                        {/* Contenu du Modal ici. Assurez-vous que c'est un seul élément JSX ou un fragment */}
                        <div className="fixed top-0 left-0 h-full w-screen overflow-y-auto flex justify-center items-center">
                            {/* ... contenu du modal ... */}
                        </div>

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
                        <div className="shadow-lg">
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



            {/* BOUTON POUR AFFICHER LES PERIODES d'INDISPONIBILITE*/}
            {/* BOUTON POUR AFFICHER LES PÉRIODES D'INDISPONIBILITÉ */}
            <div className="flex justify-center items-center mt-10 mb-4">
                <button
                    className={`${selectedDates.length > 0 ? Theme_A.button.medWhiteColoredButton : Theme_A.button.medGreydButton} ${selectedDates.length === 0 ? 'cursor-not-allowed' : ''}`}
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
