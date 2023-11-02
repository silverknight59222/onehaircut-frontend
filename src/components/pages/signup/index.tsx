import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Auth } from "@/api/auth";
import { getLocalStorage, setLocalStorage } from "@/api/storage";
import userLoader from '@/hooks/useLoader';
import useSnackbar from '@/hooks/useSnackbar';
import { LogoCircleFixLeft, LogoIcon } from "@/components/utilis/Icons";
import Link from "next/link";
import { Theme_A } from "@/components/utilis/Themes";
import CustomInput from "@/components/UI/CustomInput";

const Signup = () => {
	const router = useRouter();
	const showSnackbar = useSnackbar();
	const { loadingView } = userLoader();

	const defaultUserInfo = {
		email: "",
		password: "",
		name: '',
		phone: '',
		role: 'client',
		repeatPassword: "",
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

		// Vérifier si les mots de passe correspondent
		if (userInfo.password !== userInfo.repeatPassword) {
			setError((prev) => ({
				...prev,
				password: "Les mots de passe ne correspondent pas",
			}));
			return;
		}

		setIsLoading(true);

		Auth.signup(userInfo)
			.then((resp) => {
				showSnackbar("success", "Utilisateur créé avec succès.");
				router.push("/login");
			})
			.catch((err) => {
				showSnackbar(
					"error",
					"Le nom, le téléphone, le mot de passe et l'adresse e-mail sont requis."
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


				<div className="z-10 mt-8 md:mt-12 w-full bg-white border-2 border-stone-300 shadow-lg md:w-[767px] md:rounded-3xl px-4 sm:px-16 md:px-24">
					<div className="flex flex-col items-center justify-center">

						{/* SIGN UP */}
						<p className="text-black font-medium text-3xl my-8 md:my-12">
							Sign up
						</p>

						{/* NAME */}
						<div className="w-full mt-1">
							<CustomInput
								id="Name"
								label="Nom"
								value={userInfo.name}
								onChange={(e) => setUserName(e.target.value)}
								error={error.name}
							/>
						</div>


						{/* PHONE NUMBER */}
						<div className="w-full mt-8">
							<CustomInput
								id="Téléphone"
								label="Téléphone"
								value={userInfo.phone}
								onChange={(e) => setUserPhone(e.target.value)}
								error={error.phone}
							/>
						</div>


						{/* EMAIL ADDRESS*/}
						<div className="w-full mt-8">
							<CustomInput
								id="Adresse email"
								label="Adresse email"
								value={userInfo.email}
								onChange={(e) => setUserMail(e.target.value)}
								error={error.email}
								isEmail={true}
							/>
						</div>


						{/* PASSWORD */}
						<div className="w-full mt-8">
							<div className="flex items-center justify-between">
								<CustomInput
									id="Mot de passe"
									label="Mot de passe"
									type="password"
									value={userInfo.password}
									onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
									error={error.password}
								/>
								<p className="mr-6 "> </p>
								<CustomInput
									id="Répétez votre mot de passe"
									label="Répétez votre mot de passe"
									type="password"
									value={userInfo.repeatPassword}
									onChange={(e) => setUserInfo({ ...userInfo, repeatPassword: e.target.value })}
									error={error.password}
								/>
							</div>
						</div>



						{/* SIGN UP BUTTON*/}
						<button
							className={`w-full h-14 mt-8 ${Theme_A.button.medLargeGradientButton}`}
							onClick={onSignup}
						>
							<p>Sign Up</p>
						</button>
					</div>


					{/* BACK TO LOGIN*/}
					<div className="w-full flex flex-row items-end justify-end gap-2 mt-12 mb-4">
						<p className="text-xs text-black mb-[3px]">Vous avez déjà un compte ? </p>
						<p className="text-black text-base border-b border-black transition duration-150 hover:border-secondary hover:text-secondary">
							<Link href={{ pathname: '/login' }}>Login</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Signup;
