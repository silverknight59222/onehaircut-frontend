"use client"
import React, { useEffect, useState } from 'react';
import { LogoIcon, UserIcon } from '../utilis/Icons';
import Footer from "@/components/UI/Footer";
import { LogoCircleFixRight } from "@/components/utilis/Icons";
import { Theme_A } from '../utilis/Themes';


const TermsPage = () => {
  // for Icon size change:
  const [screenSize, setScreenSize] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    // Initial screen size check
    handleResize();

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <div className="hidden lg:block fixed -right-32 md:-right-28 -bottom-32 md:-bottom-28 -z-10">
        <LogoCircleFixRight />
      </div>
      <Footer />
      <div className="flex justify-between w-full p-5 border-b border-[#EBF0F2]">
        <div className='flex items-center justify-center cursor-pointer'
        >
          <LogoIcon className={''} />
        </div>
        <div className="flex items-center justify-end gap-4">
          <div className="w-14 h-14 flex items-center justify-center pb-1 border-2 border-secondary rounded-full cursor-pointer transform hover:scale-110 transition-transform"
          >
            <UserIcon size={screenSize} />
          </div>
        </div>
      </div>
      <div className='mx-48 mb-16 text-justify'>

        <h1 className={`my-12 ${Theme_A.textFont.headerH1}`}>Conditions Générales d'Utilisation de Onehaircut</h1>
        <p className='pb-6'> Les présentes conditions générales d'utilisation régissent l'accès et l'utilisation du site web Onehaircut, ainsi que de ses services associés. En accédant au site et en utilisant nos services, l'utilisateur accepte les conditions énoncées ci-dessous.</p>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          1. Description des services</h1>
        <p className='pb-6'>
          Onehaircut offre une plateforme en ligne destinée à la réservation de services de coiffure. <br />
          <br />
          A. Pour le client : <br />
          Les utilisateurs peuvent réserver des créneaux horaires pour se faire coiffer, personnaliser leurs préférences, et interagir avec des coiffeurs partenaires.<br />
          <br />
          B. Pour le professionnel :<br />
          Les professionnels de la coiffure peuvent mettre à disposition des services en lien avec la coiffure, personnaliser l'aspect de leur page, gérer leur agenda, leurs collaborateurs, leurs préférences et interagir avec des clients.
        </p>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          2. Utilisation du site</h1>
        <p className='pb-6'>
          L'utilisateur s'engage à utiliser le site web Onehaircut de manière conforme à la loi. Toute utilisation à des fins illégales ou inappropriées est strictement interdite.
          Onehaircut ne constitue pas une recommandation d'un salon de coiffure ou coiffeur, ni des services proposés.<br />
          Sauf indication contraire, vous devez avoir au moins 18 ans pour utiliser la plateforme.<br />
          Si vous avez une question ou une réclamation, veuillez contacter notre Service Clients: contact@Onehaircut.com.<br />
          Vous pouvez nous aider à intervenir dans les plus brefs délais en fournissant : <br />
          le numéro de réservation, vos coordonnées, et l’adresse e-mail que vous avez utilisée au moment d’effectuer votre réservation. De plus écrivez nous un résumé du problème, indiquant en quoi nous pouvons vous aider. Tout document justificatif est la bienvenue.<br />
          <br />
          A. Pour le client : <br />
          Vous devez vous abstenir d’utiliser Onehaircut pour causer des désagréments ou faire de fausses réservations. Cette plateforme doit être utilisée aux fins prévues.  Ainsi vous devez vous comporter de manière appropriée envers le personnel du prestataire de service.<br />
          <br />
          B. Pour le professionnel :<br />
          Vous devez vous abstenir d’utiliser Onehaircut pour causer des désagréments à tout utilisateur de la plateforme ou faire de fausses propositions de prestation.
        </p>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          3. Compte utilisateur</h1>
        <p className='pb-6'>
          A. Pour le client : <br />
          Pour accéder à certaines fonctionnalités du site, l'utilisateur est amené à créer un compte personnel. Les informations fournies pour la création du compte doivent être exactes et à jour. Vous êtes responsable de toutes les actions réalisées sur votre compte. Ne divulguer donc pas votre nom d’utilisateur et votre mot de passe secrets.<br />
          <br />
          B. Pour le professionnel :<br />
          Pour pouvoir proposer un service, le professionnel doit ouvrir un compte afin de renseigner les informations relatives à sa profession. Pour être visible, le professionnel devra apporter au moins une photo de son salon, enregistrer au moins un coiffeur, indiquer les coiffures dispensées et entrer son numéro d’identification (SIRET, UID, CIF). Il pourra aussi mettre en ligne des exemples de coiffures qu'il a déjà effectuées.<br />
          Les informations fournies pour la création du compte doivent être exactes et à jour. Vous êtes responsable de toutes les actions réalisées sur votre compte. Ne divulguez donc pas votre nom d’utilisateur et votre mot de passe secret.
        </p>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          4. Responsabilités</h1>
        <p className='pb-6'>
          Onehaircut s'efforce de fournir des services de qualité, mais ne peut garantir l'exactitude, la fiabilité ou l'exhaustivité des informations affichées sur le site. Onehaircut ne peut pas être tenu responsable pour les informations erronées fournies par les coiffeurs.<br />
          <br />
          Vous êtes responsable des désagréments ou des dommages que vous généreriez. <br />
          <br />
          A. Pour le client :<br />
          Lorsque vous réservez une prestation, Onehaircut met à votre disposition la plateforme dont elle est responsable, mais n’est pas responsable de l’expérience de coiffure. Le salon, barbier ou coiffeur indépendant est responsable de cette dite expérience. Un litige n’inclut donc que le client et le prestataire et exclut la plateforme Onehaircut.
          <br />
          Si vous arrivez en retard lors de votre rendez-vous, le prestataire de service est en capacité d'honorer la prestation ou de l'annuler. Il vous incombe de vous assurer d’arriver à l’heure; à défaut, nous ne sommes pas responsables des coûts associés. Dans le cas d’une annulation dûe à un retard, un remboursement de la part de la plateforme Onehaircut ne peut être demandé.<br />
          <br />
          B. Pour le professionnel :<br />
          Lorsque vous effectuez une prestation, Onehaircut met à votre disposition la plateforme dont elle est responsable, mais n’est pas responsable de l’expérience client.
          <br />
          Si vous n'êtes pas capable d'assurer la prestation demandée à l'heure convenue, le client est en droit de demander un remboursement du montant de cette prestation. La somme prévue pour cette prestation ne vous sera donc pas versée.
        </p>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          5. Propriété intellectuelle</h1>
        <p className='pb-6'>
          Tous les contenus présents sur le site, tels que les textes, images, logos, et marques, sont protégés par la législation sur la propriété intellectuelle. Toute reproduction ou utilisation non autorisée est interdite. </p>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          6. Protection des données personnelles</h1>
        <p className='pb-6'>
          Chez Onehaircut, nous attachons une importance particulière à la confidentialité et au traitement des données personnelles. Conformément à notre politique de confidentialité, nous collectons et traitons les données personnelles de nos utilisateurs dans le respect des réglementations en vigueur. Nous reconnaissons et respectons vos droits à la confidentialité et à la protection des données.<br />
          En tant qu'utilisateur, vous avez le droit d'accéder à vos informations personnelles, de les corriger, de les supprimer, ou de vous opposer au traitement de ces données. Pour exercer ces droits ou pour toute demande supplémentaire concernant vos données personnelles, veuillez nous contacter via les coordonnées fournies dans la section dédiée à la confidentialité de notre site ou application.</p>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          7. Liens externes</h1>
        <p className='pb-6'>
          Le site web Onehaircut peut contenir des liens vers des sites tiers, exclusivement dans le but de faciliter les transactions de paiement. Nous souhaitons souligner que ces liens sont strictement utilisés à des fins de traitement des paiements et ne sont pas associés à des publicités externes.<br />
          Onehaircut décline toute responsabilité quant au contenu ou aux pratiques de ces sites tiers. Nous encourageons nos utilisateurs à consulter les politiques de confidentialité et les conditions d'utilisation de ces sites tiers, car notre responsabilité ne s'étend pas à leur contenu ou à leurs pratiques.</p>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          8. Limitations de responsabilité</h1>
        <p className='pb-6'>
          Onehaircut ne peut être tenu responsable des dommages directs ou indirects résultant de l'utilisation du site ou des services proposés.</p>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          9. Modification des conditions</h1>
        <p className='pb-6'>
          Onehaircut se réserve le droit de modifier les présentes conditions générales d'utilisation à tout moment. Les utilisateurs seront informés des changements apportés.
        </p>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          10. Tarifs et Paiements</h1>
        <p className='pb-6'>
          A. Pour le client :<br />
          Lorsque vous effectuez une réservation, vous acceptez de payer le tarif de l’expérience de coiffure, y compris tous les frais et taxes qui peuvent s’appliquer. Les frais et taxes sont indiqués lors de la réservation, avant le paiement.<br />
          <br />
          Les erreurs et fautes d’impression évidentes ne sont pas contraignantes. Par exemple : si vous réservez une coupe de cheveux qui a été proposée par erreur pour 1 €, votre réservation peut être annulée et nous vous rembourserons le montant que vous avez payé  <br />
          <br />
          Concernant le paiement des réservations et services proposés, celui-ci se fait directement sur notre plateforme et non sur le lieu de la coiffure. Le paiement s'effectuera à travers la plateforme sécurisée Stripe.<br />
          <br />
          Si le paiement n'est pas effectué ou annulé faute de crédit sur la carte par exemple, la réservation n'est pas confirmée. Autrement dit, la réservation n'est que acceptée lorsque le paiement est effectué et confirmé par Stripe.<br />
          Dans le cas d'une annulation:<br />
          - Si elle est demandée au moins 24 heures avant le moment exact du rendez-vous, celle-ci peut être remboursée. Le client est fortement invité à refaire une réservation.<br />
          - Si elle est demandé dans les 24 heures précédant le rendez-vous, le client ne recevra pas le remboursement et le rendez-vous sera annulé.<br />
          <br />
          B. Pour le professionnel :<br />
          Le paiement de la prestation sera transféré sur le compte indiqué dans les paramètres après confirmation du service, lorsque vous l’aurez demandé au travers de la plateforme (non automatique). Voir la rubrique “Réglage-Paiements”. Il vous faudra indiquer vos informations bancaires pour ce faire. Des frais à hauteur de 5% s’applique lors du versement.<br />
          Dans le cas d'une annulation:<br />
          - Si elle est demandée au moins 24 heures avant le moment exact du rendez-vous, celle-ci peut être remboursée. <br />
          - Si elle est demandée dans les 24 heures précédant le rendez-vous, le montant de la prestation sera versé au professionnel et le rendez-vous sera annulé.<br />
        </p>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          11. En cas de non respect des règles</h1>
        <p className='pb-6'>
          A. Pour le client :<br />
          En cas de non-respect des règles énoncées, Onehaircut se réserve le droit de vous empêcher d'utiliser la plateforme, de faire une réservation, d'accéder à votre compte et d'annuler vos futurs rendez-vous.<br />
          Dans certains cas, il se peut que vous perdiez même le droit au remboursement.<br />
          <br />
          B. Pour le professionnel :<br />
          En cas de non-respect des règles énoncées, Onehaircut se réserve le droit de vous empêcher d'utilisation la plateforme, d'accéder à votre compte, d'annuler vos futurs rendez-vous<br />
          Dans certains cas, il se peut que vous perdiez même le droit au paiement des prestations effectuées.<br />
        </p>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          12. Droit applicable et juridiction</h1>
        <p className='pb-6'>
          Les présentes conditions sont régies par la législation en vigueur. En cas de litige, les tribunaux compétents seront ceux du ressort judiciaire concerné.<br />
          Vous devez coopérer à tous les contrôles anti-fraude/anti-blanchiment que nous sommes obligés d'effectuer.<br />
          Les professionnels de la coiffure se verront dans l’obligation d’indiquer sur la plateforme leur numéro d’identification, donné par les autorités compétentes. Celui-ci sera contrôlé et des sanctions et poursuites pourront être prises lors de la falsification de cette identité.<br />
        </p>

        <h1 className={`my-3 ${Theme_A.textFont.headerH4}`}>
          CONTACT</h1>
        <p className='pb-6'>
          Tout contact avec Onehaircut se fait à travers l'adresse email suivante:<br />
          contact@Onehaircut.com
        </p>





      </div>

    </div>
  );
};

export default TermsPage;
