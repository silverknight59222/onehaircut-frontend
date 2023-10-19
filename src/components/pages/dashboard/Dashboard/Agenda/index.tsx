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
  const [selectedEventDetails, setSelectedEventDetails] = useState<Booking>();
  const calendarRef = useRef<FullCalendar | null>(null);


  const couleurs = [
    { couleur: "#FAD4D9", textColor: "#EA4A5E" }, // rouge clair
    { couleur: "#CEE7FC", textColor: "#329BF2" }, // bleu ciel
    { couleur: "#FDE7D0", textColor: "#F4993A" }, // orange clair
    { couleur: "#FFF9D7", textColor: "#E49544" }, // Jaune pâle
    { couleur: "#EA4361", textColor: "#FFFFFF" }, // rouge/rose intense
    { couleur: "#D8EAD2", textColor: "#4C9654" }, // Vert doux
    { couleur: "#E3D7E6", textColor: "#8A5B8F" }, // Mauve doux
    { couleur: "#D9E2E9", textColor: "#53708E" }, // Bleu-gris doux
    { couleur: "#EBD5C0", textColor: "#B47D56" }, // Terre de sienne
    { couleur: "#DCE7E5", textColor: "#5B8A8F" }  // Vert-gris doux
  ];



  // TODO importer la liste de coiffeur  avec leur image et attribuer une couleur dynamiquement
  const coiffeurs = [
    { nom: "Jean Dupont", image: "https://i.pravatar.cc/150?img=1", ...couleurs[0] },
    { nom: "Marie Durand", image: "https://i.pravatar.cc/150?img=2", ...couleurs[1] },
    { nom: "Pierre Martin", image: "https://i.pravatar.cc/150?img=3", ...couleurs[2] },
    { nom: "Sophie Lemoine", image: "https://i.pravatar.cc/150?img=4", ...couleurs[3] },
    { nom: "Lucas Bernard", image: "https://i.pravatar.cc/150?img=5", ...couleurs[4] },
  ];

  interface LegendProps {
    listeCoiffeurs: Coiffeur[];
  }

  const Legend: React.FC<LegendProps> = ({ listeCoiffeurs }) => {
    return (
      <div className="legend-container">
        {listeCoiffeurs.map((item, index) => (
          <div key={index} className="item-legend"> {/* Utilisation de l'index comme clé */}
            <span
              className="color-box"
              style={{
                backgroundColor: item.couleur,
                color: item.textColor
              }}
            >
              ■
            </span>
            {item.nom}
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
        res.data.data.forEach((event: any) => {
          const coiffeurAleatoire = coiffeurs[Math.floor(Math.random() * coiffeurs.length)];

          setEvents((pre) => [
            ...pre,
            {
              id: event.id,
              title: event.user.name + " - " + coiffeurAleatoire.nom,
              clientId: event.user.id,
              start: event.created_at,
              coiffeur: coiffeurAleatoire,
              backgroundColor: coiffeurAleatoire.couleur,
              textColor: coiffeurAleatoire.textColor,
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
    const event = events.find((e) => e.id.toString() === id);
    if (event) setSelectedEventDetails(event);
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
      <Legend listeCoiffeurs={coiffeurs} />
      {selectedEventDetails && (
        <div className="fixed top-0 left-0 overflow-hidden bg-black bg-opacity-10 flex items-center justify-center w-full h-full z-50">
          <EventDetailsModal
            event={selectedEventDetails}
            setModal={setSelectedEventDetails}
            coiffeurNom={selectedEventDetails.coiffeur.nom}
            coiffeurCouleur={selectedEventDetails.coiffeur.couleur}
            coiffeurs={coiffeurs}
          />
        </div>

      )}
    </>
  );
};
