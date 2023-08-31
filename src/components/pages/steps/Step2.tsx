"use client";
import { AddIcon, LogoIcon, MinusIcon } from "@/components/utilis/Icons";
import { useRouter } from "next/navigation";
import React from "react";
import GoogleMapReact from "google-map-react";

const Step2 = () => {
  const route = useRouter();
  const mapCenter = { lat: 37.7749, lng: -122.4194 };
  const mapZoom = 10;
  return (
    <div>
      <div className="flex items-center justify-center border-b border-[#EBF0F2] mt-5 pb-3">
        <LogoIcon />
      </div>
      <div className="flex flex-col items-center justify-center mt-16">
        <p className="text-black font-semibold text-xl md:text-2xl lg:text-3xl text-center px-6 w-full md:w-[800px] xl:w-[1100px]">
          Où est situé ton salon ? si tu es mobile, renseigne la zone dans
          laquelle tu peux exercer !
        </p>
        <div className="w-[600px] md:w-[800px] xl:w-[1050px] flex flex-col items-center justify-center mt-5 sm:mt-7">
          <div className="w-full flex flex-col md:flex-row items-center justify-between">
            <input
              placeholder="Adresse"
              className="rounded-xl w-96 sm:w-[500px] mt-7 py-4 px-6 bg-[#F7F7F7] outline-none shadow-[0px_4px_4px_0px_rgba(154,154,154,0.00)]"
            />
            <div className="mt-5 md:mt-0">
              <p className="text-black mb-1">Zone de mobilité</p>
              <div className="flex items-center justify-center gap-7">
                <div className="w-[85px] h-9 flex items-center justify-center text-black border border-black shadow-[0px_4px_4px_0px_rgba(172,172,172,0.25)]">
                  25 KM
                </div>
                <div className="flex items-center justify-center px-4 py-1 gap-4 w-24 rounded-md bg-gradient-to-r from-pink-500 to-orange-500 shadow-[0px_14px_24px_0px_rgba(255,125,60,0.25)]">
                  <div className="border-r border-white pr-3 py-3">
                    <MinusIcon />
                  </div>
                  <div className="py-1">
                    <AddIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-96 my-12">
            <GoogleMapReact
              defaultCenter={mapCenter}
              defaultZoom={mapZoom}
            ></GoogleMapReact>
          </div>
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-7 mb-5">
            <button
              onClick={() => route.push("/registration/steps/1")}
              className="border border-secondary w-96 sm:w-64 h-14 rounded-xl text-secondary font-semibold text-xl"
            >
              Etape précédente
            </button>
            <button
              onClick={() => route.push("/registration/steps/3")}
              className="text-white font-medium text-xl rounded-xl w-96 sm:w-64 h-14 bg-background-gradient shadow-[0px_14px_24px_0px_rgba(255,125,60,0.25)]"
            >
              Continuons !
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
