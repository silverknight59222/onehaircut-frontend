"use client";
import Navbar from "@/components/shared/Navbar";
import {
  Instagram,
  LogoIcon,
  QuotationFillIcon,
  QuotationIcon,
} from "@/components/utilis/Icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import StarRatings from "react-star-ratings";

const SearchSalon = () => {
  const [selectedImage, setSelectedImage] = useState("/assets/salon5.png");
  const numbers = Array.from({ length: 6 }, (_, index) => index + 1);
  const router=useRouter()
  const hairdressers = [
    { name: "Wissem", img: "/assets/img1.png" },
    { name: "Denna", img: "/assets/img2.png" },
    { name: "Dyone", img: "/assets/img3.png" },
  ];
  const images = [
    "/assets/salon6.png",
    "/assets/salon7.png",
    "/assets/salon8.png",
  ];
  const hours = [
    { title: "Lundi", hours: "Fermé" },
    { title: "Mardi", hours: "10:00 - 19:00" },
    { title: "Mercredi", hours: "10:00 - 19:00" },
    { title: "Jeudi", hours: "10:00 - 19:00" },
    { title: "Vendredi", hours: "10:00 - 19:00" },
    { title: "Samedi", hours: "10:00 - 19:00" },
    { title: "Dimanche", hours: "10:00 - 19:00" },
  ];

  return (
    <div className="relative">
      <img src="/assets/registration_bg_bottom.png" className="absolute -bottom-5 w-full"/>
      <Navbar />
      <div className="mt-16 mb-5 px-10 2xl:px-14">
        <div className="flex flex-col xl:flex-row items-center md:items-start xl:justify-between gap-11">
          <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-20 xl:gap-8 2xl:gap-12">
            <div>
              <div className="w-[320px] lg:w-[400px] 2xl:w-[483px] h-64 lg:h-80 relative">
                <Image src={selectedImage} alt="" fill={true} />
              </div>
              <div className="flex items-center gap-3 mt-3">
                {images.map((image, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedImage(image)}
                      className="relative w-24 lg:w-32 2xl:w-36 h-24 lg:h-32 2xl:h-36 cursor-pointer"
                    >
                      <Image src={image} alt="" fill={true} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="text-black font-bold text-2xl 2xl:text-3xl">
                Golden Barber
              </p>
              <div className="flex items-center gap-2 border-b-2 border-[#DBDBDB] text-xl 2xl:text-2xl font-semibold text-black pb-3 mt-1">
                <StarRatings
                  rating={1}
                  starRatedColor="#FEDF10"
                  starSpacing="4px"
                  starDimension="42px"
                  numberOfStars={1}
                  name="rating"
                />
                <p>4.8</p>
                <p>(346 avis)</p>
              </div>
              <div className="flex items-center justify-center w-[300px] lg:w-[360px] 2xl:w-[483px] h-44 rounded-3xl my-4 bg-gradient-to-b from-gray-200 to-transparent">
                <p className="text-2xl font-medium text-black">
                  Description salon
                </p>
              </div>
              <p className="text-xs text-black font-medium mb-3">
                Offres promotionnelles dispo !
              </p>
              <div className="flex items-center gap-4 mb-4">
                <Instagram />
                <p className="text-xl text-black font-medium">Golden_b</p>
              </div>
              <div className="flex items-center gap-4">
                <Image
                  src="/assets/facebook.png"
                  alt=""
                  width={32}
                  height={32}
                />
                <p className="text-xl text-black font-medium">Golden barber</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col gap-6 w-[350px] 2xl:w-[420px] border border-[#E1E1E1] rounded-3xl py-6 px-8 2xl:px-10 shadow-[0px_4px_24px_0px_rgba(183,183,183,0.25)]">
              {hours.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between text-xl 2xl:text-2xl font-medium text-[#898989]"
                  >
                    <p>{item.title}</p>
                    <p>{item.hours}</p>
                  </div>
                );
              })}
            </div>
            <button onClick={()=>router.push('/book-salon')} className="w-full md:w-64 2xl:w-72 h-14 flex items-center justify-center mt-7 text-white font-semibold text-xl rounded-xl bg-background-gradient shadow-[0px_17px_36px_0px_rgba(255,125,60,0.25)]">
              Réservez un créneau
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-10 2xl:gap-14 mt-20">
            {numbers.map((_, index) => {
              return (
                <div
                  key={index}
                  className="relative w-full sm:w-[280px] md:w-[315px] xl:w-[390px] 2xl:w-[487px] h-60 md:h-64 xl:h-72 2xl:h-80 bg-[#D9D9D9] rounded-3xl"
                >
                  {index === 0 && (
                    <Image src="/assets/salon5.png" alt="" fill={true} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-16">
          <p className="text-5xl font-semibold text-black text-center">
            Coiffeur
          </p>
          <div className="flex items-center justify-center mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-20 ">
              {hairdressers.map((hairdresser, index) => {
                return (
                  <div key={index}>
                    <div className="relative w-52 lg:w-64 h-52 lg:h-64 rounded-[20px]">
                      <Image
                        src={hairdresser.img}
                        alt=""
                        fill={true}
                        className="rounded-[20px]"
                      />
                    </div>
                    <p className="text-2xl text-black font-medium text-center sm:text-start mt-1">
                      {hairdresser.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="my-16">
          <p className="text-5xl font-semibold text-black text-center mb-8">
            Avis client
          </p>
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16">
              {Array.from({ length: 6 }, (_, index) => index + 1).map(
                (_, index) => {
                  return (
                    <div
                      key={index}
                      className="relative w-[359px] lg:w-[300px] xl:w-[359px] h-[334px] border border-secondary rounded-2xl"
                    >
                      <div className="flex items-center justify-between px-5 mt-5">
                        <div>
                          <StarRatings
                            rating={4.5}
                            starRatedColor="#000000"
                            starSpacing="4px"
                            starDimension="15px"
                            numberOfStars={5}
                            name="rating"
                          />
                        </div>
                        {index === 0 ? (
                          <QuotationIcon />
                        ) : (
                          <QuotationFillIcon />
                        )}
                      </div>
                      <p className="text-xl font-semibold text-black mb-2 px-5">
                        Perfect application
                      </p>
                      <p className="text-xs px-5">
                        Lorem ipsum dolor sit amet. Ea soluta debitis rem ipsum
                        harum quo facere reprehenderit non veritatis assumenda
                        est rerum alias in iusto reiciendis. Eos internos
                        reiciendis sed atque quos et quae quisquam qui fugiat
                        dolorem eos totam illo et quae quia.
                      </p>
                      <div
                        className={`absolute bottom-0 w-full flex items-center justify-between p-7 lg:py-5 lg:px-3 xl:px-7 rounded-bl-2xl rounded-br-2xl ${
                          index === 0
                            ? "bg-[#F5F5F5] text-black"
                            : "bg-background-gradient text-white"
                        }`}
                      >
                        <div
                          className={`w-20 h-20 rounded-full ${
                            index === 0 ? "bg-[#616161]" : "bg-[#D9D9D9]"
                          }`}
                        />
                        <div>
                          <p className="text-xl font-semibold">
                            Micheal Robertson
                          </p>
                          <p className="text-xl">Coiffeur</p>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
        <div className="pb-16 mt-8">
        <LogoIcon/>
      </div>
      </div>
    </div>
  );
};

export default SearchSalon;
