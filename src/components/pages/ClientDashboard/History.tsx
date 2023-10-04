"use client";
import BaseModal from '@/components/UI/BaseModal';
import { LogoCircleFixRight } from '@/components/utilis/Icons';
import { Theme_A } from '@/components/utilis/Themes';
import ClientDashboardLayout from '@/layout/ClientDashboardLayout'
import Image from 'next/image';
import path from 'path';
import React, { useState } from 'react'
import { pathToFileURL } from 'url';
import StarRatings from "react-star-ratings";
import Footer from '@/components/UI/Footer';

const History = () => {
  interface BookingInfoStruct {
    Coiffure: string;
    Prestation: string;
    Salon: string;
    Coiffeur: string;
    Prix: number;
    Date: string;
    Heure: string;
    image: string;
    note: number;
  }


  // TODO: replace the const with backend information about the previous bookings
  const items1: BookingInfoStruct = {
    Coiffure: 'Fondu haut',
    Prestation: 'Aucune',
    Salon: 'Golden Barber',
    Coiffeur: 'Karim',
    Prix: 45,
    Date: '25/09/2023',
    Heure: '14:00',
    image: '/assets/img1.png',
    note: 0
  }

  const items2: BookingInfoStruct = {
    Coiffure: 'Bol',
    Prestation: 'Dégradé',
    Salon: '123',
    Coiffeur: 'Karim',
    Prix: 15,
    Date: '20/08/2023',
    Heure: '8:00',
    image: '/assets/img2.png',
    note: 0
  }

  const items3: BookingInfoStruct = {
    Coiffure: 'blabla',
    Prestation: 'Aucune',
    Salon: 'Schwarzkopf',
    Coiffeur: 'Le Boss',
    Prix: 150,
    Date: '20/06/2023',
    Heure: '16:00',
    image: '/assets/portrait.png',
    note: 4
  }

  const items4: BookingInfoStruct = {
    Coiffure: 'blabla',
    Prestation: 'Aucune',
    Salon: 'Schwarzkopf',
    Coiffeur: 'Le Boss',
    Prix: 140,
    Date: '20/03/2023',
    Heure: '11:00',
    image: '/assets/portrait.png',
    note: 5
  }

  const history: BookingInfoStruct[] = [items1, items2, items3, items4]

  ////////////////////////////////////////////
  // functions for the buttons

  // ++++++++++ RATING ++++++++
  const [isRatePopUp, setRatePopUp] = useState(false);
  const [rating, setRating] = useState(0);
  const [itemToRate, setItemToRate] = useState("");
  // function to receive the raiting
  const handleStarClick = (value: number) => {
    setRating(value);
  };
  // function to show the popup to rate the haircut given in argument
  const rateThisHaircut = (salon: string) => {
    setRatePopUp(true)
    setItemToRate(salon)
  };
  // function to send the rate to backend
  // function to show the popup to rate the haircut given in argument
  const sendRate = async () => {
    //TODO add backend function to save rate into backend
    // use itemToRate and rating
    setRatePopUp(false)
  };

  // ++++++++++ BILL +++++++++++++++
  // function to download the bill liked to the booking in argument
  const downloadBill = (booking: BookingInfoStruct) => {
    //TODO add backend function
  };

  // ++++++++++ REBOOKING +++++++++++++++
  // function to jump to the reservation page with the same haircut and salon
  const rebook = (booking: BookingInfoStruct) => {
    //TODO add backend function
  };

  return (
    <div>
      <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 -z-10">
        <LogoCircleFixRight />
      </div>
      <ClientDashboardLayout>
        <div className="mt-14 mb-5 px-6">
          {/*  For displaying the rating popup */}
          {isRatePopUp &&
            <BaseModal close={() => setRatePopUp(false)}>
              <div className='flex flex-col items-center w-full justify-center'>
                <p className="text-black font-medium text-xl text-center mb-8">
                  Noter {itemToRate}
                </p>
                <div className='justify-center'>
                  <StarRatings
                    rating={rating}
                    starRatedColor="#FEDF10"
                    starSpacing="4px"
                    starDimension="25px"
                    numberOfStars={5}
                    changeRating={handleStarClick}
                  />
                </div>
                <button
                  onClick={() => sendRate()}
                  className={` ${Theme_A.button.medWhiteColoredButton} mx-2 my-4`}>
                  Envoyer la note</button>
              </div>
            </BaseModal>}
          <div className="flex flex-col items-center justify-center mt-10 mb-5 px-6 sm:px-10 md:px-20">
            <p className="text-black font-medium text-3xl text-center mb-8">
              Historique des coiffures effectuées
            </p>
            <div className='flex flex-col gap-4' >
              {/* Loop over the booking history and display them */}
              {history.map((item, index) => {
                return <div key={index}>
                  <div className=" w-full sm:w-[536px] lg:w-[600px] rounded-3xl bg-white py-6 px-12 shadow-[0px_13px_37px_0px_rgba(176,176,176,0.28)]">
                    <div className='flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between'>
                      <div className='flex flex-col items-center sm:items-start justify-center sm:justify-start gap-2 mt-5 sm:mt-0'>

                        <p className='text-[#5B5B5B] font-bold text-center sm:text-start'>{item.Date}</p>
                        <p className='text-[#666] text-sm text-center sm:text-start'>Heure: {item.Heure}</p>
                        <p className='text-[#666] text-sm text-center sm:text-start'>Coiffure: {item.Coiffure}</p>
                        <p className='text-[#666] text-sm text-center sm:text-start'>Préstation: {item.Prestation}</p>
                        <p className='text-[#666] text-sm text-center sm:text-start'>Prix: {item.Prix} euro</p>
                        <p className='text-[#666] text-sm text-center sm:text-start'>Salon: {item.Salon}</p>
                        <p className='text-[#666] text-sm text-center sm:text-start'>Coiffeur: {item.Coiffeur}</p>

                      </div>
                      <div className='w-[150px]'>
                        <Image src={item.image} alt='' width={150} height={150} className='rounded-3xl' />
                        <div className='justify-center items-center mt-3 bg-zinc-100 rounded-2xl p-1'>
                          <StarRatings
                            rating={item.note}
                            starRatedColor="#FEDF10"
                            starSpacing="2px"
                            starDimension="25px"
                            numberOfStars={5}
                          />
                        </div>
                      </div>
                    </div>
                    {!isRatePopUp &&
                      <div className='flex items-center justify-center  mt-10 sm:mt-5 -z-10'>
                        {item.note == 0 && <button
                          onClick={() => rateThisHaircut(item.Salon)}
                          className={` ${Theme_A.button.medBlackColoredButton} mx-1`}>
                          Noter
                        </button>
                        }
                        <button
                          onClick={() => downloadBill(item)}
                          className={`${Theme_A.button.medWhiteColoredButton} mx-1`}>
                          Télecharger la facture</button>
                        <button
                          onClick={() => rebook(item)}
                          className={`${Theme_A.button.mediumGradientButton} mx-1`}>
                          Reserver à nouveau</button>
                      </div>
                    }
                    {/* <p className='absolute bottom-8 right-4 text-xs text-[#666]'>23/24</p> */}
                  </div>
                </div>
              })}

            </div>
          </div>
        </div>
      </ClientDashboardLayout>
      <Footer />
    </div>
  )
}

export default History