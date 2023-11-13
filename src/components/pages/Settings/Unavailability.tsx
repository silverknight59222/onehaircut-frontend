import React, { useEffect, useState } from "react";
import { CalenderIcon } from "@/components/utilis/Icons";
import MultipleDatePicker from "@/components/UI/MultipleDatePicker";
import DropdownMenu from "@/components/UI/DropDownMenu";




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


    const onSelectedDate = (date: Date) => {
        setSelectedDate(date)
    }

    const handleRoleClick = (role: string) => {
    };

    const initialDays: Date[] = [];
    const [days, setDays] = React.useState<Date[] | undefined>(initialDays);

    const footer =
        days && days.length > 0 ? (
            <p>You selected {days.length} day(s).</p>
        ) : (
            <p>Please pick one or more days.</p>
        );

    const renderEntityContent = () => {
        return (
            <React.Fragment> {/* Utilisez React.Fragment comme élément racine */}
                <div className="relative mb-3 flex items-center justify-center pt-1 w-full">
                    <h4 className="text-xl font-bold text-navy-700 mt-4">
                        Sélectionne une date ou une période
                    </h4>
                </div>


                <div className="cursor-pointer hover:scale-110 transition duration-300 " onClick={() => setShowCalender(!showCalender)}>
                    <CalenderIcon />
                </div>
                {showCalender &&
                    <div className="shadow-lg">
                        {showCalender &&
                            <MultipleDatePicker
                                selectedDates={selectedDates}
                                onSelect={onDatesSelect}
                                close={() => setShowCalender(false)}
                            />
                        }
                    </div>
                }

            </React.Fragment>
        );
    };


    //For Dropdown lists Type of salon
    const EntityList = [
        "Etablissement",
        "Personnel",
    ];

    const HandleSelectedEntity = (item: string) => {
    };

    return (

        <div className="w-[500px] h-[800px] bg-white rounded-2xl py-4 shadow-lg overflow-hidden">


            {/* Etablissement / Personnel  */}
            <div className="flex justify-center items-center">
                <button
                    className={`text-xl font-semibold focus:outline-none mr-32 p-2 rounded-md ${selectedEntity === "Etablissement"
                        ? "bg-stone-700 text-white "
                        : "bg-white text-stone-800 hover:bg-stone-200"
                        }`}
                    onClick={() => handleRoleClick("Etablissement")} // Passer "Etablissement" en tant que chaîne de caractères
                >
                    Etablissement
                </button>
                <button
                    className={`text-xl font-semibold focus:outline-none p-2 rounded-md ${selectedEntity === "Personnel"
                        ? "bg-stone-700 text-white "
                        : "bg-white text-stone-800 hover:bg-stone-200"
                        }`}
                    onClick={() => handleRoleClick("Personnel")} // Passer "Personnel" en tant que chaîne de caractères
                >
                    Personnel
                </button>

            </div>

            {/* Séparation */}
            <hr className=" mx-16 border-gray-300 h-4 mt-4" />

            {/* AFFICHAGE DU DATEPICKER  ET DE LA TATE CHOISI */}
            {renderEntityContent()}

        </div>

    );
};

export default Unavailability;
