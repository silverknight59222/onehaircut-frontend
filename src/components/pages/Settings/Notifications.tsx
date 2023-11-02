"use client";
import { CheckedIcon } from "@/components/utilis/Icons";
import React, { useEffect, useState } from "react";
import useSnackbar from "@/hooks/useSnackbar";
import { ColorsThemeA, Theme_A } from "@/components/utilis/Themes";
import BaseDropdown from "@/components/UI/BaseDropdown";
import { dashboard } from "@/api/dashboard";
import { getLocalStorage } from "@/api/storage";
import BaseModal from "@/components/UI/BaseModal";

const NotificationsSettings = () => {


    // TODO: get from the backend the value of isAutoExe and botPeriod
    // state to know if salon wants periodic bot execution
    const [isAutoExe, setisAutoExe] = useState(false)
    // state for knowing the execution periode of the bot
    const [isLoading, setIsLoading] = useState(false);
    const [isMobile, setIsMobile] = useState<string[]>([]);
    const [showNotificationModal, setShowNotificationModal] = useState(false);
    const [NotifReminderEmail, setPNotifReminderEmail] = useState(false);


    // display the field for the account modifications
    const modifReminderNotif: React.JSX.Element =
        <div>
            <div className="flex flex-col items-center justify-center gap-4">
                <p className="text-xl font-semibold text-black text-center">
                    Notifications concernants votre compte sont émises par</p>
                <div className="flex flex-row items-start gap-3">
                    <div
                        onClick={() => setPNotifReminderEmail(!NotifReminderEmail)}
                        className="flex items-center justify-start gap-3 mt-4 cursor-pointer"
                    >
                        <div className={`w-6 h-6 pt-2 pl-1.5 rounded-[4px] border ${NotifReminderEmail
                            ? ColorsThemeA.ohcVerticalGradient_A
                            : "border-[#767676]"
                            }`}
                        >
                            {NotifReminderEmail && (
                                <CheckedIcon width="15" height="10" />)}
                        </div>
                        <p>Emails</p>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex gap-4 items-center justify-center w-full">
                <button
                    className={`${Theme_A.button.mediumGradientButton}`}
                    onClick={() => ""}  >
                    Actualiser
                </button>
            </div>
        </div>;
    return (

        <div className={`w-[400px] h-max bg-white rounded-2xl py-4 shadow-lg`}>
            {showNotificationModal &&
                <BaseModal close={() => setShowNotificationModal(false)}>
                    <div>
                        Hello
                    </div>
                </BaseModal>
            }

            {/* NOTIFICATION DE NOUVELLE RESERVATION */}
            <p className={`${Theme_A.textFont.headerH2} my-5 justify-center`}>
                Notification de nouvelle réservation
            </p>
            <div className="flex flex-row justify-around italic">
                <p className="text-sm md:text-sm justify-center text-zinc-800  font-normal items-start my-1">
                    email
                </p>

            </div>
            <div className="flex flex-col items-center mt-4">
                <p
                    className={`w-max justify-center py-2 px-3 text-sm mb-6 ${Theme_A.button.medBlackColoredButton}`}
                    onClick={() => setShowNotificationModal(true)}
                >
                    Modifier
                </p>
            </div>
        </div >

    );
};

export default NotificationsSettings;