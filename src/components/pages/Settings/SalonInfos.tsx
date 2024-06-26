import React, { useState, useEffect } from "react";
import {
  EditIcon,
  CheckedIcon,
  MinusIcon,
  AddIcon,
} from "@/components/utilis/Icons";
import { Theme_A } from "@/components/utilis/Themes";
import BaseModal from "@/components/UI/BaseModal";
import DropdownMenu from "@/components/UI/DropDownMenu";
import { ColorsThemeA } from "@/components/utilis/Themes";
import CustomSlider from "@/components/UI/OHC_Slider";
import CustomInput from "@/components/UI/CustomInput";
import ComponentTheme from "@/components/UI/ComponentTheme";
import Autocomplete from "react-google-autocomplete";
import { client } from "@/api/clientSide";
import { salonApi } from "@/api/salonSide";
import useSnackbar from "@/hooks/useSnackbar";
import {
  getLocalStorage,
  removeFromLocalStorage,
  setLocalStorage,
} from "@/api/storage";
import { ErrorBar } from "recharts";
import InfoButton from "@/components/UI/InfoButton";
import TourModal, { Steps } from "@/components/UI/TourModal";
import userLoader from "@/hooks/useLoader";
import { dashboard } from "@/api/dashboard";
import { Auth } from "@/api/auth";
import AudioPlayerForTour from "@/components/UI/PlayerForTour";
import {getCurrencyByCountryCode} from "@/utils/currency";

