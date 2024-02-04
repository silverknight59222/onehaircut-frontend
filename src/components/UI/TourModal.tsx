import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import dynamic from "next/dynamic";
import { useState } from "react";
const Tour = dynamic(() => import("reactour"), { ssr: false });
import Player from "@/components/UI/PlayerForTour"


export interface Steps {
  selector: string,
  content: string | JSX.Element,
  audioPath?: string
}

export type TourModalType = {
  steps: Steps[],
  onRequestClose?: () => void;
  children?: JSX.Element,
  audioPath?: string
}

const TourModal = ({ steps, onRequestClose, children, audioPath }: TourModalType) => {
  const disableBody = target => disableBodyScroll(target);
  const enableBody = target => enableBodyScroll(target);
  const [isTourOpen, setIsTourOpen] = useState(true);
  const closeTour = () => {
    setIsTourOpen(false)
    onRequestClose && onRequestClose();
  };

  const modalContent = (
    <div className='relative top-0 left-0 pr-1 pb-1'>
      {audioPath && (
        <Player
          src={audioPath}
        />
      )}
      {children}
    </div>
  );


  // Composant de bouton avec effet de survol
  const HoverButton = ({ text, baseBgColor, hoverBgColor, textColor = "white" }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <button
        style={{
          padding: '10px',
          backgroundColor: isHovered ? hoverBgColor : baseBgColor,
          color: textColor,
          border: `1px solid #CBCBCB`, // Ajout de la bordure avec la couleur conditionnelle
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease, border-color 0.3s ease', // Ajout d'une transition pour l'effet de survol et la couleur de bordure

        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {text}
      </button>
    );
  };

  return (
    <>
      <Tour
        // @ts-ignore
        steps={steps}
        showNavigation={true}
        onRequestClose={closeTour}
        rounded={5}
        isOpen={isTourOpen}
        accentColor={'#ef4444'}
        onAfterOpen={disableBody}
        onBeforeClose={enableBody}
        prevButton={<HoverButton text="Retour" baseBgColor="#000000" hoverBgColor="#4F4F4F" textColor="#ffffff" />}
        nextButton={<HoverButton text="Suivant" baseBgColor="#FF7B20" hoverBgColor="#FE5019" />}
        lastStepNextButton={<HoverButton text="C'est parti !" baseBgColor="#FF7B20" hoverBgColor="#FE5019" />}
        children={modalContent}
        showNumber={false}
      // getCurrentStep={}
      // highlightedBorder={ }
      />
    </>
  )
}

export default TourModal



/* README
Aim:
Give instructions or present a page. As argument buttons/elements can be highlighted

 how to use:
- include Tour and Steps into the tsx file, that need a tour

- define a tour variable to store the steps. Example
   const tourSteps: Steps[] = [
    {
      selector: '.bienvenue_element',
      content: 'Bienvenue ',
    },

- If you want to highlight an element, its classname must be defined as so
    <p classname='element1 ...'>

    and the associated selector in the tourSteps with the same identifier and with a dot before
    selector: '.element1',

-  define a closing function if you want to add extra functions, while the tour window is closed. Example:
    const closeTour = () => {
    // You may want to store in local storage or state that the user has completed the tour
  };

- Place the TourModal component in the file where you want to display the tour. Example:
  ...
  return (
    <>
      {isLoading && loadingView()}

      <TourModal steps={tourSteps} onRequestClose={closeTour} />
  ... 



 end README*/
