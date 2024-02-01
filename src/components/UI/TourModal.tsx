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
        prevButton={<button>Retour</button>}
        nextButton={<button>Suivant</button>}
        lastStepNextButton={<button>C'est parti !</button>}
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

    and the associated selector in the tourSteps:
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
