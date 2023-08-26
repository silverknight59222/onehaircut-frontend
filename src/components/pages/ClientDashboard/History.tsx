"use client";
import { CircleRight } from '@/components/utilis/Icons';
import ClientDashboardLayout from '@/layout/ClientDashboardLayout'
import Image from 'next/image';
import React from 'react'

const History = () => {
  const items = [
    { name: 'Coiffure', desc: 'Fondu haut' },
    { name: 'Couleur', desc: 'Aucune' },
    { name: 'Salon', desc: 'Golden Barber' },
    { name: 'Coiffeur', desc: 'Karim' },
    { name: 'Prix coiffure', desc: '45 CHF' },
    { name: 'Prestation', desc: 'Brushing' },
    { name: 'Prix prestation', desc: '45 CHF' },
  ]
  return (
    <div>
      <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 z-10">
        <CircleRight />
      </div>
      <ClientDashboardLayout>
        <div className="flex flex-col items-center justify-center mt-10 mb-5 px-6 sm:px-10 md:px-20">
          <p className="text-black font-medium text-3xl text-center mb-8">
            Historique des coiffures effectuées
          </p>
          <p className='text-sm text-black font-semibold mb-2'>15/04/2023</p>
          <div className="relative z-10 w-full sm:w-[536px] rounded-3xl bg-white py-6 px-12 shadow-[0px_13px_37px_0px_rgba(176,176,176,0.28)]">
            <div className='flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between'>
              <div className='flex flex-col items-center sm:items-start justify-center sm:justify-start gap-5 mt-5 sm:mt-0'>
                {items.map((item, index) => {
                  return <div key={index}>
                    <p className='text-[#5B5B5B] font-bold text-center sm:text-start'>{item.name}</p>
                    <p className='text-[#666] text-sm text-center sm:text-start'>{item.desc}</p>
                  </div>
                })}
              </div>
              <div>
                <Image src='/assets/img1.png' alt='' width={150} height={163} className='rounded-3xl' />
              </div>
            </div>
            <div className='flex items-center justify-center mt-10 sm:mt-5'>
              <button className='w-36 h-14 flex items-center justify-center rounded-xl text-xs font-semibold text-white bg-background-gradient'>Reserver à nouveau</button>
            </div>
            <p className='absolute bottom-8 right-4 text-xs text-[#666]'>23/24</p>
          </div>
        </div>
      </ClientDashboardLayout>
    </div>
  )
}

export default History