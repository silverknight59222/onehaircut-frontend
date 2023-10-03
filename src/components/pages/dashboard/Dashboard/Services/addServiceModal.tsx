import { dashboard } from "@/api/dashboard";
import { getLocalStorage } from "@/api/storage";
import { CheckedIcon, CrossIcon, SearcIcon } from "@/components/utilis/Icons";
import useSnackbar from "@/hooks/useSnackbar";
import userLoader from "@/hooks/useLoader";
import React, { useEffect, useState } from "react";
import { Theme_A, ColorsThemeA } from "@/components/utilis/Themes";
import '../../../../utilis/StylesOHC.css';
interface AddServiceModalType {
  setShowAddServiceModal: (value: boolean) => void;
  fetchAllServices: () => void;
}
interface Color {
  id: number;
  color: string;
}
export interface Service {
  id: number;
  name: string;
  description: string;
  percent: string;
  colors: Color[] | null;
  type: string;
}
const AddServiceModal = (props: AddServiceModalType) => {
  const showSnackbar = useSnackbar();
  const { loadingView } = userLoader();
  const [isLoading, setIsLoading] = useState(false);
  const [discountParamsDisable, setDiscountParamsDisable] = useState(true);
  const [showColors, setShowColors] = useState<number>(-1);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [discountedServices, setDiscountedServices] = useState<Service[]>([]);
  const [typeFilters, setTypeFilters] = useState<string[]>([]);
  const [service, setService] = useState({
    duration: "",
    price: "",
    age: "",
    percent: "",
  });
  const [selectedService, setSelectedService] = useState<number[]>([]);
  const [error, setError] = useState({
    duration: "",
    price: "",
    service: "",
    age: "",
    percent: "",
  });
  const Types = [
    {
      name: "Coloration",
      value: "coloration",
    },
    {
      name: "Discount",
      value: "discount",
    },
    {
      name: "Care",
      value: "care",
    },
    {
      name: "Special treatment",
      value: "special_treatment",
    },
    {
      name: "Men",
      value: "men",
    },
    {
      name: "Styling",
      value: "styling",
    },
  ];
  const onChangeDuration = (value: string) => {
    setService((prev) => {
      return { ...prev, duration: value };
    });
  };
  const onChangePrice = (value: string) => {
    setService((prev) => {
      return { ...prev, price: value };
    });
  };
  const onChangeAge = (value: string) => {
    setService((prev) => {
      return { ...prev, age: value };
    });
    if (Number(value) > 100) {
      setError((prev) => {
        return { ...prev, age: "Please enter between 1 - 100" };
      });
      return;
    } else {
      setError((prev) => {
        return { ...prev, age: "" };
      });
    }
  };
  const onChangePercent = (value: string) => {
    setService((prev) => {
      return { ...prev, percent: value };
    });
    if (Number(value) > 100) {
      setError((prev) => {
        return { ...prev, percent: "Please enter between 1 - 100" };
      });
      return;
    } else {
      setError((prev) => {
        return { ...prev, age: "" };
      });
    }
  };
  const selectService = (id: number) => {
    if (selectedService.includes(id)) {
      setSelectedService(selectedService.filter((item) => item !== id));
    } else {
      setSelectedService((pre) => [...pre, id]);
    }
  };
  const [search, setSearch] = useState<string>("");
  const onSubmit = async () => {
    if (selectedService?.length == 0) {
      setError((prev) => {
        return { ...prev, service: "Please select a service" };
      });
      return;
    } else {
      setError((prev) => {
        return { ...prev, service: "" };
      });
    }
    if (!service.duration) {
      setError((prev) => {
        return { ...prev, duration: "Duration is required" };
      });
      return;
    } else {
      setError((prev) => {
        return { ...prev, duration: "" };
      });
    }
    if (!service.price) {
      setError((prev) => {
        return { ...prev, price: "Price is required" };
      });
      return;
    } else {
      setError((prev) => {
        return { ...prev, price: "" };
      });
    }
    if (!discountParamsDisable && !service.age) {
      setError((prev) => {
        return { ...prev, age: "Age is required" };
      });
      return;
    } else {
      setError((prev) => {
        return { ...prev, age: "" };
      });
    }
    if (!discountParamsDisable && !service.percent) {
      setError((prev) => {
        return { ...prev, percent: "Percent is required" };
      });
      return;
    } else {
      setError((prev) => {
        return { ...prev, percent: "" };
      });
    }
    setIsLoading(true);
    let data: any = {};
    data.hair_salon_id = Number(getLocalStorage("salon_id"));
    data.service_ids = selectedService;
    data.price = service.price;
    data.duration = service.duration;
    if (!discountParamsDisable) {
      data.age = service.age;
      data.percent = service.percent;
    }
    await dashboard
      .addSalonServices(data)
      .then((res) => {
        setService({ price: "", duration: "", age: "", percent: "" });
        showSnackbar("success", "Salon Service added successfully.");
        props.fetchAllServices();
        setSelectedService([]);
      })
      .catch((err) => {
        showSnackbar("error", "Failed to add salon service");
      })
      .finally(() => {
        setIsLoading(false);
        props.setShowAddServiceModal(false);
      });
  };
  const fetchAllServices = () => {
    const salon_id = Number(getLocalStorage("salon_id"));
    setIsLoading(true);
    dashboard
      .getAllServices(salon_id)
      .then((res) => {
        setAllServices(res.data.data.all_services_without_salon_services);
        setDiscountedServices(
          res.data.data.all_services_without_salon_services.filter(
            (item: Service) => item.type === "discount"
          )
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchAllServices();
  }, []);

  const onClickTypeCheckbox = (item: string) => {
    if (typeFilters.includes(item)) {
      setTypeFilters(typeFilters.filter((filter) => filter !== item));
    } else {
      setTypeFilters((prev) => [...prev, item]);
    }
  };

  const getFilteredItems = () => {
    let list = allServices;
    let filteredServices: Service[] = [];
    if (search) {
      list = allServices.filter((service) =>
        service.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (typeFilters.length > 0) {
      list.forEach((service) => {
        typeFilters.forEach((filter) => {
          if (service.type === filter) {
            filteredServices.push(service);
          }
        });
      });
    }
    if (search && !(typeFilters.length > 0)) {
      setFilteredServices(list);
    } else {
      setFilteredServices(filteredServices);
    }
  };
  const showServices = () => {
    if (typeFilters.length > 0 || search !== "") {
      return filteredServices;
    } else {
      return allServices;
    }
  };
  useEffect(() => {
    let hasDiscountService = false;
    selectedService.map((service) => {
      discountedServices.map((item) => {
        if (service === item.id) {
          hasDiscountService = true;
        }
      });
    });
    setDiscountParamsDisable(!hasDiscountService);
  }, [selectedService]);
  useEffect(() => {
    getFilteredItems();
  }, [typeFilters, search]);

  return (
    <div className=" bg-white w-9/12 max-h-full rounded-xl px-5 pb-5">
      {isLoading && loadingView()}
      <div className="w-full flex items-center justify-end pt-2">
        <div
          className={`${Theme_A.button.crossButtonSmall}`}
          onClick={() => props.setShowAddServiceModal(false)}
        >
          <CrossIcon width="12" />
        </div>
      </div>
      <div className="flex gap-2 w-full items-baseline justify-center">
        <div className="relative flex items-center justify-center pb-5">
          <input
            type="text"
            className="max-w-[300px] text-sm py-2 px-4 outline-none rounded-full bg-white border border-[#EDEDED] shadow-[0px_11px_26px_0px_rgba(176,176,176,0.25)]"
            placeholder="Nom coiffure"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="relative">
            <div className={`absolute right-1 -top-4 cursor-pointer p-2 rounded-full ${ColorsThemeA.OhcGradient_A}`}>
              <SearcIcon />
            </div>
          </div>
        </div>
        <div className="relative group">
          <div
            className={
              typeFilters.length > 0
                ? "flex gap-4 rounded-full bg-stone-800 border border-[#EDEDED] p-1 text-sm text-white"
                : "flex gap-4 rounded-full bg-white border border-[#EDEDED] p-1 text-sm text-[#737373]"
            }
          >
            <div className="px-4 cursor-pointer">Type</div>
          </div>
          <div className="hidden group-hover:block absolute top-[30px] -left-20 md:left-0 bg-white z-10 text-sm text-[#737373] rounded-lg border min-w-[134px]">
            {Types.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex gap-2 px-4 py-2.5 opacity-70 hover:opacity-100 cursor-pointer"
                  onClick={() => onClickTypeCheckbox(item.value)}
                >
                  <div
                    className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5  ${typeFilters.includes(item.value)
                      ? `bg-gradient-to-b ${ColorsThemeA.OhcGradient_A}`
                      : "bg-[#D6D6D6]"
                      }`}
                  >
                    <CheckedIcon />
                  </div>
                  <div className="ml-2 w-24">{item.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className=" items-center justify-center">
        <div className="bg-white max-h-[250px] lg:max-h-[500px] shadow-inner dynamic-grid rounded-xl items-start">
          {showServices().map((item, index) => {
            return (
              <div key={index} className="flex items-center">
                <div
                  className={`flex flex-col justify-start gap-2 w-48 h-[170px] border border-stone-200 rounded-[21px] py-3 px-3 shadow-lg cursor-pointer ${Theme_A.behaviour.cardBehaviour}`}
                  onClick={() => selectService(item.id)}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-black font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[140px]">
                      {item.name}
                    </p>
                    <div
                      className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5  ${selectedService?.includes(item.id)
                        ? `bg-gradient-to-b ${ColorsThemeA.OhcGradient_A}`
                        : "bg-[#D6D6D6]"
                        }`}
                    >
                      <CheckedIcon />
                    </div>
                  </div>
                  {item.description && (
                    <p className="text-sm text-[#A0A0A0] mt-2 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  <div className="flex items-center  gap-2 mt-2">
                    <div
                      onMouseLeave={() => {
                        setShowColors(-1);
                      }}
                    >
                      {item.type === "coloration" && item.colors?.length && (
                        <div className="relative">
                          <div className=" relative flex justify-start w-full flex-col">
                            <p className="text-xs font-semibold text-black">
                              Color
                            </p>
                            <div
                              className="text-xs mt-1 py-1 px-2 border-2 border-gray-400 rounded-lg"
                              onMouseEnter={(e) => {
                                e.stopPropagation();
                                setShowColors(item.id);
                              }}
                            >
                              {item.colors[0].color}
                            </div>
                          </div>
                          {showColors === item.id && (
                            <div className="absolute top-12 z-50 max-h-[150px] overflow-auto bg-white rounded-lg p-1 border-2">
                              <div className="w-[90px] flex items-center justify-between rounded py-1 px-1.5 mt-1 overflow-hidden">
                                <p className="text-xs text-[#6F6F6F]">
                                  {item.colors.map((color, index) => {
                                    return (
                                      <p key={index} className="my-1">
                                        {color.color}.
                                      </p>
                                    );
                                  })}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-4 h-full items-start">
          <p className="text-sm text-[#A0A0A0]">
            Age et rabais ne sont applicable que pour les prestations de type remise (discount)
          </p>
          <div className="flex flex-col md:flex-row  gap-4 h-full items-center md:items-start justify-center w-full">
            <div className="flex flex-col gap-4 h-full items-start">
              <div className="max-w-[300px] w-[200px] relative">
                <input
                  type="number"
                  placeholder="Durée"
                  className="w-48 p-3 placeholder:text-[#959595] placeholder:text-base rounded-md shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)] outline-none"
                  value={service.duration}
                  onChange={(e) => onChangeDuration(e.target.value)}
                />
                {error.duration && (
                  <p className={`${Theme_A.checkers.errorText}`}>
                    {error.duration}*
                  </p>
                )}
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">min</span>
              </div>
              <div className="max-w-[300px] w-[200px] relative">
                <input
                  type="number"
                  placeholder="Prix"
                  className="w-48 p-3 placeholder:text-[#959595] placeholder:text-base rounded-md shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)] outline-none"
                  value={service.price}
                  onChange={(e) => onChangePrice(e.target.value)}
                />
                {error.price && (
                  <p className={`${Theme_A.checkers.errorText}`}>
                    {error.price}*
                  </p>
                )}
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">€</span>
              </div>

            </div>
            <div className="flex flex-col gap-4 h-full items-start">
              <div className="max-w-[300px] w-[200px] relative">
                <input
                  type="number"
                  placeholder="Age"
                  className={
                    discountParamsDisable
                      ? "w-full p-3 placeholder:text-[#959595] placeholder:text-base rounded-md shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)] outline-none bg-slate-200"
                      : "w-full p-3 placeholder:text-[#959595] placeholder:text-base rounded-md shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)] outline-none"
                  }
                  value={service.age}
                  maxLength={100}
                  disabled={discountParamsDisable}
                  onChange={(e) => onChangeAge(e.target.value)}
                />
                {error.age && (
                  <p className={`${Theme_A.checkers.errorText}`}>
                    {error.age}*
                  </p>
                )}
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">années</span>
              </div>
              <div className="max-w-[300px] w-[200px] relative">
                <input
                  type="number"
                  placeholder="Rabais"

                  className={
                    discountParamsDisable
                      ? "w-full p-3 placeholder:text-[#959595] placeholder:text-base rounded-md shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)] outline-none bg-slate-200"
                      : "w-full p-3 placeholder:text-[#959595] placeholder:text-base rounded-md shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)] outline-none"
                  }
                  value={service.percent}
                  maxLength={100}
                  disabled={discountParamsDisable}
                  onChange={(e) => onChangePercent(e.target.value)}
                />
                {error.percent && (
                  <p className={`${Theme_A.checkers.errorText}`}>
                    {error.percent}*
                  </p>
                )}
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2">€</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-4 items-center justify-center w-full">
            <button
              className={`${Theme_A.button.medWhiteColoredButton}`}
              onClick={() => props.setShowAddServiceModal(false)}
            >
              Annuler
            </button>
            <button
              // className="text-white font-medium text-base rounded-md py-2 px-4 bg-gradient-to-r from-primaryGradientFrom via-primaryGradientVia to-primaryGradientTo shadow-[0px_14px_24px_0px_rgba(255,125,60,0.25)]"
              className={`${Theme_A.button.mediumGradientButton}`}
              onClick={() => onSubmit()}
            >
              Ajouter prestations
            </button>
          </div>
          {error.service && (
            <p className={`${Theme_A.checkers.errorText}`}>
              {error.service}*
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddServiceModal;
