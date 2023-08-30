import {
  CheckedIcon,
  GiftIcon,
  Hamburger,
  LogoIcon,
  SearcIcon,
  UserIcon,
  HeartIcon,
  MessageIcon,
  HelpIcon,
} from "@/components/utilis/Icons";
import React, { useEffect, useState } from "react";
import { getLocalStorage, removeFromLocalStorage } from "@/api/storage";
import { useRouter } from "next/navigation";
import { Auth } from "@/api/auth";

interface Navbar{
  isWelcomePage?: boolean
  onSearch?: (arg0: string)=>void
  onGenderFilter?: (arg0: string)=>void
  onEthnicityFilters?: (arg0: string[])=>void
}

const Navbar = ({isWelcomePage, onSearch, onGenderFilter, onEthnicityFilters}: Navbar) => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [showDesktopGender, setShowDesktopGender] = useState(false);
  const [showDesktopEthnicity, setShowDesktopEthnicity] = useState(false);

  const [showMobileGender, setShowMobileGender] = useState(false);
  const [showMobileEthnicity, setShowMobileEthnicity] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [genderFilters, setGenderFilters] = useState<string>('');
  const [ethnicityFilters, setEthnicityFilters] = useState<string[]>([]);
  const router=useRouter()
  const dropdownRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const EthnicityDesktopRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const GenderDesktopRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const EthicityMobileRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const GenderMobileRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const closeSelectBox = ({ target }: MouseEvent): void => {
    if (!dropdownRef.current?.contains(target as Node)) {
      setIsDropdown(false);
    }
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
  const dropdownItems=[
    {name: 'Messages', icon: <MessageIcon width="25" height="25"/>, route: '/client/messages'},
    {name: 'Favoris', icon: <HeartIcon width="25" height="25"/>, route: '/client/favorites'},
    {name: 'Aide', icon: <HelpIcon width="25" height="25"/>, route: ''},
  ]

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
    onEthnicityFilters && onEthnicityFilters(ethnicityFilters)
  };

  const onDropdownItemClick=(route: string)=>{
    if(route){
      router.push(route)
    }
  }

  const onLogout=()=>{
    Auth.logout()
    .then(response=>{
      removeFromLocalStorage("AuthToken")
      removeFromLocalStorage("User")
      router.push("/login");
    })
    .catch(error => console.log(error))
  }

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
        <div className="hidden xl:flex items-center pr-2 rounded-xl bg-[#F7F7F7] h-[52px] overflow-auto">
          <div
            className="flex items-center justify-center"
          >
            <div ref={EthnicityDesktopRef} className="border-r border-grey px-2 2xl:px-6 last:border-r-0 cursor-pointer">
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
            <div className="border-r border-grey px-6 last:border-r-0 cursor-pointer">
              <input
                type="text"
                placeholder="Search"
                className="text-base px-4 p-2 rounded-full outline-none"
                onChange={onSearch ? (e)=>onSearch(e.target.value) : ()=>{}}
              />
            </div>
          </div>
          <div className="cursor-pointer p-3 rounded-full bg-gradient-to-b from-[#E93C64] to-[#F6A52E]">
            <SearcIcon />
          </div>
        </div>
        <div
          ref={dropdownRef}
          className="relative flex items-center justify-center md:justify-end gap-4"
        >
          {!isLoggedIn &&
          <button onClick={()=>router.push('/signup')} className="w-52 2xl:w-60 h-11 text-white font-semibold bg-background-gradient rounded-3xl">
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
          <>
          <div
            className="w-12 h-12 flex items-center justify-center pb-1 border-2 border-secondary rounded-full cursor-pointer"
            onClick={() => setIsDropdown(!isDropdown)}
          >
            <UserIcon />
          </div>
          {isDropdown && (
            <div className="absolute top-14 right-0 z-20 pt-3 pb-2 flex flex-col items-center justify-center text-black rounded-3xl bg-white shadow-[6px_4px_25px_6px_rgba(176,176,176,0.25)]">
              <div className="flex flex-col gap-x-4 border-b w-44 border-[#D4CBCB] pb-3">
                {dropdownItems.map((item, index) => {
                  return <div key={index} onClick={()=>onDropdownItemClick(item.route)} className="flex gap-x-5 px-6 py-3 hover:bg-[#F5F5F5] cursor-pointer">
                    {item.icon}
                    <p>{item.name}</p>
                  </div>
                })}
              </div>
              <div onClick={onLogout} className="w-full flex flex-col items-center justify-center mt-2 px-6 py-3 hover:bg-[#F5F5F5] cursor-pointer">
                <p>Logout</p>
              </div>
            </div>
          )}
             </>
          }
        </div>
      </div>
      <div className="flex flex-col xl:hidden items-center pr-2 rounded-xl bg-[#F7F7F7] overflow-auto mt-7">
        <div
          className="flex items-center flex-col gap-3 p-4"
        >
          <div className="flex items-center justify-center">
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
                <div className="absolute top-[235px] md:top-[180px] z-20 flex flex-col items-center justify-center w-44 px-7 pt-5 text-black rounded-3xl bg-white shadow-[6px_4px_25px_6px_rgba(176,176,176,0.25)]">
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
                <div className="absolute top-[235px] md:top-[180px] z-20 flex flex-col items-center justify-center w-36 px-7 pt-5 text-black rounded-3xl bg-white shadow-[6px_4px_25px_6px_rgba(176,176,176,0.25)]">
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
