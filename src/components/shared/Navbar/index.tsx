import {
  CheckedIcon,
  GiftIcon,
  Hamburger,
  LogoIcon,
  SearcIcon,
  RightArrowIcon,
  LeftArrowIcon
} from "@/components/utilis/Icons";
import React, { useEffect, useState } from "react";
import { getLocalStorage } from "@/api/storage";
import { useRouter } from "next/navigation";
import ServicesFilter from "./ServicesFilter";
import HairsalonFilter from "./HairsalonFilters";
import BooksalonFilter from "./BookingSalonFilter";
import UserProfile from "@/components/UI/UserProfile";
import { ColorsThemeA, Theme_A } from "@/components/utilis/Themes";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CustomSlider from "@/components/UI/OHC_Slider";
import ComponentTheme from "@/components/UI/ComponentTheme";
import { Button } from "@material-ui/core";
import EUCountriesList from "./EUCountries";
import StarRatings from "react-star-ratings";
import Autocomplete from "react-google-autocomplete";
import { user_api } from "@/api/clientSide";
import {getCurrencySymbol} from "@/utils/currency";


interface Navbar {
  isWelcomePage?: boolean,
  isServicesPage?: boolean,
  isSalonPage?: boolean,
  isBookSalon?: boolean,
  hideSearchBar?: boolean,
  onSearch?: (arg0: string) => void
  onServiceSearch?: (arg0: string) => void
  onCitySearch?: (arg0: string) => void
  onCityMapSearch?: (arg0: google.maps.places.PlaceResult) => void
  onNameSearch?: (arg0: string) => void
  onGenderFilter?: (arg0: string) => void
  onEthnicityFilters?: (arg0: string[]) => void
  onLengthFilters?: (arg0: string[]) => void
  onHairNameFilters?: (arg0: string[]) => void
  onMobileFilters?: (arg0: string) => void
  onRangeFilters?: (arg0: string[]) => void
  onTypeSelect?: (arg0: string[]) => void,
  onLengthSelect?: (arg0: string[]) => void,
  onRatingFilter?: (arg0: number[]) => void,
  onCountryFilter?: (arg0: string) => void,
  onAvailabilityFilter?: (arg0: string[]) => void,
  onNewSalonFilter?: (arg0: boolean) => void,
}

