import React from 'react';
import { CrossIcon } from "@/components/utilis/Icons"; // Importation de l'icône de fermeture
import { ColorsThemeA } from "@/components/utilis/Themes"; // Importation des thèmes de couleur

// Définition des propriétés de l'objet Booking
interface Booking {
  id: string;
  title: string;
  start: string;
  // Ajoutez d'autres propriétés si nécessaire
}

// Définition des propriétés du composant
interface BookingDetail {
  event: Booking;
  setModal: (value: Booking) => void;
}

const DetailModal: React.FC<BookingDetail> = (props) => {
  // Valeurs par défaut pour le booking
  const defaultBooking = {
    id: "",
    title: "",
    start: "",
  };

  return (
    <div className="relative bg-white w-full lg:min-w-[1100px] min-h-[300px] rounded-xl px-5 pb-5 shadow-lg">
      {/* Section de l'icône de fermeture */}
      <div className="w-full flex items-center justify-end pt-2">
        <div
          className={`absolute -right-3 -top-3 cursor-pointer my-3 py-3 px-3 rounded-full ${ColorsThemeA.ohcVerticalGradient_A} shadow-md`}
          onClick={() => props.setModal(defaultBooking)}
        >
          <CrossIcon width="16" /> {/* Icône de fermeture */}
        </div>
      </div>

      {/* Section des détails du booking */}
      <div className="flex flex-col items-center justify-center text-xl font-semibold gap-4 min-h-[300px]">
        {/* Nom */}
        <div className="font-bold">Name: {props.event.title}</div>

        {/* Vignette */}
        <div className="w-52 h-52 border rounded-md">
          {/* Insérez la vignette ici */}
        </div>

        {/* Date */}
        <div>Date: <span className="font-normal">{props.event.start.split('T')[0]}</span></div>

        {/* Coiffeur */}
        <div>Coiffeur: {/* Insérez le nom du coiffeur ici */}</div>
      </div>
    </div>
  );
};

export default DetailModal;
