import { dashboard } from "@/api/dashboard";
import { getLocalStorage } from "@/api/storage";
import { CrossIcon } from "@/components/utilis/Icons";
import useSnackbar from "@/hooks/useSnackbar";
import userLoader from "@/hooks/useLoader";
import React, { useState } from "react";
import { SalonService } from "./index";
interface EditServiceModalType {
  setShowEditServiceModal: (value: boolean) => void;
  service: SalonService;
  fetchAllServices:()=>void;
}
interface Color {
  id: number;
  name: string;
}
export interface Service {
  id: number;
  name: string;
  description: string;
  percent: string;
  color: Color[];
}
const EditServiceModal = (props: EditServiceModalType) => {
  const showSnackbar = useSnackbar();
  const { loadingView } = userLoader();
  const [isLoading, setIsLoading] = useState(false);
  const [service, setService] = useState({
    duration: props.service.duration,
    price: props.service.price,
    age: props.service.age,
    percent: props.service.percent,
  });
  const [error, setError] = useState({
    duration: "",
    price: "",
    service: "",
       age: "",
    percent: "",
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
        return { ...prev, percent: "" };
      });
    }
  };
  const onSubmit = async () => {
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
    if (props.service.age && !service.age) {
      setError((prev) => {
        return { ...prev, age: "Age is required" };
      });
      return;
    } else {
      setError((prev) => {
        return { ...prev, age: "" };
      });
    }
    if (props.service.percent && !service.percent) {
      setError((prev) => {
        return { ...prev, percent: "Percent is required" };
      });
      return;
    } else {
      setError((prev) => {
        return { ...prev, age: "" };
      });
    }
    setIsLoading(true);
    let data: any = {};
    data.hair_salon_id = Number(getLocalStorage("salon_id"));
    data.service_id = props.service.services_id;
    data.price = service.price;
    data.duration = service.duration;
     if (props.service.age && props.service.percent) {
      data.age = service.age;
      data.percent = service.percent;
    }
    await dashboard
      .updateSalonServices(props.service.id, data)
      .then((res) => {
        props.fetchAllServices();
        showSnackbar("success", "Salon Service updated successfully.");
      })
      .catch((err) => {
        showSnackbar("error", "Failed to update salon service");
      })
      .finally(() => {
        setIsLoading(false);
        props.setShowEditServiceModal(false);
      });
  };
  const deleteService = async () => {
    await dashboard
      .deleteSalonServices(props.service.id)
      .then((res) => {
        props.fetchAllServices();
        showSnackbar("success", "Salon Service deleted successfully.");
      })
      .catch((err) => {
        showSnackbar("error", "Failed to delete salon service");
      })
      .finally(() => {
        setIsLoading(false);
        props.setShowEditServiceModal(false);
      });
  }
  return (
    <div className="relative bg-white rounded-xl px-5 pb-5">
      {isLoading && loadingView()}
      <div className="w-full flex items-center justify-end pt-2">
        <div
          className="cursor-pointer my-2 py-1 px-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 shadow-[0px_14px_24px_0px_rgba(255,125,60,0.25)]"
          onClick={() => props.setShowEditServiceModal(false)}
        >
          <CrossIcon width="12" />
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-4 h-full items-start">
          <div className="mb-2 max-w-[300px] max-h-[150px] overflow-auto px-2">
            <div className="text-base font-semibold">{props.service.service.name}</div>
            <div className="text-sm text-[#737373]">{props.service.service.description}</div>
          </div>
          <div  className="flex gap-4 items-center justify-center w-full">
          <div className="flex flex-col gap-4 items-center">
          <div className={(props.service.age && props.service.percent) ? "max-w-[300px] w-[150px]": "max-w-[300px] w-[350px]"}>
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
          <div className={(props.service.age && props.service.percent) ? "max-w-[300px] w-[150px]": "max-w-[300px] w-[350px]"}>
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
          </div>
          </div>
          {(props.service.age && props.service.percent) && (<div className="flex flex-col gap-4 items-center">
          <div className="max-w-[300px] w-[150px]">
            <input
              type="number"
              placeholder="Age"
              className="w-full p-3 placeholder:text-[#959595] placeholder:text-base rounded-md shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)] outline-none"
              value={service.age}
              onChange={(e) => onChangeAge(e.target.value)}
            />
            {error.age && (
              <p className="text-xs text-red-700 ml-3 mt-1">{error.age}*</p>
            )}
          </div>
          <div className="max-w-[300px] w-[150px]">
            <input
              type="number"
              placeholder="Percent"
              className="w-full p-3 placeholder:text-[#959595] placeholder:text-base rounded-md shadow-[0px_4px_23px_0px_rgba(193,193,193,0.25)] outline-none"
              value={service.percent}
              onChange={(e) => onChangePercent(e.target.value)}
            />
            {error.percent && (
              <p className="text-xs text-red-700 ml-3 mt-1">{error.percent}*</p>
            )}
          </div>
          </div>)}
          </div>
            <div className="mt-4 flex gap-4 items-center justify-center w-full">
              <button
                className="text-white font-medium text-lg rounded-md py-2 px-4 bg-gradient-to-r from-primaryGradientFrom via-primaryGradientVia to-primaryGradientTo shadow-[0px_14px_24px_0px_rgba(255,125,60,0.25)]"
                onClick={() => props.setShowEditServiceModal(false)}
              >
                Cancel
              </button>
              <button
                className="text-white font-medium text-lg rounded-md py-2 px-4 bg-gradient-to-r from-primaryGradientFrom via-primaryGradientVia to-primaryGradientTo shadow-[0px_14px_24px_0px_rgba(255,125,60,0.25)]"
                onClick={() => deleteService()}
              >
                Delete
              </button>
              <button
                className="text-white font-medium text-lg rounded-md py-2 px-4 bg-gradient-to-r from-primaryGradientFrom via-primaryGradientVia to-primaryGradientTo shadow-[0px_14px_24px_0px_rgba(255,125,60,0.25)]"
                onClick={() => onSubmit()}
              >
                Update
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EditServiceModal;
