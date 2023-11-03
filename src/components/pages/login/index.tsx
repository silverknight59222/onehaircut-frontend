import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from 'next/image'
import { Auth } from "@/api/auth";
import { getLocalStorage, setLocalStorage } from "@/api/storage";
import userLoader from '@/hooks/useLoader';
import useSnackbar from '@/hooks/useSnackbar';
import { LogoCircleFixLeft, LogoIcon } from "@/components/utilis/Icons";
import Link from "next/link";
import { EyeIcon, EyeClosedIcon } from "@/components/utilis/Icons";
import { Theme_A } from "@/components/utilis/Themes";

const Login = () => {
	const router = useRouter();
	const showSnackbar = useSnackbar();
	const { loadingView } = userLoader();
	const [showPassword, setShowPassword] = useState(false);
	const searchParams = useSearchParams()

	const defaultUserInfo = {
		email: "dummy@user.com",
		password: "password",
	};
	const [error, setError] = useState({
		email: '',
		password: ''
	})
	const [userInfo, setUserInfo] = useState(defaultUserInfo);
	const [isLoading, setIsLoading] = useState(false);

	const setUserMail = (e: string) => {
		if (!e.length) {
			setError((prev => {
				return { ...prev, email: 'Un e-mail est requis' }
			}))
		} else {
			setError((prev => {
				return { ...prev, email: '' }
			}))
		}
		setUserInfo((prevState) => ({
			...prevState,
			email: e,
		}));
	};
	const setUserPassword = (e: string) => {
		if (!e.length) {
			setError((prev => {
				return { ...prev, password: 'Mot de passe requis' }
			}))
		} else {
			setError((prev => {
				return { ...prev, password: '' }
			}))
		}
		setUserInfo((prevState) => ({
			...prevState,
			password: e,
		}));
	};
	const validateLogin = () => {
		let isValidated = true;
		if (!userInfo.email) {
			setError((prev => {
				return { ...prev, email: 'Un e-mail est requis' }
			}))
			isValidated = false;
		} else {
			setError((prev => {
				return { ...prev, email: '' }
			}))
		}
		if (!userInfo.password) {
			setError((prev => {
				return { ...prev, password: 'Mot de passe requis' }
			}))
			isValidated = false;
		} else {
			setError((prev => {
				return { ...prev, password: '' }
			}))
		}
		return isValidated;
	}
	const onLogin = async () => {
		setIsLoading(true);

		// Check for dummy credentials
		if (userInfo.email === "dummy@user.com" && userInfo.password === "password") {
			setLocalStorage("user", JSON.stringify({ name: "Dummy User", role: "salon_professional" }));
			setLocalStorage("auth-token", "dummy_token_123456");
			const myaRole= 'salon_professional'
			if (searchParams.get('redirect') === 'payment') {
				router.push("/payment");
			} else if (myaRole === 'salon_professional') {
				router.push("/dashboard");
			} else {
				router.push("/client/dashboard");
			}

			setIsLoading(false);
		} else {
			setIsLoading(false);
			showSnackbar('error', 'Le mot de passe et l\'adresse e-mail sont obligatoires.');
		}
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
							<label className="block text-left text-black mb-2 font-medium" htmlFor="emailInput">Adresse email</label>
							<div className="w-full h-[60px] p-[1px] flex items-center justify-center rounded-xl bg-stone-300 ">
								<div className="w-full h-[58px] rounded-[11px] bg-white flex items-center justify-center">
									<input
										id="emailInput"
										placeholder="Adresse email"
										className={`w-full h-[58px] rounded-[11px] outline-none px-4 ${Theme_A.behaviour.fieldFocused}`}
										value={userInfo.email}
										onChange={(e) => setUserMail(e.target.value)}
									/>
								</div>
							</div>
							{error.email && <p className="text-xs text-red-700 ml-4 mt-2">{error.email}*</p>}
						</div>
						<div className="w-full mt-6">
							<label className="block text-left text-black mb-2 font-medium" htmlFor="passwordInput">Mot de passe</label>
							<div className="w-full h-[60px] p-[1px] flex items-center justify-center rounded-xl bg-stone-300 ">
								<div className="w-full h-[58px] rounded-[11px] bg-white flex items-center justify-between">
									<input
										id="passwordInput"
										placeholder="Mot de passe"
										type={showPassword ? "text" : "password"}
										className={`w-full h-[58px] rounded-l-[11px] outline-none px-4 ${Theme_A.behaviour.fieldFocused}`}
										value={userInfo.password}
										onChange={(e) => setUserPassword(e.target.value)}
									/>
									<button onClick={() => setShowPassword(!showPassword)} className="p-4">
										{showPassword ? <EyeClosedIcon /> : <EyeIcon />}
									</button>
								</div>
							</div>
							{error.password && <p className="text-xs text-red-700 ml-4 mt-2">{error.password}*</p>}
						</div>
						<button
							className="text-white font-medium text-xl rounded-xl w-full h-14 my-6 bg-gradient-to-r from-primaryGradientFrom via-primaryGradientVia to-primaryGradientTo shadow-[0px_7px_12px_0px_rgba(255,125,60,0.25)] transition-transform duration-300 transform hover:scale-105"
							onClick={onLogin}
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
								<Link href={{ pathname: '/forgot-password' }}>Mot de passe oublié ?</Link>
							</p>
						</div>
					</div>
					<div className="flex flex-col md:flex-row gap-4 mb-10 sm:mb-12 mt-10">
						<div className="w-full h-[120px] p-4 rounded-2xl bg-slate-50 flex flex-col justify-center items-center border-zinc-300 border-2">
							<div className="font-medium text-md mb-2" >
								Vous êtes un professionnel et n'avez pas encore de compte ?
							</div>
							<hr className="my-2 w-full" />
							<p className="text-black text-lg font-semibold hover:text-secondary transform hover:scale-110 transition-transform">
								<Link href={{ pathname: '/registration' }} className="border-b border-black hover:border-secondary ">Enregistrer mon salon ?</Link>
							</p>
						</div>
					</div>

				</div>
			</div>
		</>
	);
};

export default Login;
