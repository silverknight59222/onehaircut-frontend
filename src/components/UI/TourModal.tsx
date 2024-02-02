import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import dynamic from "next/dynamic";
import { useState } from "react";
const Tour = dynamic(() => import("reactour"), { ssr: false });

export interface Steps {
  selector: string,
  content: string,
}

export type TourModalType = {
  steps: Steps[],
  onRequestClose?: () => void;
}

const TourModal = ({ steps, onRequestClose }: TourModalType) => {
  const disableBody = target => disableBodyScroll(target);
  const enableBody = target => enableBodyScroll(target);
  const [isTourOpen, setIsTourOpen] = useState(true);
  const closeTour = () => {
    setIsTourOpen(false)
    onRequestClose && onRequestClose();
  };

  const HoverButton = ({ text, baseBgColor, hoverBgColor }) => {
    const [isHovered, setIsHovered] = useState(false);

    const baseStyle = {
      padding: '10px',
      backgroundColor: baseBgColor,
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    };

    const hoverStyle = {
      ...baseStyle,
      backgroundColor: hoverBgColor,
    };

    return (
      <button
        style={isHovered ? hoverStyle : baseStyle}
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
        styles={{ dot: 'disabled' }}
        isOpen={isTourOpen}
        accentColor={'#ef4444'}
        onAfterOpen={disableBody}
        onBeforeClose={enableBody}
        prevButton={<button style={{ padding: '10px', backgroundColor: '#f0f0f0', color: '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Retour</button>}
        nextButton={<button style={{ padding: '10px', backgroundColor: '#FF7B20', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Suivant</button>}
        lastStepNextButton={<button style={{ padding: '10px', backgroundColor: '#FF7B20', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}> C'est parti !</button>}
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
