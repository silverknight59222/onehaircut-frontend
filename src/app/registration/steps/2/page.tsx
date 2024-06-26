"use client";
import MapIcon, { AddIcon, CheckedIcon, LogoIcon, MinusIcon } from "@/components/utilis/Icons";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import { getLocalStorage, setLocalStorage } from "@/api/storage";
import userLoader from "@/hooks/useLoader";
import {
  useJsApiLoader,
  GoogleMap,
  MarkerF,
  CircleF,
} from '@react-google-maps/api'
import { ColorsThemeA, Theme_A } from "@/components/utilis/Themes";
import ReactDOMServer from "react-dom/server";
import {getCurrencyByCountryCode} from "@/utils/currency";

interface Address_int {
  country: string,
  state?: string,
  city: string,
  street: string,
  currency?: string,
  number: string,
  lat: number,
  long: number,
  zone: number,
  isMobile?: boolean
  postalCode: String,
  country_code: string,
}
const Step2 = () => {

  const [streetNb, setStreetNb] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [defaultValue, setDefaultValue] = useState("");

  const [location, setLocation] = useState({ lat: 48.8584, lng: 2.2945 });

  const [zone, setZone] = useState(10)
  const [zoomMap, setZoomMap] = useState(10)
  const [userCurrency, setUserCurrency] = useState("")

  const [IamMobile, setIamMobile] = useState(false);

  const { loadingView } = userLoader();
  const route = useRouter();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAJiOb1572yF7YbApKjwe5E9L2NfzkH51E',
    libraries: ['places'],
  })

  const zoneDeactivated = 'w-[85px] h-9 flex items-center justify-center text-stone-800 rounded-lg shadow-lg cursor-not-allowed  bg-[#D6D6D6]'
  const zoneActivated = 'w-[85px] h-9 flex items-center justify-center text-black border border-black rounded-lg shadow-lg cursor-not-allowed bg-white'

  // Determine the class name based on the condition
  const ZoneClassName = IamMobile ? zoneActivated : zoneDeactivated;

  // Pour l'icon sur la carte
  const mapIconSvg = ReactDOMServer.renderToStaticMarkup(<MapIcon />);
  const mapIconUrl = `data:image/svg+xml;base64,${btoa(mapIconSvg)}`;

  const onClickNext = () => {
    let toSave: Address_int = {
      country: country,
      street: street,
      currency: userCurrency || undefined,
      city: city,
      number: streetNb,
      lat: location.lat,
      long: location.lng,
      zone: zone,
      isMobile: isMobile,
      postalCode: postalCode,
      state: state,
      country_code : countryCode,
    };

    setLocalStorage('salon_address', JSON.stringify(toSave));
    route.push("/registration/steps/3");
  };

  const setAddressFields = (address: any, arg: string, value: string) => {
    switch (arg) {
      case 'sublocality_level_1':
      case 'locality':
        address['city'] = value
        break;
      case 'administrative_area_level_1':
        address['administrative_area_level_1'] = value
        break;
      case 'country':
        address['country'] = value
        break;
      case 'postal_code':
        address['postal_code'] = value
        break;
      case 'route':
        address['route'] = value
        break;
      case 'street_number':
        address['street_number'] = value
        break;
    }
    return address
  }


  const setAddressData = (place: any,) => {
    // console.log(place);

    setStreet("")
    setCity("")
    setState("")
    setCountry("")
    setPostalCode("")
    setCountryCode("")


    // Check if the variable is defined before using it
    if (place !== undefined && place.address_components !== undefined) {

      let address = {} as any
      place.address_components.map((item, index) => {
        setAddressFields(address, item.types[0], item.long_name);
      });
      const countryComponent = place.address_components.find(component => component.types.includes('country'));
      const countryCode = countryComponent ? countryComponent.short_name : null;
      setUserCurrency(getCurrencyByCountryCode(countryCode))

      setCity(address.city || "")
      setState(address.administrative_area_level_1 || "")
      setCountry(address.country || "")
      setCountryCode(countryCode)
      setPostalCode(address.postal_code || "")
      setStreetNb(address.street_number || "")
      setStreet(address.route || "")
      if (address.street_number && address.street_number != address.route) {
        setStreet((pre) => address.street_number + " " + pre)
      }

      setLocation({ lat: place.geometry.location.lat(), lng: place.geometry?.location?.lng() });
      setZoomMap(15);
    }
    // if place is undefined, reset location
    else {
      //console.log("Place not defined")
      setLocation({ lat: 48.8584, lng: 2.2945 });
      setZoomMap(10) // default zoom
    }
  }


  // useEffect(() => {
  //   //console.log(location)
  // }, [location])

  const zoneHandler = (operation: string) => {
    if (IamMobile) {
      let temp = zone;
      if (operation === 'add') {
        if (zone < 30) {
          temp = zone + 1
          setZone(temp)
        }
      } else {
        if (zone > 1) {
          temp = zone - 1
          setZone(temp)
        }
      }
      zoomHandler(temp);
    }
  }

  // Zoom calculation depending on the zone radius
  const zoomHandler = (zone: number) => {
    // zoom calculation:
    // Constants for estimation
    const earthRadius = 6371; // Earth's radius in km
    const degreesPerPixel = 0.00027; // An approximation, varies with latitude

    // Calculate the zoom level based on the radius
    const zoomLevel = (Math.log2((earthRadius * Math.PI * 156543.03392) / (zone * 1000 * 3000 * 256 * degreesPerPixel)));
    setZoomMap(Math.round(zoomLevel));
  }

  // function for clicking on the "je suis mobile"
  const onClickIamMobile = () => {

    setIsMobile(!IamMobile);

    // calculate the new zoom
    if (!IamMobile) {
      // zoom according to the radius
      zoomHandler(zone);
    }
    else {
      // default zoom
      setZoomMap(15);
    }
    // set the status
    setIamMobile(!IamMobile);
  }

  const onOHCLogoClick = () => {
    route.push(`/`)
  }

  useEffect(() => {
    let salonAddressString = getLocalStorage('salon_address')  || ""
    const salonAddress = salonAddressString ? JSON.parse(salonAddressString) : {}
    const {city, state, country, postalCode, street, number, country_code, isMobile, lat, long, zone, } = salonAddress
    setCity(city || "")
    setState(state || "")
    setCountry(country || "")
    setPostalCode(postalCode || "")
    setStreet(street  || "")
    setStreetNb(number || "")
    setCountryCode(country_code || "")
    setIsMobile(isMobile || false)
    setIamMobile(isMobile || false)
    if(lat && long){
      setLocation({ lat: lat, lng: long })
    }
    setZone(zone || 10)
    if(zone) {
      zoomHandler(zone);
    }
    if(street && city && country){
      setDefaultValue(street + ", " + city + ", " + country)
    }

  }, []);

  if (!isLoaded) {
    loadingView()

    return
  }

  return (
    <div>
      <div className="flex items-center justify-center border-b border-[#EBF0F2] mt-5 pb-3">
        <button className="cursor-pointer"
                onClick={() => onOHCLogoClick()}
        >
          <LogoIcon className={''} />
        </button>
      </div>
      <div className="flex flex-col items-center justify-center mt-6">
        <p className="text-black font-semibold text-xl md:text-2xl lg:text-3xl text-center px-6 w-full md:w-[800px] xl:w-[1100px]">
          Où est situé ton salon ? Si tu es mobile, renseigne la zone dans
          laquelle tu peux exercer !
        </p>
        <div className="w-full md:w-[800px] xl:w-[1050px] flex flex-col items-center justify-center mt-5 sm:mt-7">
          <p className="text-sm font-semibold text-grey text-start mt-4 italic ">Veuillez entrer votre adresse complète et la sélectionner lorsqu'elle apparaît</p>
          <div className="w-full flex flex-col md:flex-row items-center justify-between">
            <Autocomplete
              className="text-black placeholder-gray-600 w-full px-2 mx-2 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-Gray-500 focus:bg-gray-900 focus:text-white focus:placeholder-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
              apiKey={"AIzaSyAJiOb1572yF7YbApKjwe5E9L2NfzkH51E"}
              defaultValue={defaultValue}
              style={{ padding: '16px 24px', outline: 'none', }}
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

            {/* Check box for mobility */}
            <div className=" mt-5 md:mt-0">
              <p>Je suis mobile</p>
              <div
                onClick={() => onClickIamMobile()}
                className="flex items-center justify-center gap-3 cursor-pointer"
              >
                <div className={`w-6 h-6 pt-2 pl-1.5 rounded-[4px] border ${IamMobile
                  ? ColorsThemeA.ohcVerticalGradient_A
                  : "border-[#767676]"
                }`}
                >
                  {IamMobile && (
                    <CheckedIcon width="15" height="10" />)}
                </div>
              </div>
            </div>

            <div className="mt-5 md:mt-0">
              <p className="text-black mb-1">Zone de mobilité</p>
              <div className="flex items-center justify-center gap-3">
                <div className={ZoneClassName}>
                  {zone} km
                </div>
                <div className={`flex items-center justify-center py-1 rounded-md ${IamMobile ? ColorsThemeA.OhcGradient_A : ColorsThemeA.inactivButtonColor} shadow-lg`}>
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
          <div className="w-full h-96 px-2 my-12 shadow-lg rounded-3xl">
            <GoogleMap
              center={location}
              zoom={zoomMap}
              mapContainerStyle={{ width: '100%', height: '100%' }} >

              {/* Marker on the map */}
              {streetNb && <MarkerF
                position={location}
                icon={mapIconUrl} />}

              {/* Circle representing the range */}
              {streetNb && IamMobile && <CircleF
                center={{
                  lat: (location.lat),
                  lng: (location.lng)
                }}
                radius={zone * 1000} // radius is in meter
                options={{ fillColor: 'red', fillOpacity: 0.15, strokeColor: 'black' }}
              />}
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
              disabled={!city && !street}
              aria-label="123"
              className={`${street ? Theme_A.button.bigGradientButton : Theme_A.button.bigGreyButton} cursor-auto} `}>
              Continuons !
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
