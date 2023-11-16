import React, { FC, useState } from "react";
import BaseModal from "@/components/UI/BaseModal";
import { Theme_A } from '@/components/utilis/Themes';
import { useRouter } from "next/navigation";
import { LeftArrowIcon, RightArrowIcon } from "@/components/utilis/Icons";


interface PerfSampleModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
    images: { image: string }[];
}

const PerfSampleModal: FC<PerfSampleModalProps> = ({
    isModalOpen,
    closeModal,
    images,
}) => {
    const [thumbnailIndex, setThumbnailIndex] = useState(0);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    
    let fileteredHairStyleImages = [];
   
    // Filtering image for hairstyle model
    images.filter((image) => image.type == 'hairstyle').map((filteredElement, idx) => (
        fileteredHairStyleImages.push(filteredElement)
    ));
    
    // Passer à la vignette suivante
    const nextThumbnail = () => {
        setThumbnailIndex((prev) => (prev + 4 < images.length ? prev + 1 : prev));
    };

    // Passer à la vignette précédente
    const prevThumbnail = () => {
        setThumbnailIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };

    return (
        <>
            {isModalOpen && (
                // BaseModal contient toute la logique de rendu et les styles de base pour le modal
                <BaseModal close={closeModal}>
                    {/* 
                    Le div principal qui contient tout le contenu du modal
                    Il est stylisé pour avoir une hauteur et une largeur définies et être centré horizontalement.
                    */}
                    <div className="flex flex-col gap-2 h-[80vh] w-[70vw] mx-auto relative">
                        {/* Texte titre du modal */}
                        <div className="text-center text-4xl mb-4">
                            <strong>Exemple de réalisations</strong>
                        </div>

                        {/* Conteneur de l'image principale avec un fond noir */}
                        <div className="w-full h-[65vh] relative bg-black">
                            {/* 
                            Image principale
                            Elle est centrée et redimensionnée pour s'adapter au conteneur tout en conservant son aspect.
                            */}
                            <img
                                src={(fileteredHairStyleImages[mainImageIndex]?.image.includes('http')
                                    ? fileteredHairStyleImages[mainImageIndex]?.image
                                    : `https://api.onehaircut.com${fileteredHairStyleImages[mainImageIndex]?.image}`)}
                                alt="Image principale du salon"
                                className="absolute top-0 bottom-0 left-0 right-0 m-auto object-contain max-h-full max-w-full"
                            />
                        </div>

                        {/* 
                        Les flèches sont à cet emplacement pour qu'elles soient positionnées par rapport au modal
                        et non pas juste à côté des vignettes.
                        */}
                        {/* Flèche gauche pour naviguer vers l'image précédente */}
                        {mainImageIndex > 0 && (
                            <button
                                onClick={() => setMainImageIndex((prev) => prev - 1)}
                                className="ml-4 absolute top-1/2 left-0 transform -translate-y-1/2 scale-125 hover:scale-150"
                            >
                                <LeftArrowIcon />
                            </button>
                        )}

                        {/* Flèche droite pour naviguer vers l'image suivante */}
                        {mainImageIndex < images.length - 1 && (
                            <button
                                onClick={() => setMainImageIndex((prev) => prev + 1)}
                                className="mr-4 absolute top-1/2 right-0 transform -translate-y-1/2 scale-125 hover:scale-150"
                            >
                                <RightArrowIcon />
                            </button>
                        )}

                        {/* Conteneur pour les vignettes. Overflow-x-auto permet un défilement horizontal si le contenu déborde. */}
                        <div className="flex gap-2 mt-4 overflow-x-auto hide-scrollbar justify-center">
                            <div className="flex gap-2">
                                {/* 
                                    Mappe sur toutes les images disponibles et crée une vignette pour chacune.
                                    La vignette cliquée mettra à jour l'index de l'image principale.
                                */}
                                {fileteredHairStyleImages.map((img, idx) => (
                                    <img
                                        key={idx}
                                        src={(img.image.includes('http')
                                            ? img.image
                                            : `https://api.onehaircut.com${img.image}`)}
                                        alt={`Thumbnail ${idx}`}
                                        className={`w-24 h-24 object-cover rounded-md cursor-pointer ${mainImageIndex === idx ? 'border-2 border-red-500' : ''}`}
                                        onClick={() => setMainImageIndex(idx)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </BaseModal>
            )}
        </>
    );
};

export default PerfSampleModal;
