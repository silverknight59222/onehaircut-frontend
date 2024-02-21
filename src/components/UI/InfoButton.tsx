// InfoButton.jsx
import React, { useEffect, useState, CSSProperties } from "react";
import { InfoNodalIcon } from "../utilis/Icons";
import InfoModal from "./InfoModal";

const InfoButton = ({
  onOpenModal,
  title_1,
  content_1,
  title_2 = "",
  content_2 = "",
  title_3 = "",
  content_3 = "",
  videoUrl = "",
}) => {

  // Keyframes pour l'animation de pulsation du cercle
  const keyframesPulse = `
@keyframes pulse {
  0% { transform: scale(1); opacity: 0.1; }
  50% { transform: scale(1.1); opacity: 0.6 }
  100% { transform: scale(1); opacity: 0.1; }
}
`;

  // Styles pour le cercle
  // Styles pour le cercle
  const circleStyle: CSSProperties = {
    position: 'absolute',
    top: '-15%',
    left: '-15%',
    transform: 'translate(-50%, -50%)',
    width: '28px', // Taille du cercle
    height: '28px', // Taille du cercle
    backgroundColor: 'white', // Couleur de fond blanche
    border: '8px solid #2f81d4', // Bordures rouges
    borderRadius: '50%',
    animation: 'pulse 2s infinite ease-in-out',
    zIndex: -1, // Assurez-vous que le cercle est derrière l'icône
  };


  // Styles pour le conteneur de l'icône
  const iconContainerStyle: CSSProperties = {
    position: 'relative',
    cursor: 'pointer',
  };
  const [iconColor, setIconColor] = useState('#000000');

  const handleMouseEnter = () => {
    setIconColor('#0552a1'); // Couleur de l'icône lors du survol
  };

  const handleMouseLeave = () => {
    setIconColor('#000000'); // Couleur d'origine de l'icône
  };

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const openInfoModal = () => {
    setIsInfoModalOpen(true);
  };
  const closeInfoModal = () => {
    setIsInfoModalOpen(false);
  };


  return (
    <div>
      {isInfoModalOpen && (
        <InfoModal title_1={title_1} content_1={content_1} title_2={title_2} content_2={content_2} title_3={title_3} content_3={content_3} videoUrl={videoUrl} close={closeInfoModal}>
          {/* Mettez ici le contenu de votre modal */}
          <p></p>
        </InfoModal>
      )}
      <div
        style={iconContainerStyle}
        className="ml-4 hover:scale-110 transition duration-300"
        onClick={openInfoModal}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <style dangerouslySetInnerHTML={{ __html: keyframesPulse }} />
        <div style={circleStyle} />
        <InfoNodalIcon width="22px" height="22px" fill={iconColor} />
      </div>
    </div>
  );
};

export default InfoButton;
