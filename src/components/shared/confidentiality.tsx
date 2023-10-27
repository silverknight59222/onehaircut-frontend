"use client"
import React from 'react';
import { LogoIcon, UserIcon } from '../utilis/Icons';
import { useRouter } from "next/navigation";
import Footer from "@/components/UI/Footer";
import { LogoCircleFixRight } from "@/components/utilis/Icons";
import { Theme_A } from '../utilis/Themes';

const confidentialityPage = () => {
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
        <h1 className={`my-12 ${Theme_A.textFont.headerH1}`}>Confidentialités</h1>
        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          Politique de Confidentialité</h1>
        <p className='pb-6'>
          La protection de vos données personnelles est une priorité pour [Nom de l'entreprise]. Nous nous engageons à respecter votre vie privée et à assurer la confidentialité de toutes les informations que vous nous confiez. Cette politique de confidentialité explique comment nous collectons, utilisons, partageons et protégeons vos données personnelles lorsque vous visitez notre site web.
        </p>
        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          Collecte de données personnelles</h1>
        <p className='pb-6'>
          Lorsque vous utilisez notre site web, nous pouvons collecter des informations personnelles telles que votre nom, votre adresse e-mail, votre adresse postale et d'autres données qui vous identifient. Ces informations sont collectées uniquement avec votre consentement explicite, que ce soit en remplissant des formulaires, en effectuant des achats ou en utilisant nos services.
        </p>
        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          Utilisation des données</h1>
        <p className='pb-6'>
          Nous utilisons vos données personnelles dans le but de vous fournir des informations, des produits ou des services que vous avez demandés, de vous envoyer des communications marketing si vous avez donné votre consentement, d'améliorer votre expérience sur notre site web, et de répondre à vos demandes ou questions.
        </p>
        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          Partage des données</h1>
        <p className='pb-6'>
          Nous ne vendons ni ne louons vos données personnelles à des tiers. Cependant, nous pouvons partager vos données avec des prestataires de services tiers qui nous aident à gérer notre site web, à traiter les paiements, à envoyer des e-mails, ou à mener des enquêtes, à condition qu'ils s'engagent à respecter notre politique de confidentialité.
        </p>
        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          Sécurité des données</h1>
        <p className='pb-6'>
          Nous prenons des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès non autorisé, divulgation, altération ou destruction. Nos employés sont formés à la gestion des données personnelles de manière sécurisée.
        </p>
        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          Droits des utilisateurs</h1>
        <p className='pb-6'>
          Vous avez le droit d'accéder à vos données personnelles, de les rectifier, de les supprimer, de vous opposer au traitement ou de demander leur portabilité. Pour exercer ces droits, veuillez nous contacter à l'adresse [adresse e-mail de contact]. Nous répondrons à votre demande dans les meilleurs délais.
        </p>


        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          Cookies</h1>
        <p className='pb-6'>
          Nous utilisons des cookies pour améliorer votre expérience de navigation sur notre site web. Vous pouvez gérer les paramètres des cookies dans votre navigateur, mais cela peut affecter certaines fonctionnalités du site.
        </p>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          Modifications de la politique de confidentialité</h1>
        <p className='pb-6'>
          Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page, et la date de révision en haut de la page sera mise à jour pour refléter la date de la dernière modification.
        </p>

        <p className='pt-24'>
          Cette politique de confidentialité a été mise à jour le [date de la dernière révision].
        </p>

      </div>

    </div>
  );
};

export default confidentialityPage;
