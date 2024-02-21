"use client";
import { CheckedIcon } from "@/components/utilis/Icons";
import React, { useEffect, useState } from "react";
import { HairdresserSlots } from "./HairdresserSlots";
import userLoader from "@/hooks/useLoader";
import useSnackbar from "@/hooks/useSnackbar";
import { getLocalStorage, removeFromLocalStorage, setLocalStorage } from "@/api/storage";
import { dashboard } from "@/api/dashboard";
import { SalonDetails } from "@/types";
import SlotDropdown from "./SlotsDropdown";
import Footer from "@/components/UI/Footer";
import { Theme_A } from "@/components/utilis/Themes";
import { ColorsThemeA } from "@/components/utilis/Themes";
import InfoButton from "@/components/UI/InfoButton";
import TourModal, { Steps } from "@/components/UI/TourModal";
import { salonApi } from "@/api/salonSide";
import AudioPlayerForTour from "@/components/UI/PlayerForTour";
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
    const [pageDone, setPageDone] = useState<String[]>(['salon_opening_hours']);
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
        const pages_done = getLocalStorage('pages_done')
        setPageDone(pages_done ? JSON.parse(pages_done) : [])
        console.log(pages_done)
    }, []);

    // ------------------------------------------------------------------
    // For Tour
    const tourContent_1 =
        // key needed to have React updating the audio with the step
        <div key="/assets/audio/tour/salon/Settings-Horaires_men_1.mp3">
            <AudioPlayerForTour src="/assets/audio/tour/salon/Settings-Horaires_men_1.mp3" />
            <p>Dans cette partie, vous pouvez paramétrer les horaires de votre établissement.</p>
        </div>

    const tourContent_2 =
        <div key="/assets/audio/tour/salon/Settings-Horaires_men_2.mp3">
            <AudioPlayerForTour src="/assets/audio/tour/salon/Settings-Horaires_men_2.mp3" />
            <p>Ici les horaires des coiffeurs de votre salon.</p>
        </div>

    const tourContent_3 =
        <div key="/assets/audio/tour/salon/Settings-Horaires_men_3.mp3">
            <AudioPlayerForTour src="/assets/audio/tour/salon/Settings-Horaires_men_3.mp3" />
            <p>En sélectionnant un jour, vous indiquerez que votre salon est ouvert pour ce jour.</p>
        </div>

    const tourContent_4 =
        <div key="/assets/audio/tour/salon/Settings-Horaires_men_4.mp3">
            <AudioPlayerForTour src="/assets/audio/tour/salon/Settings-Horaires_men_4.mp3" />
            <p>Vous rentrez ici les horaires d'ouverture du jour correspondant.</p>
        </div>

    const tourContent_5 =
        <div key="/assets/audio/tour/salon/Settings-Horaires_men_5.mp3">
            <AudioPlayerForTour src="/assets/audio/tour/salon/Settings-Horaires_men_5.mp3" />
            <p>N'oubliez pas de valider vos modifications.</p>
        </div>

    const tourSteps: Steps[] = [
        {
            selector: '.button_openings',
            content: tourContent_1,
        },
        {
            selector: '.button_hairdresser_available',
            content: tourContent_2,
        },
        {
            selector: '.checkbox_days',
            content: tourContent_3,
        },
        {
            selector: '.dropbox_time',
            content: tourContent_4,
        },
        {
            selector: '.button_validate',
            content: tourContent_5,
        },
    ];


    const closeTour = async () => {
        // You may want to store in local storage or state that the user has completed the tour
        setIsLoading(true)
        if (!pageDone.includes('salon_opening_hours')) {
            let resp = await salonApi.assignStepDone({ page: 'salon_opening_hours' });
            if (resp.data?.pages_done) {
                setLocalStorage('pages_done', JSON.stringify(resp.data.pages_done));
            }
            setPageDone((prevArray) => [...prevArray, 'salon_opening_hours'])
        }
        setIsLoading(false);
    };
    // ------------------------------------------------------------------

    /************************************************************************************************************************** */

    return (
        <div>
            {isLoading && loadingView()}

            {/* For explaining the website */}
            <TourModal steps={tourSteps} onRequestClose={closeTour} doneTour={pageDone.includes('salon_opening_hours')} />

            <div className="flex items-center flex-col justify-center w-max mb-4">
                {!isLoading && (
                    <div className="w-[580px] flex   text-center  md:px-1 lg:justify-evenly py-6 mb-3 gap-8 rounded-2xl bg-white text-lg font-light shadow-lg">
                        <p
                            className={`cursor-pointer text-black  px-2 py-2 rounded-md hover:bg-stone-100 hover:text-black ${activeMenu === "salon-time" &&
                                " bg-black text-white font-medium button_openings"
                                }`}
                            onClick={() => setActiveMenu("salon-time")}
                        >
                            Horaires d’ouverture
                        </p>
                        <p
                            className={`cursor-pointer text-black px-2 py-2 rounded-md hover:bg-stone-100  hover:text-black button_hairdresser_available ${activeMenu === "salon-dressers" &&
                                " bg-black text-white font-medium "
                                }`}
                            onClick={() => setActiveMenu("salon-dressers")}
                        >
                            Horaires des coiffeurs
                        </p>

                        {/* Info icon  */}
                        <div className="pr-4">
                            <InfoButton title_1={"Horaires"} content_1={"Vous pouvez configurer ici les horaires d'ouverture de votre salon ainsi que les disponibilités de vos coiffeurs."} onOpenModal={undefined} />
                        </div>
                    </div>
                )}
                {activeMenu === "salon-time" && !isLoading && (
                    <>
                        <div className="relative flex items-center justify-start z-10 w-[22rem] md:w-[580px] md:pl-auto overflow-auto py-12 px-7 bg-white rounded-2xl shadow-[3px_3px_10px_-1px_rgba(0,0,0,0.30)]">
                            <table>
                                <tbody>
                                    <tr className="flex items-center justify-center">
                                        <td className="flex flex-col gap-12 pr-3 md:pr-5 checkbox_days">
                                            {updatedSlots.map((item, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        onClick={() => checkboxClickHandler(item)}
                                                        className="flex items-center gap-5 cursor-pointer"
                                                    >
                                                        <div
                                                            className={`w-6 h-6 pt-2 pl-1.5 rounded-[4px] border ${avaiableDays.includes(item.day)
                                                                ? ` ${ColorsThemeA.ohcVerticalGradient_A} border-white`
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
                                        <td className="flex flex-col gap-8 border-l border-[rgba(171,171,171,0.20)] px-2 md:px-3 dropbox_time">
                                            <SlotDropdown
                                                selectedItem={updatedSlots}
                                                getUpdatedSlots={getUpdatedSlots}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="flex w-full items-center justify-end mt-14">
                                            <div className="flex items-center justify-center rounded-xl text-lg button_validate">
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
