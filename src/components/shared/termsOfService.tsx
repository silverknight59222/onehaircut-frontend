"use client"
import React from 'react';
import { LogoIcon, UserIcon } from '../utilis/Icons';
import { useRouter } from "next/navigation";
import Footer from "@/components/UI/Footer";
import { LogoCircleFixRight } from "@/components/utilis/Icons";
import { Theme_A } from '../utilis/Themes';

const termsPage = () => {
  const router = useRouter();

  return (
    <div>
      <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 -z-10">
        <LogoCircleFixRight />
      </div>
      <Footer />
      <div className="flex justify-between w-full p-5 border-b border-[#EBF0F2]">
        <div className='flex items-center justify-center cursor-pointer'
          onClick={() => router.push('/')}>
          <LogoIcon />
        </div>
        <div className="flex items-center justify-end gap-4">
          <div className="w-14 h-14 flex items-center justify-center pb-1 border-2 border-secondary rounded-full cursor-pointer transform hover:scale-110 transition-transform"
            onClick={() => router.push('/login')}>
            <UserIcon />
          </div>
        </div>
      </div>
      <div className='mx-48 mb-16'>
        <h1 className={`my-12 ${Theme_A.textFont.headerH1}`}>Conditions Générales d'Utilisation de OneHaircut</h1>
        <p className='pb-6'> Les présentes Conditions Générales d'Utilisation (ci-après dénommées "CGU") régissent l'utilisation du site web de [Nom de l'entreprise] (ci-après dénommé "le Site") et de tous les services qui y sont proposés. En utilisant ce Site, vous acceptez de vous conformer à ces CGU. Si vous n'êtes pas d'accord avec ces conditions, veuillez ne pas utiliser le Site.</p>
        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          1. Acceptation des Conditions</h1>
        <p className='pb-6'>
          En utilisant le Site, vous acceptez d'être lié par ces CGU, ainsi que par notre Politique de Confidentialité. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre Site.        </p>
        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          2. Modifications des CGU</h1>
        <p className='pb-6'>
          Nous nous réservons le droit de modifier ces CGU à tout moment, et les modifications seront publiées sur le Site avec une date de révision mise à jour. Il est de votre responsabilité de consulter régulièrement ces CGU pour vous assurer que vous les comprenez et les acceptez.        </p>
        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          3. Utilisation du Site</h1>
        <p className='pb-6'>
          Vous acceptez de ne pas utiliser le Site à des fins illégales ou interdites par ces CGU. Vous ne devez pas perturber, endommager ou interférer avec le fonctionnement normal du Site.        </p>
        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          4. Propriété Intellectuelle</h1>
        <p className='pb-6'>
          Tous les contenus, marques, logos, images, textes et autres éléments du Site sont protégés par des droits de propriété intellectuelle détenus par [Nom de l'entreprise]. Vous ne pouvez pas utiliser, copier, reproduire, distribuer ou afficher ces éléments sans autorisation préalable.        </p>
        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          5. Responsabilité</h1>
        <p className='pb-6'>
          Le Site est fourni "tel quel", sans garantie d'aucune sorte. [Nom de l'entreprise] ne peut être tenu responsable des dommages directs ou indirects résultant de l'utilisation du Site.        </p>
        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          6. Liens Externes</h1>
        <p className='pb-6'>
          Le Site peut contenir des liens vers des sites web tiers. [Nom de l'entreprise] n'est pas responsable du contenu ou des pratiques de confidentialité de ces sites. L'utilisation de ces liens est à vos propres risques.        </p>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          7. Résiliation</h1>
        <p className='pb-6'>
          [Nom de l'entreprise] se réserve le droit de mettre fin à l'accès au Site à tout moment et pour quelque raison que ce soit.       </p>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          8. Loi Applicable</h1>
        <p className='pb-6'>
          Ces CGU sont régies par les lois en vigueur dans [juridiction] et tout litige découlant de ces CGU sera soumis à la juridiction exclusive des tribunaux de [juridiction].        </p>

        <p className='pt-24'>
          Cette politique de confidentialité a été mise à jour le [date de la dernière révision].
        </p>

      </div>

    </div>
  );
};

export default termsPage;
