import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image'
import { Auth } from "@/api/auth";
import { getLocalStorage, setLocalStorage } from "@/api/storage";
import userLoader from '@/hooks/useLoader';
import useSnackbar from '@/hooks/useSnackbar';
import { LogoCircle, LogoIcon } from "@/components/utilis/Icons";
import Link from "next/link";

const Login = () => {
	const router = useRouter();
	const showSnackbar = useSnackbar();
	const { loadingView } = userLoader();

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
	const onLogin = () => {
		if (!validateLogin()) {
			return;
		}
		setIsLoading(true);
		Auth.login(userInfo)
			.then((resp) => {
				const res = resp.data;
				setLocalStorage("AuthToken", res.token);
				const token = getLocalStorage("AuthToken");
				if (token) {
					if(res.user.role==='salon_professional'){
						router.push("/dashboard");
					}
					else{
						router.push("/client/dashboard");
					}
				}
				setLocalStorage("User", res.user.id);
			})
			.catch((err) => {
				showSnackbar('error', 'Le mot de passe et l\'adresse e-mail sont obligatoires.')
			})
			.finally(() => {
				setIsLoading(false);
			})
	};
	return (
		<>
			{isLoading && loadingView()}
			<div className="w-full flex flex-col items-center min-h-screen bg-white md:bg-transparent">
				<div className="hidden md:block fixed -left-32 md:-left-28 -bottom-32 md:-bottom-28">
					<LogoCircle />
				</div>
				<div className="mt-8">
					<LogoIcon />
				</div>
				<div className="z-10 mt-8 md:mt-12 w-full md:w-[767px] md:rounded-3xl md:bg-white md:shadow-[0px_16px_58px_6px_rgba(172,172,172,0.15)] px-4 sm:px-16 md:px-24">
					<div className="flex flex-col items-center justify-center">
						<p className="text-black font-medium text-3xl my-8 md:my-12">
							Connexion
						</p>
						<div className="w-full">
							<div className="w-full h-[60px] p-[1px] flex items-center justify-center rounded-xl bg-gradient-to-r from-primaryGradientFrom via-primaryGradientVia to-primaryGradientTo">
								<div className="w-full h-[58px] rounded-[11px] bg-white flex items-center justify-center">
									<input
										placeholder="Adresse email"
										className="w-full h-[58px] rounded-[11px] outline-none px-4"
										value={userInfo.email}
										onChange={(e) => setUserMail(e.target.value)}
									/>
								</div>
							</div>
							{error.email && <p className="text-xs text-red-700 ml-4 mt-2">{error.email}*</p>}
						</div>
						<div className="w-full mt-8">
							<div className="w-full h-[60px] p-[1px] flex items-center justify-center rounded-xl bg-gradient-to-r from-primaryGradientFrom via-primaryGradientVia to-primaryGradientTo">
								<div className="w-full h-[58px] rounded-[11px] bg-white flex items-center justify-center">
									<input
										placeholder="Mot de passe"
										type="password"
										className="w-full h-[58px] rounded-[11px] outline-none px-4"
										value={userInfo.password}
										onChange={(e) => setUserPassword(e.target.value)}
									/>
								</div>
							</div>
							{error.password && <p className="text-xs text-red-700 ml-4 mt-2">{error.password}*</p>}
						</div>
						<button
							className="text-white font-medium text-xl rounded-xl w-full h-14 my-8 bg-gradient-to-r from-primaryGradientFrom via-primaryGradientVia to-primaryGradientTo shadow-[0px_14px_24px_0px_rgba(255,125,60,0.25)]"
							onClick={onLogin}
						>
							<p>Connexion</p>
						</button>
					</div>
					<div className="h-[1px] bg-[#d4cbcb69] mb-8"></div>
					<div className="w-full flex items-center justify-center gap-4">
						<div className="w-full h-[60px] p-[1px] rounded-xl bg-gradient-to-r from-primaryGradientFrom via-primaryGradientVia to-primaryGradientTo">
							<div className="flex-1 h-[58px] rounded-[11px] bg-white flex items-center justify-center">
								<button className="w-full h-[58px] rounded-[11px] px-4 flex items-center justify-center gap-1.5 text-black">
									<Image
										width={25}
										height={25}
										src="/assets/google_logo.png"
										alt="Google"
									/>
									<p>Continuer avec Google</p>
								</button>
							</div>
						</div>
						<div className="w-full h-[60px] p-[1px] rounded-xl bg-gradient-to-r from-primaryGradientFrom via-primaryGradientVia to-primaryGradientTo">
							<div className="flex-1 h-[58px] rounded-[11px] bg-white flex items-center justify-center">
								<button className="w-full h-[58px] rounded-[11px] px-4 flex items-center justify-center gap-1.5 text-black">
									<Image
										width={25}
										height={25}
										src="/assets/apple_logo.png"
										alt="Apple"
									/>
									<p>Continuer avec Google</p>
								</button>
							</div>
						</div>
					</div>
					<div className="w-full flex flex-row items-end justify-end gap-2 mt-12 md:mt-16 mb-4">
						<p className="text-xs text-black mb-[3px]">Pas encore de compte ? </p>
						<p className="text-black text-base border-b border-black transition duration-150 hover:border-secondary hover:text-secondary">
							<Link href={{ pathname: '/signup' }}>Enregistrez-vous</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
