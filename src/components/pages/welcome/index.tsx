'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Like } from "@/components/utilis/Icons";
import { dashboard } from "@/api/dashboard";
import userLoader from "@/hooks/useLoader";
import { Haircut } from "@/types";
import Navbar from "@/components/shared/Navbar";
import { getLocalStorage } from "@/api/storage";
import { useRouter } from "next/navigation";
const Welcome = () => {
  const { loadingView } = userLoader();
  const [salonHaircut, setSalonHaircut] = useState<Haircut[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedWhishlist,setSelectedWhishlist]=useState<number | null>()
  const router=useRouter()
  const userId=Number(getLocalStorage("User"))
  const [ethnicityFilters, setEthnicityFilters] = useState<string[]>([]);
  const [genderFilters, setGenderFilters] = useState<string>("");
  const [filteredHaircuts, setFilteredHaircuts] = useState<Haircut[]>([]);
  const [search, setSearch] = useState<string>('');

  const getAllHaircuts=()=>{
    setIsLoading(true);
    dashboard.getAllHaircuts()
    .then((res) => {
      console.log(res.data.data)
      if (res.data.data.length > 0) {
        setSalonHaircut(res.data.data);
      }
      setIsLoading(false);
    })
    .catch(error => console.log(error))
  }

  const onWishlist=(e: any, haircutId: number)=>{
    e.stopPropagation()
    const data={
      user_id: userId,
      haircut_id: haircutId
    }
    if(selectedWhishlist !== haircutId){
      setSelectedWhishlist(haircutId)
      dashboard.addWishList(data)
      .catch(err => console.log(err))
    }
    else{
      setSelectedWhishlist(null)
    }
  }


  const getFilteredCuts = () => {
    console.log(genderFilters)
    const haircuts: Haircut[] = [];
    let list=salonHaircut

    if(search) {
      list = list.filter((haircut)=> haircut.name.toLowerCase().includes(search.toLowerCase()) ); 
    }
    if (
      ethnicityFilters.length > 0 && genderFilters
    ) {
      list.forEach((haircut) => {
        ethnicityFilters.forEach((filter) => {
          if (haircut?.group && haircut.group.group === filter) {
            if (haircut.type === genderFilters || genderFilters === 'Mix') {
              haircuts.push(haircut);
            }
          }
        });
      });
    } else if (ethnicityFilters.length > 0 && genderFilters) {
      list.forEach((haircut) => {
        ethnicityFilters.forEach((filter) => {
          if (haircut?.group && haircut.group.group === filter) {
            if (haircut.type === genderFilters || genderFilters === 'Mix') {
              haircuts.push(haircut);
            }
          }
        });
      });
    } else if (ethnicityFilters.length > 0) {
      list.forEach((haircut) => {
        ethnicityFilters.forEach((filter) => {
          if (haircut?.group && haircut.group.group === filter) {
            haircuts.push(haircut);
          }
        });
      });
    } else if (genderFilters) {
      list.forEach((haircut) => {
        if (haircut.type === genderFilters || genderFilters === 'Mix') {
          haircuts.push(haircut);
        }
      });
    }
    if(search && (!(ethnicityFilters.length > 0) && !genderFilters)) {
    setFilteredHaircuts(list);
    } else {
    setFilteredHaircuts(haircuts);
    }
    console.log(haircuts)
  };

  const haircuts = () => {
    if (
      ethnicityFilters.length > 0 ||
      genderFilters ||
      search !== ''
    ) {
      return filteredHaircuts;
    } else {
      return salonHaircut;
    }
  };

  useEffect(() => {
    getFilteredCuts();
  }, [ethnicityFilters, genderFilters, search]);
  
  useEffect(() => {
    getAllHaircuts()
    if (!getLocalStorage("User")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Navbar isWelcomePage={true} onSearch={(value: string)=>setSearch(value)} onGenderFilter={(gender)=>setGenderFilters(gender)} onEthnicityFilters={(groups)=>setEthnicityFilters(groups)} />
      <div className="flex flex-col items-center justify-center w-full overflow-hidden">
        {isLoading && loadingView()}
        <p className="mt-10 sm:mt-14 mb-10  md:w-[700px] text-black text-center font-semibold text-3xl px-2 md:px-10">
          Des doutes sur la finition? prévisualiser votre style
        </p>
        <div className="flex flex-col md:flex-row gap-4 mb-10 sm:mb-12">
          <div className="px-4 py-6 rounded-2xl font-medium text-2xl cursor-pointer border-[#FE3462] border-2">
            Prestation Unique / soins
          </div>
          <div className="px-4 py-6 rounded-2xl font-medium text-2xl cursor-pointer border-[#FE3462] border-2">
            Coiffure pour Evennement
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-24">
          {haircuts().map((item, index) => {
            return <div key={index} onClick={() => router.push('/salons')} className="shadow-md rounded-xl my-2 cursor-pointer border hover:border-secondary">
              <div className="relative w-max px-4 pt-4 bg-[#F5F5F5] rounded-t-xl">
                <div className="relative w-48 h-48">
                  <Image src={item.image} fill={true} alt="" className="rounded-t-xl" />
                  <div onClick={(e) => onWishlist(e, item.id)} className="absolute right-2 top-2 cursor-pointer">
                    <Like color={selectedWhishlist === item.id ? "#FF0000" : ""} />
                  </div>
                </div>
              </div>
              <div className="rounded-b-xl bg-gradient-to-r from-pinkGradientFrom via-pinkGradientVia to-pinkGradientTo">
                <p className="rounded-b-xl flex items-center justify-center py-2 text-black font-medium">
                  {item.name}
                </p>
              </div>
            </div>
          })}
        </div>
        {isLoggedIn && (
          <div className="flex py-4 mx-3 gap-3 sm:gap-12 md:gap-20 items-center justify-center bg-white w-full fixed bottom-0">
            <div className="p-2 sm:p-4 md:p-5 text-center border-[#FE3462] border-2 rounded-2xl cursor-pointer ml-3">
              Démonstration d’utilisation
            </div>
            <div className="p-2 sm:p-4 md:p-5 text-white text-center rounded-2xl cursor-pointer bg-gradient-to-r from-primaryGradientFrom via-primaryGradientVia to-primaryGradientTo">
              Connexion / Inscription
            </div>
            <div className="p-2 sm:p-4 md:p-5 text-center border-[#FE3462] border-2 rounded-2xl cursor-pointer mr-3">
              Envie d’offrir un cadeau ?
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Welcome;
