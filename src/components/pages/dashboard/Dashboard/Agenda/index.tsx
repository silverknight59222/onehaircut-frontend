// Importation des hooks et bibliothèques nécessaires
import react, { useEffect, useState, useRef } from "react";
import userLoader from "@/hooks/useLoader";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./style.css";
import { dashboard } from "@/api/dashboard";
import EventDetailsModal from "./EventDetails";
import { Booking, Coiffeur } from "./types";
import { getLocalStorage, removeFromLocalStorage, setLocalStorage } from "@/api/storage";
import frLocale from '@fullcalendar/core/locales/fr'; // Importez la locale française
import TourModal, { Steps } from "@/components/UI/TourModal";
import { salonApi } from "@/api/salonSide";


const Agenda = () => {
  // Initialisation des états et des références
  const { loadingView } = userLoader();
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<Booking[]>([]);
  const [hairDressers, setHairDressers] = useState([]);
  const [selectedEventDetails, setSelectedEventDetails] = useState<Booking>();
  const calendarRef = useRef<FullCalendar | null>(null);
  const [pageDone, setPageDone] = useState<String[]>([]);


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
                title: event.user != null ?
                  event.user.name + " par " + event.hair_dresser.name + " - " + "Durée : " + event.total_duration + " Min" :
                  "Guest par " + event.hair_dresser.name + ' - ' + "Durée : " + event.total_duration + " Min",
                hair_dresser_name: event.hair_dresser.name,
                total_duration: event.total_duration,
                booking: event,
                clientId: event.user != null ? event.user.id : null,
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
    const pages_done = getLocalStorage('pages_done')
    setPageDone(pages_done!.split(',').map((item) => item.trim()))
    console.log(pages_done)
  }, []);

  // Fonction pour calculer le nombre d'événements à venir dans la plage visible
  const [totalEventsCount, setTotalEventsCount] = useState(0);
  const [upcomingEventsCount, setUpcomingEventsCount] = useState(0);

  const countEventsInView = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (!calendarApi) return { total: 0, upcoming: 0 };

    const view = calendarApi.view;
    const start = view.activeStart;
    const end = view.activeEnd;
    const now = new Date();

    const eventsInView = events.filter(event => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      return eventStart < end && eventEnd >= start;
    });

    const upcomingEvents = eventsInView.filter(event => new Date(event.end) > now);

    return { total: eventsInView.length, upcoming: upcomingEvents.length };
  };

  useEffect(() => {
    const { total, upcoming } = countEventsInView();
    setTotalEventsCount(total);
    setUpcomingEventsCount(upcoming);
  }, [events, calendarRef]);

  const TotalEventsCounter = ({ totalEventsCount }) => {
    return (
      <div className="total-events-counter">
        Réservations sur cette plage: {totalEventsCount}
      </div>
    );
  };

  const UpcomingEventsCounter = ({ upcomingEventsCount }) => {
    return (
      <div className="upcoming-events-counter">
        Réservations à venir: {upcomingEventsCount}
      </div>
    );
  };

  // ------------------------------------------------------------------
  // For Tour
  const tourSteps: Steps[] = [
    {
      selector: '',
      content: 'Bienvenue dans votre agenda',
    },
    {
      selector: '.calendar_container',
      content: 'Il regroupe tous les rendez-vous de la semaine indiquée.',
    },
    {
      selector: '.calendar_container',
      content: 'En cliquant sur un rendez-vous, vous pouvez consulter les détails de la réservation.',
    },
    {
      selector: '.legend',
      content: 'Les couleurs sur l\'agenda correspondent au coiffeur qui est assigné au rendez-vous.',
    },
  ];

  const closeTour = async () => {
    // You may want to store in local storage or state that the user has completed the tour
    setIsLoading(true)
    if (!pageDone.includes('salon_agenda')) {
      let resp = await salonApi.assignStepDone({ page: 'salon_agenda' });
      removeFromLocalStorage('pages_done');
      setLocalStorage('pages_done', resp.data.pages_done);
      setPageDone((prevArray) => [...prevArray, 'salon_agenda'])
    }
    setIsLoading(false);
  };
  // ------------------------------------------------------------------

  // Rendu du composant
  return (
    <>
      {isLoading && loadingView()}

      {/* For explaining the website */}
      {!pageDone.includes('salon_agenda') &&
        <TourModal steps={tourSteps} onRequestClose={closeTour} />}

      <div className="calendar-header">
        <TotalEventsCounter totalEventsCount={totalEventsCount} />
        <UpcomingEventsCounter upcomingEventsCount={upcomingEventsCount} />
      </div>

      <div className="calendar_container">
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
          locale={frLocale} // Définissez la locale sur "fr"
          datesSet={() => {
            const { total, upcoming } = countEventsInView();
            setTotalEventsCount(total);
            setUpcomingEventsCount(upcoming);
          }}


        />
      </div>

      <div className="legend">
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
      </div>
    </>
  );
};


export default Agenda;