"use client"
import React from 'react';
import { LogoIcon, UserIcon } from '../utilis/Icons';
import Footer from "@/components/UI/Footer";
import { LogoCircleFixRight } from "@/components/utilis/Icons";
import { Theme_A } from '../utilis/Themes';

const legalNoticesPage = () => {  

  return (
    <div>
      <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 -z-10">
        <LogoCircleFixRight />
      </div>
      <Footer />
      <div className="flex justify-between w-full p-5 border-b border-[#EBF0F2]">
        <div className='flex items-center justify-center cursor-pointer'
          >
          <LogoIcon />
        </div>
        <div className="flex items-center justify-end gap-4">
          <div className="w-14 h-14 flex items-center justify-center pb-1 border-2 border-secondary rounded-full cursor-pointer transform hover:scale-110 transition-transform"
            >
            <UserIcon />
          </div>
        </div>
      </div>
      <div className='mx-48 mb-16 text-justify'>
        <h1 className={`my-12 ${Theme_A.textFont.headerH1}`}>Mentions légales </h1>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          1. Informations sur la société :</h1>
        <p className='pb-6'>
          OneHaircut est édité par Balextrade Ltd, enregistrée à 7901 4TH ST N STE 300 ST. PETERSBURG, FL. US 33702, et enregistrée sous le numéro 38-4243991 <br />
          Numéro d’identification à la TVA : non-applicable</p>
        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          2. Propriété intellectuelle :</h1>
        <p className='pb-6'>
          Tous les éléments du site web OneHaircut, y compris les contenus, les logos, les images, et les marques, sont protégés par la législation sur la propriété intellectuelle. Toute reproduction ou utilisation de ces éléments sans autorisation écrite de notre part est interdite. </p>
        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          3. Collecte de données et photos :</h1>
        <p className='pb-6'>
          OneHaircut collecte des informations personnelles dans le but d'améliorer les services fournis et de personnaliser l'expérience des utilisateurs. Dans ce processus, des photos des clients peuvent être prises pour créer un avatar représentatif de la coupe de cheveux ou du style choisi. Ces photos sont utilisées uniquement à des fins de consultation et de personnalisation des services de coiffure. En acceptant les Conditions d'utilisation, l'utilisateur consent à la collecte et à l'utilisation de ces données pour des raisons de service. </p>
        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          4. Sécurité des données :</h1>
        <p className='pb-6'>
          OneHaircut met tout en œuvre pour assurer la sécurité des données des utilisateurs. Les informations sensibles, telles que les données bancaires collectées pour les réservations, sont sécurisées via des protocoles de cryptage avancés conformes aux normes de l'industrie. </p>
        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          5. Partage des données :</h1>
        <p className='pb-6'>
          OneHaircut ne partage aucune information personnelle des utilisateurs avec des tiers sans consentement préalable, sauf si cela est requis par la loi ou pour protéger les intérêts de la société. Les données ne sont pas vendues, échangées ou transférées à des tiers à des fins commerciales. </p>
        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          6. Sécurité de l'hébergement :</h1>
        <p className='pb-6'>
          Le site web OneHaircut est hébergé par Hostinger International Ltd, une entreprise respectée qui garantit des protocoles de sécurité stricts pour protéger les données stockées sur ses serveurs. Son contact est: HOSTINGER INTERNATIONAL LTD, 61 Lordou Vironos Street, 6023 Larnaca, Chypre,
          joignable par le moyen suivant : https://www.hostinger.fr/contact. </p>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          7. Propriété intellectuelle :</h1>
        <p className='pb-6'>
          Tous les contenus du site web OneHaircut, y compris les images, les logos, les marques et les contenus textuels, sont la propriété exclusive de Balextrade Ltd et sont protégés par des droits de propriété intellectuelle. Toute reproduction, modification, distribution ou utilisation non autorisée de ces éléments est strictement interdite. </p>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          7. Conditions générales de ventes :</h1>
        <p className='pb-6'>
          Clients particuliers: <br />
          L'accès au site est gratuit pour le client. Les frais de réservation s'élèvent à 5% du prix de la réservation pour la plateforme OneHairCut et 1% pour le moyen de paiement Stripe.
          Le client n'est pas lié dans le temps à un contrat et peut demander la fermeture de son compte, si toutefois aucune réservation n'est présente à une date postérieure à la demande fermeture. La fermeture du compte se fait directement sur le site de la plateforme.<br />
          Le paiement se fait par le biais de la plateforme Stripe.<br />
          Concernant les garanties et responsabilités, voir le chapitre Responsabilités des conditions générales d'utilisation.<br />
          La plateforme OneHairCut ne dispose pas d'un contrat pour les clients. De ce fait, il n'y a pas de rétractation ni de durée de celle-ci.<br />
          Lors de la réservation, le client est amené à payer la prestations ainsi que les frais et taxes associés.<br />
          Concernant le code de conduite et règlement des litiges, référez vous aux conditions générales d'utilisation.<br />
          <br />
          Clients professionnels: <br />
          L'accès au site se fait par la création d'un compte. Deux types de contrat sont disponibles:<br />
          - une offre à 79€, offrant l'accès à des données liées à l’exercice des prestations, ainsi qu'à une intelligence artificielle pour l'optimisation des services du professionnel.<br />
          - une offre à 0€, sans les avantages de la version payante ci-dessus.<br />
          Les rabais et réductions peuvent être appliqués sur les offres payantes pendant une période définie. Voir les détails lors de l'activation de celles-ci.<br />
          Concernant le règlement des litiges, veuillez vous référer au chapitre correspondant dans les conditions générales d'utilisation.
        </p>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          Contact</h1>
        <p className='pb-6'>
          Afin de nous contacter, veuillez envoyer un email à contact@onehaircut.com ou par téléphone au xxxxxxxxxx   </p>


      </div>

    </div>
  );
};

export default legalNoticesPage;
