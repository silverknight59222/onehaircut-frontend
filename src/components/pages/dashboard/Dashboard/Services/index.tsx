import React, { useEffect, useState } from "react";
import "./index.css";
import userLoader from "@/hooks/useLoader";
import BaseMultiSelectbox from "@/components/UI/BaseMultiSelectbox";
import { CheckedIcon, DownArrow, EditIcon, LogoCircleFixLeft } from "@/components/utilis/Icons";
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
  const [isDropdownGroup, setIsDropdownGroup] = useState(false);
  const [isDropdownSort, setIsDropdownSort] = useState(false);
  const [filteredServices, setFilteredServices] = useState<SalonService[]>([]);
  const [sortingFilter, setSortingFilter] = useState<string>('');
  const [groupFilter, setGroupFilter] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [showEditServiceModal, setShowEditServiceModal] = useState(false);
  const [editServiceInfo, setEditServiceInfo] = useState<SalonService>();
  const sortingRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const groupRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;

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

  const onSortingFilter = (filter: string) => {
    if (sortingFilter === filter) {
      setSortingFilter('');
    }
    else {
      setSortingFilter(filter);
    }
  }

  const onServiceGroupFitler = (filter: string) => {
    if (groupFilter === filter) {
      setGroupFilter('');
    }
    else {
      setGroupFilter(filter);
    }
  }

  const fetchAllServices = () => {
    const salon_id = Number(getLocalStorage("salon_id"));
    setIsLoading(true);
    dashboard
      .getAllSalonServices(salon_id)
      .then((res) => {
        let list = res.data.data.filter((item) => item.type !== 'discount')
        setAllServices(list);
        setFilteredServices(list);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    /* Create a deep copy of the array as the sort function does in array sorting */
    const copyArray = JSON.parse(JSON.stringify(allServices)) as typeof allServices;
    if (sortingFilter === 'Nom ( A à Z )') {
      copyArray?.sort((a, b) => (a.service.name.toLowerCase() > b.service.name.toLowerCase() ? 1 : -1))
    }
    if (sortingFilter === 'Nom ( Z à A )') {
      copyArray?.sort((a, b) => (a.service.name.toLowerCase() > b.service.name.toLowerCase() ? -1 : 1))
    }

    if (sortingFilter === 'Prix ( Croissant )') {
      copyArray?.sort((a, b) => (Number(a.price) > Number(b.price) ? 1 : -1))
    }
    if (sortingFilter === 'Prix ( Décroissant )') {
      copyArray?.sort((a, b) => (Number(a.price) > Number(b.price) ? -1 : 1))
    }

    if (sortingFilter === 'Durée ( Croissante )') {
      copyArray?.sort((a, b) => (Number(a.duration) > Number(b.duration) ? 1 : -1))
    }
    if (sortingFilter === 'Durée ( Décroissante )') {
      copyArray?.sort((a, b) => (Number(a.duration) > Number(b.duration) ? -1 : 1))
    }

    if (sortingFilter !== '') {
      setFilteredServices(copyArray);
    } else {
      fetchAllServices();
    }
  }, [sortingFilter])

  useEffect(() => {
    let list: SalonService[] = [];
    if (groupFilter === 'Coloration') {
      list = allServices?.filter(service => service.service.type === 'coloration')
    }
    if (groupFilter === 'Discount') {
      list = allServices?.filter(service => service.service.type === 'discount')
    }

    if (groupFilter === 'Care') {
      list = allServices?.filter(service => service.service.type === 'care')
    }
    if (groupFilter === 'Special Treatment') {
      list = allServices?.filter(service => service.service.type === 'special_treatment')
    }

    if (groupFilter === 'Men') {
      list = allServices?.filter(service => service.service.type === 'men')
    }
    if (groupFilter === 'Styling') {
      list = allServices?.filter(service => service.service.type === 'styling')
    }
    if (groupFilter !== '') {
      setFilteredServices(list);
    } else {
      setFilteredServices(allServices);
    }
  }, [groupFilter])


  const closeSelectBox = ({ target }: MouseEvent): void => {
    if (!sortingRef.current?.contains(target as Node)) {
      setIsDropdownSort(false);
    }
    if (!groupRef.current?.contains(target as Node)) {
      setIsDropdownGroup(false);
    }
  };

  useEffect(() => {
    fetchAllServices();
    document.addEventListener("click", closeSelectBox);

    return () => {
      document.removeEventListener("click", closeSelectBox);
    };
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


      <div className="flex flex-col md:flex-row w-full  gap-3 my-3 md:my-7 z-0 items-center md:justify-around">
        {/* Section des filtres de tri pour les services */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-start">
          {/* Composant de liste déroulante pour le tri par nom */}
          <div ref={sortingRef} className="relative w-52">
            <button onClick={() => setIsDropdownSort(!isDropdownSort)} className={sortingFilter !== '' ? "flex items-center justify-center gap-8 font-medium rounded-xl h-[52px] pl-3 pr-4 bg-stone-800 text-white shadow-[0px_15px_18px_0px_rgba(0, 0, 0, 0.14)]" : "flex items-center justify-center gap-8 bg-[#F7F7F7] font-medium rounded-xl h-[52px] pl-3 pr-4 shadow-[0px_15px_18px_0px_rgba(0, 0, 0, 0.14)]"}>
              Trier par nom
              <DownArrow color={sortingFilter !== '' ? 'white' : '#000'} />
            </button>
            {isDropdownSort && (
              <div className="mt-2 absolute rounded-xl border border-checkbox bg-white p-6 z-20">
                {sortDropdown.map((item, index) => {
                  return (
                    <div key={index} onClick={() => onSortingFilter(item.name)} className="flex cursor-pointer mb-[19px]">
                      <div className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5  ${sortingFilter === item.name ? ColorsThemeA.OhcGradient_A : "bg-[#D6D6D6]"}`}>
                        <CheckedIcon />
                      </div>
                      <p className="ml-2">
                        {item.name}
                      </p>
                    </div>)
                })}

              </div>
            )}
          </div>
          {/* Composant de liste déroulante pour le tri par groupe/type */}
          <div ref={groupRef} className="relative w-52">
            <button onClick={() => setIsDropdownGroup(!isDropdownGroup)} className={groupFilter !== '' ? "flex items-center justify-center gap-8 font-medium rounded-xl h-[52px] pl-3 pr-4 bg-stone-800 text-white shadow-[0px_15px_18px_0px_rgba(0, 0, 0, 0.14)]" : "flex items-center justify-center gap-8 bg-[#F7F7F7] font-medium rounded-xl h-[52px] pl-3 pr-4 shadow-[0px_15px_18px_0px_rgba(0, 0, 0, 0.14)]"}>
              Filtrer par group
              <DownArrow color={groupFilter !== '' ? 'white' : '#000'} />
            </button>
            {isDropdownGroup && (
              <div className="mt-2 absolute rounded-xl border border-checkbox bg-white p-6 z-20">
                {typeDropdown.map((item, index) => {
                  return (
                    <div key={index} onClick={() => onServiceGroupFitler(item.name)} className="flex cursor-pointer mb-[19px]">
                      <div className={`flex justify-center items-center bg-checkbox rounded-[4px] w-5 h-5  ${groupFilter === item.name ? ColorsThemeA.OhcGradient_A : "bg-[#D6D6D6]"}`}>
                        <CheckedIcon />
                      </div>
                      <p className="ml-2">
                        {item.name}
                      </p>
                    </div>)
                })}

              </div>
            )}
          </div>
        </div>
        {/* Bouton pour ouvrir le modal d'ajout d'un nouveau service */}
        <div
          className={`${Theme_A.button.bigGradientButton} cursor-pointer w-max`}
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

      <div className="flex items-center justify-center ">
        {/* Grille pour afficher les services */}
        <div className="gap-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mb-20">
          {/* Boucle pour cartographier et afficher chaque service */}
          {filteredServices.map((item, index) => {
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
                      <div className="fixed top-0 left-0 overflow-hidden bg-black bg-opacity-20 flex items-center justify-center w-full h-full z-50">
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