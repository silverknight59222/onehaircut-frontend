"use client";
import Navbar from '@/components/shared/Navbar'
import React, { useState } from 'react'
import '../dashboard/Dashboard/Services/index.css'
import { HeartFill, RegistrationCheckedIcon } from '@/components/utilis/Icons';
import Image from 'next/image';
import StarRatings from 'react-star-ratings';
import { useRouter } from 'next/navigation';

const SalonChoice = () => {
    const [selectedTab, setSelectedTab] = useState(0)
    const router = useRouter()
    const numbers = Array.from({ length: 9 }, (_, index) => index + 1);
    return (
        <div>
            <Navbar />
            <div className='flex flex-col items-center justify-center px-6'>
                <p className='text-4xl font-medium text-black text-center mt-14'>87 <span className='font-bold text-gradient'>Salons</span> correspondent à vos critères</p>
                <div className='flex flex-col md:flex-row items-center justify-center gap-8  mt-6'>
                    <div onClick={() => setSelectedTab(0)} className='flex items-center justify-center gap-7 w-[350px] h-14 border border-[#BDBDBD] rounded-xl cursor-pointer'>
                        <p className='text-xl font-semibold'>Selection d’une coiffure</p>
                        {selectedTab === 0 ? <RegistrationCheckedIcon /> : <div className='w-7 h-7 bg-[#D9D9D9] rounded-full' />}
                    </div>
                    <div onClick={() => setSelectedTab(1)} className='flex items-center justify-center gap-7 w-[350px] h-14 border border-[#BDBDBD] rounded-xl cursor-pointer'>
                        <p className='text-xl font-semibold'>Selection d’une prestation</p>
                        {selectedTab === 1 ? <RegistrationCheckedIcon /> : <div className='w-7 h-7 bg-[#D9D9D9] rounded-full' />}
                    </div>
                </div>
                <div className='mt-14 mb-5'>
                    <div className='w-full flex flex-col lg:flex-row items-center justify-center gap-6'>
                        <div className='md:h-[1100px] md:overflow-y-auto'>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {numbers.map((_, index) => {
                                    return <div key={index} onClick={() => router.push('/choose-service')} className='bg-[rgba(242,242,242,0.66)] rounded-2xl pb-3 cursor-pointer'>
                                        <div className="px-4 pt-4 relative">
                                            <div className="absolute right-7 top-7 cursor-pointer">
                                                <HeartFill />
                                            </div>
                                            <Image
                                                src='/assets/img1.png'
                                                width={200}
                                                height={200}
                                                alt="image"
                                            />
                                        </div>
                                        <div className="flex items-start justify-between text-black text-lg font-semibold px-3 pt-2">
                                            <p className='w-36'>Nom Salon 1 Ville</p>
                                            <p>$35</p>
                                        </div>
                                        <div className='flex items-center gap-1 text-xs text-[#7B7B7B] px-3 pt-1'>
                                            <StarRatings
                                                rating={1}
                                                starRatedColor="#FEDF10"
                                                starSpacing="4px"
                                                starDimension="12px"
                                                numberOfStars={1}
                                                name="rating"
                                            />
                                            <p className='border-r border-[#A7A7A7] pr-1'>4.9</p>
                                            <p>348 avis</p>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                        <div className='hidden lg:block w-[300pxw] lg:w-[400px] 2xl:w-[725px]'>
                            {/* map */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SalonChoice