// Importation des hooks et bibliothèques nécessaires
import react, { useEffect, useState, useRef } from "react";
import userLoader from "@/hooks/useLoader";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./index.css";
import { dashboard } from "@/api/dashboard";
import EventDetailsModal from "./EventDetails";
import { Booking, Coiffeur } from "./types";
import { getLocalStorage } from "@/api/storage";

export const Agenda = () => {
  // Initialisation des états et des références
  const { loadingView } = userLoader();
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<Booking[]>([]);
  const [hairDressers, setHairDressers] = useState([]);
  const [selectedEventDetails, setSelectedEventDetails] = useState<Booking>();
  const calendarRef = useRef<FullCalendar | null>(null);


  const couleurs = [
    { couleur: "#FAD4D9", textColor: "#EA4A5E" }, // rouge clair
    { couleur: "#CEE7FC", textColor: "#329BF2" }, // bleu ciel
    { couleur: "#FDE7D0", textColor: "#F4993A" }, // orange clair
    { couleur: "#EA4361", textColor: "#FFFFFF" }, // rouge/rose intense
    { couleur: "#D8EAD2", textColor: "#4C9654" }, // Vert doux
    { couleur: "#FFF9D7", textColor: "#E49544" }, // Jaune pâle
    { couleur: "#E3D7E6", textColor: "#8A5B8F" }, // Mauve doux
    { couleur: "#D9E2E9", textColor: "#53708E" }, // Bleu-gris doux
    { couleur: "#EBD5C0", textColor: "#B47D56" }, // Terre de sienne
    { couleur: "#DCE7E5", textColor: "#5B8A8F" }  // Vert-gris doux
  ];

  const hairDresserColor = {}

  interface LegendProps {
    listeCoiffeurs: Coiffeur[];
  }

  const Legend: React.FC<LegendProps> = ({ listeCoiffeurs }) => {
    return (
      <div className="legend-container">
        {listeCoiffeurs.map((hairDresser, index) => (
          <div key={index} className="item-legend"> {/* Utilisation de l'index comme clé */}
            <span
              className="color-box"
              style={{
                backgroundColor: hairDresser.coiffeurAleatoire.couleur,
                color: hairDresser.coiffeurAleatoire.textColor
              }}
            >
              ■
            </span>
            {hairDresser.name}
          </div>
        ))}
      </div>
    );
  };

  //TODO Changer coiffeurAleatoire par le vrai nom du coiffeur de l'event ainsi que la couleur
  // Fonction pour récupérer toutes les réservations
  const getAllBookings = () => {
    const id = Number(getLocalStorage("salon_id"));
    setIsLoading(true);
    dashboard
      .getBookingsByHairsalon(id)
      .then((res) => {
        setEvents([] as Booking[])
        res.data.data.forEach((event: any) => {
          if (event.booking_slots && event.booking_slots.length > 0) {
            setEvents((pre) => [
              ...pre,
              {
                id: event.id,
                title: event.user.name + " par " + event.hair_dresser.name + " - " + "Durée : " + event.total_duration + " Min",
                hair_dresser_name: event.hair_dresser.name,
                total_duration: event.total_duration,
                booking: event,
                clientId: event.user.id,
                start: `${event.month_date}T${event.booking_slots[0].start}:00`,
                end: `${event.month_date}T${event.booking_slots[event.booking_slots.length - 1].end}:00`,
                coiffeur: hairDresserColor[event.hair_dresser_id],
                backgroundColor: hairDresserColor[event.hair_dresser_id].couleur,
                textColor: hairDresserColor[event.hair_dresser_id].textColor,
              },
            ]);
          }
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getHairDresser = () => {
    const id = Number(getLocalStorage("salon_id"));
    setIsLoading(true);
    dashboard
      .getAllHairDressers(id)
      .then((res) => {
        let couleurIndex = 0; // Index pour parcourir le tableau de couleurs

        res.data.data.forEach((hairDresser: any) => {
          // Attribuer la couleur et le textColor du tableau couleurs
          const couleurAttribuee = couleurs[couleurIndex];
          hairDresser.coiffeurAleatoire = couleurAttribuee;
          hairDresserColor[hairDresser.id] = couleurAttribuee;

          // Incrémenter l'index et recommencer si nécessaire
          couleurIndex = (couleurIndex + 1) % couleurs.length;
        });

        setHairDressers(res.data.data);
        getAllBookings();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };


  // Fonction pour définir les détails de l'événement sélectionné
  const setEventDetails = (id: string) => {
    const event = events.find((e) => e.id.toString() === id);
    if (event) setSelectedEventDetails(event);
  };

  const refresh = () => {
    setSelectedEventDetails(undefined)
    getHairDresser();
  }


  // Utilisation du hook useEffect pour charger toutes les réservations au montage du composant
  useEffect(() => {
    getHairDresser();
  }, []);


  // Rendu du composant
  return (
    <>
      {isLoading && loadingView()} {/* Affichage du loader si le chargement est en cours */}
      <div className="flex justify-end">
        <div className="box-decoration-slice bg-gradient-to-r from-red-600 to-red-500  mb-2 rounded-md font-medium text-center p-1 box-border h-15 w-[200px] text-white px-3">Incoming Bookings 3</div>
      </div>
      <FullCalendar
        ref={calendarRef}
        events={events}
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={1200}
        eventClick={(info) => {
          setEventDetails(info.event.id);
        }}
        dayHeaderFormat={{
          weekday: "short",
          day: "numeric",
        }}
        editable
        selectable
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false // Cela indique d'utiliser le format 24 heures
        }}
        slotLabelInterval={{ hours: 2 }} // Ajouter ceci pour changer l'intervalle des étiquettes de temps

      />

      <Legend listeCoiffeurs={hairDressers} />
      {selectedEventDetails && (
        <div className="fixed top-0 left-0 overflow-hidden bg-black bg-opacity-10 flex items-center justify-center w-full h-full z-50">
          <EventDetailsModal
            event={selectedEventDetails}
            setModal={setSelectedEventDetails}
            refresh={refresh}
            coiffeurNom={selectedEventDetails.coiffeur.nom}
            coiffeurCouleur={selectedEventDetails.coiffeur.couleur}
          />
        </div>

      )}
    </>
  );
};
