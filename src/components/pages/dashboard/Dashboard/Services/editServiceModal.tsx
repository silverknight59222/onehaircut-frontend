import { dashboard } from "@/api/dashboard";
import { getLocalStorage } from "@/api/storage";
import { CrossIcon } from "@/components/utilis/Icons";
import useSnackbar from "@/hooks/useSnackbar";
import userLoader from "@/hooks/useLoader";
import React, { useState } from "react";
import { SalonService } from "./index";
import { Theme_A } from "@/components/utilis/Themes";
interface EditServiceModalType {
  setShowEditServiceModal: (value: boolean) => void;
  service: SalonService;
  fetchAllServices: () => void;
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
  const [showColors, setShowColors] = useState<number>(-1);
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
        return { ...prev, duration: "Durée requise" };
      });
      return;
    } else {
      setError((prev) => {
        return { ...prev, duration: "" };
      });
    }
    if (!service.price) {
      setError((prev) => {
        return { ...prev, price: "Prix requis" };
      });
      return;
    } else {
      setError((prev) => {
        return { ...prev, price: "" };
      });
    }
    if (props.service.age && !service.age) {
      setError((prev) => {
        return { ...prev, age: "Age requis" };
      });
      return;
    } else {
      setError((prev) => {
        return { ...prev, age: "" };
      });
    }
    if (props.service.percent && !service.percent) {
      setError((prev) => {
        return { ...prev, percent: "Pourcentage requis" };
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
        showSnackbar("success", "Prestation actualisée");
      })
      .catch((err) => {
        showSnackbar("error", "Actualisation de préstation");
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
        showSnackbar("success", "Prestation supprimée");
      })
      .catch((err) => {
        showSnackbar("error", "Echec de suppression");
      })
      .finally(() => {
        setIsLoading(false);
        props.setShowEditServiceModal(false);
      });
  };
  return (
    <div className="relative bg-white rounded-xl px-5 pb-5">
      {isLoading && loadingView()}
      <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
        <div
          className={`${Theme_A.button.crossButtonSmall} shadow-md hover:scale-90`}
          onClick={() => props.setShowEditServiceModal(false)}
        >
          <CrossIcon width="18" height="26" />
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-4 h-full items-start">
          <div className="mb-2 max-w-[300px] max-h-[150px] overflow-auto px-2">
            <div className="text-base font-semibold mt-4">
              {props.service.service.name}
            </div>
            <div className="text-sm text-[#737373]">
              {props.service.service.description}
            </div>
          </div>
          <div
            onMouseLeave={() => {
              // setShowColors(-1);
            }}
          >
            Available Soon
            {props.service.service.colors?.length && (
              <div className="relative pl-2">
                <div className=" relative flex justify-start w-full flex-col">
                  <p className="text-xs font-semibold text-black">Color</p>
                  <div
                    className="text-xs mt-1 py-1 px-2 border-2 border-gray-400 rounded-lg"
                    onMouseEnter={(e) => {
                      e.stopPropagation();
                      // setShowColors(props.service.service.id);
                    }}
                  >
                    {props.service.service.colors[0].color}
                  </div>
                </div>
                {showColors === props.service.service.id && (
                  <div className="absolute top-12 z-50 max-h-[150px] overflow-auto bg-white rounded-lg p-1 border-2">
                    <div className="w-[90px] flex items-center justify-between rounded py-1 px-1.5 mt-1 overflow-hidden">
                      <p className="text-xs text-[#6F6F6F]">
                        {props.service.service.colors.map((color, index) => {
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
          <div className="flex gap-4 items-center justify-center w-full">
            <div className="flex flex-col gap-4 items-center">
              <div
                className={
                  props.service.age && props.service.percent
                    ? "max-w-[300px] w-[150px] relative"
                    : "max-w-[300px] w-[350px] relative"
                }
              >
                <input
                  type="number"
                  placeholder="Durée"
                  className={`w-full px-3 py-4 ${Theme_A.fields.configurationField2}`}
                  value={service.duration}
                  onChange={(e) => onChangeDuration(e.target.value)}
                />
                {error.duration && (
                  <p className="text-xs text-red-700 ml-3 mt-1">
                    {error.duration}*
                  </p>
                )}
                <span className="text-gray-500 text-sm absolute right-3 top-1/2 transform -translate-y-1/2">Durée(min)</span>
              </div>
              <div
                className={
                  props.service.age && props.service.percent
                    ? "max-w-[300px] w-[150px] relative"
                    : "max-w-[300px] w-[350px] relative"
                }
              >
                <input
                  type="number"
                  placeholder="Prix"
                  className={`w-full px-3 py-4 ${Theme_A.fields.configurationField2}`}
                  value={service.price}
                  onChange={(e) => onChangePrice(e.target.value)}
                />
                {error.price && (
                  <p className="text-xs text-red-700 ml-3 mt-1">
                    {error.price}*
                  </p>
                )}
                <span className="text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2">Prix(€)</span>
              </div>

            </div>
            {props.service.age && props.service.percent && (
              <div className="flex flex-col gap-4 items-center">
                <div className="max-w-[300px] w-[150px] relative">
                  <input
                    type="number"
                    placeholder="Age"
                    className={`w-full p-3 placeholder:text-[#959595] text-sm  placeholder:text-base rounded-md shadow-inner outline-none bg-stone-100 ${Theme_A.behaviour.fieldFocused_C}`}
                    value={service.age}
                    onChange={(e) => onChangeAge(e.target.value)}
                  />
                  {error.age && (
                    <p className="text-xs text-red-700 ml-3 mt-1">
                      {error.age}*
                    </p>
                  )}
                  <span className="text-gray-500  absolute right-3 top-1/2 transform -translate-y-1/2">Age(années)</span>
                </div>
                <div className="max-w-[300px] w-[150px] relative">
                  <input
                    type="number"
                    placeholder="Percent"
                    className={`w-full p-3 placeholder:text-[#959595] text-sm placeholder:text-base rounded-md shadow-inner outline-none bg-stone-100 ${Theme_A.behaviour.fieldFocused_C}`}
                    value={service.percent}
                    onChange={(e) => onChangePercent(e.target.value)}
                  />
                  {error.percent && (
                    <p className="text-xs text-red-700 ml-3 mt-1">
                      {error.percent}*
                    </p>
                  )}
                  <span className="text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2">Rabais(%)</span>
                </div>
              </div>
            )}
          </div>
          <div className="mt-4 flex gap-4 items-center justify-center w-full">
            <button
              className={`${Theme_A.button.medWhiteColoredButton} text-md`}
              onClick={() => props.setShowEditServiceModal(false)}
            >
              Annuler
            </button>
            <button
              className={`${Theme_A.button.medBlackColoredButton}`}
              onClick={() => deleteService()}
            >
              Supprimer
            </button>
            <button
              className={`${Theme_A.button.mediumGradientButton}`}
              onClick={() => onSubmit()}
            >
              Actualiser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditServiceModal;
