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
import CustomInput from "@/components/UI/CustomInput";

const Login = () => {
	const router = useRouter();
	const showSnackbar = useSnackbar();
	const { loadingView } = userLoader();
	const [showPassword, setShowPassword] = useState(false);
	const searchParams = useSearchParams()

	//console.log(searchParams.get('redirect'))
	const defaultUserInfo = {
		email: "",
		password: "",
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
		if (!validateLogin()) {
			return;
		}
		setIsLoading(true);
		await Auth.login(userInfo)
			.then((resp) => {
				const res = resp.data;
				setLocalStorage("user", JSON.stringify(res.user));
				if (res.user.hair_salon) {
					setLocalStorage("hair_salon", JSON.stringify(res.user.hair_salon));
				}
				setLocalStorage("auth-token", res.token);
				if (searchParams.get('redirect') === 'payment') {
					router.push("/payment");
				} else {
					const salonRoles = ['salon_professional', 'admin', 'staff'];
					// if (res.user.role === 'salon_professional' || ) {
					if (salonRoles.indexOf(res.user.role) != -1) {
						router.push("/dashboard");
					} else {
						router.push("/client/dashboard");
					}
				}

			})
			.catch((err) => {
				showSnackbar('error', 'Le mot de passe et l\'adresse e-mail sont obligatoires.')
			})
			.finally(() => {
				setIsLoading(false);
			})
	};

	const onOHCLogoClick = () => {
		router.push(`/`)
	}

	return (
		<>
			{isLoading && loadingView()}
			<div className="w-full flex flex-col items-center min-h-screen bg-white md:bg-transparent">
				<div className="hidden md:block fixed -left-32 md:-left-28 -bottom-32 md:-bottom-28">
					<LogoCircleFixLeft />
				</div>
				<div className="mt-8">
					<button
						onClick={onOHCLogoClick}
					>
						<LogoIcon className={''} />
					</button>
				</div>
				<div className="z-10 mt-8 md:mt-12 w-full md:w-[767px] md:rounded-3xl md:bg-white md:shadow-2xl px-4 sm:px-16 md:px-24">
					<div className="flex flex-col items-center justify-center">
						<p className="text-black font-medium text-3xl my-8 md:my-12">
							Connexion
						</p>

						{/* ADRESSE EMAIL */}
						<div className="w-full mt-6">
							<CustomInput
								id="emailInput"
								label="Adresse email"
								value={userInfo.email}
								onChange={(e) => setUserMail(e.target.value)}
								error={error.email}
								isEmail={true} // Activez la vérification d'e-mail en utilisant isEmail={true}
							/>
						</div>

						{/* MOT DE PASSE */}
						<div className="w-full mt-8">
							<div className="w-full h-[58px] rounded-[11px] bg-white flex items-center">
								<div className="flex-grow">
									<CustomInput
										id="passwordInput"
										label="Mot de passe"
										type={showPassword ? "text" : "password"}
										value={userInfo.password}
										onChange={(e) => setUserPassword(e.target.value)}
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
