import React, { useRef, useEffect } from "react";
import "react-day-picker/dist/style.css";
import { addDays, format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import { useState } from "react";

interface DatePickerProps {
    close: () => void;
    onSelect: (dates: Date[]) => void;
    selectedDates: Date[];
}

const MultipleDatePicker = ({ close, onSelect, selectedDates }: DatePickerProps) => {
    const calendarRef = useRef<HTMLDivElement>(null);
    const pastMonth = new Date(2023, 10, 1);
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

    const defaultSelected: DateRange = {
        from: pastMonth,
        to: addDays(pastMonth, 4)
    };
    const [range, setRange] = useState<DateRange | undefined>(defaultSelected);



    let footer = <p>Please pick the first day.</p>;
    if (range?.from) {
        if (!range.to) {
            footer = <p>{format(range.from, 'PPP')}</p>;
        } else if (range.to) {
            footer = (
                <p>
                    {format(range.from, 'PPP')}–{format(range.to, 'PPP')}
                </p>
            );
        }
    }

    return (
        <div ref={calendarRef} className="absolute bg-white rounded-xl mt-1 shadow-md shadow-stone-500 z-50 p-5">
            <DayPicker
                id="test"
                mode="range"
                defaultMonth={pastMonth}
                selected={range}
                footer={footer}
                onSelect={setRange}
                modifiersStyles={{
                    focus: { backgroundColor: 'orange' },
                    selected: { backgroundColor: 'orange', color: 'white' },
                    today: { color: 'Black' },
                }}
            />
        </div>
    );
};

export default MultipleDatePicker;