const Navbar = ({ isWelcomePage, isServicesPage, isSalonPage, isBookSalon, hideSearchBar, onHairNameFilters, onTypeSelect, onLengthSelect, onSearch, onServiceSearch, onGenderFilter, onEthnicityFilters, onLengthFilters, onMobileFilters, onCitySearch, onCityMapSearch, onNameSearch, onRangeFilters, onRatingFilter, onCountryFilter, onAvailabilityFilter, onNewSalonFilter }: Navbar) => {
  const currencySymbol = getCurrencySymbol();
  const [isDropdown, setIsDropdown] = useState(false);
  const [showDesktopGender, setShowDesktopGender] = useState(false);
  const [showDesktopLength, setShowDesktopLength] = useState(false);
  const [showDesktopHaircut, setShowDesktopHaircut] = useState(false);
  const [showDesktopBudget, setShowDesktopBudget] = useState(false);
  const [showDesktopEthnicity, setShowDesktopEthnicity] = useState(false);
  const [showDesktopRating, setShowDesktopRating] = useState(false);
  const [showDesktopCountry, setShowDesktopCountry] = useState(false);
  const [showDesktopAvailability, setShowDesktopAvailability] = useState(false);

  const [showMobileGender, setShowMobileGender] = useState(false);
  const [showMobileEthnicity, setShowMobileEthnicity] = useState(false);
  const [showMobileLength, setShowMobileLength] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [genderFilters, setGenderFilters] = useState<string>('');
  const [ethnicityFilters, setEthnicityFilters] = useState<string[]>([]);
  const [lengthFilters, setLengthFilters] = useState<string[]>([]);
  const [haircutFilters, setHaircutFilters] = useState<string[]>([]);
  const [mobileFilters, setMobileFilters] = useState<string>("");
  const [ratingFilter, setRatingFilter] = useState<number[]>([1, 2, 3, 4, 5]);
  const [countryFilter, setCountryFilter] = useState<string>("");
  const [availabilityFilter, setAvailabilityFilter] = useState<string[]>(['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']);
  const [newSalonFilter, setNewSalonFilter] = useState(true);
  const [haircuts, setHaircuts] = useState([]);

  const [tmpRange, setTmpRange] = useState<number[]>([10, 100]);
  const [rangeFilters, setRangeFilter] = useState<number[]>([10, 100]);
  const [hairNameFilters, setHairNameFilters] = useState<string>("");

  const router = useRouter()
  const EthnicityDesktopRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const GenderDesktopRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const LengthDesktopRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const EthicityMobileRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const GenderMobileRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const LengthMobileRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const closeSelectBox = ({ target }: MouseEvent): void => {
    if (!EthnicityDesktopRef.current?.contains(target as Node)) {
      setShowDesktopEthnicity(false);
    }
    if (!GenderDesktopRef.current?.contains(target as Node)) {
      setShowDesktopGender(false);
    }
    if (!EthicityMobileRef.current?.contains(target as Node)) {
      setShowMobileEthnicity(false);
    }
    if (!GenderMobileRef.current?.contains(target as Node)) {
      setShowMobileGender(false);
    }
    // if (!LengthDesktopRef.current?.contains(target as Node)) {
    //   setShowDesktopLength(false);
    // }
    if (!LengthMobileRef.current?.contains(target as Node)) {
      setShowMobileLength(false);
    }
  };
  const Ethnicity = [
    {
      name: "Afro",
      nameFr: "Afro",
    },
    {
      name: "Asian",
      nameFr: "Asiatique",
    },
    {
      name: "Occidental",
      nameFr: "Occidental",
    },
    {
      name: "Oriental",
      nameFr: "Oriental",
    },
  ];
  const Gender = [
    {
      name: "Homme",
    },
    {
      name: "Femme",
    },
    {
      name: "Mix",
    },
  ];
  const Length = [
    {
      name: "Short",
      nameFr: "Court",
    },
    {
      name: "Medium",
      nameFr: "Moyen",
    },
    {
      name: "Long",
      nameFr: "Long",
    },
  ];
  const Mobile = [
    {
      name: "Tous",
      value: ""
    },
    {
      name: "Oui",
      value: "yes"
    },
    {
      name: "Non",
      value: "no"
    }
  ];

  const Ratings = [1, 2, 3, 4, 5];

  const Countries = EUCountriesList();
  const WeekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];


  const rangeSelector = (event: any, newValue: any) => {
    setRangeFilter(newValue);
  };
  const onClickGenderCheckbox = (gender: string) => {
    onGenderFilter && onGenderFilter(gender === 'Homme' ? 'men' : gender === 'Femme' ? 'women' : 'Mix')
    if (genderFilters === gender) {
      setGenderFilters("");
    } else {
      setGenderFilters(gender);
    }
  };
  const onClickEthnicityCheckbox = (ethnicity: string) => {
    if (ethnicityFilters.includes(ethnicity)) {
      setEthnicityFilters(
        ethnicityFilters.filter((item) => item !== ethnicity)
      );
    } else {
      setEthnicityFilters((prev) => [...prev, ethnicity]);
    }

  };
  const onClickLengthCheckbox = (length: string) => {
    if (lengthFilters.includes(length)) {
      setLengthFilters(lengthFilters.filter((item) => item !== length));
    } else {
      setLengthFilters((prev) => [...prev, length]);
    }
  };

  const onClickHairNameCheckbox = (length: string) => {
    if (haircutFilters.includes(length)) {
      setHaircutFilters(haircutFilters.filter((item) => item !== length));
    } else {
      setHaircutFilters((prev) => [...prev, length]);
    }
  };

  const onClickMobileCheckbox = (value: string) => {
    if (value === "all") {
      setMobileFilters('');
    } else if (mobileFilters === value) {
      setMobileFilters('');  // Reset or clear the filter if it's already selected
    } else {
      setMobileFilters(value);  // Otherwise, set the filter to the selected mobile value
    }
  };
  const onClickRatingCheckbox = (value: number) => {
    if (ratingFilter.includes(value)) {
      setRatingFilter(ratingFilter.filter((item) => item !== value));
    } else {
      setRatingFilter((prev) => [...prev, value]);
    }
  };
  const onNewSalonCheckbox = (value: boolean) => {
    setNewSalonFilter(value);
  }
  const onClickCountryCheckbox = (value: string) => {
    if (countryFilter === value) {
      setCountryFilter('');  // Reset or clear the filter if it's already selected
    }
    else {
      setCountryFilter(value);  // Otherwise, set the filter to the selected mobile value
    }
  }
  const onAvailabilityCheckbox = (value: string) => {
    // console.log(availabilityFilter)
    if (availabilityFilter?.includes(value)) {
      setAvailabilityFilter(availabilityFilter.filter((item) => item !== value));
    } else {
      setAvailabilityFilter((prev) => [...prev, value]);
    }
  }

  const getHaircutsByName = async () => {
    let resp = await user_api.getHaircutsByName();
    console.log(resp.data.data)
    const sortedData = resp.data.data.sort((a, b) => a.name.localeCompare(b.name));
    setHaircuts(sortedData);
  }


  const handleSearch = () => {
    if (onSearch) {
      onSearch('')
    }
  }

  useEffect(() => {
    onEthnicityFilters && onEthnicityFilters(ethnicityFilters)
  }, [ethnicityFilters])
  useEffect(() => {
    onLengthFilters && onLengthFilters(lengthFilters)
    onLengthSelect && onLengthSelect(lengthFilters)
  }, [lengthFilters])
  useEffect(() => {
    onHairNameFilters && onHairNameFilters(haircutFilters)
  }, [haircutFilters])
  useEffect(() => {
    onMobileFilters && onMobileFilters(mobileFilters)
  }, [mobileFilters])
  useEffect(() => {
    console.log('rangeFilters', rangeFilters)
    onRangeFilters && onRangeFilters(rangeFilters.map(String))
  }, [rangeFilters]);
  useEffect(() => {
    onRatingFilter && onRatingFilter(ratingFilter)
  }, [ratingFilter]);
  useEffect(() => {
    onCountryFilter && onCountryFilter(countryFilter)
  }, [countryFilter]);
  useEffect(() => {
    onAvailabilityFilter && onAvailabilityFilter(availabilityFilter)
  }, [availabilityFilter]);
  useEffect(() => {
    let wrappedGenderFilters = genderFilters === 'Homme' ? 'men' : genderFilters === 'Femme' ? 'women' : 'Mix';
    onGenderFilter && onGenderFilter(wrappedGenderFilters)
  }, [genderFilters]);
  useEffect(() => {
    onNewSalonFilter && onNewSalonFilter(newSalonFilter)
  }, [newSalonFilter]);


  useEffect(() => {
    const user = getLocalStorage("user");
    const hairstyle_trend = user ? (JSON.parse(user).user_preferences ? String(JSON.parse(user).user_preferences.hairstyle_trend) : "") : "";
    const length_sought = user ? (JSON.parse(user).user_preferences ? String(JSON.parse(user).user_preferences.length_sought) : "") : "";
    const user_ethnic = user ? (JSON.parse(user).ethnic_group ? String(JSON.parse(user).ethnic_group) : "") : "";
    const budget = user ? (JSON.parse(user).user_preferences ? JSON.parse(user).user_preferences.budget ? JSON.parse(user).user_preferences.budget : [10, 100] : [10, 100]) : [10, 100];
    const hairdressing_at_home = user ? (JSON.parse(user).user_preferences ? JSON.parse(user).user_preferences.hairdressing_at_home : "all") : "all";
    const minRating = user ? (JSON.parse(user).user_preferences ? JSON.parse(user).user_preferences.ratings : 1) : 1;
    const maxRating = user ? (JSON.parse(user).user_preferences ? JSON.parse(user).user_preferences.max_ratings : 5) : 5;
    let country = user ? (JSON.parse(user).user_preferences ? String(JSON.parse(user).user_preferences.country) : "") : "";
    const availability = user ? (JSON.parse(user).user_preferences ? JSON.parse(user).user_preferences.availability : ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]) : ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    const userId = user ? Number(JSON.parse(user).id) : null;
    const isEnableHaircutFilter = user ? (JSON.parse(user).user_preferences ? JSON.parse(user).user_preferences.haircut_filter : 0) : 0;
    const isEnableSalonFilter = user ? (JSON.parse(user).user_preferences ? JSON.parse(user).user_preferences.salon_filter : 0) : 0;
    if (userId) {
      setIsLoggedIn(true);
      let gender = hairstyle_trend === 'Masculine' ? 'Homme' : hairstyle_trend === 'Feminine' ? 'Femme' : 'Mix';
      let length = length_sought === 'Long' ? ['Long'] : length_sought === 'Moyen' ? ['Medium'] : length_sought === 'Court' ? ['Short'] : [];
      let mobile = hairdressing_at_home != null ? hairdressing_at_home === 0 ? 'no' : 'yes' : 'no';
      country = country == "null" ? "" : country;

      let rating = [] as number[];
      for (let i = (minRating ?? 1); i <= (maxRating ?? 5); i++) {
        rating.push(Number(i));
      }
      if(isEnableHaircutFilter){
        setGenderFilters(gender);
        console.log("BUILD : " + length);
        setLengthFilters(length);
        setEthnicityFilters([user_ethnic]);
      }
      if(isEnableSalonFilter){
        setRangeFilter(budget ?? [10, 100]);
        setMobileFilters(mobile);
        setRatingFilter(rating);
        setCountryFilter(country);
        setAvailabilityFilter(availability ?? ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]);
        setNewSalonFilter(true);
      }
    }
    getHaircutsByName();
    document.addEventListener("click", closeSelectBox);

    return () => {
      document.removeEventListener("click", closeSelectBox);
    };
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#3B3A3A',
      },
      secondary: {
        main: '#ec5657',
      },
    },
    overrides: {
      MuiSlider: {
        thumb: {
          color: '#000000',
          width: 14, // Set the desired width
          height: 14, // Set the desired height
          border: '3px solid #000000',
          boxShadow: '0px 0px 0px 4px rgb(236, 86, 87, 0.1)',
          backgroundColor: '#FFFF', // The interior color of the thumb
          borderRadius: '50%',// This makes it a circle
          '&:hover, &.Mui-focusVisible': {
            /* Applies a sharp, translucent black halo shadow around the thumb. */
            boxShadow: '0px 0px 0px 8px rgb(236, 86, 87, 0.5)',
          },
        },
        track: {
          height: '4px',  // Adjust for desired thickness
          color: '#ec5657',
          background: 'linear-gradient(90deg, red, orange)',
        },
        rail: {
          color: '#000000', //colorForTheUnfilledPart
          height: '4px',  // Adjust for desired thickness
          borderRadius: '16px',
        },
        valueLabel: {
          color: '#000000', // The color of the value label that appears on hover
        },
      },
    },
  });

  // For budget slider
  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(1000);


  return (
    <div className=" flex flex-col sm:items-center justify-between border-b border-[#EBF0F2] pb-2 xl:pb-0">
      <div className={` flex justify-between px-2 md:px-4 lg:px-14 flex-col lg:flex-row gap-1 md:gap-3 ${!isLoggedIn ? 'flex-col' : 'flex-row'}`}>

        <div className="flex flex-row gap-2 justify-evenly">
          <div onClick={() => router.push('/')} className="py-2 lg:py-5 cursor-pointer">
            <LogoIcon className={'medium'} />
          </div>
          {isLoggedIn &&
            <div className="lg:hidden mt-1 ml-auto">
              <UserProfile />
            </div>}
          {!isLoggedIn &&
            <button onClick={() => router.push('/registration')}
              className={`lg:hidden mt-2 w-max md:w-40 h-8 lg:w-28 lg:h-14  text-center text-sm text-white font-medium rounded-md px-1 py-1 lg:my-3 ${ColorsThemeA.OhcGradient_A} transform hover:scale-105 transition-transform hover:shadow-[0px_3px_6px_0px_rgba(255,125,60,0.25)] rounded-xl shadow-sm shadow-stone-300`}>
              Enregistrer mon salon
            </button>}
        </div>
        {!hideSearchBar && <div className="flex items-center justify-evenly w-full sm:w-min rounded-2xl bg-[#F7F7F7] h-[30px] md:h-[42px] lg:h-[52px] lg:mt-3 shadow-sm shadow-stone-300 border border-stone-200">
          <div
            className="flex items-center  text-sm xl:text-lg "
          >
            {isWelcomePage ?
              <>
                <div ref={EthnicityDesktopRef}
                  className=" border-r border-grey px-2 2xl:px-6 last:border-r-0 cursor-pointer">
                  <p
                    className={
                      ethnicityFilters.length > 0
                        ? `h-6 md:h-8 lg:h-10 rounded-xl py-0 md:py-1 lg:py-2 px-2 lg:px-7 ${ColorsThemeA.filterSelected} text-white font-semibold`
                        : (showDesktopEthnicity ? "h-6 md:h-8 lg:h-10 rounded-xl py-0 md:py-1 lg:py-2 px-2 lg:px-7 bg-white text-black font-semibold"
                        : "h-6 md:h-8 lg:h-10 hover:bg-stone-200 rounded-xl py-0 md:py-1 lg:py-2 px-2 lg:px-7")
                    }
                    onClick={() => {
                      setShowDesktopGender(false);
                      setShowDesktopLength(false);
                      setShowDesktopHaircut(false);
                      setShowDesktopEthnicity(!showDesktopEthnicity);
                    }}
                  >
                    Ethnicité
                  </p>
                  {showDesktopEthnicity && (
                    <div className="absolute z-20 flex flex-col items-center justify-center w-45 pt-5 px-2 lg:px-7 text-black rounded-3xl bg-white shadow-md shadow-stone-300">
                      {Ethnicity.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex w-full cursor-pointer mb-[19px] transform hover:scale-110 text-sm "
                            onClick={() => onClickEthnicityCheckbox(item.name)} // Utilisez 'item.name' pour la logique interne
                          >
                            <div
                              className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5 transform hover:scale-105 ${ethnicityFilters.includes(item.name) ? ColorsThemeA.ohcVerticalGradient_A : "bg-[#D6D6D6]"}`}
                            >
                              <CheckedIcon />
                            </div>
                            <p className="ml-2">{item.nameFr}</p> {/* Affichez 'item.nameFr' pour l'utilisateur */}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div ref={GenderDesktopRef} className="border-r border-grey px-2 2xl:px-6 last:border-r-0 cursor-pointer">
                  <p
                    className={genderFilters.length > 0
                      ? `h-6 md:h-8 lg:h-10 rounded-xl py-0 md:py-1 lg:py-2 px-2 lg:px-7 ${ColorsThemeA.filterSelected} text-white font-semibold`
                      : (showDesktopGender ? "h-6 md:h-8 lg:h-10 rounded-xl py-0 md:py-1 lg:py-2 px-2 lg:px-7 bg-white text-black font-semibold" : "h-6 md:h-8 lg:h-10 hover:bg-stone-200 rounded-xl py-0 md:py-1 lg:py-2 px-2 lg:px-7")}
                    onClick={() => {
                      setShowDesktopEthnicity(false);
                      setShowDesktopLength(false);
                      setShowDesktopHaircut(false);
                      setShowDesktopGender(!showDesktopGender);
                    }}
                  >
                    Genre
                  </p>
                  {showDesktopGender && (
                    <div className="absolute z-20 flex flex-col items-center justify-center w-36 pt-5 px-2 lg:px-7 text-black rounded-3xl bg-white shadow-md shadow-stone-300">
                      {Gender.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex w-full cursor-pointer mb-[19px] transform hover:scale-110 text-sm "
                            onClick={() => onClickGenderCheckbox(item.name)}
                          >
                            <div
                              className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5  transform hover:scale-105  ${genderFilters.includes(item.name)
                                ? ColorsThemeA.OhcGradient_A
                                : "bg-[#D6D6D6]"
                                }`}
                            >
                              <CheckedIcon />
                            </div>
                            <p className="ml-2">{item.name}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="sm:border-r border-grey px-2 2xl:px-6 last:border-r-0 cursor-pointer text-black">
                  <p
                    className={lengthFilters.length > 0
                      ? ` h-6 md:h-8 lg:h-10 rounded-xl py-0 md:py-1 lg:py-2 px-2 lg:px-7 ${ColorsThemeA.filterSelected} text-white font-semibold`
                      : (showDesktopLength ? "h-6 md:h-8 lg:h-10 rounded-xl py-0 md:py-1 lg:py-2 px-2 lg:px-7 bg-white text-black font-semibold"
                       : "h-6 md:h-8 lg:h-10 hover:bg-stone-200 rounded-xl py-0 md:py-1 lg:py-2 px-2 lg:px-7")}
                    onClick={() => {
                      setShowDesktopEthnicity(false);
                      setShowDesktopGender(false);
                      setShowDesktopHaircut(false);
                      setShowDesktopLength(!showDesktopLength);
                    }}
                  >
                    Longueur
                  </p>
                  {showDesktopLength && (
                    <div className="absolute  z-20 flex flex-col items-center justify-center w-40 pt-5 px-2 lg:px-7 text-black rounded-3xl bg-white shadow-md shadow-stone-300">
                      {Length.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex w-full cursor-pointer mb-[19px]  transform hover:scale-110 text-sm "
                            onClick={() => onClickLengthCheckbox(item.name)} // Conservez 'item.name' pour la logique interne
                          >
                            <div
                              className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5  transform hover:scale-105 ${lengthFilters.includes(item.name) ? ColorsThemeA.OhcGradient_A : "bg-[#D6D6D6]"}`}
                            >
                              <CheckedIcon />
                            </div>
                            <p className="ml-2">{item.nameFr}</p> {/* Utilisez 'item.nameFr' pour l'affichage */}
                          </div>
                        );
                      })}
                    </div>

                  )}
                </div>
                <div className="sm:border-r border-grey px-2 2xl:px-6 last:border-r-0 cursor-pointer text-black">
                  <p
                    className={haircutFilters.length > 0
                      ? `h-6 md:h-8 lg:h-10 rounded-xl py-0 md:py-1 lg:py-2 px-2 lg:px-7 ${ColorsThemeA.filterSelected} text-white font-semibold`
                      : (showDesktopHaircut ? "h-6 md:h-8 lg:h-10 rounded-xl py-0 md:py-1 lg:py-2 px-2 lg:px-7 bg-white text-black font-semibold" : "h-6 md:h-8 lg:h-10 hover:bg-stone-200 rounded-xl py-0 md:py-1 lg:py-2 px-2 lg:px-7")}
                    onClick={() => {
                      setShowDesktopEthnicity(false);
                      setShowDesktopGender(false);
                      setShowDesktopLength(false);
                      setShowDesktopHaircut(!showDesktopHaircut);
                    }}
                  >
                    Coiffures
                  </p>
                  {showDesktopHaircut && (
                    <div id="CountryList" className="absolute z-50  items-center justify-center w-42 pt-[2px] px-2 lg:px-7 text-black rounded-3xl bg-white shadow-md shadow-stone-300 "
                      style={{ maxHeight: '700px', overflowY: 'auto', marginTop: '10px' }}>
                      {haircuts.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex w-full cursor-pointer mt-[19px]  transform hover:scale-110 text-sm"
                            onClick={() => onClickHairNameCheckbox(item['name'])}
                          >
                            <div
                              className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5 transform hover:scale-105 ${haircutFilters.includes(item['name']) ? ColorsThemeA.OhcGradient_A : "bg-[#D6D6D6]"}`}
                            >
                              <CheckedIcon />
                            </div>
                            <p className="ml-2">{item['name']}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>
              </>
              :
              isServicesPage ?
                <ServicesFilter onTypeSelect={onTypeSelect ? onTypeSelect : () => { }} onLengthSelect={onLengthSelect ? onLengthSelect : () => { }} />
                :
                isSalonPage ?
                  <HairsalonFilter />
                  :
                  isBookSalon &&
                  <BooksalonFilter />
            }

            {(isWelcomePage) &&
              <div className={`hidden sm:block w-min lg:w-max border-r border-grey px-1 xl:px-6 last:border-r-0 cursor-pointer`}>
                <input
                  type="text"
                  placeholder="Rechercher"
                  className={`h-6 md:h-8 text-sm md:text-base px-2 xl:px-4 p-2 rounded-full outline-none ${Theme_A.behaviour.fieldFocused_B}`}
                  onChange={onSearch && isWelcomePage ?
                    (e) => onSearch(e.target.value) :
                    onServiceSearch && isServicesPage ? (e) => onServiceSearch(e.target.value) : () => { }}
                />
              </div>}
            {(isServicesPage) &&
              <div className={`border-r border-grey px-1 lg:px-6 last:border-r-0 cursor-pointer`}>
                <input
                  type="text"
                  placeholder="Rechercher"
                  className={`w-[120px] lg:w-max h-6 md:h-8 text-sm md:text-base px-2 lg:px-4 p-2 rounded-full outline-none ${Theme_A.behaviour.fieldFocused_B}`}
                  onChange={onSearch && isWelcomePage ?
                    (e) => onSearch(e.target.value) :
                    onServiceSearch && isServicesPage ? (e) => onServiceSearch(e.target.value) : () => { }}
                />
              </div>}
            {(isSalonPage && !isWelcomePage) &&
              <Autocomplete
                className="text-black w-40 sm:w-40 h-[26px] md:h-max px-4 py-2 text-xs md:text-base transition ml-2 duration-500 ease-in-out transform border-transparent rounded-lg bg-white-100 ring-gray-400"
                apiKey='AIzaSyAJiOb1572yF7YbApKjwe5E9L2NfzkH51E'
                onPlaceSelected={(place) => {
                  console.log('map search place', place)
                  onCityMapSearch && onCityMapSearch(place)
                }}
                onChange={(e) => {
                  if(e.target && !(e.target as HTMLInputElement).value) {
                    onCityMapSearch && onCityMapSearch({
                      geometry: {
                        location: {
                          lat: () => 0,
                          lng: () => 0
                        }
                      }
                    } as google.maps.places.PlaceResult)
                  }
                }}
                options={{
                  types: ["locality"],
                  fields: [
                    'address_components',
                    'geometry.location'
                  ]
                }}
                placeholder="Ville"
              />
            }

            {(isSalonPage) &&
              <div className={`md:border-r border-grey px-2 xl:px-6 last:border-r-0 cursor-pointer`}>
                <input
                  type="text"
                  placeholder="Nom Salon"
                  className={`text-xs md:text-base w-40 sm:w-40 h-[26px] md:h-max px-4 p-2 rounded-xl outline-none ${Theme_A.behaviour.fieldFocused_B}`}
                  onChange={onNameSearch && isWelcomePage ?
                    () => { } :
                    onNameSearch && isSalonPage ? (e) => onNameSearch(e.target.value) : () => { }}
                />
              </div>}
            {(isSalonPage) &&
              <div className="hidden md:block border-x border-grey px-2 sm:px-6 md:px-2 2xl:px-6 last:border-r-0 cursor-pointer">
                <p
                  className={showDesktopCountry ? "rounded-xl py-2 px-2 2xl:px-7 bg-white text-black font-semibold" : "hover:bg-stone-200 rounded-xl py-2 px-2 2xl:px-7"}
                  onClick={() => {
                    setShowDesktopEthnicity(false);
                    setShowDesktopGender(false);
                    setShowDesktopLength(false);
                    setShowDesktopBudget(false);
                    setShowDesktopRating(false);
                    setShowDesktopCountry(!showDesktopCountry);
                    setShowDesktopAvailability(false);
                  }}
                >
                  Pays
                </p>
                {showDesktopCountry && isSalonPage && (
                  <div id="CountryList" className="absolute -ml-3 z-50  items-center justify-center w-42 pt-[2px] px-7 text-black rounded-3xl bg-white shadow-md shadow-stone-300 " style={{ maxHeight: '800px', overflowY: 'auto', marginTop: '10px' }}>
                    {Countries.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex w-full cursor-pointer mb-4 transform hover:scale-110 text-sm"
                          onClick={() => onClickCountryCheckbox(item)}
                        >
                          <div
                            className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5 transform hover:scale-105
                            ${countryFilter === item ? ColorsThemeA.OhcGradient_A : "bg-[#D6D6D6]"}`}
                          >
                            <CheckedIcon />
                          </div>
                          <p className="ml-2">{item}</p>
                        </div>
                      );
                    })}



                  </div>
                )}
              </div>
            }
            {(isSalonPage) &&
              <div className="hidden md:block border-r border-grey px-2 2xl:px-6 last:border-r-0 cursor-pointer">
                <p
                  className={showDesktopLength ? "rounded-xl py-2 px-2 2xl:px-7 bg-white  text-black font-semibold" : " hover:bg-stone-200 rounded-xl py-2 px-2 2xl:px-7 "}
                  onClick={() => {
                    setShowDesktopEthnicity(false);
                    setShowDesktopGender(false);
                    setShowDesktopLength(!showDesktopLength);
                    setShowDesktopBudget(false);
                    setShowDesktopRating(false);
                    setShowDesktopCountry(false);
                    setShowDesktopAvailability(false);

                  }}
                >
                  Mobilité
                </p>
                {showDesktopLength && isSalonPage && (
                  <div className="absolute -ml-3 z-20 flex flex-col items-center justify-center mt-4 w-36 pt-5 px-7 text-black rounded-3xl bg-white shadow-md shadow-stone-300">
                    {Mobile.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex w-full cursor-pointer mb-[10px]  transform hover:scale-110"
                          onClick={() => onClickMobileCheckbox(item.value)}
                        >
                          <div
                            className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5 transform hover:scale-105
                            ${mobileFilters === item.value ? ColorsThemeA.OhcGradient_A : "bg-[#D6D6D6]"}`}
                          >
                            <CheckedIcon />
                          </div>
                          <p className="ml-2">{item.name}</p>
                        </div>
                      );
                    })}



                  </div>
                )}
              </div>
            }
            {(isSalonPage) &&
              <div className="hidden md:block border-r border-grey px-2 2xl:px-6 last:border-r-0 cursor-pointer relative"> {/* Retain relative positioning for this div */}
                <p
                  className={showDesktopBudget ? "rounded-xl py-2 px-2 2xl:px-7 bg-white text-black font-semibold" : "hover:bg-stone-200 rounded-xl py-2 px-2 2xl:px-7"}
                  onClick={() => {
                    setShowDesktopEthnicity(false);
                    setShowDesktopGender(false);
                    setShowDesktopLength(false);
                    setShowDesktopBudget(!showDesktopBudget);
                    setShowDesktopRating(false);
                    setShowDesktopCountry(false);
                    setShowDesktopAvailability(false);
                  }}
                >
                  Budget
                </p>
                {showDesktopBudget && isSalonPage && (
                  <ThemeProvider theme={theme}>
                    <div className="absolute top-[100%] left-1/2 transform -translate-x-1/2 mt-4 z-20 w-96 pt-3 px-4 text-black rounded-3xl bg-white shadow-md shadow-stone-300">
                      <div className="flex flex-col items-center justify-center w-full">
                        {/* Votre CustomSlider ici */}
                        <CustomSlider
                          theme={ComponentTheme}
                          value={rangeFilters}
                          onChange={rangeSelector}
                          min={0}
                          max={500}
                          unit={currencySymbol}
                          label="Budget"
                          valueLabelDisplay="auto"
                          width="320px"
                        />
                        {/* Labels et champs de saisie pour valeurs min et max */}
                        <div className="flex justify-between w-full mt-4 mb-4">
                          {/* Label et input pour la valeur minimale */}
                          <div className="flex flex-col items-center">
                            <label className="mb-1 text-xs">Min</label>
                            <div className="flex items-center">
                              <input
                                type="number"
                                value={rangeFilters[0]}
                                onChange={(e) => {
                                  const minValue = Number(e.target.value);
                                  const maxValue = rangeFilters[1];
                                  if (minValue <= maxValue) { // Vérifie que Min n'est pas supérieur à Max
                                    setRangeFilter([minValue, maxValue]);
                                  }
                                }}
                                className="w-20 p-1 border rounded-xl text-center"
                                min={0}
                              />
                              <span className="ml-1"></span>
                            </div>
                          </div>
                          {/* Label et input pour la valeur maximale */}
                          <div className="flex flex-col items-center">
                            <label className="mb-1 text-xs">Max</label>
                            <div className="flex items-center">
                              <input
                                type="number"
                                value={rangeFilters[1]}
                                onChange={(e) => {
                                  const maxValue = Number(e.target.value);
                                  const minValue = rangeFilters[0];
                                  if (maxValue >= minValue) { // Vérifie que Max n'est pas inférieur à Min
                                    setRangeFilter([minValue, maxValue]);
                                  }
                                }}
                                className="w-20 p-1 border rounded-xl text-center"
                                max={500}
                              />
                              <span className="ml-1">{currencySymbol}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ThemeProvider>
                )}

              </div>
            }
            {(isSalonPage) &&
              <div className="hidden md:block border-r border-grey px-2 sm:pr-8 md:pr-0 2xl:px-6 last:border-r-0 cursor-pointer">
                <p
                  className={showDesktopRating ? "rounded-xl py-2 px-2 2xl:px-7 bg-white  text-black font-semibold" : " hover:bg-stone-200 rounded-xl py-2 px-2 2xl:px-7 "}
                  onClick={() => {
                    setShowDesktopEthnicity(false);
                    setShowDesktopGender(false);
                    setShowDesktopLength(false);
                    setShowDesktopBudget(false);
                    setShowDesktopRating(!showDesktopRating);
                    setShowDesktopCountry(false);
                    setShowDesktopAvailability(false);
                  }}
                >
                  Note
                </p>
                {showDesktopRating && isSalonPage && (
                  <div className="absolute -ml-3 z-20 flex flex-col items-center justify-center w-42 pt-5 px-2 2xl:px-7 text-black rounded-3xl bg-white shadow-md shadow-stone-300">

                    <div
                      key={0}
                      className="flex w-full cursor-pointer mb-[10px] items-center transform hover:scale-110"
                      onClick={() => onNewSalonCheckbox(!newSalonFilter)}
                    >
                      <div
                        className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5 transform hover:scale-105  mr-2
                                    ${newSalonFilter ? ColorsThemeA.OhcGradient_A : "bg-[#D6D6D6]"}`}
                      >
                        <CheckedIcon />
                      </div>
                      <p className="ml-1 mr-2">Nouveau salon</p>


                    </div>
                    {Ratings.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex w-full cursor-pointer mb-[10px] items-center transform hover:scale-110"
                          onClick={() => onClickRatingCheckbox(item)}
                        >
                          <div
                            className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5 transform hover:scale-105  mr-2
                            ${ratingFilter.includes(item) ? ColorsThemeA.OhcGradient_A : "bg-[#D6D6D6]"}`}
                          >
                            <CheckedIcon />
                          </div>
                          {/* <p className="ml-1 mr-2">{`${item}`}</p> */}
                          <StarRatings
                            rating={item}
                            starRatedColor="#FEDF10"
                            starSpacing="1px"
                            starDimension="12px"
                            numberOfStars={5}
                            name={`rating-${item}`}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            }
            {isSalonPage &&
              <div className="hidden md:block border-r border-grey px-2 2xl:px-6 last:border-r-0 cursor-pointer">
                <p
                  className={showDesktopAvailability ? "rounded-xl py-2 px-2 2xl:px-7 bg-white  text-black font-semibold" : " hover:bg-stone-200 rounded-xl py-2 px-2 2xl:px-7 "}
                  onClick={() => {
                    setShowDesktopEthnicity(false);
                    setShowDesktopGender(false);
                    setShowDesktopLength(false);
                    setShowDesktopBudget(false);
                    setShowDesktopRating(false);
                    setShowDesktopCountry(false);
                    setShowDesktopAvailability(!showDesktopAvailability);
                  }}
                >
                  Disponibilité
                </p>
                {showDesktopAvailability && (
                  <div className="absolute text-sm -ml-2 z-50 items-center justify-center w-45 pt-5 px-7 text-black rounded-3xl bg-white shadow-md shadow-stone-300">
                    {WeekDays.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex w-full cursor-pointer mb-[19px] transform hover:scale-110"
                          onClick={() => onAvailabilityCheckbox(item)}
                        >
                          <div
                            className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5 transform hover:scale-105 ${availabilityFilter?.includes(item)
                              ? ColorsThemeA.ohcVerticalGradient_A
                              : "bg-[#D6D6D6]"
                              }`}>
                            <CheckedIcon />
                          </div>

                          <p className="ml-2">{item}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            }
          </div>

          <div onClick={handleSearch} className="hidden sm:block cursor-pointer p-1 md:p-3 rounded-full hover:scale-90 transform transition-transform duration-300 bg-gradient-to-b from-[#E93C64] to-[#F6A52E]">
            <SearcIcon />
          </div>
          {isSalonPage &&
            <div onClick={handleSearch} className="sm:hidden cursor-pointer mr-5 p-1 rounded-full hover:scale-90 transform transition-transform duration-300 bg-gradient-to-b from-[#E93C64] to-[#F6A52E]">
              <SearcIcon />
            </div>}

        </div>}

        {/* For salons' page and for small screens
        */}
        {!hideSearchBar && isSalonPage && <div className="md:hidden flex pr-2 rounded-2xl bg-[#F7F7F7] h-[30px] shadow-sm shadow-stone-300 border border-stone-200">
          <div
            className="flex w-full items-center justify-evenly text-sm lg:text-lg"
          >

            <div className="border-r border-grey px-2 sm:px-6 md:px-2 2xl:px-6 last:border-r-0 cursor-pointer">
              <p
                className={showDesktopCountry ? "rounded-xl py-2 px-2 2xl:px-7 bg-white text-xs text-black font-semibold" : " text-xs hover:bg-stone-200 rounded-xl py-2 px-2 2xl:px-7"}
                onClick={() => {
                  setShowDesktopEthnicity(false);
                  setShowDesktopGender(false);
                  setShowDesktopLength(false);
                  setShowDesktopBudget(false);
                  setShowDesktopRating(false);
                  setShowDesktopCountry(!showDesktopCountry);
                  setShowDesktopAvailability(false);
                }}
              >
                Pays
              </p>
              {showDesktopCountry && (
                <div id="CountryList" className="absolute -ml-3 z-50  items-center justify-center w-42 pt-[2px] px-7 text-xs text-black rounded-3xl bg-white shadow-md shadow-stone-300 " style={{ maxHeight: '800px', overflowY: 'auto', marginTop: '10px' }}>
                  {Countries.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex w-full cursor-pointer mb-4 transform hover:scale-110 text-xs"
                        onClick={() => onClickCountryCheckbox(item)}
                      >
                        <div
                          className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5 transform hover:scale-105
                            ${countryFilter === item ? ColorsThemeA.OhcGradient_A : "bg-[#D6D6D6]"}`}
                        >
                          <CheckedIcon />
                        </div>
                        <p className="ml-2">{item}</p>
                      </div>
                    );
                  })}



                </div>
              )}
            </div>

            <div className="border-r border-grey px-2 sm:pr-8 md:pr-0 2xl:px-6 last:border-r-0 cursor-pointer">
              <p
                className={showDesktopRating ? "rounded-xl py-2 px-2 2xl:px-7 bg-white text-xs text-black font-semibold" : " text-xs hover:bg-stone-200 rounded-xl py-2 px-2 2xl:px-7 "}
                onClick={() => {
                  setShowDesktopEthnicity(false);
                  setShowDesktopGender(false);
                  setShowDesktopLength(false);
                  setShowDesktopBudget(false);
                  setShowDesktopRating(!showDesktopRating);
                  setShowDesktopCountry(false);
                  setShowDesktopAvailability(false);
                }}
              >
                Note
              </p>
              {showDesktopRating  && (
                <div className="absolute -ml-3 z-20 flex flex-col items-center justify-center w-42 pt-5 px-2 2xl:px-7 text-xs text-black rounded-3xl bg-white shadow-md shadow-stone-300">

                  <div
                    key={0}
                    className="flex w-full cursor-pointer mb-[10px] items-center transform hover:scale-110"
                    onClick={() => onNewSalonCheckbox(!newSalonFilter)}
                  >
                    <div
                      className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5 transform hover:scale-105  mr-2
                                    ${newSalonFilter ? ColorsThemeA.OhcGradient_A : "bg-[#D6D6D6]"}`}
                    >
                      <CheckedIcon />
                    </div>
                    <p className="ml-1 mr-2">Nouveau salon</p>


                  </div>
                  {Ratings.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex w-full cursor-pointer mb-[10px] items-center transform hover:scale-110"
                        onClick={() => onClickRatingCheckbox(item)}
                      >
                        <div
                          className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5 transform hover:scale-105  mr-2
                            ${ratingFilter.includes(item) ? ColorsThemeA.OhcGradient_A : "bg-[#D6D6D6]"}`}
                        >
                          <CheckedIcon />
                        </div>
                        {/* <p className="ml-1 mr-2">{`${item}`}</p> */}
                        <StarRatings
                          rating={item}
                          starRatedColor="#FEDF10"
                          starSpacing="1px"
                          starDimension="12px"
                          numberOfStars={5}
                          name={`rating-${item}`}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="border-r border-grey px-2 2xl:px-6 last:border-r-0 cursor-pointer">
              <p
                className={showDesktopAvailability ? "rounded-xl py-2 px-2 2xl:px-7 bg-white text-xs text-black font-semibold" : " text-xs hover:bg-stone-200 rounded-xl py-2 px-2 2xl:px-7 "}
                onClick={() => {
                  setShowDesktopEthnicity(false);
                  setShowDesktopGender(false);
                  setShowDesktopLength(false);
                  setShowDesktopBudget(false);
                  setShowDesktopRating(false);
                  setShowDesktopCountry(false);
                  setShowDesktopAvailability(!showDesktopAvailability);
                }}
              >
                Disponibilité
              </p>
              {showDesktopAvailability && (
                <div className="absolute text-sm -ml-2 z-50 items-center justify-center w-45 pt-5 px-7 text-xs text-black rounded-3xl bg-white shadow-md shadow-stone-300">
                  {WeekDays.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex w-full cursor-pointer mb-[19px] transform hover:scale-110"
                        onClick={() => onAvailabilityCheckbox(item)}
                      >
                        <div
                          className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5 transform hover:scale-105 ${availabilityFilter?.includes(item)
                            ? ColorsThemeA.ohcVerticalGradient_A
                            : "bg-[#D6D6D6]"
                            }`}>
                          <CheckedIcon />
                        </div>

                        <p className="ml-2">{item}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="cursor-pointer ">
              <p
                className={showDesktopLength ? "rounded-xl py-2 px-2 2xl:px-7 bg-white text-xs text-black font-semibold " : " text-xs hover:bg-stone-200 rounded-xl py-2 px-2 2xl:px-7 "}
                onClick={() => {
                  setShowDesktopEthnicity(false);
                  setShowDesktopGender(false);
                  setShowDesktopRating(false);
                  setShowDesktopLength(!showDesktopLength);
                  setShowDesktopBudget(false);
                  setShowDesktopAvailability(false);
                  setShowDesktopCountry(false);
                }}
              >
                Mobilité
              </p>
              {showDesktopLength && (
                <div className="absolute -ml-3 z-20 flex flex-col items-center justify-center w-36 pt-5 px-7 text-xs text-black rounded-3xl bg-white shadow-md shadow-300">
                  {Mobile.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex w-full cursor-pointer mb-[19px]  transform hover:scale-110 "
                        onClick={() => onClickMobileCheckbox(item.value)}
                      >
                        <div
                          className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5 transform hover:scale-105
                            ${mobileFilters === item.value ? ColorsThemeA.OhcGradient_A : "bg-[#D6D6D6]"}`}
                        >
                          <CheckedIcon />
                        </div>
                        <p className="ml-2">{item.name}</p>
                      </div>
                    );
                  })}



                </div>
              )}
            </div>


            <div className="border-l border-grey px-2 2xl:px-6  cursor-pointer relative"> {/* Retain relative positioning for this div */}
              <p
                className={showDesktopBudget ? "rounded-xl py-2 px-2 2xl:px-7 bg-white text-xs text-black font-semibold" : "text-xs hover:bg-stone-200 rounded-xl py-2 px-2 2xl:px-7"}
                onClick={() => {
                  setShowDesktopEthnicity(false);
                  setShowDesktopGender(false);
                  setShowDesktopLength(false);
                  setShowDesktopBudget(!showDesktopBudget);
                  setShowDesktopRating(false);
                  setShowDesktopAvailability(false);
                  setShowDesktopCountry(false);
                }}
              >
                Budget
              </p>
              {showDesktopBudget && (
                <ThemeProvider theme={theme}>
                  <div className="absolute top-[100%] left-1/2 transform -translate-x-1/2 mt-2 z-20 w-64 pt-3 px-4 text-xs text-black rounded-3xl bg-white shadow-[6px_4px_25px_6px_rgba(176,176,176,0.25)]"> {/* Adjusted modal positioning */}
                    <div className="flex flex-col items-center justify-center w-full"> {/* Use flex properties to center children */}
                      <Typography id="range-slider" gutterBottom>
                      </Typography>
                      {/* TODO CHANGE THIS SLIDER WITH AN INPUT */}
                      <CustomSlider
                        theme={ComponentTheme}
                        value={rangeFilters}
                        onChange={rangeSelector}
                        min={0}
                        max={1000}
                        unit={currencySymbol}
                        label="Budget" // Provide a label prop if your CustomSlider component expects it
                        valueLabelDisplay="auto"
                        width="250%"
                      />
                    </div>
                  </div>
                </ThemeProvider>
              )}
            </div>
          </div>
        </div>}

        {/* For welcome page and small screen */}
        {!hideSearchBar && isWelcomePage &&
          <div className="sm:hidden flex pr-2 rounded-2xl bg-[#F7F7F7] h-[35px] shadow-sm shadow-stone-300 border border-stone-200">
            <div
              className="flex w-full items-center justify-around text-sm lg:text-lg"
            >
              <div className={`sm:hidden w-full  border-r border-grey px-1 lg:px-6 last:border-r-0 cursor-pointer`}>
                <input
                  type="text"
                  placeholder="Rechercher"
                  className={`h-6 md:h-8 text-sm md:text-base px-2 p-2 w-full rounded-full outline-none ${Theme_A.behaviour.fieldFocused_B}`}
                  onChange={onSearch && isWelcomePage ?
                    (e) => onSearch(e.target.value) :
                    onServiceSearch && isServicesPage ? (e) => onServiceSearch(e.target.value) : () => { }}
                />
              </div>
            </div>
            {/* Search icon */}
            <div onClick={handleSearch} className="sm:hidden cursor-pointer p-2 rounded-full hover:scale-90 transform transition-transform duration-300 bg-gradient-to-b from-[#E93C64] to-[#F6A52E]">
              <SearcIcon />
            </div>

          </div>}
        {isLoggedIn &&
          <div className="hidden lg:flex mt-3">
            <UserProfile />
          </div>}
        {!isLoggedIn &&
          <button onClick={() => router.push('/registration')}
            className={`hidden lg:flex mt-2 w-max md:w-40 h-10 lg:w-28 lg:h-14  text-center text-sm text-white font-medium rounded-md px-1 py-1 lg:my-3 ${ColorsThemeA.OhcGradient_A} transform hover:scale-105 transition-transform hover:shadow-[0px_3px_6px_0px_rgba(255,125,60,0.25)] rounded-xl shadow-sm shadow-stone-300`}>
            Enregistrer mon salon
          </button>}
      </div>
    </div>
  );
};

export default Navbar;
