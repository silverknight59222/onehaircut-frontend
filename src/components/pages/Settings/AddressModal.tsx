import React from "react";
import '@/components/shared/index.css'
import { CrossIcon } from "@/components/utilis/Icons";
import { ColorsThemeA } from "@/components/utilis/Themes";

interface ModalType {
    children: JSX.Element,
    close: () => void
    width?: string
}

const BaseModal = ({ children, close, width }: ModalType) => {
    return (
        <div className="relative z-50"> {/* z-50 or more to make sure it is always on top */}
            <div className="fixed top-0 left-0 h-full w-screen overflow-y-auto flex justify-center items-center">

                <div className="fixed top-0 left-0 h-full w-screen bg-black bg-opacity-40 cursor-pointer" onClick={close} />
                <div className="relative">
                    <div className={`absolute -top-5 right-0 sm:-right-2 z-50 flex items-center justify-center w-12 h-12 text-darkBlue font-semibold cursor-pointer rounded-xl shadow-md ${ColorsThemeA.ohcVerticalGradient_A} transform transition-transform duration-300 hover:scale-75`} onClick={close}>
                        <CrossIcon />
                    </div>
                    <div className={`bg-white rounded-xl max-h-full overflow-y-auto no-scrollbar px-6 mx-4 md:px-8 py-6 ${width ? width : 'md:min-w-[470px]'}`}>
                        {children}
                    </div>

                    {/* Contenu du Modal Adresse */}

                    <div className="flex">
                        <div className="flex-1 py-5 pl-5 overflow-hidden">
                            <h1 className="inline text-2xl font-semibold leading-none">Adresse</h1>
                        </div>
                    </div>
                    <div className="px-5 pb-5">
                        <input placeholder="Name" className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" /><input placeholder="Address" className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" />
                        <div className="flex">
                            <div className="flex-grow w-1/4 pr-2"><input placeholder="PLZ" className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" /></div>
                            <div className="flex-grow"><input placeholder="City" className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" /></div>
                        </div>
                        <div className="flex items-center pt-3"><input type="checkbox" className="w-4 h-4 text-black bg-gray-300 border-none rounded-md focus:ring-transparent" /><label htmlFor="safeAdress" className="block ml-2 text-sm text-gray-900">Adresse de facturation</label></div>
                    </div>
                    <div className="flex">
                        <div className="flex-1 py-5 pl-5 overflow-hidden">
                            <h1 className="inline text-2xl font-semibold leading-none">Adresse de facturation</h1>
                        </div>
                        <div className="flex-none pt-2.5 pr-2.5 pl-1" />
                    </div>
                    <div className="px-5 pb-5">
                        <input placeholder="Name" className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" /><input placeholder="Address" className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" />
                        <div className="flex">
                            <div className="flex-grow w-1/4 pr-2"><input placeholder="PLZ" className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" /></div>
                            <div className="flex-grow"><input placeholder="City" className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400" /></div>
                        </div>
                    </div>
                    <hr className="mt-4" />
                    <div className="flex flex-row-reverse p-3">
                        <div className="flex-initial pl-3">
                            <button type="button" className="flex items-center px-5 py-2.5 font-medium tracking-wide text-white capitalize   bg-black rounded-md hover:bg-gray-800  focus:outline-none focus:bg-gray-900  transition duration-300 transform active:scale-95 ease-in-out">
                                <span className="pl-2 mx-1">Enregistrer</span>
                            </button>
                        </div>
                        <div className="flex-initial">
                            <button type="button" className="flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize rounded-md  hover:bg-red-200 hover:fill-current hover:text-red-600  focus:outline-none  transition duration-300 transform active:scale-95 ease-in-out">
                                <span className="pl-2 mx-1">Annuler</span>
                            </button>
                        </div>
                    </div>

                    {/* Fin du contenu du modal */}

                </div>
            </div>
        </div>
    );
};


export default BaseModal;
