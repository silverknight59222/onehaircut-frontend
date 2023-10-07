"use client";
import { CheckedIcon, LogoCircleFixRight } from "@/components/utilis/Icons";
import DashboardLayout from "@/layout/DashboardLayout";
import React, { useEffect, useState } from "react";
import { HairdresserSlots } from "./HairdresserSlots";
import userLoader from "@/hooks/useLoader";
import useSnackbar from "@/hooks/useSnackbar";
import { getLocalStorage } from "@/api/storage";
import { dashboard } from "@/api/dashboard";
import { SalonDetails } from "@/types";
import SlotDropdown from "./SlotsDropdown";
import Footer from "@/components/UI/Footer";
import { Theme_A } from "@/components/utilis/Themes";
export interface OpenTimes {
    available: boolean;
    day: string;
    end: string;
    start: string;
}
[];
interface SalonwithSlots extends SalonDetails {
    openTimes: OpenTimes[];
}
const OpenningHours = () => {
    const { loadingView } = userLoader();
    const showSnackbar = useSnackbar();
    const [isLoading, setIsLoading] = useState(false);
    const [activeMenu, setActiveMenu] = useState("salon-time");
    const [avaiableDays, setAvailableDays] = useState<string[]>([]);
    const [salonSlots, setSalonSlots] = useState<OpenTimes[]>([]);
    const [updatedSlots, setUpdatedSlots] = useState<OpenTimes[]>([]);
    const [salonId, setSalonId] = useState(0);
    const [disableUpdate, setDisableUpdate] = useState(true);
    const setHairSalonSlotList = (data: SalonwithSlots[]) => {
        let hairSalon;
        if (data.length > 1) {
            data.forEach((salon) => {
                if (salon.is_primary) {
                    hairSalon = salon;
                }
            });
        } else {
            hairSalon = data[0];
        }

        if (hairSalon) {
            setSalonId(hairSalon.id);
            setSalonSlots(hairSalon.openTimes);
            setUpdatedSlots(hairSalon.openTimes);
            hairSalon.openTimes.forEach((time) => {
                if (time.available) {
                    setAvailableDays((prev) => [...prev, time.day]);
                }
            });
        }
    };
    const getHairSalonSlot = async () => {
        const user = getLocalStorage("user");
        const userId = user ? Number(JSON.parse(user).id) : null;
        if (userId) {
            setIsLoading(true);
            await dashboard.getAllHairSalons(userId).then((resp) => {
                if (resp.data.data.length) {
                    setHairSalonSlotList(resp.data.data);
                }
                setIsLoading(false);
            });
        }
    };
    const getUpdatedSlots = (slots: OpenTimes[]) => {
        let disable = false;
        slots.forEach((slot) => {
            if (Number(slot.start.split(":")[0]) >= Number(slot.end.split(":")[0])) {
                disable = true;
                setDisableUpdate(true);
            }
        });
        if (disable === false) {
            setDisableUpdate(false);
        }
        setUpdatedSlots(slots);
    };
    const checkboxClickHandler = (item: OpenTimes) => {
        let updatedtime: OpenTimes[] = [];
        updatedSlots.forEach((slot) => {
            if (slot.day === item.day) {
                let data: OpenTimes = {
                    day: "",
                    start: "",
                    end: "",
                    available: false,
                };
                data.day = item.day;
                data.start = item.start;
                data.end = item.end;
                data.available = !item.available;
                if (avaiableDays.includes(item.day) && data.available === false) {
                    setAvailableDays(() =>
                        avaiableDays.filter((day) => day !== item.day)
                    );
                } else if (
                    !avaiableDays.includes(item.day) &&
                    data.available === true
                ) {
                    setAvailableDays((prev) => [...prev, item.day]);
                }
                updatedtime.push(data);
            } else {
                updatedtime.push(slot);
            }
        });
        setDisableUpdate(false);
        setUpdatedSlots(updatedtime);
    };
    const updateSlots = async () => {
        if (!disableUpdate) {
            setIsLoading(true);
            const data = {
                openTimes: updatedSlots,
            };
            await dashboard
                .updateSalonTiming(salonId, data)
                .then((resp) => {
                    getHairSalonSlot();
                    setDisableUpdate(true);
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
        getHairSalonSlot();
    }, []);
    return (
        <div>
            {isLoading && loadingView()}
            <div className="flex items-center flex-col justify-center gap-2 w-max">
                {!isLoading && (
                    <div className="max-w-[750px] flex items-center justify-center text-center px-9 py-6 mb-3 gap-8 rounded-2xl bg-white text-xl font-light text-[#ABABAB] shadow-lg">
                        <p
                            className={`cursor-pointer text-black  px-2 py-2 rounded-md hover:bg-stone-100 hover:text-black ${activeMenu === "salon-time" &&
                                " bg-black text-white font-medium"
                                }`}
                            onClick={() => setActiveMenu("salon-time")}
                        >
                            Horaires d’ouverture
                        </p>
                        <p
                            className={`cursor-pointer text-black px-2 py-2 rounded-md hover:bg-stone-100  hover:text-black ${activeMenu === "salon-dressers" &&
                                " bg-black text-white font-medium"
                                }`}
                            onClick={() => setActiveMenu("salon-dressers")}
                        >
                            Horaires des coiffeurs
                        </p>
                    </div>
                )}
                {activeMenu === "salon-time" && !isLoading && (
                    <>
                        <div className="relative flex items-center justify-start z-10 w-[22rem] md:w-[620px] md:pl-auto overflow-auto py-12 px-7 bg-white rounded-2xl shadow-[3px_3px_10px_-1px_rgba(0,0,0,0.30)]">
                            <table>
                                <tbody>
                                    <tr className="flex items-center justify-center">
                                        <td className="flex flex-col gap-12 pr-3 md:pr-5">
                                            {updatedSlots.map((item, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        onClick={() => checkboxClickHandler(item)}
                                                        className="flex items-center gap-5 cursor-pointer"
                                                    >
                                                        <div
                                                            className={`w-6 h-6 pt-2 pl-1.5 rounded-[4px] border ${avaiableDays.includes(item.day)
                                                                ? "bg-gradient-to-b from-pink-500 to-orange-500 border-white"
                                                                : "border-[#767676]"
                                                                }`}
                                                        >
                                                            <CheckedIcon width="15" height="10" />
                                                        </div>
                                                        <p className="text-sm md:text-md font-normal text-[#767676]">
                                                            {item.day}
                                                        </p>
                                                    </div>
                                                );
                                            })}
                                        </td>
                                        <td className="flex flex-col gap-8 border-l border-[rgba(171,171,171,0.20)] px-3 md:px-5">
                                            <SlotDropdown
                                                selectedItem={updatedSlots}
                                                getUpdatedSlots={getUpdatedSlots}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="flex w-full items-center justify-end mt-14">
                                            <div className="flex items-center justify-center rounded-xl text-lg">
                                                <p
                                                    onClick={updateSlots}
                                                    className={`py-2 px-3  text-sm ${!disableUpdate
                                                        ? Theme_A.button.mediumGradientButton
                                                        : "bg-gray-200 text-zinc-400 rounded-md cursor-not-allowed"
                                                        }`}
                                                >
                                                    Appliquer les changements
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
                {activeMenu === "salon-dressers" && !isLoading && (
                    <div className="relative flex items-center justify-center w-[22rem] md:w-[810px] z-10 overflow-auto py-12 px-7 bg-white rounded-2xl shadow-[3px_3px_10px_-1px_rgba(0,0,0,0.30)]">
                        <HairdresserSlots />
                    </div>
                )}
            </div>
        </div>
    );
};

export default OpenningHours;
