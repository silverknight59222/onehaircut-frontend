"use client";
import Navbar from "@/components/shared/Navbar";
import { Like } from "@/components/utilis/Icons";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import userLoader from "@/hooks/useLoader";
import { dashboard } from "@/api/dashboard";
import { Haircut } from "@/types";
import { getLocalStorage } from "@/api/storage";

const Wishlist = () => {
    const { loadingView } = userLoader();
    const [isLoading, setIsLoading] = useState(false);
    const [haircuts, setHaircuts] = useState<Haircut[]>([]);
    const userId=Number(getLocalStorage("User"))
    const items=[
        {name:'abc', img:'/assets/img1.png'},
        {name:'abc', img:'/assets/img1.png'},
        {name:'abc', img:'/assets/img1.png'},
        {name:'abc', img:'/assets/img1.png'},
        {name:'abc', img:'/assets/img1.png'},
        {name:'abc', img:'/assets/img1.png'},
    ]

    const getWishlistHaircuts=()=>{
        setIsLoading(true);
        dashboard.getWishlistHaircuts(userId)
        .then((res) => {
            console.log(res.data.data)
          if (res.data.data.length > 0) {
            setHaircuts(res.data.data);
          }
          
          setIsLoading(false);
        })
        .catch(error => console.log(error))
      }

      useEffect(()=>{
        getWishlistHaircuts()
      },[])
  return (
    <div>
      <Navbar />
      <div>
      {isLoading && loadingView()}
        <p className="mt-10 sm:mt-14 mb-8 text-black text-center font-semibold text-3xl">
          Wishlist
        </p>
        <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 gap-x-10">
            {haircuts.map((item,index)=>{
                return <div key={index} className="shadow-md rounded-xl my-2 cursor-pointer">
                <div className="relative w-max px-4 pt-4 bg-[#F5F5F5] rounded-t-xl">
                  <div className="relative w-48 h-48">
                    <Image src={item.haircut.image} fill={true} alt="" />
                    <div className="absolute right-2 top-3 cursor-pointer">
                      <Like color="#FF0000" />
                    </div>
                  </div>
                </div>
                <div className="rounded-b-xl bg-gradient-to-r from-pinkGradientFrom via-pinkGradientVia to-pinkGradientTo">
                  <p className="rounded-b-xl flex items-center justify-center py-3 text-black font-medium">
                    {item.haircut.name}
                  </p>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
