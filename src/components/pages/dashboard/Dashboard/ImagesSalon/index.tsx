import React, { useEffect, useState } from 'react'
import { dashboard } from '@/api/dashboard';
import { getLocalStorage, removeFromLocalStorage, setLocalStorage } from '@/api/storage';
import userLoader from '@/hooks/useLoader';
import { ImageSalon } from '@/types';
import ImagesContainer from './ImagesContainer';
import { EditIcon, LogoCircleFixLeft } from "@/components/utilis/Icons";
import Footer from "@/components/UI/Footer";
import { Theme_A } from '@/components/utilis/Themes';
import TourModal, { Steps } from '@/components/UI/TourModal';
import { salonApi } from '@/api/salonSide';


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
	const [pageDone, setPageDone] = useState<String[]>(['salon_images']);
	useEffect(() => {
		// window.location.reload()
	}, [salonImages])
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
		const pages_done = getLocalStorage('pages_done')
		setPageDone(pages_done ? JSON.parse(pages_done) : [])
	}, [])

	// ------------------------------------------------------------------
	// For Tour
	const tourSteps: Steps[] = [
		{
			selector: '.pic_salon',
			content: 'Cliquer sur le carré blanc pour ajouter une photo de votre salon \n puis ce le + pour l\'ajouter',
		},
		{
			selector: '.pic_haircut',
			content: 'Pareil pour tous vos exemples de coiffures',
		},
	];

	const closeTour = async () => {
		// You may want to store in local storage or state that the user has completed the tour
		setIsLoading(true)
		if (!pageDone.includes('salon_images')) {
			let resp = await salonApi.assignStepDone({ page: 'salon_images' });
      if(resp.data?.pages_done) {
        setLocalStorage('pages_done', JSON.stringify(resp.data.pages_done));
      }
			setPageDone((prevArray) => [...prevArray, 'salon_images'])
		}
		setIsLoading(false);
	};
	// ------------------------------------------------------------------

	return (
		<>
			{isLoading && loadingView()}
			{/* For explaining the website */}
				<TourModal steps={tourSteps} onRequestClose={closeTour} doneTour={pageDone.includes('salon_images')} />
			<div className="w-full flex flex-col xl:flex-row items-center justify-center gap-4 mt-8 mb-20">

				<div className="h-[940px] w-full xl:w-1/2 2xl:w-2/5 overflow-auto flex flex-col items-center gap-8 bg-lightGrey rounded-3xl p-4 md:px-12 md:pt-12 md:pb-0 opacity-95 pic_salon">

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
								Vous devez ajouter une ou plusieurs images pour être visible par les clients
							</div>
						</div>
					)}

					<ImagesContainer title='Images vitrine' type='showcase' setIsLoading={(value) => setIsLoading(value)} salonImages={salonImages} getAllSalonImages={getAllSalonImages} />
				</div>
				<div className="h-[940px] w-full xl:w-1/2 2xl:w-2/5 overflow-auto flex flex-col items-center justify-start gap-8 bg-lightGrey rounded-3xl p-4 md:p-12 pic_haircut">
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
