import {
    CheckedIcon,
    GiftIcon,
    Hamburger,
    LogoIcon,
    SearcIcon,
  } from "@/components/utilis/Icons";
import React, { useEffect, useState } from "react";
import { getLocalStorage } from "@/api/storage";
import { useRouter } from "next/navigation";
import ServicesFilter from "./ServicesFilter";
import HairsalonFilter from "./HairsalonFilters";
import BooksalonFilter from "./BookingSalonFilter";
import UserProfile from "@/components/UI/UserProfile";
  
  interface Navbar{
    isWelcomePage?: boolean,
    isServicesPage?: boolean,
    isSalonPage?: boolean,
    isBookSalon?: boolean,
    onSearch?: (arg0: string)=>void
    onServiceSearch?: (arg0: string)=>void
    onGenderFilter?: (arg0: string)=>void
    onEthnicityFilters?: (arg0: string[])=>void
    onLengthFilters?: (arg0: string[])=>void
    onTypeSelect?: (arg0: string[])=>void
  }
  
  const Navbar = ({isWelcomePage, isServicesPage, isSalonPage, isBookSalon, onTypeSelect, onSearch, onServiceSearch, onGenderFilter, onEthnicityFilters, onLengthFilters}: Navbar) => {
    const [isDropdown, setIsDropdown] = useState(false);
    const [showDesktopGender, setShowDesktopGender] = useState(false);
    const [showDesktopLength, setShowDesktopLength] = useState(false);
    const [showDesktopEthnicity, setShowDesktopEthnicity] = useState(false);
  
    const [showMobileGender, setShowMobileGender] = useState(false);
    const [showMobileEthnicity, setShowMobileEthnicity] = useState(false);
    const [showMobileLength, setShowMobileLength] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [genderFilters, setGenderFilters] = useState<string>('');
    const [ethnicityFilters, setEthnicityFilters] = useState<string[]>([]);
    const [lengthFilters, setLengthFilters] = useState<string[]>([]);
    const router=useRouter()
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
      if (!LengthDesktopRef.current?.contains(target as Node)) {
        setShowDesktopLength(false);
      }
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
    useEffect(()=>{
      onEthnicityFilters && onEthnicityFilters(ethnicityFilters)
    },[ethnicityFilters])
    useEffect(()=>{
      onLengthFilters && onLengthFilters(lengthFilters)
    },[lengthFilters])
  
    useEffect(() => {
      if (getLocalStorage("User")) {
        setIsLoggedIn(true);
      }
      document.addEventListener("click", closeSelectBox);
  
      return () => {
        document.removeEventListener("click", closeSelectBox);
      };
    }, []);
    return (
      <div className="w-full flex flex-col items-center justify-between border-b border-[#EBF0F2] pb-3 xl:pb-0">
        <div className={`w-full flex items-center justify-between px-4 md:px-14 ${!isLoggedIn ? 'flex-col sm:flex-row' : 'flex-row'}`}>
          <div onClick={()=>router.push('/')} className="py-5 cursor-pointer">
            <LogoIcon />
          </div>
          <div className="hidden xl:flex items-center pr-2 rounded-xl bg-[#F7F7F7] h-[52px]">
            <div
              className="flex items-center justify-center"
            >
                {isWelcomePage ?
                <>
              <div ref={EthnicityDesktopRef} className="border-r border-grey px-2 2xl:px-6 last:border-r-0 cursor-pointer">
                <p
                  className={showDesktopEthnicity ? "rounded-xl py-2 px-7 bg-white" : "py-2 px-7"}
                  onClick={() => {
                    setShowDesktopGender(false);
                    setShowDesktopLength(false);
                    setShowDesktopEthnicity(!showDesktopEthnicity);
                  }}
                >
                  Ethinicity
                </p>
                {showDesktopEthnicity && (
                  <div className="absolute top-[75px] -ml-2 z-20 flex flex-col items-center justify-center w-44 pt-5 px-7 text-black rounded-3xl bg-white shadow-[6px_4px_25px_6px_rgba(176,176,176,0.25)]">
                    {Ethnicity.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex w-full cursor-pointer mb-[19px]"
                          onClick={() => onClickEthnicityCheckbox(item.name)}
                        >
                          <div
                            className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5  ${
                              ethnicityFilters.includes(item.name)
                                ? "bg-gradient-to-b from-pink-500 to-orange-500"
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
              <div ref={GenderDesktopRef} className="border-r border-grey px-2 2xl:px-6 last:border-r-0 cursor-pointer">
                <p
                  className={showDesktopGender ? "rounded-xl py-2 px-7 bg-white" : "py-2 px-7"}
                  onClick={() => {
                    setShowDesktopEthnicity(false);
                    setShowDesktopLength(false);
                    setShowDesktopGender(!showDesktopGender);
                  }}
                >
                  Gender
                </p>
                {showDesktopGender && (
                  <div className="absolute top-[75px] -ml-3 z-20 flex flex-col items-center justify-center w-36 pt-5 px-7 text-black rounded-3xl bg-white shadow-[6px_4px_25px_6px_rgba(176,176,176,0.25)]">
                    {Gender.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex w-full cursor-pointer mb-[19px]"
                          onClick={() => onClickGenderCheckbox(item.name)}
                        >
                          <div
                            className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5  ${
                              genderFilters.includes(item.name)
                                ? "bg-gradient-to-b from-pink-500 to-orange-500"
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
              <div ref={LengthDesktopRef} className="border-r border-grey px-2 2xl:px-6 last:border-r-0 cursor-pointer">
                <p
                  className={showDesktopLength ? "rounded-xl py-2 px-7 bg-white" : "py-2 px-7"}
                  onClick={() => {
                    setShowDesktopEthnicity(false);
                    setShowDesktopGender(false);
                    setShowDesktopLength(!showDesktopLength);
                  }}
                >
                  Length
                </p>
                {showDesktopLength && (
                  <div className="absolute top-[75px] -ml-3 z-20 flex flex-col items-center justify-center w-36 pt-5 px-7 text-black rounded-3xl bg-white shadow-[6px_4px_25px_6px_rgba(176,176,176,0.25)]">
                    {Length.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex w-full cursor-pointer mb-[19px]"
                          onClick={() => onClickLengthCheckbox(item.name)}
                        >
                          <div
                            className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5  ${
                              lengthFilters.includes(item.name)
                                ? "bg-gradient-to-b from-pink-500 to-orange-500"
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
              <ServicesFilter onTypeSelect={onTypeSelect ? onTypeSelect : ()=>{}}/>
              :
              isSalonPage ?
              <HairsalonFilter/>
              :
              isBookSalon &&
              <BooksalonFilter/>
                }
                {(isWelcomePage || isServicesPage) &&
              <div className="border-r border-grey px-6 last:border-r-0 cursor-pointer">
                <input
                  type="text"
                  placeholder="Search"
                  className="text-base px-4 p-2 rounded-full outline-none"
                  onChange={onSearch && isWelcomePage ? (e)=>onSearch(e.target.value) : onServiceSearch && isServicesPage ? (e)=>onServiceSearch(e.target.value) : ()=>{}}
                />
              </div>}
            </div>
            <div className="cursor-pointer p-3 rounded-full bg-gradient-to-b from-[#E93C64] to-[#F6A52E]">
              <SearcIcon />
            </div>
          </div>
          <div
            className="relative flex items-center justify-center md:justify-end gap-4"
          >
            {!isLoggedIn &&
            <button onClick={()=>router.push('/registration')} className="w-52 2xl:w-60 h-11 text-white font-semibold bg-background-gradient rounded-3xl">
              Enregistre mon salon
            </button>}
            {/* {isLoggedIn ? (
              <div className="cursor-pointer">
                <HeartIcon />
              </div>
            ) : (
              <div className="cursor-pointer">
                <GiftIcon />
              </div>
            )} */}
            {/* <div className="cursor-pointer">
              <Hamburger />
            </div> */}
            {isLoggedIn &&
            <div>
              <UserProfile/>
            </div>
            }
          </div>
        </div>
        <div className="flex flex-col xl:hidden items-center pr-2 rounded-xl bg-[#F7F7F7] overflow-auto mt-7">
          <div
            className="flex items-center flex-col gap-3 p-4"
          >
            <div className="flex items-center justify-center">
              {isWelcomePage &&
              <>
              <div ref={EthicityMobileRef} className="border-r border-grey px-6 last:border-r-0 cursor-pointer">
                <p
                  className={showMobileEthnicity ? "rounded-xl py-2 px-7 bg-white" : "py-2 px-7"}
                  onClick={() => {
                    setShowMobileGender(false);
                    setShowMobileEthnicity(!showMobileEthnicity);
                  }}
                >
                  Ethinicity
                </p>
                {showMobileEthnicity && (
                  <div className="absolute top-[180px] z-20 -ml-8 xl:ml-0 flex flex-col items-center justify-center w-44 px-7 pt-5 text-black rounded-3xl bg-white shadow-[6px_4px_25px_6px_rgba(176,176,176,0.25)]">
                    {Ethnicity.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex w-full cursor-pointer mb-[19px]"
                          onClick={() => onClickEthnicityCheckbox(item.name)}
                        >
                          <div
                            className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5  ${
                              ethnicityFilters.includes(item.name)
                                ? "bg-gradient-to-b from-pink-500 to-orange-500"
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
              <div ref={GenderMobileRef} className="border-r border-grey px-6 last:border-r-0 cursor-pointer">
                <p
                  className={showMobileGender ? "rounded-xl py-2 px-7 bg-white" : "py-2 px-7"}
                  onClick={() => {
                    setShowMobileEthnicity(false);
                    setShowMobileGender(!showMobileGender);
                  }}
                >
                  Gender
                </p>
                {showMobileGender && (
                  <div className="absolute top-[180px] z-20 -ml-5 xl:ml-0 flex flex-col items-center justify-center w-36 px-7 pt-5 text-black rounded-3xl bg-white shadow-[6px_4px_25px_6px_rgba(176,176,176,0.25)]">
                    {Gender.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex w-full cursor-pointer mb-[19px]"
                          onClick={() => onClickGenderCheckbox(item.name)}
                        >
                          <div
                            className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5  ${
                              genderFilters.includes(item.name)
                                ? "bg-gradient-to-b from-pink-500 to-orange-500"
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
              <div ref={LengthDesktopRef} className="border-r border-grey px-2 2xl:px-6 last:border-r-0 cursor-pointer">
                <p
                  className={showDesktopLength ? "rounded-xl py-2 px-7 bg-white" : "py-2 px-7"}
                  onClick={() => {
                    setShowDesktopEthnicity(false);
                    setShowDesktopGender(false);
                    setShowDesktopLength(!showDesktopLength);
                  }}
                >
                  Length
                </p>
                {showDesktopLength && (
                  <div className="absolute top-[180px] -ml-3 xl:ml-0 z-20 flex flex-col items-center justify-center w-36 pt-5 px-7 text-black rounded-3xl bg-white shadow-[6px_4px_25px_6px_rgba(176,176,176,0.25)]">
                    {Length.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="flex w-full cursor-pointer mb-[19px]"
                          onClick={() => onClickLengthCheckbox(item.name)}
                        >
                          <div
                            className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5  ${
                              lengthFilters.includes(item.name)
                                ? "bg-gradient-to-b from-pink-500 to-orange-500"
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
            }
            
            
            {isServicesPage &&
              <ServicesFilter onTypeSelect={onTypeSelect ? onTypeSelect : ()=>{}}/>}
            </div>
            <div className="flex">
              <div className="px-6 cursor-pointer">
                <input
                  type="text"
                  placeholder="Search"
                  className="text-base px-4 p-2 rounded-full outline-none"
                  onChange={onSearch && isWelcomePage ? (e)=>onSearch(e.target.value) : onServiceSearch && isServicesPage ? (e)=>onServiceSearch(e.target.value) : ()=>{}}
                />
              </div>
              <div className="cursor-pointer p-3 rounded-full bg-gradient-to-b from-[#E93C64] to-[#F6A52E]">
                <SearcIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Navbar;  