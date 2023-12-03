import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Auth } from "@/api/auth";
import userLoader from '@/hooks/useLoader';
import useSnackbar from '@/hooks/useSnackbar';
import { LogoCircleFixLeft, LogoIcon } from "@/components/utilis/Icons";
import Link from "next/link";
import { Theme_A } from "@/components/utilis/Themes";
import CustomInput from "@/components/UI/CustomInput";

const Forgot = () => {
	const router = useRouter();
	const showSnackbar = useSnackbar();
	const { loadingView } = userLoader();
	const searchParams = useSearchParams()

	const defaultUserInfo = {
		email: "",
	};
	const [error, setError] = useState({
		email: '',
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
		return isValidated;
	}
	const onForgot = async () => {
		if (!validateLogin()) {
			return;
		}
		setIsLoading(true);
		await Auth.forgot(userInfo)
			.then((resp) => {
				showSnackbar('success', resp.data.message)
				setUserInfo((prevState) => ({
					...prevState,
					email: "",
				}));

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
					<LogoCircleFixLeft />
				</div>
				<div className="mt-8">
					<LogoIcon className={''} />
				</div>
				<div className="z-10 mt-8 md:mt-12 w-full md:w-[767px] md:rounded-3xl md:bg-white md:shadow-2xl px-4 sm:px-16 md:px-24">
					<div className="flex flex-col items-center justify-center">
						<p className="text-black font-medium text-3xl my-8 md:my-12">
							Connexion
						</p>
						<div className="w-full mt-6">
							<CustomInput
								id="emailInput"
								label="Adresse email"
								value={userInfo.email}
								onChange={(e) => setUserMail(e.target.value)}
								isEmail={true} // Activez la vérification d'e-mail en utilisant isEmail={true}
								error={error.email}
							/>
						</div>

						<button
							className={`text-white font-medium text-xl rounded-xl w-full h-14 my-6 ${Theme_A.button.medLargeGradientButton} `}
							onClick={onForgot}
						>
							<p>Demande de récupération</p>
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

export default Forgot;
