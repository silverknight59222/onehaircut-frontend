import React, { useState, useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface DatePickerProps {
  close: () => void;
  onSelectedDate: (arg0: Date) => void;
  startDate?: Date;
}

const DatePicker = ({ close, onSelectedDate, startDate }: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const calendarRef = useRef<HTMLDivElement>(null);

  const closeSelectBox = (event: MouseEvent): void => {
    if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeSelectBox);
    return () => {
      document.removeEventListener("mousedown", closeSelectBox);
    };
  }, []);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date); // Met à jour la date sélectionnée 
      onSelectedDate(date);  // Notifie le composant parent de la nouvelle date sélectionnée
      close();               // Ferme le DatePicker
    }
  };


  return (

    <div ref={calendarRef} className="absolute bg-white rounded-xl mt-1 shadow-md shadow-stone-500 z-50 p-10">
      <DayPicker
        fromDate={startDate}
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        modifiersStyles={{
          focus: { backgroundColor: 'orange' },
          selected: { backgroundColor: 'orange', color: 'white' },
          today: { color: 'orange' },
        }}
      />
    </div>
  );
};

export default DatePicker;
