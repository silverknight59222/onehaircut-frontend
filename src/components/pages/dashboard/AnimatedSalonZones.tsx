"use client";
import { salonApi } from "@/api/salonSide";
import React, { useEffect, useState } from "react";

const AnimatedSalonZones = () => {

  const [selectedZoneIndex, setSelectedZoneIndex] = useState<number>(0);
  const [intervalVar, setIntervalVar] = useState<any>(null);
  const [selectedZone, setSelectedZone] = useState<any>(null);
  const getZonesData = async () => {
    try {
      const { data: { data } } = await salonApi.getZonesInfo()
      if (data?.length) {
        let index = 0
        setSelectedZone(data[index])
        if (data.length > 1) {
          const interval = setInterval(() => {
            if (data[index + 1]) {
              index++
            } else {
              index = 0
            }
            setSelectedZone(data[index])
          }, 5000)
          setIntervalVar(interval)
        } else {
          setSelectedZone(data[0])
        }
      }
    } catch (e) {
      //
    }
  }

  useEffect(() => {
    getZonesData()
    return () => {
      if (intervalVar) {
        clearInterval(intervalVar)
      }
    }
  }, []);


  return (<>
    {selectedZone && (
      <div key={selectedZoneIndex} className={'flex justify-center'}>
        <div className="flex w-3/4 h-[100px] p-2 bg-[rgba(255,255,255,0.69)] rounded-2xl shadow-sm shadow-stone-500">
          {(selectedZone.type === 'in_trial') && (
            <div className="w-full flex flex-col justify-center items-center">
              <p className="text-black font-medium text-sm mt-2">Déjà </p>
              <p className="text-black text-3xl font-semibold">
                {30 - selectedZone.days_left} jours
              </p>
              <p className="text-black font-medium text-sm mt-2">sur la version pro </p>
            </div>
          )}
          {(selectedZone.type === 'in_free_6_months') && (
            <div className="w-full flex flex-col justify-center items-center">
              <p className="text-black font-medium text-sm mt-2">Encore </p>
              <p className="text-black text-xl font-semibold">
                {selectedZone.days_left > 30 ? Math.floor(selectedZone.days_left / 30) + ' mois ' : selectedZone.days_left + ' jours'}
              </p>
              <p className="text-black font-medium text-sm mt-2">sur la version pro</p>
            </div>
          )}
          {(selectedZone.type === 'bookings_count') && (
            <div className="w-full flex flex-col justify-center items-center">
              <p className="text-black font-medium text-sm mt-2">Plus que </p>
              <p className="text-black font-semibold text-xl">
                {200 - selectedZone.count} commandes
              </p>

              <p className="text-black font-medium text-sm">pour un mois offert</p>
            </div>
          )}
        </div>
      </div>
    )}
  </>
  )
}

export default AnimatedSalonZones;
