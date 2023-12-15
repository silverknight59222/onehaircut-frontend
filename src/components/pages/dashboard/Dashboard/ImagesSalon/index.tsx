import React, { useEffect, useState } from 'react'
import { dashboard } from '@/api/dashboard';
import { getLocalStorage } from '@/api/storage';
import userLoader from '@/hooks/useLoader';
import { ImageSalon } from '@/types';
import ImagesContainer from './ImagesContainer';
import { EditIcon, LogoCircleFixLeft } from "@/components/utilis/Icons";
import Footer from "@/components/UI/Footer";
import { Theme_A } from '@/components/utilis/Themes';


const pulseAnimation = `
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}
`;

const Images = () => {
	const { loadingView } = userLoader();

	const [isLoading, setIsLoading] = useState(false);
	const [salonImages, setSalonImages] = useState<ImageSalon[]>([]);
	useEffect(() => {
		// window.location.reload()
	},[salonImages])
	const getAllSalonImages = async () => {
		let temp = getLocalStorage("hair_salon");
		const hairSalon = temp ? JSON.parse(temp) : null;
		if (hairSalon) {
			setIsLoading(true);
			await dashboard.getAllSalonImages(hairSalon.id).then((resp) => {
				if (resp.data.data.length) {
					setSalonImages(resp.data.data);
				}
			}).catch((error) => {
				console.error(error);
			}).finally(() => {
				setIsLoading(false);
			});
		}
	};

	useEffect(() => {
		getAllSalonImages();
	}, [])

	return (
		<>
			{isLoading && loadingView()}
			<div className="w-full flex flex-col xl:flex-row items-center justify-center gap-4 mt-8 mb-20">

				<div className="h-[940px] w-full xl:w-1/2 2xl:w-2/5 overflow-auto flex flex-col items-center gap-8 bg-lightGrey rounded-3xl p-4 md:px-12 md:pt-12 md:pb-0 opacity-95">

					{/* TODO MESSAGE NOTIFICATION WHEN NO HAIRDRESSER SET */}
					{!(salonImages.length > 0) && (
						<div>
							<style>
								{pulseAnimation}
							</style>
							<div
								className={`${Theme_A.indicators.counterIndicator_C}`}
								style={{
									animation: 'pulse 3s infinite',
								}}
							>
								Vous devez ajouter un ou plusieurs images pour être visible par les clients
							</div>
						</div>
					)}

					<ImagesContainer title='Images vitrine' type='showcase' setIsLoading={(value) => setIsLoading(value)} salonImages={salonImages} getAllSalonImages={getAllSalonImages} />
				</div>
				<div className="h-[940px] w-full xl:w-1/2 2xl:w-2/5 overflow-auto flex flex-col items-center justify-start gap-8 bg-lightGrey rounded-3xl p-4 md:p-12">
					<ImagesContainer title='Exemples de coiffure' type='hairstyle' setIsLoading={(value) => setIsLoading(value)} salonImages={salonImages} getAllSalonImages={getAllSalonImages} />
				</div>
				<div className="bg-gradient-to-l  md:block fixed -left-32 md:-left-8 -bottom-32 md:-bottom-8 -z-10">
					<LogoCircleFixLeft />
				</div>
			</div>
			<Footer />
		</>
	)
}

export default Images