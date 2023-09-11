"use client";
import BaseDropdown from "@/components/UI/BaseDropdown";
import { CheckedIcon, CircleRight } from "@/components/utilis/Icons";
import DashboardLayout from "@/layout/DashboardLayout";
import React, { useState } from "react";

const Settings = () => {
  const [selectedItems, setSelectedItems] = useState([
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
  ]);
  const items = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  const times1 = [
    { from: [], to: [] },
    { from: ["09:00"], to: ["12:00"] },
    { from: ["09:00"], to: [] },
    { from: ["09:00"], to: ["12:00"] },
    { from: ["09:00"], to: [] },
    { from: ["09:00"], to: ["12:00"] },
    { from: [], to: [] },
  ];
  const times2 = [
    { from: [], to: [] },
    { from: ["09:00"], to: ["12:00"] },
    { from: ["09:00"], to: [] },
    { from: ["09:00"], to: ["12:00"] },
    { from: ["09:00"], to: [] },
    { from: ["09:00"], to: ["12:00"] },
    { from: [], to: [] },
  ];
  const checkboxClickHandler = (value: string) => {
    if (selectedItems.includes(value)) {
      const tempArray = [...selectedItems];
      const index = tempArray.indexOf(value);
      tempArray.splice(index, 1);
      setSelectedItems(() => tempArray);
    } else {
      setSelectedItems((prevState) => [...prevState, value]);
    }
  };
  return (
    <div>
      <div className="hidden sm:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 z-10">
        <CircleRight />
      </div>
      <DashboardLayout>
        <div className="flex flex-col lg:flex-row items-start justify-center gap-6 2xl:gap-12">
          <div className="w-80 2xl:w-72 flex flex-col items-center justify-center text-center px-9 py-10 gap-8 rounded-2xl bg-white text-xl font-medium text-[#ABABAB] shadow-[3px_3px_10px_-1px_rgba(0,0,0,0.30)]">
            <p className="text-black">Horaires d’ouverture</p>
            <p>Disponibilité de l’équipe</p>
            <p>Promotions clients</p>
            <p>Objectifs</p>
            <p>Autres </p>
          </div>
          <div className="relative z-20 w-full 2xl:w-[1000px] overflow-auto py-12 px-7 bg-white rounded-2xl shadow-[3px_3px_10px_-1px_rgba(0,0,0,0.30)]">
            <table>
              <tbody>
                <tr className="flex items-center justify-center">
                  <td className="flex flex-col gap-16 pr-5">
                    {items.map((item, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => checkboxClickHandler(item)}
                          className="flex items-center gap-5 cursor-pointer"
                        >
                          <div
                            className={`w-6 h-6 pt-2 pl-1.5 rounded-[4px] border ${
                              selectedItems.includes(item)
                                ? "bg-gradient-to-b from-pink-500 to-orange-500 border-white"
                                : "border-[#767676]"
                            }`}
                          >
                            <CheckedIcon width="15" height="10" />
                          </div>
                          <p className="text-xl text-[#767676] font-medium">
                            {item}
                          </p>
                        </div>
                      );
                    })}
                  </td>
                  <td className="flex flex-col gap-12 border-x border-[rgba(171,171,171,0.20)] px-5">
                    {times1.map((time, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-center gap-3"
                        >
                          <BaseDropdown
                            width="w-36"
                            height="h-11"
                            rounded="rounded-xl"
                            borderClr="#ABABAB"
                            disabled={time.from.length ? false : true}
                            dropdownItems={time && time.from}
                          />
                          <div className="w-5 border-t border-[#ABABAB]" />
                          <BaseDropdown
                            width="w-36"
                            height="h-11"
                            rounded="rounded-xl"
                            borderClr="#ABABAB"
                            disabled={time.to.length ? false : true}
                            dropdownItems={time && time.to}
                          />
                        </div>
                      );
                    })}
                  </td>
                  <td className="flex flex-col gap-12 pl-5">
                    {times2.map((time, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-center gap-3"
                        >
                          <BaseDropdown
                            width="w-40"
                            height="h-11"
                            rounded="rounded-xl"
                            borderClr="#ABABAB"
                            disabled={time.from.length ? false : true}
                            dropdownItems={time && time.from}
                          />
                          <div className="w-5 border-t border-[#ABABAB]" />
                          <BaseDropdown
                            width="w-40"
                            height="h-11"
                            rounded="rounded-xl"
                            borderClr="#ABABAB"
                            disabled={time.to.length ? false : true}
                            dropdownItems={time && time.to}
                          />
                        </div>
                      );
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Settings;
