import React, { useRef, useEffect } from "react";
import "react-day-picker/dist/style.css";
import { addDays, format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import { useState } from "react";
import { fr } from 'date-fns/locale';

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
    const [range, setRange] = useState<DateRange | undefined>({ from: undefined, to: undefined });

    const handleSelect = (range: DateRange | undefined) => {
        setRange(range);
        if (range?.from && range?.to) {
            // Créez un tableau de toutes les dates entre 'range.from' et 'range.to'
            const dates = [];
            for (let d = range.from; d <= range.to; d = addDays(d, 1)) {
                dates.push(d);
            }
            onSelect(dates);
        }
    };

    const today = new Date();
    const disabledDays = { before: today };

    let footer;
    if (range?.from) {
        const formattedFrom = format(range.from, 'PPP', { locale: fr });
        if (!range.to) {
            // Si seule la date de début est sélectionnée
            footer = (
                <>
                    <p style={{ marginTop: '10px', fontStyle: 'italic', textAlign: 'center' }}>
                        <strong>du :</strong> {formattedFrom}<br /><strong>jusqu'au :</strong> ?
                    </p>
                    <button
                        className="block mx-auto mt-4 bg-gray-300 px-4 py-2 rounded-md"
                        onClick={close}
                    >
                        Fermer
                    </button>
                </>
            );
        } else {
            // Si la date de fin est également sélectionnée
            const formattedTo = format(range.to, 'PPP', { locale: fr });
            footer = (
                <>
                    <p style={{ marginTop: '10px', fontStyle: 'italic', textAlign: 'center' }}>
                        <strong>du :</strong> {formattedFrom}<br /><strong>jusqu'au :</strong> {formattedTo}
                    </p>
                    <button
                        className="block mx-auto mt-4 bg-gray-300 px-4 py-2 rounded-md"
                        onClick={close}
                    >
                        Fermer
                    </button>
                </>
            );
        }
    } else {
        // Si aucune date n'est sélectionnée
        footer = (
            <>
                <p style={{ marginTop: '10px', fontStyle: 'italic', textAlign: 'center' }}>Sélectionner une date.</p>
                <button
                    className="block mx-auto mt-4 bg-gray-300 px-4 py-2 rounded-md hover:scale-90 transition duration-300"
                    onClick={close}
                >
                    Fermer
                </button>
            </>
        );
    }

    return (
        <div
            ref={calendarRef}
            className="absolute bg-white rounded-xl shadow-md shadow-stone-500 p-5 mt-4 z-50"
            style={{ top: '100%', left: 0, zIndex: 1000 }}
        >
            <DayPicker
                id="test"
                mode="range"
                defaultMonth={pastMonth}
                selected={range}
                footer={footer}
                onSelect={handleSelect}
                disabled={disabledDays}
                modifiersStyles={{
                    selected: { backgroundColor: '#F96E1F', color: 'white' },
                    today: { color: 'Black' },
                }}
            />
        </div>
    );
};

export default MultipleDatePicker;
