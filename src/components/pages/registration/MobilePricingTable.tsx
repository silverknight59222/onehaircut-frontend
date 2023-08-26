import React from 'react'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { LeftArrowIcon, PackageCheckedIcon, PackageSelectedUnCheckedIcon, RightArrowIcon } from '@/components/utilis/Icons';
import { useRouter } from "next/navigation";
function MobilePricingTable() {
  const router=useRouter();
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
        naturalSlideHeight={380}
        totalSlides={3}
        infinite={true}
      >
        <Slider>
          <Slide index={0}>
            <div>
            <div className="absolute top-[135px]">
            {packageNames.map((name,index) => {
              return (
                <p key={index} className="flex items-center text-black font-medium text-xl w-[150px] h-[100px] border-b-2 border-[#E4E8E9] pl-3 pr-9 ">
                  {name}
                </p>
              );
            })}
            <div className="font-bold text-black text-center mt-10 text-2xl">
              Prix
            </div>
          </div>
          <div
            style={{
              background:"linear-gradient(162deg, #FE2569 0%, #FD4C55 42.71%, #FF8637 86.46%, #FFE30F 100%)"
            }}
            className="w-[150px] absolute -top-1 left-[170px] flex flex-col items-center justify-center py-6 rounded-[20px] cursor-pointer"
          >
            <div className="text-2xl font-semibold text-white w-36 text-center px-2">
              OneHaircut Pro
            </div>
            <div className="flex items-center justify-center bg-[rgba(255,255,255,0.53)] mb-2 rounded-lg w-36 h-10 text-white font-semibold">
              recommandé
            </div>
            {packageNames.map((_,index) => {
              return (
                <div key={index} className="flex items-center justify-center w-full h-[100px] border-b-2 border-[#E4E8E9] py-4">
                  <PackageCheckedIcon />
                </div>
              );
            })}
            <div className="mt-5 h-[100px] px-2">
              <p className= "text-white font-medium text-4xl text-center">
                79 $<span className="text-2xl">/ mois</span>
              </p>
              <div className="flex items-center mt-1">
                <p className= "text-white font-semibold" >à partir de </p>
                <p className= "text-white font-semibold" >
                  *1 % de tax de service{" "}
                </p>
              </div>
            </div>
            <div onClick={()=>router.push('registration/pro')} className="flex items-center justify-center text-white rounded-xl -mb-12 w-32 h-9 bg-[#070E06]">
              Aperçu de l’Abo
            </div>
          </div>
            </div>
          </Slide>
          <Slide index={1}>
          <div>
            <div className="absolute top-[121px]">
            {packageNames.map((name,index) => {
              return (
                <p key={index} className="flex items-center text-black font-medium text-xl w-[150px] h-[100px] border-b-2 border-[#E4E8E9] pl-3 pr-9 ">
                  {name}
                </p>
              );
            })}
            <div className="font-bold text-black text-center mt-10 text-2xl">
              Prix
            </div>
          </div>
          <div
            style={{
              background:"linear-gradient(162deg, #FE2569 0%, #FD4C55 42.71%, #FF8637 86.46%, #FFE30F 100%)"
            }}
            className="w-[150px] absolute -top-1 left-[170px] flex flex-col items-center justify-center py-6 rounded-[20px] cursor-pointer"
          >
            <div className="text-2xl font-semibold text-white w-36 text-center">
            OneHaircut standard
            </div>
            {packageNames.map((_,index) => {
              return (
                <div key={index} className="flex items-center justify-center w-full h-[100px] border-b-2 border-[#E4E8E9] py-4">
                    {index < 6 ?
                     <PackageCheckedIcon />
                    :
                     <PackageSelectedUnCheckedIcon />
                    }
                  </div>
              );
            })}
            <div className="mt-5 h-[100px] px-2">
              <div className="w-full h-[100px] flex flex-col items-center justify-center  py-4">
              <p className="text-white font-medium text-4xl">Gratuit</p>
              <p className="text-white font-medium my-2">
                *5 % de tax de service
              </p>
              </div>
            </div>
            <div onClick={()=>router.push('registration/pro')} className="flex items-center justify-center text-white rounded-xl -mb-12 w-32 h-9 bg-[#070E06]">
              Aperçu de l’Abo
            </div>
          </div>
            </div>
          </Slide>
          <Slide index={2}>
          <div>
            <div className="absolute top-[55px]">
            {packageNames.map((name,index) => {
              return (
                <p key={index} className="flex items-center text-black font-medium text-xl w-[150px] h-[100px] border-b-2 border-[#E4E8E9] pl-3 pr-9 ">
                  {name}
                </p>
              );
            })}
            <div className="font-bold text-black text-center mt-10 text-2xl">
              Prix
            </div>
          </div>
          <div
            style={{
              background:"linear-gradient(162deg, #FE2569 0%, #FD4C55 42.71%, #FF8637 86.46%, #FFE30F 100%)"
            }}
            className="w-[150px] absolute -top-1 left-[170px] flex flex-col items-center justify-center py-6 rounded-[20px] cursor-pointer"
          >
            <div className="text-2xl font-semibold text-white w-36 text-center">
              Concurrent
            </div>
            {packageNames.map((_,index) => {
              return (
                <div key={index} className="flex items-center justify-center w-full h-[100px] border-b-2 border-[#E4E8E9] py-4">
                {index === 0 || index === 8 ?
                   <PackageCheckedIcon /> 
                   :
                   <PackageSelectedUnCheckedIcon /> 
                  }
              </div>
              );
            })}
            <div className="mt-7 h-[100px]">
              <p className= "text-white font-medium text-4xl text-center">
                79 $<span className="text-2xl">/ mois</span>
              </p>
            </div>
            <div onClick={()=>router.push('registration/pro')} className="flex items-center justify-center text-white rounded-xl -mb-12 w-32 h-9 bg-[#070E06]">
              Aperçu de l’Abo
            </div>
          </div>
            </div>
            </Slide>
        </Slider>
        <ButtonBack className='absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 py-4 px-2 bg-white rounded-r-xl rounded-br-xl-xl'><LeftArrowIcon/></ButtonBack>
        <ButtonNext className='absolute -right-2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 py-4 px-2 bg-white rounded-l-xl rounded-bl-xl-xl'><RightArrowIcon/></ButtonNext>
      </CarouselProvider>
    </div>
  )
}

export default MobilePricingTable