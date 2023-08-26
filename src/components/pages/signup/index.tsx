import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Auth } from "@/api/auth";
import { getLocalStorage, setLocalStorage } from "@/api/storage";
import userLoader from '@/hooks/useLoader';
import useSnackbar from '@/hooks/useSnackbar';
import { LogoCircle, LogoIcon } from "@/components/utilis/Icons";
import Link from "next/link";

const Signup = () => {
	const router = useRouter();
	const showSnackbar = useSnackbar();
	const { loadingView } = userLoader();

	const defaultUserInfo = {
		email: "",
		password: "",
        name: '',
        phone: '',
		role:'client'
	};
	const [error, setError] = useState({
		email: '',
		password: '',
        name: '',
        phone: '',
	})
	const [userInfo, setUserInfo] = useState(defaultUserInfo);
	const [isLoading, setIsLoading] = useState(false);

    const setUserName = (e: string) => {
		if (!e.length) {
			setError((prev => {
				return { ...prev, name: 'Un name est requis' }
			}))
		} else {
			setError((prev => {
				return { ...prev, name: '' }
			}))
		}
		setUserInfo((prevState) => ({
			...prevState,
			name: e,
		}));
	};

    const setUserPhone = (e: string) => {
		if (!e.length) {
			setError((prev => {
				return { ...prev, phone: 'Un phone est requis' }
			}))
		} else {
			setError((prev => {
				return { ...prev, phone: '' }
			}))
		}
		setUserInfo((prevState) => ({
			...prevState,
			phone: e,
		}));
	};

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
	const validateSignup = () => {
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
        if (!userInfo.name) {
			setError((prev => {
				return { ...prev, name: 'Mot de passe requis' }
			}))
			isValidated = false;
		} else {
			setError((prev => {
				return { ...prev, name: '' }
			}))
		}
        if (!userInfo.phone) {
			setError((prev => {
				return { ...prev, phone: 'Mot de passe requis' }
			}))
			isValidated = false;
		} else {
			setError((prev => {
				return { ...prev, phone: '' }
			}))
		}
		return isValidated;
	}
	const onSignup = () => {
		if (!validateSignup()) {
			return;
		}
		setIsLoading(true);
		Auth.signup(userInfo)
			.then((resp) => {
				showSnackbar('success', 'Utilisateur créé avec succès.')
				router.push("/login");
			})
			.catch((err) => {
				showSnackbar('error', "Le nom, le téléphone, le mot de passe et l'adresse e-mail sont requis.")
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
							Sign up
						</p>
                        <div className="w-full mt-1">
							<div className="w-full h-[60px] p-[1px] flex items-center justify-center rounded-xl bg-gradient-to-r from-primaryGradientFrom via-primaryGradientVia to-primaryGradientTo">
								<div className="w-full h-[58px] rounded-[11px] bg-white flex items-center justify-center">
									<input
										placeholder="Name"
										type="text"
										className="w-full h-[58px] rounded-[11px] outline-none px-4"
										value={userInfo.name}
										onChange={(e) => setUserName(e.target.value)}
									/>
								</div>
							</div>
							{error.name && <p className="text-xs text-red-700 ml-4 mt-2">{error.name}*</p>}
						</div>
                        <div className="w-full mt-8">
							<div className="w-full h-[60px] p-[1px] flex items-center justify-center rounded-xl bg-gradient-to-r from-primaryGradientFrom via-primaryGradientVia to-primaryGradientTo">
								<div className="w-full h-[58px] rounded-[11px] bg-white flex items-center justify-center">
									<input
										placeholder="Phone"
										type="text"
										className="w-full h-[58px] rounded-[11px] outline-none px-4"
										value={userInfo.phone}
										onChange={(e) => setUserPhone(e.target.value)}
									/>
								</div>
							</div>
							{error.phone && <p className="text-xs text-red-700 ml-4 mt-2">{error.phone}*</p>}
						</div>
						<div className="w-full  mt-8">
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
							onClick={onSignup}
						>
							<p>Sign Up</p>
						</button>
					</div>
					<div className="w-full flex flex-row items-end justify-end gap-2 mt-12 md:mt-16 mb-4">
						<p className="text-xs text-black mb-[3px]">Pas encore de compte ? </p>
						<p className="text-black text-base border-b border-black transition duration-150 hover:border-secondary hover:text-secondary">
							<Link href={{ pathname: '/login' }}>Signup</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Signup;
