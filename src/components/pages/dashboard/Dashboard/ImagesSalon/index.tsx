import React, { useEffect, useState } from 'react'
import { dashboard } from '@/api/dashboard';
import { getLocalStorage } from '@/api/storage';
import userLoader from '@/hooks/useLoader';
import { ImageSalon } from '@/types';
import ImagesContainer from './ImagesContainer'

const Images = () => {
	const { loadingView } = userLoader();

	const [isLoading, setIsLoading] = useState(false);
	const [salonImages, setSalonImages] = useState<ImageSalon[]>([]);

	const getAllSalonImages = async () => {
		const temp = getLocalStorage("user");
		const user = temp ? JSON.parse(temp) : null;
		if (user.id) {
		setIsLoading(true);
		await dashboard.getAllSalonImages(user.id).then((resp) => {
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
			<div className="w-full flex flex-col xl:flex-row items-center justify-center gap-4 mt-8">
				<div className="h-[780px] w-full xl:w-1/2 2xl:w-2/5 overflow-auto flex flex-col items-center gap-8 bg-lightGrey rounded-3xl p-4 md:px-12 md:pt-12 md:pb-0">
					<ImagesContainer title='Images vitrine' type='showcase' setIsLoading={(value) => setIsLoading(value)} salonImages={salonImages} getAllSalonImages={getAllSalonImages} />
				</div>
				<div className="h-[780px] w-full xl:w-1/2 2xl:w-2/5 overflow-auto flex flex-col items-center justify-start gap-8 bg-lightGrey rounded-3xl p-4 md:p-12">
					<ImagesContainer title='Exemples de coiffure' type='hairstyle' setIsLoading={(value) => setIsLoading(value)} salonImages={salonImages} getAllSalonImages={getAllSalonImages} />
				</div>
			</div>
		</>
	)
}

export default Images