"use client";
import BaseModal from "@/components/UI/BaseModal";
import { LogoCircleFixRight } from "@/components/utilis/Icons";
import { Theme_A } from "@/components/utilis/Themes";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import Footer from '@/components/UI/Footer';
import { client } from '@/api/clientSide';
import { dashboard } from '@/api/dashboard';
import jsPDF from 'jspdf';
import { convertAmount, getCurrencySymbol, getUserCurrency } from "@/utils/currency";

const History = () => {
  const [isLoading, setIsLoading] = useState(false);
  interface BookingInfoStruct {
    total_amount: any;
    hair_salon: any;
    hair_dresser: any;
    rating: any;
    haircut: any;
    salon_haircut: {
      haircut: any;
    };
    total_duration: number;
    redable_date: string;
    Coiffure: string;
    Prestation: string;
    Salon: string;
    Coiffeur: string;
    Prix: number;
    Date: string;
    Heure: string;
    image: string;
    note: number;
    items: any;
    booking_number: any;
  }

  const [histories, setHistories] = useState<[BookingInfoStruct]>(
    [] as unknown as [BookingInfoStruct]
  );

  let page = 1;
  let isPageLoading = false;
  const [itemCount, setItemCount] = useState(0);

  ////////////////////////////////////////////
  // functions for the buttons

  // ++++++++++ RATING ++++++++
  const [isRatePopUp, setRatePopUp] = useState(false);
  const [rating, setRating] = useState(0);
  const userCurrency = getUserCurrency();
  const currencySymbol = getCurrencySymbol();
  const [itemToRate, setItemToRate] = useState<{
    booking: any;
    ratingReview: string;
    rating: number;
  }>({
    booking: {},
    ratingReview: "",
    rating: 0,
  });
  // function to receive the raiting
  const handleStarClick = (value: number) => {
    setRating(value);
    setItemToRate((pre) => {
      pre.rating = value;
      return pre;
    });
  };
  const handleRatingReview = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setItemToRate((pre) => {
      pre.ratingReview = e.target.value;
      return pre;
    });
  };
  // function to show the popup to rate the haircut given in argument
  const rateThisHaircut = (booking: any) => {
    setRatePopUp(true);
    setItemToRate({
      booking: booking,
      ratingReview: "",
      rating: 0,
    });
  };
  // function to send the rate to backend
  // function to show the popup to rate the haircut given in argument
  const sendRate = async () => {
    //TODO add backend function to save rate into backend
    // use itemToRate and rating

    client
      .saveBookingRating({
        booking_id:
          itemToRate && itemToRate.booking ? itemToRate.booking.id : "",
        rating: itemToRate?.rating,
        rating_review: itemToRate?.ratingReview,
      })
      .then(() => {
        setRatePopUp(false);
        itemToRate.booking.rating = {
          rating: itemToRate?.rating,
        };
        setRating(0);
        setItemToRate({
          booking: null,
          ratingReview: "",
          rating: 0,
        });
      });
  };

  // ++++++++++ BILL +++++++++++++++
  // function to download the bill liked to the booking in argument
  const downloadBill = (item: BookingInfoStruct) => {
    // Create a new PDF document
    const doc = new jsPDF();

    // Logo URL
    const logoUrl = '/assets/DefaultPictures/Onehaircut_Logo.png';
    const logoFooterUrl = '/assets/DefaultPictures/logoOHC_footer.png';

    // Font sizes
    const titleFontSize = 30;
    const contentFontSize = 10;
    const totalFontSize = 20;
    const addSize = 8;

    const leftMargin = 20;

    doc.setLineWidth(0.5); // Adjust line width

    // logo OneHaircut
    doc.addImage(logoUrl, 'PNG', leftMargin, 10, 75, 15); // Adjust position and size as needed

    // title
    doc.setFontSize(titleFontSize);
    doc.text('Facture', leftMargin, 60); // Adjust position as needed


    const contentY = 80;
    doc.setFontSize(12);
    doc.text(`Numéro de réservation: ${item.booking_number}`, 20, contentY);

    doc.setFontSize(contentFontSize);
    doc.line(leftMargin, contentY + 5, 200, contentY + 5); // Add a horizontal line
    doc.text(`Date de réservation: ${item.redable_date}`, leftMargin, contentY + 15);
    doc.text(`Salon: ${item.hair_salon && item.hair_salon.name}`, leftMargin, contentY + 21);
    doc.text(`Adresse du salon: ${item.hair_salon.address.street}, ${item.hair_salon.address.city} (${item.hair_salon.address.country})`, leftMargin, contentY + 27)
    doc.text(`Coiffure demandée: ${item.salon_haircut.haircut.name}`, leftMargin, contentY + 34);
    doc.line(leftMargin, contentY + 40, 200, contentY + 40); // Add a horizontal line
    doc.setFontSize(totalFontSize);
    doc.text(`Total payé: ${item.total_amount}`, leftMargin, contentY + 50);


    // Add address
    const addressY = 270;
    doc.setFontSize(addSize);
    doc.text('Onehaircut from Balextrade', leftMargin, addressY);
    doc.text('7901 4TH ST N STE', leftMargin, addressY + 5);
    doc.text('300 ST. PETERSBURG, FL. US 33702', leftMargin, addressY + 10);

    // logo OneHaircut
    doc.addImage(logoFooterUrl, 'PNG', 120, 200, 100, 100); // Adjust position and size as needed

    // Save the PDF as a file
    doc.save('reservation_bill.pdf');
  };



  // ++++++++++ REBOOKING +++++++++++++++
  // function to jump to the reservation page with the same haircut and salon
  const rebook = (booking: BookingInfoStruct) => {
    //TODO add backend function
  };

  const fetchHistories = async (currentPage: number) => {
    setIsLoading(true);
    isPageLoading = true;
    client
      .getMyHistories(currentPage)
      .then((resp) => {
        if (currentPage == 1) {
          setHistories(resp.data.bookings);
        } else {
          setHistories((prevData) => {
            prevData.push(...resp.data.bookings);
            return [...prevData];
          });
        }

        setItemCount(resp.data.count);
        if (resp.data.count <= currentPage * resp.data.perPage) {
          page = -1;
        } else {
          page = currentPage + 1;
        }
      })
      .finally(() => {
        setIsLoading(false);
        isPageLoading = false;
      });
  };

  const handleScroll = () => {
    if (isPageLoading) return;
    if (page == -1) return;

    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 30
    ) {
      isPageLoading = true;
      fetchHistories(page);
    }
  };

  useEffect(() => {
    fetchHistories(page);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 -z-10">
        <LogoCircleFixRight />
      </div>
      <div className="mt-14 mb-5 px-6">
        {/*  For displaying the rating popup */}
        {isRatePopUp && (
          <BaseModal close={() => setRatePopUp(false)}>
            <div className="flex flex-col items-center w-full justify-center">
              <p className="text-black font-medium text-xl text-center mb-8">
                Noter
              </p>
              <div className="justify-center text-center">
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
                  placeholder="Donner un avis"
                />
              </div>
              <button
                onClick={() => sendRate()}
                className={` ${Theme_A.button.medWhiteColoredButton} mx-2 my-4`}
              >
                Envoyer la note
              </button>
            </div>
          </BaseModal>
        )}
        <div className="flex flex-col items-center justify-center mt-10 mb-5 px-6 sm:px-10 md:px-20">
          <p className="text-black font-medium text-3xl text-center mb-8">
            Historique des coiffures effectuées ({histories.length})
          </p>
          <div className="flex flex-col gap-4">
            {/* Loop over the booking history and display them */}
            {!histories.length && (
              <p className="text-lg italic">Aucun Historique Disponible</p>
            )}
            {histories.map((item, index) => {
              return (
                <div key={index}>
                  <div className=" w-full sm:w-[536px] lg:w-[600px] rounded-3xl bg-white py-6 px-12 shadow-md shadow-stone-300 opacity-95 mb-12 ">
                    <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between">
                      <div className="flex flex-col items-center sm:items-start justify-center sm:justify-start gap-2 mt-5 sm:mt-0">
                        <p className="text-[#444343] font-bold text-center sm:text-start">
                          {item.redable_date}
                        </p>
                        <p className="text-[#666] text-sm text-center sm:text-start">
                          Heure: {item.total_duration} mins
                        </p>
                        {item.salon_haircut && (
                          <p className="text-[#666] text-sm text-center sm:text-start">
                            Coiffure: {item.salon_haircut.haircut.name}
                          </p>
                        )}
                        {!item.salon_haircut && (
                          <p className="text-[#666] text-sm text-center sm:text-start">
                            Coiffure: {"None"}
                          </p>
                        )}

                        <div>
                          <p className="text-[#666] text-sm text-center sm:text-start">
                            Prestation:
                          </p>
                          {item.items &&
                            item.items
                              .filter((ele) => ele.type == "service")
                              .map((ele, index) => {
                                return (
                                  <li
                                    key={index}
                                    className="text-[#666] text-sm text-center sm:text-start"
                                  >
                                    {ele.name}.
                                  </li>
                                );
                              })}
                          {item.items &&
                            item.items.filter((ele) => ele.type == "service")
                              .length == 0 && (
                              <p
                                key={index}
                                className="text-[#666] text-sm text-center sm:text-start"
                              >
                                none.
                              </p>
                            )}
                        </div>

                        <p className="text-[#666] text-sm text-center sm:text-start">
                          Prix:
                          {convertAmount(item.hair_salon?.user?.currency, userCurrency, item.total_amount)} {currencySymbol}
                        </p>
                        <p className="text-[#666] text-sm text-center sm:text-start">
                          Salon: {item.hair_salon && item.hair_salon.name}
                        </p>
                        <p className="text-[#666] text-sm text-center sm:text-start">
                          Coiffeur:{" "}
                          {item.hair_dresser && item.hair_dresser.name}
                        </p>
                        <p className="text-[#666] text-sm text-center sm:text-start pb-1">
                          N° Réservation:{" "}
                          {item.booking_number}
                        </p>
                      </div>
                      <div className="w-[150px] mr-3">
                        {item.salon_haircut && (
                          <Image
                            src={
                              item.salon_haircut.haircut.image.includes("http")
                                ? item.salon_haircut.haircut.image
                                : `https://api.onehaircut.com${item.salon_haircut.haircut.image}`
                            }
                            alt=""
                            width={150}
                            height={150}
                            className="rounded-3xl"
                          />
                        )}
                        {!item.salon_haircut && (
                          <Image
                            src={
                              item.haircut
                                ? item.haircut.image.includes("http")
                                  ? item.haircut.image
                                  : `https://api.onehaircut.com${item.haircut.image}`
                                : `https://api.onehaircut.com/favicon.ico`
                            }
                            alt=""
                            width={150}
                            height={150}
                            className="rounded-3xl"
                          />
                        )}
                        <div className="justify-center items-center mt-3 bg-zinc-100 rounded-2xl p-1">
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
                    <div className="flex items-center justify-center  mt-10 sm:mt-5 -z-10">
                      {item.rating == null && (
                        <button
                          onClick={() => rateThisHaircut(item)}
                          className={` ${Theme_A.button.medBlackColoredButton} mx-1`}
                        >
                          Noter
                        </button>
                      )}
                      <button
                        onClick={() => downloadBill(item)}
                        className={`${Theme_A.button.medWhiteColoredButton} mx-1`}
                      >
                        Télécharger la facture
                      </button>

                      {/* TODO : re-enable once this functionality works */}
                      {/* <button
                          onClick={() => rebook(item)}
                          className={`${Theme_A.button.mediumGradientButton} mx-1`}>
                          Reserver à nouveau</button> */}
                    </div>

                    {/* TODO Bouton should be visible only for 1 week after the booking */}
                    <div
                      className="flex mt-6 items-center justify-center cursor-pointer "
                    //onClick={() => redirect to Contact us with preset value "Déclarer un litige" + the correct booking number}
                    >
                      <p className="text-xs text-[#666] underline transform hover:scale-105 transition-transform hover:text-red-500 hover:font-medium">
                        Signaler un problème{" "}
                      </p>
                    </div>
                    {/* <p className='absolute bottom-8 right-4 text-xs text-[#666]'>23/24</p> */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
