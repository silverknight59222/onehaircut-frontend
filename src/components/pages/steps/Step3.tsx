"use client";
import { registration } from "@/api/registration";
import { AddIcon, LogoIcon, UserIcon } from "@/components/utilis/Icons";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import userLoader from "@/hooks/useLoader";
import useSnackbar from "@/hooks/useSnackbar";
import { getLocalStorage, setLocalStorage } from "@/api/storage";

const Step3 = () => {
  const showSnackbar = useSnackbar();
  const { loadingView } = userLoader();
  const route = useRouter();
  const [userDetails, setUserDetails] = useState({
    name:'',
    email:'',
    password:'',
    phone:''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    name:'',
    email:'',
    password:'',
    phone:''
  });
  const onChangeName = (value:string) => {
    if (!value.length) {
      setError((prev) => {
        return { ...prev, name: "Un nom est requis" };
      });
    } else {
      setError((prev) => {
        return { ...prev, name: "" };
      });
    }
    setUserDetails((prevState) => ({
      ...prevState,
      name: value,
    }));
  }
  const onChangeEmail = (value:string) => {
    if (!value.length) {
      setError((prev) => {
        return { ...prev, email: "Un e-mail est requis" };
      });
    } else {
      setError((prev) => {
        return { ...prev, email: "" };
      });
    }
    setUserDetails((prevState) => ({
      ...prevState,
      email: value,
    }));
    
  }
  const onChangePassword = (value:string) => {
    if (!value.length) {
      setError((prev) => {
        return { ...prev, password: "Un password est requis" };
      });
    } else {
      setError((prev) => {
        return { ...prev, password: "" };
      });
    }
    setUserDetails((prevState) => ({
      ...prevState,
      password: value,
    }));
  }
  const onChangePhone = (value:string) => {
    if (!value.length) {
      setError((prev) => {
        return { ...prev, phone: "Un phone est requis" };
      });
    } else {
      setError((prev) => {
        return { ...prev, phone: "" };
      });
    }
    setUserDetails((prevState) => ({
      ...prevState,
      phone: value,
    }));
  }
  const validateForm = () => {
    let isValidated = true;
    if (!userDetails.name) {
      setError((prev) => {
        return { ...prev, name: "Le nom est requis" };
      });
      isValidated = false;
    } else {
      setError((prev) => {
        return { ...prev, name: "" };
      });
    }
    if (!userDetails.email) {
      setError((prev) => {
        return { ...prev, email: "Un e-mail est requis" };
      });
      isValidated = false;
    } else {
      setError((prev) => {
        return { ...prev, email: "" };
      });
    }
    if (!userDetails.phone) {
      setError((prev) => {
        return { ...prev, phone: "Le phone est requis" };
      });
      isValidated = false;
    } else {
      setError((prev) => {
        return { ...prev, phone: "" };
      });
    }
    if (!userDetails.password) {
      setError((prev) => {
        return { ...prev, password: "Un password est requis" };
      });
      isValidated = false;
    } else {
      setError((prev) => {
        return { ...prev, password: "" };
      });
    }
    return isValidated;
  };

  const onSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    await registration.createIntent(userDetails).then(res=>{
      console.log(res.data.intent.client_secret)
      if(res.data.intent.client_secret) {
        setLocalStorage('secret_key', res.data.intent.client_secret);
      }
      const planType = getLocalStorage('planType');
      if(planType && planType === 'standard') {
        route.push("/registration/steps/5");
      } else {
        route.push("/registration/steps/4");
      }
    }).catch(err=>{
      showSnackbar("error", "Error Occured!");
    }).finally(()=>{
      setIsLoading(false);
    })
  }
  return (
    <div>
      {isLoading && loadingView()}
      <div className="flex flex-col md:flex-row items-center justify-center border-b border-[#EBF0F2] pb-3">
        <div className="absolute top-1 flex items-center justify-start sm:justify-center w-full gap-5 px-10 sm:px-14 py-5">
          <LogoIcon />
        </div>
        <div className="w-full flex items-center justify-end gap-4 px-4 sm:px-14 mt-5">
          <div className="w-14 h-14 flex items-center justify-center pb-1 border-2 border-secondary rounded-full cursor-pointer">
            <UserIcon />
          </div>
        </div>
      </div>
      <div className="w-full flex-col gap-10 flex items-center justify-center px-3">
      <div className="mt-20">
        <div className="flex items-center justify-center w-full font-medium text-xl md:text-2xl lg:text-3xl text-center ">Il faut maintenant renseigner tes information personnelles</div>
      </div>
      <div className="flex flex-col items-center justify-center gap-5 max-w-96">
        <div className="w-full">
          <input type="text" className="bg-[#EEEEEE] text-base py-3 px-4 rounded-lg outline-none w-full" placeholder="Nom" value={userDetails.name} onChange={(e)=>onChangeName(e.target.value)}/>
        {error.name && (
              <p className="text-xs text-red-700 ml-3 mt-1">{error.name}*</p>
            )}
        </div>
        <div className="w-full">
        <input type="text" className="bg-[#EEEEEE] text-base py-3 px-4 rounded-lg outline-none w-full" placeholder="Email" value={userDetails.email} onChange={(e)=>onChangeEmail(e.target.value)}/>
        {error.email && (
              <p className="text-xs text-red-700 ml-3 mt-1">{error.email}*</p>
            )}
        </div>
        <div className="relative w-full">
        <input type="text" className="relative pl-16 bg-[#EEEEEE] text-base py-3 px-4 rounded-r-lg outline-none w-full" placeholder="Phone" value={userDetails.phone} onChange={(e)=>onChangePhone(e.target.value)}/>
        {error.phone && (
              <p className="text-xs text-red-700 ml-3 mt-1">{error.phone}*</p>
            )}
        <div className="absolute top-[0px] rounded-l-lg bg-[#FE5153] pt-[12px] pb-[15px] px-4"><AddIcon/></div>
        </div>
        <div className="w-full">
        <input type="text" className="bg-[#EEEEEE] text-base py-3 px-4 rounded-lg outline-none w-full" placeholder="Password" value={userDetails.password} onChange={(e)=>onChangePassword(e.target.value)}/>
        {error.password && (
              <p className="text-xs text-red-700 ml-3 mt-1">{error.password}*</p>
            )}
        </div>
      </div>
       <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-7 mb-5">
            <button
              onClick={() => route.push("/registration/steps/2")}
              className="border border-secondary w-72 sm:w-64 h-14 rounded-xl text-secondary font-semibold text-xl"
            >
              Etape précédente
            </button>
            <button
              onClick={() => onSubmit()}
              className="text-white font-medium text-xl rounded-xl w-72 sm:w-64 h-14 bg-background-gradient shadow-[0px_14px_24px_0px_rgba(255,125,60,0.25)]"
            >
              Continuons !
            </button>
          </div>
      </div>
    </div>
  );
};

export default Step3;
