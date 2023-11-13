"use client";
import { AddIcon, LogoIcon, MinusIcon } from "@/components/utilis/Icons";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import { setLocalStorage } from "@/api/storage";
import userLoader from "@/hooks/useLoader";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
} from '@react-google-maps/api'
import { ColorsThemeA, Theme_A } from "@/components/utilis/Themes";

interface Address {
  country?: string,
  state?: string,
  city?: string,
  lat: number,
  long: number,
  zone: number
}
const Step2 = () => {
  const [location, setLocation] = useState({ lat: 48.8584, lng: 2.2945 });
  const [address, setAddress] = useState<Address>({
    country: "",
    state: "",
    city: "",
    lat: 0,
    long: 0,
    zone: 0
  });
  const [zone, setZone] = useState(10)

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
    setLocalStorage('salon_address', JSON.stringify(address));
    route.push("/registration/steps/3");
  }

  const onPlaceSelected = (place: any) => {
    // Check if the variable is defined before using it
    if (place !== undefined && place.address_components !== undefined) {
      let data = {
        lat: place?.geometry?.location?.lat(),
        long: place?.geometry?.location?.lng(),
        zone: zone
      }

      for (let i = 0; i < place?.address_components.length; i++) {
        if (place?.address_components[i].types[0] === 'locality') {
          Object.assign(data, { city: place?.address_components[i].long_name })
        }
        if (place?.address_components[i].types[0] === 'country') {
          Object.assign(data, { country: place?.address_components[i].long_name })
        }
        if (place?.address_components[i].types[0] === 'administrative_area_level_1') {
          Object.assign(data, { state: place?.address_components[i].long_name })
        }
      }
      setAddress(data)
      setLocation({ lat: place.geometry?.location?.lat() ? place.geometry?.location?.lat() : 0, lng: place.geometry?.location?.lng() ? place.geometry?.location?.lng() : 0 })
    }
    // if place is undefined, reset location
    else {
      console.log("Place not defined")
      setAddress({ country: "", state: "", city: "", lat: 0, long: 0, zone: 0 });
      setLocation({ lat: 48.8584, lng: 2.2945 });
    }
  }

  const zoneHandler = (operation: string) => {
    let temp
    if (operation === 'add') {
      temp = zone + 1
    } else {
      temp = zone - 1
    }
    setZone(temp)
    setAddress({
      ...address,
      zone: temp
    })
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
              style={{ width: "384px", borderRadius: '12px', marginTop: '28px', padding: '16px 24px', outline: 'none', }}
              onPlaceSelected={(place) => onPlaceSelected(place)}
            />
            <div className="mt-5 md:mt-0">
              <p className="text-black mb-1">Zone de mobilité</p>
              <div className="flex items-center justify-center gap-7">
                <div className="w-[85px] h-9 flex items-center justify-center text-black border border-black rounded-lg shadow-lg">
                  {zone} KM
                </div>
                <div className={`flex items-center justify-center py-1 rounded-md ${ColorsThemeA.OhcGradient_A} shadow-lg`}>
                  <div onClick={() => zoneHandler('minus')} className="border-r border-white px-4 py-3 cursor-pointer transform hover:scale-110 transition-transform">
                    <MinusIcon />
                  </div>
                  <div onClick={() => zoneHandler('add')} className="py-1 px-4 cursor-pointer transform hover:scale-110 transition-transform">
                    <AddIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-96 my-12">
            <GoogleMap center={location} zoom={10} mapContainerStyle={{ width: '100%', height: '100%' }}>
              <Marker position={location} />
            </GoogleMap>
          </div>
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-7 mb-5">
            <button
              onClick={() => route.push("/registration/steps/1")}
              // className="border border-secondary w-96 sm:w-64 h-14 rounded-xl text-secondary font-normal text-lg"
              className={`${Theme_A.button.bigWhiteColoredButton}`}
            >
              Etape précédente
            </button>
            <button
              onClick={() => { onClickNext() }}
              disabled={!address.country}
              aria-label="123"
              // className={`text-white font-medium text-xl rounded-xl w-96 sm:w-64 h-14 shadow-[0px_14px_24px_0px_rgba(255,125,60,0.25)] ${!address.country ? 'bg-[#D9D9D9]' : 'bg-background-gradient '}`}
              className={`${address.country ? Theme_A.button.bigGradientButton : Theme_A.button.bigWhiteGreyButton} cursor-auto} `}>
              Continuons !
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
