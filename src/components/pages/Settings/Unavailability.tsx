import React, { useEffect, useState } from "react";
import { CalenderIcon, CheckedIcon } from "@/components/utilis/Icons";
import MultipleDatePicker from "@/components/UI/MultipleDatePicker";
import DropdownMenu from "@/components/UI/DropDownMenu";
import BaseModal from "@/components/UI/BaseModal";
import { Theme_A, ColorsThemeA } from "@/components/utilis/Themes";
import CustomizedTable from "@/components/UI/CustomizedTable";
import CustomInput from "@/components/UI/CustomInput";
import { dashboard } from "@/api/dashboard";
import { getLocalStorage, removeFromLocalStorage, setLocalStorage } from "@/api/storage";
import { salonApi } from "@/api/salonSide";
import useSnackbar from '@/hooks/useSnackbar';
import OpenningHours from "./OpenningHours";
import InfoButton from "@/components/UI/InfoButton";
import TourModal, { Steps } from "@/components/UI/TourModal";
import userLoader from "@/hooks/useLoader";

// Définissez un type ou une interface pour les données d'indisponibilité
interface UnavailabilityData {
    start_date: String;
    end_date: String;
    reason: string;
    status: string;
    hdId: String
}
interface HairdresserSlot {
    id: string;
    status: number;
    hair_dresser_id: number;
    available: boolean;
    day: string;
    end: string;
    start: string;
}

interface HairdressersWithSlots {
    id: number;
    hair_salon_id: number;
    profile_image: string | null;
    name: string;
    avatar: {
        image: string;
    };
    slots: HairdresserSlot[];
}

const defaultHairDresser = {
    id: 0,
    hair_salon_id: 0,
    profile_image: "",
    name: "",
    avatar: {
        image: "",
    },
    slots: [
        {
            id: "",
            status: 0,
            hair_dresser_id: 0,
            available: false,
            day: "",
            end: "",
            start: "",
        },
    ],
};

