import { dashboard } from "@/api/dashboard";
import { getLocalStorage } from "@/api/storage";
import { CheckedIcon, CrossIcon, SearcIcon } from "@/components/utilis/Icons";
import useSnackbar from "@/hooks/useSnackbar";
import userLoader from "@/hooks/useLoader";
import React, { useEffect, useState } from "react";
interface AddServiceModalType {
  setShowAddServiceModal: (value: boolean) => void;
  fetchAllServices:()=>void;
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
  color: Color[];
}
const AddServiceModal = (props: AddServiceModalType) => {
  const showSnackbar = useSnackbar();
  const { loadingView } = userLoader();
  const [isLoading, setIsLoading] = useState(false);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [service, setService] = useState({
    duration: "",
    price: "",
  });
  const [selectedService, setSelectedService] = useState<number[]>([]);
  const [error, setError] = useState({
    duration: "",
    price: "",
    service: "",
  });
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
  const selectService = (id: number) => {
    if (selectedService.includes(id)) {
      setSelectedService(selectedService.filter((item) => item !== id));
    } else {
      setSelectedService((pre) => [...pre, id]);
    }
  };
  const [search, setSearch] = useState<string>();
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
    setIsLoading(true);
    let data: any = {};
    data.hair_salon_id = Number(getLocalStorage("salon_id"));
    data.service_ids = selectedService;
    data.price = service.price;
    data.duration = service.duration;
    await dashboard
      .addSalonServices(data)
      .then((res) => {
        setService({ price: "", duration: "" });
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
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchAllServices();
  }, []);
  const searchFilter = () => {
    if (search)
      setFilteredServices(
        allServices.filter((service) =>
          service.name.toLowerCase().includes(search.toLowerCase())
        )
      );
  };
  const showServices = () => {
    if (search) {
      return filteredServices;
    } else {
      return allServices;
    }
  };
  useEffect(() => {
    searchFilter();
  }, [search]);

  return (
    <div className="relative bg-white lg:min-w-[850px]  rounded-xl px-5 pb-5">
      {isLoading && loadingView()}
      <div className="w-full flex items-center justify-end pt-2">
        <div
          className="cursor-pointer my-2 py-1 px-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 shadow-[0px_14px_24px_0px_rgba(255,125,60,0.25)]"
          onClick={() => props.setShowAddServiceModal(false)}
        >
          <CrossIcon width="12" />
        </div>
      </div>
      <div className="relative flex items-center justify-center pb-5">
        <input
          type="text"
          className="min-w-[300px] text-sm py-2 px-4 outline-none rounded-full bg-white border border-[#EDEDED] shadow-[0px_11px_26px_0px_rgba(176,176,176,0.25)]"
          placeholder="Nom coiffure"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="relative">
          <div className="absolute right-1 -top-4 cursor-pointer p-2 rounded-full bg-gradient-to-b from-[#E93C64] to-[#F6A52E]">
            <SearcIcon />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-col items-center justify-center gap-4 ">
        <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 h-80 xl:max-h-[480px] lg:w-[610px] overflow-y-auto rounded-xl items-start">
          {showServices().map((item, index) => {
            return (
              <div key={index} className="flex items-center gap-3">
                <div
                  className="flex flex-col justify-around w-48 h-[170px] border border-grey rounded-[21px] py-3 px-3 shadow-[0px_4px_18px_0px_rgba(132,132,132,0.25)] cursor-pointer"
                  onClick={() => selectService(item.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-black font-medium">{item.name}</div>
                    <div
                      className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5  ${
                        selectedService?.includes(item.id)
                          ? "bg-gradient-to-b from-pink-500 to-orange-500"
                          : "bg-[#D6D6D6]"
                      }`}
                    >
                      <CheckedIcon />
                    </div>
                  </div>
                  {item.description && (
                    <p className="text-sm text-[#A0A0A0] mt-2 overflow-y-auto">
                      {item.description}
                    </p>
                  )}
                  <div className="flex items-center justify-center gap-2 mt-2">
                    {item.percent === "1" && (
                      <div>
                        <p className="text-sm font-medium text-black">Type</p>
                        <div className="w-[74px] flex items-center justify-between border border-[#CACACA] rounded py-1 px-1.5 mt-1">
                          <p className="text-xs text-[#6F6F6F]">Student</p>
                        </div>
                      </div>
                    )}
                    {item.color && (
                      <div>
                        <p className="text-sm font-medium text-black">Color</p>
                        <div className="w-[90px] flex items-center justify-between border border-[#CACACA] rounded py-1 px-1.5 mt-1 overflow-hidden">
                          <p className="text-xs text-[#6F6F6F]">
                            {item.color.map((color,index) => {
                              return `${color.color}${index+1 === item.color.length ? '' : ' ,'}`;
                            })}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-4 h-full items-start">
          <div className="max-w-[450px] w-[350px]">
            <input
              type="number"
              placeholder="Durée"
              className="w-full p-3 placeholder:text-[#959595] placeholder:text-base rounded-md shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)] outline-none"
              value={service.duration}
              onChange={(e) => onChangeDuration(e.target.value)}
            />
            {error.duration && (
              <p className="text-xs text-red-700 ml-3 mt-1">
                {error.duration}*
              </p>
            )}
          </div>
          <div className="max-w-[450px] w-[350px]">
            <input
              type="number"
              placeholder="Prix"
              className="w-full p-3 placeholder:text-[#959595] placeholder:text-base rounded-md shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)] outline-none"
              value={service.price}
              onChange={(e) => onChangePrice(e.target.value)}
            />
            {error.price && (
              <p className="text-xs text-red-700 ml-3 mt-1">{error.price}*</p>
            )}
            <div className="mt-4 flex gap-4 items-center justify-center">
              <button
                className="text-white font-medium text-lg rounded-md py-2 px-4 bg-gradient-to-r from-primaryGradientFrom via-primaryGradientVia to-primaryGradientTo shadow-[0px_14px_24px_0px_rgba(255,125,60,0.25)]"
                onClick={() => props.setShowAddServiceModal(false)}
              >
                Cancel
              </button>
              <button
                className="text-white font-medium text-lg rounded-md py-2 px-4 bg-gradient-to-r from-primaryGradientFrom via-primaryGradientVia to-primaryGradientTo shadow-[0px_14px_24px_0px_rgba(255,125,60,0.25)]"
                onClick={() => onSubmit()}
              >
                Add Service
              </button>
            </div>
            {error.service && (
              <p className="text-xs text-red-700 ml-20 mt-1 text-center">
                {error.service}*
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddServiceModal;
