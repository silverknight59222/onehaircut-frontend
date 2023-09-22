import React, { useEffect, useState } from "react";
import "./index.css";
import userLoader from "@/hooks/useLoader";
import BaseMultiSelectbox from "@/components/UI/BaseMultiSelectbox";
import { EditIcon, LogoCircle } from "@/components/utilis/Icons";
import { dashboard } from "@/api/dashboard";
import { getLocalStorage } from "@/api/storage";
import AddServiceModal, { Service } from "./addServiceModal";
import EditServiceModal from "./editServiceModal";
import { Theme_A, ColorsThemeA } from "@/components/utilis/Themes";
import ScrollToTopButton from "@/components/utilis/Helper";
export interface SalonService {
  id: number;
  services_id: number;
  price: string;
  duration: string;
  service: Service;
  age: string;
  percent: string;
}
const Services = () => {
  const { loadingView } = userLoader();
  const [allServices, setAllServices] = useState<SalonService[]>([]);
  const [filteredServices, setFilteredServices] = useState<SalonService[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [showEditServiceModal, setShowEditServiceModal] = useState(false);
  const [editServiceInfo, setEditServiceInfo] = useState<SalonService>();
  const sortDropdown = [
    {
      name: "Nom ( A à Z )",
    },
    {
      name: "Nom ( Z à A )",
    },
    {
      name: "Prix ( Croissant )",
    },
    {
      name: "Prix ( Décroissant )",
    },
    {
      name: "Durée ( Croissante )",
    },
    {
      name: "Durée ( Décroissante )",
    },
  ];
  const typeDropdown = [
    {
      name: "Coloration",
      // value: "coloration",
    },
    {
      name: "Discount",
      // value: "discount",
    },
    {
      name: "Care",
      // value: "care",
    },
    {
      name: "Special treatment",
      // value: "special_treatment",
    },
    {
      name: "Men",
      // value: "men",
    },
    {
      name: "Styling",
      // value: "styling",
    },
  ];

  const getActiveFilters = (filter: string) => {
    let list: SalonService[] = [];
    if (filter === 'Nom ( A à Z )') {
      list = allServices?.sort((a, b) => (a.service.name.toLowerCase() > b.service.name.toLowerCase() ? 1 : -1))
    }
    if (filter === 'Nom ( Z à A )') {
      list = allServices?.sort((a, b) => (a.service.name.toLowerCase() > b.service.name.toLowerCase() ? -1 : 1))
    }

    if (filter === 'Prix ( Croissant )') {
      list = allServices?.sort((a, b) => (Number(a.price) > Number(b.price) ? 1 : -1))
    }
    if (filter === 'Prix ( Décroissant )') {
      list = allServices?.sort((a, b) => (Number(a.price) > Number(b.price) ? -1 : 1))
    }

    if (filter === 'Durée ( Croissante )') {
      list = allServices?.sort((a, b) => (Number(a.price) > Number(b.price) ? 1 : -1))
    }
    if (filter === 'Durée ( Décroissante )') {
      list = allServices?.sort((a, b) => (Number(a.price) > Number(b.price) ? -1 : 1))
    }
    if (filter) {
      setFilteredServices(list);
    } else {
      setFilteredServices([]);
      fetchAllServices();
    }
  }

  const getActiveTypeFilter = (filter: string) => {
    let list: SalonService[] = [];
    if (filter === 'Coloration') {
      list = allServices?.filter(service => service.service.type === 'coloration')
    }
    if (filter === 'Discount') {
      list = allServices?.filter(service => service.service.type === 'discount')
    }

    if (filter === 'Care') {
      list = allServices?.filter(service => service.service.type === 'care')
    }
    if (filter === 'Special Treatment') {
      list = allServices?.filter(service => service.service.type === 'special_treatment')
    }

    if (filter === 'Men') {
      list = allServices?.filter(service => service.service.type === 'men')
    }
    if (filter === 'Styling') {
      list = allServices?.filter(service => service.service.type === 'styling')
    }
    if (filter.length) {
      setFilteredServices(list);
    } else {
      setFilteredServices([]);
      fetchAllServices();
    }
  }

  const fetchAllServices = () => {
    const salon_id = Number(getLocalStorage("salon_id"));
    setIsLoading(true);
    dashboard
      .getAllSalonServices(salon_id)
      .then((res) => {
        setAllServices(res.data.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const getServices = () => {
    if (filteredServices.length) {
      return filteredServices;
    } else {
      return allServices;
    }
  }
  useEffect(() => {
    fetchAllServices();
  }, []);

  return (
    <div>
      {isLoading && loadingView()}
      <p className="text-4xl font-medium text-center">
        Ajoutez vos{" "}
        <span className={`${ColorsThemeA.textGradient_Title}`}>prestations !</span>
      </p>
      <div className="flex w-full items-center justify-between ">
        <div className="flex gap-4 my-7">
          <BaseMultiSelectbox dropdownItems={sortDropdown} dropdownTitle='Trier par : Nom' getActiveFilters={getActiveFilters} />
          <BaseMultiSelectbox dropdownItems={typeDropdown} dropdownTitle='Trier par : Group' getActiveFilters={getActiveTypeFilter} />
        </div>
        <div
          // className={`text-2xl cursor-pointer flex items-center text-white px-20 py-1 gap-4 rounded-md ${ColorsThemeA.OhcGradient_A} shadow-[0px_14px_24px_0px_rgba(255,125,60,0.25)]`}
          className={`${Theme_A.button.addServicesButton}`}
          onClick={() => setShowAddServiceModal(true)}
        >
          Ajouter un service
        </div>
      </div>
      {showAddServiceModal && (
        <div className="fixed top-0 left-0 overflow-hidden bg-black bg-opacity-40 flex  items-center justify-center w-full h-full z-50">
          <AddServiceModal setShowAddServiceModal={setShowAddServiceModal} fetchAllServices={fetchAllServices} />
        </div>
      )}
      <div className="flex items-center justify-center">
        <div className="gap-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 z-10">
          {getServices().map((item, index) => {
            return (
              <div key={index} className="flex items-center gap-9">
                <div className="w-64 bg-white  border border-grey rounded-[21px] py-6 px-5 shadow-[0px_4px_18px_0px_rgba(132,132,132,0.25)]">
                  <div className="flex items-center justify-between">
                    <div className="text-black font-medium">
                      {item.service ? item.service.name : '-'}
                    </div>
                    <div
                      className={`${Theme_A.servicesCards.modifyButton}`}
                      onClick={() => { setShowEditServiceModal(true); setEditServiceInfo(item) }}
                    >
                      <EditIcon />
                    </div>
                    {(showEditServiceModal && editServiceInfo) && (
                      <div className="fixed top-0 left-0 overflow-hidden bg-grey bg-opacity-50 flex items-center justify-center w-full h-full z-50">
                        <EditServiceModal
                          setShowEditServiceModal={setShowEditServiceModal}
                          fetchAllServices={fetchAllServices}
                          service={editServiceInfo}
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 mt-2 line-clamp-2 overflow-hidden h-auto">
                    {item.service ? item.service.description : '-'}
                  </p>
                  <div className="flex items-center gap-6 mt-5">
                    <div>
                      <p className="text-sm font-medium text-black">Durée</p>
                      <div className="w-[74px] flex items-center justify-between border border-[#CACACA] rounded py-1 px-1.5">
                        <p className="text-xs text-[#6F6F6F]">
                          {item.duration} min
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black">Prix</p>
                      <div className="w-[74px] flex items-center justify-between border border-[#CACACA] rounded py-1 px-1.5">
                        <p className="text-xs text-[#6F6F6F]">$ {item.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div></div>
      </div>
      <div className="bg-gradient-to-l  md:block fixed -left-32 md:-left-8 -bottom-32 md:-bottom-8 z-0">
        <LogoCircle />
      </div>
      <ScrollToTopButton/>
    </div>

  );
};

export default Services;
