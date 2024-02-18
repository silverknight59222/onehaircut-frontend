import React, { useEffect, useState } from 'react';
import { Theme_A } from "@/components/utilis/Themes";
import Image from "next/image";
import {
    CheckedIcon,
    SearcIcon,
    SelectedIcon,
} from "@/components/utilis/Icons";
import _debounce from 'lodash/debounce';

import { ColorsThemeA } from "@/components/utilis/Themes";

// For update commit

const HairStyleListHeader = React.memo(({ setActiveMenu, isd_value, activeMenu, onFilterSelect, params, selectAllEvent, onListCountShow, setFinalItems }: any) => {
    // //console.log("in HairStyleListHeader")


    const [ethnicityFilters, setEthnicityFilters] = useState<string[]>([]);
    const [genderFilters, setGenderFilters] = useState<string>("");
    const [lengthFilters, setLengthFilters] = useState<string[]>([]);
    const [search, setSearch] = useState<string>("");
    const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
    const [resultCount, setResultCount] = useState(0);

    const Ethnicity = [
        {
            name: "Afro",
        },
        {
            name: "Asian",
        },
        {
            name: "Oriental",
        },
        {
            name: "Occidental",
        },
    ];
    const Gender = [
        {
            name: "Men",
        },
        {
            name: "Women",
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

    useEffect(() => {
        // setGenderFilters(baseSelectedGender)
    }, [])

    const onClickEthnicityCheckbox = (ethnicity: string) => {
        if (ethnicityFilters.includes(ethnicity)) {
            params.ethnicityFilters = ethnicityFilters.filter((item) => item !== ethnicity)
            setEthnicityFilters(
                ethnicityFilters.filter((item) => item !== ethnicity)
            );
        } else {
            params.ethnicityFilters = [...ethnicityFilters, ethnicity]
            setEthnicityFilters((prev) => [...prev, ethnicity]);
        }
        resetSelectALl()
    };

    const onClickGenderCheckbox = (gender: string) => {
        if (genderFilters === gender) {
            setGenderFilters("");
            params.genderFilters = ""
        } else {
            params.genderFilters = gender
            setGenderFilters(gender);
        }
        // baseSelectedGender = ""
        // setBaseGender(baseSelectedGender)
        resetSelectALl()
    };

    const onClickLengthCheckbox = (length: string) => {
        if (lengthFilters.includes(length)) {
            params.lengthFilters = lengthFilters.filter((item) => item !== length)
            setLengthFilters(lengthFilters.filter((item) => item !== length));
        } else {
            params.lengthFilters = [...lengthFilters, length]
            setLengthFilters((prev) => [...prev, length]);
        }
        resetSelectALl()
    };

    const setSearchValue = (value) => {
        params.search = value
        setSearch(value)
        resetSelectALl()
    }

    const getFilteredCuts = () => {
        if (onFilterSelect) {
            setTimeout(() => {
                onFilterSelect.on(params)
            })
        }
        // const haircuts: Haircut[] = [];
        // let list: Haircut[];
        // if (activeMenu === "new") {
        //     list = haircutList;
        // } else {
        //     list = salonHaircutList;
        // }
        // if (search) {
        //     list = list.filter((haircut) =>
        //         haircut.name.toLowerCase().includes(search.toLowerCase())
        //     );
        // }
        // if (
        //     ethnicityFilters.length > 0 &&
        //     genderFilters &&
        //     lengthFilters.length > 0
        // ) {
        //     list.forEach((haircut) => {
        //         ethnicityFilters.forEach((filter) => {
        //             if (haircut?.group && haircut.group.group === filter) {
        //                 if (
        //                     haircut.type === genderFilters.toLowerCase() ||
        //                     genderFilters === "Mix"
        //                 ) {
        //                     lengthFilters.forEach((filter) => {
        //                         if (haircut.length === filter.toLowerCase()) {
        //                             haircuts.push(haircut);
        //                         }
        //                     });
        //                 }
        //             }
        //         });
        //     });
        // } else if (ethnicityFilters.length > 0 && genderFilters) {
        //     list.forEach((haircut) => {
        //         ethnicityFilters.forEach((filter) => {
        //             if (haircut?.group && haircut.group.group === filter) {
        //                 if (
        //                     haircut.type === genderFilters.toLowerCase() ||
        //                     genderFilters === "Mix"
        //                 ) {
        //                     haircuts.push(haircut);
        //                 }
        //             }
        //         });
        //     });
        // } else if (ethnicityFilters.length > 0 && lengthFilters.length > 0) {
        //     list.forEach((haircut) => {
        //         ethnicityFilters.forEach((filter) => {
        //             if (haircut?.group && haircut.group.group === filter) {
        //                 lengthFilters.forEach((filter) => {
        //                     if (haircut.length === filter.toLowerCase()) {
        //                         haircuts.push(haircut);
        //                     }
        //                 });
        //             }
        //         });
        //     });
        // } else if (lengthFilters.length > 0 && genderFilters) {
        //     list.forEach((haircut) => {
        //         lengthFilters.forEach((filter) => {
        //             if (haircut.length === filter.toLowerCase()) {
        //                 if (
        //                     haircut.type === genderFilters.toLowerCase() ||
        //                     genderFilters === "Mix"
        //                 ) {
        //                     haircuts.push(haircut);
        //                 }
        //             }
        //         });
        //     });
        // } else if (ethnicityFilters.length > 0) {
        //     list.forEach((haircut) => {
        //         ethnicityFilters.forEach((filter) => {
        //             if (haircut?.group && haircut.group.group === filter) {
        //                 haircuts.push(haircut);
        //             }
        //         });
        //     });
        // } else if (lengthFilters.length > 0) {
        //     list.forEach((haircut) => {
        //         lengthFilters.forEach((filter) => {
        //             if (haircut.length === filter.toLowerCase()) {
        //                 haircuts.push(haircut);
        //             }
        //         });
        //     });
        // } else if (genderFilters) {
        //     list.forEach((haircut) => {
        //         if (
        //             haircut.type === genderFilters.toLowerCase() ||
        //             genderFilters === "Mix"
        //         ) {
        //             haircuts.push(haircut);
        //         }
        //     });
        // }
        // if (
        //     search &&
        //     !(ethnicityFilters.length > 0) &&
        //     !genderFilters &&
        //     !(lengthFilters.length > 0)
        // ) {
        //     setFilteredHaircuts(list);
        // } else {
        //     setFilteredHaircuts(haircuts);
        // }
    };

    const toAddTab = () => {
        setIsAllSelected(false)
        setActiveMenu("added")
        setFinalItems([])
    }

    const toNewTab = () => {
        setIsAllSelected(false)
        setActiveMenu("new")
        setFinalItems([])
    }

    const resetSelectALl = () => {
        setIsAllSelected(false)
        selectAllEvent.on(false)
    }

    const selectAllHaircuts = () => {
        setIsAllSelected(!isAllSelected)
        selectAllEvent.on(!isAllSelected)
    };

    const setListCount = (value) => {
        setResultCount(value)
    }

    onListCountShow.on = setListCount

    useEffect(() => {
        setGenderFilters(params.genderFilters != "" ? params.genderFilters : "");
        setEthnicityFilters([]);
        setLengthFilters([]);
    }, [activeMenu]);

    useEffect(() => {
        setGenderFilters(params.genderFilters != "" ? params.genderFilters : "");
        getFilteredCuts()
        console.log("Params")
        console.log(params)
        console.log("Base Selected Gender : " + params.genderFilters)
        console.log(genderFilters)
        console.log(genderFilters.includes("Men"))
    }, [ethnicityFilters, genderFilters, lengthFilters, search]);

    // This component will re-render only if the `data` prop changes
    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-wrap lg:flex-row items-center gap-4 w-max p-1 mb-4">
                <div className="flex items-center justify-center gap-2">
                    <div className="relative group">
                        <div
                            className={
                                ethnicityFilters.length > 0
                                    ? `${Theme_A.browingFilters.proHairstyleFilterON}`
                                    : `${Theme_A.browingFilters.proHairstyleFilterOFF}`
                            }
                        >
                            <div className="px-4 cursor-pointer">Groupe Ethnique</div>
                        </div>
                        <div className="hidden group-hover:block absolute top-[30px] bg-white z-10 text-sm text-[#737373] rounded-lg border min-w-[134px] ">
                            {Ethnicity.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex gap-2 px-4 py-2.5 opacity-70 hover:opacity-100 cursor-pointer transform hover:scale-110 transition-transform"
                                        onClick={() => onClickEthnicityCheckbox(item.name)}
                                    >
                                        <div
                                            className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5 ${ethnicityFilters.includes(item.name)
                                                ? `${ColorsThemeA.ohcVerticalGradient_A}`
                                                : `${ColorsThemeA.inactivButtonColor}`
                                                }`}
                                        >
                                            <CheckedIcon />
                                        </div>
                                        <p className="ml-2">{item.name}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="relative group">
                        <div
                            className={
                                genderFilters.length > 0
                                    ? `${Theme_A.browingFilters.proHairstyleFilterON}`
                                    : `${Theme_A.browingFilters.proHairstyleFilterOFF}`
                            }
                        >
                            <div className="px-4 cursor-pointer">Genre</div>
                        </div>
                        <div className="hidden group-hover:block absolute top-[30px] bg-white z-10 text-sm text-[#737373] rounded-lg border min-w-[134px]">
                            {Gender.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex gap-2 px-4 py-2.5 opacity-70 hover:opacity-100 cursor-pointer transform hover:scale-110 transition-transform"
                                        onClick={() => onClickGenderCheckbox(item.name)}
                                    >
                                        <div
                                            className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5  ${genderFilters.includes(item.name)
                                                ? `${ColorsThemeA.ohcVerticalGradient_A}`
                                                : `${ColorsThemeA.inactivButtonColor}`
                                                }`}
                                        >
                                            <CheckedIcon />
                                        </div>
                                        <p className="ml-2">{item.name}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="relative group">
                        <div
                            className={
                                lengthFilters.length > 0
                                    ? `${Theme_A.browingFilters.proHairstyleFilterON}`
                                    : `${Theme_A.browingFilters.proHairstyleFilterOFF}`
                            }
                        >
                            <div className={`${Theme_A.shapes.standardShape} " " ${Theme_A.behaviour.buttonHoverBehaviour_1}`}>Longueur</div>
                        </div>
                        <div className="hidden group-hover:block absolute top-[30px] bg-white z-10 text-sm text-[#737373] rounded-lg border min-w-[134px]">
                            {Length.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex gap-2 px-4 py-2.5 opacity-70 hover:opacity-100 cursor-pointer transform hover:scale-110 transition-transform"
                                        onClick={() => onClickLengthCheckbox(item.name)}
                                    >
                                        <div
                                            className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5  ${lengthFilters.includes(item.name)
                                                ? `${ColorsThemeA.ohcVerticalGradient_A}`
                                                : `${ColorsThemeA.inactivButtonColor}`
                                                }`}
                                        >
                                            <CheckedIcon />
                                        </div>
                                        <p className="ml-2">{item.name}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <div
                        className={
                            isAllSelected
                                ? `${Theme_A.browingFilters.proHairstyleFilterON}`
                                : `${Theme_A.browingFilters.proHairstyleFilterOFF}`
                        }
                        onClick={() => { selectAllHaircuts() }}
                    >
                        <div className={`${Theme_A.behaviour.buttonHoverBehaviour_2}`}>Tout selectionner</div>
                    </div>
                </div>
                <div className="relative flex">
                    <input
                        type="text"
                        className={`${Theme_A.Bars.searchBar_2}`}
                        placeholder="Nom coiffure"
                        value={search}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <div className={`${Theme_A.shapes.smallSearchCircle}`}>
                        <SearcIcon />
                    </div>
                </div>
                <div>
                    <div className="flex gap-4 rounded-full bg-white border border-[#EDEDED] p-1 text-sm text-[#737373]">
                        <div
                            className={`${Theme_A.behaviour.buttonHoverBehaviour_3} ${activeMenu === "added" && "bg-stone-800 text-white"
                                }`}
                            onClick={() => toAddTab()}
                        >
                            Coiffures ajoutées
                        </div>
                        <div
                            className={`${Theme_A.behaviour.buttonHoverBehaviour_3}  ${activeMenu === "new" && "bg-stone-800 text-white"
                                }`}
                            onClick={() => toNewTab()}
                        >
                            Coiffure non dispensées
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col-reverse lg:flex-row items-center gap-4 w-max p-1 mb-4 ml-5 text-[#737373]">
                <div className={`${Theme_A.indicators.counterIndicator_B}`}>Résultat: {resultCount}</div>
            </div>
        </div>
    );
});

export default HairStyleListHeader;