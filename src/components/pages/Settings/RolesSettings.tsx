import React, { useEffect, useState } from "react";
import BaseModal from "@/components/UI/BaseModal";

const RolesSettings = () => {
    const [showModal, setShowModal] = useState(false); // Initialize showModal state

    return (
        <div className={`w-[400px] h-max bg-white rounded-2xl py-4 shadow-lg`}>
            {showModal && (
                <BaseModal close={() => setShowModal(false)}>
                    {/* Add content for the modal here  - NO NEED IF NO MODAL*/}
                    <p>This is the modal content.</p>
                </BaseModal>
            )}
        </div>
    );
};

export default RolesSettings;
