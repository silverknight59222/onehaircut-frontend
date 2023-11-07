"use client";
import BaseModal from '@/components/UI/BaseModal';
import { LogoCircleFixRight } from '@/components/utilis/Icons';
import { Theme_A } from '@/components/utilis/Themes';
import ClientDashboardLayout from '@/layout/ClientDashboardLayout'
import Image from 'next/image';
import path from 'path';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { pathToFileURL } from 'url';
import StarRatings from "react-star-ratings";
import Footer from '@/components/UI/Footer';
import { client } from '@/api/clientSide';

const History = () => {
  const [isLoading, setIsLoading] = useState(false);
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

  const [histories, setHistories] = useState<[BookingInfoStruct]>([] as [BookingInfoStruct]);

  let page = 1;
  let isPageLoading = false
  const [itemCount, setItemCount] = useState(0);

  ////////////////////////////////////////////
  // functions for the buttons

  // ++++++++++ RATING ++++++++
  const [isRatePopUp, setRatePopUp] = useState(false);
  const [rating, setRating] = useState(0);
  const [itemToRate, setItemToRate] = useState({
    booking: null,
    ratingReview: "",
    rating: 0
  });
  // function to receive the raiting
  const handleStarClick = (value: number) => {
    setRating(value)
    setItemToRate((pre) => {
      pre.rating = value
      return pre
    })
  };
  const handleRatingReview = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setItemToRate((pre) => {
      pre.ratingReview = e.target.value
      return pre
    })
  };
  // function to show the popup to rate the haircut given in argument
  const rateThisHaircut = (booking: any) => {
    setRatePopUp(true)
    setItemToRate({
      booking: booking,
      ratingReview: "",
      rating: 0
    })
  };
  // function to send the rate to backend
  // function to show the popup to rate the haircut given in argument
  const sendRate = async () => {
    //TODO add backend function to save rate into backend
    // use itemToRate and rating

    client.saveBookingRating({
      booking_id: itemToRate?.booking?.id,
      rating: itemToRate?.rating,
      rating_review: itemToRate?.ratingReview,
    })
      .then(() => {
        setRatePopUp(false)
        itemToRate.booking.rating = {
          rating: itemToRate?.rating
        }
        setRating(0)
        setItemToRate({
          booking: null,
          ratingReview: "",
          rating: 0
        })
      })
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

  const fetchHistories = async (currentPage: number) => {
    setIsLoading(true)
    isPageLoading = true
    client.getMyHistories(currentPage)
      .then((resp) => {
        if (currentPage == 1) {
          setHistories(resp.data.bookings);
        } else {
          setHistories(prevData => [...prevData, ...resp.data.bookings]);
        }

        setItemCount(resp.data.count);
        if (resp.data.count <= (currentPage * resp.data.perPage)) {
          page = -1
        } else {
          page = currentPage + 1
        }
      })
      .finally(() => {
        setIsLoading(false)
        isPageLoading = false
      });
  }


  const handleScroll = () => {
    if (isPageLoading) return;
    if (page == -1) return;

    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 30) {
      isPageLoading = true
      fetchHistories(page);
    }
  };

  useEffect(() => {
    fetchHistories(page);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

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
                  Noter
                </p>
                <div className='justify-center text-center'>
                  <StarRatings
                    rating={rating}
                    starRatedColor="#FEDF10"
                    starSpacing="4px"
                    starDimension="25px"
                    numberOfStars={5}
                    changeRating={handleStarClick}
                  />
                  <textarea
                    className="focus:outline-red-400 text-stone-700 w-full p-2 mb-2 rounded-xl border shadow-inner min-h-[120px] mt-4"
                    id="ratingReview"
                    onChange={handleRatingReview}
                    placeholder="Examen de la notation"
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
              {!histories.length && <p className="text-lg italic">Aucun Historique Disponible</p>}
              {
                histories.map((item, index) => {
                  return <div key={index}>
                    <div className=" w-full sm:w-[536px] lg:w-[600px] rounded-3xl bg-white py-6 px-12 shadow-[0px_13px_37px_0px_rgba(176,176,176,0.28)] opacity-95 ">
                      <div className='flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between'>
                        <div className='flex flex-col items-center sm:items-start justify-center sm:justify-start gap-2 mt-5 sm:mt-0'>

                          <p className='text-[#444343] font-bold text-center sm:text-start'>{item.redable_date}</p>
                          <p className='text-[#666] text-sm text-center sm:text-start'>Heure: {item.total_duration} mins</p>
                          {item.salon_haircut && <p className='text-[#666] text-sm text-center sm:text-start'>Coiffure: {item.salon_haircut.haircut.name}</p>}
                          {!item.salon_haircut && <p className='text-[#666] text-sm text-center sm:text-start'>Coiffure: {"None"}</p>}


                          <div>
                            <p className='text-[#666] text-sm text-center sm:text-start'>Prestation:</p>
                            {
                              item.items.filter((ele) => ele.type == 'service').map((ele, index) => {
                                return (<li key={index} className='text-[#666] text-sm text-center sm:text-start'>{ele.name}.</li>)
                              })
                            }
                            {item.items.filter((ele) => ele.type == 'service').length == 0 && <p key={index} className='text-[#666] text-sm text-center sm:text-start'>none.</p>}
                          </div>

                          <p className='text-[#666] text-sm text-center sm:text-start'>Prix: {item.total_amount} euro</p>
                          <p className='text-[#666] text-sm text-center sm:text-start'>Salon: {item.hair_salon.name}</p>
                          <p className='text-[#666] text-sm text-center sm:text-start'>Coiffeur: {item.hair_dresser.name}</p>

                        </div>
                        <div className='w-[150px] mr-3'>
                          {item.salon_haircut && <Image src={`https://api.onehaircut.com${item.salon_haircut.haircut.image}`} alt='' width={150} height={150} className='rounded-3xl' />}
                          {!item.salon_haircut && <Image src={item.hair_salon ? `https://api.onehaircut.com${item.hair_salon.logo}` : `https://api.onehaircut.com${item.hair_salon.logo}`} width={150} height={150} className='rounded-3xl' />}
                          <div className='justify-center items-center mt-3 bg-zinc-100 rounded-2xl p-1'>
                            <StarRatings
                              rating={item.rating ? item.rating.rating : 0}
                              starRatedColor="#FEDF10"
                              starSpacing="2px"
                              starDimension="25px"
                              numberOfStars={5}
                            />
                          </div>
                        </div>
                      </div>
                      <div className='flex items-center justify-center  mt-10 sm:mt-5 -z-10'>
                        {item.rating == null && <button
                          onClick={() => rateThisHaircut(item)}
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
                      {/* <p className='absolute bottom-8 right-4 text-xs text-[#666]'>23/24</p> */}
                    </div>
                  </div>
                })
              }
            </div>
          </div>
        </div>
      </ClientDashboardLayout>
      <Footer />
    </div>
  )
}

export default History