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


interface Navbar {
  isWelcomePage?: boolean,
  isServicesPage?: boolean,
  isSalonPage?: boolean,
  isBookSalon?: boolean,
  hideSearchBar?: boolean,
  onSearch?: (arg0: string) => void
  onServiceSearch?: (arg0: string) => void
  onCitySearch?: (arg0: string) => void
  onNameSearch?: (arg0: string) => void
  onGenderFilter?: (arg0: string) => void
  onEthnicityFilters?: (arg0: string[]) => void
  onLengthFilters?: (arg0: string[]) => void
  onMobileFilters?: (arg0: string) => void
  onRangeFilters?: (arg0: string[]) => void
  onTypeSelect?: (arg0: string[]) => void,
}

const Navbar = ({ isWelcomePage, isServicesPage, isSalonPage, isBookSalon, hideSearchBar, onTypeSelect, onSearch, onServiceSearch, onGenderFilter, onEthnicityFilters, onLengthFilters, onMobileFilters, onCitySearch, onNameSearch, onRangeFilters }: Navbar) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [showDesktopGender, setShowDesktopGender] = useState(false);
  const [showDesktopLength, setShowDesktopLength] = useState(false);
  const [showDesktopBudget, setShowDesktopBudget] = useState(false);
  const [showDesktopEthnicity, setShowDesktopEthnicity] = useState(false);

  const [showMobileGender, setShowMobileGender] = useState(false);
  const [showMobileEthnicity, setShowMobileEthnicity] = useState(false);
  const [showMobileLength, setShowMobileLength] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [genderFilters, setGenderFilters] = useState<string>('');
  const [ethnicityFilters, setEthnicityFilters] = useState<string[]>([]);
  const [lengthFilters, setLengthFilters] = useState<string[]>([]);
  const [mobileFilters, setMobileFilters] = useState<string>("");

  const [tmpRange, setTmpRange] = useState<number[]>([10, 100]);
  const [rangeFilters, setRangeFilter] = useState<number[]>([10, 100]);

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
    },
    {
      name: "Asian",
    },
    {
      name: "Occidental",
    },
    {
      name: "Oriental",
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
    },
    {
      name: "Medium",
    },
    {
      name: "Long",
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


  const rangeSelector = (event: any, newValue: any) => {
    setRangeFilter(newValue);
  };
  const onClickGenderCheckbox = (gender: string) => {
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
  const onClickMobileCheckbox = (value: string) => {
    if (value === "all") {
      setMobileFilters('');
    } else if (mobileFilters === value) {
      setMobileFilters('');  // Reset or clear the filter if it's already selected
    } else {
      setMobileFilters(value);  // Otherwise, set the filter to the selected mobile value
    }
  };

  useEffect(() => {
    onEthnicityFilters && onEthnicityFilters(ethnicityFilters)
  }, [ethnicityFilters])
  useEffect(() => {
    let wrappedGenderFilters = genderFilters === 'Homme' ? 'men' : genderFilters === 'Femme' ? 'women' : 'Mix';
    onGenderFilter && onGenderFilter(wrappedGenderFilters)
  }, [genderFilters])
  useEffect(() => {
    onLengthFilters && onLengthFilters(lengthFilters)
  }, [lengthFilters])
  useEffect(() => {
    onMobileFilters && onMobileFilters(mobileFilters)
  }, [mobileFilters])
  useEffect(() => {
    onRangeFilters && onRangeFilters(rangeFilters.map(String))
  }, [rangeFilters]);


  useEffect(() => {
    const user = getLocalStorage("user");
    const hairstyle_trend = user ? String(JSON.parse(user).user_preferences.hairstyle_trend) : null;
    const length_sought = user ? String(JSON.parse(user).user_preferences.length_sought) : null;
    const budget = user ? JSON.parse(user).user_preferences.budget : null;
    const hairdressing_at_home = user ? JSON.parse(user).user_preferences.hairdressing_at_home : null;
    const userId = user ? Number(JSON.parse(user).id) : null;
    if (userId) {
      setIsLoggedIn(true);

      let gender = hairstyle_trend === 'Masculine' ? 'Homme' : hairstyle_trend === 'Feminine' ? 'Femme' : 'Mix';
      let length = length_sought === 'Long' ? 'Long' : length_sought === 'Moyen' ? 'Medium' : 'Short';
      let mobile = hairdressing_at_home === 0 ? 'no' : 'yes';

      setGenderFilters(gender);
      setLengthFilters((prev) => [...prev, length]);
      setRangeFilter(budget);
      setMobileFilters(mobile);
    }
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

  return (
    <div className=" flex flex-col md:items-center justify-between border-b border-[#EBF0F2] pb-2 xl:pb-0">
      <div className={` flex justify-between px-4 lg:px-14 flex-col lg:flex-row gap-3 ${!isLoggedIn ? 'flex-col' : 'flex-row'}`}>
        <div className="flex flex-row gap-2">
          <div onClick={() => router.push('/')} className="py-2 lg:py-5 cursor-pointer">
            <LogoIcon className={'medium'} />
          </div>
          {isLoggedIn &&
            <div className="mt-3 lg:hidden">
              <UserProfile />
            </div>}
          {!isLoggedIn &&
            <button onClick={() => router.push('/registration')}
              className={` mt-2 w-max md:w-40 h-10 lg:w-28 lg:h-14  text-center text-sm text-white font-medium rounded-md px-1 py-1 lg:my-3 ${ColorsThemeA.OhcGradient_A} transform hover:scale-105 transition-transform hover:shadow-[0px_3px_6px_0px_rgba(255,125,60,0.25)] rounded-xl shadow-sm shadow-stone-300`}>
              Enregistrer mon salon
            </button>}
        </div>
        {!hideSearchBar && <div className="flex items-center pr-2 rounded-2xl bg-[#F7F7F7] h-[42px] lg:h-[52px] lg:mt-3 shadow-sm shadow-stone-300 border border-stone-200">
          <div
            className="flex items-center justify-evenly text-sm lg:text-lg w-full"
          >
            {isWelcomePage ?
              <>
                <div ref={EthnicityDesktopRef}
                  className=" border-r border-grey px-0 lg:px-2 2xl:px-6 last:border-r-0 cursor-pointer">
                  <p
                    className={
                      ethnicityFilters.length > 0
                        ? `rounded-xl py-2 px-7 ${ColorsThemeA.filterSelected} text-white font-semibold`
                        : (showDesktopEthnicity ? "rounded-xl py-2 px-7 bg-white text-black font-semibold" : "hover:bg-white rounded-xl py-2 px-7")
                    }
                    onClick={() => {
                      setShowDesktopGender(false);
                      setShowDesktopLength(false);
                      setShowDesktopEthnicity(!showDesktopEthnicity);
                    }}
                  >
                    Ethnicit&eacute;
                  </p>
                  {showDesktopEthnicity && (
                    <div className="absolute -ml-2 z-20 flex flex-col items-center justify-center w-45 pt-5 px-7 text-black rounded-3xl bg-white shadow-[6px_4px_25px_6px_rgba(176,176,176,0.25)]">
                      {Ethnicity.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex w-full cursor-pointer mb-[19px] transform hover:scale-110"
                            onClick={() => onClickEthnicityCheckbox(item.name)}
                          >
                            <div
                              className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5 transform hover:scale-105 ${ethnicityFilters.includes(item.name)
                                ? ColorsThemeA.ohcVerticalGradient_A
                                : "bg-[#D6D6D6]"
                                }`}>
                              <CheckedIcon />
                            </div>

                            <p className="ml-2">{item.name}</p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div ref={GenderDesktopRef} className="border-r border-grey px-0 lg:px-2 2xl:px-6 last:border-r-0 cursor-pointer">
                  <p
                    className={genderFilters.length > 0
                      ? `rounded-xl py-2 px-7 ${ColorsThemeA.filterSelected} text-white font-semibold`
                      : (showDesktopGender ? "rounded-xl py-2 px-7 bg-white text-black font-semibold" : "hover:bg-white rounded-xl py-2 px-7")}
                    onClick={() => {
                      setShowDesktopEthnicity(false);
                      setShowDesktopLength(false);
                      setShowDesktopGender(!showDesktopGender);
                    }}
                  >
                    Genre
                  </p>
                  {showDesktopGender && (
                    <div className="absolute  -ml-3 z-20 flex flex-col items-center justify-center w-36 pt-5 px-7 text-black rounded-3xl bg-white shadow-[6px_4px_25px_6px_rgba(176,176,176,0.25)]">
                      {Gender.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex w-full cursor-pointer mb-[19px] transform hover:scale-110"
                            onClick={() => onClickGenderCheckbox(item.name)}
                          >
                            <div
                              className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5  transform hover:scale-105 ${genderFilters.includes(item.name)
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
                <div className="sm:border-r border-grey px-0 lg:px-2 2xl:px-6 last:border-r-0 cursor-pointer text-black">
                  <p
                    className={lengthFilters.length > 0
                      ? `rounded-xl py-2 px-7 ${ColorsThemeA.filterSelected} text-white font-semibold`
                      : (showDesktopLength ? "rounded-xl py-2 px-7 bg-white text-black font-semibold" : "hover:bg-white rounded-xl py-2 px-7")}
                    onClick={() => {
                      setShowDesktopEthnicity(false);
                      setShowDesktopGender(false);
                      setShowDesktopLength(!showDesktopLength);
                    }}
                  >
                    Longueur
                  </p>
                  {showDesktopLength && (
                    <div className="absolute  -ml-3 z-20 flex flex-col items-center justify-center w-40 pt-5 px-7 text-black rounded-3xl bg-white shadow-[6px_4px_25px_6px_rgba(176,176,176,0.25)]">
                      {Length.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex w-full cursor-pointer mb-[19px]  transform hover:scale-110"
                            onClick={() => onClickLengthCheckbox(item.name)}
                          >
                            <div
                              className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5  transform hover:scale-105 ${lengthFilters.includes(item.name)
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
              </>
              :
              isServicesPage ?
                <ServicesFilter onTypeSelect={onTypeSelect ? onTypeSelect : () => { }} />
                :
                isSalonPage ?
                  <HairsalonFilter />
                  :
                  isBookSalon &&
                  <BooksalonFilter />
            }

            {(isWelcomePage) &&
              <div className={`hidden sm:block w-min lg:w-max border-r border-grey px-1 lg:px-6 last:border-r-0 cursor-pointer`}>
                <input
                  type="text"
                  placeholder="Rechercher"
                  className={`text-sm md:text-base px-2 lg:px-4 p-2 rounded-full outline-none ${Theme_A.behaviour.fieldFocused_B}`}
                  onChange={onSearch && isWelcomePage ?
                    (e) => onSearch(e.target.value) :
                    onServiceSearch && isServicesPage ? (e) => onServiceSearch(e.target.value) : () => { }}
                />
              </div>}
            {(isServicesPage) &&
              <div className={`w-max border-r border-grey px-1 lg:px-6 last:border-r-0 cursor-pointer`}>
                <input
                  type="text"
                  placeholder="Rechercher"
                  className={`text-sm md:text-base px-2 lg:px-4 p-2 rounded-full outline-none ${Theme_A.behaviour.fieldFocused_B}`}
                  onChange={onSearch && isWelcomePage ?
                    (e) => onSearch(e.target.value) :
                    onServiceSearch && isServicesPage ? (e) => onServiceSearch(e.target.value) : () => { }}
                />
              </div>}
            {(isSalonPage) &&
              <div className={`border-r border-grey px-2 xl:px-6 last:border-r-0 cursor-pointer `}>
                <input
                  type="text"
                  placeholder="Ville"
                  className={`text-base lg:w-40 px-4 p-2 rounded-xl outline-none ${Theme_A.behaviour.fieldFocused_B}`}
                  onChange={onSearch && isWelcomePage ?
                    (e) => onSearch(e.target.value) :
                    onCitySearch && isSalonPage ? (e) => onCitySearch(e.target.value) : () => { }}
                />
              </div>}
            {(isSalonPage) &&
              <div className={`md:border-r border-grey px-2 xl:px-6 last:border-r-0 cursor-pointer`}>
                <input
                  type="text"
                  placeholder="Nom Salon"
                  className={`text-base lg:w-40 px-4 p-2 rounded-xl outline-none ${Theme_A.behaviour.fieldFocused_B}`}
                  onChange={onNameSearch && isWelcomePage ?
                    () => { } :
                    onNameSearch && isSalonPage ? (e) => onNameSearch(e.target.value) : () => { }}
                />
              </div>}
            {(isSalonPage) &&
              <div className="hidden md:block border-r border-grey px-2 2xl:px-6 last:border-r-0 cursor-pointer">
                <p
                  className={showDesktopLength ? "rounded-xl py-2 px-7 bg-white  text-black font-semibold" : " hover:bg-white rounded-xl py-2 px-7 "}
                  onClick={() => {
                    setShowDesktopEthnicity(false);
                    setShowDesktopGender(false);
                    setShowDesktopLength(!showDesktopLength);
                    setShowDesktopBudget(false);

                  }}
                >
                  Mobilit&eacute;
                </p>
                {showDesktopLength && isSalonPage && (
                  <div className="absolute -ml-3 z-20 flex flex-col items-center justify-center w-36 pt-5 px-7 text-black rounded-3xl bg-white shadow-[6px_4px_25px_6px_rgba(176,176,176,0.25)]">
                    {Mobile.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex w-full cursor-pointer mb-[19px]  transform hover:scale-110"
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
                  className={showDesktopBudget ? "rounded-xl py-2 px-7 bg-white text-black font-semibold" : "hover:bg-white rounded-xl py-2 px-7"}
                  onClick={() => {
                    setShowDesktopEthnicity(false);
                    setShowDesktopGender(false);
                    setShowDesktopLength(false);
                    setShowDesktopBudget(!showDesktopBudget);
                  }}
                >
                  Budget
                </p>
                {showDesktopBudget && isSalonPage && (
                  <ThemeProvider theme={theme}>
                    <div className="absolute top-[100%] left-1/2 transform -translate-x-1/2 mt-2 z-20 w-64 pt-3 px-4 text-black rounded-3xl bg-white shadow-[6px_4px_25px_6px_rgba(176,176,176,0.25)]"> {/* Adjusted modal positioning */}
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
                          unit="€"
                          label="Budget" // Provide a label prop if your CustomSlider component expects it
                          valueLabelDisplay="auto"
                          width="250%"
                        />
                      </div>
                    </div>
                  </ThemeProvider>
                )}
              </div>
            }

          </div>
          {showDesktopBudget && isSalonPage && (
            <div className="hidden md:block cursor-pointer p-3 rounded-full hover:scale-90 transform transition-transform duration-300 bg-gradient-to-b from-[#E93C64] to-[#F6A52E]">
              <SearcIcon />
            </div>
          )}
        </div>}

        {/* For salons' page and for small screens
        */}
        {!hideSearchBar && isSalonPage && <div className="md:hidden flex pr-2 rounded-2xl bg-[#F7F7F7] h-[42px] shadow-sm shadow-stone-300 border border-stone-200">
          <div
            className="flex w-full items-center justify-evenly text-sm lg:text-lg"
          >

            <div className="cursor-pointer">
              <p
                className={showDesktopLength ? "rounded-xl py-2 px-7 bg-white  text-black font-semibold" : " hover:bg-white rounded-xl py-2 px-7 "}
                onClick={() => {
                  setShowDesktopEthnicity(false);
                  setShowDesktopGender(false);
                  setShowDesktopLength(!showDesktopLength);
                  setShowDesktopBudget(false);

                }}
              >
                Mobilit&eacute;
              </p>
              {showDesktopLength && (
                <div className="absolute -ml-3 z-20 flex flex-col items-center justify-center w-36 pt-5 px-7 text-black rounded-3xl bg-white shadow-[6px_4px_25px_6px_rgba(176,176,176,0.25)]">
                  {Mobile.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex w-full cursor-pointer mb-[19px]  transform hover:scale-110"
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


            <div className="border-r border-grey px-2 2xl:px-6 last:border-r-0 cursor-pointer relative"> {/* Retain relative positioning for this div */}
              <p
                className={showDesktopBudget ? "rounded-xl py-2 px-7 bg-white text-black font-semibold" : "hover:bg-white rounded-xl py-2 px-7"}
                onClick={() => {
                  setShowDesktopEthnicity(false);
                  setShowDesktopGender(false);
                  setShowDesktopLength(false);
                  setShowDesktopBudget(!showDesktopBudget);
                }}
              >
                Budget
              </p>
              {showDesktopBudget && (
                <ThemeProvider theme={theme}>
                  <div className="absolute top-[100%] left-1/2 transform -translate-x-1/2 mt-2 z-20 w-64 pt-3 px-4 text-black rounded-3xl bg-white shadow-[6px_4px_25px_6px_rgba(176,176,176,0.25)]"> {/* Adjusted modal positioning */}
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
                        unit="€"
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
          {showDesktopBudget && (
            <div className="cursor-pointer p-3 rounded-full hover:scale-90 transform transition-transform duration-300 bg-gradient-to-b from-[#E93C64] to-[#F6A52E]">
              <SearcIcon />
            </div>
          )}
        </div>}

        {/* For welcome page and small screen */}
        {!hideSearchBar && isWelcomePage && <div className="sm:hidden flex pr-2 rounded-2xl bg-[#F7F7F7] h-[42px] shadow-sm shadow-stone-300 border border-stone-200">
          <div
            className="flex w-full items-center justify-around text-sm lg:text-lg"
          >
            <div className={`sm:hidden w-full  border-r border-grey px-1 lg:px-6 last:border-r-0 cursor-pointer`}>
              <input
                type="text"
                placeholder="Rechercher"
                className={`text-sm md:text-base px-2 p-2 w-full rounded-full outline-none ${Theme_A.behaviour.fieldFocused_B}`}
                onChange={onSearch && isWelcomePage ?
                  (e) => onSearch(e.target.value) :
                  onServiceSearch && isServicesPage ? (e) => onServiceSearch(e.target.value) : () => { }}
              />
            </div>
          </div>

        </div>}
      </div>
    </div>
  );
};

export default Navbar;  