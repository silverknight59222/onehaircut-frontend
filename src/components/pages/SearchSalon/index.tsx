"use client";
import { client } from "@/api/clientSide";
import Navbar from "@/components/shared/Navbar";
import {
  Instagram,
  LogoIcon,
  QuotationFillIcon,
  QuotationIcon,
} from "@/components/utilis/Icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import userLoader from "@/hooks/useLoader";

interface SearchSalonProps{
  salonId: string
}
interface SalonImages{
  image: string,
  is_cover: boolean
}
interface SalonHairdressers{
  profile_image: string,
  name: string
}
interface SalonProfile{
  name: string,
  rating: string,
  salon_images: SalonImages[],
  salon_hairdressers: SalonHairdressers[],
}
const SearchSalon = ({salonId}: SearchSalonProps) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [salonProfile,setSalonProfile]=useState<SalonProfile>({name: '', rating: '', salon_images:[{image: '', is_cover: true}], salon_hairdressers: [{name: '', profile_image: ''}]})
  const router=useRouter()
  const { loadingView } = userLoader();

  const hours = [
    { title: "Lundi", hours: "Fermé" },
    { title: "Mardi", hours: "10:00 - 19:00" },
    { title: "Mercredi", hours: "10:00 - 19:00" },
    { title: "Jeudi", hours: "10:00 - 19:00" },
    { title: "Vendredi", hours: "10:00 - 19:00" },
    { title: "Samedi", hours: "10:00 - 19:00" },
    { title: "Dimanche", hours: "10:00 - 19:00" },
  ];
  const getAllHairDresser = async () => {
    setIsLoading(true);
    await client.getSalonDetail(salonId)
      .then((resp) => {
        setSalonProfile(resp.data.data[0])
        setIsLoading(false);
    }).catch(error=>{
      console.log(error)
    })
  };
  useEffect(()=>{
    getAllHairDresser()
  },[])
  useEffect(()=>{
    salonProfile.salon_images.forEach((img)=>{
      if(img.is_cover){
        setSelectedImage(img.image)
      }
    })
  },[salonProfile])

  return (
    <div className="relative">
      {isLoading && loadingView()}
      <img src="/assets/registration_bg_bottom.png" className="absolute -bottom-5 w-full"/>
      <Navbar isSalonPage={true}/>
      <div className="mt-16 mb-5 px-5 md:px-10 2xl:px-14">
        <div className="flex flex-col lg:flex-row items-center md:items-start xl:justify-between gap-11">
          <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-8 2xl:gap-12">
            <div>
              <div className="w-[320px] lg:w-[400px] 2xl:w-[483px] h-64 lg:h-80 relative">
                    <Image src={selectedImage.includes('https://api-server.onehaircut.com/public') ? selectedImage : `https://api-server.onehaircut.com/public${selectedImage}`} alt="" fill={true} />
              </div>
              <div className="flex items-center gap-3 mt-3">
                {salonProfile.salon_images.map((img, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedImage(img.image)}
                      className="relative w-24 lg:w-32 2xl:w-36 h-24 lg:h-32 2xl:h-36 cursor-pointer"
                    >
                      <Image src={img.image.includes('https://api-server.onehaircut.com/public') ? img.image : `https://api-server.onehaircut.com/public${img.image}`} alt="" fill={true} />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="md:mt-5">
              <p className="text-black font-bold text-2xl 2xl:text-3xl">
                {salonProfile.name}
              </p>
              <div className="flex items-center gap-1 border-b-2 border-[#DBDBDB] text-xl 2xl:text-2xl font-semibold text-black pb-3 mt-1">
                <StarRatings
                  rating={1}
                  starRatedColor="#FEDF10"
                  starSpacing="4px"
                  starDimension="25px"
                  numberOfStars={1}
                  name="rating"
                />
                <p className="-mb-2">{salonProfile.rating}</p>
                {/* <p>(346 avis)</p> */}
              </div>
            </div>
          </div>
          <div className="w-full md:w-auto flex flex-col items-center justify-center">
            <div className="flex flex-col gap-6 w-full md:w-[350px] xl:w-[420px] 2xl:w-[470px] border border-[#E1E1E1] rounded-3xl py-6 px-8 2xl:px-10 shadow-[0px_4px_24px_0px_rgba(183,183,183,0.25)]">
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
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 2xl:gap-12 mt-20">
            {salonProfile.salon_images.map((img, index) => {
              return (
                <div
                  key={index}
                  className="relative w-full sm:w-[280px] md:w-[315px] xl:w-[390px] 2xl:w-[487px] h-60 md:h-64 xl:h-72 2xl:h-80 bg-[#D9D9D9] rounded-3xl"
                >
                    <Image src={img.image.includes('https://api-server.onehaircut.com/public') ? img.image : `https://api-server.onehaircut.com/public${img.image}`} alt="" fill={true} className="rounded-3xl" />
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
              {salonProfile.salon_hairdressers.map((hairdresser, index) => {
                return (
                  <div key={index}>
                    <div className="relative w-52 lg:w-64 h-52 lg:h-64 rounded-[20px]">
                      <Image
                        src={hairdresser.profile_image && hairdresser.profile_image.includes('https://api-server.onehaircut.com/public') ? hairdresser.profile_image : `https://api-server.onehaircut.com/public${hairdresser.profile_image}`}
                        alt=""
                        fill={true}
                        className="rounded-[20px]"
                      />
                    </div>
                    <p className="text-2xl text-black font-medium text-center mt-1">
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
                      className="relative w-full md:w-[359px] lg:w-[300px] xl:w-[359px] h-[334px] border border-secondary rounded-2xl"
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
                          className={`w-16 sm:w-20 h-16 sm:h-20 rounded-full ${
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
