import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getLocalStorage } from "@/api/storage";
import { dashboard } from "@/api/dashboard";
import userLoader from "@/hooks/useLoader";
import useSnackbar from "@/hooks/useSnackbar";
import { Haircut, SalonHaircut } from "@/types";
import {
  CheckedIcon,
  SearcIcon,
  SelectedIcon,
} from "@/components/utilis/Icons";
import ScrollToTopButton from "@/components/utilis/Helper";
import { Theme_A } from "@/components/utilis/Themes";

export interface HaircutDetails {
  id: number;
  base_price: string;
  base_duration: string;
  court_price_length: string;
  court_duration_length: string;
  moyen_price_length: string;
  moyen_duration_length: string;
  long_price_length: string;
  long_duration_length: string;
  fin_price_type: string;
  fin_duration_type: string;
  moyen_price_type: string;
  moyen_duration_type: string;
  epais_price_type: string;
  epais_duration_type: string;
}

const Hairstyles = () => {
  const showSnackbar = useSnackbar();
  const { loadingView } = userLoader();
  const defaultHaircut = {
    id: -1,
    image: "",
    name: "",
    type: "",
    length: "",
    is_added_to_wishlist: false,
  };
  const [haircutList, setHaircutList] = useState<Haircut[]>([]);
  const [salonHaircutList, setSalonHaircutList] = useState<SalonHaircut[]>([]);
  const [selectedSalonHaircut, setSelectedSalonHaircut] =
    useState<Haircut>(defaultHaircut);
  const defaultFormDetails = {
    id: -1,
    base_price: "",
    base_duration: "",
    court_price_length: "0",
    court_duration_length: "0",
    moyen_price_length: "0",
    moyen_duration_length: "0",
    long_price_length: "0",
    long_duration_length: "0",
    fin_price_type: "0",
    fin_duration_type: "0",
    moyen_price_type: "0",
    moyen_duration_type: "0",
    epais_price_type: "0",
    epais_duration_type: "0",
  };
  const [form, setForm] = useState<HaircutDetails>(defaultFormDetails);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedHaircutsMapping, setSelectedHaircutsMapping] = useState<
    Haircut[]
  >([]);
  const [activeMenu, setActiveMenu] = useState<string>("new");
  const [ethnicityFilters, setEthnicityFilters] = useState<string[]>([]);
  const [genderFilters, setGenderFilters] = useState<string>("");
  const [lengthFilters, setLengthFilters] = useState<string[]>([]);
  const [filteredHaircuts, setFilteredHaircuts] = useState<Haircut[]>([]);
  const [search, setSearch] = useState<string>("");

  const [error, setError] = useState({
    base_price: "",
    base_duration: "",
    select_haircut: "",
  });

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

  const onClickEthnicityCheckbox = (ethnicity: string) => {
    if (ethnicityFilters.includes(ethnicity)) {
      setEthnicityFilters(
        ethnicityFilters.filter((item) => item !== ethnicity)
      );
    } else {
      setEthnicityFilters((prev) => [...prev, ethnicity]);
    }
  };

  const onClickGenderCheckbox = (gender: string) => {
    if (genderFilters === gender) {
      setGenderFilters("");
    } else {
      setGenderFilters(gender);
    }
  };

  const onClickLengthCheckbox = (length: string) => {
    if (lengthFilters.includes(length)) {
      setLengthFilters(lengthFilters.filter((item) => item !== length));
    } else {
      setLengthFilters((prev) => [...prev, length]);
    }
  };
  const onChangeInput = (value: string, input: string) => {
    switch (input) {
      case "base_price":
        setForm((prev) => ({
          ...prev,
          base_price: value,
        }));
        break;
      case "base_duration":
        setForm((prev) => ({
          ...prev,
          base_duration: value,
        }));
        break;
      case "court_price_length":
        setForm((prev) => ({
          ...prev,
          court_price_length: value,
        }));
        break;
      case "court_duration_length":
        setForm((prev) => ({
          ...prev,
          court_duration_length: value,
        }));
        break;
      case "moyen_price_length":
        setForm((prev) => ({
          ...prev,
          moyen_price_length: value,
        }));
        break;
      case "moyen_duration_length":
        setForm((prev) => ({
          ...prev,
          moyen_duration_length: value,
        }));
        break;
      case "long_price_length":
        setForm((prev) => ({
          ...prev,
          long_price_length: value,
        }));
        break;
      case "long_duration_length":
        setForm((prev) => ({
          ...prev,
          long_duration_length: value,
        }));
        break;
      case "fin_price_type":
        setForm((prev) => ({
          ...prev,
          fin_price_type: value,
        }));
        break;
      case "fin_duration_type":
        setForm((prev) => ({
          ...prev,
          fin_duration_type: value,
        }));
        break;
      case "moyen_price_type":
        setForm((prev) => ({
          ...prev,
          moyen_price_type: value,
        }));
        break;
      case "moyen_duration_type":
        setForm((prev) => ({
          ...prev,
          moyen_duration_type: value,
        }));
        break;
      case "epais_price_type":
        setForm((prev) => ({
          ...prev,
          epais_price_type: value,
        }));
        break;
      case "epais_duration_type":
        setForm((prev) => ({
          ...prev,
          epais_duration_type: value,
        }));
        break;
      default:
        break;
    }
  };
  const selectHaircut = (item: Haircut) => {
    let added = false;
    selectedHaircutsMapping.map((haircut) => {
      if (haircut.id === item.id) {
        setSelectedHaircutsMapping(
          selectedHaircutsMapping.filter((item) => item.id !== haircut.id)
        );
        added = true;
      }
    });
    if (!added) {
      setSelectedHaircutsMapping((prev) => [...prev, item]);
    }
  };

  const selectSalonHaircut = (index: number) => {
    if (salonHaircutList.length) {
      salonHaircutList.map((haircut, i) => {
        if (i === index) {
          setSelectedSalonHaircut(haircut);
          setForm(haircut.salon_haircuts[0]);
        }
      });
    }
  };

  const getHaircuts = () => {
    setGenderFilters("");
    setEthnicityFilters([]);
    setLengthFilters([]);
    setIsLoading(true);
    const id = Number(getLocalStorage("salon_id"));
    if (id) {
      dashboard
        .getAllHaircutBySalon(id)
        .then((res) => {
          setHaircutList(res.data.data.all_haircuts_without_salon_haircuts);
          setSalonHaircutList(res.data.data.salon_haircuts);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const getFilteredCuts = () => {
    const haircuts: Haircut[] = [];
    let list: Haircut[];
    if (activeMenu === "new") {
      list = haircutList;
    } else {
      list = salonHaircutList;
    }
    if (search) {
      list = list.filter((haircut) =>
        haircut.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (
      ethnicityFilters.length > 0 &&
      genderFilters &&
      lengthFilters.length > 0
    ) {
      list.forEach((haircut) => {
        ethnicityFilters.forEach((filter) => {
          if (haircut?.group && haircut.group.group === filter) {
            if (
              haircut.type === genderFilters.toLowerCase() ||
              genderFilters === "Mix"
            ) {
              lengthFilters.forEach((filter) => {
                if (haircut.length === filter.toLowerCase()) {
                  haircuts.push(haircut);
                }
              });
            }
          }
        });
      });
    } else if (ethnicityFilters.length > 0 && genderFilters) {
      list.forEach((haircut) => {
        ethnicityFilters.forEach((filter) => {
          if (haircut?.group && haircut.group.group === filter) {
            if (
              haircut.type === genderFilters.toLowerCase() ||
              genderFilters === "Mix"
            ) {
              haircuts.push(haircut);
            }
          }
        });
      });
    } else if (ethnicityFilters.length > 0 && lengthFilters.length > 0) {
      list.forEach((haircut) => {
        ethnicityFilters.forEach((filter) => {
          if (haircut?.group && haircut.group.group === filter) {
            lengthFilters.forEach((filter) => {
              if (haircut.length === filter.toLowerCase()) {
                haircuts.push(haircut);
              }
            });
          }
        });
      });
    } else if (lengthFilters.length > 0 && genderFilters) {
      list.forEach((haircut) => {
        lengthFilters.forEach((filter) => {
          if (haircut.length === filter.toLowerCase()) {
            if (
              haircut.type === genderFilters.toLowerCase() ||
              genderFilters === "Mix"
            ) {
              haircuts.push(haircut);
            }
          }
        });
      });
    } else if (ethnicityFilters.length > 0) {
      list.forEach((haircut) => {
        ethnicityFilters.forEach((filter) => {
          if (haircut?.group && haircut.group.group === filter) {
            haircuts.push(haircut);
          }
        });
      });
    } else if (lengthFilters.length > 0) {
      list.forEach((haircut) => {
        lengthFilters.forEach((filter) => {
          if (haircut.length === filter.toLowerCase()) {
            haircuts.push(haircut);
          }
        });
      });
    } else if (genderFilters) {
      list.forEach((haircut) => {
        if (
          haircut.type === genderFilters.toLowerCase() ||
          genderFilters === "Mix"
        ) {
          haircuts.push(haircut);
        }
      });
    }
    if (
      search &&
      !(ethnicityFilters.length > 0) &&
      !genderFilters &&
      !(lengthFilters.length > 0)
    ) {
      setFilteredHaircuts(list);
    } else {
      setFilteredHaircuts(haircuts);
    }
  };
  const onToggleHairstyle = () => {
    setActiveMenu("new");
    setForm(defaultFormDetails);
    setSelectedSalonHaircut(defaultHaircut);
  };
  const addSalonHaircuts = async () => {
    if (!form.base_price) {
      setError((prev) => {
        return { ...prev, base_price: "Price is required" };
      });
      return;
    } else {
      setError((prev) => {
        return { ...prev, base_price: "" };
      });
    }
    if (!form.base_duration) {
      setError((prev) => {
        return { ...prev, base_duration: "Duration is required" };
      });
      return;
    } else {
      setError((prev) => {
        return { ...prev, base_duration: "" };
      });
    }
    if (selectedHaircutsMapping.length == 0) {
      setError((prev) => {
        return {
          ...prev,
          select_haircut: "Selection of atleast one haircut is required",
        };
      });
      return;
    } else {
      setError((prev) => {
        return { ...prev, select_haircut: "" };
      });
    }
    let data: any = form;
    const selectedHaircuts: number[] = [];
    selectedHaircutsMapping.map((item) => {
      selectedHaircuts.push(item.id);
    });
    data.hair_salon_id = Number(getLocalStorage("salon_id"));
    data.haircut_ids = selectedHaircuts;
    await dashboard
      .addSalonHaircut(data)
      .then((res) => {
        setSelectedHaircutsMapping([]);
        setForm(defaultFormDetails);
        showSnackbar("success", "Haircuts added successfully");
        getHaircuts();
      })
      .catch((err) => {
        showSnackbar("error", "Failed to add new haircuts");
      });
  };

  const updateSalonHaircuts = async () => {
    if (!form.base_price) {
      setError((prev) => {
        return { ...prev, base_price: "Price is required" };
      });
      return;
    } else {
      setError((prev) => {
        return { ...prev, base_price: "" };
      });
    }
    if (!form.base_duration) {
      setError((prev) => {
        return { ...prev, base_duration: "Duration is required" };
      });
      return;
    } else {
      setError((prev) => {
        return { ...prev, base_duration: "" };
      });
    }
    let data: any = form;
    data.hair_salon_id = Number(getLocalStorage("salon_id"));
    data.haircut_id = selectedSalonHaircut.id;
    await dashboard
      .updateSalonHaircut(form.id, data)
      .then((res) => {
        setForm(defaultFormDetails);
        showSnackbar("success", "Haircut updated successfully");
        getHaircuts();
        setSelectedSalonHaircut(defaultHaircut);
      })
      .catch((err) => {
        showSnackbar("error", "Failed to update haircut");
      });
  };
  const getSelectedImage = () => {
    let url = "";
    if (
      activeMenu === "new" &&
      selectedHaircutsMapping[selectedHaircutsMapping.length - 1]
    ) {
      url = `https://api-server.onehaircut.com/public${selectedHaircutsMapping[selectedHaircutsMapping.length - 1].image}`;
    } else if (selectedSalonHaircut.image) {
      url = `https://api-server.onehaircut.com/public${selectedSalonHaircut.image}`;
    }
    return url;
  };
  const haircuts = () => {
    if (
      ethnicityFilters.length > 0 ||
      genderFilters ||
      lengthFilters.length > 0 ||
      search !== ""
    ) {
      return filteredHaircuts;
    } else if (activeMenu === "new") {
      return haircutList;
    } else if (activeMenu === "added") {
      return salonHaircutList;
    } else {
      return [];
    }
  };

  const selectAllHaircuts = () => {
    if (
      haircutList.length &&
      selectedHaircutsMapping.length === haircutList.length
    ) {
      setSelectedHaircutsMapping([]);
    } else {
      if(
        ethnicityFilters.length > 0 ||
        genderFilters ||
        lengthFilters.length > 0 ||
        search !== ""
      ) {
      setSelectedHaircutsMapping(filteredHaircuts);
      } else {
        setSelectedHaircutsMapping(haircutList);
      }
    }
  };
  useEffect(() => {
    getHaircuts();
  }, []);

  useEffect(() => {
    setGenderFilters("");
    setEthnicityFilters([]);
    setLengthFilters([]);
    setFilteredHaircuts([]);
  }, [activeMenu]);

  useEffect(() => {
    getFilteredCuts();
  }, [ethnicityFilters, genderFilters, lengthFilters, search]);

  return (
    <div>
      {isLoading && loadingView()}
      <div className="flex justify-center items-center">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-4 w-max p-1 mb-4">
          <div className="flex items-center justify-center gap-2">
            <div className="relative group">
              <div
                className={
                  ethnicityFilters.length > 0
                    ? "flex gap-4 rounded-full bg-stone-800 border border-[#EDEDED] p-1 text-sm text-white shadow-[0px_3px_6px_0px_rgba(176,176,176,0.25)]"
                    : "flex gap-4 rounded-full bg-white border border-[#EDEDED] p-1 text-sm text-[#737373] shadow-[0px_3px_6px_0px_rgba(176,176,176,0.25)]"
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
                        className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5 ${
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
            </div>
            <div className="relative group">
              <div
                className={
                  genderFilters.length > 0
                    ? "flex gap-4 rounded-full bg-stone-800 border border-[#EDEDED] p-1 text-sm text-white shadow-[0px_3px_6px_0px_rgba(176,176,176,0.25)]"
                    : "flex gap-4 rounded-full bg-white border border-[#EDEDED] p-1 text-sm text-[#737373] shadow-[0px_3px_6px_0px_rgba(176,176,176,0.25)]"
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
            </div>
            <div className="relative group">
              <div
                className={
                  lengthFilters.length > 0
                    ? "flex gap-4 rounded-full bg-stone-800 border border-[#EDEDED] p-1 text-sm text-white shadow-[0px_3px_6px_0px_rgba(176,176,176,0.25)]"
                    : "flex gap-4 rounded-full bg-white border border-[#EDEDED] p-1 text-sm text-[#737373] shadow-[0px_3px_6px_0px_rgba(176,176,176,0.25)]"
                }
              >
                <div className="px-4 cursor-pointer">Longueur</div>
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
            </div>
          </div>
          <div className="relative">
            <div
              className={
                haircutList.length &&
                selectedHaircutsMapping.length === haircutList.length
                  ? "flex gap-4 rounded-full bg-stone-800 border border-[#EDEDED] p-1 text-sm text-white shadow-[0px_3px_6px_0px_rgba(176,176,176,0.25)]"
                  : "flex gap-4 rounded-full bg-white border border-[#EDEDED] p-1 text-sm text-[#737373] shadow-[0px_3px_6px_0px_rgba(176,176,176,0.25)]"
              }
              onClick={selectAllHaircuts}
            >
              <div className="hover:bg-stone-800 hover:text-white rounded-full px-4 cursor-pointer transform hover:scale-105 transition-transform">Select All</div>
            </div>
          </div>
          <div className="relative flex">
            <input
              type="text"
              className="min-w-[300px] text-sm py-2 px-4 outline-none rounded-full bg-white border border-[#EDEDED] shadow-[0px_3px_6px_0px_rgba(176,176,176,0.25)]"
              placeholder="Nom coiffure"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute right-1 top-[3px] cursor-pointer p-2 rounded-full bg-gradient-to-b from-[#E93C64] to-[#F6A52E]">
              <SearcIcon />
            </div>
          </div>
          <div>
            <div className="flex gap-4 rounded-full bg-white border border-[#EDEDED] p-1 text-sm text-[#737373]">
              <div
                className={`hover:bg-stone-100 hover:text-black rounded-full py-1 px-4 cursor-pointer transition duration-50 ${
                  activeMenu === "added" && "bg-stone-800 text-white"
                }`}
                onClick={() => setActiveMenu("added")}
              >
                Show Added Haircuts
              </div>
              <div
                className={`hover:bg-stone-100 hover:text-black rounded-full py-1 px-4 cursor-pointer transition duration-50 ${
                  activeMenu === "new" && "bg-stone-800 text-white"
                }`}
                onClick={onToggleHairstyle}
              >
                Add New Haircuts
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="bg-lightGrey rounded-3xl p-4 md:sticky md:top-0 h-max">
          <div className="flex items-center justify-center gap-2">
          <h2 className="text-lg font-semibold text-center">
            Configurations des coiffures
          </h2>
          {(selectedHaircutsMapping.length > 0 && activeMenu === 'new') && <div className="text-sm py-1 px-[10px] rounded-full text-white bg-gradient-to-r from-primaryGradientFrom via-primaryGradientVia to-primaryGradientTo">{selectedHaircutsMapping.length}</div>}
          </div>
          <div className="flex items-center justify-center">
            {getSelectedImage() ? (
              <div className={`relative ${Theme_A.CardSize.Big}`}>
                <Image
                  src={getSelectedImage()}
                  fill={true}
                  alt=""
                  className="rounded-2xl mt-2"
                />
              </div>
            ) : (
              <div className="mt-2 flex items-center justify-center w-36 h-36 bg-zinc-200 border-1 border-black rounded-2xl shadow-md ">
                Select Haircut
              </div>
            )}
          </div>
          <div className="flex flex-col items-center w-max gap-y-2 mt-4">
            <div className="flex gap-3 flex-col md:flex-row items-baseline justify-begin">
              <div className="flex flex-col items-start gap-2 w-max">
                <label htmlFor="prix" className="text-sm font-medium">
                  Prix de base
                </label>
                <input
                  type="number"
                  name="prix"
                  placeholder="40"
                  className="w-20 px-2 py-1 text-sm border outline-none rounded-lg shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)]"
                  value={form.base_price}
                  onChange={(e) => onChangeInput(e.target.value, "base_price")}
                />
                {error.base_price && (
                  <p className="text-xs text-red-700 ml-3 mt-1">
                    {error.base_price}*
                  </p>
                )}
              </div>
              <div className="flex flex-col items-start gap-2 w-max mt-2 flex space-x-11 ">
                <label htmlFor="duration" className="text-sm font-medium">
                  Durée d’exécution de base
                </label>
                <input
                  type="number"
                  placeholder="35 min"
                  className="w-20 px-2 py-1 text-sm border outline-none rounded-lg shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)]"
                  value={form.base_duration}
                  onChange={(e) =>
                    onChangeInput(e.target.value, "base_duration")
                  }
                />
                {error.base_duration && (
                  <p className="text-xs text-red-700 ml-3 mt-1">
                    {error.base_duration}*
                  </p>
                )}
              </div>
            </div>
            <div className="mt-2">
              <div>
                <p className="text-medium text-sm text-grey italic text-center">
                Ajustement selon la longueur initiale de cheveux
                </p>
              </div>
              <div className="flex items-center gap-x-4 mt-4">
                <p className="text-sm min-w-[50px]">Court</p>
                <div>
                  <input
                    type="number"
                    className="w-20 px-2 py-1 text-sm border outline-none rounded-lg shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)]"
                    value={form.court_price_length}
                    onChange={(e) =>
                      onChangeInput(e.target.value, "court_price_length")
                    }
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    className="w-20 px-2 py-1 text-sm border outline-none rounded-lg shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)]"
                    value={form.court_duration_length}
                    onChange={(e) =>
                      onChangeInput(e.target.value, "court_duration_length")
                    }
                  />
                  <p className="text-xs">min</p>
                </div>
              </div>
              <div className="flex items-center gap-x-4 mt-2">
                <p className="text-sm min-w-[50px]">Moyen</p>
                <div>
                  <input
                    type="number"
                    className="w-20 px-2 py-1 text-sm border outline-none rounded-lg shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)]"
                    value={form.moyen_price_length}
                    onChange={(e) =>
                      onChangeInput(e.target.value, "moyen_price_length")
                    }
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    className="w-20 px-2 py-1 text-sm border outline-none rounded-lg shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)]"
                    value={form.moyen_duration_length}
                    onChange={(e) =>
                      onChangeInput(e.target.value, "moyen_duration_length")
                    }
                  />
                  <p className="text-xs">min</p>
                </div>
              </div>
              <div className="flex items-center gap-x-4 mt-2">
                <p className="text-sm min-w-[50px]">Long</p>
                <div>
                  <input
                    type="number"
                    className="w-20 px-2 py-1 text-sm border outline-none rounded-lg shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)]"
                    value={form.long_price_length}
                    onChange={(e) =>
                      onChangeInput(e.target.value, "long_price_length")
                    }
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    className="w-20 px-2 py-1 text-sm border outline-none rounded-lg shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)]"
                    value={form.long_duration_length}
                    onChange={(e) =>
                      onChangeInput(e.target.value, "long_duration_length")
                    }
                  />
                  <p className="text-xs">min</p>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div>
                <p className="text-medium text-sm text-grey italic text-center">
                  {"Ajustement selon l'épaisseur initiale de cheveux"}
                </p>
              </div>
              <div className="flex items-center gap-x-4 mt-4">
                <p className="text-sm min-w-[50px]">Fin</p>
                <div>
                  <input
                    type="number"
                    className="w-20 px-2 py-1 text-sm border outline-none rounded-lg shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)]"
                    value={form.fin_price_type}
                    onChange={(e) =>
                      onChangeInput(e.target.value, "fin_price_type")
                    }
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    className="w-20 px-2 py-1 text-sm border outline-none rounded-lg shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)]"
                    value={form.fin_duration_type}
                    onChange={(e) =>
                      onChangeInput(e.target.value, "fin_duration_type")
                    }
                  />
                  <p className="text-xs">min</p>
                </div>
              </div>
              <div className="flex items-center gap-x-4 mt-2">
                <p className="text-sm min-w-[50px]">Moyen</p>
                <div>
                  <input
                    type="number"
                    className="w-20 px-2 py-1 text-sm border outline-none rounded-lg shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)]"
                    value={form.moyen_price_type}
                    onChange={(e) =>
                      onChangeInput(e.target.value, "moyen_price_type")
                    }
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    className="w-20 px-2 py-1 text-sm border outline-none rounded-lg shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)]"
                    value={form.moyen_duration_type}
                    onChange={(e) =>
                      onChangeInput(e.target.value, "moyen_duration_type")
                    }
                  />
                  <p className="text-xs">min</p>
                </div>
              </div>
              <div className="flex items-center gap-x-4 mt-2">
                <p className="text-sm min-w-[50px]">Epais</p>
                <div>
                  <input
                    type="number"
                    className="w-20 px-2 py-1 text-sm border outline-none rounded-lg shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)]"
                    value={form.epais_price_type}
                    onChange={(e) =>
                      onChangeInput(e.target.value, "epais_price_type")
                    }
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    className="w-20 px-2 py-1 text-sm border outline-none rounded-lg shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)]"
                    value={form.epais_duration_type}
                    onChange={(e) =>
                      onChangeInput(e.target.value, "epais_duration_type")
                    }
                  />
                  <p className="text-xs">min</p>
                </div>
              </div>
            </div>
            {!(activeMenu === "added" && selectedSalonHaircut.id >= 0) ? (
              <div className="flex items-center justify-center gap-4 mt-4">
              <button onClick={addSalonHaircuts} className="text-white font-medium text-sm rounded-md px-4 py-2 bg-gradient-to-r from-primaryGradientFrom via-primaryGradientVia to-primaryGradientTo shadow-md transform hover:scale-110 transition-transform hover:shadow-[0px_7px_12px_0px_rgba(255,125,60,0.25)]">
                  Ajouter
              </button>
          </div>
          
            ) : (
              <div className="flex items-center justify-center gap-4 mt-4 w-full">
                <button
                  className="w-full text-black font-medium text-sm rounded-md px-4 py-2 bg-white border border-x-red-500 border-y-orange-500 transform hover:scale-105 transition-transform hover:shadow-md"
                  onClick={() => {
                    setForm(defaultFormDetails);
                    setSelectedSalonHaircut(defaultHaircut);
                  }}
                >
                  Annuler
                </button>
                <button
                  onClick={updateSalonHaircuts}
                  className="w-full text-white font-medium text-sm rounded-md px-4 py-2 bg-gradient-to-r from-primaryGradientFrom via-primaryGradientVia to-primaryGradientTo transform hover:scale-105 transition-transform hover:shadow-[0px_7px_12px_0px_rgba(255,125,60,0.25)]"
                >
                  mettre &agrave; jour
                </button>
              </div>
            )}
            {error.select_haircut && (
              <p className="text-xs text-red-900 ml-3 mt-1">
                {error.select_haircut}*
              </p>
            )}
          </div>
        </div>
        {activeMenu === "new" ? (
          <div className=" relative flex-1 flex flex-wrap h-max gap-8">
            {haircuts().map((item, index) => {
              return (
                <>
                <div
                  key={index}
                  className="shadow-md rounded-xl my-2 cursor-pointer hover:outline outline-1 outline-stone-400"
                  onClick={() => selectHaircut(item)}
                >
                  <div className={`relative w-max px-4 pt-4 rounded-t-xl  bg-gradient-to-r from-${Theme_A.colors.cardFrom} via-${Theme_A.colors.cardVia_Dark} to-${Theme_A.colors.cardTo}`}>
                    <div className={`relative ${Theme_A.CardSize.Small}`}>
                    <Image src={item.image.includes('https://api-server.onehaircut.com/public') ? item.image : `https://api-server.onehaircut.com/public/${item.image}`} fill={true} alt="" />
                    </div>
                    <div className="transform hover:scale-125 transition-transform absolute top-5 right-5 w-6 h-6 rounded-full bg-zinc-50">
                      {selectedHaircutsMapping.filter(
                        (haircut) => haircut.id === item.id
                      ).length > 0 && <SelectedIcon />}
                    </div>
                  </div>
                  <div className={`rounded-b-xl bg-gradient-to-r from-${Theme_A.colors.cardFrom} via-${Theme_A.colors.cardVia_Dark} to-${Theme_A.colors.cardTo}`}>
                    <p className="rounded-b-xl flex items-center justify-center py-2 text-sm text-black font-medium">
                      {item.name}
                    </p>
                  </div>
                </div>
                </>
              );
            })}
          </div>
        ) : (
          <div className="flex-1 flex flex-wrap h-max gap-8 overflow-scroll">
            {haircuts().map((item, index) => {
              return (
                <div
                  key={index}
                  className="shadow-md rounded-xl my-2 cursor-pointer bg-zinc-200"
                  onClick={() => selectSalonHaircut(index)}
                >
                  <div className={`relative w-max px-4 pt-4 rounded-t-xl bg-gradient-to-r from-${Theme_A.colors.SelectedcardFrom} via-${Theme_A.colors.SelectedcardVia} to-${Theme_A.colors.SelectedcardTo}`}>
                    <div className={`relative ${Theme_A.CardSize.Small}`}>
                      <Image src={item.image.includes('https://api-server.onehaircut.com/public') ? item.image : `https://api-server.onehaircut.com/public/${item.image}`} fill={true} alt="" />
                    </div>
                    <div className="absolute top-5 right-5 w-6 h-6 rounded-full bg-stone-50 transform hover:scale-125 transition-transform ">
                      {selectedSalonHaircut?.id === item.id && <SelectedIcon />}
                    </div>
                  </div>
                  <div className={`rounded-b-xl bg-gradient-to-r from-${Theme_A.colors.SelectedcardFrom} via-${Theme_A.colors.SelectedcardVia} to-${Theme_A.colors.SelectedcardTo}`}>
                      <p className="rounded-b-xl flex items-center justify-center py-2 text-sm text-black font-medium">
                          {item.name}
                      </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hairstyles;
