"use client";
import Navbar from '@/components/shared/Navbar'
import React, { useEffect, useState } from 'react'
import '../dashboard/Dashboard/Services/index.css'
import { BackArrow, CheckedIcon, RegistrationCheckedIcon, SmallLogo, SmallLogoWhite, LogoCircleFixLeft, LogoCircleFixRight } from '@/components/utilis/Icons';
import { useRouter } from 'next/navigation';
import { dashboard } from '@/api/dashboard';
import userLoader from "@/hooks/useLoader";
import { Services } from '@/types';
import { getLocalStorage, setLocalStorage } from '@/api/storage';
import BaseModal from '@/components/UI/BaseModal';
import { Theme_A } from '@/components/utilis/Themes';
import { ColorsThemeA } from '@/components/utilis/Themes';
import Footer from "@/components/UI/Footer";
import InfoButton from '@/components/UI/InfoButton';

// Définition des interfaces pour typer les données manipulées dans le composant.
interface Requirements {
    id: number,
    name: string,
    arr: string[]
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
    colors: Color[];
    type: string;
    requirements: []
}

// Composant principal
const ServiceChoose = () => {
    // Déclaration des états locaux du composant avec useState.
    const [selectedService, setSelectedService] = useState<string[]>([])
    const [selectedRequirements, setSelectedRequirements] = useState<string[]>([])
    const [selectedDropdown, setSelectedDropdown] = useState<number | null>(null)
    const [requirements, setRequirements] = useState<Requirements>({ name: '', id: 0, arr: [] })
    const [selectedRequirementIds, setSelectedRequirementIds] = useState<string[]>([])
    const [services, setServices] = useState<Services[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const [isModal, setIsModal] = useState(false)
    const [isCorrectInfo, setIsCorrectInfo] = useState(false)
    const [search, setSearch] = useState<string>('');
    const [filteredType, setFilteredType] = useState<string[]>([]);
    const [filteredService, setFilteredServices] = useState<Services[]>([]);
    const { loadingView } = userLoader();
    const router = useRouter()
    // useRef est utilisé pour créer une référence mutable qui conserve la même .current entre les renders
    const dropdownRef = React.useRef() as React.MutableRefObject<HTMLInputElement>
    const temp = getLocalStorage("haircut")
    const haircut = temp ? JSON.parse(String(temp)) : null

    // Obtention de tous les services.
    const getAllServices = () => {
        const serviceIds = getLocalStorage('ServiceIds')
        if (serviceIds) {
            const serviceIdsList: string[] = [];
            JSON.parse(serviceIds).forEach(service => {
                if(service.type !== 'discount'){
                    serviceIdsList.push(String(service.id))
                }
            });
            setSelectedService(serviceIdsList)
        }
        setIsLoading(true);
        dashboard.getServicesByHaircut()
            .then((res) => {
                if (res.data.data.length > 0) {
                    let services_new = res.data.data.filter((item) => item.type !== 'discount');
                    setServices(services_new);
                }
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }

    // Gestion du clic sur un service.
    const onServiceclick = (name: string, serviceId: number, serviceRequirements: string[]) => {
        setSelectedRequirements([])
        setIsCorrectInfo(false)
        if (serviceRequirements.length && !selectedService.includes(String(serviceId))) {
            setRequirements({ name: name, id: serviceId, arr: serviceRequirements })
            setIsModal(true)
        } else {
            serviceCheckedHandler(serviceId)
        }
    }

    // Validation d'une exigence.
    const onValidateRequirement = (id: number) => {
        if ((requirements.arr.length === selectedRequirements.length) && isCorrectInfo) {
            setIsModal(false)
            serviceCheckedHandler(requirements.id)
        }
    }

    // Gestion du service sélectionné/désélectionné.
    const serviceCheckedHandler = (serviceId: number) => {
        let id = serviceId.toString()
        if (selectedService.includes(id)) {
            const tempArray = [...selectedService];
            const index = tempArray.indexOf(id);
            tempArray.splice(index, 1);
            setSelectedService(() => tempArray);
        } else {
            setSelectedService((prevState) => [...prevState, id]);
        }
    }

    // Gestion du contrôle de l'exigence.
    const requirementCheckHandler = (id: number, requirement: string) => {
        if (selectedRequirements.includes(requirement)) {
            const tempArray = [...selectedRequirements];
            const index = tempArray.indexOf(requirement);
            tempArray.splice(index, 1);
            setSelectedRequirements(() => tempArray);
        } else {
            setSelectedRequirements((prevState) => [...prevState, requirement]);

        }
    }

    // Fonction pour continuer à l'étape suivante.
    const onContinue = () => {
        const arr: {
            name: string,
            id: number
        }[] = []
        for (let i = 0; i < services.length; i++) {
            for (let j = 0; j < selectedService.length; j++) {
                if (services[i].id === Number(selectedService[j])) {
                    arr.push({ name: services[i].name, id: services[i].id })
                }
            }
        }
        setLocalStorage('ServiceIds', JSON.stringify(arr))
        router.push(`/salons`)
    }

    // Fonction pour gérer le menu déroulant.
    const onDropdown = (e: any, index: number) => {
        setSelectedDropdown(index)
    }

    // Filtrage des services.
    const filteredServicesHandler = () => {
        let list = services;
        let filteredServices: Services[] = [];
        if (search) {
            list = services.filter((service) =>
                service.name.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (filteredType.length > 0) {
            list.forEach((service) => {
                filteredType.forEach((filter) => {
                    if (service.type === filter.toLowerCase()) {
                        filteredServices.push(service);
                    }
                });
            });
        }

        if (search && !(filteredType.length > 0)) {
            setFilteredServices(list);
        } else {
            setFilteredServices(filteredServices);
        }
    }

    // Affichage des services.
    const showServices = () => {
        if (filteredType.length > 0 || search !== "") {
            return filteredService;
        } else {
            return services;
        }
    };

    const onServiceSelect = (event: React.ChangeEvent<HTMLSelectElement>, name: string, serviceId: number, serviceRequirements: string[]) => {
        event.stopPropagation();
        onServiceclick(name, serviceId, serviceRequirements)
    }

    // Fermeture de la boîte de sélection lors du clic en dehors de celle-ci.
    const closeSelectBox = ({ target }: MouseEvent): void => {
        if (!dropdownRef.current?.contains(target as Node)) {
            setSelectedDropdown(null);
        }
    };

    // Les useEffect sont utilisés pour gérer les effets de bord dans les fonctionnalités de composants.
    useEffect(() => {
        document.addEventListener('click', closeSelectBox);
        return () => {
            document.removeEventListener('click', closeSelectBox);
        };
    }, []);

    // Charger tous les services au montage du composant.
    useEffect(() => {
        getAllServices()
        // if(servicesData){
        //     servicesData.forEach((item: {name: string, id: string}) => {
        //         setSelectedService((prevState) => [...prevState, String(item.id)]);
        //     });
        // }
    }, [])

    // Filtrage des services lors de la modification de la recherche ou du type filtré.
    useEffect(() => {
        filteredServicesHandler()
    }, [search, filteredType])

    //InfoModal
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const openInfoModal = () => {
        setIsInfoModalOpen(true);
    };
    const InfoTitle_1 = "Selection d'un service";
    const InfoContent_1 = "Il vous faut autre chose qu'une coupe ? c'est ici que ça se passe <br /> Vous trouverez tout type de services liés à votre cuir chevelu. <br /> Nous vous suggerons d'utiliser le filtre pour une recherche ciblée <br />";
    const InfoTitle_2 = "Utilisation";
    const InfoContent_2 = `● Le choix d'un service n'est pas obligatoire,<br /> Vous pouvez continuer si vous avez au moins sélectionnée une coiffure.<br /> ● Il n'est pas possible de réserver un coiffeur sans avoir sélection soit une coiffure, soit une prestation. <br />`;
    const VideoUrl = "";

    // JSX retourné pour le rendu du composant.
    return (
        <div>
            <Navbar
                isServicesPage={true}
                onTypeSelect={(type) => setFilteredType(type)}
                onServiceSearch={(value: string) => setSearch(value)} />
            <div className='flex items-center cursor-pointer mt-10 mb-8 sm:mx-10 2xl:mx-14 text-stone-800' onClick={() => router.push('/')}>
                <BackArrow />
                <p className={`${Theme_A.textFont.navigationGreyFont}`}>Retour aux coiffures</p>
            </div>
            <LogoCircleFixLeft />
            <div className='flex flex-col items-center justify-center px-4 sm:px-12' >
                {isLoading && loadingView()}
                <p className='text-4xl font-medium text-black text-center'> Choisissez une ou plusieurs <span className={`font-bold ${ColorsThemeA.textGradient_Title}`}>prestations !</span></p>
                <div className='flex flex-col items-center'>
                    <div className='w-full flex flex-col md:flex-row items-center justify-between mt-14'>
                        <div className='flex flex-col sm:flex-row items-center gap-5 mb-5 md:mb-0 z-20'>

                            <div className='flex flex-row gap-5 items-center z-20'>
                                <InfoButton title_1={InfoTitle_1} content_1={InfoContent_1} title_2={InfoTitle_2} content_2={InfoContent_2} onOpenModal={openInfoModal} videoUrl={VideoUrl} />

                                {haircut && <p className='text-stone-600 text-md md:text-lg font-semibold bg-[#F7F7F7] shadow-inner rounded-lg px-7 py-3'>{haircut.name}</p>}
                            </div>
                            {selectedService.length ? (
                                <p className='text-md md:text-xl text-stone-600 bg-[#F7F7F7] shadow-inner rounded-lg px-7 py-3'>
                                    <span className='font-semibold'>
                                        {selectedService.length > 1 ? 'Services sélectionnés :' : 'Service sélectionné :'}
                                    </span>
                                    <span className={`text-white font-bold ml-4 ${Theme_A.indicators.counterIndicator}`}>{selectedService.length}</span>
                                </p>
                            ) : (
                                <p></p>
                            )}
                        </div>

                        {(haircut || selectedService.length != 0) && <button onClick={onContinue} className={`flex items-center justify-center text-lg text-white font-medium w-full md:w-52 h-14 rounded-xl px-4 ${Theme_A.button.medLargeGradientButton}`}>Continue</button>}
                    </div>


                    <div className='mt-8 mb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-9 gap-y-5 '>
                        {showServices().map((service, index) => {
                            return (
                                <div key={index} onClick={() => onServiceclick(service.name, service.id, service.requirements)}
                                    className={`relative 2xl:w-[250px] h-20 md:h-40 border rounded-[20px] py-1 md:py-6 px-5 cursor-pointer ${selectedService.includes(String(service.id)) ? `shadow-inner ${ColorsThemeA.ohcBigVerticalGradient_A}` : `bg-white shadow-xl ${ColorsThemeA.standardBorderGray}`}`}>
                                    <div>
                                        <p className={`font-semibold mb-2 ${selectedService.includes(String(service.id)) ? 'text-white' : 'text-black'}`}>{service.name}</p>
                                        <p className={`text-xs mb-2 ${selectedService.includes(String(service.id)) ? 'text-white' : 'text-[#A0A0A0]'}`}>{service.description}</p>
                                    </div>
                                    {service.type === 'coloration' ? (
                                        <div ref={dropdownRef} onClick={(e) => e.stopPropagation()} className='relative'>
                                            {/* <select onChange={(event) => onServiceSelect(event, service.name, service.id, service.requirements)} className='w-28 h-6 flex items-center justify-center rounded-md border border-[#CACACA] bg-white text-xs text-[#6F6F6F] shadow-[0px_1px_2px_0px_rgba(204,204,204,0.54)]'>
                                                {service.colors.map((option, index) => (
                                                    <option key={index} value={option.color} className={`absolute w-32 h-52 overflow-auto flex flex-col gap-2 py-2 px-3 mt-1 rounded-md outline outline-1 border border-stone-300 bg-white text-xs text-[#6F6F6F] font-semibold shadow-lg`}>
                                                        {option.color}
                                                    </option>
                                                ))}
                                            </select> */}
                                        </div>
                                    ) : (
                                        <div style={{ position: 'absolute', right: '10px', bottom: '10px' }}>
                                            {selectedService.includes(String(service.id)) ? "" : <SmallLogo />}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {isModal &&
                        <BaseModal close={() => setIsModal(false)}>
                            <div>
                                <p className='text-black font-medium text-2xl'>{requirements.name}</p>
                                <p className='text-sm font-semibold text-red-500 w-full sm:w-[500px] md:w-[600px] my-4 '>
                                    Ce service n&eacute;cessite quelques prérequis. <br /><br />
                                    Pour le respect de votre cuir chevelu et afin d&apos;&eacute;viter toute inconvenance lors de votre rendez-vous, il est impossible de choisir cette prestation si vous n&apos;&ecirc;tes pas dans les situations suivantes :
                                </p>
                                <div className='flex flex-col gap-7 max-h-80 overflow-auto pr-1 my-6 sm:my-0'>
                                    {requirements.arr.map((requirement, index) => {
                                        return <div key={index} onClick={() => requirementCheckHandler(requirements.id, requirement)} className='flex items-center justify-between gap-5 cursor-pointer'>
                                            <p className='text-stone-600 font-semibold w-full sm:w-[500px] md:w-[600px]'>{requirement}</p>
                                            {selectedRequirements.includes(requirement) ?
                                                <RegistrationCheckedIcon width='24' height='24' />
                                                :
                                                <div className='w-6 h-6 bg-[#D9D9D9] rounded-full' />
                                            }
                                        </div>
                                    })}
                                </div>
                                <div onClick={() => setIsCorrectInfo(!isCorrectInfo)} className='flex items-center justify-center gap-5 cursor-pointer'>
                                    <p className='text-center mt-7 mb-6'>Je certifie sur l&apos;honneur que ces informations sont correctes</p>
                                    <div className={`flex justify-center items-center bg-checkbox rounded-sm w-5 h-5 border  ${isCorrectInfo ? `${ColorsThemeA.ohcVerticalGradient_A}` : "border-[#CCC] bg-white"}`}>
                                        <CheckedIcon />
                                    </div>
                                </div>
                                <div className='flex items-center justify-center gap-6'>
                                    <button onClick={() => setIsModal(false)} className={`w-32 h-12 flex items-center justify-center rounded-xl text-black  ${Theme_A.button.medWhiteColoredButton}`}>Annuler</button>
                                    <button onClick={() => onValidateRequirement(requirements.id)} className={`w-32 h-12 flex items-center justify-center rounded-xl text-white ${(requirements.arr.length === selectedRequirements.length) && isCorrectInfo ? `${Theme_A.button.mediumGradientButton}` : 'bg-[#D9D9D9] cursor-default'}`}>Valider</button>
                                </div>
                            </div>
                        </BaseModal>
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ServiceChoose