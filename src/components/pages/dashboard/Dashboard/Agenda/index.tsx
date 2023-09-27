// Importation des hooks et bibliothèques nécessaires
import react, { useEffect, useState, useRef } from "react";
import userLoader from "@/hooks/useLoader";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./index.css";
import { dashboard } from "@/api/dashboard";
import EventDetails from "./EventDetails";

// Définition du type de Booking
export type Booking = {
  id: string;
  title: string;
  start: string;
};

export const Agenda = () => {
  // Initialisation des états et des références
  const { loadingView } = userLoader();
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<Booking[]>([]);
  const [selectedEventDetails, setSelectedEventDetails] = useState<Booking>();
  const calendarRef = useRef<FullCalendar | null>(null);

  // Fonction pour récupérer toutes les réservations
  const getAllBookings = () => {
    setIsLoading(true);
    dashboard
      .getAllBookings()
      .then((res) => {
        res.data.data.forEach((event: any) => {
          setEvents((pre) => [
            ...pre,
            {
              id: event.id,
              title: event.user.name,
              start: event.created_at,
            },
          ]);
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Fonction pour définir les détails de l'événement sélectionné
  const setEventDetails = (id: string) => {
    events.forEach((e) => {
      if (e.id.toString() === id) {
        setSelectedEventDetails(e);
      }
    });
  };

  // Utilisation du hook useEffect pour charger toutes les réservations au montage du composant
  useEffect(() => {
    getAllBookings();
  }, []);

  // Rendu du composant
  return (
    <>
      {isLoading && loadingView()} {/* Affichage du loader si le chargement est en cours */}
      <FullCalendar // Affichage du calendrier
        ref={calendarRef}
        events={events} // Liste des événements à afficher
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]} // Plugins utilisés
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay", // Boutons de navigation
        }}
        height={900} // Hauteur du calendrier
        eventClick={(info) => { // Gestionnaire de clic sur un événement
          setEventDetails(info.event.id);
        }}
        dayHeaderFormat={{
          weekday: "short",
          day: "numeric",
        }}
        editable
        selectable
      />
      {selectedEventDetails && selectedEventDetails.id && (
        // Affichage du modal de détails de l'événement si un événement est sélectionné
        <div className="fixed top-0 left-0 overflow-hidden bg-black bg-opacity-10 flex items-center justify-center w-full h-full z-50">
          <EventDetails event={selectedEventDetails} setModal={setSelectedEventDetails} />
        </div>
      )}
    </>
  );
};
