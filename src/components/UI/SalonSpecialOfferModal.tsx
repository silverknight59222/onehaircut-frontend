// SpecialOfferModal.tsx
import React from 'react';
import BaseModal from './BaseModal'; // Assurez-vous que le chemin d'importation est correct

interface SpecialOfferModalProps {
    close: () => void;
}

const SpecialOfferModal: React.FC<SpecialOfferModalProps> = ({ close }) => {
    return (
        <BaseModal close={close} width="w-full max-w-4xl" opacity={30} >
            <div className="text-center p-6 rounded-lg bg-orange-50">
                <h2 className="text-3xl font-bold text-orange-600 mb-4">Pourquoi compléter l'enregistrement maintenant ?</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                    <div className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md bg-orange-300">
                        <h3 className="font-bold">Essai gratuit de 7 jours !</h3>
                        <p className="text-white">7-Day Free Trial</p>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md bg-orange-300">
                        <h3 className="font-bold">Les 10 premières créations sont gratuites !</h3>
                        <p className="text-white">10 free credits</p>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md bg-orange-300">
                        <h3 className="font-bold">50% de réduction</h3>
                        <p className="text-white">Rare 50% discount on all yearly plans!</p>
                        <div className="mt-2">
                            {/* Remplacez par un véritable compte à rebours */}
                            <p className="text-white">05 Jours 23 Heures 03 Mins 45 Secs</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md bg-orange-300">
                        <h3 className="font-bold">Obtenez un meilleur ROI, ou soyez remboursé.</h3>
                        <p className="text-white">Yes, we are that confident in our tech.</p>
                    </div>
                </div>

                <div className="flex justify-center mt-6">
                    <button
                        className="text-white bg-purple-600 hover:bg-purple-700 font-bold py-2 px-4 rounded"
                        onClick={close}
                    >
                        Upgrade to Paid
                    </button>
                    <button
                        className="text-white bg-gray-400 hover:bg-gray-500 font-bold py-2 px-4 rounded ml-4"
                        onClick={close}
                    >
                        Cancel Account
                    </button>
                </div>
            </div>
        </BaseModal>
    );
};

export default SpecialOfferModal;
