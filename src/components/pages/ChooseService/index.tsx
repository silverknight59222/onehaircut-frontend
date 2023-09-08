"use client";
import Navbar from '@/components/shared/Navbar'
import React, { useEffect, useState } from 'react'
import '../dashboard/Dashboard/Services/index.css'
import { BackArrow, CheckedIcon, RegistrationCheckedIcon, SmallLogo } from '@/components/utilis/Icons';
import { useRouter } from 'next/navigation';
import { dashboard } from '@/api/dashboard';
import userLoader from "@/hooks/useLoader";
import { Services } from '@/types';
import { getLocalStorage, setLocalStorage } from '@/api/storage';
import BaseModal from '@/components/UI/BaseModal';

interface Requirements{
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

const ServiceChoose = () => {
    const [selectedService, setSelectedService] = useState<string[]>([])
    const [selectedRequirements, setSelectedRequirements] = useState<string[]>([])
    const [selectedDropdown, setSelectedDropdown] = useState<number | null>(null)
    const [requirements,setRequirements]=useState<Requirements>({name: '', id: 0, arr: []})
    const [selectedRequirementIds,setSelectedRequirementIds]=useState<string[]>([])
    const [services, setServices] = useState<Services[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const [isModal, setIsModal] = useState(false)
    const [isCorrectInfo,setIsCorrectInfo]=useState(false)
    const [search, setSearch] = useState<string>('');
    const [filteredType, setFilteredType] = useState<string[]>([]);
    const [filteredService, setFilteredServices] = useState<Services[]>([]);
    const { loadingView } = userLoader();
    const router = useRouter()
    const dropdownRef = React.useRef() as React.MutableRefObject<HTMLInputElement>
    const haircut=JSON.parse(String(getLocalStorage("Haircut")))

    const getAllServices = () => {
        setIsLoading(true);
        dashboard.getServicesByHaircut()
            .then((res) => {
                if (res.data.data.length > 0) {
                    setServices(res.data.data);
                }
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }

    const onServiceclick = (name: string, serviceId: number, serviceRequirements: string[]) => {
        setSelectedRequirements([])
        setIsCorrectInfo(false)
        if(serviceRequirements.length && !selectedRequirementIds.includes(String(serviceId))){
            setRequirements({name: name, id: serviceId, arr: serviceRequirements})
            setIsModal(true)
        }else{
            selectedRequirementIds.forEach((item,index)=>{
                if(item===String(serviceId)){
                    selectedRequirementIds.splice(index,1)
                }
            })
            serviceCheckedHandler(serviceId)
        }        
    }

    const onValidateRequirement=(id: number)=>{
        setSelectedRequirementIds([...selectedRequirementIds, String(id)])
        if((requirements.arr.length === selectedRequirements.length) && isCorrectInfo){
            setIsModal(false)
            serviceCheckedHandler(requirements.id)
        }

    }

    const serviceCheckedHandler=(serviceId: number)=>{
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

    const requirementCheckHandler = (id: number,requirement: string) => {
        if (selectedRequirements.includes(requirement)) {
            const tempArray = [...selectedRequirements];
            const index = tempArray.indexOf(requirement);
            tempArray.splice(index, 1);
            setSelectedRequirements(() => tempArray);
        } else {
            setSelectedRequirements((prevState) => [...prevState, requirement]);

        }
    }

    const onContinue = () => {
        const arr = []
        for (let i = 0; i < selectedService.length; i++) {
            arr.push(Number(selectedService[i]))
        }
        let serviceIds = JSON.stringify(arr)
        setLocalStorage('ServiceIds', serviceIds)
        router.push(`/salons`)
    }

    const onDropdown = (e: any, index: number) => {
        setSelectedDropdown(index)
    }

    const filteredServicesHandler=()=>{
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
    const showServices = () => {
        if (filteredType.length > 0 || search !== "") {
          return filteredService;
        } else {
          return services;
        }
      };

    const closeSelectBox = ({ target }: MouseEvent): void => {
        if (!dropdownRef.current?.contains(target as Node)) {
            setSelectedDropdown(null);
        }
    };

    useEffect(() => {
        document.addEventListener('click', closeSelectBox);
        return () => {
            document.removeEventListener('click', closeSelectBox);
        };
    }, []);

    useEffect(() => {
        getAllServices()
    }, [])
    useEffect(()=>{
        filteredServicesHandler()
    },[search, filteredType])
    return (
        <div>
            <Navbar isServicesPage={true} onTypeSelect={(type)=>setFilteredType(type)} onServiceSearch={(value: string)=>setSearch(value)} />
            <div className='flex items-center cursor-pointer mt-10 mb-8 sm:mx-10 2xl:mx-14' onClick={() => router.push('/')}>
                <BackArrow />
                <p className='text-xl text-[#A0A0A0]'>Haircuts</p>
            </div>
            <div className='flex flex-col items-center justify-center px-4 sm:px-12'>
                {isLoading && loadingView()}
                <p className='text-4xl font-medium text-black text-center'> Choisissez une ou plusieurs <span className='font-bold text-gradient'>prestations !</span></p>
                {/* <div className='flex flex-col md:flex-row items-center justify-center gap-8  mt-6'>
                    <button className='flex items-center justify-center text-lg text-black font-medium w-full md:w-64 h-14 border border-black rounded-xl'>Retour au coiffure</button>
                    <button className='flex items-center justify-center text-lg text-white bg-background-gradient font-medium w-full md:w-80 h-14 rounded-xl px-4'>Rechercher un professionnel</button>
                </div> */}
                <div className='flex flex-col items-center'>
                <div className='w-full flex flex-col md:flex-row items-center justify-between mt-12'>
                    <div className='flex flex-col sm:flex-row items-center gap-5 mb-5 md:mb-0'>
                        <p className='text-[#A0A0A0] text-lg font-medium bg-[#F7F7F7] rounded-lg px-7 py-3'>{haircut.name}</p>
                        {selectedService.length ? <p className='text-xl text-[#A0A0A0]'><span className='font-semibold'>Number of Services:</span> {selectedService.length}</p> : <p></p>}
                    </div>
                    <button onClick={onContinue} className={`flex items-center justify-center text-lg text-white font-medium w-full md:w-52 h-14 rounded-xl px-4 bg-background-gradient`}>Continue</button>
                </div>
                    <div className='mt-8 mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-9 gap-y-5'>
                        {showServices().map((service, index) => {
                            return <div key={index} onClick={() => onServiceclick(service.name, service.id, service.requirements)} className={`relative 2xl:w-[250px] h-40 border rounded-[20px] py-6 px-5 cursor-pointer ${selectedService.includes(String(service.id)) ? 'bg-gradient-to-r from-pink-500 to-orange-500' : 'bg-white border-[#408D1C] '}`}>
                                <p className={`font-medium ${selectedService.includes(String(service.id)) ? 'text-white' : 'text-black'}`}>{service.name}</p>
                                <p className={`text-xs ${selectedService.includes(String(service.id)) ? 'text-white' : 'text-[#A0A0A0]'}`}>{service.description}</p>
                                <div className='absolute bottom-4'>
                                    {service.type === 'coloration' ?
                                        <div ref={dropdownRef} onClick={(e)=>e.stopPropagation()} className='relative'>
                                            <div onMouseEnter={(e) => onDropdown(e, index)} className='w-28 h-6 flex items-center justify-center rounded-md border border-[#CACACA] bg-white text-xs text-[#6F6F6F] shadow-[0px_1px_2px_0px_rgba(204,204,204,0.54)]'>
                                                {service.colors[0].color}
                                            </div>
                                            {selectedDropdown === index &&
                                                <div className='absolute z-10 w-28 h-36 overflow-auto flex flex-col gap-2 py-2 px-3 mt-1 rounded-md border border-[#CACACA] bg-white text-xs text-[#6F6F6F] shadow-[0px_1px_2px_0px_rgba(204,204,204,0.54)]'>
                                                    {service.colors.map((item, index) => {
                                                        return <p key={index}>{item.color}</p>
                                                    })}
                                                </div>
                                            }
                                        </div>
                                        :
                                        <SmallLogo />
                                    }
                                </div>
                            </div>
                        })}
                    </div>
                    {isModal &&
                        <BaseModal close={() => setIsModal(false)}>
                            <div>
                                <p className='text-black font-medium text-2xl'>{requirements.name}</p>
                                <p className='text-sm text-[#FF5950] w-full sm:w-[500px] md:w-[600px] my-4'>Une coloration nécessite quelques prérequis. Pour le respect de votre cuir chevelu et afin d’éviter toute inconvenance lors de votre rendez-vous, il est impossible de choisir cette prestation si vous n’êtes pas dans les situations suivantes : </p>
                                <div className='flex flex-col gap-7 max-h-80 overflow-auto pr-1 my-6 sm:my-0'>
                                    {requirements.arr.map((requirement,index)=>{
                                        return <div key={index} onClick={()=>requirementCheckHandler(requirements.id,requirement)} className='flex items-center justify-between gap-5 cursor-pointer'>
                                        <p className='text-black font-medium w-full sm:w-[500px] md:w-[600px]'>{requirement}</p>
                                        {selectedRequirements.includes(requirement) ?
                                        <RegistrationCheckedIcon width='24' height='24' />
                                        :
                                        <div className='w-6 h-6 bg-[#D9D9D9] rounded-full'/>
                                    }
                                    </div>
                                    })}
                                </div>
                                <div onClick={()=>setIsCorrectInfo(!isCorrectInfo)} className='flex items-center justify-center gap-5 cursor-pointer'>
                                    <p className='text-center mt-7 mb-6'>Je certifie sur l’honneur que ces informations sont correctes</p>
                                    <div className={`flex justify-center items-center bg-checkbox rounded-sm w-5 h-5 border  ${isCorrectInfo ? "bg-gradient-to-b from-pink-500 to-orange-500" : "border-[#CCC] bg-white"}`}>
                                        <CheckedIcon />
                                    </div>
                                </div>
                                <div className='flex items-center justify-center gap-6'>
                                    <button onClick={() => setIsModal(false)} className='w-32 h-12 flex items-center justify-center border border-black rounded-xl'>Annuler</button>
                                    <button onClick={()=>onValidateRequirement(requirements.id)} className={`w-32 h-12 flex items-center justify-center rounded-xl text-white ${(requirements.arr.length === selectedRequirements.length) && isCorrectInfo ? 'bg-background-gradient' : 'bg-[#D9D9D9] cursor-default'}`}>Valider</button>
                                </div>
                            </div>
                        </BaseModal>
                    }
                </div>
            </div>
        </div>
    )
}

export default ServiceChoose