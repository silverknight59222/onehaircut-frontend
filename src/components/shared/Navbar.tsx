import {
  CheckedIcon,
  GiftIcon,
  Hamburger,
  LogoIcon,
  SearcIcon,
  UserIcon,
  HeartIcon,
} from "@/components/utilis/Icons";
import React, { useEffect, useState } from "react";
import { getLocalStorage } from "@/api/storage";
import { usePathname } from "next/navigation";

interface Navbar{
  isWelcomePage?: boolean
}

const Navbar = ({isWelcomePage}: Navbar) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [showDesktopGender, setShowDesktopGender] = useState(false);
  const [showDesktopEthnicity, setShowDesktopEthnicity] = useState(false);

  const [showMobileGender, setShowMobileGender] = useState(false);
  const [showMobileEthnicity, setShowMobileEthnicity] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [genderFilters, setGenderFilters] = useState<string[]>([]);
  const [ethnicityFilters, setEthnicityFilters] = useState<string[]>([]);
  const path=usePathname()
  const dropdownRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const filterDesktopRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const filterMobileRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const closeSelectBox = ({ target }: MouseEvent): void => {
    if (!dropdownRef.current?.contains(target as Node)) {
      setIsDropdown(false);
    }
    if (!filterDesktopRef.current?.contains(target as Node)) {
      setShowDesktopEthnicity(false);
      setShowDesktopGender(false);
    }
    if (!filterMobileRef.current?.contains(target as Node)) {
      setShowMobileGender(false);
      setShowMobileEthnicity(false);
    }
  };
  const Ethnicity = [
    {
      name: "European",
    },
    {
      name: "African",
    },
    {
      name: "Asian",
    },
    {
      name: "British",
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

  const onClickGenderCheckbox = (gender: string) => {
    if (genderFilters.includes(gender)) {
      setGenderFilters(genderFilters.filter((item) => item !== gender));
    } else {
      setGenderFilters((prev) => [...prev, gender]);
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
      <div className="w-full flex flex-col md:flex-row items-center justify-between">
        <div className="px-14 py-5">
          <LogoIcon />
        </div>
        <div className="hidden xl:flex items-center pr-2 rounded-xl bg-[#F7F7F7] h-[52px] overflow-auto">
          <div
            ref={filterDesktopRef}
            className="flex items-center justify-center "
          >
            <div className="border-r border-grey px-6 last:border-r-0 cursor-pointer">
              <p
                className={showDesktopEthnicity ? "rounded-xl py-2 px-7 bg-white" : "py-2 px-7"}
                onClick={() => {
                  setShowDesktopGender(false);
                  setShowDesktopEthnicity(!showDesktopEthnicity);
                }}
              >
                Ethinicity
              </p>
              {showDesktopEthnicity && (
                <div className="absolute top-20 z-20 flex flex-col items-center justify-center w-60 p-7 text-black rounded-3xl bg-white shadow-[6px_4px_25px_6px_rgba(176,176,176,0.25)]">
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
            <div className="border-r border-grey px-6 last:border-r-0 cursor-pointer">
              <p
                className={showDesktopGender ? "rounded-xl py-2 px-7 bg-white" : "py-2 px-7"}
                onClick={() => {
                  setShowDesktopEthnicity(false);
                  setShowDesktopGender(!showDesktopGender);
                }}
              >
                Gender
              </p>
              {showDesktopGender && (
                <div className="absolute top-20 z-20 flex flex-col items-center justify-center w-60 p-7 text-black rounded-3xl bg-white shadow-[6px_4px_25px_6px_rgba(176,176,176,0.25)]">
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
            <div className="border-r border-grey px-6 last:border-r-0 cursor-pointer">
              <input
                type="text"
                placeholder="Search"
                className="text-base px-4 p-2 rounded-full outline-none"
              />
            </div>
          </div>
          <div className="cursor-pointer p-3 rounded-full bg-gradient-to-b from-[#E93C64] to-[#F6A52E]">
            <SearcIcon />
          </div>
        </div>
        <div
          ref={dropdownRef}
          className="relative flex items-center justify-center md:justify-end gap-4 sm:px-6"
        >
          {path === '/welcome' &&
          <button className="w-52 2xl:w-60 h-11 text-white font-semibold bg-background-gradient rounded-3xl">
            Enregistre mon salon
          </button>}
          {isLoggedIn ? (
            <div className="cursor-pointer">
              <HeartIcon />
            </div>
          ) : (
            <div className="cursor-pointer">
              <GiftIcon />
            </div>
          )}
          <div className="cursor-pointer">
            <Hamburger />
          </div>
          <div
            className="w-14 h-14 flex items-center justify-center pb-1 border-2 border-secondary rounded-full cursor-pointer"
            onClick={() => setIsDropdown(!isDropdown)}
          >
            <UserIcon />
          </div>
          {isDropdown && (
            <div className="absolute top-16 -mr-32 sm:-mr-44 md:mr-0 z-20 flex flex-col items-center justify-center w-60 p-7 text-black rounded-3xl bg-white shadow-[6px_4px_25px_6px_rgba(176,176,176,0.25)]">
              <div className="flex flex-col items-center justify-center gap-4 w-48 border-b border-[#D4CBCB] pb-7">
                <p className="cursor-pointer">Connexion</p>
                <p className="cursor-pointer">Inscription</p>
                <p className="cursor-pointer">Messages</p>
                <p className="cursor-pointer">Favoris</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-4 mt-7">
                <p className="cursor-pointer">Connexion espace pro</p>
                <p className="cursor-pointer">Inscription pro</p>
                <p className="cursor-pointer">Aide</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col xl:hidden items-center pr-2 rounded-xl bg-[#F7F7F7] overflow-auto mt-7">
        <div
          ref={filterMobileRef}
          className="flex items-center flex-col gap-3 p-4"
        >
          <div className="flex items-center justify-center">
            <div className="border-r border-grey px-6 last:border-r-0 cursor-pointer">
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
                <div className="absolute top-[235px] md:top-[180px] z-20 flex flex-col items-center justify-center w-44 px-7 pt-5 pb-2 text-black rounded-3xl bg-white shadow-[6px_4px_25px_6px_rgba(176,176,176,0.25)]">
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
            <div className="border-r border-grey px-6 last:border-r-0 cursor-pointer">
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
                <div className="absolute top-[235px] md:top-[180px] z-20 flex flex-col items-center justify-center w-36 px-7 pt-5 pb-2 text-black rounded-3xl bg-white shadow-[6px_4px_25px_6px_rgba(176,176,176,0.25)]">
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
          </div>
          <div className="flex">
            <div className="px-6 cursor-pointer">
              <input
                type="text"
                className="text-base px-4 p-2 rounded-full outline-none"
                placeholder="Search"
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
