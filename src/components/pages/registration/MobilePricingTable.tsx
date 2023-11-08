import React from 'react'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { LeftArrowIcon, PackageCheckedIcon, PackageSelectedUnCheckedIcon, RightArrowIcon } from '@/components/utilis/Icons';
import { useRouter } from "next/navigation";
import { Theme_A } from '@/components/utilis/Themes';
function MobilePricingTable() {
  const router = useRouter();
  const packageNames = [
    "Agenda dynamique",
    "Mise en avant de votre salon",
    "Sélections de vos coiffures",
    "Proposition de prestations supplémentaires",
    "Enregistrement du personnel",
    "Lier vos salons",
    "Dashboard Complet",
    "OnehairBot Assistant",
    "Personnalisation de l'Interface",
  ];
  return (
    <div className='w-full relative'>
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={160}
        totalSlides={3}
        infinite={true}
      >
        <Slider style={{ height: '950px' }}>
          <Slide index={0}>
            <div className='w-full'>
              <div className="h-28 flex flex-col items-center justify-center text-3xl font-semibold text-white text-center py-5 rounded-t-xl"
                style={{
                  background: "linear-gradient(162deg, #FE2569 0%, #FD4C55 42.71%, #FF8637 86.46%, #FFE30F 100%)"
                }}>
                OneHaircut Pro
                <div className='flex items-center justify-center w-full'>
                  <div className="mt-1 bg-[rgba(255,255,255,0.53)] p-2 rounded-lg w-36 text-white font-medium text-base">
                    recommandé
                  </div>
                </div>
              </div>
              <div>
                {packageNames.map((name, index) => {
                  return (
                    <div key={index} className='flex w-full border-b-2 border-[#E4E8E9] items-center justify-between px-4'>
                      <div className="flex items-center text-black font-medium text-xl py-5 ">
                        {name}
                      </div>
                      <div className="flex items-center justify-center py-5">
                        <PackageCheckedIcon color='#FD4C55' />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className='relative py-3 flex flex-col items-center justify-center rounded-b-xl' style={{
                background: "linear-gradient(162deg, #FE2569 0%, #FD4C55 42.71%, #FF8637 86.46%, #FFE30F 100%)"
              }}>
                <div className='text-white font-medium text-4xl text-center'>79€<span className="text-2xl">/ mois</span></div>
                <div className="text-white font-medium my-2"> *5 % de taxe de service</div>
                <div onClick={() => router.push('registration/plans?plan=pro')} className="absolute z-20 -bottom-5 flex items-center justify-center text-white rounded-xl w-32 h-9 bg-[#070E06]">
                  Aperçu de l’Abo
                </div>
              </div>
            </div>
          </Slide>
          <Slide index={1}>
            <div className='w-full'>
              <div className="h-28 flex flex-col items-center justify-center text-3xl font-semibold text-white text-center py-5 rounded-t-xl"
                style={{
                  background: "linear-gradient(162deg, #FE2569 0%, #FD4C55 42.71%, #FF8637 86.46%, #FFE30F 100%)"
                }}>
                OneHaircut standard
              </div>
              <div>
                {packageNames.map((name, index) => {
                  return (
                    <div key={index} className='flex w-full border-b-2 border-[#E4E8E9] items-center justify-between px-4'>
                      <div className="flex items-center text-black font-medium text-xl py-5 ">
                        {name}
                      </div>
                      <div className="flex items-center justify-center py-5">
                        {index < 6 ?
                          <PackageCheckedIcon color='#FD4C55' />
                          :
                          <PackageSelectedUnCheckedIcon color='#FD4C55' />
                        }
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className='relative py-3 flex flex-col items-center justify-center rounded-b-xl' style={{
                background: "linear-gradient(162deg, #FE2569 0%, #FD4C55 42.71%, #FF8637 86.46%, #FFE30F 100%)"
              }}>
                <div className='text-white font-medium text-4xl text-center'>0€<span className="text-2xl">/ mois</span></div>
                <div className="text-white font-medium my-2"> *5 % de taxe de service</div>
                <div onClick={() => router.push('registration/plans?plan=standard')} className="absolute z-20 -bottom-5 flex items-center justify-center text-white rounded-xl w-32 h-9 bg-[#070E06]">
                  Aperçu de l’Abo
                </div>
              </div>
            </div>
          </Slide>
          <Slide index={2}>
            <div className='w-full'>
              <div className="h-28 flex flex-col items-center justify-center text-3xl font-semibold text-white text-center py-5 rounded-t-xl"
                style={{
                  background: "linear-gradient(162deg, #FE2569 0%, #FD4C55 42.71%, #FF8637 86.46%, #FFE30F 100%)"
                }}>
                Concurrents
              </div>
              <div>
                {packageNames.map((name, index) => {
                  return (
                    <div key={index} className='flex w-full border-b-2 border-[#E4E8E9] items-center justify-between px-4'>
                      <div className="flex items-center text-black font-medium text-xl py-5 ">
                        {name}
                      </div>
                      <div className="flex items-center justify-center py-5">
                        {index === 0 || index === 8 ?
                          <PackageCheckedIcon color='#FD4C55' />
                          :
                          <PackageSelectedUnCheckedIcon color='#FD4C55' />
                        }
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className='relative py-3 flex flex-col items-center justify-center rounded-b-xl' style={{
                background: "linear-gradient(162deg, #FE2569 0%, #FD4C55 42.71%, #FF8637 86.46%, #FFE30F 100%)"
              }}>
                <div className='text-white font-medium text-4xl text-center'>min. 79€<span className="text-2xl">/ mois</span></div>
                <div className="text-white font-medium my-2"> *5 % de taxe de service</div>
              </div>
            </div>
          </Slide>
        </Slider>
        <ButtonBack className='absolute -left-2 top-1/3 mt-14 transform -translate-x-1/2 -translate-y-1/2  bg-white rounded-r-xl rounded-br-xl-xl'><LeftArrowIcon /></ButtonBack>
        <ButtonNext className='absolute -right-6 top-1/3 mt-14 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-l-xl rounded-bl-xl-xl'><RightArrowIcon /></ButtonNext>
      </CarouselProvider><
        div className={`flex relative content-center justify-center items-center text-center`}>
        <div
          onClick={() => router.push('registration/plans?plan=standard')}
          className={`flex items-center justify-center rounded-xl  w-4/5 h-16 ${Theme_A.button.bigGradientButton} `}>
          Vers le choix de l'abonnement
        </div>
      </div>
    </div>
  )
}

export default MobilePricingTable