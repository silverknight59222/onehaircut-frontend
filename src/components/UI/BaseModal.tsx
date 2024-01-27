import React from "react";
import '@/components/shared/index.css';
import { CrossIcon } from "../utilis/Icons";
import { ColorsThemeA } from "../utilis/Themes";

interface ModalType {
    children: JSX.Element,
    close: () => void,
    width?: string,
    opacity?: number // Ajout de la nouvelle prop pour l'opacité
}

const BaseModal = ({ children, close, width, opacity = 40 }: ModalType) => { // Valeur par défaut de 20% pour l'opacité
    const overlayStyle = `fixed top-0 left-0 h-full w-screen bg-black cursor-pointer` + (opacity ? ` bg-opacity-${opacity}` : '');

    return (
        <div className="relative z-50">
            <div className="fixed top-0 left-0 h-full w-screen overflow-y-auto flex justify-center items-center">
                <div className={overlayStyle} onClick={close} />
                <div className="relative">
                    <div id="CrossIcon" className={`absolute -top-5 right-0 sm:-right-2 z-10 flex items-center justify-center w-12 h-12 text-darkBlue font-semibold cursor-pointer rounded-xl shadow-md ${ColorsThemeA.ohcVerticalGradient_A} transform transition-transform duration-300 hover:scale-75`} onClick={close}>
                        <CrossIcon />
                    </div>
                    <div className={`bg-white rounded-xl max-h-full overflow-y-auto no-scrollbar px-6 mx-4 md:px-8 py-6 ${width ? width : 'md:min-w-[470px]'}`}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BaseModal;
