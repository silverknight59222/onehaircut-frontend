import React, { useState, useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface DatePickerProps{
    close: () => void,
    onSelectedDate: (arg0: Date) => void,
    startDate?: Date | undefined
}
const DatePicker = ({close, onSelectedDate, startDate}: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const calanderRef =useRef() as React.MutableRefObject<HTMLInputElement>;
  const closeSelectBox = ({ target }: MouseEvent): void => {
    if (!calanderRef.current?.contains(target as Node)) {
        close()
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeSelectBox);
    return () => {
      document.removeEventListener("click", closeSelectBox);
    };
  }, []);
  useEffect(()=>{
    if(selectedDate){
        onSelectedDate(selectedDate)
    }
  },[selectedDate])
  return (
    <div ref={calanderRef} className="absolute bg-white rounded-xl mt-1 shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)]">
      <DayPicker fromDate={startDate} mode="single" selected={selectedDate} onSelect={setSelectedDate} />
    </div>
  );
};

export default DatePicker;
