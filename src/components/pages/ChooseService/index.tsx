"use client";
import Navbar from '@/components/shared/Navbar'
import React, {useState} from 'react'
import '../dashboard/Dashboard/Services/index.css'
import { SmallLogo } from '@/components/utilis/Icons';
import { useRouter } from 'next/navigation';

const ServiceChoose = () => {
    const [selectedService,setSelectedService]=useState<number>(2)
    const router=useRouter()
    const services = [
        { title: 'Achat de produits', price: '$0', duration: '', desc: '' },
        { title: 'Offre de promotions', price: '$0', duration: '', desc: 'Hydratation, réparation, marques capillaires' },
        { title: 'Soins capillaires', price: '$75', duration: '25 à 30min', desc: '' },
        { title: 'Rasage et taille de barbes', price: '$75', duration: '25 à 30min', desc: '' },
        { title: 'Brushing', price: '$75', duration: '25 à 30min', desc: '' },
        { title: 'Lissage des cheveux', price: '$75', duration: '25 à 30min', desc: '' },
        { title: 'Extensions capillaires', price: '$100', duration: '25 à 30min', desc: '' },
        { title: 'Traitement antipelliculaire', price: '$75', duration: '', desc: '' },
        { title: 'Coloration ', price: '$75', duration: '25 à 30min', desc: 'mèche, balayage, ombré, couleurs vives' },
        { title: 'Permanente', price: '$75', duration: '25 à 30min', desc: 'Boucle et ondulations durables' },
    ]
    const onServiceclick=(index: number)=>{
        setSelectedService(index)
        router.push(`/salon/${index}/profile`)
    }
    return (
        <div>
            <Navbar />
            <div className='flex flex-col items-center justify-center px-4 sm:px-12'>
                <p className='text-4xl font-medium text-black text-center mt-14'> Choisissez une ou plusieurs <span className='font-bold text-gradient'>prestations !</span></p>
                <div className='flex flex-col md:flex-row items-center justify-center gap-8  mt-6'>
                    <button className='flex items-center justify-center text-lg text-black font-medium w-full md:w-64 h-14 border border-black rounded-xl'>Retour au coiffure</button>
                    <button className='flex items-center justify-center text-lg text-white bg-background-gradient font-medium w-full md:w-80 h-14 rounded-xl px-4'>Rechercher un professionnel</button>
                </div>
                <div className='flex items-center'>
                <div className='mt-16 mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-x-9 gap-y-5'>
                    {services.map((service, index) => {
                        return <div key={index} onClick={()=>onServiceclick(index)} className={`relative 2xl:w-[250px] h-40 border rounded-[20px] py-6 px-5 cursor-pointer ${selectedService === index ? 'bg-gradient-to-r from-pink-500 to-orange-500' : 'bg-white border-[#408D1C] '}`}>
                            <p className={`font-medium ${selectedService === index ? 'text-white' : 'text-black'}`}>{service.title}</p>
                            <p className={`text-xs ${selectedService === index ? 'text-white' : 'text-[#A0A0A0]'}`}>{service.desc}</p>
                            <div className={`absolute right-0 top-24 w-[75px] h-9 flex items-center justify-center text-white font-semibold text-xl rounded-tl-[14px] rounded-br-[14px] ${selectedService === index ? 'bg-[rgba(255,255,255,0.18)]' : 'bg-[rgba(105,105,105,0.18)]'}`}>{service.price}</div>
                            <div className='absolute bottom-4'>
                                {service.duration ? 
                                <div className='w-20 h-6 flex items-center justify-center rounded-md border border-[#CACACA] bg-white text-xs text-[#6F6F6F] shadow-[0px_1px_2px_0px_rgba(204,204,204,0.54)]'>
                                    {service.duration}
                                </div>
                                :
                                <SmallLogo />
                    }
                            </div>
                        </div>
                    })}

                </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceChoose