import { dashboard } from "@/api/dashboard";
import { getLocalStorage } from "@/api/storage";
import react, { useEffect, useState } from "react";
import userLoader from "@/hooks/useLoader";
import useSnackbar from "@/hooks/useSnackbar";
import BaseMultiSelectbox from "@/components/UI/BaseMultiSelectbox";
import { CheckedIcon, DownArrow } from "@/components/utilis/Icons";
import React from "react";
import { Theme_A } from "@/components/utilis/Themes";
import { ColorsThemeA } from "@/components/utilis/Themes";
import DropdownMenu from "@/components/UI/DropDownMenu";

// Define the types/interfaces for the data
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

// Define the HairdresserSlots component
export const HairdresserSlots = () => {
  // Using hooks and declaring the component's state
  const { loadingView } = userLoader();
  const showSnackbar = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [hairdressersList, setHairdressersList] = useState<
    HairdressersWithSlots[]
  >([]);
  const [hairdresserNames, setHairdresserNames] = useState<string[]>();
  const[day, setDay] = useState('');
  const [selectedWeekday, setSelectedWeekday] = useState<string>('');
  const [selectedHairdresser, setSelectedHairdresser] = useState<string>('');

  // An example of state with a default hairdresser to initialize the state
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
  const [selectedSalonHairDresser, setSelectedSalonHairDresser] =
    useState<HairdressersWithSlots>(defaultHairDresser);
  const [isDropdown, setIsDropdown] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string>("");
  const dropdownRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const checkboxClickHandler = (value: string) => {
    if (selectedItems === value) {
      setSelectedItems(() => "");
    } else {
      setSelectedItems(value);
    }
  };
  const closeSelectBox = ({ target }: MouseEvent): void => {
    if (!dropdownRef.current?.contains(target as Node)) {
      setIsDropdown(false);
    }
  };

  const Weekday = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];

  const handleSelectWeekday = (item: string) => {
    switch(item) {
      case 'Dimanche':
        setDay("Sunday");
        break;
      case 'Lundi':
        setDay("Monday");
        break;
      case 'Mardi':
        setDay("Tuesday");
        break;
      case 'Mercredi':
        setDay("Wednesday");
        break;
      case 'Jeudi':
        setDay("Thursday");
        break;
      case 'Vendredi':
        setDay("Friday");
        break;
      case 'Samedi':
        setDay("Saturday");
        break;
    }
    setSelectedWeekday(item);
  } 

  // Use useEffect to attach/detach click event to document
  useEffect(() => {
    document.addEventListener("click", closeSelectBox);
    return () => {
      document.removeEventListener("click", closeSelectBox);
    };
  }, []);

  // Another use of useEffect to handle changes in `selectedItems`
  useEffect(() => {
    checkboxClickHandler(selectedItems);
  }, [selectedItems]);
  
  const getAllHairDresser = async () => {
    const user = getLocalStorage("user");
    const userId = user ? Number(JSON.parse(user).id) : null;
    const salonId = Number(getLocalStorage('salon_id'));
    if (userId) {
      setIsLoading(true);
      await dashboard.getAllHairDressers(salonId).then((resp) => {
        if (selectedSalonHairDresser.name) {
          const Hairdresser = selectedSalonHairDresser.name;
          setSelectedSalonHairDresser(defaultHairDresser);
          setSelectedSlots([]);
          setHairdressersList([]);
          setHairdressersList(resp.data.data);
          setSelectedSalonHairDresser(
            resp.data.data.filter(
              (dresser: HairdressersWithSlots) => dresser.name === Hairdresser
            )[0]
          );
        } else {
          setHairdressersList(resp.data.data);
        }
        setHairdresserNames(hairdressersList.map((item) => item.name));
      }).catch(() => { }).finally(() => {
        setIsLoading(false);
      });
    }
  };

  // Function to get a specific hairdresser
  const getSelectedHairdresser = (item: string) => {
    hairdressersList.forEach((hairdresser) => {
      if (hairdresser.name === item) {
        setSelectedSalonHairDresser(hairdresser);
      }
    });
    setSelectedHairdresser(item);
  };

  // Function to select a slot
  const selectSlot = (slot: HairdresserSlot) => {
    if (selectedSlots?.includes(slot.id)) {
      setSelectedSlots(selectedSlots.filter((item) => item !== slot.id));
    } else {
      setSelectedSlots((prev) => [...prev, slot.id]);
    }
  };

  // Function to change the status of a slot
  const ChangeStatus = async (status: string) => {
    if (selectedSlots.length > 0) {
      setIsLoading(true);
      let data: any = {};
      if (status === "Disponible") {
        data.status = 1;
      } else {
        data.status = 0;
      }
      data.slot_ids = selectedSlots;
      setSelectedSlots([]);
      await dashboard
        .updateSalonSlot(data)
        .then((resp) => {
          getAllHairDresser();
          showSnackbar("success", resp.data.message);
        })
        .catch((err) => {
          showSnackbar("error", "Error Occured!");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  // Use useEffect to load hairdressers when the component mounts
  useEffect(() => {
    getAllHairDresser();
  }, []);

  return (
    <div className="w-full h-full">
      {isLoading && loadingView()}
      {/* Bloc principal */}
      {!isLoading && (
        <div className="gap-7 w-full h-[700px] overflow-auto">

          {/* Bloc englobant pour les créneaux horaires des coiffeurs */}
          <div className="block rounded-2xl border-2 border-gray-200 w-full h-full overflow-auto px-6 py-4">

            {/* Première ligne : Section de sélection et boutons d'actions */}
            <div className="flex flex-col md:flex-row items-center justify-between my-2 w-full gap-3 mb-3">

              {/* Boîte de sélection du coiffeur */}
              {/* <div>
                <div
                  ref={dropdownRef}
                  className={`relative ${selectedSalonHairDresser.id ? "w-40" : "w-60"
                    }`}
                >
                  <button
                    onClick={() => setIsDropdown(!isDropdown)}
                    className={
                      selectedItems.length
                        ? "flex items-center justify-center gap-8 font-medium rounded-xl h-[52px] pl-3 pr-4 bg-gray-400 text-white shadow-[0px_15px_18px_0px_rgba(0, 0, 0, 0.14)]"
                        : "flex items-center justify-center gap-8 bg-[#F7F7F7] font-medium rounded-xl h-[52px] pl-3 pr-4 shadow-[0px_15px_18px_0px_rgba(0, 0, 0, 0.14)]"
                    }
                  >
                    {selectedSalonHairDresser.name
                      ? selectedSalonHairDresser.name
                      : "Selectionner un coiffeur"}
                    <DownArrow
                      color={selectedItems.length ? "white" : "#000"}
                    />
                  </button>

                  {isDropdown && (
                    <div className="mt-2 z-10 absolute w-full rounded-xl border border-checkbox bg-white p-6">
                      {hairdressersList.map((item, index) => {
                        return (
                          <div
                            key={index}
                            onClick={() => getSelectedHairdresser(item.name)}
                            className="flex cursor-pointer mb-[19px]"
                          >
                            <div
                              className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5  ${selectedSalonHairDresser.name === item.name
                                ? `${ColorsThemeA.ohcVerticalGradient_A}`
                                : "bg-[#D6D6D6]"
                                }`}
                            >
                              <CheckedIcon />
                            </div>
                            <p className="ml-2">{item.name}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div> */}
              <div className="flex items-center justify-center gap-4 rounded-2xl text-lg">
                <DropdownMenu dropdownItems={hairdressersList.map((item) => item.name)} fctToCallOnClick={getSelectedHairdresser} menuName="Hairdresser" selectId={selectedHairdresser}/>
              </div>
              {selectedSalonHairDresser.id > 0 && (
                <div className="flex items-center justify-center gap-4 rounded-2xl text-lg">
                  <DropdownMenu dropdownItems={Weekday} fctToCallOnClick={handleSelectWeekday} menuName="Weekday" selectId={selectedWeekday}/>
                </div>
              )}

              {/* Boutons pour changer le statut des créneaux horaires, s'affichent seulement si un coiffeur est sélectionné */}
              
            </div>

            {/* Affichage des créneaux horaires */}
            {selectedSalonHairDresser.id ? (
              <div className="flex items-center justify-center gap-4 flex-wrap mt-4 w-full">
                {selectedSalonHairDresser.slots.map((slot, index) => {
                  return (
                    slot.day == day && slot.status === 1 &&
                    <div
                      key={index}
                      className={`flex items-center justify-center py-2 px-2 text-basefont-medium border-2 rounded-lg w-72 border-gray-200 cursor-pointer
                      ${slot.status === 1 && "bg-white text-black"}
                        ${slot.status === 0 && "bg-white text-black opacity-50"
                        } 
                        ${selectedSlots &&
                        selectedSlots.includes(slot.id) &&
                        "!bg-[#FFE7DF] !text-[#FF7143] !opacity-100"
                        }`}
                      onClick={() => selectSlot(slot)}
                    >

                      {/* Horaires du créneau */}
                      {slot.start} - {slot.end}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Message s'affichant en l'absence de coiffeur sélectionné */
              < div className=" my-16">

                Les plages horaires du coiffeur sélectionné s'afficheront ici
              </div>
            )}
            {selectedSalonHairDresser.id > 0 && (
                <div className="flex items-center justify-center gap-4 rounded-2xl text-lg mt-5">

                  {/* Bouton pour marquer les créneaux comme disponibles */}
                  <div
                    onClick={() => ChangeStatus("Disponible")}
                    className={`py-3 px-4 rounded-lg text-sm ${selectedSlots.length > 0
                      ? `${Theme_A.button.mediumGradientButton}`
                      : "bg-gray-200 text-black cursor-default"
                      }`}
                  >
                    Etre disponible
                  </div>
                  <div
                    onClick={() => ChangeStatus("Non disponible")}
                    className={`py-3 px-4 rounded-lg text-sm ${selectedSlots.length > 0
                      ? `${Theme_A.button.medWhiteColoredButton}`
                      : "bg-gray-200 text-black cursor-default"
                      }`}
                  >
                    Etre indisponible
                  </div>

                  {/* Bouton pour marquer les créneaux comme non disponibles */}
                </div>
              )}
          </div>
        </div>
      )
      }
    </div >
  );
};
