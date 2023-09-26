import { dashboard } from "@/api/dashboard";
import { getLocalStorage } from "@/api/storage";
import react, { useEffect, useState } from "react";
import userLoader from "@/hooks/useLoader";
import useSnackbar from "@/hooks/useSnackbar";
import BaseMultiSelectbox from "@/components/UI/BaseMultiSelectbox";
import { CheckedIcon, DownArrow } from "@/components/utilis/Icons";
import React from "react";
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

export const HairdresserSlots = () => {
  const { loadingView } = userLoader();
  const showSnackbar = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [hairdressersList, setHairdressersList] = useState<
    HairdressersWithSlots[]
  >([]);
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

  useEffect(() => {
    document.addEventListener("click", closeSelectBox);
    return () => {
      document.removeEventListener("click", closeSelectBox);
    };
  }, []);
  useEffect(() => {
    checkboxClickHandler(selectedItems);
  }, [selectedItems]);
  const getAllHairDresser = async () => {
    const user = getLocalStorage("user");
    const userId = user ? Number(JSON.parse(user).id) : null;
    if (userId) {
      setIsLoading(true);
      await dashboard.getAllHairDressers(userId).then((resp) => {
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
      }).catch(()=>{}).finally(()=>{
        setIsLoading(false);
      });
    }
  };
  const getSelectedHairdresser = (item: string) => {
    hairdressersList.forEach((hairdresser) => {
      if (hairdresser.name === item) {
        setSelectedSalonHairDresser(hairdresser);
      }
    });
  };

  const selectSlot = (slot: HairdresserSlot) => {
    if (selectedSlots?.includes(slot.id)) {
      setSelectedSlots(selectedSlots.filter((item) => item !== slot.id));
    } else {
      setSelectedSlots((prev) => [...prev, slot.id]);
    }
  };
  const ChangeStatus = async (status: string) => {
    if (selectedSlots.length > 0) {
      setIsLoading(true);
      let data: any = {};
      if (status === "available") {
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
  useEffect(() => {
    getAllHairDresser();
  }, []);

  return (
    <div className="w-full h-full">
      {isLoading && loadingView()}
      {!isLoading && (
        <div className="gap-7 w-full h-[700px] overflow-auto">
          <div className="block rounded-2xl border-2 border-gray-200 w-full h-full overflow-auto px-6 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between my-2 w-full gap-3 mb-3">
              <div>
                <div
                  ref={dropdownRef}
                  className={`relative ${
                    selectedSalonHairDresser.id ? "w-40" : "w-60"
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
                      : "Select hairdresser"}
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
                              className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5  ${
                                selectedSalonHairDresser.name === item.name
                                  ? "bg-gradient-to-b from-pink-500 to-orange-500"
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
              </div>
              {selectedSalonHairDresser.id > 0 && (
                <div className="flex items-center justify-center gap-4 rounded-2xl text-lg">
                  <div
                    onClick={() => ChangeStatus("available")}
                    className={`py-3 px-4 rounded-2xl  text-sm ${
                      selectedSlots.length > 0
                        ? "bg-gradient-to-b from-pink-500 to-orange-500 text-white cursor-pointer"
                        : "bg-gray-200 text-black cursor-default"
                    }`}
                  >
                    Be Available
                  </div>
                  <div
                    onClick={() => ChangeStatus("unavailable")}
                    className={`py-3 px-4 rounded-2xl  text-sm ${
                      selectedSlots.length > 0
                        ? "bg-gradient-to-b from-pink-500 to-orange-500 text-white cursor-pointer"
                        : "bg-gray-200 text-black cursor-default"
                    }`}
                  >
                    Be Unavailable
                  </div>
                </div>
              )}
            </div>
            {selectedSalonHairDresser.id ? (
              <div className="flex items-center justify-center gap-4 flex-wrap mt-4 w-full">
                {selectedSalonHairDresser.slots.map((slot, index) => {
                  return (
                    <div
                      key={index}
                      className={`flex items-center justify-center py-2 px-3 text-basefont-medium border-2 rounded-xl w-40 border-gray-200 cursor-pointer
                      ${slot.status === 1 && "bg-white text-black"}
                        ${
                          slot.status === 0 && "bg-white text-black opacity-50"
                        } 
                        ${
                          selectedSlots &&
                          selectedSlots.includes(slot.id) &&
                          "!bg-[#FFE7DF] !text-[#FF7143] !opacity-100"
                        }`}
                      onClick={() => selectSlot(slot)}
                    >
                      {slot.start} - {slot.end}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className=" my-16">
                The time slots of selected hairdresser will show here
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
