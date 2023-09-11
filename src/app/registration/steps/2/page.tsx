"use client";
import { AddIcon, LogoIcon, MinusIcon } from "@/components/utilis/Icons";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import { setLocalStorage } from "@/api/storage";
import userLoader from "@/hooks/useLoader";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
} from '@react-google-maps/api'

const Step2 = () => {
  const [location, setLocation] = useState({lat: 48.8584, lng: 2.2945});
  const [address, setAddress] = useState<string>();

  const { loadingView } = userLoader();
  const route = useRouter();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAJiOb1572yF7YbApKjwe5E9L2NfzkH51E',
    libraries: ['places'],
  })

if (!isLoaded) {
   loadingView()
   return
}

const onClickNext = () => {
  setLocalStorage('salon_address', address);
  route.push("/registration/steps/3");
}
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
            <Autocomplete
              className="border"
              apiKey={"AIzaSyAJiOb1572yF7YbApKjwe5E9L2NfzkH51E"}
              style={{ width: "384px", borderRadius: '12px', marginTop:'28px', padding:'16px 24px', outline: 'none',  }}
              onPlaceSelected={(place) => {
                setAddress(place?.formatted_address);
                setLocation({lat: place.geometry?.location?.lat() ? place.geometry?.location?.lat() : 0, lng: place.geometry?.location?.lng() ? place.geometry?.location?.lng() : 0})
              }}
              defaultValue="Amsterdam"
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
            <GoogleMap center={location} zoom={10} mapContainerStyle={{ width: '100%', height: '100%' }}>
              <Marker position={location}/>
            </GoogleMap>
          </div>
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-7 mb-5">
            <button
              onClick={() => route.push("/registration/steps/1")}
              className="border border-secondary w-96 sm:w-64 h-14 rounded-xl text-secondary font-semibold text-xl"
            >
              Etape précédente
            </button>
            <button
              onClick={() => {onClickNext()}}
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
