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

interface Address_int {
  country: string,
  state?: string,
  city: string,
  street: string,
  number: string,
  lat: number,
  long: number,
  zone: number
}
const Step2 = () => {

  const [street, setStreet] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");

  const [location, setLocation] = useState({ lat: 48.8584, lng: 2.2945 });

  const [zone, setZone] = useState(10)
  const [zoomMap, setZoomMap] = useState(10)

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
    let toSave: Address_int = {
      country: country,
      street: street,
      city: city,
      number: streetNumber,
      lat: location.lat,
      long: location.lng,
      zone: zone,
    };

    setLocalStorage('salon_address', JSON.stringify(toSave));
    route.push("/registration/steps/3");
  }


  const setAddressData = (place: any,) => {
    setStreet("")
    setCity("")
    setState("")
    setCountry("")
    setPostalCode("")

    console.log(place);

    // Check if the variable is defined before using it
    if (place !== undefined && place.address_components !== undefined) {

      console.log("place is defined");

      for (let i = 0; i < place.address_components.length; i++) {
        if (place.address_components[i].types[0] === 'street_number') {
          setStreetNumber(place?.address_components[i].long_name);
        }
        else if (place?.address_components[i].types[0] === 'route') {
          setStreet(place?.address_components[i].long_name);
        }
        else if (place?.address_components[i].types[0] === 'locality') {
          setCity(place?.address_components[i].long_name);
        }
        else if (place?.address_components[i].types[0] === 'country') {
          setCountry(place?.address_components[i].long_name);
        }
        else if (place?.address_components[i].types[0] === 'postal_code') {
          setPostalCode(place?.address_components[i].long_name);
        }
      }

      setLocation({ lat: place.geometry.location.lat(), lng: place.geometry?.location?.lng() });
      setZoomMap(15);
    }
    // if place is undefined, reset location
    else {
      console.log("Place not defined")
      setLocation({ lat: 48.8584, lng: 2.2945 });
      setZoomMap(10) // default zoom
    }
  }


  // useEffect(() => {
  //   console.log(location)
  // }, [location])

  const zoneHandler = (operation: string) => {
    let temp
    if (operation === 'add') {
      temp = zone + 1
    } else {
      temp = zone - 1
    }
    setZone(temp)
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
              className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-Gray-500 focus:bg-gray-900 focus:text-white focus:placeholder-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
              apiKey={"AIzaSyAJiOb1572yF7YbApKjwe5E9L2NfzkH51E"}
              style={{ width: "450px", borderRadius: '12px', marginTop: '28px', padding: '16px 24px', outline: 'none', }}
              onPlaceSelected={(place) => setAddressData(place)}
              placeholder="Adresse"
              options={{
                types: ["geocode"],
                fields: [
                  'address_components',
                  'geometry.location'
                ]
              }}
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
            <GoogleMap
              center={location}
              zoom={zoomMap}
              mapContainerStyle={{ width: '100%', height: '100%' }} >
              <Marker position={location} visible={true} />
            </GoogleMap>
          </div>
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-7 mb-5">
            <button
              onClick={() => route.push("/registration/steps/1")}
              className={`${Theme_A.button.bigWhiteColoredButton}`}
            >
              Etape précédente
            </button>
            <button
              onClick={() => { onClickNext() }}
              disabled={!city && !street && !streetNumber}
              aria-label="123"
              className={`${streetNumber ? Theme_A.button.bigGradientButton : Theme_A.button.bigGreyButton} cursor-auto} `}>
              Continuons !
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