const SalonInfos = () => {
  const [userData, setUserData] = useState<any>();
  const [salonInfo, setSalonInfo] = useState<any>();

  const [isModal, setIsModal] = useState(false);
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [billingName, setBillingName] = useState("");
  const [billingStreet, setBillingStreet] = useState("");
  const [billingPostalCode, setBillingPostalCode] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingState, setBillingState] = useState("");
  const [billingCountry, setBillingCountry] = useState("");
  const [isBillingAddressSame, setIsBillingAddressSame] = useState(false);
  const [SelectedSalonType, setSelectedSalonType] = useState<
    string | undefined
  >("");
  const [SalonType, setSalonType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const showSnackbar = useSnackbar();
  const [ZonePrice, setZonePrice] = useState(0);
  const [ZoneDuration, setZoneDuration] = useState(0);
  const [pageDone, setPageDone] = useState<String[]>(["salon_info"]);
  const { loadingView } = userLoader();
  const [siretNumber, setSiretNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [addressResponse, setAddressResponse] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    name: "",
    zipcode: "",
    billing_name: "",
    billing_city: "",
    billing_zip_code: "",
    billing_country: "",
    billing_state: "",
    billing_street: "",
  });
  const [locationLatitude, setLocationLatitude] = useState(0.0);
  const [locationLongitude, setLocationLongitude] = useState(0.0);
  const openModal = () => {
    setIsModal(true);
  };
  const closeModal = () => {
    setIsModal(false);
  };

  // Error state
  const [error, setError] = useState({
    text: "",
  });
  const [errorBilling, setErrorBilling] = useState({
    text: "",
  });
  const typesSalon = [
    {
      name: "barber_shop",
      nameFr: "Barber-shop",
    },
    {
      name: "women_hair_salon",
      nameFr: "Salon pour femmes",
    },
    {
      name: "men_hair_salon",
      nameFr: "Salon pour hommes",
    },
    {
      name: "independent_man_mobile_hairdresser",
      nameFr: "Coiffeur/euse mobile homme",
    },
    {
      name: "independent_woman_mobile_hairdresser",
      nameFr: "Coiffeur/euse mobile femme",
    },
    {
      name: "unisex_hair_salon",
      nameFr: "Salon mixte",
    },
  ];

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  // ------------------------------------------------------------------
  // Gérez le changement du numéro de SIRET
  const handleSiretNumberChange = (e) => {
    setSiretNumber(e.target.value);
  };
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  const getUserInformation = async () => {
    if (userData == null) {
      let resp = await Auth.getUser();
      // console.log(resp)
    } else {
      setPhoneNumber(userData.phone as string);
    }
  };
  // Utilisez useEffect pour déclencher la recherche de la ville lorsque le code postal change
  useEffect(() => {
    const tempSalon = getLocalStorage("hair_salon");
    let salon = tempSalon ? JSON.parse(tempSalon) : null;
    setSalonInfo(salon);
    const user = getLocalStorage("user");
    setUserData(user ? JSON.parse(user) : null);
    fetchAdress();
    getUserInformation();
    if (salon) {
      // console.log("Salon Type Real : " + salon.type)
      typesSalon.find((type) => {
        // if(type.name === salon.type){
        //     console.log("Type Name :" + type.name)
        //     console.log("Salon Info :" + salon.type)
        // }
        return type.name === salon.type;
      });
      // console.log(typesSalon.find(type => type.name === salon.type)?.nameFr)
      // console.log(typesSalon.find(type => type.name === salon.type)?.nameFr)
      setSelectedSalonType(
        typesSalon.find((type) => type.name === salon.type)?.nameFr
      );
      setTypeImage(
        typesSalon.find((type) => type.name === salon.type)?.nameFr
      );
      setIsMobilityAllowed(salon.is_mobile);
      setSiretNumber(salon.company_id_number);
    }
    const pages_done = getLocalStorage("pages_done");
    setPageDone(pages_done ? JSON.parse(pages_done) : []);
  }, []);

  const saveSalonType = async (item) => {
    setIsLoading(true);
    await salonApi
      .saveSalonType({ type: item })
      .then((resp) => {
        removeFromLocalStorage("hair_salon");
        setLocalStorage("hair_salon", JSON.stringify(resp.data));
        let user_info: any = getLocalStorage("user");
        user_info = user_info ? JSON.parse(user_info) : null;
        user_info.hair_salon = resp.data;
        setLocalStorage("user", JSON.stringify(user_info));
        showSnackbar("success", "Changement du type de salon effectué.");
      })
      .catch((err) => {
        //console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const saveSalonMobility = async (isMobilityAllowed) => {
    await salonApi
      .saveSalonMobility({ is_mobile: isMobilityAllowed })
      .then((resp) => {
        showSnackbar("success", "Salon Mobility Saved Successfully.");
      })
      .catch((err) => {
        //console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const saveZoneRadius = async (radius, duration) => {
    await salonApi
      .saveZoneRadius({
        zone_radius: radius,
        zone_duration: duration,
        price: ZonePrice,
      })
      .then((resp) => {
        showSnackbar("success", "Salon Mobility Zone Saved Successfully.");
      })
      .catch((err) => {
        //console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // handling the change of Salon type change

  //For mobility checkbox
  const [isMobilityAllowed, setIsMobilityAllowed] = useState(false); // État de la checkbox
  const handleCheckboxChange = (mobility: boolean) => {
    // console.log(!mobility);
    setIsMobilityAllowed(!mobility);
    saveSalonMobility(!mobility);
  };
  const [selectedWeekday, setSelectedWeekday] = useState<string>("");

  //For Dropdown lists Type of salon
  const SalonTypeList = [
    "Barber-shop",
    "Salon pour hommes",
    "Salon pour femmes",
    "Coiffeur/euse mobile homme",
    "Coiffeur/euse mobile femme",
    "Salon mixte",
  ];

  const [selectedImageUrl, setSelectedImageUrl] = useState(
    "/assets/DefaultPictures/Profil.png"
  );
  const HandleSelectedSalonType = async (item: string) => {
    setIsLoading(true);
    setSelectedSalonType(item);
    setTypeImage(item);
    saveSalonType(item);
    // Utilisez setTimeout pour retarder le rechargement, permettant à l'UI de se mettre à jour.
    const { data } = await Auth.getUser();
    setSalonInfo(data.user.hair_salon);
    if (data.user.hair_salon) {
      setLocalStorage("hair_salon", JSON.stringify(data.user.hair_salon));
    }
    setIsLoading(false);
  };

  const setTypeImage = (item) => {
    let imageUrl = "/assets/DefaultPictures/Profil.png";
    switch (item) {
      case "Barber-shop":
        setSalonType("Barber-shop");
        imageUrl = "/assets/salon_types/BarberShop.png";
        break;
      case "Salon pour hommes":
        setSalonType("Salon pour hommes");
        imageUrl = "/assets/salon_types/Salon de coiffure pour homme.png";
        break;
      case "Salon pour femmes":
        setSalonType("Salon pour femmes");
        imageUrl = "/assets/salon_types/Salon de coiffure pour femme.png";
        break;
      case "Coiffeur/euse mobile homme":
        setSalonType("Coiffeur/euse mobile homme");
        imageUrl = "/assets/salon_types/Coiffeur Independant.png";
        break;
      case "Coiffeur/euse mobile femme":
        setSalonType("Coiffeur/euse mobile femme");
        imageUrl = "/assets/salon_types/Coiffeuse Indépendante.png";
        break;
      case "Salon mixte":
        setSalonType("Salon mixte'");
        imageUrl = "/assets/salon_types/Salon de coiffure mixte.png";
        break;
      default:
        imageUrl = "/assets/salon_types/Salon de coiffure mixte.png";
        break;
    }
    setSelectedImageUrl(imageUrl);
  };

  //For the slider :
  // Reset the slider values
  const [zoneSliderRange, setZoneSliderRange] = useState([0, 15]);
  const [userCurrency, setUserCurrency] = useState("");
  const handleZoneSliderChange = (newValue: any) => {
    // console.log(newValue);
    setZonePrice(ZonePrice);
    saveZoneRadius(newValue, ZoneDuration);
    saveSalonType(SelectedSalonType);
    saveSalonMobility(isMobilityAllowed);
  };
  const updateSliderChange = (event: any, newValue: any) => {
    setZoneSliderRange(newValue);
    // console.log(newValue)
  };
  const setAddressFields = (address: any, arg: string, value: string) => {
    switch (arg) {
      case "sublocality_level_1":
      case "locality":
        address["city"] = value;
        break;
      case "administrative_area_level_1":
        address["administrative_area_level_1"] = value;
        break;
      case "country":
        address["country"] = value;
        break;
      case "postal_code":
        address["postal_code"] = value;
        break;
      case "route":
        address["route"] = value;
        break;
      case "street_number":
        address["street_number"] = value;
        break;
    }
    return address;
  };
  const setAddressData = async (place: any) => {
    setStreet("");
    setCity("");
    setState("");
    setCountry("");
    setPostalCode("");
    setError((prev) => {
      return { ...prev, text: "" };
    });

    // take actions only if there is a place
    if (place != undefined) {
      let address = {} as any;
      place.address_components.map((item, index) => {
        setAddressFields(address, item.types[0], item.long_name);
      });

      setCity(address.city || "");
      setState(address.administrative_area_level_1 || "");
      setCountry(address.country || "");
      setPostalCode(address.postal_code || "");

      const countryShortName = place?.address_components?.find((e) => {
        if(e.types[0] == "country") return e.short_name
      })
      setUserCurrency(getCurrencyByCountryCode(countryShortName?.short_name))

      setStreet(address.route || "");
      if (address.street_number && address.street_number != address.route) {
        setStreet((pre) => address.street_number + " " + pre);
      } else if (!address.street_number) {
        // console.log('pas de numero');
        setError((prev) => {
          return { ...prev, text: "Veuillez indiquer le numéro de rue" };
        });
      }
      setLocationLatitude(place.geometry.location.lat());
      setLocationLongitude(place.geometry.location.lng());
    }
  };

  // function to set the state variables based on the google input parameters
  const setAddressDataBilling = async (place: any) => {
    setBillingStreet("");
    setBillingCity("");
    setBillingState("");
    setBillingCountry("");
    setBillingPostalCode("");
    setError((prev) => {
      return { ...prev, text: "" };
    });

    let address = {} as any;
    place.address_components.map((item, index) => {
      setAddressFields(address, item.types[0], item.long_name);
    });

    setBillingCity(address.city || "");
    setBillingState(address.administrative_area_level_1 || "");
    setBillingCountry(address.country || "");
    setBillingPostalCode(address.postal_code || "");

    setBillingStreet(address.route || "");
    if (address.street_number && address.street_number != address.route) {
      setBillingStreet((pre) => address.street_number + " " + pre);
    } else if (!address.street_number) {
      // console.log('pas de numero');
      setErrorBilling((prev) => {
        return { ...prev, text: "Veuillez indiquer le numéro de rue" };
      });
    }
  };

  const billingAddressIsSame = () => {
    setBillingCity(city);
    setBillingCountry(country);
    setBillingName(name);
    setBillingPostalCode(postalCode);
    setBillingState(state);
    setBillingStreet(street);
  };
  const handleChange = (e: any) => {
    setStreet(e.target.value);
  };
  const handleChangeBilling = (e: any) => {
    setBillingStreet(e.target.value);
  };

  const SaveAddress = async () => {
    setIsLoading(true);
    isBillingAddressSame ? billingAddressIsSame() : "";
    await salonApi
      .storeAddresses({
        name: name,
        street: street,
        zipcode: postalCode,
        currency: userCurrency || undefined,
        city: city,
        state: state,
        country: country,
        billing_name: billingName,
        billing_street: billingStreet,
        billing_zipcode: billingPostalCode,
        billing_city: billingCity,
        billing_state: billingState,
        billing_country: billingCountry,
        is_billing_address_same: isBillingAddressSame,
        latitude: locationLatitude,
        longitude: locationLongitude,
      })
      .then((resp) => {
        showSnackbar("success", "Adresse mise à jour avec succès.");
        setIsModal(false);
      })
      .catch((err) => {
        //console.log(err);
      })
      .finally(async () => {
        let user_info: any = getLocalStorage("user");
        removeFromLocalStorage("user");
        const { data } = await Auth.getUser();
        user_info = user_info ? JSON.parse(user_info) : null;
        if (user_info) {
          user_info = {
            ...user_info,
            ...data.user,
          };
        }
        user_info.name = name;
        user_info.currency = data?.user?.currency || user_info.currency;
        user_info.hair_salon.name = name;
        setLocalStorage("user", JSON.stringify(user_info));
        let salon_info: any = getLocalStorage("hair_salon");
        removeFromLocalStorage("hair_salon");
        salon_info = salon_info ? JSON.parse(salon_info) : null;
        salon_info.name = name;
        setLocalStorage("hair_salon", JSON.stringify(salon_info));
        setIsLoading(false);
        fetchAdress();
      });
  };

  const fetchAdress = async () => {
    setIsLoading(true);
    const resp = await salonApi.getAddresses();
    // console.log(resp)
    setAddressResponse(resp.data);
    setName(resp.data.name);
    setStreet(resp.data.street);
    setLocationLatitude(resp.data.lat);
    setLocationLongitude(resp.data.long);
    setPostalCode(resp.data.zipcode);
    setCity(resp.data.city);
    setState(resp.data.state);
    setCountry(resp.data.country);
    setIsBillingAddressSame(resp.data.is_billing_address_same);
    setBillingName(resp.data.billing_name);
    setBillingStreet(resp.data.billing_street);
    setBillingPostalCode(resp.data.billing_zip_code);
    setBillingCity(resp.data.billing_city);
    setBillingState(resp.data.billing_state);
    setBillingCountry(resp.data.billing_country);
    setZonePrice(resp.data.bill_per_km);
    setZoneDuration(resp.data.dur_per_km);
    setZoneSliderRange([resp.data.min_km, resp.data.max_km]);
    setIsMobilityAllowed(resp.data.is_mobile);
    await wait(1000);
    setIsLoading(false);
  };

  const [billingPerKm, setBillingPerKm] = useState("");
  const [maxFees, setMaxFees] = useState(0);
  const [maxDurationTravel, setMaxDurationTravel] = useState(0);

  // Supposons que vous utilisiez la deuxième valeur du slider pour numericZoneSliderRange
  const numericZoneSliderRange = zoneSliderRange[1];
  const numericBillingPerKm = Number(billingPerKm);

  const isInputValid = numericBillingPerKm > 0 && numericZoneSliderRange > 0;

  useEffect(() => {
    setMaxFees(ZonePrice * numericZoneSliderRange);
    setMaxDurationTravel(ZoneDuration * numericZoneSliderRange);
  }, [ZonePrice, numericZoneSliderRange, ZoneDuration]);

  const handleBillingPerKmChange = (e) => {
    setBillingPerKm(e.target.value);
  };

  const zonePriceHandler = (operation) => {
    if (isMobilityAllowed) {
      let newPrice = ZonePrice;
      if (operation === "add" && ZonePrice < 30) {
        newPrice = parseFloat((ZonePrice + 0.1).toFixed(2));
      } else if (operation === "minus" && ZonePrice > 0) {
        newPrice = parseFloat((ZonePrice - 0.1).toFixed(2));
      }
      setZonePrice(newPrice);
    }
  };

  const zoneDurationHandler = (operation) => {
    if (isMobilityAllowed) {
      let newZoneDuration = ZoneDuration;
      if (operation === "add" && ZoneDuration < 60) {
        newZoneDuration = ZoneDuration + 1;
      } else if (operation === "minus" && ZonePrice > 0) {
        newZoneDuration = ZoneDuration - 1;
      }
      setZoneDuration(newZoneDuration);
    }
  };

  const updateSiretNumber = async (siretNumber) => {
    await salonApi
      .updateSiretNumber({ siretNumber: siretNumber })
      .then((res) => {
        if (res.data.status == 200) {
          setSiretNumber(siretNumber);
          removeFromLocalStorage("hair_salon");
          console.log("sdsdsdsd", res.data);
          setLocalStorage("hair_salon", JSON.stringify(res.data.data));
          showSnackbar("success", res.data.message);
        } else {
          showSnackbar(
            "error",
            "Erreur lors de l'enregistrement du numéro de SIRET"
          );
        }
      })
      .catch((reason) => {
        showSnackbar("error", "Erreur, verifier le format du numéro de SIRET");
      })
      .finally(() => {
        closeSiretUpdateModal();
      });
  };

  const updatePhoneNumber = async (phoneNumber) => {
    await salonApi
      .updatePhoneNumber({ phoneNumber: phoneNumber })
      .then((res) => {
        if (res.data.status == 200) {
          setPhoneNumber(res.data.data.phone);
          removeFromLocalStorage("user");
          setLocalStorage("user", JSON.stringify(res.data.data));
          showSnackbar("success", res.data.message);
        } else {
          showSnackbar("error", "Error on updating phone number");
        }
      })
      .catch((reason) => {
        showSnackbar("error", reason);
      });
  };

  const [isSiretUpdateModalOpen, setIsSiretUpdateModalOpen] = useState(false);
  const openSiretUpdateModal = () => {
    setIsSiretUpdateModalOpen(true);
  };

  const closeSiretUpdateModal = () => {
    setIsSiretUpdateModalOpen(false);
  };

  const [isSiretCheckboxChecked, setIsSiretCheckboxChecked] = useState(false);

  // Fonction pour gérer le changement d'état de la checkbox
  const handleSiretCheckboxChange = () => {
    setIsSiretCheckboxChecked(!isSiretCheckboxChecked);
  };

  // ------------------------------------------------------------------
  // For Tour
  const tourSteps: Steps[] = [
    {
      selector: ".zone_address",
      content: (
        <div key="/assets/audio/tour/salon/Settings-Info_men_1.mp3">
          <AudioPlayerForTour src="/assets/audio/tour/salon/Settings-Info_men_1.mp3" />
          <p>
            Vous pouvez changer l'adresse de facturation ou de l’établissement.
          </p>
        </div>
      ),
    },
    {
      selector: ".button_type_salon",
      content: (
        <div key="/assets/audio/tour/salon/Settings-Info_men_2.mp3">
          <AudioPlayerForTour src="/assets/audio/tour/salon/Settings-Info_men_2.mp3" />
          <p>L'adaptation du type d'établissement se fait là.</p>
        </div>
      ),
    },
    {
      selector: ".field_ID_salon",
      content: (
        <div key="/assets/audio/tour/salon/Settings-Info_men_3.mp3">
          <AudioPlayerForTour src="/assets/audio/tour/salon/Settings-Info_men_3.mp3" />
          <p>Entrer ensuite votre numéro d'identification.</p>
        </div>
      ),
    },
    {
      selector: ".field_mobility",
      content: (
        <div key="/assets/audio/tour/salon/Settings-Info_men_4.mp3">
          <AudioPlayerForTour src="/assets/audio/tour/salon/Settings-Info_men_4.mp3" />
          <p>Vous pouvez paramétrer la mobilité de votre établissement.</p>
        </div>
      ),
    },
  ];

  const closeTour = async () => {
    // You may want to store in local storage or state that the user has completed the tour
    setIsLoading(true);
    if (!pageDone.includes("salon_info")) {
      let resp = await salonApi.assignStepDone({ page: "salon_info" });

      if (resp.data?.pages_done) {
        setLocalStorage("pages_done", JSON.stringify(resp.data.pages_done));
      }
      setPageDone((prevArray) => [...prevArray, "salon_info"]);
    }
    setIsLoading(false);
  };
  // ------------------------------------------------------------------

  /************************************************************************************************************************** */

  return (
    // ...
    <div
      className={`w-[500px] h-max bg-white rounded-2xl py-4 shadow-lg mb-12`}
    >
      {isLoading && loadingView()}
      {/* For explaining the website */}
      <TourModal
        steps={tourSteps}
        onRequestClose={closeTour}
        doneTour={pageDone.includes("salon_info")}
      />

      {isModal && (
        <BaseModal close={() => setIsModal(false)} width="w-[600px]">
          <div className="relative z-100">
            {/* Contenu du Modal Adresse */}
            <div className="flex">
              {/* Adresse */}
              <div className="flex-1 py-5 pl-5 overflow-hidden">
                <h1 className="inline text-2xl font-semibold leading-none">
                  Adresse
                </h1>
              </div>
            </div>
            <p className="text-sm font-semibold text-grey text-center mt-4 italic ">
              Veuillez entrer votre adresse dans le 2ème champs et la
              sélectionner lorsqu'elle apparaît
            </p>
            <div className="px-5 pb-5">
              <input
                placeholder="Nom"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
                className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-Gray-500 focus:bg-gray-900 focus:text-white focus:placeholder-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
              />
              <Autocomplete
                className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-Gray-500 focus:bg-gray-900 focus:text-white focus:placeholder-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                apiKey="AIzaSyAJiOb1572yF7YbApKjwe5E9L2NfzkH51E"
                onPlaceSelected={(place) => {
                  setAddressData(place);
                }}
                options={{
                  types: ["geocode"],
                  fields: ["address_components", "geometry.location"],
                }}
                onChange={handleChange}
                placeholder="Address"
                defaultValue={street}
              />
              {error && (
                <p className={`${Theme_A.checkers.errorText}`}>{error.text}</p>
              )}
              <div className="flex">
                <div className="flex-grow w-1/4 pr-2">
                  <input
                    disabled={true}
                    placeholder="Code Postal"
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    maxLength={50}
                    className={`${Theme_A.fields.inputFieldDisabled}`}
                  />
                  <input
                    disabled={true}
                    placeholder="État"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    maxLength={50}
                    className={`${Theme_A.fields.inputFieldDisabled}`}
                  />
                </div>
                <div className="flex-grow">
                  <input
                    disabled={true}
                    placeholder="Ville"
                    type="text"
                    className={`${Theme_A.fields.inputFieldDisabled}`}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <input
                    disabled={true}
                    placeholder="Pays"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    maxLength={50}
                    className={`${Theme_A.fields.inputFieldDisabled}`}
                  />
                </div>
              </div>
              <div className="flex items-center pt-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-black bg-gray-300 border-none rounded-xl focus:ring-transparent"
                  checked={isBillingAddressSame} // Utilisation de l'état de la checkbox
                  onChange={() => {
                    setIsBillingAddressSame(!isBillingAddressSame);
                    isBillingAddressSame ? billingAddressIsSame() : "";
                  }} // Mettre à jour l'état de la checkbox
                />
                <label
                  htmlFor="safeAdress"
                  className="block ml-2 text-sm text-gray-900"
                >
                  Adresse de facturation
                </label>
              </div>
            </div>

            {/* Adresse de facturation */}
            {!isBillingAddressSame && (
              <div className="flex">
                <div className="flex-1 py-5 pl-5 overflow-hidden">
                  <h1 className="inline text-2xl font-semibold leading-none">
                    Adresse de facturation
                  </h1>
                </div>
                <div className="flex-none pt-2.5 pr-2.5 pl-1" />
              </div>
            )}
            {!isBillingAddressSame && (
              <div className="px-5 pb-5">
                <input
                  placeholder="Nom de Facturation"
                  type="text"
                  value={billingName}
                  onChange={(e) => setBillingName(e.target.value)}
                  maxLength={50}
                  className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-Gray-500 focus:bg-gray-900 focus:text-white focus:placeholder-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                />
                <Autocomplete
                  className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 focus:border-Gray-500 focus:bg-gray-900 focus:text-white focus:placeholder-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                  apiKey="AIzaSyAJiOb1572yF7YbApKjwe5E9L2NfzkH51E"
                  onPlaceSelected={(place) => {
                    setAddressDataBilling(place);
                  }}
                  options={{
                    types: ["geocode"],
                    fields: ["address_components", "geometry.location"],
                  }}
                  onChange={handleChangeBilling}
                  placeholder="Address"
                  defaultValue={billingStreet}
                />

                {errorBilling && (
                  <p className={`${Theme_A.checkers.errorText}`}>
                    {errorBilling.text}
                  </p>
                )}
                <div className="flex">
                  <div className="flex-grow w-1/4 pr-2">
                    <input
                      disabled={true}
                      placeholder="Code postal de facturation"
                      type="text"
                      value={billingPostalCode}
                      onChange={(e) => setBillingPostalCode(e.target.value)}
                      maxLength={50}
                      className={`${Theme_A.fields.inputFieldDisabled}`}
                    />
                    <input
                      disabled={true}
                      placeholder="État de facturation"
                      type="text"
                      value={billingState}
                      onChange={(e) => setBillingState(e.target.value)}
                      maxLength={50}
                      className={`${Theme_A.fields.inputFieldDisabled}`}
                    />
                  </div>
                  <div className="flex-grow">
                    <input
                      disabled={true}
                      placeholder="Ville de facturation"
                      type="text"
                      className={`${Theme_A.fields.inputFieldDisabled}`}
                      value={billingCity}
                      onChange={(e) => setBillingCity(e.target.value)}
                      maxLength={50}
                    />
                    <input
                      disabled={true}
                      placeholder="Pays de facturation"
                      type="text"
                      value={billingCountry}
                      onChange={(e) => setBillingCountry(e.target.value)}
                      maxLength={50}
                      className={`${Theme_A.fields.inputFieldDisabled}`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Séparation */}
            <hr className="mt-4" />

            <div className="flex flex-row-reverse p-3">
              {/* Boutons */}
              <div className="flex-initial pl-3">
                <button
                  disabled={
                    street == "" || error.text != "" || errorBilling.text != ""
                  }
                  type="button"
                  onClick={() => SaveAddress()}
                  className={`${street == "" || error.text != "" || errorBilling.text != ""
                    ? Theme_A.button.medGreyColoredButton
                    : Theme_A.button.medBlackColoredButton
                    } ease-in-out transition duration-300`}
                >
                  <span>Enregistrer</span>
                </button>
              </div>
              <div className="flex-initial">
                <button
                  type="button"
                  onClick={closeModal}
                  className={`${Theme_A.button.medWhiteColoredButton} ease-in-out transition duration-300`}
                >
                  <span>Annuler</span>
                </button>
              </div>
            </div>
            {/* Fin du contenu du Modal Adresse */}
          </div>
        </BaseModal>
      )}

      {/* Affichage des adresses dans la vignette principale */}
      <div className="flex">
        <h4 className="flex items-center justify- ml-6 mb-2 font-semibold text-lg">
          Adresses
        </h4>
      </div>

      <div className="flex zone_address">
        <div className="flex-1 py-5 pl-5 ml-8 ">
          <ul>
            <li className="text-sm mb-2 text-gray-400 uppercase font-semibold">
              Adresse de l'établissement
            </li>
            <li className="text-sm text-gray-400 italic">
              Nom : {addressResponse.name}
            </li>
            <li className="text-sm text-gray-400 italic">
              Adresse : {addressResponse.street}
            </li>
            <li className="text-sm text-gray-400 italic">
              Code postal : {addressResponse.zipcode}
            </li>
            <li className="text-sm text-gray-400 italic">
              Ville : {addressResponse.city}
            </li>
            <li className="text-sm text-gray-400 italic">
              État : {addressResponse.state}
            </li>
            <li className="text-sm text-gray-400 italic">
              Pays : {addressResponse.country}
            </li>
          </ul>
        </div>
        <div className="flex-1 py-5 pl-1 overflow-hidden ml-4">
          <ul>
            <li className="text-sm mb-2 text-gray-400 uppercase font-semibold">
              Adresse de <br /> facturation
            </li>
            <li className="text-sm text-gray-400 italic">
              Nom : {addressResponse.billing_name}
            </li>
            <li className="text-sm text-gray-400 italic">
              Adresse : {addressResponse.billing_street}
            </li>
            <li className="text-sm text-gray-400 italic">
              Code postal : {addressResponse.billing_zip_code}
            </li>
            <li className="text-sm text-gray-400 italic">
              Ville : {addressResponse.billing_city}
            </li>
            <li className="text-sm text-gray-400 italic">
              État : {addressResponse.billing_state}
            </li>
            <li className="text-sm text-gray-400 italic">
              Pays : {addressResponse.billing_country}
            </li>
          </ul>
        </div>
        <div
          className={`${Theme_A.servicesCards.modifyButton} mr-8 shadow-md  transition-transform duration-300 transform hover:scale-125`}
          onClick={openModal}
        >
          <EditIcon />
        </div>
      </div>

      {/* Séparation */}
      <hr className="mx-16 border-gray-300 h-4" />

      {/* TYPE D ETABLISSEMENT */}
      <h4 className="flex items-center justify- ml-6 mb-8 font-semibold text-lg">
        Type d'établissement
      </h4>
      <div className="flex items-center justify-center mb-2 button_type_salon">
        {" "}
        {/* Increased horizontal spacing */}
        {/* DropDown + Vignette avec image */}
        <div className="flex items-center">
          <DropdownMenu
            dropdownItems={SalonTypeList}
            fctToCallOnClick={HandleSelectedSalonType}
            menuName="Type d'établissement"
            selectId={SelectedSalonType}
          />
          <img
            src={selectedImageUrl}
            alt=""
            className="w-32 h-24 mr-4 ml-8 bg-stone-300 rounded-lg mb-4 "
          />
        </div>
      </div>

      {isSiretUpdateModalOpen && (
        <BaseModal
          close={closeSiretUpdateModal}
          width="md:w-[auto]"
          opacity={60}
        >
          {/* Contenu du modal */}
          <div>
            <h4 className="flex items-center justify-center ml-6 mb-8 font-semibold text-xl">
              Numéro d'identification
            </h4>
            <div className="text-center text-sm">
              <p>
                Vous êtes sur le point de mettre à jour votre numéro
                d'identification.
              </p>
              <p>Celui-ci sera contrôlé.</p>
              <p>
                Onehaircut se réserve le droit de bloquer temporairement votre
                compte en cas d'information erronée.
              </p>
              <p>Vous serez notifié par email en cas de problème.</p>
            </div>

            {/* Checkbox et label "Je certifie que mes informations sont correctes" */}
            <div className="flex items-center justify-center py-5">
              <label
                htmlFor="SiretCertification"
                className="text-md font-semibold text-gray-900"
              >
                Je certifie que mes informations sont correctes
              </label>
              <div
                className={`w-6 h-6 ml-4 rounded ${isSiretCheckboxChecked
                  ? ColorsThemeA.ohcVerticalGradient_A
                  : "bg-[#D6D6D6]"
                  } flex items-center justify-center cursor-pointer`}
                onClick={() => handleSiretCheckboxChange()}
              >
                {isSiretCheckboxChecked && <CheckedIcon />}
              </div>
            </div>

            {/* Conteneur pour les boutons */}
            <div className="flex justify-center items-center gap-4 mt-4">
              {/* Bouton Annuler */}
              <button
                onClick={closeSiretUpdateModal}
                className={`px-4 py-2 rounded-md ${Theme_A.button.medWhiteColoredButton} shadow-md`}
              >
                Annuler
              </button>

              {/* Bouton Confirmer */}
              <button
                onClick={() =>
                  isSiretCheckboxChecked && updateSiretNumber(siretNumber)
                }
                disabled={!isSiretCheckboxChecked}
                className={`px-4 py-2 rounded-md ${isSiretCheckboxChecked
                  ? Theme_A.button.mediumGradientButton
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  } shadow-md`}
              >
                Confirmer
              </button>
            </div>
          </div>
        </BaseModal>
      )}
      <h4 className="flex items-center justify-start ml-10 mt-6 mb-8 font-semibold text-sm">
        N° de téléphone (Entrez un numéro valide)*
      </h4>
      <div className="flex-inputs flex justify-center mb-8 field_ID_salon">
        <CustomInput
          id="phoneNumber"
          label="N° de tel.*"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          type="text"
        />
        <button
          className={`ml-8 flex gap-4 items-center justify-center w-22 ${Theme_A.button.medBlackColoredButton}`}
          /* onClick={() => updateSiretNumber(siretNumber)}> Mettre à jour</button> */
          onClick={() => updatePhoneNumber(phoneNumber)}
        >
          {" "}
          Mettre à jour
        </button>
      </div>

      <h4 className="flex items-center justify-start ml-10 mt-6 mb-8 font-semibold text-sm">
        N° d'identification d'entreprise (SIRET, UID, CIF etc)*
      </h4>
      <div className="flex-inputs flex justify-center mb-8 field_ID_salon">
        <CustomInput
          id="siretNumber"
          label="N° d'identification *"
          value={siretNumber}
          onChange={handleSiretNumberChange}
          type="number"
        />
        <button
          className={`ml-8 flex gap-4 items-center justify-center w-22 ${Theme_A.button.medBlackColoredButton}`}
          /* onClick={() => updateSiretNumber(siretNumber)}> Mettre à jour</button> */
          onClick={() => openSiretUpdateModal()}
        >
          {" "}
          Mettre à jour
        </button>
      </div>

      {/* Séparation */}
      <hr className=" mx-16 border-gray-300 h-4" />

      {/* ZONE DE MOBILITE */}
      <div className="flex flex-col field_mobility">
        <div className="flex flex-row">
          {/* Titre "Zone de mobilité" */}
          <h4 className="flex ml-6 mb-2 font-semibold text-lg">
            Zone de mobilité
          </h4>
          {/* Info icon  */}
          <div className="pr-4">
            <InfoButton
              title_1={"Mobilité"}
              content_1={
                "Vous pouvez configurer si vous êtes mobile, la distance que vous seriez prêt à parcourir, le montant de l’indemnité et le temps nécessaire lié au déplacement."
              }
              content_2="Une fois la configuration effectuée, n'oubliez pas de cliquer sur le bouton de mise à jour"
              onOpenModal={undefined}
            />
          </div>
        </div>

        {/* Checkbox et label "Autoriser la mobilité" */}
        <div className="flex-1 py-5 pl-5 ml-8 flex items-center">
          {" "}
          {/* Utilisez flex items-center ici */}
          <div
            onClick={() => handleCheckboxChange(isMobilityAllowed)}
            className={`w-6 h-6 flex items-center justify-center cursor-pointer rounded
                    ${isMobilityAllowed
                ? ColorsThemeA.ohcVerticalGradient_A
                : "bg-[#D6D6D6]"
              }`}
          >
            {isMobilityAllowed && <CheckedIcon />}
          </div>
          <label
            htmlFor="mobilityZone"
            className="ml-2 text-sm font-medium text-gray-900"
          >
            Coiffure à domicile
          </label>
        </div>

        {/* TODO SAVE AND CHANGE THE PRICE FOR CUSTOMER*/}
        {/* Label supplémentaire qui apparaît si la checkbox est cochée */}
        {isMobilityAllowed && (
          <div>
            <div className="relative items-center justify-center w-64 mx-auto">
              {" "}
              {/* Utilisez mx-auto pour centrer */}
              <CustomSlider
                theme={ComponentTheme}
                value={zoneSliderRange}
                onChange={updateSliderChange}
                min={0}
                max={30}
                unit="km"
                label="Zone de mobilité" // Fournissez une prop label si votre composant CustomSlider l'attend
                valueLabelDisplay="auto"
              />
            </div>

            {/* KM COST*/}
            <div className="md:mt-0 ml-14 mb-4">
              <p className="text-stone-700 text-sm font-medium mt-8 mb-1 ">
                Facturation au km
              </p>
              <div className="flex items-start justify-start gap-3">
                <div className="w-[85px] h-9 flex items-center justify-center text-black border border-black rounded-lg shadow-lg cursor-not-allowed bg-white">
                  {ZonePrice} €
                </div>
                <div
                  className={`flex items-center justify-center py-1 rounded-md ${isMobilityAllowed
                    ? ColorsThemeA.OhcGradient_A
                    : ColorsThemeA.inactivButtonColor
                    } shadow-lg`}
                >
                  <div
                    onClick={() => zonePriceHandler("minus")}
                    className="border-r border-white px-4 py-3 cursor-pointer transform hover:scale-110 transition-transform"
                  >
                    <MinusIcon />
                  </div>
                  <div
                    onClick={() => zonePriceHandler("add")}
                    className="py-1 px-4 cursor-pointer transform hover:scale-110 transition-transform"
                  >
                    <AddIcon />
                  </div>
                </div>

                {/* Affichage des frais maximum */}
                <div className="ml-4 bg-slate-200 text-stone-400 font-thin rounded-lg p-2 flex items-center cursor-not-allowed">
                  <span className="text-xs font-medium">
                    Max: {maxFees.toFixed(2)} €
                  </span>
                </div>
              </div>
            </div>

            {/* TODO LINK WITH BE - MAKE SLOT UNAVAILABLE ACCORDING TO DURATION */}
            {/* KM TIME SLOT TO MAKE UNAVAILABLE*/}
            <div className="md:mt-0 ml-14 mb-4">
              <p className="text-stone-700 text-sm font-medium mt-8 mb-1 ">
                Durée nécessaire par km
              </p>
              <div className="flex items-start justify-start gap-3">
                <div className="w-[85px] h-9 flex items-center justify-center text-black border border-black rounded-lg shadow-lg cursor-not-allowed bg-white">
                  {ZoneDuration} Min
                </div>
                <div
                  className={`flex items-center justify-center py-1 rounded-md ${isMobilityAllowed
                    ? ColorsThemeA.OhcGradient_A
                    : ColorsThemeA.inactivButtonColor
                    } shadow-lg`}
                >
                  <div
                    onClick={() => zoneDurationHandler("minus")}
                    className="border-r border-white px-4 py-3 cursor-pointer transform hover:scale-110 transition-transform"
                  >
                    <MinusIcon />
                  </div>
                  <div
                    onClick={() => zoneDurationHandler("add")}
                    className="py-1 px-4 cursor-pointer transform hover:scale-110 transition-transform"
                  >
                    <AddIcon />
                  </div>
                </div>

                {/* Affichage des frais maximum */}
                <div className="ml-4 bg-slate-200 text-stone-400 font-thin rounded-lg p-2 flex items-center cursor-not-allowed">
                  <span className="text-xs font-medium">
                    Max: {maxDurationTravel} min
                  </span>
                </div>
              </div>
            </div>

            {/* TODO SAVE MOBILITY AND TYPE OF SALON DATA WITH THIS BUTTON */}
            <div className="flex justify-center items-center">
              <button
                className={`mt-6 flex gap-4 items-center justify-center w-22 ${Theme_A.button.medBlackColoredButton}`}
                onClick={() => handleZoneSliderChange(zoneSliderRange)}
              >
                {" "}
                Mettre à jour
              </button>
            </div>
          </div>
        )}
      </div>

      {/* fin Affichage des adresses dans la vignette principale */}
    </div>
  );
};

export default SalonInfos;
