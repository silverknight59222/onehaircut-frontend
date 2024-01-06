import React from 'react';
import { InstagramGray, FacebookGray, YoutubeGray, LinkedInGray } from '../utilis/Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-black py-3 fixed bottom-0 left-0 w-full border border-stone-200 z-50 ">
      <div className="container mx-auto flex justify-between items-center px-2 md:px-4 "

        style={{ fontSize: 'clamp(7px, 0.75vw, 14px)' }}>

        {/* Section de texte à gauche */}
        <div className="flex space-x-2 md:space-x-4">
          <span>© 2022 Balextrade LLC Tous droits réserv&eacute;s.</span>
          <span className="mx-2">•</span>
          <a onClick={() => window.open('/confidentiality')} className="font-semibold cursor-pointer hover:underline">Confidentialit&eacute;</a>
          <span className="mx-2">•</span>
          <a onClick={() => window.open('/terms')} className="font-semibold cursor-pointer hover:underline">Conditions g&eacute;n&eacute;rales</a>
          <span className="mx-2">•</span>
          <a onClick={() => window.open('/legalNotices')} className="font-semibold cursor-pointer hover:underline">Mentions l&eacute;gales</a>
        </div>

        {/* Section des liens à droite */}
        <div className="flex space-x-2 md:space-x-4 ">
          <a
            href="https://www.instagram.com/onehaircut/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:scale-110 transition duration-200">
            <InstagramGray className="w-4 h-4 md:w-6 md:h-6" />  </a>
          <a href="https://www.facebook.com/profile.php?id=100092227996443"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:scale-110 transition duration-200">
            <FacebookGray className="w-4 h-4 md:w-6 md:h-6" /></a>
          <a href="https://www.youtube.com/channel/UClpeM8tztXkxHf2DiRoKpRA"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:scale-110 transition duration-200">
            <YoutubeGray className="w-4 h-4 md:w-6 md:h-6" /> </a>
          <a href="https://www.linkedin.com/company/onehaircut/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:scale-110 transition duration-200">
            <LinkedInGray className="w-4 h-4 md:w-6 md:h-6" /> </a>
          {/* 
          <a href="#lien3" className="font-semibold hover:underline">Lien 3</a>
          <a href="#lien3" className="font-semibold hover:underline">Lien 3</a>
          */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
