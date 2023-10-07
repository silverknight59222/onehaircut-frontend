import React, { FC } from "react";
import BaseModal from "@/components/UI/BaseModal";
import { ChatSendIcon } from "@/components/utilis/Icons";
import { Theme_A } from '@/components/utilis/Themes';
import { useRouter } from "next/navigation";


interface PerfSampleModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
}

const PerfSampleModal: FC<PerfSampleModalProps> = ({
    isModalOpen,
    closeModal,
}) => {

    return (
        <>
            {isModalOpen && (
                <BaseModal close={closeModal}>
                    <div className="flex flex-col gap-2">
                        <div className="text-center text-4xl">
                            <strong>Exemple de réalisations</strong>
                        </div>
                    </div>
                </BaseModal>
            )}
        </>
    );
};

export default PerfSampleModal;
