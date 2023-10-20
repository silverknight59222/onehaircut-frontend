import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Auth } from "@/api/auth";
import userLoader from "@/hooks/useLoader";
import useSnackbar from "@/hooks/useSnackbar";
import { LogoCircleFixLeft, LogoIcon } from "@/components/utilis/Icons";
import Link from "next/link";
import { Theme_A } from "@/components/utilis/Themes";

const Reset = ({email,token}:any) => 
{
  const router = useRouter();
  const showSnackbar = useSnackbar();
  const { loadingView } = userLoader();

  const defaultUserInfo = {
    password: "",
    password_confirmation: "",
    email:email,
    token:token,
  };

  const [error, setError] = useState({
    password: "",
    password_confirmation: "",
  });

  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const [isLoading, setIsLoading] = useState(false);

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

  const validatePassword = () => {
    let isValidated = true;
    if (!userInfo.password) {
      setError((prev) => {
        return { ...prev, password: "Un nouveau mot de passe est requis" };
      });
      isValidated = false;
    } else {
      setError((prev) => {
        return { ...prev, password: "" };
      });

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
    }}

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
              <p className="text-black font-medium text-3xl my-8 md:my-12">
                Connexion
              </p>

              <div className="w-full mt-6">
                <label
                  className="block text-left text-black mb-2 font-medium"
                  htmlFor="passwordInput"
                >
                  Nouveau mot de passe
                </label>
                <div className="w-full h-[60px] p-[1px] flex items-center justify-center rounded-xl bg-stone-300">
                  <div className="w-full h-[58px] rounded-[11px] bg-white flex items-center justify-center">
                    <input
                      id="passwordInput"
                      type="password"
                      placeholder="Nouveau mot de passe"
                      className={`w-full h-[58px] rounded-[11px] outline-none px-4 ${Theme_A.behaviour.fieldFocused}`}
                      value={userInfo.password}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>
                {error.password && (
                  <p className="text-xs text-red-700 ml-4 mt-2">
                    {error.password}*
                  </p>
                )}
              </div>
              <div className="w-full mt-6">
                <label
                  className="block text-left text-black mb-2 font-medium"
                  htmlFor="confirmPasswordInput"
                >
                  Confirmer le mot de passe
                </label>
                <div className="w-full h-[60px] p-[1px] flex items-center justify-center rounded-xl bg-stone-300">
                  <div className="w-full h-[58px] rounded-[11px] bg-white flex items-center justify-center">
                    <input
                      id="confirmPasswordInput"
                      type="password"
                      placeholder="Confirmer le mot de passe"
                      className={`w-full h-[58px] rounded-[11px] outline-none px-4 ${Theme_A.behaviour.fieldFocused}`}
                      value={userInfo.password_confirmation}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                {error.password_confirmation && (
                  <p className="text-xs text-red-700 ml-4 mt-2">
                    {error.password_confirmation}*
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
            <hr className="my-4"/>
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
        </div>
      </>
    );
  };


export default Reset;