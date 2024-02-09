// SpecialOfferModal.tsx
import React from 'react';
import BaseModal from './BaseModal'; // Assurez-vous que le chemin d'importation est correct
import { ColorsThemeA, Theme_A } from '../utilis/Themes';
import { useRouter } from "next/navigation";

interface SpecialOfferModalProps {
    close: () => void;
    proSalonCount: number;
}

const SpecialOfferModal: React.FC<SpecialOfferModalProps> = ({ close, proSalonCount }) => {
    const router = useRouter();

    return (
        <BaseModal close={close} width="w-full max-w-4xl" opacity={30} >
            <div className="text-center p-6 rounded-lg bg-orange-100">
                <h2 className={`text-3xl font-bold ${ColorsThemeA.OhcGradient_A} p-4 rounded-3xl text-white mb-12`}>
                    Pourquoi compléter l'enregistrement maintenant ?</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                    <div className="flex flex-col items-center justify-center p-4 rounded-2xl shadow-md bg-orange-200">
                        <h3 className="font-bold">Débutez, testez et perdurez sereinement avec notre version gratuite !</h3>
                        <p className={`${ColorsThemeA.textGradient_Title} font-semibold text-7xl`}>Gratuit !</p>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 rounded-2xl shadow-md bg-orange-200">
                        <h3 className="font-bold">Abonnement Pro offert pendant 6 mois pour les prochains 1000 salons</h3>
                        <p className="text-orange-500 font-semibold">
                            <span className={`${ColorsThemeA.textGradient_Title} font-semibold text-7xl`}>6 mois</span>
                            <p className={`${ColorsThemeA.textGradient_Title} font-semibold text-lg`}>  offert sur l'abonnement Pro!</p>
                        </p>

                        {/* TODO UPDATE WITH THE NUMBER OF SALON REGISTERED */}
                        <p className={`text-black font-semibold ${ColorsThemeA.OhcGradient_E}  rounded-2xl p-2`}>
                            <span className="text-sm">Vous êtes </span>
                            <span className="text-sm">{proSalonCount}/1000 !</span>

                        </p>

                    </div>

                    <div className="flex flex-col items-center justify-center p-4 rounded-2xl shadow-md bg-orange-200">
                        <h3 className="font-bold">Un Dashboard, des data et des conseils de notre IA permettant une réelle progression !</h3>
                        <div className="mt-2">
                            <p className={`${ColorsThemeA.textGradient_Title} font-semibold text-3xl`}>Votre Business, Amplifié !</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 rounded-2xl shadow-md bg-orange-200">
                        <h3 className="font-bold">Connectez-vous à la Réussite, sans engagement !</h3>
                        <p className={`${ColorsThemeA.textGradient_Title} font-semibold text-5xl`}>Maximisez</p>
                        <span className={`${ColorsThemeA.textGradient_Title} font-semibold text-lg`}> votre Visibilité !</span>
                    </div>


                </div>

                <div className="flex flex-col items-center justify-center p-4 rounded-2xl shadow-md bg-orange-200 mt-4">
                    <h3 className="font-bold">Une utilisation performante récompensée !</h3>
                    <p className={`${ColorsThemeA.textGradient_Title} font-semibold text-5xl`}>1 mois Pro offert !</p>
                    <span className={`${ColorsThemeA.textGradient_Title} font-semibold text-lg`}> toutes les 200 réservations obtenues!</span>
                </div>

                <div className="flex justify-evenly mt-12">
                    <button
                        className={`text-white ${Theme_A.button.medBlackColoredButton}`}
                        onClick={close}
                    >
                        Explorez les avantages
                    </button>

                    <button
                        className={`text-white ${Theme_A.button.mediumGradientButton}`}
                        onClick={() => router.push(`registration/plans`)}
                    >
                        Rejoignez-nous maintenant
                    </button>
                </div>
            </div>
        </BaseModal>
    );
};

export default SpecialOfferModal;
