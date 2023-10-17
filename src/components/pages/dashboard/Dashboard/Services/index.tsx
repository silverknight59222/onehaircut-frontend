import React, { useEffect, useState } from "react";
import "./index.css";
import userLoader from "@/hooks/useLoader";
import BaseMultiSelectbox from "@/components/UI/BaseMultiSelectbox";
import { EditIcon, LogoCircleFixLeft } from "@/components/utilis/Icons";
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
  const [sortingFilter, setSortingFilter] = useState<string>('');
  const [groupFilter, setGroupFilter] = useState<string>('');
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
    },
    {
      name: "Discount",
    },
    {
      name: "Care",
    },
    {
      name: "Special treatment",
    },
    {
      name: "Men",
    },
    {
      name: "Styling",
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
      setSortingFilter('');
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
      setGroupFilter('');
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
    if (groupFilter || sortingFilter) {
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
      {/* Vérification et affichage de l'animation de chargement si le chargement est en cours */}
      {isLoading && loadingView()}

      {/* Titre de la page ou section */}
      <p className="text-4xl font-medium text-center">
        Ajoutez vos{" "}
        <span className={`${ColorsThemeA.textGradient_Title}`}>prestations !</span>
      </p>

      <div className="flex w-full items-center justify-between ">
        {/* Section des filtres de tri pour les services */}
        <div className="flex gap-4 my-7 z-0 ">
          {/* Composant de liste déroulante pour le tri par nom */}
          <BaseMultiSelectbox dropdownItems={sortDropdown} dropdownTitle='Trier par nom' getActiveFilters={getActiveFilters} />
          {/* Composant de liste déroulante pour le tri par groupe/type */}
          {/* TODO Group filter not working */}
          <BaseMultiSelectbox dropdownItems={typeDropdown} dropdownTitle='Trier par groupe' getActiveFilters={getActiveTypeFilter} />
        </div>

        {/* Bouton pour ouvrir le modal d'ajout d'un nouveau service */}
        <div
          className={`${Theme_A.button.bigGradientButton} cursor-pointer `}
          onClick={() => setShowAddServiceModal(true)}
        >
          Ajouter un service
        </div>
      </div>

      {/* Modal pour l'ajout d'un nouveau service, s'affiche si showAddServiceModal est vrai */}
      {showAddServiceModal && (
        <div className="fixed top-0 left-0 overflow-hidden bg-black bg-opacity-40 flex  items-center justify-center w-full h-full z-50 ">
          <AddServiceModal setShowAddServiceModal={setShowAddServiceModal} fetchAllServices={fetchAllServices} />
        </div>
      )}

      <div className="flex items-center justify-center">
        {/* Grille pour afficher les services */}
        <div className="gap-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {/* Boucle pour cartographier et afficher chaque service */}
          {getServices().map((item, index) => {
            return (
              <div key={index} className="flex items-center gap-9">
                <div className="w-64 bg-white border border-grey rounded-xl py-6 px-5 shadow-md">
                  <div className="flex items-center justify-between">
                    {/* Nom du service */}
                    <div className="text-black font-medium">
                      {item.service ? item.service.name : '-'}
                    </div>
                    {/* Bouton pour ouvrir le modal de modification du service */}
                    <div
                      className={`${Theme_A.servicesCards.modifyButton} shadow-md  transition-transform duration-300 transform hover:scale-125`}
                      onClick={() => { setShowEditServiceModal(true); setEditServiceInfo(item) }}
                    >
                      <EditIcon />
                    </div>
                    {/* Modal pour l'édition du service, s'affiche si showEditServiceModal et editServiceInfo sont définis */}
                    {(showEditServiceModal && editServiceInfo) && (
                      <div className="fixed top-0 left-0 overflow-hidden bg-black bg-opacity-50 flex items-center justify-center w-full h-full z-50">
                        <EditServiceModal
                          setShowEditServiceModal={setShowEditServiceModal}
                          fetchAllServices={fetchAllServices}
                          service={editServiceInfo}
                        />
                      </div>
                    )}
                  </div>
                  {/* Description du service */}
                  <p className="text-sm text-gray-700 mt-2 line-clamp-2 overflow-hidden h-auto">
                    {item.service ? item.service.description : '-'}
                  </p>
                  <div className="flex items-center gap-6 mt-5">
                    {/* Durée du service */}
                    <div>
                      <p className="text-sm font-medium text-black">Durée</p>
                      <div className="w-[74px] flex items-center justify-between border border-[#CACACA] rounded py-1 px-1.5">
                        <p className="text-xs text-[#6F6F6F]">
                          {item.duration} min
                        </p>
                      </div>
                    </div>
                    {/* Prix du service */}
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
      </div>

      {/* Logo/Élément de décoration en bas à gauche */}
      <div className="bg-gradient-to-l  md:block fixed -left-32 md:-left-8 -bottom-32 md:-bottom-8 -z-10">
        <LogoCircleFixLeft />
      </div>

      {/* Bouton pour remonter en haut de la page */}
      <ScrollToTopButton />
    </div>
  );
}

export default Services;