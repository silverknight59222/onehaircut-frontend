import react, { useEffect, useState } from "react";
import userLoader from "@/hooks/useLoader";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import "./index.css";
import { useRef } from "react";
import { dashboard } from "@/api/dashboard";
import EventDetails from "./EventDetails";
export type Booking = {
  id: string;
  title: string;
  start: string;
};
export const Agenda = () => {
  const { loadingView } = userLoader();
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<Booking[]>([]);
  const [selectedEventDetails, setSelectedEventDetails] = useState<Booking>();
  const calendarRef = useRef<FullCalendar | null>(null);
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
  const setEventDetails = (id: string) => {
    events.forEach((e) => {
      if (e.id.toString() === id) {
        setSelectedEventDetails(e);
      }
    });
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  return (
    <>
      {isLoading && loadingView()}
      <FullCalendar
        ref={calendarRef}
        events={events}
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          start: "",
          center: "",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={700}
        eventClick={(info) => {
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
        <div className="fixed top-0 left-0 overflow-hidden bg-black bg-opacity-10 flex items-center justify-center w-full h-full z-50">
          <EventDetails event={selectedEventDetails} setModal={setSelectedEventDetails} />
        </div>
      )}
    </>
  );
};
