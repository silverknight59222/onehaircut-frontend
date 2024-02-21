"use client"
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { Theme_A } from "@/components/utilis/Themes";
import { TbHelpSquareRoundedFilled } from "react-icons/tb";
import {getLocalStorage} from "@/api/storage";
const Tour = dynamic(() => import("reactour"), { ssr: false });


export interface Steps {
  selector: string,
  content: string | JSX.Element,
  audioPath?: string
}

export type TourModalType = {
  steps: Steps[],
  onRequestClose?: () => void,
  doneTour: boolean,
  showTourButton?: boolean,
}

const TourModal = ({ steps, onRequestClose, doneTour = true, showTourButton = true }: TourModalType) => {
  const disableBody = target => disableBodyScroll(target);
  const tempUser = getLocalStorage('user')
  const user = tempUser ? JSON.parse(tempUser) : {}
  const [isGuest, setIsGuest] = useState(!user.id); // User login state
  const enableBody = target => enableBodyScroll(target);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const closeTour = () => {
    setIsTourOpen(false)
    onRequestClose && onRequestClose();
  };
  useEffect(() => {
    if(doneTour) {
      setIsTourOpen(false)
    } else if (!doneTour && !isGuest) {
      setIsTourOpen(true)
    }
  }, [doneTour]);


  // useEffect(() => {
  //   if (isTourOpen) {
  //     document.documentElement.style.overflowX = 'inherit';
  //     document.documentElement.style.scrollBehavior = 'inherit';
  //   } else {
  //     document.documentElement.style.overflowX = 'hidden';
  //     document.documentElement.style.scrollBehavior = 'smooth';
  //   }
  // }, [isTourOpen]);

  // Composant de bouton avec effet de survol
  const HoverButton = ({ text, baseBgColor, hoverBgColor, textColor = "white" }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <button
        style={{
          padding: '8px',
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
      {showTourButton && <button
        onClick={() => setIsTourOpen(true)}
        className={`${Theme_A.button.tourModalButton}`}
      >
        <TbHelpSquareRoundedFilled size={38} />

      </button>}
      <Tour
        // @ts-ignore
        startAt={0}
        steps={steps}
        showNavigation={true}
        onRequestClose={closeTour}
        rounded={15}
        isOpen={isTourOpen}
        accentColor={'#ef4444'}
        onAfterOpen={disableBody}
        onBeforeClose={enableBody}
        prevButton={<HoverButton text="Retour" baseBgColor="#000000" hoverBgColor="#4F4F4F" textColor="#ffffff" />}
        nextButton={<HoverButton text="Suivant" baseBgColor="#FF7B20" hoverBgColor="#FE5019" />}
        lastStepNextButton={<HoverButton text="C'est parti !" baseBgColor="#FF7B20" hoverBgColor="#FE5019" />}
        showNumber={false}
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
