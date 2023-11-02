import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Auth } from "@/api/auth";
import userLoader from "@/hooks/useLoader";
import useSnackbar from "@/hooks/useSnackbar";
import { LogoCircleFixLeft, LogoIcon } from "@/components/utilis/Icons";
import Link from "next/link";
import { ColorsThemeA, Theme_A } from "@/components/utilis/Themes";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Reset = ({ email, token }: any) => {
  const router = useRouter();
  const showSnackbar = useSnackbar();
  const { loadingView } = userLoader();

  const defaultUserInfo = {
    password: "",
    password_confirmation: "",
    email: email,
    token: token,
  };

  const [error, setError] = useState({
    password: "",
    password_confirmation: "",
  });
  const inputFieldsDesign = `w-full p-3 placeholder:text-[#959595] placeholder:text-base ${ColorsThemeA.ohcBorder} ${Theme_A.behaviour.fieldFocused_B}${Theme_A.fields.inputField}`
  const inputFieldsDesignNoW = `border-2 border-red-500 p-3 placeholder:text-[#959595] placeholder:text-base ${Theme_A.behaviour.fieldFocused_B}${Theme_A.fields.inputField}`
  
  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [newPasswordVisibility, setNewPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);
  const setNewPassword = (password: string) => {
    setUserInfo((prevState) => ({
      ...prevState,
      password: password,
    }));
  };

  const setConfirmPassword = (password: string) => {
    setUserInfo((prevState) => ({
      ...prevState,
      password_confirmation: password,
    }));
  };
  const togglePasswordVisibility = (field: string) => {
    switch (field) {
      case 'newPassword':
        setNewPasswordVisibility((prev) => !prev);
        break;
      case 'confirmPassword':
        setConfirmPasswordVisibility((prev) => !prev);
        break;
      default:
        break;
    }
  };
  
  const validatePassword = () => {
    let isValidated = true;
    if (!userInfo.password) {
      setError((prev) => {
        return { ...prev, password: "Un mot de passe d'au moins 8 caractères est requis" };
      });
      isValidated = false;
    } else {
      setError((prev) => {
        return { ...prev, password: "" };
      });
      if (userInfo.password.length < 8) {
        setError((prev) => {
          return { ...prev, password: "Le mot de passe doit comporter 8 caractères" };
        });
        isValidated = false;
      }
      if (userInfo.password !== userInfo.password_confirmation) {
        setError((prev) => {
          return {
            ...prev,
            password_confirmation: "Les mots de passe ne correspondent pas",
          };
        });
        isValidated = false;
      } else {
        setError((prev) => {
          return { ...prev, password_confirmation: "" };
        });
      }

      return isValidated;
    }
  }

  useEffect(() => {
    localStorage.removeItem("user")
    localStorage.removeItem("auth-token")
    router.push(`/forgot?token=${token}&email=${email}`);
  }, [])

  const onReset = async () => {
    if (!validatePassword()) {
      return;
    }
    setIsLoading(true);
    await Auth.reset(userInfo)
      .then((resp) => {
        const res = resp.data;
        console.log(res);
        router.push("/login");
        showSnackbar(
          "success",
          res.message
        );
      })
      .catch((err) => {
        showSnackbar(
          "error",
          "Le mot de passe et l'adresse e-mail sont obligatoires."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && loadingView()}
      <div className="w-full flex flex-col items-center min-h-screen bg-white md:bg-transparent">
        <div className="hidden md:block fixed -left-32 md:-left-28 -bottom-32 md:-bottom-28">
          <LogoCircleFixLeft />
        </div>
        <div className="mt-8">
          <LogoIcon />
        </div>
        <div className="z-10 mt-8 md:mt-12 w-full md:w-[767px] md:rounded-3xl md:bg-white md:shadow-2xl px-4 sm:px-16 md:px-24">
          <div className="flex flex-col items-center justify-center">
 
            <div className="w-full mt-10">
              <div className="flex w-full flex-col items-center justify-center gap-4 mb-10">
                <p className="text-xl w-fullfont-semibold text-black text-center">Modification du mot de passe</p>
                </div>
                <TextField 
                  className={` ${inputFieldsDesign}`}
                  id="passwordInput"
                  label="Nouveau mot de passe"
                  type={newPasswordVisibility ? 'text' : 'password'}
                  variant="outlined"
                  value={userInfo.password}
                  onChange={(e) => {
                    setNewPassword(e.target.value)
                  }}
                  InputProps={{
                    style: {
                      borderRadius: '12px',
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => togglePasswordVisibility('newPassword')}>
                          {newPasswordVisibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                 {error.password && (
                  <p className={`w-full text-xs text-red-700 ml-10 mt-2`}>
                     {error.password.trim()}
                  </p>
                )}
                
            </div>
              <div className="w-full mt-5">
                <TextField 
                  className={`${inputFieldsDesign}`}
                  id="confirmPasswordInput"
                  label="Confirmer le mot de passe"
                  type={confirmPasswordVisibility ? 'text' : 'password'}
                  variant="outlined"
                  value={userInfo.password_confirmation}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                  }}
                  InputProps={{
                    style: {
                      borderRadius: '12px',
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => togglePasswordVisibility('confirmPassword')}>
                          {confirmPasswordVisibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                 {(error.password_confirmation || error.password) && (
                  <p className={`w-full text-xs text-red-700 ml-10 mt-2`}>
                    
                     {error.password_confirmation?error.password_confirmation.trim():error.password}
                  </p>
                )}
              
              </div>
              <button
                className="text-white font-medium text-xl rounded-xl w-full h-14 my-6 bg-gradient-to-r from-primaryGradientFrom via-primaryGradientVia to-primaryGradientTo shadow-[0px_7px_12px_0px_rgba(255,125,60,0.25)] transform hover:scale-105"
                onClick={onReset}
              >
                <p>Connexion</p>
              </button>
            </div>
            <hr className="my-4" />
            <div className="w-full flex flex-row items-end justify-between gap-2 mt-4 mb-4">
              <div className="flex items-center gap-2">
                <p className="text-black text-base border-b border-black transition duration-150 hover:border-secondary hover:text-secondary">
                  <Link href={{ pathname: '/signup' }}>Première connexion ?</Link>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-black text-base border-b border-black transition duration-150 hover:border-secondary hover:text-secondary">
                  <Link href={{ pathname: '/login' }}>Login ?</Link>
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-10 sm:mb-12 mt-10">
              <div className="w-full h-[120px] p-4 rounded-2xl bg-slate-50 flex flex-col justify-center items-center border-zinc-300 border-2">
                <div className="font-medium text-md mb-2">
                  Vous êtes un professionnel et n'avez pas encore de compte ?
                </div>
                <hr className="my-2 w-full" />
                <p className="text-black text-lg font-semibold hover:text-secondary transform hover:scale-110 transition-transform">
                  <Link
                    href={{ pathname: "/registration" }}
                    className="border-b border-black hover:border-secondary"
                  >
                    Enregistrer mon salon ?
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div >
      </>
      );
};


      export default Reset;
