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
        <p className='pb-6'> Les présentes conditions générales d'utilisation régissent l'accès et l'utilisation du site web OneHaircut, ainsi que de ses services associés. En accédant au site et en utilisant nos services, l'utilisateur accepte les conditions énoncées ci-dessous.</p>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          1. Description des services</h1>
        <p className='pb-6'>
          OneHaircut offre une plateforme en ligne destinée à la réservation de services de coiffure. Les utilisateurs peuvent réserver des créneaux horaires, personnaliser leurs préférences, et interagir avec des coiffeurs partenaires.</p>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          2. Utilisation du site</h1>
        <p className='pb-6'>
          L'utilisateur s'engage à utiliser le site web OneHaircut de manière conforme à la loi. Toute utilisation à des fins illégales ou inappropriées est strictement interdite.
          OneHairCut ne constitue pas une recommandation d'un salon de coiffure ou coiffeur, ni des services proposés.
          Sauf indication contraire, vous devez avoir au moins 18 ans pour utiliser la Plateforme.
          Vous devez vous abstenir d’utiliser OneHairCut pour causer des désagréments ou faire de fausses réservations. Cette plateforme doit être utilisée aux fins prévues.  Ainsi vous devez vous comporter de manière appropriée envers le personnel du Prestataire de service. </p>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          3. Compte utilisateur</h1>
        <p className='pb-6'>
          Pour accéder à certaines fonctionnalités du site, l'utilisateur est amené à créer un compte personnel. Les informations fournies pour la création du compte doivent être exactes et à jour. Vous êtes responsable de toutes les actions réalisées sur votre compte. Ne divulguer donc pas votre nom d’utilisateur et votre mot de passe secrets.</p>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          4. Responsabilités</h1>
        <p className='pb-6'>
          OneHaircut s'efforce de fournir des services de qualité, mais ne peut garantir l'exactitude, la fiabilité ou l'exhaustivité des informations affichées sur le site. Onehaircut ne peut pas être tenu responsable pour les informations erronées fournies par les coiffeurs.

          De plus, lorsque vous réservez une prestation, OneHairCut met à votre disposition la plateforme dont elle est responsable, mais n’est pas responsable de l’expérience de coiffure. Le salon, barber ou coiffeur indépendant est réponsable de cette dite expérience.

          Vous êtes responsable des désagréments ou des dommages que vous génèreriez.</p>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          5. Propriété intellectuelle</h1>
        <p className='pb-6'>
          Tous les contenus présents sur le site, tels que les textes, images, logos, et marques, sont protégés par la législation sur la propriété intellectuelle. Toute reproduction ou utilisation non autorisée est interdite. </p>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          6. Protection des données personelles</h1>
        <p className='pb-6'>
          Chez OneHaircut, nous attachons une importance particulière à la confidentialité et au traitement des données personnelles. Conformément à notre politique de confidentialité, nous collectons et traitons les données personnelles de nos utilisateurs dans le respect des réglementations en vigueur. Nous reconnaissons et respectons vos droits à la confidentialité et à la protection des données. En tant qu'utilisateur, vous avez le droit d'accéder à vos informations personnelles, de les corriger, de les supprimer, ou de vous opposer au traitement de ces données. Pour exercer ces droits ou pour toute demande supplémentaire concernant vos données personnelles, veuillez nous contacter via les coordonnées fournies dans la section dédiée à la confidentialité de notre site ou application.</p>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          7. Liens externes</h1>
        <p className='pb-6'>
          Le site web OneHaircut peut contenir des liens vers des sites tiers, exclusivement dans le but de faciliter les transactions de paiement. Nous souhaitons souligner que ces liens sont strictement utilisés à des fins de traitement des paiements et ne sont pas associés à des publicités externes. OneHaircut décline toute responsabilité quant au contenu ou aux pratiques de ces sites tiers. Nous encourageons nos utilisateurs à consulter les politiques de confidentialité et les conditions d'utilisation de ces sites tiers, car notre responsabilité ne s'étend pas à leur contenu ou à leurs pratiques.</p>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          8. Limitations de responsabilité</h1>
        <p className='pb-6'>
          OneHaircut ne peut être tenu responsable des dommages directs ou indirects résultant de l'utilisation du site ou des services proposés.</p>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          9. Modification des conditions</h1>
        <p className='pb-6'>
          OneHaircut se réserve le droit de modifier les présentes conditions générales d'utilisation à tout moment. Les utilisateurs seront informés des changements apportés.</p>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          10. Droit applicable et juridiction</h1>
        <p className='pb-6'>
          Les présentes conditions sont régies par la législation en vigueur. En cas de litige, les tribunaux compétents seront ceux du ressort judiciaire concerné.
          Vous devez coopérer à tous les contrôles anti-fraude/anti-blanchiment que nous sommes obligés d'effectuer.
        </p>

      </div>

    </div>
  );
};

export default termsPage;
