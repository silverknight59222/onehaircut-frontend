"use client";
import { SalonRegisterParams, registration } from "@/api/registration";
import { AddIcon, EyeClosedIcon, EyeIcon, LogoIcon } from "@/components/utilis/Icons";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import userLoader from "@/hooks/useLoader";
import useSnackbar from "@/hooks/useSnackbar";
import { getLocalStorage, setLocalStorage } from "@/api/storage";
import UserProfile from "@/components/UI/UserProfile";
//import PhoneInput from 'react-phone-number-input'
import { Value } from 'react-phone-number-input'
import { Theme_A } from "@/components/utilis/Themes";
import CustomInput from "@/components/UI/CustomInput";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';


const inputFieldsDesignNoW = `border-2 border-stone-200 p-1 placeholder:text-[#959595] placeholder:text-base ${Theme_A.behaviour.fieldFocused}${Theme_A.fields.inputField}`

const Step3 = () => {
  const showSnackbar = useSnackbar();
  const { loadingView } = userLoader();
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    phone: '',
    dob: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    phone: '',
    dob: '',
  });

  const onChangeName = (value: string) => {
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
  const onChangeEmail = (value: string) => {
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

  // const setPhone = (value: string) => {

  //   if (value && isValidPhoneNumber(value) === true) {
  //     setError((prev) => {
  //       return { ...prev, phone: "" };
  //     });
  //     setUserDetails((prevState) => ({
  //       ...prevState,
  //       phone: value,
  //     }));

  //   } else {
  //     setError((prev) => {
  //       return { ...prev, phone: "Entrer un numéro valide" };
  //     });
  //   }    

  // }

  // const setFocus = () => {    
  //   document.querySelector<HTMLInputElement>(`div[id=phone-custom]`)?.focus()
  // }

  //-----------------------------------------------------------------------------
  //                            PASSWORD
  //-----------------------------------------------------------------------------
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const onChangePassword = (value: string) => {
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

  const onChangePassword2 = (value: string) => {
    if (!value.length) {
      setError((prev) => {
        return { ...prev, password2: "Répéter le mot de passe" };
      });
    } else {
      setError((prev) => {
        return { ...prev, password2: "" };
      });
    }
    setUserDetails((prevState) => ({
      ...prevState,
      password2: value,
    }));
  }


  //-----------------------------------------------------------------------------
  //                            Date of birth
  //-----------------------------------------------------------------------------
  const onChangeDob = (dob) => {
    if (!dob) {
      setError((prevError) => ({
        ...prevError,
        dob: "Date of birth is required",
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        dob: "", // Clear dob error if valid
      }));
    }
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      dob: dob,
    }));
  };

  const onPhoneCheck = () => {
    const phone = userDetails.phone
    let valid = false; // 
    // check first numbers
    console.log(phone[0])
    console.log(phone[1])
    if (phone[0] != "+") { // doesn't start with 0
      setError((prev) => {
        return { ...prev, phone: "Entrer un numéro valide" };
      });
    } else if (phone[1] != '0') {
      if (phone.length < 6) {
        // too short
        setError((prev) => {
          return { ...prev, phone: "Numéro trop court" };
        });
      } else if (phone.length > 10) {
        setError((prev) => {
          return { ...prev, phone: "Numéro trop long" };
        });
      }
      else {
        // number is fine
        setError((prev) => {
          return { ...prev, phone: "" };
        })
        valid = true;
      }
    } else {
      console.log('yes international')
      // international number
      if (phone.length < 6) {
        // too short
        setError((prev) => {
          return { ...prev, phone: "Numéro trop court" };
        });
      } else if (phone.length > 16) {
        setError((prev) => {
          return { ...prev, phone: "Numéro trop long" };
        });
      } else {
        // number is fine
        setError((prev) => {
          return { ...prev, phone: "" };
        })
        valid = true;
      }
    }

    return valid;
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

    // Check date of birth
    if (!userDetails.dob) {
      setError((prevError) => ({
        ...prevError,
        dob: "Date de naissance est requise",
      }));
      isValidated = false;
    } else {
      // Parse user's date of birth and calculate the date 16 years ago
      const userDob = new Date(userDetails.dob);
      const sixteenYearsAgo = new Date();
      sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() - 16);

      // Compare the user's date of birth with the date 16 years ago
      if (userDob > sixteenYearsAgo) {
        setError((prevError) => ({
          ...prevError,
          dob: "Date de naissance invalide (doit être au moins 16 ans)",
        }));
        isValidated = false;
      } else {
        setError((prevError) => ({
          ...prevError,
          dob: "", // Clear dob error if valid
        }));
      }
    }


    //check phone
    // if (!onPhoneCheck()) {
    //   isValidated = false;
    // }

    // Check password
    if (!userDetails.password) {
      setError((prev) => {
        return { ...prev, password: "Un password est requis" };
      });
      isValidated = false;
    } else if (userDetails.password2 !== userDetails.password) {
      setError((prev) => {
        return { ...prev, password2: "Les mots de passe ne correspondent pas" };
      });
      isValidated = false;
    }
    else {
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
    await registration.createIntent(userDetails).then(async (res) => {
      let data: any = userDetails;
      data.id = res.data.user.id;
      data.token = res.data.token;
      setLocalStorage('user_Info', JSON.stringify(data));
      setLocalStorage("user", JSON.stringify(res.data.user));
      if (res.data.intent.client_secret) {
        setLocalStorage('secret_key', res.data.intent.client_secret);
      }
      const planType = JSON.parse(getLocalStorage('plan_type') as string);
      if (planType && planType.name === 'OneHaircut Regular') {
        let salonData: SalonRegisterParams = {
          user_id: "",
          salon_name: "",
          salon_description: "",
          country: '',
          city: '',
          state: '',
          zone_radius: 0,
          lat: 0,
          long: 0,
          salon_type: "",
          payment_method: "",
          plan_id: "",
          plan_name: "",
          plan_slug: "",
          street: "",
          postalCode: "",
          isMobile: false,
          dob: "",
          country_code: "",
        }
        const userInfo = JSON.parse(getLocalStorage("user_Info") as string);
        const salonName = getLocalStorage("salon_name") as string;
        const salonAddress = JSON.parse(getLocalStorage("salon_address") as string);
        const salonType = getLocalStorage("salon_type") as string;
        const planType = JSON.parse(getLocalStorage("plan_type") as string);
        salonData.user_id = userInfo?.id;
        salonData.salon_name = salonName;
        salonData.salon_description = 'Description text here';
        salonData.country = salonAddress.country
        salonData.state = salonAddress.state
        salonData.city = salonAddress.city
        salonData.lat = salonAddress.lat
        salonData.long = salonAddress.long
        salonData.zone_radius = salonAddress.zone
        salonData.salon_type = salonType;
        salonData.payment_method = "NA";
        salonData.plan_id = planType.plan_id;
        salonData.plan_name = planType.name;
        salonData.plan_slug = planType.slug;
        salonData.street = salonAddress.street;
        salonData.postalCode = salonAddress.postalCode;
        salonData.isMobile = salonAddress.isMobile;
        salonData.country_code = salonAddress.country_code;
        salonData.dob = userInfo?.dob
        await registration
          .registerSalon(salonData)
          .then((res) => {
            showSnackbar("success", "Salon successfully created");
            router.push("/verification");
          })
          .catch((err) => {
            showSnackbar("error", "Error Occured!");
          }).finally(() => {
            setIsLoading(false);
          });
      } else {
        router.push("/registration/steps/4");
      }
    }).catch(err => {
      showSnackbar("erreur", "Email déjà utilisé");
    }).finally(() => {
      setIsLoading(false);
    })
  }

  const setNewPhone = (value?: Value) => {
    if (value != undefined) {
      setUserDetails((prevState) => ({
        ...prevState,
        phone: value,
      }))
    }
  };


  return (
    <div >
      {isLoading && loadingView()}
      <div className="flex flex-col md:flex-row items-center justify-center border-b border-[#EBF0F2] pb-4 ">
        <div className="absolute top-1 flex items-center justify-start sm:justify-center w-full gap-5 px-4 sm:px-14 py-5 ">
          <div onClick={() => router.push('/')} className='relative z-30 cursor-pointer'><LogoIcon className={''} /></div>
        </div>
        {/* <div className="relative z-20 w-full flex items-center justify-end gap-4 px-4 sm:px-14 mt-6">
          <UserProfile />
        </div> */}
      </div>
      <div className="w-full flex-col gap-10 flex items-center justify-center px-3 ">
        <div className="mt-20 ">
          <div className="flex items-center justify-center w-full font-medium text-xl md:text-2xl lg:text-3xl text-center ">Il faut maintenant renseigner tes information personnelles</div>
        </div>
        <div className="flex flex-col gap-8 w-full sm:w-[500px] shadow-md shadow-stone-300 p-20 rounded-2xl ">
          <div className="w-full">
            <CustomInput
              type="text"
              value={userDetails.name}
              onChange={(e) => onChangeName(e.target.value)}
              id={"Name"}
              label={"Nom"} />
            {error.name && (
              <p className="text-xs text-red-700 ml-3 mt-1">{error.name}*</p>
            )}
          </div>
          <div className="w-full">
            <CustomInput
              type="text"
              value={userDetails.email}
              onChange={(e) => onChangeEmail(e.target.value)}
              id={"Email"}

              label={"Email"} />
            {error.email && (
              <p className="text-xs text-red-700 ml-3 mt-1">{error.email}*</p>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
              Date de naissance
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={userDetails.dob}
              onChange={(e) => onChangeDob(e.target.value)}
              className={`w-full h-[50px] mr-2 ${Theme_A.fields.configurationField2} text-sm peer`}
            />

            {error.dob && (
              <p className="text-xs text-red-700 ml-3 mt-1">{error.dob}*</p>
            )}
          </div>
          <div className="w-full">
            <div className="flex-col items-center justify-center gap-4 ">


              {/* This component come from : https://morioh.com/a/2d3761b299fd/highly-customizable-phone-input-component-with-auto-formatting*/}
              <PhoneInput
                value={userDetails.phone}
                onChange={(value) => {
                  setNewPhone(value)
                  setError((prev) => {
                    return { ...prev, phone: "" };
                  })
                }
                }
                placeholder="Tel"
                country={'fr'}
                inputProps={{
                  name: 'Tel',
                  required: true,
                  autoFocus: true,
                  placeholder: 'Tel: '
                }}
                inputStyle={{
                  width: '100%', // prend toute la largeur de son conteneur
                  height: '50px', // hauteur réduite
                  borderColor: "#ccc",

                }}

              //regions={'europe'}
              //onlyCountries={['de', 'es', 'fr', 'it']}
              />

            </div>
            {error.phone && (
              <p className="text-xs text-red-700 ml-3 mt-1">{error.phone}*</p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="w-full">
            <div className="w-full h-[58px] rounded-[11px] bg-white flex items-center">
              <div className="flex-grow">
                <CustomInput
                  id="passwordInput"
                  label="Mot de passe"
                  type={showPassword ? "text" : "password"}
                  value={userDetails.password}
                  onChange={(e) => onChangePassword(e.target.value)}
                  error={error.password}
                />
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-2 flex-none outline-none focus:outline-none"
                >
                  {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="w-full h-[58px] rounded-[11px] bg-white flex items-center">
              <div className="flex-grow">
                <CustomInput
                  id="passwordInput2"
                  label="Répéter le mot de passe"
                  type={showPassword2 ? "text" : "password"}
                  value={userDetails.password2}
                  onChange={(e) => onChangePassword2(e.target.value)}
                  error={error.password2}
                />
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => setShowPassword2(!showPassword2)}
                  className="p-2 flex-none outline-none focus:outline-none"
                >
                  {showPassword2 ? <EyeClosedIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-7 mb-5">
          <button
            onClick={() => router.push("/registration/steps/2")}
            className={`${Theme_A.button.bigWhiteColoredButton}`}
          >
            Etape précédente
          </button>
          <button
            onClick={() => onSubmit()}
            // disabled={!address.country}
            aria-label="Continue"
            className={`${userDetails.email != '' && userDetails.name != '' && userDetails.password != '' && userDetails.phone != '' ? Theme_A.button.bigGradientButton : Theme_A.button.bigGreyButton} `}
          >
            Continuons !
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3;