const Unavailability = () => {
    const showSnackbar = useSnackbar();
    const { loadingView } = userLoader();
    const [isLoading, setIsLoading] = useState(false);
    const salonData = getLocalStorage('hair_salon')

    const salon = salonData ? JSON.parse(salonData) : null

    const [selectedEntity, setSelectedEntity] = useState("Etablissement");
    const [showModal, setShowModal] = useState(false); // Initialize showModal state
    const [showCalender, setShowCalender] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date>()
    const [hairDresserList, setHairDresserList] = useState<any>([])
    const [hairdresserList, setDDHairDresserList] = useState([])
    const [selectedHD, setSelectedHD] = useState("")
    const [unavailList, setUnavailList] = useState<any>([])
    const [unavailListSalon, setUnavailListSalon] = useState<any>([])
    const [timeState, setTimeState] = useState(false)
    const [HDTimeList, setHDTimeList] = useState<any>([]);
    const [updatedSlots, setUpdatedSlots] = useState<any>([]);
    const [selectedSalonHairDresser, setSelectedSalonHairDresser] =
        useState<HairdressersWithSlots>(defaultHairDresser);
    const [slotList, setSlotList] = useState<any[]>([]);
    const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

    const [selectedDates, setSelectedDates] = useState<Date[]>([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [pageDone, setPageDone] = useState<String[]>([]);

    const onDatesSelect = (dates: Date[]) => {
        setSelectedDates(dates);
        let start = formatSingleDate([dates[0]])
        let end = formatSingleDate([dates[dates.length - 1]])
        console.log(start)
        console.log(end)
        console.log(start == end)
        if (start == end && selectedHD) {
            setTimeState(true);
        }
        else {
            setTimeState(false)
        }
        setStartDate(start)
        setEndDate(end)
    };

    useEffect(() => {
        // setSelectedDate(new Date())
        getHairDresser()
        getSalonInfo()
        const pages_done = getLocalStorage('pages_done')
        setPageDone(pages_done!.split(',').map((item) => item.trim()))
        console.log(pages_done)
    }, [])

    useEffect(() => {
        getHairDresserInfo()
    }, [selectedHD])

    const getHairDresserInfo = async () => {
        let obj = hairDresserList.find(o => o.name == selectedHD);
        if (obj != null) {
            let resp = await salonApi.getHairDresserAvailability(obj!.id);
            setUnavailList(resp.data.data)
            setUnavailabilities(resp.data.data)
        }
    }
    const getSalonInfo = async () => {
        let resp = await salonApi.getSalonUnavailability(salon.id);
        setUnavailList(resp.data.data)
        setUnavailabilities(resp.data.data)
        setLocalStorage("salon_default", resp.data.data)
    }
    const getHairDresser = async () => {
        let id_salon = salon?.id;
        let resp = await dashboard.getAllHairDressers(id_salon);
        let hair_dresser_data = resp.data.data
        let temp_arr: any = [];
        setHairDresserList(hair_dresser_data)
        hair_dresser_data.forEach(item => {
            if (item && item.hasOwnProperty("name")) {
                temp_arr.push(item.name as String);
            }
        });
        setDDHairDresserList(temp_arr)
        // console.log(temp_arr)
    }
    const selectSlot = (slot: HairdresserSlot) => {
        if (selectedSlots?.includes(slot.id)) {
            setSelectedSlots(selectedSlots.filter((item) => item !== slot.id));
        } else {
            setSelectedSlots((prev) => [...prev, slot.id]);
        }
    };
    const getTimeList = async () => {
        let obj = hairDresserList.find(o => o.name == selectedHD);
        let hd_id = obj.id;
        const data = {
            date: startDate
        }
        let resp = await salonApi.getSlots(hd_id, data);
        console.log(resp.data)
        setSlotList(resp.data.data)
        let data_count = resp.data.data.length
        setMainContainerClass(`h-[1500px + ${data_count * 100}]`);
    }

    const initialDays: Date[] = [];
    const [days, setDays] = React.useState<Date[] | undefined>(initialDays);

    useEffect(() => {
        // console.log('Selected dates:', selectedDates);

    }, [selectedDates]);

    useEffect(() => {
        console.log("TimeState :" + timeState)
        if (timeState == true) {
            getTimeList()
        }
    }, [timeState])

    useEffect(() => {
        console.log(selectedSlots)
    }, [selectedSlots])

    useEffect(() => {
        setUnavailList(unavailList)
    }, [unavailList])

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
    const formatSingleDate = (dates: Date[]) => {
        if (dates.length === 0) return 'Aucune date sélectionnée';

        const format = (date: Date) => new Intl.DateTimeFormat('en-EN', {
            year: 'numeric', month: 'numeric', day: 'numeric'
        }).format(date);

        return `${format(dates[0])}`;  // Modification ici
    };


    // ACTIONS LORS DU CHOIX ENTRE ETABLISSEMENT ET Coiffeurs
    const handleEntityClick = (role: string) => {
        setUnavailabilities([]);
        setTimeState(false);
        setSelectedEntity(role);
        setShowCalender(false)
        setSelectedHD('')
        setReason('')
        onDatesSelect([]);
        if (role === "Coiffeurs") {
            setShowHairdresserDropdown(true);
            // Mettez à jour la classe CSS en fonction de la sélection
            setMainContainerClass("h-[900px]");
        } else {
            setShowHairdresserDropdown(false);
            getSalonInfo()
            // Mettez à jour la classe CSS en fonction de la sélection
            setMainContainerClass("h-[900px]");
        }
    };

    //DATA UNAVALABILITY TO SAVE 
    const SalonColumns = ['id', 'Start Date', 'End Date', 'Reason', 'Actions'];
    const HairdresserColumns = ['uv_id', 'Start Date', 'End Date', 'Start Time', 'End Time', 'Reason', 'Actions'];
    const [unavailabilities, setUnavailabilities] = useState<UnavailabilityData[]>([]); // Déclaration de la variable unavailabilities



    useEffect(() => {
        console.log(unavailabilities)
    }, [unavailabilities]);

    const columnsToDisplay = selectedEntity === "Coiffeurs" ? HairdresserColumns : SalonColumns;

    // Dans le rendu JSX, utilisez columnsToDisplay comme colonnes à afficher dans le composant CustomizedTable
    <CustomizedTable columns={columnsToDisplay} data={unavailabilities} cB={setUnavailList} />

    const [reason, setReason] = useState(""); // État local pour la raison

    const handleSubmitClick = async () => {
        let obj = hairDresserList.find(o => o.name == selectedHD);
        // CHeck if it is for just a hairdresser or for the salon
        if (obj != undefined) {
            // only for hairdresser
            if (selectedDates.length > 0) {
                // Utilisez l'état local pour la raison
                const newUnavailability = {
                    start_date: startDate,
                    end_date: endDate,
                    reason: reason, // Utilisez l'état local pour la raison
                    status: "En attente",
                    hdId: obj.id,
                    slot_times: selectedSlots
                };

                // Ajoutez la nouvelle donnée d'indisponibilité à votre tableau de données
                let resp = await salonApi.addHairDresserUnavailability(newUnavailability);
                if (resp.data.status == 200) {
                    showSnackbar("success", "Indisponibilités ajoutées");
                }
                else {
                    showSnackbar("error", "Erreur lors de l'enregistrement des indisponibilités");
                }
                if (resp.data.data.length > 1) {
                    setUnavailabilities(unavailabilities.concat(resp.data.data));
                }
                else {
                    setUnavailabilities([...unavailabilities, resp.data.data]);
                }
            }
        }
        else {
            // for the complete salon
            console.log(salon)
            if (selectedDates.length > 0) {
                const newSalonUnavailability = {
                    start_date: startDate,
                    end_date: endDate,
                    reason: reason, // Utilisez l'état local pour la raison
                    status: "En attente",
                    salon_id: salon.id,
                };
                let resp = await salonApi.addSalonUnavailability(newSalonUnavailability);
                if (resp.data.status == 200) {
                    showSnackbar("success", "Indisponibilités ajoutées");
                }
                else {
                    showSnackbar("error", "Erreur lors de l'enregistrement des indisponibilités");
                }
                if (resp.data.data.length > 1) {
                    setUnavailabilities(unavailabilities.concat(resp.data.data));
                }
                else {
                    setUnavailabilities([...unavailabilities, resp.data.data]);
                }
                setLocalStorage('salon_default', [...unavailabilities, resp.data.data])
            }
        }
        // Réinitialisez l'état des dates sélectionnées
        setSelectedSlots([])
        setSelectedDates([]);
        setTimeState(false);

        // Réinitialisez la raison dans le champ de saisie
        setReason(""); // Réinitialisez la raison en vidant l'état local
    };

    // POUR AFFICHER LA LISTE DES COIFFEURS DU SALON
    const [showHairdresserDropdown, setShowHairdresserDropdown] = useState(false); // État local pour afficher ou masquer la dropdown
    const [mainContainerClass, setMainContainerClass] = useState("h-[800px]"); // Classe CSS par défaut

    // ------------------------------------------------------------------
    // For Tour
    const tourSteps: Steps[] = [
        {
            selector: '.button_establishment_unavailability',
            content: 'Ici, vous pouvez ajouter des indisponibilités à votre salon.',
        },
        {
            selector: '.button_hairdresser_unavailability',
            content: 'Et ici ceux de vos coiffeurs.',
        },
        {
            selector: '.button_calender',
            content: 'Sélectionner une date ou une plage de dates, où vous serez fermé.',
        },
        {
            selector: '.button_validate',
            content: 'Puis valider.',
        },
        {
            selector: '.button_display_absences',
            content: 'Pour voir les indisponibilités déjà programmées.',
        },
    ];

    const closeTour = async () => {
        // You may want to store in local storage or state that the user has completed the tour
        setIsLoading(true)
        if (!pageDone.includes('salon_unavailability')) {
            let resp = await salonApi.assignStepDone({ page: 'salon_unavailability' });
            removeFromLocalStorage('pages_done');
            setLocalStorage('pages_done', resp.data.pages_done);
            setPageDone((prevArray) => [...prevArray, 'salon_unavailability'])
        }
        setIsLoading(false);
    };
    // ------------------------------------------------------------------

    /************************************************************************************************************************** */

    return (

        <div className={`w-[500px] mb-2 bg-white rounded-2xl py-4 shadow-lg overflow-hidden z-50 ${mainContainerClass}`}>

            {isLoading && loadingView()}

            {/* For explaining the website */}
            {!pageDone.includes('salon_unavailability') &&
                <TourModal steps={tourSteps} onRequestClose={closeTour} />}

            {/* MODAL POUR AFFICHER LES PERIODES D'INDISPONIBILITE ENREGISTREES */}
            {
                showModal && (
                    <BaseModal
                        close={() => setShowModal(false)}
                    >
                        {/* Contenu du Modal ici. Assurez-vous que c'est un seul élément JSX ou un fragment */}
                        <CustomizedTable columns={columnsToDisplay} data={unavailabilities} cB={setUnavailabilities} />
                    </BaseModal>
                )
            }


            {/* Etablissement / Coiffeurs  */}
            <div className="flex justify-center items-center">
                <button
                    className={`text-xl font-semibold focus:outline-none mr-32 p-2 rounded-md button_establishment_unavailability ${selectedEntity === "Etablissement"
                        ? "bg-stone-800 text-white "
                        : "bg-white text-stone-800 hover:bg-stone-200"
                        }`}
                    onClick={() => handleEntityClick("Etablissement")} // Passer "Etablissement" en tant que chaîne de caractères
                >
                    Etablissement
                </button>
                <button
                    className={`text-xl font-semibold focus:outline-none p-2 rounded-md button_hairdresser_unavailability ${selectedEntity === "Coiffeurs"
                        ? "bg-stone-700 text-white "
                        : "bg-white text-stone-800 hover:bg-stone-200"
                        }`}
                    onClick={() => handleEntityClick("Coiffeurs")} // Passer "Coiffeurs" en tant que chaîne de caractères
                >
                    Coiffeurs
                </button>
                {/* Info icon  */}
                <div className="pr-4">
                    <InfoButton title_1={"Indisponibilités"} content_1={"Vous pouvez entrer ici les indisponibilités de votre salon ainsi que ceux de votre staff."} onOpenModal={undefined} />
                </div>
            </div>


            {/* Séparation */}
            <hr className=" mx-16 border-gray-300 h-4 mt-4 mb-4" />

            {/* SELECTION DU COIFFEUR SI "Coiffeurs" EST SELECTIONNE */}
            {showHairdresserDropdown && (
                // Contenu de la dropdown à afficher
                <>
                    <div className="flex justify-center items-center">
                        {/* Left-aligned Dropdown */}
                        <DropdownMenu
                            dropdownItems={hairdresserList} // Assurez-vous d'avoir une liste de coiffeurs à afficher
                            selectId="" // Assurez-vous de définir l'ID approprié ici
                            menuName="Coiffeurs"
                            fctToCallOnClick={(s: string) => setSelectedHD(s)}
                        />
                    </div>

                    {/* Séparation */}
                    <div>
                        <hr className="mx-16 border-gray-300 h-4 mt-4 mb-4" />
                    </div>
                </>
            )}


            {/* BOUTON POUR AFFICHER LES PERIODES d'INDISPONIBILITE*/}
            <div className="flex justify-center items-center mt-4 mb-4 button_display_absences">
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
                <div className="relative button_calender">
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

            {timeState && showHairdresserDropdown && (
                // console.log(timeState)
                <>
                    {selectedHD ? (

                        <div className="flex items-center justify-center gap-4 flex-wrap mt-4 w-full">
                            {slotList.map((slot, index) => {
                                return (
                                    slot
                                    && (
                                        <div
                                            key={index}
                                            className={`flex items-center justify-center py-2 px-2 text-base font-medium border-2 rounded-lg w-72 border-gray-200 cursor-pointer
                                            ${slot.status === 1 ? "bg-white text-black" : "bg-white text-black opacity-50"}
                                            ${selectedSlots && selectedSlots.includes(slot.id) ? "!bg-[#FFE7DF] !text-[#FF7143] !opacity-100" : ""}
                                            `}
                                            onClick={() => selectSlot(slot)}
                                        >
                                            {/* Horaires du créneau */}
                                            {slot.start} - {slot.end}
                                        </div>
                                    )
                                );
                            })}
                        </div>
                    ) : (
                        /* Message s'affichant en l'absence de coiffeur sélectionné */
                        <></>
                    )}
                </>
            )}

            {/* BOUTON POUR AFFICHER LES PÉRIODES D'INDISPONIBILITÉ */}
            <div className="flex justify-center items-center mt-10 mb-4">
                <button
                    className={`button_validate ${selectedDates.length > 0 ? Theme_A.button.medBlackColoredButton : `bg-gray-200 text-zinc-400 rounded-md cursor-not-allowed py-2 px-3  text-sm `} ${selectedDates.length === 0 ? 'cursor-not-allowed' : ''}`}
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
