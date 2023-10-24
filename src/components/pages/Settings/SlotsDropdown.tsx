import React, { useEffect, useState } from "react";
import { CheckedIcon, DownArrow } from "@/components/utilis/Icons";
import { OpenTimes } from "./OpenningHours";

interface SlotDropdown {
  selectedItem: OpenTimes[];
  getUpdatedSlots: (slots: OpenTimes[]) => void;
  backgroundClr?: string;
}

const SlotDropdown = ({ selectedItem, backgroundClr, getUpdatedSlots }: SlotDropdown) => {
  const [isStartDropdown, setIsStartDropdown] = useState('');
  const [slots, setSlots] = useState<OpenTimes[]>([]);
  const [isEndDropdown, setIsEndDropdown] = useState('');
  const dropdownRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const dropDownItems = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
  ]
  let defaultSlot: OpenTimes = {
    day: "",
    start: "",
    end: "",
    available: false,
  }
  const checkboxClickHandler = (time: string, orientation: string, day: string) => {
    let prevSlots = [];
    let updatedSlots: OpenTimes[] = [];
    if (slots.length > 0) {
      prevSlots = slots;
    } else {
      prevSlots = selectedItem;
    }
    prevSlots.forEach(slot => {
      if (slot.day === day) {
        let newSlot = defaultSlot;
        if (orientation === 'start') {
          newSlot.start = time;
          newSlot.available = slot.available;
          newSlot.end = slot.end;
          newSlot.day = slot.day;
        } else {
          newSlot.start = slot.start;
          newSlot.end = time;
        }
        newSlot.day = slot.day;
        newSlot.available = slot.available;
        updatedSlots.push(newSlot);
      } else {
        updatedSlots.push(slot);
      }
    });
    setSlots(updatedSlots);
    getUpdatedSlots(updatedSlots);
    if (orientation === 'start') {
      setIsStartDropdown('');
    } else {
      setIsEndDropdown('');
    }
  }
  const getSlots = () => {
    if (slots.length) {
      return slots
    } else {
      return selectedItem;
    }
  }
  const ifValid = (item: OpenTimes) => {
    if (Number(item.start.split(':')[0]) >= Number(item.end.split(':')[0])) {
      return true;
    } else {
      return false;
    }
  };
  const closeSelectBox = ({ target }: MouseEvent): void => {
    if (!dropdownRef.current?.contains(target as Node)) {
    }
  };
  const onClickStart = (e: any, item: OpenTimes) => {
    if (isStartDropdown === item.day) {
      setIsStartDropdown('');
    } else if (item.available) {
      setIsEndDropdown('');
      setIsStartDropdown('');
      setIsStartDropdown(item.day)
    }
  }

  const onClickEnd = (e: any, item: OpenTimes) => {
    if (isEndDropdown === item.day) {
      setIsEndDropdown('');
    } else if (item.available) {
      setIsEndDropdown('');
      setIsStartDropdown('');
      setIsEndDropdown(item.day)
    }
  }
  useEffect(() => {
    document.addEventListener("click", closeSelectBox);
    return () => {
      document.removeEventListener("click", closeSelectBox);
    };
  }, []);
  useEffect(() => {
  }, [slots]);
  return (
    <>
      {getSlots().map((item, index) => {
        return (
          <div key={index} className="relative">
            <div className="relative flex items-center justify-center gap-2">
              <div
                ref={dropdownRef}
                onClick={(e) => onClickStart(e, item)}
                className={`relative flex items-center px-3 border w-28 h-9 md:w-36 md:h-11 rounded-md ${` ${!item.available
                    ? "bg-[rgba(171,171,171,0.10)] cursor-default"
                    : backgroundClr
                      ? `${backgroundClr} cursor-pointer`
                      : "bg-white cursor-pointer"
                  }`}`}
              >
                <div className="flex items-center justify-center gap-3">
                  <p className="text-sm">{item.start}</p>
                  <div className="absolute right-3">
                    <DownArrow />
                  </div>
                </div>
              </div>
              {isStartDropdown === item.day && (
                <div className="mt-2 absolute top-10 left-0 w-36 max-h-[220px] overflow-auto z-10 rounded-xl border border-checkbox bg-white px-4 py-2">
                  {dropDownItems.map((time, index) => {
                    return (
                      <div key={index} onClick={() => checkboxClickHandler(time, 'start', item.day)} className="flex items-center justify-center border-b-2 hover:bg-gray-100 cursor-pointer py-[12px]">
                        <p className="ml-2">
                          {time}
                        </p>
                      </div>)
                  })}

                </div>
              )}
              -
              <div
                ref={dropdownRef}
                onClick={(e) => onClickEnd(e, item)}
                className={`relative flex items-center px-3 border w-28 h-9 md:w-36 md:h-11 rounded-md ${` ${!item.available
                    ? "bg-[rgba(171,171,171,0.10)] cursor-default"
                    : backgroundClr
                      ? `${backgroundClr} cursor-pointer`
                      : "bg-white cursor-pointer"
                  }`}`}
              >
                <div className="flex items-center justify-center gap-3">
                  <p className="text-sm">{item.end}</p>
                  <div className="absolute right-3">
                    <DownArrow />
                  </div>
                </div>
              </div>
              {isEndDropdown === item.day && (
                <div className="mt-2 absolute top-10 right-0 w-36 max-h-[220px] overflow-auto z-10 rounded-xl border border-checkbox bg-white px-4 py-2">
                  {dropDownItems.map((time, index) => {
                    return (
                      <div key={index} onClick={() => checkboxClickHandler(time, 'end', item.day)} className="flex items-center justify-center border-b-2 hover:bg-gray-100 cursor-pointer py-[12px]">
                        <p className="ml-2">
                          {time}
                        </p>
                      </div>)
                  })}

                </div>
              )}
            </div>
            {ifValid(item) ? (<p className="absolute mt-2 text-sm text-red-600">Invalid date range</p>) : ''}
          </div>
        );
      })}
    </>
  );
};

export default SlotDropdown;
