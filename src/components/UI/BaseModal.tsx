import React from "react";
import '@/components/shared/index.css'
import { CrossIcon } from "../utilis/Icons";

interface ModalType {
    children: JSX.Element,
    close: () => void
    width?: string
}

const BaseModal = ({ children, close, width }: ModalType) => {
    return (
        <div className="relative">
            <div className="fixed top-0 left-0 h-full w-screen overflow-y-auto flex justify-center items-center">
                <div className="fixed top-0 left-0 h-full w-screen bg-black bg-opacity-40 cursor-pointer" onClick={close} />
                <div className="relative">
                    <div className="absolute -top-6 -right-7 z-50 flex items-center justify-center w-12 h-12 text-darkBlue font-semibold cursor-pointer rounded-xl bg-gradient-to-b from-pink-500 to-orange-500" onClick={close}>
                        <CrossIcon />
                    </div>
                    <div className={`bg-white rounded-xl max-h-full overflow-y-auto no-scrollbar px-8 py-12 ${width ? width : 'min-w-[470px]'}`}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BaseModal;
