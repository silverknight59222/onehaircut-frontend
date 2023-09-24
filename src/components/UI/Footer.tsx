import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-black py-3 fixed bottom-0 left-0 w-full border border-stone-200 z-50">
      <div className="container mx-auto flex justify-between items-center px-8">

        {/* Section de texte à gauche */}
        <div className="text-sm flex space-x-4">
          <span>© 2022 Balextrade LLC Tous droits réserv&eacute;s.</span>
          <span className="mx-2">•</span>
          <a href="#lien1" className="text-sm font-semibold hover:underline">Confidentialit&eacute;</a>
          <span className="mx-2">•</span>
          <a href="#lien2" className="text-sm font-semibold hover:underline">Conditions g&eacute;n&eacute;rales</a>
          <span className="mx-2">•</span>
          <a href="#lien3" className="text-sm font-semibold hover:underline">Mentions l&eacute;gales</a>
        </div>

        {/* Section des liens à droite */}
        <div className="flex space-x-4">
          {/* 
          <a href="#lien1" className="text-sm font-semibold hover:underline">Lien 1</a>
          <a href="#lien2" className="text-sm font-semibold hover:underline">Lien 2</a>
          <a href="#lien3" className="text-sm font-semibold hover:underline">Lien 3</a>
          */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
