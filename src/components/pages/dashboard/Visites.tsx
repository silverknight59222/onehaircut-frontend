"use client";
import React from "react";
import DashboardLayout from "@/layout/DashboardLayout";
import "react-circular-progressbar/dist/styles.css";
import ProgressBar from "@/components/UI/ProgressBar";
import { DownArrow } from "@/components/utilis/Icons";

const Visites = () => {
  const clients = [
    { user: "Angelina vitale", hairstyle: "Carré plongeant", orders: 215 },
    { user: "Doppleria", hairstyle: "Fondu court", orders: 77 },
    { user: "Marina", hairstyle: "Boucle court", orders: 68 },
    { user: "Kevin K", hairstyle: "Carré plongeant", orders: 62 },
    { user: "Bernardo", hairstyle: "Dread", orders: 61 },
  ];
  return (
    <div>
      <DashboardLayout>
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
            <div className="w-full  sm:h-[332px] py-5 px-4 sm:px-6 bg-white rounded-lg shadow-[0px_4px_33px_0px_rgba(176,176,176,0.25)]">
              <div className="flex items-center justify-between">
                <p className="text-2xl font-semibold text-[#727272]">Visites</p>
                <div className="w-36 h-11 flex items-center justify-center gap-2 -mb-4 border border-[rgba(254,49,100,0.56)] rounded-[48px] bg-gradient-to-b from-[rgba(254,49,100,0.08)] via-transparent to-[rgba(254,49,100,0.00)]">
                  <p className="text-[#656565] font-semibold">Today</p>
                  <DownArrow width="12" height="12" />
                </div>
              </div>
              <p className="text-xl font-medium text-center text-[#656565] mt-8">
                Conversion: <span className="text-[#F44336]">31%</span>
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-5">
                <ProgressBar
                  value={65}
                  name="Client"
                  number={100}
                  rotation={0.25}
                  color="#FE5352"
                />
                <ProgressBar
                  value={40}
                  name="Commandes"
                  number={40}
                  rotation={0.25}
                  color="#15BAF2"
                />
              </div>
            </div>
            <div className="w-full  sm:h-[332px] py-5 px-4 sm:px-6 bg-white rounded-lg shadow-[0px_4px_33px_0px_rgba(176,176,176,0.25)]">
              <p className="text-2xl text-center font-semibold text-[#727272]">
                Top Clients
              </p>
              <div className="h-64 overflow-auto mt-4">
                <table>
                  <thead>
                    <tr className="text-sm font-semibold text-[#A9A8A8]">
                      <td className="px-4 py-2 text-center"></td>
                      <td className="px-4 py-2 text-center">Utilisateur</td>
                      <td className="px-4 py-2 text-center">
                        coiffure préférée
                      </td>
                      <td className="px-4 py-2 text-center">Commandes</td>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client, index) => {
                      return (
                        <tr
                          key={index}
                          className="text-xs font-semibold text-black text-center whitespace-nowrap"
                        >
                          <td className="px-4 py-2">{++index}</td>
                          <td className="text-sm px-4 py-2">{client.user}</td>
                          <td className="text-[#5A5959] px-4 py-2">
                            {client.hairstyle}
                          </td>
                          <td className="px-4 py-2">{client.orders}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-full  sm:h-[332px] py-5 px-4 sm:px-6 bg-white rounded-lg shadow-[0px_4px_33px_0px_rgba(176,176,176,0.25)]">
              <p className="text-2xl text-center font-semibold text-[#727272]">
                Fidélité clients
              </p>
              <p className="text-xl font-medium text-center text-[#656565] mt-8">
                Conversion: <span className="text-[#F44336]">9%</span>
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-5">
                <ProgressBar
                  value={65}
                  name="total clients"
                  number={452}
                  rotation={0.25}
                  color="rgb(255, 134, 54)"
                />
                <ProgressBar
                  value={20}
                  name="Habitués"
                  number={31}
                  rotation={0.2}
                  color="#7ABF50"
                />
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default Visites;
